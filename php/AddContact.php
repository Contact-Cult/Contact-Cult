<?php
    require_once 'DBHandler.php';
    require_once 'functions.php';

    $inData = getRequestInfo();

    $FirstName = $inData["FirstName"];
    $LastName = $inData["LastName"];
    $Address = $inData["Address"];
    $PhoneNumber = $inData["PhoneNumber"];
    $Email = $inData["Email"];

   $conn = new mysqli($serverName, $dBUsername, $dBPassword, $dBName);
    if ($conn->connect_error)
    {
        returnWithError( $conn->connect_error );
    }
    else
    {
	    
		$stmt = $conn->prepare("INSERT INTO Contacts ( FirstName, LastName, Address, PhoneNumber, Email) VALUES ( ?, ?, ?, ?, ?)");
		$stmt->bind_param("sssss",  $FirstName, $LastName, $Address, $PhoneNumber, $Email);
		$stmt->execute();
	    
	    $result = $stmt->get_result();

			if( $row = $result->fetch_assoc()  )
			{
				returnWithInfo( $row['FirstName'], $row['LastName'], $row['ID'] );
			}
			else
			{
				returnWithError("No Records Found");
			}
	    
      $stmt->close();
      $conn->close();
#      returnWithError("");
    }

function returnWithInfo( $FirstName, $LastName, $ID )
		{
			$retValue = '{"ID":' . $ID . ',"FirstName":"' . $FirstName . '","LastName":"' . $LastName . '","error":""}';
			sendResultInfoAsJson( $retValue );
		}
?>
