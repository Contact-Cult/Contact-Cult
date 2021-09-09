<?php

  require 'DBHandler.php';
  require 'functions.php';

  $inData = getRequestInfo();

  # contact information stored as variables
  $ID = $inData["ID"];
  $ContactID = $inData["ContactID"];
  $FirstName = $inData["FirstName"];
  $LastName = $inData["LastName"];
  $Address = $inData["Address"];
  $City = $inData["City"];
  $State = $inData["State"];
  $ZipCode = $inData["ZipCode"];
  $PhoneNumber = $inData["PhoneNumber"];
  $Email = $inData["Email"];

  # establish connection to MySQL server to access database and handle failed
  # connection error case
  $conn = new mysqli($serverName, $dBUsername, $dBPassword, $dBName);
  if ($conn->connect_error)
  {
    returnWithError( $conn->connect_error );
  }
  else
  {
    $stmt = $conn->prepare("UPDATE Contacts SET FirstName=?, LastName=?, Address=?, City=?, State=?, ZipCode=?, PhoneNumber=?, Email=? WHERE ID=? AND ContactID=?");
    $stmt->bind_param("ssssssssss", $FirstName,$LastName,$Address,$City,$State,$ZipCode,$PhoneNumber,$Email,$ID,$ContactID);

    $stmt->execute();
    $stmt->close();
    $conn->close();
    returnWithError("");
  }

  ?>
