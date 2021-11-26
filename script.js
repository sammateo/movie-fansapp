let userData = [];
let signinbtn = document.querySelector(".signinbtn");
fetch("users.php")
	.then((data) => data.json())
	.then((data) => {
		userData = data;
		console.log(userData);
		// console.log(data[0]);
	});

// Signin
let signin = document.querySelector(".sign-in");
let signinPop = document.querySelector(".sign-popup");
let signinClose = document.querySelector(".signin-close");
const openSignin = () => {
	// aboutPop.style.display == "block" ? (aboutPop.style.display = "none") : null;
	// mask.style.display = "block";
	signinPop.style.display = "block";
	// console.log("hi");
	signin.style.backgroundColor = "green";
};
const closeSignin = () => {
	signinPop.style.display = "none";
	signin.style.backgroundColor = "rgb(49, 47, 48)";

	// mask.style.display = "none";
};
signin.addEventListener("click", openSignin);
signinClose.addEventListener("click", closeSignin);

// mywife
// $2y$10$DGAqH3u3i7Db3B/vwA5ttuVrQBjUSf9xNSPd/yYAaU3t7NMrt6SMi
const validateSignin = () => {
	console.log("hello");
	let signusername = document.querySelector("#signusername").value;
	let signpassword = document.querySelector("#signpassword").value;
	let found = 0;
	let loggedinuser = {};
	for (const user of userData) {
		if (user.username == signusername && user.password == signpassword) {
			found = 1;
			loggedinuser.number = user.number;
			loggedinuser.name = user.name;
			loggedinuser.username = user.username;
			if (sessionStorage) {
				sessionStorage.setItem("loggedinuser", JSON.stringify(loggedinuser));
				// console.log(JSON.parse(sessionStorage.getItem("movies")));
			}
			window.location.replace("./home.html");
		}
	}
	// found == 1 ? alert("Success!") : alert("Incorrect");
};

signinbtn.addEventListener("click", validateSignin);

// Register
let register = document.querySelector(".register");
let registerpop = document.querySelector(".register-popup");
let registerclose = document.querySelector(".register-close");

const openReg = () => {
	// aboutPop.style.display == "block" ? (aboutPop.style.display = "none") : null;
	// mask.style.display = "block";
	registerpop.style.display = "block";
	// console.log("hi");
	register.style.backgroundColor = "green";
};
const closeReg = () => {
	registerpop.style.display = "none";
	register.style.backgroundColor = "rgb(49, 47, 48)";

	// mask.style.display = "none";
};
register.addEventListener("click", openReg);
registerclose.addEventListener("click", closeReg);
