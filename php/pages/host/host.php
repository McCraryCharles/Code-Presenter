<!-- Host Page -->
<!-- 
	-- Code Presenter - http://www.codepresenter.net --
	A simple, educational tool to engage student participation through real-time code sharing and presentation in the classroom
	An open source project coded by Charles McCrary https://github.com/McCraryCharles/ 
-->

<?php include_once 'php/pages/host/header.php'; ?>
<?php include_once 'php/pages/host/sidebar.php'; ?>
<?php include_once 'php/pages/host/viewer.php'; ?>
<?php include_once 'php/pages/host/footer.php'; ?>
<div id="hostModals"><?php include_once 'php/pages/host/hostModals.php'; ?></div>
<script>
	initRoomUpdates('host',<?php echo $roomId .','. $config['hostUpdateInterval'] .','.  $config['expireUpdateInterval']; ?>);
	setViewerColor(getCookie('hostColor'));
	ga('set', 'page', '/host');ga('send', 'pageview');
</script>