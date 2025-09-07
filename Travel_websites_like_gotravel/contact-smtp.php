<?php
// Download PHPMailer and place it in a 'vendor' folder
// Or use Composer: composer require phpmailer/phpmailer

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// If using composer autoload
// require 'vendor/autoload.php';

// If manually downloaded, include these files
require_once 'PHPMailer/src/Exception.php';
require_once 'PHPMailer/src/PHPMailer.php';
require_once 'PHPMailer/src/SMTP.php';

// Enable CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Only process POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Get JSON input
$input = json_decode(file_get_contents('php://input'), true);

// Validate input
if (!$input || !isset($input['name']) || !isset($input['email']) || !isset($input['message'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields']);
    exit;
}

$name = trim($input['name']);
$email = trim($input['email']);
$message = trim($input['message']);

// Basic validation
if (empty($name) || empty($email) || empty($message)) {
    http_response_code(400);
    echo json_encode(['error' => 'All fields are required']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid email address']);
    exit;
}

try {
    $mail = new PHPMailer(true);

    // Server settings
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'dupreezmyer@gmail.com';        // Your Gmail address
    $mail->Password   = 'YOUR_APP_PASSWORD_HERE';       // Your Gmail app password (not regular password)
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;    // Enable implicit TLS encryption
    $mail->Port       = 465;                            // TCP port to connect to

    // Recipients
    $mail->setFrom('dupreezmyer@gmail.com', 'GoTravel Cape Town Contact Form');
    $mail->addAddress('dupreezmyer@gmail.com', 'Myer du Preez');
    $mail->addReplyTo($email, $name);

    // Content
    $mail->isHTML(false);
    $mail->Subject = 'New Contact Form Submission from ' . $name;
    $mail->Body    = "Name: $name\n";
    $mail->Body   .= "Email: $email\n";
    $mail->Body   .= "Message:\n$message\n";
    $mail->Body   .= "\n---\n";
    $mail->Body   .= "Sent from: gotravelcapetown.com contact form";

    $mail->send();
    echo json_encode(['success' => true, 'message' => 'Email sent successfully via SMTP']);
} catch (Exception $e) {
    error_log('PHPMailer Error: ' . $mail->ErrorInfo);
    http_response_code(500);
    echo json_encode(['error' => 'Message could not be sent. Mailer Error: ' . $mail->ErrorInfo]);
}
?>
