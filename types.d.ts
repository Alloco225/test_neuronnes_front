interface RegisterFormData {
	first_name: string;
	last_name: string;
	age: number;
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
interface Post {
	id: number;
	title: string;
	content: string;
	image_url: string;
	last_update: string;
	created_at: string;
}
