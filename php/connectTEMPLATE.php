<?php
	// The production version of this file is not shared to protect database credentials
	// Update this file with the correct DB parameters based on the production environment

	$servername = "";
	$username = "";
	$password = "";
	$dbname = "";
	$conn = mysqli_connect($servername, $username, $password, $dbname);
	if (!$conn) {
		die("<p class='bg-danger text-center'>Connection failed: " . mysqli_connect_error() . "</p>");
	}
	// Success Message for Debugging
	//echo "<p class='bg-success text-center'>Connected to server</p>";
?>