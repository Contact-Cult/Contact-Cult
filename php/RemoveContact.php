<?php
    require_once 'DBHandler.php';
    require_once 'functions.php';

    $inData = getRequestInfo();

    $ID = $inData["ContactID"];

   $conn = new mysqli($serverName, $dBUsername, $dBPassword, $dBName);
    if ($conn->connect_error)
    {
        returnWithError( $conn->connect_error );
    }
    else
    {
		$stmt = $conn->prepare("DELETE FROM Contacts WHERE ContactID = ?");
		$stmt->bind_param("i", $ContactID);
	    $stmt->execute();
	    
        $stmt->close();
	    $conn->close();
	    returnWithError("");
    }

?>
