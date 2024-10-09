import React from "react";
import { NotebookText } from "lucide-react";

const AppLogo = ({ size = 6, className = '' }: { size?: number, className?:string }) => {
	return <NotebookText className={`h-${size} w-${size} ${className}`} />;
};

export default AppLogo;
