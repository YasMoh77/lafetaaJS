<?php
include 'connect.php';
header('Access-Control-Allow-Origin: http://localhost/abdu/show.html' ); //=allow this website only header('Access-Control-Allow-Methods: *' ); //POST, GET, OPTIONS, DELETE;  *=all methods
header('Access-Control-Allow-Headers: *'); //accept requests from the site specified in origin only
header('Access-Control-Max-Age: 86400' ); //time
header('Content-type: application/json; charset=UTF-8'); //send data of type json, support all languages 


//get states
if (isset($_GET['country'])) {
    $stmt=$conn->prepare("
    SELECT state.*,country.*  from state
    join country on country.country_id=state.country_id
    where country.country_id=?   ");
    $stmt->execute(array($_GET['country']));
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $json = json_encode($data);
    echo $json;
}

//get cities
if (isset($_GET['c'])) {
    $stmt=$conn->prepare("
    SELECT city.*, state.* from city
    join state on city.state_id=state.state_id
    where state.state_id=?   ");
    $stmt->execute(array($_GET['c']));
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $json = json_encode($data);
    echo $json;
}