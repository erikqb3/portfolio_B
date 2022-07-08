<?php
/*
Poxy connection to the phpmotors*/

function sapiendesignsConnect()
{
  $server = 'localhost';
  $dbname = 'sapiendesigns_TestRun';
  $username = 'root';
  $password = 'uG#6^mL32IBsYNrV';
  $dsn = "mysql:host=$server;dbname=$dbname"; // dsn Data Source Name
  $options = array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION);

  try {
    $link = new PDO($dsn, $username, $password, $options);
    if (is_object($link)) {
      echo "IT WORKS";
    }
    return $link;
  } catch (PDOException $e) {
    // header("Location: /workbench/phpTesting/error.html"); //similar to include but instead of covering screen, entirely redirects
    echo "IT FAILED";
    exit;
  }
}

// FOR TESTING PURPOSES ONLY, COMMENT IT OUT AFTER SUBMISSION
sapiendesignsConnect();
