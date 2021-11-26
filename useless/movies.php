<?php 
		
			 $conn = mysqli_connect("localhost","root","","comp2245");
		   	if(!$conn) {
		       	die("Connection failed" . mysqli_connect_error());
		  		}
		    $sql = "SELECT * FROM movies";
		   	$result = mysqli_query($conn,$sql);
			 $numrecs = mysqli_num_rows($result);
			 $movs = array();
			 if (mysqli_num_rows($result) > 0){
		       while($row = mysqli_fetch_assoc($result)){
				array_push($movs,$row);
				
			}
            echo (json_encode($movs));
		}
        mysqli_close($conn);
		?>