<?php
// Check if product_id is set in the URL
if (isset($_GET['product_id'])) {
    $product_id = $_GET['product_id'];

    // Check if the 'cart' cookie is set
    if (isset($_COOKIE['cart'])) {
        // If the 'cart' cookie is set, retrieve its value and decode it
        $cart = json_decode($_COOKIE['cart'], true);

        // Check if the product already exists in the cart
        if (isset($cart[$product_id])) {
            // If the product exists, increase its quantity by 1
            $cart[$product_id]++;
        } else {
            // If the product doesn't exist, add it to the cart with quantity 1
            $cart[$product_id] = 1;
        }
    } else {
        // If the 'cart' cookie is not set, create a new cart with the current product
        $cart = [$product_id => 1];
    }

    // Encode the updated cart as JSON and set it as a cookie
    $cart_json = json_encode($cart);
    setcookie('cart', $cart_json, time() + (86400 * 30), "/"); // Cookie lasts for 30 days
}

// Redirect back to the previous page (products.php)
header("Location: " . $_SERVER['HTTP_REFERER']);
exit();
