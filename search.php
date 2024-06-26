<?php
include 'connect.php';

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost/abdu/search.php");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, x-requested-with");

// Example PHP code to handle the request and send a JSON response
$input = file_get_contents("php://input");
$data = json_decode($input, true);

// Process the data
// Example: just echo back the received data
//echo json_encode(["status" => "success", "received_data" => $data]);

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Your existing headers and code
header("Content-Type: application/json");
//echo json_encode(["message" => "Hello World"]);

//form search
$country = 1; 
    $inputSearch = null;
	$state=isset($data['state'])?$data['state']:'';
	$city=isset($data['city'])?$data['city']:'';
	$pageNum =isset($data['page']) && is_numeric($data['page'])  ?intval($data['page']) :1 ;

   if($state!=null && $city!=null){
    // First query: Count total items for pagination
    $stmt = $conn->prepare("
        SELECT COUNT(item_id)
        FROM items
        JOIN country ON items.country_id = country.country_id
        JOIN state ON items.state_id = state.state_id
        JOIN city ON items.city_id = city.city_id
        WHERE country.country_id = :country_id 
        AND state.state_id = :state
		AND city.city_id = :city
        AND items.approve = 1 
        ORDER BY feature DESC, item_id DESC
    ");
    $stmt->execute(['country_id' => $country,'state' => $state,'city' =>$city]);
    $adsTotalNumber = $stmt->fetchColumn();  
    
    $adsPerPage = 6;
    $NumberOfPages = ceil($adsTotalNumber / $adsPerPage);
	$startFrom = ($pageNum - 1) * $adsPerPage;

		// Second query: Fetch paginated results
		$stmt = $conn->prepare("
			SELECT *
			FROM items
			JOIN categories ON categories.cat_id = items.CAT_ID 
			JOIN sub ON items.subcat_id = sub.subcat_id 
			JOIN country ON items.country_id = country.country_id
			JOIN state ON items.state_id = state.state_id
			JOIN city ON items.city_id = city.city_id
			WHERE country.country_id = :country_id 
			AND categories.cat_id > 0
			AND state.state_id = :state
		    AND city.city_id = :city
			AND items.approve = 1 
			ORDER BY feature DESC, item_id DESC  
			LIMIT :startFrom, :adsPerPage
		");
		
		// Binding values for the limit clause
		$stmt->bindValue(':country_id', $country, PDO::PARAM_INT);
		$stmt->bindValue(':state', $state, PDO::PARAM_INT);
		$stmt->bindValue(':city', $city, PDO::PARAM_INT);
		$stmt->bindValue(':startFrom', $startFrom, PDO::PARAM_INT);
		$stmt->bindValue(':adsPerPage', $adsPerPage, PDO::PARAM_INT);

		$stmt->execute();
		$data = $stmt->fetchAll(PDO::FETCH_ASSOC);
		$json = json_encode($data);
        echo $json;
		

   }