<?php
// Spacemail SMTP Contact Form
// Uses Spaceship's built-in email service

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// Include PHPMailer files
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

    // Spacemail SMTP settings from Spaceship
    $mail->isSMTP();
    $mail->Host       = 'mail.spacemail.com';               // Spaceship SMTP server
    $mail->SMTPAuth   = true;
    $mail->Username   = 'info@gotravelcapetown.com';        // Your Spacemail email
    $mail->Password   = 'Testing%$32';                       // Your Spacemail password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;        // SSL encryption
    $mail->Port       = 465;                                // SSL port

    // Recipients
    $mail->setFrom('info@gotravelcapetown.com', 'GoTravel Cape Town');
    $mail->addAddress('info@gotravelcapetown.com', 'GoTravel Cape Town');  // Send to your Spacemail
    $mail->addReplyTo($email, $name);

    // Content
    $mail->isHTML(false);
    $mail->Subject = 'New Contact Form Submission from ' . $name;
    $mail->Body    = "New contact form submission received:\n\n";
    $mail->Body   .= "Name: $name\n";
    $mail->Body   .= "Email: $email\n";
    $mail->Body   .= "Message:\n$message\n";
    $mail->Body   .= "\n---\n";
    $mail->Body   .= "Sent from: gotravelcapetown.com contact form\n";
    $mail->Body   .= "Date: " . date('Y-m-d H:i:s') . "\n";

    $mail->send();
    echo json_encode(['success' => true, 'message' => 'Message sent successfully']);
} catch (Exception $e) {
    error_log('Spacemail Error: ' . $mail->ErrorInfo);
    http_response_code(500);
    echo json_encode(['error' => 'Message could not be sent. Error: ' . $mail->ErrorInfo]);
}
?>
