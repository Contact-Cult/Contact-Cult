<?php
	require_once 'DBHandler.php';
	require_once 'functions.php';

	$inData = getRequestInfo();
	
	$searchResults = "";
	$searchCount = 0;

	$conn = new mysqli($serverName, $dBUsername, $dBPassword, $dBName);
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		
		$stmt = $conn->prepare("SELECT ID,FirstName,LastName FROM Contacts WHERE FirstName=? AND LastName =?");
		$FirstName = "%" . $inData["search"] . "%";
		#$LastName = "%" . $inData["search"] . "%";
		$stmt->bind_param("sss", $inData["userId"], $FirstName, $LastName);
		$stmt->execute();
		
		$result = $stmt->get_result();
		
		while($row = $result->fetch_assoc())
		{
			if( $searchCount > 0 )
			{
				$searchResults .= ",";
			}
			$searchCount++;
			$searchResults .= '"' . $row["Name"] . '"';
		}
		
		if( $searchCount == 0 )
		{
			returnWithError( "No Records Found" );
		}
		else
		{
			returnWithInfo( $searchResults );
		}
		
		$stmt->close();
		$conn->close();
	}


	function returnWithInfo( $searchResults )
	{
		$retValue = '{"results":[' . $searchResults . '],"error":""}';
		sendResultInfoAsJson( $retValue );
	}
	
?>
