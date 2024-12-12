<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Include PHPMailer library
require 'phpmailer/Exception.php';
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Collect form data
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $cart = $_POST['cart'];

    // Create email content
    $cartDetails = "";
    foreach ($cart as $item) {
        $cartDetails .= "Product: " . $item['name'] . "\n";
        $cartDetails .= "Quantity: " . $item['quantity'] . "\n";
        $cartDetails .= "Price: $" . $item['price'] . "\n\n";
    }

    $message = "You have received a new order:\n\n";
    $message .= "Email: $email\n";
    $message .= "Phone: $phone\n\n";
    $message .= "Cart Details:\n$cartDetails";

    // Send email using PHPMailer
    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com'; // Replace with your SMTP host
        $mail->SMTPAuth = true;
        $mail->Username = 'rojank631@gmail.com'; // Replace with your email
        $mail->Password = 'xthsfielgmazsxwu'; // Replace with your email password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port = 465;

        // Recipients
        $mail->setFrom('rojank631@gmail.com', 'String Art Shop');
        $mail->addAddress('krojan321@gmail.com', 'Shop Owner'); // Your receiving email

        // Content
        $mail->isHTML(false);
        $mail->Subject = 'New Order Received';
        $mail->Body = $message;

        $mail->send();
        echo "Order sent successfully!";
    } catch (Exception $e) {
        echo "Order could not be sent. Error: {$mail->ErrorInfo}";
    }
} else {
    echo "Invalid request.";
}
?>
