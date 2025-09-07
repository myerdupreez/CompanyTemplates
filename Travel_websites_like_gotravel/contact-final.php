<?php
// Spacemail contact form using built-in PHP mail function
// No external libraries needed

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

// Email configuration
$to = 'info@gotravelcapetown.com';
$subject = 'New Contact Form Submission from ' . $name;

// Email headers - Spaceship recommended format for Spacemail
$headers = "From: info@gotravelcapetown.com\r\n";
$headers .= "Reply-To: " . $email . "\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";

// Email body - HTML format as recommended by Spaceship
$body = "<html><body>";
$body .= "<h2>New Contact Form Submission</h2>";
$body .= "<p><strong>Name:</strong> " . htmlspecialchars($name) . "</p>";
$body .= "<p><strong>Email:</strong> " . htmlspecialchars($email) . "</p>";
$body .= "<p><strong>Message:</strong></p>";
$body .= "<p>" . nl2br(htmlspecialchars($message)) . "</p>";
$body .= "<hr>";
$body .= "<p><small>Sent from: gotravelcapetown.com contact form<br>";
$body .= "Date: " . date('Y-m-d H:i:s T') . "<br>";
$body .= "IP Address: " . $_SERVER['REMOTE_ADDR'] . "</small></p>";
$body .= "</body></html>";

// Send email
$mail_sent = mail($to, $subject, $body, $headers);

if ($mail_sent) {
    echo json_encode([
        'success' => true, 
        'message' => 'Thank you! Your message has been sent successfully.'
    ]);
} else {
    error_log('Mail function failed - check server mail configuration');
    http_response_code(500);
    echo json_encode([
        'error' => 'Failed to send message. Please try again or contact us directly.',
        'debug' => 'Mail function returned false'
    ]);
}
?>
