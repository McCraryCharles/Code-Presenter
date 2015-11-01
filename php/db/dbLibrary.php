<?php
 	/*	
	 -- Code Presenter - http://www.codepresenter.net --
	A simple, educational tool to engage student participation through real-time code sharing and presentation in the classroom
	An open source project coded by Charles McCrary https://github.com/McCraryCharles/  
	*/	

	include_once 'connect.php'; // Include the connection file that initiate a connection to the database and stores the object as $conn

	function checkRoom($roomCode) { // Checks validity of a room code, returns a bool
		$sqlArgs = "WHERE `code` = '" . $roomCode . "'";
		$sqlReturn = sqlToArray ('rooms','id',$sqlArgs);
		if (empty($sqlReturn)) {
			return false;
		}
		else {
			return $sqlReturn[0]['id'];
		}
	}

	function checkHost($hostCode) { // Checks validity of a host code, on fail returns false, on success returns room id
		$sqlArgs = "WHERE `host` = '" . $hostCode . "'";
		$sqlReturn = sqlToArray ('rooms','id',$sqlArgs);
		if (empty($sqlReturn)) {
			return false;
		}
		else {
			return $sqlReturn[0]['id'];
		}
	}

	function checkUser($userKey) {
		$sqlArgs = "WHERE `userKey` = '" . $userKey . "'";
		$sqlReturn = sqlToArray ('users','id',$sqlArgs);
		if (empty($sqlReturn)) {
			return false;
		}
		else {
			return $sqlReturn[0]['id'];
		}
	}

	function createUser($room, $name) {
		$userKey;
		do {
			$userKey = keyGen($name);
		}
		while (checkUser($userKey)); // Check for a duplicate key
		$inputArray['room'] = htmlspecialchars($room);
		$inputArray['name'] = htmlspecialchars($name); 
		$inputArray['userKey'] = $userKey;
		arrayToSql ('insert', 'users', $inputArray,'');
		return $userKey;
	}

	function deleteUser($userId) { // Delets a user based on their user id
		$sql = 'DELETE FROM `users` WHERE `id` = ' . $userId;
		mysqli_query($conn, $sql);
	}

	function deleteUserSubmissions($userId) { // Delets all user submissions for a user id
		$sql = 'DELETE FROM `submissions` WHERE `user` = ' . $userId;
		mysqli_query($conn, $sql);
	}

	function keyGen($entropy) { // Key is not used to secure passwords
		if (isset($entropy)) {
			$entropy =  MD5 ($entropy);
		}
		else {
			$entropy = '';
		}
		return MD5 (mt_rand () . $entropy . uniqid ());
	}

	function loadSubmissions($roomId) { // Loads array of submissions for a room id
		return sqlToArray ('submissions','*','WHERE `user` IN (SELECT `id` FROM `users` WHERE `room` = ' . $roomId . ')');
	}
	function loadUserSubmissions($userKey) {// Loads array of submissions for a user key
		$userId = sqlToArray ('users','id','WHERE `userKey` = "' . $userKey . '"')[0]['id'];
		return sqlToArray ('submissions','*','WHERE `user` = ' . $userId);
	}
	function loadSubmission($submissionId) { // Loads a specific submission
		return sqlToArray ('submissions','*','WHERE `id` = ' . $submissionId);
	}
	function getRoomId($roomCode) { // Gets the room id for a room code, if not found returns false
		return sqlToArray ('rooms','id','WHERE `code` = "' . $roomCode . '"')[0]['id'];
	}
	function getUserId($userKey) { // Gets the user id for a user key
		return sqlToArray ('users','id','WHERE `userKey` = "' . $userKey . '"')[0]['id'];
	}
	function createSubmission($roomId, $userKey) { // Creates a new submission
		$inputArray['user'] = getUserId($userKey);
		$inputArray['name'] = 'New Submission';
		//$inputArray['content'] = htmlspecialchars('Console.WriteLine("Lets code!")');
		arrayToSql ('insert', 'submissions', $inputArray, '');
	}
	function renameSubmission($submissionId, $name) { // Renames a submission
		$inputArray['name'] = $name;
		$sqlArgs = 'WHERE `id` = ' . $submissionId;
		arrayToSql('update', 'submissions', $inputArray, $sqlArgs);
	}
	function clearSubmissions($roomId) { // Clears submissions for a specific room id
		global $conn;
		$sql = "DELETE FROM`submissions` WHERE `room` = " . $roomId;
		return mysqli_query($conn, $sql);
	}
	function userSubmissionNum($userId) {
		global $conn;
		$sql = "SELECT id FROM `submissions` WHERE `user` = " . $userId;
		$sqlData = mysqli_query($conn, $sql);
		return mysqli_num_rows($sqlData);
	}
	function updateSubmission($room, $name) { // Updates a submission
		$userKey;
		do {
			$userKey = keyGen($name);
		}
		while (checkUser($userKey)); // Check for a duplicate key
		$inputArray['room'] = htmlspecialchars($room);
		$inputArray['name'] = htmlspecialchars($name); 
		$inputArray['userKey'] = $userKey;
		arrayToSql ('insert', 'users', $inputArray,'');
		return $userKey;
	}
	function sqlToArray ($table,$cols,$sqlArgs) { // Function makes an SQL querey and returns results in a 3D array sqlToArray (<SQL TABLE>,<COLUMNS DESIRED or * for all>,<SQL ARGS such as ORDER BY name>) [<RESULT NUM>][COL NAME] = VALUE
		global $conn;
		$sql = "SELECT " . $cols ." FROM " . $table . " " . $sqlArgs;
		//echo $sql; // For debugging
		$sqlData = mysqli_query($conn, $sql);
		// output data of each row
		$i=0;
		if (!($sqlData)) {
			return $sqlData;
		}
		while($row = mysqli_fetch_assoc($sqlData)) {
			foreach ($row as $key => $value) {
				$returnData[$i][$key] = $value;
			}
			$i++;
		}
		if (!empty($returnData)) {
			return $returnData;
		}
		else {
			return 0;
		}
	} 
	
	function arrayToSql ($action, $table, $inputArray, $sqlArgs) { // Function takes a PHP array and inserts / updates it into the given table with the key as the col name and vaule as value to set
		global $conn;
		switch ($action) {
			case 'insert':
				$cols = '';
				$values = '';
				foreach ($inputArray as $col => $value) {
					if (empty($cols)) {
						$cols = "`" . $col . "`";
						$values = "'" . $value . "'";
					}
					else {
						$cols .= ", `" . $col . "`";
						$values .= ", '" . $value . "'";
					}
				}
				$sql = "INSERT INTO " . $table . " (" . $cols . ") VALUES (" . $values . ");";
				break;
			case 'update':
				$data = '';
				foreach ($inputArray as $col => $value) {
					if (empty($data)) {
						$data = "`" . $col . "` = '" . $value . "'";
					}
					else {
						$data .= ", `" . $col . "` = '" . $value . "'";
					}
				}
				$sql = 'UPDATE `' . $table . '` SET ' . $data . ' ' . $sqlArgs . ';';
				break;
		}
		$sqlData = mysqli_query($conn, $sql);
	}
?>