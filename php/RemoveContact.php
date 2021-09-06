<?php
    require_once 'DBHandler.php';
    require_once 'functions.php';

    $inData = getRequestInfo();

    $ID = $inData["ID"];	
    $FirstName = $inData["FirstName"];
    $LastName = $inData["LastName"];
    $Address = $inData["Address"];
    $City = $inData["City"];
    $State = $inData["State"];
    $ZipCode = $inData["ZipCode"];
    $PhoneNumber = $inData["PhoneNumber"];
    $Email = $inData["Email"];

   $conn = new mysqli($serverName, $dBUsername, $dBPassword, $dBName);
    if ($conn->connect_error)
    {
        returnWithError( $conn->connect_error );
    }
    else
    {
	  
      // Jared: I took the add contact php and just swapped the prepared statement to a DELETE query
		$stmt = $conn->prepare("DELETE FROM Contacts WHERE ID = ? AND FirstName = ? AND LastName = ? AND Address = ? AND City = ? AND State = ? AND ZipCode = ? AND PhoneNumber = ? AND Email = ?)");
		$stmt->bind_param("sssssssss", $ID, $FirstName, $LastName, $Address, $City, $State, $ZipCode, $PhoneNumber, $Email);
		$stmt->execute();
	    
      $stmt->close();
      $conn->close();
      returnWithError("");
    }

?>
