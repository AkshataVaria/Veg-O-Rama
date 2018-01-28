
<?php
$confirmation=" "; 
 if ($_SERVER['REQUEST_METHOD'] == 'POST'){
$email = $_POST["senderEmail"];
$to = "contact@veg-o-rama.com";
$subject = "New Feedback";
$headers = "From: $email\n";
$message = $_POST["message"];
$confirmation = " Thank you for reaching out. Someone will be in touch with you soon!";



mail($to,$subject,$message,$headers);


}


?>

<!DOCTYPE html>
<!-- -->
<head>
	<title>Contact - Veg-O-Rama</title>
	<meta charset="utf-8">
	<link href="css/style.css" rel="stylesheet" type="text/css">
</head>
<body>
<div id = "blue-third">
	<div id="header">
		<div>
					<a href="index.html"><img  src="images/logo.png" id ="logo" width="400" height="200" alt="" title=""></a>
			<ul class="navigation">
				<li>
					<a href="index.html">Home</a>
				</li>
				<li>
					<a href="about.html">About</a>
				</li>
				<li>
					<a href="burger.html">Menu</a>
				</li>
				<li>
					<a class="active" href="contact.html">Contact</a>
				</li>
			
			</ul>
		</div>
	</div>
	
	<div id="body">
	
		<div class="content">
		<h1> <? echo $confirmation ?></h1>
			<div>
				<div>
					<h1>Contact</h1>
					<p>

					</p>
					<h4>Comments and Suggestions? Just fill in the form below.</h4>
					<form action="contact.php" method = "POST">
						<label for="name"> <span class="text">Your Name:</span>
							<input type="text" name="sender" id="name">
						</label>
						<label for="email"> <span>Your E-mail:</span>
							<input type="text" name="senderEmail" id="email">
						</label>
						<label for="subject"> <span>Subject:</span>
							<input type="text" name="subject" id="subject">
						</label>
						<label for="message"> <span>Your Message:</span>
							<textarea name="message" id="message"></textarea>
						</label>
						<input type="submit" value="">
					</form>
				</div>
			</div>
		</div>
		<div class="sidebar">
			<h1>Open Monday Through Saturday</h1>
			<span>including holidays</span> <span>from 8AM until 8PM</span>
			<h1>Address</h1>
			<span>Veg-O-Rama Restaurant</span> <span>2281 Cross Street</span> <span>Ypsilanti, MI, 48197</span>
			<h1>Phone Number</h1>
			<span>(734) 544-9707</span>
			<a href="menu.pdf" download class="download">&nbsp;</a> </div>
	</div>
	<div id="footer">
		<div>
			<ul>
				<li class="first">
					
					<ul>
						<li>
							<a class="facebook"></a>
						</li>
						<li>
							<a  class="twitter"></a>
						</li>
						<li>
							<a class="googleplus"></a>
						</li>
					</ul>
				</li>
				<li>
					<a href="index.html"><img class="logo" src="images/logo-footer.png" alt=""></a>
					<ul class="navigation">
						<li>
							<a href="index.html">Home</a>
						</li>
						<li>
							<a href="about.html">About Us</a>
						</li>
						<li>
							<a href="menu.html">Menu</a>
						</li>
						<li>
							<a href="contact.html">Contact Us</a>
						</li>
					</ul>
					<span></span>
				</li>
			
			</ul>
		</div>
	</div>
	</div>
</body>
</html>