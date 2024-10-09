import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getUser } from "@/services/auth";

interface AuthGuardProps {
	children: React.ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const router = useRouter();

	useEffect(() => {
		const checkAuth = async () => {
			try {
				const authenticatedUser = await getUser();
				setUser(authenticatedUser);
			} catch (error) {
				router.push("/login"); // Redirect to login if not authenticated
			} finally {
				setLoading(false);
			}
		};

		checkAuth();
	}, [router]);

	if (loading) {
		return <div>Loading...</div>;
	}

	return user ? <>{children}</> : null;
};

export default AuthGuard;
