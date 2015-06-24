<?php
$body_app_class = "bg-gray rent-collection"; 
$app_module =""
?>

<?php require('../partials/header.php') ?>
<?php require('../partials/new-top-nav.php') ?>

<p style="margin:50px"> <button class="btn btn-primary" data-toggle="modal" data-target="#buyModal">Process</button> </p>

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