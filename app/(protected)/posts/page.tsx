"use client"
import React, { ReactNode, useEffect, useState } from "react";

import PostsTable from "./PostsTable";
import DataTable from "./components/DataTable";
import {columns} from './components/columns';
import { getPosts } from "@/services/post_service";
import { Post } from "@/app/(protected)/posts/data/schema";


const PostsPage = () => {
	const [posts, setPosts] = useState<Post[]>([]);

	useEffect(() => {
		const loadPosts = async () => {
			const postsData = await getPosts();
			if(!postsData){
				// raise error
				return;
			}
			setPosts(postsData);
		};

		loadPosts();
	}, []);

	return (
		<div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
			<div className="flex items-center justify-between space-y-2">
				<div>
					<h2 className="text-2xl font-bold tracking-tight">Bon retour!</h2>
					<p className="text-muted-foreground">Voici la liste de vos postes</p>
				</div>
				<div className="flex items-center space-x-2">{/* <UserNav /> */}</div>
			</div>
			<DataTable data={posts} columns={columns} />
			{/* <PostsTable posts={posts}></PostsTable> */}
		</div>
	);
};

export default PostsPage;
