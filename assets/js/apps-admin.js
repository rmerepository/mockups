 var Approval_RecordSet; //-- data that holds the for approval json


var AdminApps = {
    jQuery : $,
    init : function ()
    {
        this.renderTable();       
        this.declineAds();
        this.contactUser();
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
       $.getJSON('/admin/advertisement/ads', function(){})
        .done(function(data){

        	if( data.length <1) {
        		$('.adsDataStatus').html("No advertisement Available for Approval/ReApproval"); 
        		return false;
        	}

 
            $('#adsDataPreloader').remove();
        
            var items = [];
             Approval_RecordSet = data;
            $.each(data, function( key , val ) {
                //-- javascripts in href resides at advertisement view
                items.push('<tr id="tr_'+ val.id +'">'  
                            + '<td>' + val.website + '</td>' 
                            + '<td>' + val.address + '</td>' 
                            + '<td>' + val.users + '</td>' 
                            + '<td>' + val.created + '</td>' 
                            + '<td class="ads-status">' + val.status + '</td>'
                            + '<td>' + val.display + '</td>'                     
                            + '<td class="actions">' 
                            +    '<div class="btn-group">' 
                            +        '<a href="'+val.url+'" target="_blank" role="button" data-ads-id="'+ val.id +'" class="btn btn-small view-details" >View Details</a>'
                            +        '<a href="javascript:approveAd('+ val.id +');" role="button" class="btn btn-small btn-success approve-ads">Approve</a>'
                            +        '<a href="javascript:denyAd('+ val.id +');" class="btn btn-small btn-danger decline-ads">Deny</a>'
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
    
 
    declineAds : function() {
        /*
      $('#adsTable').on('click', 'a.decline-ads', function(e){
            var t = $(this),
                adsId = t.data('ads-id'),
                urlPost = "/admin/advertisement/deny_ads";
                $('#mi').confirmModal({
                heading: 'Decline Advertisement',
                body: '<p>Click confirm to <b>DENY</b> this advertisement</p> <p>Message: <br /><textarea name="remarks" id="remarks"></textarea></p>',
                callback: function(){
                    var note = $('#remarks').val(),
                    request = AdminApps.ajaxPost( urlPost , { id : adsId, remarks : note } );
                    request.done(function (response, textStatus, jqXHR ) {
                        t.closest('tr').addClass('approved').find('.ads-status').html('Denied');
                        t.closest('tr').find('.ads-remarks').html( note );
                        t.closest('tr').find('.btn-group').remove();
                        AdminApps.alertMsg( 'Advertisement has been Denied', 'notice' );
                    });
                }
            }) 
            e.preventDefault();
      });
      */
    },

 
    contactUser : function() {
 
        $('.contactUsr').on('click', function(e) {
            var t = $(this),
                userId = t.data('user-id');
                $('#mi').confirmModal({
                    heading : 'Contact User',
                    confirmButton : 'Send',
                    body : '<ul class="ul-info-user">'
                           + '<li><b>Name</b>' + 'John Doe' + '</li>'
                           + '<li><b>Telephone No.</b>' + '1234456 ' + '</li>'
                           + '<li><b>Email</b>' + 'john@email.com ' + '</li>'
                           + '<li><b>Address</b>' + '1123/32 Beverly Hills, CA 1432' + '</li>'
                           + '</ul><hr />'
                           + '<b>Enter your Message</b>'
                           + '<p><textarea id="msgToUser" class="m_d_admin"></textarea></p>',
                    callback : function() {
                        var msg = $('#msgToUser').val();
//                        console.log(userId + msg)
                        // code here
                        AdminApps.alertMsg( 'Email Sent', 'success' );
                    }
                });
            e.preventDefault();
        });
    }
 
};
AdminApps.init();