
<?php
include 'connect.php';
header('Access-Control-Allow-Origin: http://localhost/abdu/index.php' ); //=allow this website only header('Access-Control-Allow-Methods: *' ); //POST, GET, OPTIONS, DELETE;  *=all methods
header('Access-Control-Allow-Headers: Content-Type, x-requested-with '); //accept requests from the site specified in origin only
header('Access-Control-Max-Age: 86400' ); //time
header('Content-type: application/json; charset=UTF-8'); //send data of type json, support all languages 


//ONLY people with keys and emails are allowed
$allowedKeys=[123,456];
$allowedEmails=['hgq1100@yahoo.com','abdu@gmail.com'];

//if(isset($_GET['key']) && in_array($_GET['key'], $allowedKeys) && isset($_GET['email']) && in_array($_GET['email'],$allowedEmails)){
	if (isset($_GET['all']) && $_GET['all']=='items' ) {
		//all items
		$items=$conn->prepare("SELECT * from items limit 12");
		$items->execute();
		$data=$items->fetchAll(PDO::FETCH_ASSOC);//make an array of items
		$json_data=json_encode($data);
		print_r($json_data);
	}

//search
  elseif (isset($_GET['search'])) {
		$search=$_GET["search"];
		$items=$conn->prepare("SELECT * from items WHERE  NAME LIKE '%$search%'  OR  description2 LIKE '%$search%' limit 12  ");
		$items->execute();
		$data=$items->fetchAll(PDO::FETCH_ASSOC);//PDO::FETCH_ASSOC
		$json=json_encode($data);
		print_r($json);
  }


  //loadMore
  elseif(isset($_GET['page']) ){	$country=1;
	$inputSearch=null;
	$state=isset($_GET['state'])?$_GET['state']:'';
	$city=isset($_GET['city'])?$_GET['city']:'';
	$pageNum =isset($_GET['page']) && is_numeric($_GET['page'])  ?intval($_GET['page']) :1 ;

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
}



  
    