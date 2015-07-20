<?php
$body_app_class = "bg-gray rent-collection"; 
$app_module =""
?>

<?php require('../partials/header.php') ?>
<?php require('../partials/new-top-nav.php') ?>

    <div style="padding:40px">

<p>SUBSCRIPTION MODAL - SUMMARY PAGE</p>
<p>For subscription modal that popus up when choosing to advertise on realestate.com.au</p>
<p>
    <a href="#" class="button" title="Upgrade Plan" data-toggle="modal" data-target="#planModal">
        <span class="text-success">Modal Plan</span> 
    </a>
</p>

<hr>

<p>SUBSCRIPTION MODAL - ALL OTHER EVENTS</p>
<p>For subscription modal that pops up for all other events that require a paid plan</p>
<p>
    <a href="#" class="button" title="Upgrade Plan" data-toggle="modal" data-target="#planModal">
        <span class="text-success">Modal Plan</span> 
    </a>
</p>

</div>

<?php require('plan-modal.php') ?>
<?php require('buy-modal.php') ?>

<script>
$( document ).ready(function() {
		var discount = false;
    $('.nav-option').click(function(){
    	var el = $(this);
    			


    		$('.nav-option').removeClass('active');
    		el.addClass('active');

    		if (discount) {
	    		$(".price").each(function(){
						var el = $(this);
						var dsPrice = el.attr('data-price-regular');
						el.html( dsPrice );
					});
					discount = false;
    		}

    		else {
    			$(".price").each(function(){
	    				var el = $(this);
	    				var dsPrice = el.attr('data-price-discount');
			    		el.html( dsPrice );
			   	});
    			discount = true;
    		}

    		console.log(discount);
		   

    });
});

</script>

<?php require('../partials/footer.php') ?>