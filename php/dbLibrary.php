<?php
	
	include_once 'connect.php'; // Include the connection file that initiate a connection to the database and stores the object as $conn

	function sqlToArray ($table,$cols,$sqlArgs) { // Function makes an SQL querey and returns results in a 3D array sqlToArray (<SQL TABLE>,<COLUMNS DESIRED or * for all>,<SQL ARGS such as ORDER BY name>) [<RESULT NUM>][COL NAME] = VALUE
		global $conn;
		//$sql = "SELECT * FROM `content`";
		$sql = "SELECT " . $cols ." FROM " . $table . " " . $sqlArgs;
		$sqlData = mysqli_query($conn, $sql);
		// output data of each row
		$i=0;
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

	function friendlyDbName ($input) {
		$piece = preg_split('/(?=[A-Z])/',$input);
		$output = '';
		foreach ($piece as $key => $value){
			$output .= ucfirst($piece[$key]) . ' ';
		}
		return $output;
	}
?>