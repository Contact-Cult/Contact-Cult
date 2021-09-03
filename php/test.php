<?php
    require_once 'DBHandler.php';
    require_once 'functions.php';

    $inData = getRequestInfo();

    # Contact Book User registration information stored as variables.
    #$DateCreated = date("Y/m/d"); #Might not need
    $FirstName = $inData["FirstName"];
    $LastName = $inData["LastName"];
    $Details = $inData["Contact Details"];
    $PhoneNumber = $inData["PhoneNumber"];
    $Email = $inData["Email"];


    # establish connection to MySQL server to access database and handle failed
    # connection error case
    $conn = new mysqli($serverName, $dBUsername, $dBPassword, $dBName); 
    if( $conn->connect_error )
    {
		returnWithError( $conn->connect_error );
    }

    # Query the database to insert the registered user into the Users table if
	# validation constraints are met or else return an error
    else
    {
		
	    
		$stmt = $conn->prepare("INSERT INTO Contacts ( FirstName, LastName, Details, PhoneNumber, Email) VALUES ( ?, ?, ?, ?, ?)");
		$stmt->bind_param("sssss",  $FirstName, $LastName, $Details, $PhoneNumber, $Email);
		$stmt->execute();
		#$result = $stmt->get_result();
		#returnWithError("");
	    	
	    	#if($row = $result->fetch_assoc() ){
		
		#	returnWithInfo($row['FirstName'], $row['LastName'], $row['Details'], $row['PhoneNumber'], $row['Email']);
			
		#}
	    #else {
		#returnWithError("Something went wrong");    	
	    #}
	    	$stmt->close();
		$conn->close();
	}

	function returnWithInfo( $FirstName, $LastName, $ID )
		{
			$retValue = '{"ID":' . $ID . ',"FirstName":"' . $FirstName . '","LastName":"' . $LastName . '","error":""}';
			sendResultInfoAsJson( $retValue );
		}
?>
