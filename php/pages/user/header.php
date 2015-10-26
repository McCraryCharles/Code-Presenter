<?php 
// -- Code Presenter - http://www.codepresenter.net --
// A simple, educational tool to engage student participation through real-time code sharing and presentation in the classroom
// An open source project coded by Charles McCrary https://github.com/McCraryCharles/ 

?>
<nav class="navbar navbar-default navbar-host">
	<div class="navbar-header pull-left">
		<a class="navbar-brand hidden-xs" href="."><span class="logo"><b>Code</b>Presenter</span></a>
		<a class="navbar-brand visible-xs" href="."><span class="smallLogo"><b>Code</b>Presenter</span></a>
	</div>
	<div class="room-code">
		<span class="hidden-xs">In Room: </span><b><?php echo strtoupper($roomCode); ?></b>
	</div>
	<div class="pull-right">
		<div id="navbar" class="">
			<ul class="nav navbar-nav">
				<li><a type="button" id="roomButton" class="btn btn-default btn-invert nav-button" onclick="leaveRoom()">Leave Room</a></li>
			</ul>
		</div>
	</div>
</nav>