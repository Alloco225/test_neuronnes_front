"use client"; // This is necessary for client-side redirection

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUser } from "../services/auth";

export default function HomePage() {
	const router = useRouter();

	useEffect(() => {
		const redirectUser = async () => {
			const user = await getUser();

			if (user) {
				// Redirect to posts if authenticated
				router.push("/posts");
			} else {
				// Redirect to login if not authenticated
				router.push("/login");
			}
		};

		redirectUser();
	}, [router]);

	return null; // Render nothing while redirecting
}
