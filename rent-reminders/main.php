<?php require('../partials/header.php') ?>
<?php require('../partials/top-nav.php') ?>
<?php require('../partials/bread.php') ?>
  
<style>
	.floating-btn {
position: absolute;
top: 0px;
right: 0px;
}

.position-relative {
	position: relative;
}

.max-width-wrap {
	margin: 0 30px;
}

.btn.btn-reduced-auto {
	width: auto;
	padding-left: 10px;
	padding-right: 10px;
}

.sd-table td, .sd-table th {
	font-size: 13px;
}

</style>


<div class="row">
		<div class="col-md-12">

		<div class="wrap-g wrap-g-m">
		<div class="max-width-wrap position-relative">
			<div class="floating-btn">
	            <a href="#" class="btn btn-primary btn-reduced btn-reduced-auto" data-target="#updateHouseHold" data-toggle="modal">Change Tenant Details</a>
	            <a href="#" class="btn btn-primary btn-reduced btn-reduced-auto btn-dark" data-target="#removeHouseHold" data-toggle="modal">Remove</a>
        </div>
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

				<div class="info-group ">
					<h3>$100 Per Month</h3>
					<div class="v-lighter-text">Rent</div>	
				</div>

                              
				<div class="info-group bg-gray">                                    
					<h3 id="caption_balance">Up to date</h3>
                    <div class="v-lighter-text" id="caption_due_date">Next payment due 18/09/2014</div>
                    <div class="info-g-action">  <button class="btn btn-primary btn-lg">&nbsp;&nbsp;&nbsp;Enter Payment&nbsp;&nbsp;&nbsp;</button> </div>
				</div>


				<?php include('rent-reminder-section.php'); ?>                             


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
		<tbody>
    <tr>
          <td>06/10/2014</td>
          <td><div>21/10/2014 - 21/10/2014 ($100)</div><div>14/10/2014 - 20/10/2014 ($300)</div></td>
          <td>$400</td>
          <td><div class="tbl-action-text">
              <a href="javascript:edit(301)">Edit</a> - 
              <a href="javascript:remove(301)">Remove</a> -
              <a href="javascript:remove(301)">Send Reciept</a>
             </div>
             <div style="font-size:11px; margin-top:3px;" class="v-lighter-text"> Rent Reciept sent last 22/3/13 </div>
	    </td>
  	</tr>

    <tr>
          <td>06/10/2014</td>
          <td><div>21/10/2014 - 21/10/2014 ($100)</div><div>14/10/2014 - 20/10/2014 ($300)</div></td>
          <td>$400</td>
          <td><div class="tbl-action-text">
              <a href="javascript:edit(301)">Edit</a> - 
              <a href="javascript:remove(301)">Remove</a> -
              <a href="javascript:remove(301)">Send Reciept</a>
             </div>
	    </td>
  	</tr>

  	    <tr>
          <td>06/10/2014</td>
          <td><div>21/10/2014 - 21/10/2014 ($100)</div><div>14/10/2014 - 20/10/2014 ($300)</div></td>
          <td>$400</td>
          <td><div class="tbl-action-text">
              <a href="javascript:edit(301)">Edit</a> - 
              <a href="javascript:remove(301)">Remove</a> -
              <a href="javascript:remove(301)">Send Reciept</a>
             </div>
             <div style="font-size:11px; margin-top:3px;" class="v-lighter-text"> Rent Reciept sent last 22/3/13 </div>
	    </td>
  	</tr>

    <tr>
          <td>06/10/2014</td>
          <td>07/10/2014 - 13/10/2014</td>
          <td>$300</td>
          <td><div class="tbl-action-text">
           <a href="javascript:edit(300)">Edit</a> -
           <a href="javascript:remove(300)">Remove</a> - 
		   <a href="javascript:remove(300)">Send Reciept</a>
           </div></td>
  </tr>

</tbody>
	</table>


	<div class="row">
		<div class="col-md-12">
			<div class="clearfix">
			<!--	<p class="text-center"> <a href="#">Show More Results</a> </p> -->
			</div>
		</div>
	</div>

</div>
			</div>

		</div>	

		</div>
	</div>

<?php require('partials/update-household.php') ?>
<?php require('partials/remove-household.php') ?>
<?php require('../partials/footer.php') ?>