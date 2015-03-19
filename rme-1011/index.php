<?php require('../partials/header.php') ?>
<?php require('../partials/new-top-nav.php') ?>

<style>
	.basic-lists {
			max-height: 300px;
			overflow-y: auto;
			max-width: 530px;
	}

	.basic-lists-item {
		border-top: 1px solid #EEE;
		padding: 15px 0;
	}

	.basic-lists-item:first-child {
		border-top: none;	
	}
</style>

<div>	

<h3 class="ma-line"><span class="text-de">Invite Owners</span></h3>

<div class="control-group has-error">
	<label class="control-label" for="inviteEmailAddress">Enter the email address you want to add as an owner</label>
	<div class="controls">
		<input id="inviteEmailAddress" class="form-control fc-large" maxlength="50" name="inviteEmailAddress" type="text" autocomplete="off" placeholder="Enter Email">
		
</div>
</div>

<div class="control-group">
<div class="controls">
		<button id="btnInvite" class="btn btn-primary btn-lg">Add</button></div>
</div>

<ul class="basic-lists">
	<?php for($i=0;$i<20;$i++) { ?>
	<li class="basic-lists-item">	
		<b>Bryan Asnan (Owner)</b><br>
    <span class="v-lighter-text">bryan@rentmyestate.com.au</span>
  </li>
	<?php } ?>
</ul>

</div>

<?php require('../partials/footer.php') ?>