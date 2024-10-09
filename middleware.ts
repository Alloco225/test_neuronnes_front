"use client";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import APP_ROUTES from "./const/app_routes";

export function middleware(req: NextRequest) {
	const token = req.cookies.get("token"); 
	// const token = localStorage.getItem("token"); 
	const { pathname } = req.nextUrl;

	if (!token && pathname.startsWith(APP_ROUTES.posts)) {
		// if ([APP_ROUTES.login, APP_ROUTES.register].includes(pathname)){
		// 	return NextResponse.next();
		// }
		return NextResponse.redirect(new URL(APP_ROUTES.login, req.url));
	}
	return NextResponse.next();
}



// Protect the `/dashboard` and other private routes
export const config = {
	matcher: ["/posts:path*"],
};
