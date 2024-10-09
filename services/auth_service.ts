"use client"
import APP_MESSAGES from "@/const/app_messages";
import API from "./api_service";
import APP_ROUTES from "@/const/app_routes";

const API_AUTH_ROUTES = {
	login: "/auth/login",
	register: "/auth/register",
	user: "/auth/user",
	logout: "/auth/logout",
}

const TOKEN_KEY = "token";

export const login = async (email: string, password: string): Promise<User|null> => {
	const { data } = await API.post<AuthResponse>(API_AUTH_ROUTES.login, { email, password });
	if (data.token) {
		localStorage.setItem(TOKEN_KEY, data.token);
	}

	document.cookie = `token=${data.token}; path=/`; //
	return data.user;
};

export const register = async (input: RegisterFormData): Promise<User|null> => {

	const { data } = await API.post<AuthResponse>(API_AUTH_ROUTES.register, input);
	if (data.token) {
		localStorage.setItem(TOKEN_KEY, data.token);
	}
	return data.user;
};

export const getUser = async (): Promise<User|null> => {
	const token = localStorage.getItem(TOKEN_KEY);
	// const token = document.cookie
	// 	.split("; ")
	// 	.find((row) => row.startsWith(`$TOKEN_KEY=`))
	// 	?.split("=")[1];

	if (token) {
		const { data } = await API.get<User>(API_AUTH_ROUTES.user, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return data;
	}
	return null;
	throw new Error(APP_MESSAGES.unauthenticated);
};

export const logout = async (): Promise<void> => {
	const token = localStorage.getItem(TOKEN_KEY);
	if (token) {
		await API.delete(API_AUTH_ROUTES.logout, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	}
	localStorage.removeItem(TOKEN_KEY);
	window.location.href = APP_ROUTES.login;
};