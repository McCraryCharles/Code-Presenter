<div class="user-sidebar" id="user-sidebar">
	<div class="user-sidebar-header">
		<div class="btn-group btn-wide" role="group">
			<div class="btn-group col-xs-6 user-sidebar-btn-cont" role="group">
				<a type="button" id="new-file-button" class="btn btn-default btn-invert nav-button btn-wide user-sidebar-btn" onclick="newSubmission(<?php echo $roomId; ?>)">New File</a>
			</div>
			<div class="btn-group col-xs-3 user-sidebar-btn-cont" role="group">
				<a type="button" id="rename-button" class="btn btn-default btn-invert nav-button btn-group-border btn-wide user-sidebar-btn" disabled onclick="showRename()"  data-toggle="tooltip" data-placement="bottom" data-delay="1000" title="Rename" ><i class="fa fa-tag"></i></a>
			</div>
			<div class="btn-group col-xs-3 user-sidebar-btn-cont" role="group">
				<a type="button" id="delete-submission-button" class="btn btn-default btn-invert nav-button btn-group-border btn-wide user-sidebar-btn" disabled onclick="deleteSubmission()" data-toggle="tooltip" data-placement="bottom" data-delay="1000" title="Delete" ><i class="fa fa-trash-o"></i></a>
			</div>
		</div>
	</div>
	<div class="clearfix"></div>
	<br />
	<div class="user-sidebar-content" id="user-sidebar-content">
		<?php 
			if (isset($_COOKIE['userKey'])) {// If user key cookie is set, load files
				$submissions = loadUserSubmissions($_COOKIE['userKey']);
			}
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