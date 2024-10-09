import { logout } from "@/services/auth_service";

const LogoutButton = () => {
	return <button onClick={logout}>Logout</button>;
};

export default LogoutButton;
