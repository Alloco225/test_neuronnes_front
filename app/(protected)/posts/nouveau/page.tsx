import React from "react";
import PostForm from "../PostForm";

const CreatePostPage = () => {
	return (
		<div className=" h-full flex-1 flex-col space-y-8 p-8  max-w-screen-md mx-auto">
			<div className="flex items-center justify-between space-y-2">
				<div>
					<h2 className="text-2xl font-bold tracking-tight">Nouveau post!</h2>
					<p className="text-muted-foreground">Remplissez</p>
				</div>
				<div className="flex items-center space-x-2">{/* <UserNav /> */}</div>
			</div>
			<PostForm />
			{/* <PostsTable posts={posts}></PostsTable> */}
		</div>
	);
};

export default CreatePostPage;
