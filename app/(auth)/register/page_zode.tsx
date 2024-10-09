"use client";

import { useState } from "react";
import { register } from "@/services/auth_service";
import { useRouter } from "next/navigation";
import APP_ROUTES from "@/const/app_routes";
import APP_MESSAGES from "@/const/app_messages";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertError } from "@/app/components/AlertError";
import Link from "next/link";
import AppLogo from "@/app/components/AppLogo";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Define the Zod schema
const RegisterSchema = z.object({
	firstName: z.string().min(1, { message: "Le prénom est requis" }),
	lastName: z.string().min(1, { message: "Le nom est requis" }),
	age: z.number().min(1, { message: "L'âge doit être supérieur à 0" }),
	email: z.string().email({ message: "Adresse email invalide" }),
	password: z.string().min(8, { message: "Le mot de passe doit comporter au moins 8 caractères" }),
	picture_file: z.instanceof(File, { message: "Le fichier est requis" }),
});

type RegisterFormValues = z.infer<typeof RegisterSchema>;

const Register = () => {
	const [error, setError] = useState<string>("");
	const router = useRouter();

	const {
		register: formRegister,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<RegisterFormValues>({
		resolver: zodResolver(RegisterSchema),
	});

	const onSubmit: SubmitHandler<RegisterFormValues> = async (data) => {
		try {
			await register(data);
			router.push(APP_ROUTES.posts.index);
		} catch (err) {
			setError(APP_MESSAGES.auth.failed);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="h-full w-full flex justify-center items-center">
			<div className="">
				<AppLogo className="mx-auto w-24 h-24 text-primary mb-3" />
				<h2 className="font-bold text-3xl text-center mb-3 text-primary">{APP_MESSAGES.app_name}</h2>
				<Card className="w-full max-w-sm">
					<CardHeader className="text-center">
						<CardTitle className="text-2xl">{APP_MESSAGES.register}</CardTitle>
						<CardDescription>{APP_MESSAGES.register_cta}</CardDescription>
					</CardHeader>
					<CardContent className="grid gap-4">
						<div className="grid grid-cols-2 gap-4">
							<div className="grid gap-2">
								<Label htmlFor="first-name">{APP_MESSAGES.first_name}</Label>
								<Input id="first-name" placeholder="Hosanna" {...formRegister("firstName")} />
								{errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}
							</div>
							<div className="grid gap-2">
								<Label htmlFor="last-name">{APP_MESSAGES.last_name}</Label>
								<Input id="last-name" placeholder="Amané" {...formRegister("lastName")} />
								{errors.lastName && <p className="text-red-500">{errors.lastName.message}</p>}
							</div>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="age">Âge</Label>
							<Input id="age" type="number" placeholder="25" {...formRegister("age", { valueAsNumber: true })} />
							{errors.age && <p className="text-red-500">{errors.age.message}</p>}
						</div>
						<div className="grid gap-2">
							<Label htmlFor="email">{APP_MESSAGES.email}</Label>
							<Input id="email" type="email" placeholder="amane.dev@gmail.com" {...formRegister("email")} />
							{errors.email && <p className="text-red-500">{errors.email.message}</p>}
						</div>
						<div className="grid gap-2">
							<Label htmlFor="password">{APP_MESSAGES.password}</Label>
							<Input id="password" type="password" {...formRegister("password")} />
							{errors.password && <p className="text-red-500">{errors.password.message}</p>}
						</div>
						<div className="grid gap-2">
							<Label htmlFor="passwordConfirmation">{APP_MESSAGES.password_confirmation}</Label>
							<Input id="passwordConfirmation" type="password" {...formRegister("passwordConfirmation")} />
							{errors.passwordConfirmation && <p className="text-red-500">{errors.passwordConfirmation.message}</p>}
						</div>
						<div className="grid gap-2">
							<Label htmlFor="picture_file">Photo de profil</Label>
							<Dropzone
								onDrop={(acceptedFiles) => {
									setValue("picture_file", acceptedFiles[0], { shouldValidate: true });
								}}>
								{({ getRootProps, getInputProps }) => (
									<div {...getRootProps()} className="border-dashed border-2 p-4 cursor-pointer">
										<input {...getInputProps()} />
										<p>Faites glisser un fichier ici, ou cliquez pour sélectionner un fichier</p>
									</div>
								)}
							</Dropzone>
							{errors.picture_file && <p className="text-red-500">{errors.picture_file.message}</p>}
						</div>
					</CardContent>

					{error && (
						<div className="p-5 pt-0">
							<AlertError message={error} />
						</div>
					)}

					<CardFooter>
						<Button type="submit" className="w-full">
							{APP_MESSAGES.submit_register}
						</Button>
					</CardFooter>

					<div className="px-5 flex justify-between items-center py-3">
						<CardDescription>{APP_MESSAGES.has_account}</CardDescription>
						<Button variant="link">
							<Link href={APP_ROUTES.login}>{APP_MESSAGES.submit_login}</Link>
						</Button>
					</div>
				</Card>
			</div>
		</form>
	);
};

export default Register;
