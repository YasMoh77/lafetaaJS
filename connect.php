<?php

$dsn='mysql:host=localhost; dbname=lafetaa; charset=utf8';//mostjxtw_lafdb
$user='root';
$password='';
//$options=array(PDO::MYSQL_ATTR_INIT_COMMAND=>'SET NAMES utf8');

	try {
		$conn = new PDO($dsn, $user, $password/*,$options*/); 
		$conn->setAttribute(PDO::ATTR_ERRMODE , PDO::ERRMODE_EXCEPTION);	
		}

	catch (PDOException  $e){
		  echo('failed'). $e->getMessage();  // a message shown in time of failure
		}