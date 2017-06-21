<?php
/**
Save subscriber email to a txt file
 */
$saveTxt   = true;
if(!empty($_POST)){
	$email = trim($_POST['email']);
	if (get_magic_quotes_gpc()){
		$email = stripslashes($email);
	}	
	$regexp = "/^[_a-zA-Z0-9-]+([\.+][_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,6})$/";
	if (preg_match($regexp, $email)){		
		echo json_encode(array('error' => false));
		if($saveTxt){		
			$file      = "users-mail.txt";
			$delimiter = "\r\n";        		
			if(file_exists($file)){
				file_put_contents($file,$email.$delimiter,FILE_APPEND);
			}else{
				file_put_contents($file,$email.$delimiter);
			}
		}	
	}else{		
		echo json_encode(array('error' => true));		
		exit;
	}
}
?>