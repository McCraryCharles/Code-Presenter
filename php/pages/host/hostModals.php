<!---------------------------------- HOST MENU MODAL ---------------------------------->

<div class="modal fade" id="host-menu-modal" role="dialog" aria-labelledby="host-menu-modal">
	<div class="modal-dialog modal-lower" role="document">
		<div class="modal-content">
			<div class="modal-body" id="host-menu-modal-body">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h3 class="modal-title" id="host-menu-title">Host Menu</h3>
				<br />
				<form id="host-menu-form" onsubmit="return false">
					<table class="table">
						<tr>
							<td class="col-sm-4">Room Controls: </td>
							<td class="col-sm-8">
								<button type="button" class="btn btn-warning pull-right btn-pad">Regenerate Code</button>
								<button type="button" class="btn btn-danger pull-right btn-pad">Delete Room</button>
							</td>
						</tr>
						<tr>
							<td class="col-sm-4">User Controls: </td>
							<td class="col-sm-8">
								<button type="button" class="btn btn-danger pull-right btn-pad">Remove All Users</button>
							</td>
						</tr>
						<tr>
							<td class="col-sm-4">Room Expiration: </td>
							<td class="col-sm-8 pull">
								<div class="pull-right">
									<?php echo date('h:m A, l - M d Y', strtotime(getExpiration($roomCode)));?>
								</div>
							</td>
						</tr>
					</table>
					<input type="hidden" id="room-code" value="<?php echo $roomCode; ?>">
					<span class="clearfix"></span>
					<button type="submit" class="btn btn-primary pull-right">Save</button>
					<button  class="btn btn-default btn-invert-b pull-right" data-dismiss="modal" >Cancel</button>
					<span class="clearfix"></span>
				</form>
			</div>
		</div>
	</div>
</div>

<!---------------------------------- HOST CONFIRM MODAL ---------------------------------->

<div class="modal fade" id="host-confirm-modal" role="dialog" aria-labelledby="host-confirm-modal">
	<div class="modal-dialog modal-sm modal-center" role="document">
		<div class="modal-content">
			<div class="modal-body" id="host-confirm-modal-body">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title" id="nameEntryLabel">Confirm:</h4>
				<form id="confirm-modal-form" onsubmit="return false">
					<div class="modal-error hidden" id ="rename-submission-error" role="alert"></div>
					<div id="confirm-dialog">
						
					</div>
					<button type="submit" id="confirm-button" class="btn btn-primary pull-right">Yes</button>
					<button type="button" class="btn btn-primary btn-invert-b pull-right" data-dismiss="modal">Cancel</button>
					<span class="clearfix"></span>
				</form>
			</div>
		</div>
	</div>
</div>
