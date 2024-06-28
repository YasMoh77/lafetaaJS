<?php
include 'connect.php';

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost/abdu/show.html");
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
    $inputSearch = null;
	$country=isset($data['country']) && $data['country']>0 ?$data['country']:'';
	$state=isset($data['state']) && $data['state']>0 ? $data['state']:'';
	$city=isset($data['city']) && $data['city']>0 ? $data['city']:'';
	$pageNum =isset($data['page']) && is_numeric($data['page'])  ?intval($data['page']) :1 ;
	
	//show ads in a whole country
	if($country!=null&& $state==null && $city==null){
      // First query: Count total items for pagination
    $stmt = $conn->prepare("
	SELECT COUNT(item_id)
	FROM items
	JOIN categories ON categories.cat_id = items.CAT_ID 
	JOIN sub ON items.subcat_id = sub.subcat_id 
	JOIN country ON items.country_id = country.country_id
	LEFT JOIN state ON items.state_id = state.state_id
	LEFT JOIN city ON items.city_id = city.city_id
	WHERE country.country_id = :country_id 
	AND state.state_id  >0
	AND city.city_id  >0
	AND categories.cat_id >0
	AND sub.subcat_id >0
	AND items.approve = 1 
	
     ");
	$stmt->execute(['country_id' => $country]);
	$adsTotalNumber = $stmt->fetchColumn();  
	
	$adsPerPage=9;
	$startFrom = ($pageNum - 1) * $adsPerPage;

	// Second query: Fetch paginated results
	$stmt = $conn->prepare("
		SELECT *
		FROM items
		JOIN categories ON categories.cat_id = items.CAT_ID 
		JOIN sub ON items.subcat_id = sub.subcat_id 
		JOIN country ON items.country_id = country.country_id
		LEFT JOIN state ON items.state_id = state.state_id
		LEFT JOIN city ON items.city_id = city.city_id
		WHERE  country.country_id = :country_id
		AND state.state_id  >0
	    AND city.city_id >0
		AND categories.cat_id >0
		AND sub.subcat_id >0
		AND items.approve = 1 
		ORDER BY feature DESC, item_id DESC  
		LIMIT :startFrom, :adsPerPage
	  ");
	  // Binding values for the limit clause
		$stmt->bindValue(':country_id', $country, PDO::PARAM_INT);
		$stmt->bindValue(':startFrom', $startFrom, PDO::PARAM_INT);
		$stmt->bindValue(':adsPerPage', $adsPerPage, PDO::PARAM_INT);

		$stmt->execute();
		$data = $stmt->fetchAll(PDO::FETCH_ASSOC);
		$response=[
			'data'=>$data,
			'ads'=>$adsTotalNumber,
		];
	   
	   $json = json_encode($response);
	   echo $json;
	
    //search by country and state
	}elseif($country !=null && $state !=null && $city==null){
        // First query: Count total items for pagination
    $stmt = $conn->prepare("
	SELECT COUNT(item_id)
	FROM items
	JOIN categories ON categories.cat_id = items.CAT_ID 
	JOIN sub ON items.subcat_id = sub.subcat_id 
	JOIN country ON items.country_id = country.country_id
	JOIN state ON items.state_id = state.state_id
	LEFT JOIN city ON items.city_id = city.city_id
	WHERE country.country_id = :country_id 
	AND state.state_id = :state
	AND city.city_id  >0
	AND categories.cat_id >0
	AND sub.subcat_id >0
	AND items.approve = 1 
	
     ");
	$stmt->execute(['country_id' => $country,'state' => $state]);
	$adsTotalNumber = $stmt->fetchColumn();  
	
	$adsPerPage=9;
	$startFrom = ($pageNum - 1) * $adsPerPage;

	// Second query: Fetch paginated results
	$stmt = $conn->prepare("
		SELECT *
		FROM items
		JOIN categories ON categories.cat_id = items.CAT_ID 
		JOIN sub ON items.subcat_id = sub.subcat_id 
		JOIN country ON items.country_id = country.country_id
		JOIN state ON items.state_id = state.state_id
		LEFT JOIN city ON items.city_id = city.city_id
		WHERE  country.country_id = :country_id
		AND state.state_id = :state
	    AND city.city_id  >0
		AND categories.cat_id >0
		AND sub.subcat_id >0
		AND items.approve = 1 
		ORDER BY feature DESC, item_id DESC  
		LIMIT :startFrom, :adsPerPage
	  ");
	  // Binding values for the limit clause
		$stmt->bindValue(':country_id', $country, PDO::PARAM_INT);
		$stmt->bindValue(':state', $state, PDO::PARAM_INT);
		$stmt->bindValue(':startFrom', $startFrom, PDO::PARAM_INT);
		$stmt->bindValue(':adsPerPage', $adsPerPage, PDO::PARAM_INT);

		$stmt->execute();
		$data = $stmt->fetchAll(PDO::FETCH_ASSOC);
		$response=[
			'data'=>$data,
			'ads'=>$adsTotalNumber,
		];
	   
	   $json = json_encode($response);
	   echo $json;
	
	}elseif($country!=null && $state!=null && $city!=null){
    // First query: Count total items for pagination
    $stmt = $conn->prepare("
        SELECT COUNT(item_id)
        FROM items
		JOIN categories ON categories.cat_id = items.CAT_ID 
		JOIN sub ON items.subcat_id = sub.subcat_id 
        JOIN country ON items.country_id = country.country_id
        JOIN state ON items.state_id = state.state_id
        JOIN city ON items.city_id = city.city_id
        WHERE country.country_id = :country_id 
        AND state.state_id = :state
		AND city.city_id = :city
		AND categories.cat_id >0
		AND sub.subcat_id >0
        AND items.approve = 1 
        
    ");
		$stmt->execute(['country_id' => $country,'state' => $state,'city' =>$city]);
		$adsTotalNumber = $stmt->fetchColumn();  
		
		$adsPerPage=9;
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
			WHERE  country.country_id = :country_id
			AND state.state_id = :state
		    AND city.city_id = :city
			AND categories.cat_id >0
			AND sub.subcat_id >0
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
         $response=[
			 'data'=>$data,
			 'ads'=>$adsTotalNumber,
		 ];
		
		$json = json_encode($response);
        echo $json;
		
		

   }
  
 
 /*
 include 'connect.php';
 
 header("Content-Type: application/json");
 header("Access-Control-Allow-Origin: http://localhost/abd/shower.html");
 header("Access-Control-Allow-Methods: POST");
 header("Access-Control-Allow-Headers: Content-Type, x-requested-with");
 
 $input = file_get_contents("php://input");
 $data = json_decode($input, true);
 
 ini_set('display_errors', 1);
 ini_set('display_startup_errors', 1);
 error_reporting(E_ALL);
 
 $country = isset($data['country']) && $data['country']>0 ? $data['country'] : null;
 $state = isset($data['state']) && $data['state']>0 ? $data['state'] : null;
 $city = isset($data['city']) && $data['city']>0 ? $data['city'] : null;
 $pageNum = isset($data['page']) && is_numeric($data['page']) ? intval($data['page']) : 1;
 
 $adsPerPage=9;
 $startFrom = ($pageNum - 1) * $adsPerPage;
 
 // Base query without any specific filters yet
 $baseQuery = "
	 FROM items
	 JOIN categories ON categories.cat_id = items.CAT_ID 
	 JOIN sub ON items.subcat_id = sub.subcat_id 
	 JOIN country ON items.country_id = country.country_id
	 LEFT JOIN state ON items.state_id = state.state_id
	 LEFT JOIN city ON items.city_id = city.city_id
	 WHERE items.approve = 1
 ";
 
 // Parameters array
 $params = [];
 
 // Add conditions based on provided input
 if ($country !== null) {
	 $baseQuery .= " AND country.country_id = :country_id";
	 $params['country_id'] = $country;
 }
 
 if ($state !== null) {
	 $baseQuery .= " AND (state.state_id = :state_id OR state.state_id IS NULL)";
	 $params['state_id'] = $state;
 }
 
 if ($city !== null) {
	 $baseQuery .= " AND (city.city_id = :city_id OR city.city_id IS NULL)";
	 $params['city_id'] = $city;
 }
 
 // Count query to get the total number of items
 $countQuery = "SELECT COUNT(items.item_id) AS total " . $baseQuery;
 $stmt = $conn->prepare($countQuery);
 foreach ($params as $key => $value) {
	 $stmt->bindValue(':' . $key, $value, PDO::PARAM_INT);
 }
 $stmt->execute();
 $adsTotalNumber = $stmt->fetchColumn();
 
 // Data query to get the paginated items
 $dataQuery = "SELECT items.*, categories.*, sub.*, country.*, state.*, city.* " . $baseQuery . "
	 ORDER BY items.feature DESC, items.item_id DESC
	 LIMIT :startFrom, :adsPerPage";
 $stmt = $conn->prepare($dataQuery);
 foreach ($params as $key => $value) {
	 $stmt->bindValue(':' . $key, $value, PDO::PARAM_INT);
 }
 $stmt->bindValue(':startFrom', $startFrom, PDO::PARAM_INT);
 $stmt->bindValue(':adsPerPage', $adsPerPage, PDO::PARAM_INT);
 $stmt->execute();
 $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
 
 // Return the results as JSON
 $response=[
			 'data'=>$data,
			 
			
			 'ads'=>$adsTotalNumber,
		 ];
 
 echo json_encode($response);
 */