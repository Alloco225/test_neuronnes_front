// services/auth.ts
import API from "./api";

interface RegisterFormData {
	first_name: string;
	last_name: string;
	age: string;
	email: string;
	password: string;
	password_confirmation: string;
}
interface AuthResponse {
	user: User;
	token: string;
}

interface User {
	id: number;
	first_name: string;
	last_name: string;
	age: string;
	email: string;
}

export const login = async (email: string, password: string): Promise<User> => {
	const { data } = await API.post<AuthResponse>("/auth/login", { email, password });
	if (data.token) {
		localStorage.setItem("token", data.token);
	}
	return data.user;
};

export const register = async (input: RegisterFormData): Promise<User> => {
	const { data } = await API.post<AuthResponse>("/auth/register", input);
	if (data.token) {
		localStorage.setItem("token", data.token);
	}
	return data.user;
};

export const getUser = async (): Promise<User> => {
	const token = localStorage.getItem("token");
	if (token) {
		const { data } = await API.get<User>("/user", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return data;
	}
	throw new Error("Not authenticated");
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
