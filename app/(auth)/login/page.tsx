"use client"
import { useState } from "react";
import { login } from "@/services/auth";
import { useRouter } from "next/navigation";
import APP_ROUTES from "@/const/app_routes";
import APP_MESSAGES from "@/const/app_messages";
const Login = () => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [error, setError] = useState<string>("");
	const router = useRouter();

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await login(email, password);
			router.push(APP_ROUTES.posts);
		} catch (err) {
			setError(APP_MESSAGES.auth.failed);
		}
	};

	return (
		<div>
			<h1>Login</h1>
			<form onSubmit={handleLogin}>
				<input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
				<input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
				<button type="submit">Login</button>
			</form>
			{error && <p>{error}</p>}
		</div>
	);
};

export default Login;
