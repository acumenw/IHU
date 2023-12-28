<?php
// Check if the 'cart' cookie is set
if (isset($_COOKIE['cart'])) {
    // If the 'cart' cookie is set, retrieve its value and decode it
    $cart = json_decode($_COOKIE['cart'], true);

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

    // Display cart contents
    echo "<h1>Shopping Cart</h1>";

    $totalPrice = 0;

    foreach ($cart as $product_id => $quantity) {
        // Fetch product details from the database
        $query = "SELECT * FROM products WHERE product_id = $product_id";
        $result = mysqli_query($conn, $query);

        // Check if the query was successful
        if ($result) {
            $row = mysqli_fetch_assoc($result);
            $product_name = $row['product_name'];
            $product_price = $row['product_price'];

            // Calculate the total price for the current product based on quantity
            $totalProductPrice = $product_price * $quantity;

            echo "<div>";
            echo "<p>Product Name: $product_name</p>";
            echo "<p>Quantity: $quantity</p>";
            echo "<p>Price per item: $$product_price</p>";
            echo "<p>Total Price: $$totalProductPrice</p>";
            echo "<form method='post'>";
            echo "<input type='hidden' name='product_id' value='$product_id'>";
            echo "<button type='submit' name='remove'>Remove</button>";
            echo "</form>";
            echo "</div>";

            // Accumulate the total price
            $totalPrice += $totalProductPrice;
        } else {
            echo "Query failed: " . mysqli_error($conn);
        }
    }

    // Display the overall total price
    echo "<p>Total Price: $$totalPrice</p>";

    // Handle removal when the form is submitted
    if (isset($_POST['remove'])) {
        $remove_product_id = $_POST['product_id'];

        // Check if the product exists in the cart
        if (isset($cart[$remove_product_id])) {
            // If the product exists, remove it from the cart
            unset($cart[$remove_product_id]);

            // Encode the updated cart as JSON and set it as a cookie
            $cart_json = json_encode($cart);
            setcookie('cart', $cart_json, time() + (86400 * 30), "/"); // Cookie lasts for 30 days

            // Refresh the page to reflect the updated cart
            header("Location: cart.php");
            exit();
        }
    }



    // Close the database connection
    mysqli_close($conn);

    // Back to Home Button
    echo "<button><a href='index.php'>Back to Home</a></button>";
    

} else {
    // If the 'cart' cookie is not set, display a message
    echo "<h1>Your cart is empty</h1>";
    echo "<button><a href='index.php'>Back to Home</a></button>";
}
