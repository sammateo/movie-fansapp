<?php 
		$parameters = $_REQUEST['parameters'];
        $decodedparameters = json_decode($parameters, true);
        $path = isset($decodedparameters['path']) ? $decodedparameters['path'] :"";
			 $conn = mysqli_connect("localhost","root","","comp2245");
		   	if(!$conn) {
		       	die("Connection failed" . mysqli_connect_error());
		  		}
            
                  

            if($path == "GETMOVIES"){
                $offset = isset($decodedparameters['offset']) ? $decodedparameters['offset'] :1;
                $sql = "SELECT * FROM movies LIMIT 20 OFFSET $offset";
                $result = mysqli_query($conn,$sql);
                $numrecs = mysqli_num_rows($result);
                $movs = array();
                if (mysqli_num_rows($result) > 0){
                    while($row = mysqli_fetch_assoc($result)){
                        array_push($movs,$row);   
                    }
                echo (json_encode($movs));
                }
            }

            if($path == "MOVIECOUNT"){
                 $sql = "SELECT COUNT(*) FROM movies";
                $result = mysqli_query($conn,$sql);
                // $movs = array();
                $row = mysqli_fetch_assoc($result); 
                echo $row['COUNT(*)'];  
                // print_r (json_encode($row));
            }

        if($path == "SEARCHCOUNT"){
            $searchkey = isset($decodedparameters['key']) ? $decodedparameters['key'] :"";
                 $sql = "SELECT COUNT(*) FROM movies WHERE original_title LIKE '%$searchkey%'";
                $result = mysqli_query($conn,$sql);
                // $movs = array();
                $row = mysqli_fetch_assoc($result); 
                echo $row['COUNT(*)'];  
                // print_r (json_encode($row));
            }

            if($path == "SEARCHMOVIES"){
                 $searchquery = isset($decodedparameters['query']) ? $decodedparameters['query'] :"";
                $offset = isset($decodedparameters['offset']) ? $decodedparameters['offset'] :1;

                $sql = "SELECT * FROM movies WHERE original_title LIKE '%$searchquery%' LIMIT 20 OFFSET $offset";
                $result = mysqli_query($conn,$sql);
                $numrecs = mysqli_num_rows($result);
                $movs = array();
                if (mysqli_num_rows($result) > 0){
                    while($row = mysqli_fetch_assoc($result)){
                        array_push($movs,$row);   
                    }
                echo (json_encode($movs));
                }
            }

            if($path == "ADDMUSTWATCH"){
                $usernum = isset($decodedparameters['usernum']) ? $decodedparameters['usernum'] :"";
                $movienum = isset($decodedparameters['movienum']) ? $decodedparameters['movienum'] :"";
                $status = isset($decodedparameters['status']) ? $decodedparameters['status'] :"";
                $ppath = isset($decodedparameters['ppath']) ? $decodedparameters['ppath'] :"";
                $ogtitle= isset($decodedparameters['ogtitle']) ? $decodedparameters['ogtitle'] :"";
                $overview = isset($decodedparameters['overview']) ? $decodedparameters['overview'] :"";
                $sql = "INSERT INTO user_status (user_number,movie_number,status,poster_path,original_title,overview) VALUES ('$usernum','$movienum','$status','$ppath','$ogtitle','$overview') ";
                // $result = mysqli_query($conn,$sql);
               if($conn->query($sql) === TRUE){
                    echo "New Record Created";
                }
                else{
                    echo "Error ". $sql . "<br>".$conn->error;
                }
            }
		    
            if($path == "MUSTWATCH"){
                $usernum = isset($decodedparameters['usernum']) ? $decodedparameters['usernum'] :"";
                $status = isset($decodedparameters['status']) ? $decodedparameters['status'] :"";
                $offset = isset($decodedparameters['offset']) ? $decodedparameters['offset'] :1;

                $sql = "SELECT * FROM user_status WHERE (user_number,status) = ('$usernum','$status') LIMIT 20 OFFSET $offset";
                $result = mysqli_query($conn,$sql);
                $numrecs = mysqli_num_rows($result);
                $movs = array();
                if (mysqli_num_rows($result) > 0){
                    while($row = mysqli_fetch_assoc($result)){
                        array_push($movs,$row);   
                    }
                echo (json_encode($movs));
                }
            }

             if($path == "MUSTWATCHCOUNT"){
                $usernum = isset($decodedparameters['usernum']) ? $decodedparameters['usernum'] :"";
                $status = isset($decodedparameters['status']) ? $decodedparameters['status'] :"";
                $sql = "SELECT COUNT(*) FROM user_status WHERE (user_number,status) = ('$usernum','$status') ";
                $result = mysqli_query($conn,$sql);
                // $numrecs = mysqli_num_rows($result);
                // $movs = array();
                // if (mysqli_num_rows($result) > 0){
                //     while($row = mysqli_fetch_assoc($result)){
                //         array_push($movs,$row);   
                //     }
                 $row = mysqli_fetch_assoc($result); 
                echo $row['COUNT(*)'];  
                // }
            }
        mysqli_close($conn);
		?>