<?php
   // You can get your webhook endpoint from your Slack settings

require_once('lib/Stripe.php'); 
Stripe::setApiKey("sk_test_4ScS1JhfEBAMD47lROwZcxXN");

$input = @file_get_contents("php://input");
$message = json_decode($input);
var_dump(input);

      $ch = curl_init();
      $url = "https://myestate.slack.com/services/hooks/slackbot?token=3YzHDutHK2ux69X0mDuZDbSa&channel=%23system-message";

      $breaks = array("<br />","<br>","<br/>");  
      $message = str_ireplace($breaks, "\r\n", $message); 
      $message = '```'.$message.'```';

      curl_setopt($ch, CURLOPT_URL,$url);
      curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
      curl_setopt($ch, CURLOPT_POSTFIELDS, $message);
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
      curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
      curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
      $result = curl_exec($ch);

/**
      if(curl_errno($ch)){
        echo 'error:' . curl_error($ch);
      }
      **/
      curl_close($ch);       
      // var_dump($result);

http_response_code(200);

 ?>