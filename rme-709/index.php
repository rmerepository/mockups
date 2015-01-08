<?php require('../partials/header.php') ?>
<?php require('../partials/top-nav.php') ?>
<?php require('../partials/bread.php') ?>

<style type="text/css">
	.br-bt-gr { border-bottom: 1px solid #E1E1E1; }
	.basic-pad { padding: 14px 16px; }

	.wrap-main-holder {
		height: 224px;
	}

	.top-cp-action {
		color: #FFF;
		font-size: 35px;
		position: absolute;
		top: 0px;
		right: 0px;
		z-index: 4;
		display: inline-block;
		text-align: right;
		width: 140px;
	}

	.top-cp-action a {
		font-size: 25px;
		padding: 4px 11px;
		display: inline-block;
		float: left;
	}

	.top-cp-action a:hover {
		background-color: rgba(0, 0, 0, 0.38);
	}
	.top-cp-action .fa-edit {
		top: auto;
	}

</style>

<div class="row">
		<div class="col-md-12">

		<div class="wrap-g wrap-g-m">
		<div class="max-width-wrap position-relative">
				<h2 class="rb-font text-center mnu-40 f42 f42-r">Rent Payments</h2>	
		</div>
		</div>
			
		<div class="push-up-wrap-hi" style="margin-top: -335px;"> 
			<div class="single-col-mid w-shadow bg-white rb-font">
			

				
<div id="payment-wrap-info" class="wrap-main-holder   " style="background-image: url(https://members.rentmyestate.com.au/assets/uploads/userfiles/737/737-67918854954a1502fac252)">


	<div class="top-cp-action" id="divButton">
		<a href="#" id="linkRentUpdate" rel="tooltip" data-original-title="Rent Update" data-placement="top" data-toggle="tooltip"> <span class="fa fa-line-chart"></span> </a>
		<a href="javascript:update_household(77)" rel="tooltip" data-original-title="Change lease details" data-placement="top" data-toggle="tooltip"> <span class="fa fa-edit"></span> </a>
		<a href="#" data-original-title="Remove tenancy" rel="tooltip" data-placement="top" data-toggle="modal" data-target="#removeHouseHold"> <span class="fa fa-trash-o"></span> </a>
	</div>


	<div class="content">
		<div class="f26 fw-100">1.4 / 1.4 Test Street, Tesbury </div>
		<div class="f14" id="tname">Sam Sparro</div>
	</div>
</div>				
	


	<div id="addUpdateTenant" class="colpd-content collapse">

	<div class="brdr-top brdr-bottom cc-inner">

	<p>Add more tenant and select your main tenant</p>

	<div class="awe-wrap nice-scroll">

		<table class="table rs-table table-hover">
			<tbody><tr>
				<td width="3%">
					<div class="radio-group custom-radio-field">
                     <input type="radio" name="primaryTenant" id="user1" value="user1" checked="true"><label for="user1">&nbsp;</label>
                     </div>
				</td>
				<td width="73%">
					<h3 class="namef-d">John Doe</h3>
					<div class="emailf-d v-lighter-text">john@gmail.com</div>
				</td>
				<td width="15%">
					<a href="#" data-toggle="modal" data-target="#addTenantOne">Edit</a> - <a href="#">Remove</a>
				</td>
			</tr>
			<tr>
				<td width="3%">
					<div class="radio-group custom-radio-field">
                     <input type="radio" name="primaryTenant" id="user2" value="user2"><label for="user2">&nbsp;</label>
                     </div>
				</td>
				<td width="73%">
					<h3 class="namef-d">Jane Doe</h3>
					<div class="emailf-d v-lighter-text">jane@gmail.com</div>
				</td>
				<td width="15%">
					<a href="#" data-toggle="modal" data-target="#addTenantOne">Edit</a> - <a href="#">Remove</a>
				</td>
			</tr>
		</tbody></table>

	</div>

		<p class="text-left	">
		 <span class="mm-link" data-toggle="collapse" data-target="#addUpdateTenant">Cancel</span> &nbsp;&nbsp;&nbsp;	<button class="btn btn-primary btn-lg" data-toggle="modal" data-target="#addTenantOne">Add Tenant</button>
		</p>
	</div>
</div>	

<div class="modal fade" id="addTenantOne" tabindex="-1" role="dialog" aria-labelledby="addTenantOne" aria-hidden="true">
<div class="modal-dialog overflow-visible">
	<div class="modal-content">
	<div class="modal-header">
	 <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
		<h2>Add Tenant</h2>
	</div>
	
	<div class="modal-body">
		<div class="control-group">
			<label class="control-label" for="firstName">First Name</label>
			<div class="controls">
				<input name="firstName" placeholder="First Name" class="form-control fc-large" maxlength="30" tabindex="1" value="" type="text">
			</div>
			<p class="uihelp-text">If multiple tenants, enter the main contact</p>
		</div>
		<div class="control-group">
			<label class="control-label" for="lastName">Last Name</label>
			<div class="controls">
				<input name="lastName" placeholder="Last Name" class="form-control fc-large" maxlength="30" tabindex="1" value="" type="text">
			</div>
		</div>

		<div class="control-group">
			<label class="control-label" for="mobileNumber">Mobile Number</label>
			<div class="controls">
				<input name="mobileNumber" placeholder="Mobile Number" class="form-control fc-large" maxlength="30" tabindex="1" value="" type="text"> <span class="tooltip-blue pop-over-right" data-toggle="popover" data-html="true" data-trigger="hover" data-placement="right" data-content="Soon we'll be able to send late notifications when your tenants have not paid their rent." style="vertical-align: top;" data-original-title="Coming Soon"></span>
			</div>
		</div>

		<div class="control-group">
			<label class="control-label" for="paymentPeriod">Email Address</label>
			<div class="controls">
				<input name="rentAmount" placeholder="Email" class="form-control fc-large" maxlength="30" tabindex="1" value="" type="text">  <span class="tooltip-blue pop-over-right" data-toggle="popover" data-html="true" data-trigger="hover" data-placement="right" data-content="Soon your tenant will be able to log in and see all their payments and get rent reminders." style="vertical-align: top;" data-original-title="Coming Soon"></span>
			</div>
		</div>
	</div>

	<div class="modal-footer">
		 <a href="#" data-dismiss="modal" aria-hidden="true">Cancel</a> &nbsp;&nbsp;&nbsp; <button class="btn btn-primary">Save Changes</button>
	</div>
	</div>	
</div>
</div>
	
	<div class="container bg-gray br-bt-gr basic-pad">
		<div class="row">

			<?php if( isset( $_GET["rent_increase"]) ) { ?>
				<div class="col-md-7">
					<div class="f14">Rent Increase on 02/12/2015 - 08/12/2015 &bull; <a href="#" data-toggle="modal" data-target="#cancelRentIncrease">Cancel Increase</a> </div>	
				</div>
			<?php } else {  ?>
				<div class="col-md-7">
					<div class="f14" id="capRent">$300 Per Week</div>		
				</div>
			<?php }   ?>	
			
			<div class="col-md-5">
		        <div> <b class="text-danger" id="caption_balance">$1,500 owing</b> <span class="f14" id="caption_due_date">Rent Due</span></div>
	        </div>
		</div>
	</div>


         <div class="clearfix menu-collection">
<div class="overlap-desc">
		<h3 class="sm-hd">Enter Payments</h3>
	</div>

<div class="pull-left act">
	<h3 class="sm-hd">&nbsp;</h3>
	<div class="v-lighter-text sub-desc">&nbsp;</div>
	<button id="money_in" class="btn btn-primary btn-large">Received</button>
</div>
<div class="pull-left act">
	<h3 class="sm-hd">&nbsp;</h3>
	<div class="v-lighter-text sub-desc">&nbsp;</div>
	<button id="money_out" class="btn btn-primary btn-large">&nbsp;&nbsp;Spent&nbsp;&nbsp;&nbsp;</button>
</div>
<div class="pull-left act">
	<h3 class="sm-hd"><span id="lblRentReminider">Turned off</span> <span id="addAdressPopover" data-html="true" data-trigger="hover" data-toggle="popover" data-original-title="Rent Reminders" data-content="If your tenant has missed or not paid their rent in full, they will receive email notifications over the following 16 days or until the rent is paid. Please ensure you still follow the formal procedures to terminate the tenancy if they don’t pay. <a href='http://www.rentmyestate.com.au/rent-payments/' target='_blank'>Read more." class="tooltip-blue po-small pop-over-right base-align" data-placement="right"></span></h3>
	<div class="v-lighter-text sub-desc">Rent Reminders</div>

	<div class="sw_small onoffswitch clearfix inline-block va-middle">
	<input type="checkbox" name="rentReminiders" class="onoffswitch-checkbox" id="rentReminiders">
	<label class="onoffswitch-label" for="rentReminiders">
	<div class="onoffswitch-inner"></div>
	<div class="onoffswitch-switch"></div>			        
	</label>
	</div>

</div>
</div>	 
                             
				
<div class="modal fade" id="addPayment" role="dialog" aria-labelledby="addPayment" aria-hidden="true">
<div class="modal-dialog">
     <form action="https://members.rentmyestate.com.au/" accept-charset="utf-8" method="post" id="frmPayment"><div style="display:none">
<input type="hidden" name="i9XAoSSyVr8I" value="d14ff716e0bf53cd1d4818c8054fec5d">
</div>    <input type="hidden" name="lease" id="lease" value="77">
    <input type="hidden" name="collection" id="collection">
    <input type="hidden" name="old_type" id="old_type">
	<div class="modal-content">
	<div class="modal-header">
	 <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
         <h2 id="captionPayment">Add New Payment</h2>
	</div>
	
	<div class="modal-body">

		<div class="control-group">
			<label class="control-label" for="dateRecieved">Date Received</label>
			<div class="controls">
				<input autocomplete="off" data-type="date" data-is-required="true" name="dateRecieved" id="dateRecieved" placeholder="01-Jan-2014" s="" class="ui-date-received enable-click-date-window form-control hasDatepicker" maxlength="30" type="text" value="08-Jan-2015"><img class="ui-datepicker-trigger" src="/assets/images/calendar-btn.png" alt="..." title="...">
			</div>
		</div>	

        <div class="control-group">
            <label class="control-label" for="fortype">Received For</label>
            <div class="controls">
                <span class="k-widget k-dropdown k-header" unselectable="on" role="listbox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-owns="fortype_listbox" aria-disabled="false" aria-readonly="false" aria-busy="false" aria-activedescendant="fortype_option_selected" style=""><span unselectable="on" class="k-dropdown-wrap k-state-default"><span unselectable="on" class="k-input">Rent</span><span unselectable="on" class="k-select"><span unselectable="on" class="k-icon k-i-arrow-s">select</span></span></span><input data-is-required="true" name="fortype" id="fortype" placeholder="Select how often" maxlength="30" value="" type="text" data-role="dropdownlist" style="display: none;"></span> 
            </div> 
        </div>

        <div class="control-group" id="section_newtype" style="display:none">
            <div class="controls">
                <input autocomplete="off" data-is-required="true" name="newtype" id="newtype" placeholder="Enter New Type" class="form-control" maxlength="30" value="" type="text">
            </div>
        </div>


  <div class="control-group">
      <label class="control-label" for="amount">Amount Received</label>
      <div class="controls">
        <input autocomplete="off" data-is-required="true" name="amount" id="amount" data-type="amount" placeholder="$" class="form-control" maxlength="30" value="" type="text">
      </div>
    </div>
    
        <div class="control-group" id="section_description" style="display:none">
            <label class="control-label" for="description">Description</label>
            <div class="controls">
                <textarea name="description" id="description" placeholder="For June - Aug 14 qrt" class="form-control" maxlength="1000"></textarea>  
            </div> 
        </div>

	</div>



	<div class="modal-footer">
		 <a href="#" data-dismiss="modal" aria-hidden="true">Cancel</a> &nbsp;&nbsp;&nbsp; <button class="btn btn-primary" type="submit" id="confirmPayment">Confirm Payment</button>
	</div>
	</div>	
    </form></div>


</div>


				
<div class="modal fade" id="addExpense" role="dialog" aria-labelledby="addExpense" aria-hidden="true">
<div class="modal-dialog">
     <form action="https://members.rentmyestate.com.au/" accept-charset="utf-8" method="post" id="frmExpense"><div style="display:none">
<input type="hidden" name="i9XAoSSyVr8I" value="d14ff716e0bf53cd1d4818c8054fec5d">
</div>    <input type="hidden" name="xlease" id="xlease" value="77">
    <input type="hidden" name="xcollection" id="xcollection">
	<div class="modal-content">
	<div class="modal-header">
	 <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
         <h2 id="xcaptionPayment">Enter Your Expense</h2>
	</div>
	
	<div class="modal-body">

		<div class="control-group">
			<label class="control-label" for="xdateRecieved">Date Paid</label>
			<div class="controls">
				<input autocomplete="off" data-type="date" data-is-required="true" name="xdateRecieved" id="xdateRecieved" placeholder="01-Jan-2014" s="" class="ui-date-received enable-click-date-window form-control hasDatepicker" maxlength="30" type="text" value="08-Jan-2015"><img class="ui-datepicker-trigger" src="/assets/images/calendar-btn.png" alt="..." title="...">
			</div>
		</div>	

        <div class="control-group">
            <label class="control-label" for="xfortype">Paid For</label>
            <div class="controls">
                <span class="k-widget k-dropdown k-header" unselectable="on" role="listbox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-owns="xfortype_listbox" aria-disabled="false" aria-readonly="false" aria-busy="false" aria-activedescendant="xfortype_option_selected" style=""><span unselectable="on" class="k-dropdown-wrap k-state-default"><span unselectable="on" class="k-input">General Maintenance</span><span unselectable="on" class="k-select"><span unselectable="on" class="k-icon k-i-arrow-s">select</span></span></span><input data-is-required="true" name="xfortype" id="xfortype" placeholder="Select how often" maxlength="30" value="" type="text" data-role="dropdownlist" style="display: none;"></span>
            </div> 
        </div>

        <div class="control-group" id="xsection_newtype" style="display:none">
            <div class="controls">
                <input autocomplete="off" data-is-required="true" name="xnewtype" id="xnewtype" placeholder="Enter New Type" class="form-control" maxlength="30" value="" type="text">
            </div>
        </div>

                <div class="control-group">
            <label class="control-label" for="xdescription">Description</label>
            <div class="controls">
                <textarea name="xdescription" id="xdescription" placeholder="Repair dishwasher handle" class="form-control" maxlength="1000"></textarea>
            </div> 
        </div>


  <div class="control-group">
      <label class="control-label" for="xamount">Amount Paid</label>
      <div class="controls">
        <input autocomplete="off" data-is-required="true" data-type="amount" name="xamount" id="xamount" placeholder="$" class="form-control" maxlength="30" value="" type="text">
      </div>
    </div>



	</div>



	<div class="modal-footer">
		 <a href="#" data-dismiss="modal" aria-hidden="true">Cancel</a> &nbsp;&nbsp;&nbsp; <button class="btn btn-primary" type="submit" id="xconfirmPayment">Confirm Expense</button>
	</div>
	</div>	
    </form></div>


</div>


				<div class="info-group text-center bg-gray">
					<h3>Payment History</h3>
					<div class="mnu">
						<a href="#" id="btnfinancial" class="f12">
							<i class="fa fa-paste"></i> Financial Statement
						</a>
					</div>
				</div>


				
				<div class="uiTabs two-item blue-th no-border-lr">
				<ul class="nav nav-tabs">
					<li class="active">
						<a title="Owner Ledger" class="text-left first-child" href="#ownerLedger" data-toggle="tab">Owner Ledger</a>
                        <a id="printOnwerLedger" href="https://members.rentmyestate.com.au/collection/generate/pdf/owner/117/77" class="ex-action" title="print owner ledger"> <span class="fa fa-print"></span> Print Ledger</a>
					</li>
					<li>
						<a title="Tenant Ledger" class="fi text-left" href="#tenantLedger" data-toggle="tab">Tenant Ledger</a>
						<a id="printLedger" href="https://members.rentmyestate.com.au/collection/generate/pdf/ledger/117/77" class="ex-action" title="print tenant ledger"> <span class="fa fa-print"></span> Print Ledger</a>
					</li>
				</ul>
				</div>

				<div class="tab-content">
					<div class="tab-pane active" id="ownerLedger">
					<div class="brdr-top">
	<table class="table sd-table" id="recExpenseHistory">
		<thead>
			<tr class="bg-gray">
				<td width="12%">Date Paid</td>
                <td width="12%">For</td>
				<td width="29%">Period / Description</td>
				<td width="12%">Amount</td>
				<td width="12%">Balance</td>
				<td width="23%">Action</td>
			</tr>
		</thead>
		<tbody>
    <tr>
        <td>10/12/2014</td>
        <td>Rent</td>
        <td><div>02/12/2014 - 08/12/2014 ($300)</div><div>25/11/2014 - 01/12/2014 ($300)</div><div>18/11/2014 - 24/11/2014 ($100)</div></td>
        <td><span class="text-success">+</span>$700</td>
        <td><span class="text-success">+</span>$2,601</td>
        <td>
            <div class="tbl-action-text">
                

                <a href="javascript:edit(1382)" rel="tooltip" data-original-title="Edit" data-placement="top" data-toggle="tooltip"> <span class="fa fa-edit"></span>   </a>
                <a href="javascript:remove(1382,'Rent')" rel="tooltip" data-original-title="Remove this Payment" data-placement="top" data-toggle="tooltip"> <span class="fa fa-trash-o text-danger"></span> </a>
                <a href="javascript:sendReceipt(1382,'Rent')" rel="tooltip" data-original-title="Email your tenant a receipt" data-placement="top" data-toggle="tooltip"> <span class="fa fa-file-text-o text-success"></span>   </a>
                

            </div>

            
        </td>

    </tr>


    <tr>
        <td>19/11/2014</td>
        <td>Rent</td>
        <td>18/11/2014 - 18/11/2014 ($200)</td>
        <td><span class="text-success">+</span>$200</td>
        <td><span class="text-success">+</span>$1,901</td>
        <td>
            <div class="tbl-action-text">
                
                <a href="javascript:edit(808)" rel="tooltip" data-original-title="Edit" data-placement="top" data-toggle="tooltip"> <span class="fa fa-edit"></span>   </a>
                <a href="javascript:remove(808,'Rent')" rel="tooltip" data-original-title="Remove this Payment" data-placement="top" data-toggle="tooltip"> <span class="fa fa-trash-o text-danger"></span> </a>
                <a href="javascript:sendReceipt(808,'Rent')" rel="tooltip" data-original-title="Email your tenant a receipt" data-placement="top" data-toggle="tooltip"> <span class="fa fa-file-text-o text-success"></span>   </a>
                

            </div>

            
        </td>

    </tr>


    <tr>
        <td>14/11/2014</td>
        <td>Rent</td>
        <td><div>11/11/2014 - 17/11/2014 ($300)</div><div>04/11/2014 - 10/11/2014 ($300)</div><div>28/10/2014 - 03/11/2014 ($100)</div></td>
        <td><span class="text-success">+</span>$700</td>
        <td><span class="text-success">+</span>$1,701</td>
        <td>
            <div class="tbl-action-text">
                
                <a href="javascript:edit(606)" rel="tooltip" data-original-title="Edit" data-placement="top" data-toggle="tooltip"> <span class="fa fa-edit"></span>   </a>
                <a href="javascript:remove(606,'Rent')" rel="tooltip" data-original-title="Remove this Payment" data-placement="top" data-toggle="tooltip"> <span class="fa fa-trash-o text-danger"></span> </a>
                <a href="javascript:sendReceipt(606,'Rent')" rel="tooltip" data-original-title="Email your tenant a receipt" data-placement="top" data-toggle="tooltip"> <span class="fa fa-file-text-o text-success"></span>   </a>
                

            </div>

            
        </td>

    </tr>




    <tr>
        <td>08/09/2014</td>
        <td>Rent</td>
        <td>07/10/2014 - 07/10/2014 ($100)</td>
        <td><span class="text-success">+</span>$100</td>
        <td><span class="text-success">+</span>$100</td>
        <td>
            <div class="tbl-action-text">
                
                <a href="javascript:edit(489)" rel="tooltip" data-original-title="Edit" data-placement="top" data-toggle="tooltip"> <span class="fa fa-edit"></span>   </a>
                <a href="javascript:remove(489,'Rent')" rel="tooltip" data-original-title="Remove this Payment" data-placement="top" data-toggle="tooltip"> <span class="fa fa-trash-o text-danger"></span> </a>
                <a href="javascript:sendReceipt(489,'Rent')" rel="tooltip" data-original-title="Email your tenant a receipt" data-placement="top" data-toggle="tooltip"> <span class="fa fa-file-text-o text-success"></span>   </a>
                

            </div>

            
        </td>

    </tr>

</tbody>
	</table>


<div class="row">
    <div class="col-md-12">
      <div class="clearfix">
        <p class="text-center">  <a id="xpaging" style="display:none" href="javascript:nextExpensePage()">Show More Results</a> </p>
      </div>
    </div>
  </div>

</div>

					</div>

					<div class="tab-pane" id="tenantLedger">
						<div class="brdr-top">
	<table class="table sd-table" id="recHistory">
		<thead>
			<tr class="bg-gray">
				<td width="12%">Date Paid</td>
                <td width="12%">For</td>
				<td width="41%">Period / Description</td>
				<td width="12%">Amount</td>
				<td width="23%">Action</td>
			</tr>
		</thead>
		<tbody>
    <tr>
          <td>10/12/2014</td>
          <td>Rent</td>
          <td><div>02/12/2014 - 08/12/2014 ($300)</div><div>25/11/2014 - 01/12/2014 ($300)</div><div>18/11/2014 - 24/11/2014 ($100)</div></td>
          <td>$700</td>
          <td>
          	<div class="tbl-action-text">
	             <a href="javascript:edit(1382)" rel="tooltip" data-original-title="Edit" data-placement="top" data-toggle="tooltip"> <span class="fa fa-edit"></span>   </a>  
	             <a href="javascript:remove(1382,'Rent')" rel="tooltip" data-original-title="Remove this Paymet" data-placement="top" data-toggle="tooltip"> <span class="fa fa-trash-o text-danger"></span> </a> 
	             <a href="javascript:sendReceipt(1382,'Rent')" rel="tooltip" data-original-title="Email your tenant a receipt" data-placement="top" data-toggle="tooltip"> <span class="fa fa-file-text-o text-success"></span>   </a>
             </div>

             
          </td>

  </tr>




</tbody>
	</table>


	<div class="row">
		<div class="col-md-12">
			<div class="clearfix">
				<p class="text-center"> <a id="paging" style="display:none" href="javascript:nextPage()">Show More Results</a> </p> 
			</div>
		</div>
	</div>

</div>
					</div>
				</div>
			
				

			</div>

		</div>	

		</div>
	</div>

<script type="text/javascript">
	$(function(){
		$('#linkRentUpdate').click(function() {
			$('#rentUpdate').modal();
		});
	})

</script>	

<?php require('partials/cancel-rent-update.php') ?>
<?php require('partials/rent-update.php') ?>


<?php require('../partials/footer.php') ?>