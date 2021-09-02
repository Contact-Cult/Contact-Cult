	<?php
		require_once 'DBHandler.php';
		require_once 'functions.php';

		$inData = getRequestInfo();

		# Contact login information stored as variables
		$ID = 0;
		$FirstName = "";
		$LastName = "";

		# establish connection to MySQL server to access database and handle failed
		# connection error case
		$conn = new mysqli($serverName, $dBUsername, $dBPassword, $dBName);
		if( $conn->connect_error )
		{
			returnWithError( $conn->connect_error );
		}

		# Load the SQL query into a variable and append the corresponding parameters
		# and return information if Login is valid based on returned row or else return an error
		else
		{
			$stmt = $conn->prepare("SELECT ID,FirstName,LastName FROM Users WHERE UserName=? AND Password =?");
			$stmt->bind_param("ss", $inData["UserName"], $inData["Password"]);
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
		}

		# obtain the login information based on the input parameters and send information
		# as JSON element.
		function returnWithInfo( $FirstName, $LastName, $ID )
		{
			$retValue = '{"ID":' . $ID . ',"FirstName":"' . $FirstName . '","LastName":"' . $LastName . '","error":""}';
			sendResultInfoAsJson( $retValue );
		}

	?>
