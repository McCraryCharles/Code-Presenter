<div class="user-sidebar" id="user-sidebar">
	<div class="user-sidebar-header">
		<a type="button" id="roomButton" class="btn btn-default btn-invert nav-button btn-wide" onclick="newSubmission(<?php echo $roomId; ?>)">New File</a>
	</div>
	<div class="user-sidebar-content" id="user-sidebar-content">
		<?php 
			$submissions = loadUserSubmissions($_COOKIE['userKey']);
			if (empty($submissions)) {
				echo '
					<div class="user-submission-tab">
						No submissions
					</div>
				';
			}
			else {
				foreach ($submissions as $submission) {
					echo '
						<div class="user-submission-tab" onclick="loadUserSubmission('.$submission['id'].')" id="user-submission-tab-'.$submission['id'].'">
							<b>'.$submission['name'].'</b>';
					if ($submission['published'] != 0) { // If published, add the check mark
							echo '
							<span class="fa-stack fa-lg" data-toggle="tooltip" data-placement="top" data-delay="1000" title="Published">
								<i class="fa fa-circle fa-stack-2x"></i>
								<i class="fa fa-check fa-stack-1x fa-inverse"></i>
							</span>';
					}
					echo '
							<br />
							'.date('h:i A', strtotime($submission['updated'])).'
						</div>
					';
				}
			} 
		?> 
	</div>
</div>