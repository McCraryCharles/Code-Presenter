<!DOCTYPE html>
<html lang="en">

<head>
	<!-- 
		-- Code Presenter - http://www.codepresenter.net --
		A simple, educational tool to engage student participation through real-time code sharing and presentation in the classroom
		An open source project coded by Charles McCrary https://github.com/McCraryCharles/ 
	-->
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="icon" href="favicon.ico" type="image/x-icon">
	<link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
	<title>Code Presenter - Classroom Code Sharing and Collaboration</title>
	<link href="css/bootstrap.min.css" rel="stylesheet">
	<link href="css/overrides.css" rel="stylesheet">
	<link href="css/codePresenter.css" rel="stylesheet">
	<link href='http://fonts.googleapis.com/css?family=Open+Sans:700,300,400,500' rel='stylesheet' type='text/css'>
	<link href='https://fonts.googleapis.com/css?family=Source+Code+Pro:700,400,500' rel='stylesheet' type='text/css'>
	<link rel="stylesheet" href="css/font-awesome.min.css">
	<script src='https://www.google.com/recaptcha/api.js'></script>
	<script>
	  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

	  ga('create', 'UA-63131228-2', 'auto');
	  ga('send', 'pageview');

	</script>
	<!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>

<body>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
	<script src="js/bootstrap.min.js"></script>
	<script src="js/ajax.js"></script>
	<script src="js/codePresenter.js"></script>
	
	<div id="page-container">
		<?php include_once 'php/pages/loader.php'; ?>
	</div>
	
</body>
	
</html>