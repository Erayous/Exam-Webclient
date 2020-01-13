import {backend_url} from "./settings.js"



function handleHttpErrors(res) {
	if (!res.ok) {
		return window.M.toast({html: "Serveren returnerede fejlkode: " + res.status}) //Promise.reject({status: res.status, fullError: res.json()}) 
	}
	//window.M.toast({html: "Serveren returnerede: " + res.status})
	return res.json();
}

function apiFacade() {
	const setToken = (token) => {
		localStorage.setItem('jwtToken', token)
	}
	const getToken = () => {
		return localStorage.getItem('jwtToken')
	}
	const loggedIn = () => {
		const loggedIn = getToken() != null;
		return loggedIn;
	}
	const logout = () => {
		localStorage.removeItem("jwtToken");
	}

	const login = (user, password) => {
		const options = makeOptions("POST", true, {username: user, password: password});
		return fetch(backend_url + "/api/login", options)
			.then(handleHttpErrors)
			.then(res => {
				setToken(res.token)
			})
	};

	const fetchData = (user) => {
		const options = makeOptions("GET", true);
		return fetch(backend_url + "/api/info/" + user, options).then(handleHttpErrors);
	};



	const fetch_AllRecipes = (url) => {
		return fetch(backend_url + "/api/madplan/all").then(handleHttpErrors);
	};

	const search = (criteria) => {
		const options = makeOptions("POST", true, {id: criteria});
		return fetch(backend_url + "/api/madplan/search", options)
			.then(handleHttpErrors);
	};
	
	const makeOptions = (method, addToken, body) => {
		var opts = {
			method: method,
			headers: {
				"Content-type": "application/json",
				'Accept': 'application/json',
			}
		}
		if (addToken && loggedIn()) {
			opts.headers["x-access-token"] = getToken();
		}
		if (body) {
			opts.body = JSON.stringify(body);
		}
		return opts;
	}

	return {
		makeOptions,
		setToken,
		getToken,
		loggedIn,
		login,
		logout,
		fetchData,
		fetch_AllRecipes,
		search
	}
}



const facade = apiFacade();
export default facade;