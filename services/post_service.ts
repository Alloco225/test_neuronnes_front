"use client"
import APP_MESSAGES from "@/const/app_messages";
import API from "./api_service";
import APP_ROUTES from "@/const/app_routes";
import { postSchema } from "@/app/(protected)/posts/data/schema";
import { z } from "zod";

const API_POST_ROUTE = "/posts"

const TOKEN_KEY = "token";

export const getPosts = async (): Promise<Post[]|null> => {
	const token = localStorage.getItem(TOKEN_KEY);
	// const token = document.cookie
	// 	.split("; ")
	// 	.find((row) => row.startsWith(`$TOKEN_KEY=`))
	// 	?.split("=")[1];

	if (token) {
		const { data } = await API.get<Post[]>(API_POST_ROUTE, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return data;
	}
	return null;
};
export const storePost = async (post: z.infer<typeof postSchema>, imageFile?: File): Promise<Post | null> => {
	const token = localStorage.getItem(TOKEN_KEY);
	// const token = document.cookie
	// 	.split("; ")
	// 	.find((row) => row.startsWith(`$TOKEN_KEY=`))
	// 	?.split("=")[1];

	var formData = new FormData();
	formData.append("image_file", imageFile!);
	formData.append("title", post.title);
	formData.append("content", post.content);

	console.log("storePost", post, formData.get("title"), formData.get("content"), formData.get("image_file"));

	if (token) {
		const { data } = await API.post<Post>(API_POST_ROUTE, formData, {
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "multipart/form-data",
			},
		});
		return data;
	}
	// TODO manage error messages
	return null;
};
export const updatePost = async (post : Post): Promise<Post|null> => {
	const token = localStorage.getItem(TOKEN_KEY);
	// const token = document.cookie
	// 	.split("; ")
	// 	.find((row) => row.startsWith(`$TOKEN_KEY=`))
	// 	?.split("=")[1];

	if (token) {
		const { data } = await API.post<Post>(API_POST_ROUTE + '/'+post.id, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(post),
		});
		return data;
	}
	return null;
};
export const deletePost = async (post : Post): Promise<Post|null> => {
	const token = localStorage.getItem(TOKEN_KEY);
	// const token = document.cookie
	// 	.split("; ")
	// 	.find((row) => row.startsWith(`$TOKEN_KEY=`))
	// 	?.split("=")[1];

	if (token) {
		const { data } = await API.delete<Post>(API_POST_ROUTE + '/'+post.id, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return data;
	}
	return null;
};