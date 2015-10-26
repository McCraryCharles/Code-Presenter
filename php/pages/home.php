<!-- Landing page for all who do not have page cookies -->
<!-- 
	-- Code Presenter - http://www.codepresenter.net --
	A simple, educational tool to engage student participation through real-time code sharing and presentation in the classroom
	An open source project coded by Charles McCrary https://github.com/McCraryCharles/ 
-->
<div class="container">
	<?php $page = 'home'; include_once 'php/pages/home/header.php'; ?>
	<div class="well selection-box">
		<div class="selection-box-title">
			Get Started
		</div>
		<div class="selection-box-content">
			<form onsubmit="return joinRoom()">
				<div class="selection-box-content-row">
					<div class="form-error hidden" id ="idError" role="alert">Enter a room code here!</div>
					<?php
						if (isset($connectError)) {
							echo '<div class="form-error" id ="idError" role="alert">' . $connectError . '</div>';
						}
					?>
					<input type="text" id="codeEntry" class="form-control selection-box-content-element" placeholder="Room Code">
				</div>
				<div class="selection-box-content-row">
					<button type="button" id="roomButton" class="btn btn-primary btn-wide selection-box-content-element" onclick="joinRoom()">Join Room</button>
				</div>
			</form>
		</div>
	</div>
	<?php include_once 'php/pages/home/footer.php'; ?>
</div>