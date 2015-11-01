<?php
	include_once 'dbLibrary.php';
	if (isset($_POST['function'])){
		switch ($_POST['function']) {
			case 'loadSubmission': // Single Submission
				$submission = loadSubmission($_POST['submissionId']);
				echo $submission[0]['content'];
			break;
			case 'loadSubmission': // Single Submission
				$submission = loadSubmission($_POST['submissionId']);
				echo $submission[0]['content'];
			break;
			case 'loadSubmissionName': // Single Submission Name
				$submission = loadSubmission($_POST['submissionId']);
				echo $submission[0]['name'];
			break;
			case 'loadSubmissionLastSave': // Single Submission Name
				$submission = loadSubmission($_POST['submissionId']);
				echo 'Last Save: ' . date('h:i A', strtotime($submission[0]['updated']));
			break;
			case 'newSubmission': // Create a new submission
				$userId = getUserId($_POST['userKey']);
				if (userSubmissionNum($userId) < 5) {
					echo $_POST['userKey'];
					createSubmission($_POST['roomId'], $_POST['userKey']);
				}
				else {
					echo 'MAX' . $_POST['userKey'];
				}
			break;
			case 'loadSubmissions': // List of submissions for host
				$submissions = loadSubmissions($_POST['roomId']);
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
								<b>'.$submission['name'].'</b>
								<br />
								'.date('h:i A', strtotime($submission['updated'])).'
							</div>
						';
					}
				}
			break;
			case 'loadUserSubmissions': // List of submissions for user
				$submissions = loadUserSubmissions($_POST['userKey']);
				if (empty($submissions)) {
					echo '
						<div class="user-submission-tab">
							No submissions
						</div>
					';
				}
				else {
					if (isset($_POST['error'])) { // If max submissions error is set, display dismissible error message
						if ($_POST['error'] == 'maxSubmissions') {
							echo '
							<div class="alert alert-danger alert-dismissible fade in" role="alert">
								<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button>
								<strong>File Limit Reached:</strong> Delete a submission before creating a new one.
							</div>';
						}
					}
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
			break;
			case 'renameSubmission':
				renameSubmission($_POST['submissionId'], $_POST['name']);
			break;
			case 'clearSubmissions':
				clearSubmissions($_POST['roomId']);
				echo $_POST['roomId']; // Room id needs to be echoed into the cb function submitted through AJAX
			break;
			case 'createUser': // Creates a user
				$room = checkRoom($_POST['roomCode']);
				echo createUser($room, $_POST['userName']);
			break;
		}
	}
?>