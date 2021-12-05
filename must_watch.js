if (sessionStorage) {
	let userdetails = JSON.parse(sessionStorage.getItem("loggedinuser"));
	// console.log(userdetails);

	if (!userdetails) {
		window.location.replace("./index.html");
	}
}

let homebtn = document.querySelector(".homebutton");
homebtn.addEventListener("click", () => {
	window.location.replace("./home.html");
});
function removeAllChildNodes(parent) {
	while (parent.firstChild) parent.removeChild(parent.firstChild);
}
const displaymovies = (data) => {
	let main = document.querySelector("main");
	removeAllChildNodes(main);
	for (const movie of data) {
		let container = document.createElement("div");
		container.className = "moviecontainer";
		let imgcontainer = document.createElement("div");
		imgcontainer.className = "imgcontain";
		let img = document.createElement("img");
		img.src = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
		imgcontainer.appendChild(img);
		container.appendChild(imgcontainer);
		let details = document.createElement("div");
		details.className = "details";
		let title = document.createElement("h1");
		title.innerHTML = movie.original_title;
		let overview = document.createElement("p");
		overview.innerHTML = movie.overview;
		details.appendChild(title);
		details.appendChild(overview);
		container.appendChild(details);
		main.appendChild(container);
	}
};

// moviecount
let params = JSON.stringify({
	path: "MUSTWATCHCOUNT",
	usernum: Number(JSON.parse(sessionStorage.getItem("loggedinuser")).number),
	status: "MW",
});
let formData1 = new FormData();
formData1.append("parameters", params);
fetch("database.php", {
	method: "POST",
	body: formData1,
})
	.then((res) => res.text())
	.then((data) => {
		// console.log(
		// 	Number(JSON.parse(sessionStorage.getItem("loggedinuser")).number)
		// );
		let mwnum = document.querySelector(".mwnum");
		mwnum.innerHTML = data;
		// console.log(data);
		pagination(data);
	});

// // movies
// let parameters = JSON.stringify({
// 	path: "MUSTWATCH",
// 	usernum: Number(JSON.parse(sessionStorage.getItem("loggedinuser")).number),
// 	status: "MW",
// });
// let formData = new FormData();
// formData.append("parameters", parameters);
// fetch("database.php", {
// 	method: "POST",
// 	body: formData,
// })
// 	.then((res) => res.json())
// 	.then((data) => {
// 		// console.log(
// 		// 	Number(JSON.parse(sessionStorage.getItem("loggedinuser")).number)
// 		// );

// 		console.log(data);
// 		displaymovies(data);
// 	});

const pagination = (count) => {
	// Pagination
	let pagination = document.querySelector(".pagination");
	function Paging(page) {
		// movies
		let nummovies = 6;
		let parameters = JSON.stringify({
			path: "MUSTWATCH",
			usernum: Number(
				JSON.parse(sessionStorage.getItem("loggedinuser")).number
			),
			status: "MW",
			offset: (page - 1) * nummovies,
		});
		let formData = new FormData();
		formData.append("parameters", parameters);
		fetch("database.php", {
			method: "POST",
			body: formData,
		})
			.then((res) => res.json())
			.then((data) => {
				// console.log(
				// 	Number(JSON.parse(sessionStorage.getItem("loggedinuser")).number)
				// );

				// console.log(data);
				displaymovies(data);
			});
		removeAllChildNodes(pagination);
		// let start = 0;

		let top = Math.ceil(count / nummovies);
		let end = 10;

		let currentPage = page, // input
			range = count / nummovies + 1 < 11 ? count / nummovies + 1 : 11, // amount of links displayed
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
