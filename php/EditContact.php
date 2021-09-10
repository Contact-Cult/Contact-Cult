  <?php

  require 'DBHandler.php';
  require 'functions.php';

  $inData = getRequestInfo();

  # contact information stored as variables
  $edit = $inData["edit"];
  $ID = $inData["ID"];
  $ContactID = $inData["ContactID"];
  $FirstName = "";
  $LastName = "";
  $Address = "";
  $City = "";
  $State = "";
  $ZipCode = "";
  $PhoneNumber = "";
  $Email = "";
  $Notes = "";

  # establish connection to MySQL server to access database and handle failed
  # connection error case
  $conn = new mysqli($serverName, $dBUsername, $dBPassword, $dBName);
  if ($conn->connect_error)
  {
    returnWithError( $conn->connect_error );
  }
  else
  {
      # switch statements to handle which variable of contact information is edited
    switch ($edit)
    {
      case "FirstName":
        $stmt = $conn->prepare("UPDATE Contacts SET FirstName=? WHERE ID=? AND ContactID=?");
        $stmt->bind_param("sii", $inData["FirstName"],$ID,$ContactID);
        break;
      case "LastName":
        $stmt = $conn->prepare("UPDATE Contacts SET LastName=? WHERE ID=? AND ContactID=?");
        $stmt->bind_param("sii", $inData["LastName"],$ID,$ContactID);
        break;
      case "Address":
        $stmt = $conn->prepare("UPDATE Contacts SET Address=? WHERE ID=? AND ContactID=?");
        $stmt->bind_param("sii", $inData["Address"],$ID,$ContactID);
        break;
      case "City":
        $stmt = $conn->prepare("UPDATE Contacts SET City=? WHERE ID=? AND ContactID=?");
        $stmt->bind_param("sii", $inData["City"],$ID,$ContactID);
        break;
      case "State":
        $stmt = $conn->prepare("UPDATE Contacts SET State=? WHERE ID=? AND ContactID=?");
        $stmt->bind_param("sii", $inData["State"],$ID,$ContactID);
        break;
      case "ZipCode":
        $stmt = $conn->prepare("UPDATE Contacts SET ZipCode=? WHERE ID=? AND ContactID=?");
        $stmt->bind_param("sii", $inData["ZipCode"],$ID,$ContactID);
        break;
      case "PhoneNumber":
        $stmt = $conn->prepare("UPDATE Contacts SET PhoneNumber=? WHERE ID=? AND ContactID=?");
        $stmt->bind_param("sii", $inData["PhoneNumber"],$ID,$ContactID);
        break;
      case "Email":
        $stmt = $conn->prepare("UPDATE Contacts SET Email=? WHERE ID=? AND ContactID=?");
        $stmt->bind_param("sii", $inData["Email"],$ID,$ContactID);
        break;
      case "Notes":
        $stmt = $conn->prepare("UPDATE Contacts SET Notes=? WHERE ID=? AND ContactID=?");
        $stmt->bind_param("sii", $inData["Notes"],$ID,$ContactID);
      default:
        break;
    }
    $stmt->execute();
    $stmt->close();
    $conn->close();
    returnWithError("");
  }

  ?>
