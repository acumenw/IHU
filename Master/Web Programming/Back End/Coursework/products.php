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

// Check if category_id is set in the URL
if (isset($_GET['category_id'])) {
    $category_id = $_GET['category_id'];

    // Fetch products for the selected category from the database
    $query = "SELECT * FROM products WHERE product_active = 1 AND product_category_id = $category_id";
    $result = mysqli_query($conn, $query);
    ?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Products</title>
</head>

<body>
    <h1>Products</h1>

    <?php
        // Display products
        while ($row = mysqli_fetch_assoc($result)) {
            $product_name = $row['product_name'];
            $product_price = $row['product_price'];

            echo "<div>";
            echo "<p>Product Name: $product_name</p>";
            echo "<p>Product Price: $$product_price</p>";
            echo "<button><a href='insert_cart.php?product_id={$row['product_id']}'>Add to Cart</a></button>";
            echo "</div>";
        }

        // Close the database connection
        mysqli_close($conn);
    ?>

    <!-- Back to Home Button -->
    <button><a href='index.php'>Back to Home</a></button>
    <!-- View Cart Button -->
    <button><a href='cart.php'>View Cart</a></button>
</body>

</html>
<?php
} else {
    // Redirect to index.php if category_id is not set
    header("Location: index.php");
    exit();
}
?>