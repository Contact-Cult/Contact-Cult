<?php
	require_once 'DBHandler.php';
	require_once 'functions.php';

	$inData = getRequestInfo();
	
	$ID = $inData["ID"];	
	$searchResults = "";
	$searchCount = 0;

	$conn = new mysqli($serverName, $dBUsername, $dBPassword, $dBName);
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		
		#$query = "SELECT * FROM Contacts WHERE ID = ? AND FirstName LIKE '%" . $inData["FirstName"] . "%' ";
		#$stmt = $conn->prepare($query);
		$stmt = $conn->prepare("SELECT ID,FirstName,LastName FROM Contacts WHERE FirstName=? AND LastName =? AND ID = $ID");
		$FirstName = "%" . $inData["search"] . "%";
		#$LastName = "%" . $inData["search"] . "%";
		$stmt->bind_param("sss", $inData["ID"], $FirstName, $LastName);
		$stmt->execute();
		
		$result = $stmt->get_result();
		
		while($row = $result->fetch_assoc())
		{
			if( $searchCount > 0 )
			{
				$searchResults .= ",";
			}
			$searchCount++;
			$searchResults .= '"' . $row["FirstName"] . '"';
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
