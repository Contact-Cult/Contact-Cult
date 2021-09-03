<?php
	require_once 'DBHandler.php';
    	require_once 'functions.php';

	$inData = getRequestInfo();
	
	$color = $inData["color"];
	$userId = $inData["userId"];

	 $conn = new mysqli($serverName, $dBUsername, $dBPassword, $dBName);
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$stmt = $conn->prepare("INSERT into Colors (UserId,Name) VALUES(?,?)");
		$stmt->bind_param("ss", $userId, $color);
		$stmt->execute();
		$stmt->close();
		$conn->close();
		returnWithError("");
	}


	
?>
