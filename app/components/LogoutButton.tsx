import { logout } from "@/services/auth";

const LogoutButton = () => {
	return <button onClick={logout}>Logout</button>;
};

export default LogoutButton;
