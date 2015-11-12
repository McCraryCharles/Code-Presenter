<?php 
 	/* -- Code Presenter - http://www.codepresenter.net --
	A simple, educational tool to engage student participation through real-time code sharing and presentation in the classroom
	An open source project coded by Charles McCrary https://github.com/McCraryCharles/ */	
	
	// This file loads the correct page based on the URL / Host cookie
	if(isset($_POST["g-recaptcha-response"]) && !isset($_COOKIE['userKey']) && !isset($_COOKIE['hostId'])){
		$captcha = $_POST["g-recaptcha-response"];
		include_once 'php/pages/home/captchaKey.php'; // File contains captcha key
		$response=file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=".$privatekey."&response=".$captcha."&remoteip=".$_SERVER['REMOTE_ADDR']);
		$response = json_decode($response, true);
		if($response['success']==false) { // If CAPTCHA was entered incorrectly
			$connectError = "Invalid captcha response, please try again.";
			include_once 'php/pages/home.php'; // Load homepage
			die; // Stop loading
		}
	}	
	if (isset($_POST['new-room'])) {
		if ($_POST['new-room'] == 'true') {
			include_once "php/db/dbLibrary.php"; // Include database library
			header('Location: ?room='. createRoom()); // Create the room and assign cokies
			die; // Stop loading
		}
	}

	if(isset($_GET['room'])) { // If a room id was entered
		$roomCode = strtoupper($_GET['room']); // Set the room id variable
		include_once "php/db/dbLibrary.php"; // Include database library
		$config = loadConfig(); // Load the config file
		$roomId = getRoomId($roomCode); // Get the room id, if code is invalid will set to false
		if (isset($_COOKIE['hostId'])) { // If a host cookie is set
			$hostId = strtoupper($_COOKIE['hostId']);
			$hostIdRoom = checkHost($hostId); // Verify the id
			if ($hostIdRoom == $roomId && !empty($roomId)) { // If host id is for the set room
				include_once 'php/pages/host/host.php'; // Load host page
			}
			else { // If there is a key mismatch
				setcookie('hostId', 0, time() - (60), "/"); // Expire host cookie to one min ago
				include_once 'php/pages/home.php'; // Load homepage
			}
		}
		else { // If host cookie is not set
			if (checkRoom($roomCode) != false) { // If room id is valid
				if (isset($_COOKIE['userKey'])) {
					$userKey = $_COOKIE['userKey'];
					// Check Key
					$userId = checkUser($userKey); // Checks DB for user and returns id, if does not exist returns false
					if ($userId != false && getUserRoom($userId) == $roomId) { // If id is valid, and user is for the correct room
						include_once 'php/pages/user/user.php'; // Load user room
					}
					else {
						setcookie('userKey', 0, time() - (60), "/"); // Expire user key to one min ago
						include_once 'php/pages/user/user.php'; // Load user room
						echo '<script>promptUser();</script>'; // Run promptuser JS on page load
					}
				}
				else {
					include_once 'php/pages/user/user.php'; // Load user room
					echo '<script>promptUser();</script>'; // Run promptuser JS on page load
				}
			}
			else { // If room id does not exist
				$connectError = "Room not found, please check your code.";
				include_once 'php/pages/home.php'; // Load homepage
			}
		}
	}
	else { // If no room id was set
		include_once 'php/pages/home.php'; // Load homepage
	}
?>