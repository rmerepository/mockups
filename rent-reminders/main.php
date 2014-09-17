<?php require('../partials/header.php') ?>
<?php require('../partials/top-nav.php') ?>
<?php require('../partials/bread.php') ?>


<div class="row">
		<div class="col-md-12">

		<div class="wrap-g wrap-g-m">
		<div class="max-width-wrap position-relative">
			<h2 class="rb-font text-center mnu-40 f42 f42-r">Rent Payments</h2>	
			<h4 class="text-center rb-font mno-22">Enter rent payments and track exactly where your tenants are paid upto</h4>
		</div>
		</div>
			
		<div class="push-up-wrap-hi">
			<div class="single-col-mid w-shadow bg-white rb-font">
			
				<div class="info-group text-center">
					<h3>1a1 / 21 Greed , Wehla </h3>
					<div class="v-lighter-text">Property</div>
				</div>

				<div class="info-group bg-gray">
                    <h3>Gene Rivera</h3>
					<div class="v-lighter-text">Primary Tenant</div>
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
		<!-- 	<tr>
				<td width="15%">
					<div class="radio-group custom-radio-field">
                     <input type="radio" name="primaryTenant" id="user3" value="user3"><label for="user3">&nbsp;</label>
                     </div>
				</td>
				<td>
					<h3 class="namef-d">Sarah Doe</h3>
					<div class="emailf-d v-lighter-text">Sarah@gmail.com | +093123123</div>
				</td>
			</tr>
			<tr>
				<td width="15%">
					<div class="radio-group custom-radio-field">
                     <input type="radio" name="primaryTenant" id="user4" value="user3"><label for="user4">&nbsp;</label>
                     </div>
				</td>
				<td>
					<h3 class="namef-d">Dick Doe</h3>
					<div class="emailf-d v-lighter-text">Dick@gmail.com | +093123123</div>
				</td>
			</tr> -->
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

				<div class="info-group">
					<h3>$100 Per Month</h3>
					<div class="v-lighter-text">Rent</div>					
				</div>

                              
				<div class="info-group bg-gray">
                                     
					<h3 id="caption_balance">Up to date</h3>
                                        <div class="v-lighter-text" id="caption_due_date">Next payment due 18/09/2014</div>
                                        <div class="info-g-action">  <button class="btn btn-primary btn-lg">&nbsp;&nbsp;&nbsp;Enter Payment&nbsp;&nbsp;&nbsp;</button> </div>
				</div>


				<?php include('rent-reminder-section.php'); ?>                             


			
<div class="modal fade" id="addPayment" role="dialog" aria-labelledby="addPayment" aria-hidden="true">
<div class="modal-dialog">
     <form action="https://members-dev.rentmyestate.com.au/" accept-charset="utf-8" method="post" id="frmPayment"><div style="display:none">
<input type="hidden" name="i9XAoSSyVr8I" value="dc13d0b2fdc765011adb33e673609e73">
</div>    <input type="hidden" name="lease" id="lease" value="66">
    <input type="hidden" name="collection" id="collection">
	<div class="modal-content">
	<div class="modal-header">
	 <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
         <h2 id="captionPayment">Add New Payment</h2>
	</div>
	
	<div class="modal-body">

		<div class="control-group">
			<label class="control-label" for="dateRecieved">Date Received</label>
			<div class="controls">
				<input autocomplete="off" data-is-required="true" name="dateRecieved" id="dateRecieved" placeholder="01-Jan-2014" s="" class="ui-date-received enable-click-date-window form-control hasDatepicker" maxlength="30" tabindex="1" type="text" value="16-Sep-2014"><img class="ui-datepicker-trigger" src="/assets/images/calendar-btn.png" alt="..." title="...">
			</div>
		</div>	


		<div class="control-group">
			<label class="control-label" for="amount">Amount Received</label>
			<div class="controls">
				<input autocomplete="off" data-is-required="true" name="amount" id="amount" placeholder="$" class="form-control" maxlength="30" tabindex="1" value="" type="text">
			</div>
		</div>



		<p class="text-success paymentMsg ds-hide text-center">Payment has been saved</p>

	</div>



	<div class="modal-footer">
		 <a href="#" data-dismiss="modal" aria-hidden="true">Cancel</a> &nbsp;&nbsp;&nbsp; <button class="btn btn-primary" type="submit" id="confirmPayment">Confirm Payment</button>
	</div>
	</div>	
    </form></div>


</div>


<div class="modal fade" id="Remove_confirm" tabindex="-1" role="dialog" aria-labelledby="reaConfirmation" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
	<div class="modal-header">
	  <button class="close" data-dismiss="modal">×</button>
	  <h3>Do you want to delete this entry?</h3>
	</div>
	<div class="modal-body">
		<div></div>
                <div id="confirm_desc"></div>
                <input type="hidden" id="remove_lease" value="">
                <input type="hidden" id="remove_collection" value="">

	</div>

   <div class="modal-footer">

       <a href="#" data-dismiss="modal">Cancel</a>
         &nbsp;&nbsp;&nbsp;<button class="btn btn-primary" id="confirmDelete" data-dismiss="modal">Ok</button>
   </div>
</div>
      </div>
    </div>
				<div class="info-group text-center">
					<h3>Payment History</h3>
				</div>

			<div class="brdr-top">
	<table class="table sd-table" id="recHistory">
		<thead>
			<tr class="bg-gray">
				<td>Date Paid</td>
				<td>Period</td>
				<td>Amount</td>
				<td>Action</td>
			</tr>
		</thead>
		<tbody></tbody>
	</table>


	<div class="row">
		<div class="col-md-12">
			<div class="clearfix">
			<!--	<p class="text-center"> <a href="#">Show More Results</a> </p> -->
			</div>
		</div>
	</div>

</div>

<script id="template" type="text/x-kendo-template">
    <tr>
          <td>#=date  #</td>
          <td>#=period  #</td>
          <td>$#=amount  #</td>
          <td><div class="tbl-action-text">
                      <a href="javascript:edit(#=id#)">Edit</a>
              - 
                      <a href="javascript:remove(#=id#)">Remove</a></div></td>
  </tr>

</script>
			</div>

		</div>	

		</div>
	</div>


<?php require('../partials/footer.php') ?>