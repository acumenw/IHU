<?php
// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "OrderAppDB";

$conn = mysqli_connect($servername, $username, $password, $dbname);

// Check for connection errors
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Fetch active categories from the database
$query = "SELECT * FROM categories WHERE category_active = 1";
$result = mysqli_query($conn, $query);

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Online Shopping</title>
</head>

<body>
    <h1>Categories</h1>

    <?php
    // Display active categories as buttons
    while ($row = mysqli_fetch_assoc($result)) {
        $categoryId = $row['category_id'];
        $categoryName = $row['category_name'];
        echo "<button><a href='products.php?category_id=$categoryId'>$categoryName</a></button>";
    }

    // Close the database connection
    mysqli_close($conn);
?>

    <!-- View Cart Button -->
    <button><a href='cart.php'>View Cart</a></button>
</body>

</html>