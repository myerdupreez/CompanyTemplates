<?php
// Simple Spacemail test without PHPMailer
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

// Test basic functionality first
echo json_encode([
    'status' => 'Script is working',
    'method' => $_SERVER['REQUEST_METHOD'],
    'phpmailer_check' => 'Checking if PHPMailer files exist...'
]);

// Check if PHPMailer files exist
$phpmailer_files = [
    'PHPMailer/src/PHPMailer.php',
    'PHPMailer/src/SMTP.php', 
    'PHPMailer/src/Exception.php'
];

$missing_files = [];
foreach ($phpmailer_files as $file) {
    if (!file_exists($file)) {
        $missing_files[] = $file;
    }
}

if (!empty($missing_files)) {
    echo json_encode([
        'error' => 'PHPMailer files missing',
        'missing_files' => $missing_files,
        'current_directory' => getcwd(),
        'files_in_directory' => scandir('.')
    ]);
    exit;
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

// Try to load PHPMailer
try {
    require_once 'PHPMailer/src/Exception.php';
    require_once 'PHPMailer/src/PHPMailer.php';
    require_once 'PHPMailer/src/SMTP.php';
    
    echo json_encode(['success' => 'PHPMailer loaded successfully', 'ready_to_send' => true]);
    
} catch (Exception $e) {
    echo json_encode(['error' => 'Failed to load PHPMailer: ' . $e->getMessage()]);
}
?>
