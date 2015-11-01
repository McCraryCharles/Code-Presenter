<!---------------------------------- USER CREATION MODAL ---------------------------------->

<div class="modal" id="create-user-modal" role="dialog" aria-labelledby="create-user-modal">
	<div class="modal-dialog modal-sm modal-center" role="document">
		<div class="modal-content">
			<div class="modal-body" id="create-user-modal-body">
				<h4 class="modal-title" id="nameEntryLabel">Please enter your name:</h4>
				<br />
				<form  onsubmit="return createUser()">
					<div class="form-group">
						<input type="text" class="form-control input-center" id="name-input" placeholder="First Last">
						<input type="hidden" id="room-code" value="<?php echo $roomCode; ?>">
					</div>
					<button type="button" class="btn btn-primary pull-right" onclick="createUser()">Get Coding</button>
					<span class="clearfix"></span>
				</form>
			</div>
		</div>
	</div>
</div>

<!---------------------------------- SUBMISSION RENAME MODAL ---------------------------------->

<div class="modal fade" id="rename-submission-modal" role="dialog" aria-labelledby="create-user-modal">
	<div class="modal-dialog modal-sm modal-center" role="document">
		<div class="modal-content">
			<div class="modal-body" id="rename-submission-modal-body">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title" id="nameEntryLabel">Rename file:</h4>
				<br />
				<form onsubmit="return renameSubmission()">
					<div class="form-group">
						<input type="text" class="form-control input-center" id="rename-input" placeholder="First Last">
					</div>
					<button type="button" class="btn btn-primary pull-right" onclick="renameSubmission()">Save</button> &nbsp;
					<button type="button" class="btn btn-danger pull-right" data-dismiss="modal">Cancel</button>
					<span class="clearfix"></span>
				</form>
			</div>
		</div>
	</div>
</div>

<!---------------------------------- USER CONFIRM MODAL ---------------------------------->

<div class="modal" id="user-confirm-modal" role="dialog" aria-labelledby="create-user-modal">
	<div class="modal-dialog modal-sm modal-center" role="document">
		<div class="modal-content">
			<div class="modal-body" id="user-confirm-modal-body">
				<h4 class="modal-title" id="nameEntryLabel">Please enter your name:</h4>
				<br />
				<form  onsubmit="return createUser()">
					<div class="form-group">
						<input type="text" class="form-control input-center" id="name-input" placeholder="First Last">
						<input type="hidden" id="room-code" value="<?php echo $roomCode; ?>">
					</div>
					<button type="button" class="btn btn-primary pull-right" onclick="createUser()">Get Coding</button>
					<span class="clearfix"></span>
				</form>
			</div>
		</div>
	</div>
</div>
