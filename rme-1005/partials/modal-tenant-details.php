<div class="modal fade modal-large" id="viewTenantDetails" role="dialog" aria-labelledby="viewTenantDetails" aria-hidden="true">
    <div class="modal-dialog overflow-visible">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                <h2 class="normal-weight">Tenant Information</h2>
            </div>
            <div class="modal-body">

                 <?php require('tenant-tab/content/lease-date.php') ?>
            	
                <div class="uiTabs">
				    <?php require('tenant-tab/tab-header.php') ?>
                   
                    <div class="tab-content basic-tab">
                        <?php require('tenant-tab/content/personal-details.php') ?>
                        <?php require('tenant-tab/content/other-occupant-pet.php') ?>
                        <?php require('tenant-tab/content/current-address.php') ?>
                        <?php require('tenant-tab/content/current-employment.php') ?>
                        <?php require('tenant-tab/content/references.php') ?>
                    </div>
                </div>
                </div>
            <div class="modal-footer">
                <a href="#" data-dismiss="modal" aria-hidden="true">Close</a> &nbsp;&nbsp;&nbsp; 
                <button class="btn btn-primary" type="submit">Action</button>
            </div>
        </div>
    </div>
</div>
