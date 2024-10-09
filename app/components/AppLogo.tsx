import React from "react";
import { NotebookText } from "lucide-react";

const AppLogo = ({ w = 6, h = 6, className = '' }: { w?: number; h?: number, className?:string }) => {
	return <NotebookText className={`h-${w} w-${h} ${className}`} />;
};

export default AppLogo;
