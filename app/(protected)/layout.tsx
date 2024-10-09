"use client";
import { ReactNode, useEffect, useState } from "react";
import { getUser, logout } from "../../services/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CircleUser, Menu, Package2, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import APP_ROUTES from "@/const/app_routes";
import APP_MESSAGES from "@/const/app_messages";
import AppLogo from "../components/AppLogo";

interface ProtectedLayoutProps {
	children: ReactNode;
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
	const router = useRouter();
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		const loadUser = async () => {
			const userData = await getUser();

			setUser(userData);
		};

		loadUser();
	}, [router]);

	if (!user) {
		// Redirect to login if the user is not authenticated
		return <p>Unauthorized. Please log in.</p>;
	}

	return (
		<div>
			<header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
				<nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
					<Link href="#" className="flex items-center gap-2 text-lg font-semibold md:text-base">
						<AppLogo />
						<span className="sr-only">{APP_MESSAGES.app_name}</span>
					</Link>
					{/* <Link href={APP_ROUTES.posts} className="{text-muted-foreground transition-colors hover:text-foreground}"> */}
					<Link href={APP_ROUTES.posts} className="text-foreground transition-colors hover:text-foreground">
						Posts
					</Link>
				</nav>
				<Sheet>
					<SheetTrigger asChild>
						<Button variant="outline" size="icon" className="shrink-0 md:hidden">
							<Menu className="h-5 w-5" />
							<span className="sr-only">Toggle navigation menu</span>
						</Button>
					</SheetTrigger>
					<SheetContent side="left">
						<nav className="grid gap-6 text-lg font-medium">
							<Link href="#" className="flex items-center gap-2 text-lg font-semibold">
								<AppLogo />
								<span className="sr-only">{APP_MESSAGES.app_name}</span>
							</Link>

							<Link href={APP_ROUTES.posts} className="hover:text-foreground">
								Posts
							</Link>
						</nav>
					</SheetContent>
				</Sheet>
				<div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
					<form className="ml-auto flex-1 sm:flex-initial">
						<div className="relative">
							<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
							<Input type="search" placeholder={APP_MESSAGES.posts.search} className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]" />
						</div>
					</form>
					<h3 className="font-semibold text-2xl">{user.first_name + " " + user.last_name}</h3>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="secondary" size="icon" className="rounded-full">
								<div className="h-5 w-5 rounded-full">{user.first_name[0] + user.last_name[0]}</div>
								<span className="sr-only">Ouvrir le menu</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>{APP_MESSAGES.profile.title}</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>{APP_MESSAGES.profile.settings}</DropdownMenuItem>
							<DropdownMenuItem>{APP_MESSAGES.profile.support}</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem>{APP_MESSAGES.profile.logout}</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</header>
			<main>{children}</main>
		</div>
	);
}
