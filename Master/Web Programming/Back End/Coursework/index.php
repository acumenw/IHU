<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "OrderAppDB";

$conn = mysqli_connect($servername, $username, $password, $dbname);


if(!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$query = "SELECT * FROM categories WHERE category_active = 1";
$result = mysqli_query($conn, $query);

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>QuickMart | Homepage</title>
</head>

<body>
    <div id="categories">
        <h2 id='headers'>Categories</h2>
        <?php
        while($row = mysqli_fetch_assoc($result)) {
            $categoryId = $row['category_id'];
            $categoryName = $row['category_name'];
            echo "<button id='categoryuButtons'><a href = 'products.php?category_id=$categoryId'>$categoryName</a></button>";
        }

        mysqli_close($conn);

?>
    </div>
    <div id="cartButton">
        <button id='navButtons'><a href='cart.php'>View Cart</button>
    </div>
</body>

</html>