<div class="modal fade" id="addTenant" tabindex="-1" role="dialog" aria-labelledby="addTenant" aria-hidden="true">
	<div class="modal-dialog overflow-visible">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
				<h2 class="normal-weight">Add New Tenant</h2>
			</div>
			<div class="modal-body">
				<div class="control-group">
					<label class="control-label" for="name">Name</label>
					<div class="controls">
						<input autocomplete="off" data-is-required="true" id="name" name="name" placeholder="Name" class="form-control" maxlength="30" tabindex="1" value="" type="text">
					</div>
				</div>

<!-- 				<div class="control-group">
					<label class="control-label" for="first_name">First Name</label>
					<div class="controls">
						<input autocomplete="off" data-is-required="true" id="first_name" name="first_name" placeholder="First Name" class="form-control" maxlength="30" tabindex="1" value="" type="text">
					</div>
				</div>
				<div class="control-group">
					<label class="control-label" for="last_name">Last Name</label>
					<div class="controls">
						<input autocomplete="off" data-is-required="true" id="last_name" name="last_name" placeholder="Last Name" class="form-control" maxlength="30" tabindex="1" value="" type="text">
					</div>
				</div>

				<div class="control-group">
					<label class="control-label" for="mobile">Mobile</label>
					<div class="controls">
						<input autocomplete="off" data-is-required="true" id="mobile" name="mobile" placeholder="Contact No." class="form-control" maxlength="30"  value="" type="text">
					</div>
				</div> -->

					<div class="control-group">
					<label class="control-label" for="paymentPeriod">Email Address</label>
					<div class="controls controls-popover-float">
						<input autocomplete="off" data-is-required="true" name="email" data-type="email" placeholder="Email" class="form-control fc-large" maxlength="30" tabindex="1" value="" type="text"> 
						<span class="tooltip-blue pop-over-right"  data-toggle="popover" data-html="true" data-trigger="hover" data-placement="right" data-content="Soon we'll be able to send late notifications when your tenants have not paid their rent." style="vertical-align: top;" data-original-title="Coming Soon"></span>
					</div>
				</div>



			<div class="control-group">
				<div class="clearfix controls"> 
			<div class="pull-left">
					<label  class="me-lbl control-label">Invite Tenant &bull; <a href="http://support.rentmyestate.com.au/article/63-what-happens-when-i-invite-my-tenant" target="_blank">Help</a></label>
			</div>			
			<div class="pull-right">
					 		<div>
	               		<div class="ui-switch">
			<figure class="onoffswitch">
			    <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="myonoffswitch" >
			    <label class="onoffswitch-label" for="myonoffswitch">
			        <span class="onoffswitch-inner"></span>
			        <span class="onoffswitch-switch"></span>
			    </label>
			</figure>
		</div>
            </div>
            </div>
			</div>
			</div>

<div class="well with-fa w-warning">
		Invitation will be sent to use rentmyestate
	</div>

			</div>
			<div class="modal-footer">
				<a href="#" data-dismiss="modal" aria-hidden="true">Cancel</a> &nbsp;&nbsp;&nbsp; <a href="/rme-1014" class="btn btn-primary" id="saveHousehold">Add</a>
			</div>
		</div>
	</div>
</div>