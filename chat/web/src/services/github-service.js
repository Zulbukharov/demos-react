export default class GithubService {
	// _gateBase = "https://zulbukharov-gate.herokuapp.com/authenticate/";
	_gateBase = "http://localhost:3001/"
	_apiBase = "https://api.github.com";
	_token = '';

	constructor() {
		this._token = localStorage.getItem('token');
	}

	generateJwtToken = async () => {
		const code = localStorage.getItem('token');
		const res = await fetch(`${this._gateBase}generateToken?code=${code}`);

		if (!res.ok) {
			throw new Error(`Could not fetch ${this._gateBase}: ${res.status}`);
		};

		const r = await res.json();
		console.log(r);
		return r
	};

	getToken = async (code) => {
		const res = await fetch(`${this._gateBase}auth?code=${code}&state=sup`);

		if (!res.ok) {
		};

		// refactor
		const r = await res.json();
		console.log(r);
		const result = JSON.parse(r);
		return result;
	}

	getResourse = async (url) => {
		const res = await fetch(`${this._apiBase}${url}`, {
			headers: {
				'Authorization': `token ${this._token}`,
			}
		});
		if (!res.ok) {
			throw new Error(`Could not fetch ${url}` +
				`, received ${res.status}`)
		}
		return await res.json();
	}

	getUser = async () => {
		const user = await this.getResourse("/user");
		return this._transformUser(user);
	}

	_transformUser = (user) => {
		return {
			avatar_url: user.avatar_url,
			bio: user.bio,
			login: user.login,
		}
	}
}