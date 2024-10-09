"use client"
import APP_MESSAGES from "@/const/app_messages";
import API from "./api";


export const login = async (email: string, password: string): Promise<User|null> => {
	const { data } = await API.post<AuthResponse>("/auth/login", { email, password });
	if (data.token) {
		localStorage.setItem("token", data.token);
	}

	document.cookie = `token=${data.token}; path=/`; //
	return data.user;
};

export const register = async (input: RegisterFormData): Promise<User|null> => {

	const { data } = await API.post<AuthResponse>("/auth/register", input);
	if (data.token) {
		localStorage.setItem("token", data.token);
	}
	return data.user;
};

export const getUser = async (): Promise<User|null> => {
	// const token = localStorage.getItem("token");
	const token = document.cookie
		.split("; ")
		.find((row) => row.startsWith("token="))
		?.split("=")[1];

	if (token) {
		const { data } = await API.get<User>("/user", {
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
	const token = localStorage.getItem("token");
	if (token) {
		await API.delete("/auth/logout", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	}
	localStorage.removeItem("token");
	window.location.href = "/login";
};