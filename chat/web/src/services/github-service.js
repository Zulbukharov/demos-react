export default class GithubService {
	// _gateBase = "https://zulbukharov-gate.herokuapp.com/authenticate/";
	_gateBase = "http://localhost:3001/"
	_apiBase = "https://api.github.com";
	_token = '';

	constructor() {
		this._token = localStorage.getItem('token');
	}

	getToken = async (code) => {
		const res = await fetch(`${this._gateBase}auth?code=${code}&state=sup`);

		if (!res.ok) {
			throw new Error(`Could not fetch ${this._gateBase}: ${res.status}`);
		};

		// refactor
		const r = await res.json();
		console.log(typeof (r));
		const result = JSON.parse(r)
		console.log(result);
		console.log(result.access_token);
		this._token = result.access_token;
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