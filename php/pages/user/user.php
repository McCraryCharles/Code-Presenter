<!-- User Page -->
<!-- 
	-- Code Presenter - http://www.codepresenter.net --
	A simple, educational tool to engage student participation through real-time code sharing and presentation in the classroom
	An open source project coded by Charles McCrary https://github.com/McCraryCharles/ 
-->

<?php include_once 'php/pages/user/header.php'; ?>
<?php include_once 'php/pages/user/sidebar.php'; ?>
<?php include_once 'php/pages/user/editor.php'; ?>
<?php include_once 'php/pages/user/footer.php'; ?>
<?php include_once 'php/pages/user/userModals.php'; ?>
<script>initRoomUpdates('user',<?php echo $roomId .','. $config['userUpdateInterval'] .','.  $config['expireUpdateInterval']; ?>);</script>
<script>ga('set', 'page', '/user');ga('send', 'pageview');</script>