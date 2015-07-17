<?php
$body_app_class = "bg-gray rent-collection";
$app_module =""
?>
<?php require('../partials/header.php') ?>
<div class="rme-wrap">
	<header class="navbar navbar-default">
		<div class="navbar-inner">
			<div class="container-fluid clearfix">
				<a class="brand" href="http:/dashboard/index">
					<img src="/assets/images/c/cubbi-logo.png">
				</a>
				<div class="pull-right">
					<div class="nav-links">
						<ul class="nav ui-top-menu">
							
							
							<li>
								<a href="http:/messages/mailbox" class="button dropdown-toggle mailbox-page-link">
									<div class="ds-icons-envelope-gray">
										<span class="mail_counter">
											<em class="unread-mails">2</em>
										</span>
									</div>
								</a>
							</li>
							<li><a target="_blank" class="button dropdown-toggle" href="http://support.rentmyestate.com.au/?utm_source=rentmyestate&amp;utm_medium=referral&amp;utm_campaign=dashboard">Support</a> </li>
							<li class="dropdown">
								<a href="#" id="username" class="button dropdown-toggle" data-toggle="dropdown">
									<div class="profile-photo ppi-wrap ppi-xxsmall"><div class="_c no-img-avatar"><span class="default-avatar">BA</span></div></div>	<!-- 	<span style="display:inline-block">Bryan </span>	<span class="fa fa-chevron-down"></span> -->
								</a>
								<div class="box dropdown-menu" role="menu" aria-labelledby="username">
									<div class="popover bottom dp-arrow">
										<div class="arrow"></div>
									</div>
									<ul class="ui-dp-content text-center">
										
										<li> <a href="http:/admin/search">  Admin Page</a> </li>
										
										<li><a href="http:/users/details">Profile</a></li>
										<li><a href="http:/settings/account">Settings</a></li>
										<li class="bg-white"><a href="http:/dashboard/set_default/owner" class="owner-account ck-green selected">Owner Account</a>
										<hr>
									</li>
									<li class="bg-white btop-none"><a href="http:/dashboard/set_default/tenant" class="tenant-account ck-green  ">Tenant Account</a></li>
									<li><a href="http:/logout">Logout</a></li>
									<li class="cui-tooltip">
										<a data-original-title="Advertise your properties for sale using Sell My Estate" data-placement="left" data-toggle="tooltip" class="app-switch sme" href="http:/membership/swap/index">Switch To<span class="sites-switch-logo"></span></a>
									</li>
									
								</ul>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</header>
<section class="subnavbar">
	<ul class="ui-bread clearfix gd">
		<li class="dropdown ui-crumbs start">
			<a href="#" data-toggle="dropdown" role="button" class="dropdown-toggle ui-c-item hv-fa" id="propertyList">
				<span class="fa fa-chevron-down"></span> My Properties
			</a>
			<div class="dropdown-menu property-listings" role="menu" aria-labelledby="propertyList">
				<div class="popover bottom dp-arrow l">
					<div class="arrow"></div>
				</div>
				<div class="row text-center ui-footer">
					<div class="col-md-6">
						<a href="http://rme.local/dashboard/owner" class="my-properties">
							<span class="fa fa-th-large"></span>
							My Properties
						</a>
					</div>
					<div class="col-md-6">
						<a href="#" id="bc_add_property" class="add-property">
							<span class="fa fa-plus"></span>
							Add Property
						</a>
					</div>
				</div>
			</div>
		</li>
		<li class="ui-crumbs trail">
			<a href="http://rme.local/dashboard/switcher/1000165" class="ui-c-item">12 / 32 123 Drive, The Bight  2429</a>
		</li>
		<li class="ui-crumbs end">
			<span class="ui-c-item">Summary</span>
		</li>
	</ul>
</section>
<div class="position-relative promote-true"> <!-- change the class to "promote-null" if no ads -->
<div class="mid-section summary-wrap">
	<div class="summary-content">
		<div class="text-right summary-top-action">
			<button class="btn btn-success">Make Changes</button> <button class="btn btn-primary">Preview</button>
		</div>
		<div class="summary-promote text-center promote-padding">
			<h3>Let's get your ad live!
				<div class="sub">Well' publish your ad on Cubbi (free). To get more exposure we suggest chooshing from the options below.</div>
			</h3>
			<div class="logo-wrap">
				<span class="logo" style="padding:10px 0px 25px;display:block"> <img src="/assets/images/c/cubbi-logo.png" style="height: 50px; width:139px "> </span>
			</div>
			<button class="btn btn-success btn-xlarge">Published Ad</button>
		</div>
		<div class="summary-promote" style="min-height: 710px;">
			<div class="top">
				<div class="re-wrap">
				</div>
			</div>
			<div class="micro-blogs">
				<div class="re-wrap">
					<div class="pasok" style="display:none">pasok</div>
					<table class="_tbl-or">
						<tbody><tr>
							<td class="_col1-2 promote-option-header">
								<h3>
									Get more exposure
									<div class="sub">You can choose to upgrade your ad at anytime</div>
								</h3>								
							</td>
							<td class="_col-3">
								<ul class="top-media-l ">
									
									<li class="control">
										<a data-original-title="Share Ads on Facebook" data-placement="top" data-toggle="tooltip" id="summary_fb_sharer" href="#" class="mix-media-facebook ds"><span class="fa fa-facebook"></span></a>
									</li>
									<li class="control">
										<a id="summary_twitter_intent" data-original-title="Share Ads on Twitter" data-placement="top" data-toggle="tooltip" href="https://twitter.com/intent/tweet?source=webclient&amp;text=Property For Rent at - 12/32 123 Drive, The Bight, 2429. Visit this link http://property./view/55/nsw/the-bight/" class="mix-media-twitter ds"><span class="fa fa-twitter"></span></a>
									</li>
									<li class="control"> <a data-original-title="Printable Brochure" data-placement="top" data-toggle="tooltip" target="_blank" href="http://rme.local/promote/brochure/pdf" class="mix-media-pdf ds"><span class="fa fa-print"></span></a> </li>
								</ul>
							</td></tr>
						</tbody></table>
					</div>
				</div><form action="http://rme.local/promote/summary?advertisement_id=55" method="post" accept-charset="utf-8" class="" id="form_advertisement_advertise" autocomplete="off"><div style="display:none">
				<input type="hidden" name="i9XAoSSyVr8I" value="2e455a4b1fa0722705e89cb40f5fea8c">
			</div>
			<div class="medium">
				
				<div class="media-item">
					<div class="re-wrap">
						<table class="_tbl-or media-table">
							<tbody><tr>
								<td class="media-icon _col-1">
									<img src="/assets/images/summary-promote/rea-domain-round.png" alt="rea-domain">
								</td>
								<td class="media-desc _col-2">
									<h1>Realestate.com.au &amp; Domain</h1>
									<p>Get your property on 10 popular real estates websites including realestate.com.au and Domain for as long as it takes to find the right tenants.</p>
									<a href="#showPropertySites" data-toggle="modal">Show included websites</a>
									
								</td>
								<td class="media-action _col-3">
									<span class="rea-status"><i class="r-italic">
										
									</i></span>
									
									
									<div class="checkbox-bg custom-checkbox-field">
										<input type="checkbox" data-pid="7" id="agentpoint" amount="150.00" name="agentpoint"><label for="agentpoint"><sup>$</sup>150</label>
									</div>
									
								</td>
							</tr>
						</tbody></table>
					</div>
					<div class="collapse-nav">
					</div>
				</div>
				<div class="media-item">
					<div class="re-wrap">
						<table width="100%" class="media-table">
							<tbody><tr>
								<td class="media-icon _col-1">
									<img src="/assets/images/summary-promote/for-lease-icon.png" alt="">
								</td>
								
								<td class="media-desc _col-2">
									<h1>For Lease Sign</h1>
									<p>Get a 24 hour professional sales person working for you. <br>
										A great way to attract family and friends of neighbours who already love the area.
									</p><div class="lease-history-purchase">
								</div>
								<a href="#leaseSignSample" data-toggle="modal">Show me an example</a>
								<p></p>
								<div id="formLeaseSignOrder">
									<div id="forLeaseSignForm" style="overflow:hidden">
										<div class="well">
											<div class="control-group">
												<label class="control-label" for="quantity">Quantity</label>
												<div class="controls custom-select-field">
													<span class="k-widget k-dropdown k-header k-full-width" unselectable="on" role="listbox" aria-haspopup="true" aria-expanded="false" tabindex="-1" aria-owns="quantity_listbox" aria-disabled="false" aria-readonly="false" aria-busy="false" aria-activedescendant="quantity_option_selected" style=""><span unselectable="on" class="k-dropdown-wrap k-state-default"><span unselectable="on" class="k-input">1</span><span unselectable="on" class="k-select"><span unselectable="on" class="k-icon k-i-arrow-s">select</span></span></span><select id="quantity" name="signage_quantity" class="k-full-width" data-role="dropdownlist" style="display: none;"><option value="1" selected="selected">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select></span>
												</div>
											</div>
											<div class="control-group">
												<label class="control-label" for="delivery">Delivery Address <span>*</span> <!-- <a href="#editAddressLeaseSign" class="edit-address-lease-sign" data-toggle="modal">Edit</a> --></label>
												<div class="controls address-lease-sign-form">
													<input type="text" id="signage_address" name="signage_address" class="form-control" value=" Tayabas , City  " placeholder="Magpasok ng lokasyon" autocomplete="off">
												</div>
											</div>
											<br>
											<div class="control-caption">
												What contact details would you like on your sign/s:
											</div>
											<div class="control-group">
												<label class="control-label" for="name">Name <span>*</span></label>
												<div class="controls">
													<input name="signage_name" class="is-required form-control" maxlength="18" data-maxlength="18" id="signage_name" type="text" value="Bryan">
													<div class="custom-checkbox-field">
														<input type="checkbox" value="on" id="notToDisplay" name="signage_donot_display"><label for="notToDisplay">Do not display my name on sign</label> <!-- keep the label -->
													</div>
												</div>
											</div>
											<div class="control-group last">
												<label class="control-label" for="phone">Phone <span>*</span></label>
												<div class="controls">
													<input name="signage_phone" class="is-required form-control" maxlength="13" data-maxlength="13" id="signage_phone" type="text" value="431241234123">
													<div class="custom-checkbox-field">
														<input type="checkbox" value="on" id="useRmePhone" name="signage_Use_Rmephone"><label for="useRmePhone">Use Rent My Estate phone number</label>
														
													</div>
												</div>
											</div>
										</div>
									</div>
									<div class="modal fade" id="editAddressLeaseSign" tabindex="-1" role="dialog" aria-labelledby="editAddressLeaseSign" aria-hidden="true"> <div class="modal-dialog">
										<div class="modal-content">
											<div class="modal-header w-g">
												<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
												<h2>Delivery Address</h2>
											</div>
											<div class="modal-body">
												<div id="deliveryAddress">
													<div class="control-group">
														<label class="control-label" for="delivery_address">Address</label>
														<div class="controls"><input name="delivery_address" value="" id="delivery_address" tabindex="1" type="text" class="form-control" onfocus="geolocate()"></div>
													</div>
												</div>
												
											</div>
											<div class="modal-footer">
												<button type="submit" id="signage_set_address" class="btn-continue no-arrow btn btn-primary" data-dismiss="modal">Save</button>
											</div>
										</div>
									</div>
								</div>
								<script>
									var rCountry = [{"id":"AUS","value":"Australia"}];
							</script>					</div>
							<div class="collapsible-wrap">
								<div class="collapsible-content">
									<p>Don’t underestimate the powers of a for lease sign, its equivalent of having a professional agent standing out the front marketing your property 24/7. This is a great way to attract the people who already love the area plus their friends and family. The sign can be personalised with your name and contact number and delivered to the address of your choice. The signs are 600mm x 900mm in full colour, so they will stand out and look great. An easy guide to putting up your sign will be available in your ‘Library’. We encourage 2 signs per property to attract the traffic coming from all directions. Please allow between 2 - 5 business days depending on your location.</p>
								</div>
							</div>
						</td>
						
						<td class="media-action _col-3">
							<div class="checkbox-bg custom-checkbox-field">
								<input id="for_lease_sign" data-pid="6" type="checkbox" amount="55.00" name="for_lease_sign"><label for="for_lease_sign"><span class="amount"><sup>$</sup><span class="for_lease_sign_amount">55</span></span></label>
							</div>
						</td>
					</tr>
				</tbody></table>
			</div>
			<div class="collapse-nav"><span class="collapse-btn">&nbsp;</span></div>
		</div>
	</div>
	<div class="purchase-section">
		<div class="re-wrap">
			<table class="_tbl-or action-table">
				<tbody><tr>
					<td class="_col1-2"></td>
					<td class="_col1-3 text-right">
						<div class="checkout-total text-center">
							<h3 class="amount"><sup>$</sup><b class="total">0</b></h3>
							<p>
								<button class="btn btn-success" id="checkoutSummaryOrderLeaseOrRea"> Process </button>
							</p></div>
						</td>
					</tr>
				</tbody></table>
			</div>
		</div>
	</form>            </div>
</div>
</div>
</div>
<!-- BILLING MODULE -->
<div id="billingDiv"></div>
<!-- For Lease Sample -->


<div class="modal fade" id="removeAd" tabindex="-1" role="dialog" aria-labelledby="removeAd" aria-hidden="true">
<div class="modal-dialog _md-xwide">
<div class="modal-content">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
		<h2>Remove Ad</h2>
	</div>
	<div class="modal-body">
		
	</div>
	<div class="modal-footer"></div>
</div>
</div>
</div>

</div>
<?php require('../partials/footer.php') ?>