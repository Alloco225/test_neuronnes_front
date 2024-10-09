"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { postSchema } from "./data/schema";
import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import APP_MESSAGES from "@/const/app_messages";
import { useState } from "react";
import { AlertError } from "@/app/components/AlertError";
import { storePost } from "@/services/post_service";
import { useRef } from "react";
import APP_ROUTES from "@/const/app_routes";
const PostForm = () => {
	const formRef = useRef<HTMLFormElement | null>(null);

	const form = useForm<z.infer<typeof postSchema>>({
		resolver: zodResolver(postSchema),
	});
	const [image, setImage] = useState<File | null>(null);
	const [preview, setPreview] = useState<string | null>(null);
	const [error, setError] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);

	async function onSubmit(values: z.infer<typeof postSchema>) {
		try {
			console.log("onSubmit");
			if (isLoading) return;
			setError("");

			console.log("post_values", values);
			console.log("post_image", image);
			if (image == null) {
				setError("Veuillez ajouter une image");
				return;
			}
			setIsLoading(true);
			await storePost(values, image as File);
			setIsLoading(false);

			router.push(APP_ROUTES.posts.index);
		} catch (error) {
			console.error("xx submit post", error);
			setIsLoading(false);
			setError("Oups, une erreur s'est produite");
		}
	}

	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setImage(file);
			const reader = new FileReader();
			reader.onloadend = () => {
				setPreview(reader.result as string);
			};
			reader.readAsDataURL(file);

			setError("");
		}
	};

	const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		const file = event.dataTransfer.files[0];
		if (file) {
			setImage(file);
			const reader = new FileReader();
			reader.onloadend = () => {
				setPreview(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
	};

	const handleDropZoneClick = () => {
		const fileInput = document.getElementById("image-file-input") as HTMLInputElement;
		if (fileInput) {
			fileInput.click();
		}
	};

	return (
		<Form {...form}>
			<form ref={formRef} onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mx-auto rounded bg-white p-10 md:p-10">
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel>{APP_MESSAGES.title}</FormLabel>
							<FormControl>
								<Input placeholder="Un titre pour ce post" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="content"
					render={({ field }) => (
						<FormItem>
							<FormLabel>{APP_MESSAGES.content}</FormLabel>
							<FormControl>
								<Textarea placeholder="Partagez vos pensées" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormItem>
					<FormLabel>Image</FormLabel>
					<FormControl onClick={handleDropZoneClick}>
						<div
							className="border border-dashed rounded border-gray-400 bg-gray-50 hover:bg-gray-100 cursor-pointer p-4 md:p-8 text-center"
							onDrop={handleDrop}
							onDragOver={handleDragOver}>
							{preview ? (
								<img src={preview} alt="Image preview" className="mx-auto mb-2 h-32 w-32 object-cover" />
							) : (
								<p>Glissez et déposez une image ici, ou cliquez pour ajouter une image</p>
							)}
							<input id="image-file-input" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
						</div>
					</FormControl>
					<FormDescription>Téléchargez une image pour votre post</FormDescription>
					<FormMessage />
				</FormItem>
				{error && <AlertError message={error} />}
				<Button  type="submit" className="w-full md:w-auto" disabled={isLoading}>
					{isLoading && <LoaderCircle className="animate-spin mr-3" />}

					{APP_MESSAGES.submit}
				</Button>
			</form>
		</Form>
	);
};

export default PostForm;
