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
	    
	    $stmt = $conn->prepare("INSERT INTO Contacts ( ID, FirstName, LastName, Address, City, State, ZipCode, PhoneNumber, Email) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?)");
	    $stmt->bind_param("sssssssss", $ID, $FirstName, $LastName, $Address, $City, $State, $ZipCode, $PhoneNumber, $Email);
	    
	    $stmt->execute();
	    
$sid = $stmt->insert_id;
	    $stmt->execute();
	    #$stmt = $conn->prepare( SELECT SCOPE_IDENTITY);
	    #$stmt->bind_param("sssssssss", $inData["ID"], $inData["FirstName"], $inData["LastName"],$inData["Address"],$inData["City"],$inData["State"],$inData["ZipCode"],$inData["PhoneNumber"],$inData["Email"]);
	    #$stmt->execute();
	    #$result = $stmt->get_result();
	    #	if( $row = $result->fetch_assoc()  )
		#	{
		#		returnWithInfo( $row['ContactID'] );
		#	}
		#	else
		#	{
		#		returnWithError("No Records Found");
		#	}
	    
	    #SELECT SCOPE_IDENTITY();
		
	    
      $stmt->close();
      $conn->close();
      returnWithError("");
    }
	
function returnWithInfo( $ID )
	{
		$retValue = '{"New Contact ID":' . $ContactID . ',"error":""}';
		sendResultInfoAsJson( $retValue );
	}
?>
