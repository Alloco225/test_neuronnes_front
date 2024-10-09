import { Updater } from "@tanstack/react-table"; // Adjusted for react-table


// Utility for updating state values using React's setter functions
export function valueUpdater<T>(updaterOrValue: Updater<T>, setState: React.Dispatch<React.SetStateAction<T>>) {
	setState((prevState) => (typeof updaterOrValue === "function" ? (updaterOrValue as (prev: T) => T)(prevState) : updaterOrValue));
}
