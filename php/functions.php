<?php

function returnWithError( $err ) {
   		$retValue = '{"error":"' . $err . '"}';
   		sendResultInfoAsJson( $retValue );
}

function sendResultInfoAsJson( $obj ) {
   		header('Content-type: application/json');
   		echo $obj;
}

function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}
