<!-- Project about page -->
<!-- 
	-- Code Presenter - http://www.codepresenter.net --
	A simple, educational tool to engage student participation through real-time code sharing and presentation in the classroom
	An open source project coded by Charles McCrary https://github.com/McCraryCharles/ 
-->
<div class="container" data-spy="scroll" data-target=".scrollspy">
	<?php 
		$page='about' ; 
		include_once 'php/pages/about/header.php'; 
		include_once 'php/pages/about/content.php'; 
		include_once 'php/pages/about/sidebar.php'; 
		include_once 'php/pages/about/footer.php'; 
	?>
	<script>
		ga('set', 'page', '/about');
		ga('send', 'pageview');
	</script>
</div>