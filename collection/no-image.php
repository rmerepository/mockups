<?php require('../partials/header.php') ?>
<?php require('../partials/top-nav.php') ?>
<?php require('../partials/bread.php') ?>

<style>

	.f26 {
		font-size: 26px;
	}

	.fw-100 {
		font-weight: 100;
	}
	
	.wrap-main-holder {
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center;
		height: 336px;
		position: relative;
		color: #FFF;
	}

	
	.wrap-main-holder .content {
		color: #FFF;		
		position: absolute;
		z-index: 2;		
		bottom: 21px;
		left: 21px;
		font-size: 16px;
		font-weight: 300;
	}


	.wrap-main-holder:before {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		background-color: rgba(0, 0, 0, 0.50);
		display: block;
		height: 100%;		
		z-index: 1;
	}

	.wrap-main-holder.no-image {
		background-size: auto;
		background-color: #eaeaea;
		text-shadow: 1px 1px 1px #747474;
		height: 176px !important;
	}

	.wrap-main-holder.no-image:before {
		display: none;
	}

	

	.menu-collection {
		border-bottom: 1px solid #e1e1e1;
	}

	.menu-collection .act{
		width: 33.3%;
		text-align: center;
		height: 183px;
		padding-top: 23px;
		border-right: 1px solid #E1E1E1;
	}

	.menu-collection h3 {
		margin: 3px 0;
	}

	.menu-collection .sub-desc {
		font-size: 14px;
		margin: 5px 0px 25px;
	}

	.menu-collection .act:last-child {
		border-right: none;
	}

	.menu-collection .btn-large {
		padding-left: 41px;
		padding-right: 41px;
	}

	.uiTabs .nav-tabs > li > a.text-left {
		text-align: left;
	}

	.nav-tabs > li {
		overflow: hidden;
	}


	.nav-tabs > li > a.ex-action {
		display: inline-block !important;
		border: none;
		position: absolute;
		padding: 0;
		color: #22B2E2;
		top: 16px;
		right: -87px;
		font-size: 13px;
		cursor: pointer !important;
		-webkit-transition: all 0.5s;
		transition: all 0.5s;
	} 

	.nav-tabs > li.active > a.ex-action {
		right: 10px;
	} 

	.ex-action:hover {
		color: #4BC7F1 !important;
	}

	.btn.btn-reduced-auto {
		width: auto;
		padding-left: 10px;
		padding-right: 10px;
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
			
				<div class="wrap-main-holder no-image" style="background-image: url('/assets/images/n/bg-blur-image.jpg')">
					<div class="content">
						<div class="f26 fw-100">2a Worthy Avenue, Mount Lawley</div>
						<div>Gene Rivera</div>
						<div>$300 Per Week</div>
					</div>
				</div>

				<?php require_once('partials/menu-area.php') ?>

				<?php require_once('partials/modal-money-in.php') ?>
				<?php require_once('partials/modal-money-out.php') ?>


				<div class="info-group text-center bg-gray">
					<h3>Payment History</h3>
				</div>

				<?php require_once('partials/tab-area.php') ?>

			</div>

		</div>	

		</div>
	</div>


	<script>
		$(function(){
			$('.k-dd').kendoDropDownList();	
		});

	</script>

<?php require('partials/update-household.php') ?>
<?php require('../partials/footer.php') ?>