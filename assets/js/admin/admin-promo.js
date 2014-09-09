var ds = new kendo.data.DataSource({
                    transport: {
                        read: {
                            url: window.location.protocol+'//'+window.location.host + "/api/discount"
                        },
                        create: {
                            url: window.location.protocol+'//'+window.location.host + "/api/discount",
                             type: "post",
                             data:pobj
                        },
                        update: {
                            url: window.location.protocol+'//'+window.location.host + "/api/discount",
                             type: "put",
                             data:pobj
                        } 
                    },
                    
                    schema: { 
                            data: "data",
                            model:{id:"id"}
                        },
                       pageSize: 10,
                       change: function() { 
                             var jsTemplate = kendo.template($("#tmpWebsites").html());
                              $("#tblWebsite tbody").html(kendo.render(jsTemplate, this.view()));

                       }
                   });

var modelPromo = kendo.observable({
    id:0,
    isu_pdate:false,
    is_new:true,
    email:"",
    discount_field:"percent",
    portal_id:1,
    percent:0,
    start_date: new Date(),
    end_date:new Date(),
    allocation:1,
    is_not_active:0,
    used:0,
    created_by:"",
    remarks:"",
    date_created:"",
    updated_by:"",
    date_updated:"",
    data_source_portal:[{ text: "Advertise", value: "1" }],
     data_source_type:[{ text: "%", value: "percent" }],
     data_source_active:[{ text: "Yes", value: "0" },{ text: "No", value: "1" }],
     addPromo:function(){
         var myData = {
                       email:this.get("email"),
                        discount_field:this.get("discount_field"),
                         portal_id:this.get("portal_id"),
                          percent:this.get("percent"),
                           start_date:kendo.toString(this.get("start_date"),"yyyy-MM-dd HH:mm:00"),
                            end_date:kendo.toString(this.get("end_date"),"yyyy-MM-dd HH:mm:00"),
                             allocation:this.get("allocation"),
                               is_not_active:this.get("is_not_active"),
                               used:this.get("used"),
                               created_by:this.get("created_by"),
                               date_created:this.get("date_created"),
                               updated_by:this.get("updated_by"),
                               remarks:this.get("remarks"),
                               date_updated:this.get("date_updated")
                      };
         ds.add(myData);
         ds.sync();
         closemodal();
     },     
    editPromo:function(){
            var dataItem  = ds.get(this.get("id"));
                 dataItem.set("email",this.get("email"));
                 dataItem.set("discount_field",this.get("discount_field"));
                 dataItem.set("portal_id",this.get("portal_id"));
                 dataItem.set("percent",this.get("percent"));
                 dataItem.set("start_date",kendo.toString(this.get("start_date"),"yyyy-MM-dd HH:mm:00"));
                 dataItem.set("end_date",kendo.toString(this.get("end_date"),"yyyy-MM-dd HH:mm:00"));
                 dataItem.set("allocation",this.get("allocation"));
                  dataItem.set("remarks",this.get("remarks"));
                 dataItem.set("is_not_active",this.get("is_not_active"));

         ds.sync();
         closemodal();
    }
});



$(document).ready(function () {

                ds.read();
                
                $("#pager").kendoPager({
                    dataSource: ds,
                    messages: {
                        display: "{0} - {1} of {2} items",
                        empty: "No items to display",
                        page: "Page",
                        of: "of {0}",
                        itemsPerPage: "items per page",
                        first: "Go to the first page",
                        previous: "Go to the previous page",
                        next: "Go to the next page",
                        last: "Go to the last page",
                        refresh: "Refresh"
                    }
                });
                
                
kendo.bind($("#frmedit"), modelPromo);
});




function showmodal(){
    modelPromo.set("is_update",false);
     modelPromo.set("is_new",true);
    $("#AddNewPage").modal("show");
    
                 modelPromo.set("id",null);
                 modelPromo.set("email","");
                 modelPromo.set("discount_field","percent");
                 modelPromo.set("portal_id",1);
                 modelPromo.set("percent",0);
                 modelPromo.set("start_date",new Date());
                 modelPromo.set("end_date",new Date());
                 modelPromo.set("allocation",1);
                 modelPromo.set("is_not_active",0);
                  modelPromo.set("remarks","");
}

function editmodal(myid){
    
    modelPromo.set("is_update",true);
     modelPromo.set("is_new",false);
    $("#AddNewPage").modal("show");
    
    
        
        var dataItem  = ds.get(myid);
                  modelPromo.set("id",dataItem.get("id"));
                 modelPromo.set("email",dataItem.get("email"));
                 modelPromo.set("discount_field",dataItem.get("discount_field"));
                 modelPromo.set("portal_id",dataItem.get("portal_id"));
                 modelPromo.set("percent",dataItem.get("percent"));
                 modelPromo.set("start_date",kendo.toString(dataItem.get("start_date"),"yyyy-MM-dd HH:mm:00"));
                 modelPromo.set("end_date",kendo.toString(dataItem.get("end_date"),"yyyy-MM-dd HH:mm:00"));
                 modelPromo.set("allocation",dataItem.get("allocation"));
                 modelPromo.set("is_not_active",dataItem.get("is_not_active"));
                  modelPromo.set("remarks",dataItem.get("remarks"));

}

function closemodal(){
    $("#AddNewPage").modal("hide");
}