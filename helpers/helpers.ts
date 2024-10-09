import { TOKEN_KEY } from "@/const/keys";
import { Updater } from "@tanstack/react-table"; // Adjusted for react-table


// Utility for updating state values using React's setter functions
export function valueUpdater<T>(updaterOrValue: Updater<T>, setState: React.Dispatch<React.SetStateAction<T>>) {
	setState((prevState) => (typeof updaterOrValue === "function" ? (updaterOrValue as (prev: T) => T)(prevState) : updaterOrValue));
}


export function getAuthToken(){
	const token = localStorage.getItem(TOKEN_KEY);
	// const token = document.cookie
	// 	.split("; ")
	// 	.find((row) => row.startsWith(`$TOKEN_KEY=`))
	// 	?.split("=")[1];
	return token;
}
export function setAuthToken(token: string){
	localStorage.setItem(TOKEN_KEY, token);
	
}