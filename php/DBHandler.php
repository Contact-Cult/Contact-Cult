<?php
	# server/database information
	$serverName = "165.22.9.236";
	$dBUsername = "APIbot";
	$dBPassword = "beepboop";
	$dBName = "ContactManager";

	#establish connection to MySQL server
	$conn = mysqli_connect($serverName, $dBUsername, $dBPassword, $dBName);

	# error message if script is not able to connect with the server
	if (!$conn) {
		die("Connection failed: " . mysqli_connect_error());
	}
?>
