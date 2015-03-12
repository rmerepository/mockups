<main class="main-wrap max-width-content" id="mainWrapList">
	<div class="text-left mnub-25">
		<button class="btn btn-success"> + Add New Tenants </button>
		&nbsp;&nbsp; <button id="listings-view" class="btn"> <span class="fa fa-list"></span> </button>
		
	</div>
	<div class="row">
		<div class="static-widget col-xs-4">
			<div class="inner-widget inner-widget-sm inner-widget-action">
				<div class="wrp-o">
					<div class="va-box">
						<div class="va-middle">
						<div class="widget-view-1">
								<div class="text-danger"><span class="fa fa-calendar-o"></span>$1,500 owing</div>
						</div>
						</div>
					</div>
				</div>
				<div class="name"><span class="fa fa-user"></span>James Murphy</div>
			</div>
		</div>
		<div class="static-widget col-xs-4">
			<div class="inner-widget inner-widget-sm inner-widget-action">
				<div class="wrp-o">
					<div class="va-box">
						<div class="va-middle">
						<div class="widget-view-1">
							<div class="text-success"><span class="fa fa-check"></span> Up to date </div>
						</div>
						</div>
					</div>
				</div>
				<div class="name"><span class="fa fa-user"></span> Lewis Lee</div>
			</div>
		</div>
	</div>
</main>


<script>
	$(function(){
		$('#listings-view').click(function(){
			$('#mainWrapList').toggleClass('view-listing');
		})
	})
</script>