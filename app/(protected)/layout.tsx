"use client";
import { ReactNode, useEffect, useState } from "react";
import { getUser } from "../../services/auth_service";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import APP_ROUTES from "@/const/app_routes";
import APP_MESSAGES from "@/const/app_messages";
import AppLogo from "../components/AppLogo";
import LogoutDropdownMenuButton from "./LogoutDropdownMenuButton";

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
		// router.push(APP_ROUTES.login);
		return (
			<div className="flex flex-col bg-gray-100 justify-center items-center gap-3 h-full">
				<article className="flex flex-col rounded-lg bg-white border shadow-sm text-center items-center p-10 mb-10">
					<AppLogo size={10} className="mb-3" />
					<h2 className="font-bold text-xl">Vous n'êtes pas connecté</h2>
					<p>Veuillez vous connecter pour continuer</p>
				</article>
			</div>
		);
		// Redirect to login if the user is not authenticated
	}

	return (
		<div className="bg-gray-100 h-full flex flex-col">
			<header className="sticky top-0 flex justify-between h-16 items-center gap-4 border-b bg-background px-4 md:px-6 bg-white">
				<nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6 ">
					<Link href="#" className="flex items-center gap-2 text-lg font-semibold md:text-base">
						<AppLogo />
						<span className="sr-only">{APP_MESSAGES.app_name}</span>
					</Link>
					<Link href={APP_ROUTES.posts.index} className="text-foreground transition-colors hover:text-foreground">
						Posts
					</Link>
				</nav>
				<Sheet>
					<SheetTrigger asChild>
						<Button variant="outline" size="icon" className="shrink-0 md:hidden">
							<Menu className="h-5 w-5" />
							<span className="sr-only">Ouvrir/fermer le menu de navigation</span>
						</Button>
					</SheetTrigger>
					<SheetContent side="left">
						<nav className="grid gap-6 text-lg font-medium">
							<Link href="#" className="flex items-center gap-2 text-lg font-semibold">
								<AppLogo />
								<span className="sr-only">{APP_MESSAGES.app_name}</span>
							</Link>

							<Link href={APP_ROUTES.posts.index} className="hover:text-foreground">
								Posts
							</Link>
						</nav>
					</SheetContent>
				</Sheet>

				<div className="flex w-full justify-end items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
					<h3 className="font-semibold">{user.first_name + " " + user.last_name}</h3>
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
							<DropdownMenuItem>
								<LogoutDropdownMenuButton />
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</header>
			<main className="flex-grow">{children}</main>
		</div>
	);
}
