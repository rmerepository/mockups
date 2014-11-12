<div class="tab-wrap">


	<div class="uiTabs two-item blue-th no-border-lr">
		<ul class="nav nav-tabs">
			<li class="active"><a title="Owner Ledger" class="text-left first-child" href="#ownerLedger" data-toggle="tab">Owner Ledger</a>
			<a href="#" class="ex-action" title="print owner ledger"> <span class="fa fa-print"></span> Print Ledger</a>	
			</li>
			<li><a title="Tenant Ledger" class="fi text-left" href="#tenantLedger" data-toggle="tab">Tenant Ledger</a>
			<a href="#" class="ex-action" title="print tenant ledger"> <span class="fa fa-print"></span> Print Ledger</a>
			</li>
		</ul>
	</div>

	<div class="tab-content">
		<div class="tab-pane active" id="ownerLedger">
			<?php require_once('owner-ledger.php'); ?>
		</div>

		<div class="tab-pane" id="tenantLedger">
			<?php require_once('tenant-ledger.php'); ?>
		</div>
	</div>
	
</div>