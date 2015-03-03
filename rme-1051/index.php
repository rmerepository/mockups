<?php
$body_app_class = "bg-gray rent-collection"; 
$app_module =""
?>

<?php require('../partials/header.php') ?>
<?php require('../partials/new-top-nav.php') ?>

<?php require('../partials/new-menu-top-property-dashboard.php') ?>

<div class="row">
		<div class="col-md-12">
			
		<div class="push-up-wrap-hi" style="margin-top: 20px;"> 
			<div class="single-col-mid w-shadow bg-white rb-font">
			

				
<div id="payment-wrap-info" class="wrap-main-holder   " style="background-image: url(https://members.rentmyestate.com.au/assets/uploads/userfiles/737/737-67918854954a1502fac252)">


	<div class="top-cp-action" id="divButton">
		<a href="#" id="linkRentUpdate" rel="tooltip" data-original-title="Rent Increase" data-placement="top" data-toggle="tooltip"> <span class="fa fa-line-chart"></span> </a>
		<a href="javascript:update_household(77)" rel="tooltip" data-original-title="Change lease details" data-placement="top" data-toggle="tooltip"> <span class="fa fa-edit"></span> </a>
		<a href="#" data-original-title="Remove tenancy" rel="tooltip" data-placement="top" data-toggle="modal" data-target="#removeHouseHold"> <span class="fa fa-trash-o"></span> </a>
	</div>


	<div class="content clearfix">
	<div class="pull-left">
				<div class="f14" id="tname">Sam Sparro</div>
		<div class="f14">
			<span id="capRent">$300 Per Week</span> -
			<b class="text-danger" id="caption_balance">$1,500 owing</b>
			<span class="f14" id="caption_due_date">Rent Due</span>
		</div>
	</div>

	<div class="pull-right">
		<a href="#" id="btnConnectPocketbook" class="gconnect btn btn-primary btn-large pop-over-right" data-placement="bottom" data-trigger="hover" data-toggle="popover" data-original-title="Automatically record rent" data-content="Never check if the rent has been paid again">Set Up Automatic Tracking</a>
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
	<button id="money_in" class="btn btn-primary">Received</button>
</div>
<div class="pull-left act">
	<h3 class="sm-hd">&nbsp;</h3>
	<div class="v-lighter-text sub-desc">&nbsp;</div>
	<button id="money_out" class="btn btn-primary">&nbsp;&nbsp;Spent&nbsp;&nbsp;&nbsp;</button>
</div>
<div class="pull-left act">
	<h3 class="sm-hd"><span id="lblRentReminider">Rent Reminders</span> <span id="addAdressPopover" data-html="true" data-trigger="hover" data-toggle="popover" data-original-title="Rent Reminders" data-content="If your tenant has missed or not paid their rent in full, they will receive email notifications over the following 16 days or until the rent is paid. Please ensure you still follow the formal procedures to terminate the tenancy if they don’t pay. <a href='http://www.rentmyestate.com.au/rent-payments/' target='_blank'>Read more." class="tooltip-blue po-small pop-over-right base-align" data-placement="right"></span></h3>
	<div class="v-lighter-text sub-desc">&nbsp;</div>

			               		<div class="ui-switch">
			<figure class="onoffswitch">
			    <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="rentReminiders" checked>
			    <label class="onoffswitch-label" for="rentReminiders">
			        <span class="onoffswitch-inner"></span>
			        <span class="onoffswitch-switch"></span>
			    </label>
			</figure>
		</div>



</div>
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
          <td>Misc</td>
          <td>          	
          		<div>25/11/2014 - 01/12/2014 ($300)</div>
          </td>
          <td>$200</td>
          <td>
          	<div class="tbl-action-text">
	             <a href="javascript:edit(1382)" rel="tooltip" data-original-title="Edit" data-placement="top" data-toggle="tooltip"> <span class="fa fa-edit"></span>   </a>  
	             <a href="javascript:remove(1382,'Rent')" rel="tooltip" data-original-title="Remove this Paymet" data-placement="top" data-toggle="tooltip"> <span class="fa fa-trash-o text-danger"></span> </a> 
	             <a href="javascript:sendReceipt(1382,'Rent')" rel="tooltip" data-original-title="Email your tenant a receipt" data-placement="top" data-toggle="tooltip"> <span class="fa fa-file-text-o text-success"></span>   </a>
             </div>

             
          </td>

  </tr>

	<tr style="background: #FFF1F1">
		<td colspan="3">Move out date: 12 January 2015</td>
		<td colspan="2">Balance to vacate: $1,500</td>
	</tr>
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
		$('#btnConnectPocketbook').click(function() {
			$('#connectPocketbook').modal();
		});
	})
</script>

<?php require('partials/connect-to-pocketbook.php') ?>


<?php require('../partials/footer.php') ?>