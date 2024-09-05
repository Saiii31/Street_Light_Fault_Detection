<?php
$host = "localhost";
$user = "root";
$pass = "sai";
$dbname = "streetL";

$conn = mysqli_connect($host, $user, $pass, $dbname);

$name = $_POST['name'];
$email = $_POST['email'];
$password = $_POST['password'];
$sql = "INSERT INTO users (name, email, password) VALUES ('$name', '$email', '$password')";

$result = mysqli_query($conn, $sql); // Corrected variable name

if ($result) {
    header('Location: index.html'); // Redirect after successful query execution
} else {
    echo "Error: " . mysqli_error($conn); // Display error message if query fails
}

mysqli_close($conn);
?>
