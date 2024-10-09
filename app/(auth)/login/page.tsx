"use client";
import { useState } from "react";
import { login } from "@/services/auth";
import { useRouter } from "next/navigation";
import APP_ROUTES from "@/const/app_routes";
import APP_MESSAGES from "@/const/app_messages";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// export const metadata = {
// 	title: "Next.js",
// 	description: "Generated by Next.js",
// };

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
		<form onSubmit={handleLogin} className="h-full w-full flex justify-center items-center bg-blue-400">
			<div className="">
				<h2 className="font-bold text-3xl text-center mb-3">{APP_MESSAGES.app_name}</h2>
				<Card className="w-full max-w-sm">
					<CardHeader className="text-center">
						<CardTitle className="text-2xl">{APP_MESSAGES.login}</CardTitle>
						<CardDescription>{APP_MESSAGES.login_cta}</CardDescription>
					</CardHeader>
					<CardContent className="grid gap-4">
						<div className="grid gap-2">
							<Label htmlFor="email">{APP_MESSAGES.email}</Label>
							<Input id="email" type="email" placeholder="amane.dev@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
						</div>
						<div className="grid gap-2">
							<Label htmlFor="password">{APP_MESSAGES.password}</Label>
							<Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
						</div>
					</CardContent>
					{error && <p>{error}</p>}
					<CardFooter>
						<Button className="w-full">{APP_MESSAGES.submit_login}</Button>
					</CardFooter>
				</Card>
			</div>
		</form>
	);
};

export default Login;
