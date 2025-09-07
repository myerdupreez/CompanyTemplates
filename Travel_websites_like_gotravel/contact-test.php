<?php
// Simple test version for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Enable CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Test if script runs
echo json_encode(['test' => 'PHP script is working', 'method' => $_SERVER['REQUEST_METHOD']]);

// Only process POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Get JSON input
$input = json_decode(file_get_contents('php://input'), true);

// Log what we received
error_log('Contact form data: ' . print_r($input, true));

// Validate input
if (!$input || !isset($input['name']) || !isset($input['email']) || !isset($input['message'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields', 'received' => $input]);
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

// Try to send email with error handling
try {
    $to = 'dupreezmyer@gmail.com';
    $subject = 'New Contact Form Submission from ' . $name;
    $headers = array(
        'From: info@gotravelcapetown.com',
        'Reply-To: ' . $email,
        'Content-Type: text/plain; charset=UTF-8',
        'X-Mailer: PHP/' . phpversion()
    );

    $body = "Name: $name\n";
    $body .= "Email: $email\n";
    $body .= "Message:\n$message\n";

    // Test if mail function exists
    if (!function_exists('mail')) {
        echo json_encode(['error' => 'Mail function not available on this server']);
        exit;
    }

    $mail_sent = mail($to, $subject, $body, implode("\r\n", $headers));
    
    if ($mail_sent) {
        echo json_encode(['success' => true, 'message' => 'Email sent successfully']);
    } else {
        echo json_encode(['error' => 'Failed to send email - mail() returned false']);
    }
    
} catch (Exception $e) {
    echo json_encode(['error' => 'Exception: ' . $e->getMessage()]);
}
?>
