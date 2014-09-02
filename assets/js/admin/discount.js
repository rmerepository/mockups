var dtItems = {items:'',type:'',amount:0};
var dtGroups = {value:'',type:'',caption:'',group:''};

var cur_date = new Date();


Date.prototype.format = function(format) //author: meizz
{
  var o = {
    "M+" : this.getMonth()+1, //month
    "d+" : this.getDate(),    //day
    "h+" : this.getHours(),   //hour
    "m+" : this.getMinutes(), //minute
    "s+" : this.getSeconds(), //second
    "q+" : Math.floor((this.getMonth()+3)/3),  //quarter
    "S" : this.getMilliseconds() //millisecond
  }

  if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
    (this.getFullYear()+"").substr(4 - RegExp.$1.length));
  for(var k in o)if(new RegExp("("+ k +")").test(format))
    format = format.replace(RegExp.$1,
      RegExp.$1.length==1 ? o[k] :
        ("00"+ o[k]).substr((""+ o[k]).length));
  return format;
}

var modelDiscount = kendo.observable({
    promo_id:0,
    promo_code:'',
    promo_description:'',
    counter:0,
    counter_per_user:0,
    start_date: cur_date.format('yyyy-MM-dd 00:00:00'),
    expiry_date:cur_date.format('yyyy-MM-dd 23:59:59'),
    status:'Active',
    site:'ME',
    credit:0,
    
    itemList:[],
    items:'Sell My Estate Package',
    type:'%',
    amount:0,
    
    signVisible:false,
    groupList:[],
    userid:null,
    groupid:null,
    email:'',
    userVisible:true,
    groupVisible:false,
    emailVisible:false,
    userSelectValue:null,
    onChangeUsers: function(e){
        var groupVal = this.get('userSelectValue');
        this.set('userVisible',false);
        this.set('groupVisible',false);
        this.set('emailVisible',false);
        switch(groupVal.value){
            case 'users':
                 this.set('userVisible',true);
                break;
            case 'group':
                 this.set('groupVisible',true);
                break;
            case 'email':
                 this.set('emailVisible',true);
                break;            
        }

    },
    addGroups:function(){
         var groupVal = this.get('userSelectValue');
        switch(groupVal.value){
            case 'users':
                var autoVal = this.get('userid');
                dtGroups.value = autoVal.id;
                dtGroups.caption =autoVal.info;
                break;
            case 'group':
                 var userType = this.get('groupid');
                dtGroups.value = userType.id;
                dtGroups.caption =userType.value;                
                break;
            case 'email':
                dtGroups.value = this.get('email');
                dtGroups.caption =this.get('email');
                break;            
        }        
        
        dtGroups.group = groupVal.value;
        dtGroups.type = groupVal.text;
        this.get("groupList").push(dtGroups);

    },
    removeGroup:function(e){
        var item = e.data;
        var items = this.get("groupList");
        var index = items.indexOf(item);
        items.splice(index, 1);
    },
    
    
    data_source_user:[],
    data_source_groups:[
        {id:1,value:'Registered Users'},
        {id:7, value:'Administrators'}
    ],
    data_source_active:[
        { text: "Active", value: "active" },
        { text: "Offline", value: "offline" },
        { text: "Expired", value: "expired" },
        { text: "Redeemed", value: "redeemed" }
    ],
    data_source_type:[{ text: "%", value: "%" },{ text: "$", value: "$" }],
    data_source_users:[
        { text: "Users", value: "users" },
        { text: "User group", value: "group" },
        { text: "Email", value: "email" }
    ],
    data_source_site:[
        { text: "RME/SME", value: "ME" },
        { text: "SME", value: "SME" },
        { text: "RME", value: "RME" }
    ],    
    data_source_items:[
        { text: "Sell My Estate Package", value: "Sell My Estate Package" },
        { text: "Value Report",value: "Value Report" },
        { text: "For Sale Sign/Additional Sign",value:"For Sale Sign" },
        { text: "For Lease Sign", value:"For Lease Sign" },
        { text: "SME advertise", value:"SME realestate.com.au"},
         { text: "RME advertise", value:"RME realestate.com.au"},
          { text: "SME Total Purchase", value:"SME purchase"},
           { text: "RME Total Purchase", value:"RME purchase"}
    ],
    
    addItems: function(){
        dtItems.amount = this.get('amount');
        dtItems.items = this.get('items');
        dtItems.type = this.get('type');
       this.get("itemList").push(dtItems);
    },
    
    removeItem:function(e){
        var item = e.data;
        var items = this.get("itemList");
        var index = items.indexOf(item);
        items.splice(index, 1);
    },
    
    onChangePromo:function(){
        if(parseInt(this.get('promo_id'))<1){
            var data = {
                promo_code:this.get('promo_code')
            };
            $.ajax({
                type:"POST",
                url:'/admin/discount/checkStatus',
                data:$.extend({},pobj,data),
                dataType: "json",
                success:function (data) {
                        if(data.status =='warning'){
                            uiAlertMsg(data.description,'warning');
                        }

                },
                error:function (jqXHR, status) {
                    uiAlertMsg('Internal error','error');
                }
            });            
        }
    }
});


$(document).ready(function () {

    getUsers();
                
    kendo.bind($("#frmDiscount"), modelDiscount);
    
    //-- button 
    $('#btnSave').click(function(){
        if(validate()){
            
            //--- for group
            var group = [];
            var users = [];
            for(var ctr=0;ctr <modelDiscount.get('groupList').length;ctr++){
                if(modelDiscount.get('groupList')[ctr]['group'] == 'group'){
                    group.push(modelDiscount.get('groupList')[ctr]['value']);
                }else{
                    users.push(modelDiscount.get('groupList')[ctr]['value']);
                }
            }
            var data = {
                 id:                modelDiscount.get('promo_id'),
                 group_id:          group.join(','),
                 user_id:           users.join(','),
                 promo_code:        modelDiscount.get('promo_code'),
                 description:       modelDiscount.get('promo_description'),
                 value:             modelDiscount.get('itemList').toJSON(),
                 counter:           modelDiscount.get('counter'),
                 counter_per_user:  modelDiscount.get('counter_per_user'),
                 start_date:        kendo.toString(modelDiscount.get("start_date"),"yyyy-MM-dd HH:mm:00"),
                 expiry_date:       kendo.toString(modelDiscount.get("expiry_date"),"yyyy-MM-dd HH:mm:00"),
                 status:            modelDiscount.get('status') ,
                 site:              modelDiscount.get('site') ,
                 credit:              modelDiscount.get('credit') 
                 
            };
            
            $.ajax({
                type:"POST",
                url:'/admin/discount/save_promo',
                data:$.extend({},pobj,data),
                dataType: "json",
                success:function (data) {
                    uiAlertMsg('Promo code saved','success')
                    setTimeout(function(){
                                       window.location.href = window.location.protocol+'//'+window.location.host +
                          '/admin/discount'
                    }, 2000);

                },
                error:function (jqXHR, status) {
                    uiAlertMsg('Internal error','error');
                }
            });            
            //-- start the loop on group
        }
    })
});


function getUsers(){
    $.get( "/api/lists?type=users", function( data ) {
            modelDiscount.set('data_source_user',data.data)
            if(g_promo>0){
                setValues(g_promo,g_status);
            }
        });
}

function validate(){
    
    return true;
}


function setValues(promo_id,status){
            $.ajax({
                type:"POST",
                url:'/admin/discount/get_promo',
                data:$.extend({},pobj,{promo:promo_id,status:status}),
                dataType: "json",
                success:function (response) {
                    modelDiscount.set('promo_id',response.data.id);
                    modelDiscount.set('promo_code',response.data.promo_code);
                    modelDiscount.set('promo_description',response.data.description);
                    modelDiscount.set('counter',response.data.counter);
                    modelDiscount.set('counter_per_user',response.data.counter_per_user);
                    modelDiscount.set('start_date',response.data.start_date);
                    modelDiscount.set('expiry_date',response.data.expiry_date);
                    modelDiscount.set('status',response.data.status);
                    modelDiscount.set('site',response.data.site);
                     modelDiscount.set('credit',response.data.credit);
                    
                    for(var ctr=0;ctr<response.items.length;ctr++){
                        dtItems.amount =response.items[ctr].code_value;
                        var ui_item = response.items[ctr].item== 'sign'?
                                        response.items[ctr].site=='RME'?'For Lease Sign':
                                                'For Sale Sign':response.items[ctr].item;
                        
                        dtItems.items = ui_item;
                        dtItems.type = response.items[ctr].reward_type;
                       modelDiscount.get("itemList").push(dtItems);
                    }
                    
                    
                    for(var ctr=0;ctr<response.group.length;ctr++){
                       var userType = getGroup(response.group[ctr]);
                       if(userType){
                        dtGroups.value = userType.id;
                        dtGroups.caption =userType.value;                           
                        dtGroups.group = 'group';
                        dtGroups.type = 'User group';
                        modelDiscount.get("groupList").push(dtGroups);
                    }
                    }
                    
                    for(var ctr=0;ctr<response.user.length;ctr++){
                       var userinfo = getUsersInfo(response.user[ctr]);
                       if(userinfo.id){
                        dtGroups.value = userinfo.id;
                        dtGroups.caption =userinfo.info;    
                        var grouptype = parseInt(userinfo.id)>0?
                                    {type:'Users',value:'users'}:
                                    {type:'Email',value:'email'}
                        dtGroups.group = grouptype.value;
                        dtGroups.type = grouptype.type;
                        modelDiscount.get("groupList").push(dtGroups);
                    }
                    }                     
                },
                error:function (jqXHR, status) {
                    
                }
            });            
}

function getGroup(group_id){
    var ret = null;
    $.each(modelDiscount.get('data_source_groups'),
        function(ndx,val){
            if(group_id == val.id){
                ret = val;
                return;
            }
        });
        return ret;
}

function getUsersInfo(user_id){
    var email = parseInt(user_id)>0?'':user_id;
    
    if(email !=''){
        return {id:email,info:email};
    }else{
        var userid =0;
       $.each(modelDiscount.get('data_source_user'),
        function(ndx,val){
            if(user_id == val.id){
                userid = val;
                return;
            }
        });
        return userid;
    }
}