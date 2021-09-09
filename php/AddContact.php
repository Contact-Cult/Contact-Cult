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
	    		

	    $stmt = $conn->prepare("SELECT ID,UserName,Password,Address,City,State,ZipCode,PhoneNumber, Email FROM Users WHERE ID = ? AND UserName=? AND Password =? AND Address = ? AND City = ? AND State = ? AND ZipCode = ? AND PhoneNumber = ? AND Email = ?");
			$stmt->bind_param("sssssssss", $inData["ID"], $inData["UserName"], $inData["Password"],$inData["Address"],$inData["City"],$inData["State"],$inData["ZipCode"],$inData["PhoneNumber"],$inData["Email"]);
	    
	    	if( $row = $result->fetch_assoc()  )
			{
				returnWithInfo( $row['ContactID'] );
			}
			else
			{
				returnWithError("No Records Found");
			}
		$stmt->execute();
	    
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
