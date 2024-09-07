<?php
header('Content-Type: application/json; charset=utf-8');

$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (empty($data)) {
    echo json_encode(["message" => "Empty input, try filling all form data."]);
} else {
    $url = 'http://localhost:8087/';

    try {
        $jsonData = json_encode($data);
        $ch = curl_init($url);

        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonData);

        $response = curl_exec($ch);

        if ($response === false) {
            $error = curl_error($ch);
            echo json_encode(["message" => $error]);
        } else {
            echo json_encode(["message" => "Data sent successfully"]);
        }

        curl_close($ch);
    } catch (Error $e) {
        echo json_encode(["message" => "Something went wrong"]);
    }

}
