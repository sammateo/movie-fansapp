// let userData = [];
let signinbtn = document.querySelector(".signinbtn");
// fetch("users.php")
// 	.then((data) => data.json())
// 	.then((data) => {
// 		userData = data;
// 		console.log(userData);
// 		// console.log(data[0]);
// 	});

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
// csvideo
// $2y$10$QAreGFb47Q.KDIztXM8uiOq0Ws1RUuoPXgJIjIkLw.dLRZft//3ma
const validateSignin = () => {
	console.log("hello");
	let signusername = document.querySelector("#signusername").value;
	let signpassword = document.querySelector("#signpassword").value;
	// let found = 0;
	// let loggedinuser = {};
	// for (const user of userData) {
	// 	if (user.username == signusername && user.password == signpassword) {
	// 		found = 1;
	// 		loggedinuser.number = user.number;
	// 		loggedinuser.name = user.name;
	// 		loggedinuser.username = user.username;
	// 		if (sessionStorage) {
	// 			sessionStorage.setItem("loggedinuser", JSON.stringify(loggedinuser));
	// 			// console.log(JSON.parse(sessionStorage.getItem("movies")));
	// 		}
	// 		// window.location.replace("./home.html");
	// 	}
	// }

	let params = JSON.stringify({
		path: "USERSIGNIN",
		username: signusername,
		password: signpassword,
	});
	let formData1 = new FormData();
	formData1.append("parameters", params);
	fetch("database.php", {
		method: "POST",
		body: formData1,
	})
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
			if (data) {
				if (sessionStorage) {
					sessionStorage.setItem("loggedinuser", JSON.stringify(data[0]));
				}
				let status = document.querySelector(".status");
				status.style.display = "none";
				window.location.replace("./home.html");
			}
		})
		.catch((err) => {
			let status = document.querySelector(".status");
			status.style.display = "grid";
		});
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

// Registration
let orange = "#e44d26";
let grey = "rgb(73, 71, 72)";
let usernamecheck = false;
let regstatus = document.querySelector(".regstatus");
// username
let reg_username = document.getElementById("registerusername");
reg_username.addEventListener("focusout", () => {
	if (reg_username.value == "") {
		reg_username.style.backgroundColor = orange;
		regstatus.style.display = "block";
		regstatus.innerHTML = "username can't be empty!";
		usernamecheck = false;
		return;
	}
	let params = JSON.stringify({
		path: "USERNAMECHECK",
		username: reg_username.value,
	});
	let formData1 = new FormData();
	formData1.append("parameters", params);
	fetch("database.php", {
		method: "POST",
		body: formData1,
	})
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
			if (data != 0) {
				reg_username.style.backgroundColor = orange;
				regstatus.style.display = "block";
				regstatus.innerHTML = "This username has been used already!";
				usernamecheck = false;
			} else {
				regstatus.innerHTML = "";
				regstatus.style.display = "none";
				reg_username.style.backgroundColor = grey;
				usernamecheck = true;
			}
		})
		.catch((err) => {
			console.log(err);
		});
});

// fullname
let fnamecheck = false;
let fullname = document.querySelector("#registerfullname");
fullname.addEventListener("focusout", () => {
	if (fullname.value == "") {
		fullname.style.backgroundColor = orange;
		regstatus.style.display = "block";
		regstatus.innerHTML = "Full Name can't be empty!";
		fnamecheck = false;
		return;
	} else {
		regstatus.innerHTML = "";
		regstatus.style.display = "none";
		fullname.style.backgroundColor = grey;
		fnamecheck = true;
	}
});
// password validation

const checkSpecial = (c) => {
	let specialChars = "<>@!#$%^&*()_+[]{}?:;|'\"\\,./~`-=";
	for (const s of specialChars) {
		if (c === s) {
			// console.log("Is special character");
			return true;
		}
	}
	return false;
};

const checkUpperCase = (word) => {
	for (const w of word) {
		if (w == w.toUpperCase() && !checkNumber(w) && !checkSpecial(w)) {
			// console.log("Has uppercase");
			return true;
		}
	}
	// [...word].forEach((w) => {
	// 	if (w == w.toUpperCase() && !checkNumber(w)) {
	// 		console.log("Has uppercase");
	// 		return true;
	// 	}
	// });
	return false;
};

const checkNumber = (word) => {
	for (const w of word) {
		if (!isNaN(w)) {
			// console.log(isNaN(w));
			return true;
		}
	}
	return false;
};
let regpassword = document.querySelector("#registerpassword");
let passwordcheck = false;
regpassword.addEventListener("focusout", () => {
	if (regpassword.value.length < 1) {
		regpassword.style.backgroundColor = orange;
		regstatus.style.display = "block";
		regstatus.innerHTML = "Password can't be empty!";
		passwordcheck = false;
		return;
	} else if (
		regpassword.value.length < 5 ||
		regpassword.value.length > 12 ||
		!checkUpperCase(regpassword.value) ||
		!checkNumber(regpassword.value)
	) {
		regpassword.style.backgroundColor = orange;
		regstatus.style.display = "block";
		regstatus.innerHTML =
			"Password must be > 5 and < 12 characters with a number and an uppercase letter!";
		passwordcheck = false;
	} else {
		regpassword.style.backgroundColor = grey;
		regstatus.style.display = "none";
		regstatus.innerHTML = "";
		passwordcheck = true;
	}
});
