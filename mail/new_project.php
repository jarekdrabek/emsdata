<?php
// Check for empty fields
if (empty($_POST['projectName']) ||
    empty($_POST['name']) ||
    empty($_POST['email']) ||
    empty($_POST['phone']) ||
    empty($_POST['useCase']) ||
    !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)
) {
    echo "No arguments Provided!";
    return false;
}

$name = $_POST['name'];
$projectName = $_POST['projectName'];
$email_address = $_POST['email'];
$phone = $_POST['phone'];
$useCase = $_POST['useCase'];

// Create the email and send the message
$to = 'landowskitomasz@gmail.com'; // Add your email address inbetween the '' replacing yourname@yourdomain.com - This is where the form will send a message to.
$email_subject = "New project request:  $name";
$email_body = "You have received a new project request.\n\n" . "Here are the details:\n\nProject name: $projectName\n\nName: $name\n\nEmail: $email_address\n\nPhone: $phone\n\nUse case:\n$useCase";
$headers = "From: noreply@getdatadriven.io\n"; // This is the email address the generated message will be from. We recommend using something like noreply@yourdomain.com.
$headers .= "Reply-To: $email_address";
mail($to, $email_subject, $email_body, $headers);
return true;
?>