<div class="host-sidebar-open" id="host-sidebar">
	<div class="host-sidebar-content" id="host-sidebar-content">
		<?php
			$submissions = loadSubmissions($roomId);
			if (empty($submissions)) {
				echo '
					<div class="submission-tab">
						No submissions
					</div>
				';
			}
			else {
				foreach ($submissions as $submission) {
					echo '
						<div class="submission-tab" onclick="loadSubmission('.$submission['id'].')">
							<div class="title">'.$submission['name'].'</div><div class="time">' .date('h:i A', strtotime($submission['updated'])).'</div>
							<span class="clearfix"></span>
							<div class="name">'.getUsername($submission['user']).'</div>
						</div>
					';
				}
			}
		?>
	</div>
	<div class="host-sidebar-footer">
		<a type="button" id="roomButton" class="btn btn-default btn-invert nav-button" onclick="clearSubmissions(<?php echo $roomId; ?>)">Clear</a>
		<a type="button" id="roomButton" class="btn btn-default btn-invert nav-button">New Scratch Pad</a>
		<a type="button" id="roomButton" class="btn btn-default btn-invert nav-button">Menu</a>
	</div>
</div>