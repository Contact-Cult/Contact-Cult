<?php
    require_once 'DBHandler.php';
    require_once 'functions.php';

    $inData = getRequestInfo();
    $searchResult = "";
    $resultCount = 0;
    $searchFilter = $inData["searchFilter"];
    $searchQuery = $inData["searchQuery"];

    # contact information stored as variables
    $ID = $inData["ID"];
    $ContactID = "";
    $FirstName = "";
    $LastName = "";
    $Address = "";
    $City = "";
    $State = "";
    $ZipCode = "";
    $PhoneNumber = "";
    $Email = "";

    # establish connection to MySQL server to access database and handle failed
    # connection error case
    $conn = new mysqli($serverName, $dBUsername, $dBPassword, $dBName);
    if($conn->connect_error)
    {
        returnWithError($conn->connect_error);
    }

    # select the contact ID of the contact with the specified ID and first/last name,
    # then using the contact ID, select all attributes of that contact and return
    # that information or else return an error
    else
    {
        $searchResult .= '"results" : [';

        $query = "SELECT * FROM Contacts WHERE ID =? AND ";
        switch($searchFilter) {
            case "Name":
                $query .=   "FirstName LIKE '%" . $searchQuery .
                            "%' OR LastName LIKE '%" . $searchQuery . "%'";
                break;
            case "First":
                $query .=   "FirstName LIKE '%" . $searchQuery . "%'";
                break;
            case "Last":
                $query .=   "LastName LIKE '%" . $searchQuery . "%'";
                break;
            case "Address":
                $query .=   "Address LIKE '%" . $searchQuery .
                            "%' OR City LIKE '%" . $searchQuery .
                            "%' OR State LIKE '%" . $searchQuery .
                            "%' OR ZipCode LIKE '%" . $searchQuery . "%'";
                break;
            case "Phone":
                $query .=   "PhoneNumber LIKE '%" . $searchQuery . "%'";
                break;
            case "Email":
                $query .=   "Email LIKE '%" . $searchQuery . "%'";
                break;
        }

        $stmt = $conn->prepare($query);
        $stmt->bind_param("i", $ID);
        $stmt->execute();
        $result = $stmt->get_result();
        if($row = $result->fetch_assoc())
        {
            $searchResult .= '{';
            $searchResult .= '"ContactID" : "' . $row["ContactID"] . '", ';
            $searchResult .= '"FirstName" : "' . $row["FirstName"] . '", ';
            $searchResult .= '"LastName" : "' . $row["LastName"] . '", ';
            $searchResult .= '"Address" : "' . $row["Address"] . '", ';
            $searchResult .= '"City" : "' . $row["City"] . '", ';
            $searchResult .= '"State" : "' . $row["State"] . '", ';
            $searchResult .= '"ZipCode" : "' . $row["ZipCode"] . '", ';
            $searchResult .= '"PhoneNumber" : "' . $row["PhoneNumber"] . '", ';
            $searchResult .= '"Email" : "' . $row["Email"] .  '"';
            $searchResult .= '}';
            $resultCount++;


            while($row = $result->fetch_assoc())
            {
                if($resultCount > 0)
                {
                    $searchResult .= ",";
                }
                $resultCount++;
                $searchResult .= '{';
                $searchResult .= '"ContactID" : "' . $row["ContactID"] . '", ';
                $searchResult .= '"FirstName" : "' . $row["FirstName"] . '", ';
                $searchResult .= '"LastName" : "' . $row["LastName"] . '", ';
                $searchResult .= '"Address" : "' . $row["Address"] . '", ';
                $searchResult .= '"City" : "' . $row["City"] . '", ';
                $searchResult .= '"State" : "' . $row["State"] . '", ';
                $searchResult .= '"ZipCode" : "' . $row["ZipCode"] . '", ';
                $searchResult .= '"PhoneNumber" : "' . $row["PhoneNumber"] . '", ';
                $searchResult .= '"Email" : "' . $row["Email"] .  '"';
                $searchResult .= '}';
            }
            $searchResult .= ']';
            returnWithInfo($searchResult);
        }

        else
        {
            returnWithError("No Results Match");
        }
        $stmt->close();

        $conn->close();

    }


    # obtain the login information based on the input parameters and send information
    # as JSON element.
    function returnWithInfo($searchResult)
    {
        $retValue = '{'. $searchResult .', "error" : ""}';
        sendResultInfoAsJson($retValue);
    }
?>
