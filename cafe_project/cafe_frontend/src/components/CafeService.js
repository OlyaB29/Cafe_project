import axios from 'axios';

const API_URL = 'http://localhost:8000';


export default class CafeService {

    async getMenu() {
        const url = `${API_URL}/cafe_app/api/menu`;
        return await axios.get(url).then(response => response.data);
    }

    async getMealCategory(category) {
        const url = `${API_URL}/cafe_app/api/${category}`;
        return await axios.get(url).then(response => response.data);
    }

    async getMealInCategory(category, pk, access) {
        const url = `${API_URL}/cafe_app/api/${category}/${pk}`;
        return access
            ? await axios.get(url, {headers: {"Authorization": `JWT ${access}`}}).then(response => response.data).catch(
                (error) => this.errorHandler(error))
            : await axios.get(url).then(response => response.data);
    }

    async getMeal(pk) {
        const url = `${API_URL}/cafe_app/api/meals/${pk}`;
        return await axios.get(url).then(response => response.data);
    }

    async getMeals() {
        const url = `${API_URL}/cafe_app/api/meals`;
        return await axios.get(url).then(response => response.data);
    }

    async getTopMeals(access) {
        const url = `${API_URL}/cafe_app/api/statistics_meals`;
        return await axios.get(url, {headers: {"Authorization": `JWT ${access}`}}).then(response => response.data).catch((error) => this.errorHandler(error));
    }

    async getTopUsers(access) {
        const url = `${API_URL}/cafe_app/api/statistics_users`;
        return await axios.get(url, {headers: {"Authorization": `JWT ${access}`}}).then(response => response.data).catch((error) => this.errorHandler(error));
    }

    async getCategoryTopUsers(category, access) {
        const url = `${API_URL}/cafe_app/api/statistics_users_category/${category}`;
        return await axios.get(url, {headers: {"Authorization": `JWT ${access}`}}).then(response => response.data).catch((error) => this.errorHandler(error));
    }

    async getMealData(pk, period, num, access) {
        const url = period ? `${API_URL}/cafe_app/api/statistics_chart/${pk}/?period=${period}&num=${num}`
            : `${API_URL}/cafe_app/api/statistics_chart/${pk}`
        return await axios.get(url, {headers: {"Authorization": `JWT ${access}`}}).then(response => response.data).catch((error) => this.errorHandler(error));
    }

    async getTokens(username, password) {
        const url = `${API_URL}/auth/jwt/create`;
        return await axios.post(url, {username: username, password: password}).then(response => response.data);
    }

    async getRefresh(refresh) {
        const url = `${API_URL}/auth/jwt/refresh`;
        return await axios.post(url, {refresh: refresh}).then(response => response.data);
    }

    createUser(user) {
    	const url = `${API_URL}/auth/users/`;
    	return axios.post(url, user);
    }

    errorHandler(err) {
        return (
            err.response.data.detail === "Given token not valid for any token type"
                ? this.getRefresh(localStorage.getItem('refreshToken')).then((r) => r).catch(
                    (error) => error.response.data.detail === "Token is invalid or expired"
                        ? localStorage.removeItem('user')
                        : alert("Произошла ошибка"))
                : alert(err))
    }

    async getUser(access) {
        const url = `${API_URL}/auth/users/me`;
        return await axios.get(url, {headers: {"Authorization": `JWT ${access}`}}).then(response => response.data).catch((error) => this.errorHandler(error));
    }

    async createMeal(meal, access) {
        const url = `${API_URL}/cafe_app/api/meals/`;
        return await axios.post(url, meal, { headers: {"Authorization" : `JWT ${access}`}}).then(response => "ok").catch((error)=>{this.errorHandler(error); console.log(error)});
    }

    createPhoto(photo, access) {
		const url = `${API_URL}/cafe_app/api/photos/`;
		return axios.post(url, photo, { headers: {"Authorization" : `JWT ${access}`}});
	}

}

