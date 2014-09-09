var AdminApps = {
    jQuery : $,
    init : function ()
    {
        this.renderTable();
        this.renderSent();
        this.declineAds();
    },

    ajaxPost : function( urlPost, params ) {
        return $.ajax({
            type : "POST",
            url : urlPost,
            data : params,
            cache : true,
            async : false
        })
    },

    alertMsg : function( msg, msgType ){
       return $().toastmessage('showToast', {
            text     : msg,
            sticky   : true,
            position : 'top-center',
            type     : msgType,
        });
    },

     
    renderTable : function ()
    {
       $.getJSON('/admin/enquiries/email', function(){})
        .done(function(data){

        	if( data.length <1) {
        		$('.adsDataStatus').html("No New Email Enquiry"); 
        		return false;
        	}

 
            $('#adsDataPreloader').remove();
        
            var items = [];
        
            $.each(data, function( key , val ) {
                items.push('<tr>'  
                            + '<td>' + val.email_from + '</td>' 
                            + '<td>' + val.subject + '</td>' 
                            + '<td>' + val.date_saved + '</td>' 
//                            + '<td><div class="email_inquiry_of">' + val.email_content + '</div></td>' 
                            + '<td><iframe width="640" height="240" src="' + urlEmailContent + '/' + val.enquiry_id + '"></iframe></td>' 
                            + '<td class="actions">' 
                            +    '<div class="btn-group">' 
//                            +        '<a href="javascript:preview('+val.ownerid+','+val.propertyid+','+ val.enquiry_id +')" role="button" data-ads-id="'+ val.enquiry_id +'" class="btn btn-small view-details" >View Details</a>'
//find_property_url                            +        '<a href="enquiries/find_property/' + val.enquiry_id + '" role="button" class="btn btn-small">Find Property</a>'
                            +        '<a href="' + val.find_property_url + '" role="button" class="btn btn-small">Find Property</a>'
                            +        '<a href="#" role="button" data-ads-id="'+ val.enquiry_id +'" class="btn btn-small btn-danger decline-ads">Delete</a>'
                            +    '</div>'
                            + '</td>' 
                            + '</tr>')
                 });

 
            $('<tbody/>', {
                id : 'adsData',
                html : items.join('')
            }).appendTo('#adsTable');
       });
    },
    

    renderSent : function ()
    {
       $.getJSON('/admin/enquiries/email_sent', function(){})
        .done(function(data){

            if( data.length <1) {
                $('.adsDataStatus').html("No New Email Enquiry"); 
                return false;
            }

 
            $('#adsDataPreloader').remove();
        
            var items = [];
        
            $.each(data, function( key , val ) {
                items.push('<tr>'  
                            + '<td>' + val.email_from + '</td>' 
                            + '<td>' + val.subject + '</td>' 
                            + '<td>' + val.date_enquiry_forwarded + '</td>' 
//                            + '<td><div class="email_inquiry_of">' + val.email_content + '</div></td>' 
                            + '<td><iframe width="640" height="240" src="' + urlEmailContent + '/' + val.enquiry_id + '"></iframe></td>' 
                            + '<td>' + val.forwarded_email + '</td>' 
                            + '</tr>')
                 });

 
            $('<tbody/>', {
                id : 'adsData',
                html : items.join('')
            }).appendTo('#tableEmailSent');
       });
    },

    declineAds : function() {
      $('#adsTable').on('click', 'a.decline-ads', function(e){
            var t = $(this),
                adsId = t.data('ads-id');
                $('#mi').confirmModal({
                heading: 'Delete Enquiry',
                body: '<p>Click confirm to <b>DELETE</b> this e-mail</p>',
                callback: function(){
                    var request = AdminApps.ajaxPost( urlDeleteEnquiry , { id : adsId } );
                    request.done(function (response, textStatus, jqXHR ) {
                        t.closest('tr').hide();
                        AdminApps.alertMsg( 'Email has been deleted', 'notice' );
                    });
                    request.fail(function (response, textStatus, jqXHR ) {
                    });
                }
            }) 
            e.preventDefault();
      });
    },

 
};
AdminApps.init();