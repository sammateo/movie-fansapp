// Menu
let burger = document.querySelector(".burger");
let menu = document.querySelector(".menu");
const openMenu = () => {
	menu.style.display = "block";
	burger.style.display = "none";
};
const closeMenu = (e) => {
	// console.log(e.target.className);
	if (e.target.className != "fa fa-bars burger" && window.innerWidth < 1024) {
		menu.style.display = "none";
		burger.style.display = "block";
	}
};
burger.addEventListener("click", openMenu);
document.querySelector("body").addEventListener("click", closeMenu);
window.onresize = () => {
	if (window.innerWidth >= 1024) {
		menu.style.display = "block";
	} else {
		menu.style.display = "none";
		burger.style.display = "block";
	}
	// window.innerWidth >= 1024
	// 	? (menu.style.display = "block")
	// 	: (menu.style.display = "none");
};
//Mask
let mask = document.querySelector(".mask");

// Search
let search = document.querySelector(".search");
let searchPop = document.querySelector(".search-popup");
let searchClose = document.querySelector(".search-close");
const openSearch = () => {
	aboutPop.style.display == "block" ? (aboutPop.style.display = "none") : null;
	mask.style.display = "block";
	searchPop.style.display = "block";
};
const closeSearch = () => {
	searchPop.style.display = "none";

	mask.style.display = "none";
};
search.addEventListener("click", openSearch);
searchClose.addEventListener("click", closeSearch);

// About
let about = document.querySelector(".about");
let aboutPop = document.querySelector(".about-popup");
let aboutClose = document.querySelector(".about-close");
const openAbout = () => {
	searchPop.style.display == "block"
		? (searchPop.style.display = "none")
		: null;
	mask.style.display = "block";
	aboutPop.style.display = "block";
};
const closeAbout = () => {
	aboutPop.style.display = "none";
	mask.style.display = "none";
};
about.addEventListener("click", openAbout);
aboutClose.addEventListener("click", closeAbout);

// Get Movie from PHP
let newmovies = [];
let movieData = [];
let pageTracker = 1;
const movieCount = () => {
	let parameters = JSON.stringify({
		path: "MOVIECOUNT",
	});
	let formData = new FormData();
	formData.append("parameters", parameters);
	fetch("database.php", {
		method: "POST",
		body: formData,
	})
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
			let count = data;
			pagination(count);
		});
};
movieCount();

// fetch("movies.php")
// 	.then((data) => data.json())
// 	.then((data) => {
// 		movieData = data;
// 		console.log(movieData);
// 		// displaymovies(pageTracker);
// 		pagination();
// 		// moviepop();
// 	});

function removeAllChildNodes(parent) {
	while (parent.firstChild) parent.removeChild(parent.firstChild);
}
const displaymovies = (movies) => {
	let main = document.querySelector("main");
	removeAllChildNodes(main);
	// Posters
	for (const movie of movies) {
		// if (i < pageTracker * 20 && i > (pageTracker - 1) * 20 - 1) {
		let poster = document.createElement("img");
		poster.className = "looney-tunes";
		poster.id = movie.id;
		poster.src = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
		poster.addEventListener("click", openMovie);
		main.appendChild(poster);
		// }
	}
};

// const moviepop = () => {
//Movie Popups
// let movies = document.querySelectorAll("main img");
const openMovie = (e) => {
	let imdbid = document.querySelector(".imdbid");
	let title = document.querySelector(".title");
	let year = document.querySelector(".year-release");
	let runtime = document.querySelector(".runtime");
	let genre = document.querySelector(".genres");
	let overview = document.querySelector(".overview");
	let popimg = document.querySelector(".popimg");
	let prefix = e.target.className;
	let choice = "." + prefix + "-popup";
	choice = ".movie-popup";

	let mov;
	let movies;
	if (sessionStorage) {
		movies = JSON.parse(sessionStorage.getItem("movies"));
		// console.log(movies);
	}
	for (const m of movies) {
		if (m.id == e.target.id) {
			document.querySelector(choice).id = m.id;
			console.log(document.querySelector(choice).id);
			mov = m;
		}
	}

	// console.log(mov);
	imdbid.innerHTML = "IMBD ID: " + mov.imdb_id;
	title.innerHTML = "TITLE: " + mov.original_title;
	year.innerHTML = "YEAR RELEASE: " + mov.release_date;
	runtime.innerHTML = "RUNTIME: " + mov.runtime;
	genre.innerHTML = "GENRE: " + mov.genres;
	overview.innerHTML = "OVERVIEW: " + mov.overview;
	popimg.src = "https://image.tmdb.org/t/p/w500" + mov.poster_path;
	document.querySelector(choice).style.display = "block";
	mask.style.display = "block";
	// console.log(document.querySelector(choice));

	const closeMovie = (e) => {
		document.querySelector(choice).style.display = "none";
		mask.style.display = "none";
	};

	let movieClose = document.querySelector("." + prefix + "-close");
	movieClose.addEventListener("click", closeMovie);
};

// for (const movie of movies) {
// 	movie.addEventListener("click", openMovie);
// }
// };

const getMovies = (page) => {
	let parameters = JSON.stringify({
		path: "GETMOVIES",
		offset: (page - 1) * 20,
	});
	let formData = new FormData();
	formData.append("parameters", parameters);
	fetch("database.php", {
		method: "POST",
		body: formData,
	})
		.then((res) => res.json())
		.then((data) => {
			// displaymovies(data);
			if (sessionStorage) {
				sessionStorage.setItem("movies", JSON.stringify(data));
				// console.log(JSON.parse(sessionStorage.getItem("movies")));
			}
			console.log(data);
		});
};

const pagination = (count) => {
	// Pagination
	let pagination = document.querySelector(".pagination");
	// function removeAllChildNodes(parent) {
	// 	while (parent.firstChild) parent.removeChild(parent.firstChild);
	// }
	function Paging(page) {
		let parameters = JSON.stringify({
			path: "GETMOVIES",
			offset: (page - 1) * 20,
		});
		let formData = new FormData();
		formData.append("parameters", parameters);
		fetch("database.php", {
			method: "POST",
			body: formData,
		})
			.then((res) => res.json())
			.then((data) => {
				displaymovies(data);
				if (sessionStorage) {
					sessionStorage.setItem("movies", JSON.stringify(data));
					// console.log(JSON.parse(sessionStorage.getItem("movies")));
				}
				console.log(data);
			});
		// displaymovies(page);

		// getMovies(page);
		// let moviedata = JSON.parse(sessionStorage.getItem("movies"));
		// displaymovies(moviedata);
		removeAllChildNodes(pagination);
		// let start = 0;
		let top = Math.ceil(count / 20);
		let end = 10;

		let currentPage = page, // input
			range = 11, // amount of links displayed
			totalPages = top, // determined by amount of items, hardcoded for readability
			start = 0; // default

		// Don't use negative values, force start at 1
		if (currentPage < range / 2 + 1) {
			start = 0;

			// Don't go beyond the last page
		} else if (currentPage >= totalPages - range / 2) {
			start = Math.floor(totalPages - range + 1);
		} else {
			start = currentPage - Math.floor(range / 2);
		}

		end = start + range - 1;
		for (let i = start; i < end; i++) {
			let pg = document.createElement("div");
			pg.className = "page_item";
			let num = document.createTextNode(i + 1);
			pg.appendChild(num);
			if (i + 1 == page) {
				pg.classList.add("active");
			}
			pg.addEventListener("click", (e) => {
				pageTracker = Number(e.target.innerHTML);
				Paging(pageTracker);
			});

			pagination.appendChild(pg);
		}
	}
	Paging(1);
};

// Loggedin user

let usersname = document.querySelector("#loggedusername");

if (sessionStorage) {
	let userdetails = JSON.parse(sessionStorage.getItem("loggedinuser"));
	console.log(userdetails);

	if (userdetails) {
		usersname.innerHTML = userdetails.name;
	} else if (!userdetails) {
		window.location.replace("./index.html");
	}
}

// Search movies number

let searchin = document.querySelector(".search-input");
let numrecs = document.querySelector(".recordsfound");
searchin.addEventListener("keyup", (e) => {
	if (searchin.value == "") {
		numrecs.innerHTML = "No records found";
		return;
	}
	let parameters = JSON.stringify({
		path: "SEARCHCOUNT",
		key: searchin.value,
	});
	let formData = new FormData();
	formData.append("parameters", parameters);
	fetch("database.php", {
		method: "POST",
		body: formData,
	})
		.then((res) => res.json())
		.then((data) => {
			if (sessionStorage) {
				sessionStorage.setItem("moviecount", data);
			}
			numrecs.innerHTML = data + " records found";
		});
});

// Get Search Results

let searchbtn = document.querySelector(".search-btn");
searchbtn.addEventListener("click", () => {
	if (searchin.value == "") {
		numrecs.innerHTML = "No records found";
		return;
	}
	// let parameters = JSON.stringify({
	// 	path: "SEARCHMOVIES",
	// 	query: searchin.value,
	// });
	// let formData = new FormData();
	// formData.append("parameters", parameters);
	// fetch("database.php", {
	// 	method: "POST",
	// 	body: formData,
	// })
	// 	.then((res) => res.json())
	// 	.then((data) => {
	// 		console.log(data);
	let moviecount = 0;
	if (sessionStorage) {
		moviecount = JSON.parse(sessionStorage.getItem("moviecount"));
		// sessionStorage.setItem("movies", JSON.stringify(data));
	}
	searchpagination(moviecount);
	// displaymovies(data);
	closeSearch();
	// });
});

const searchpagination = (count) => {
	// Pagination
	let pagination = document.querySelector(".pagination");
	function Paging(page) {
		let parameters = JSON.stringify({
			path: "SEARCHMOVIES",
			query: searchin.value,
			offset: (page - 1) * 20,
		});
		let formData = new FormData();
		formData.append("parameters", parameters);
		fetch("database.php", {
			method: "POST",
			body: formData,
		})
			.then((res) => res.json())
			.then((data) => {
				displaymovies(data);
				if (sessionStorage) {
					sessionStorage.setItem("movies", JSON.stringify(data));
					// console.log(JSON.parse(sessionStorage.getItem("movies")));
				}
				console.log(data);
			});
		removeAllChildNodes(pagination);
		// let start = 0;
		let top = Math.ceil(count / 20);
		let end = 10;

		let currentPage = page, // input
			range = count / 20 + 1 < 11 ? count / 20 + 1 : 11, // amount of links displayed
			totalPages = top, // determined by amount of items, hardcoded for readability
			start = 0; // default

		// Don't use negative values, force start at 1
		if (currentPage < range / 2 + 1) {
			start = 0;

			// Don't go beyond the last page
		} else if (currentPage >= totalPages - range / 2) {
			start = Math.floor(totalPages - range + 1);
		} else {
			start = currentPage - Math.floor(range / 2);
		}

		end = start + range - 1;
		for (let i = start; i < end; i++) {
			let pg = document.createElement("div");
			pg.className = "page_item";
			let num = document.createTextNode(i + 1);
			pg.appendChild(num);
			if (i + 1 == page) {
				pg.classList.add("active");
			}
			pg.addEventListener("click", (e) => {
				pageTracker = Number(e.target.innerHTML);
				Paging(pageTracker);
			});

			pagination.appendChild(pg);
		}
	}
	Paging(1);
};

// addtomustwatchlist
let btn_mw = document.querySelector(".btn-mw");
let btn_aw = document.querySelector(".btn-aw");

btn_mw.addEventListener("click", (e) => {
	let selectedid = e.target.parentNode.parentNode.parentNode.id;
	let mwmovie;
	console.log(selectedid);
	let movies = JSON.parse(sessionStorage.getItem("movies"));
	movies.forEach((m) => {
		if (m.id == selectedid) {
			mwmovie = m;
		}
	});
	console.log(mwmovie);
	// console.log(mwmovie.overview.replace(/'/g, '""'));
	let parameters = JSON.stringify({
		path: "ADDMUSTWATCH",
		usernum: Number(JSON.parse(sessionStorage.getItem("loggedinuser")).number),
		movienum: Number(mwmovie.number),
		status: "MW",
		ppath: mwmovie.poster_path,
		ogtitle: mwmovie.original_title.replace(/'/g, "\\'"),
		overview: mwmovie.overview.replace(/'/g, "\\'"),
	});
	let formData = new FormData();
	formData.append("parameters", parameters);
	fetch("database.php", {
		method: "POST",
		body: formData,
	})
		.then((res) => res.text())
		.then((data) => {
			console.log(data);
			let status = document.querySelector(".status");
			status.innerHTML = "Must Watch list is updated";
			status.style.display = "block";
		});
});

// Routing
let mwlink = document.querySelector(".mwlink");

mwlink.addEventListener("click", () => {
	window.location.replace("./must_watch.html");
});

// status lists

let status = document.querySelector(".status");
