

import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface PostsTableInterface{
    posts: Post[]
}
const PostsTable = ({posts}: PostsTableInterface) => {


	return (
		<Table>
			<TableCaption>List de vos postes.</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead className="w-[100px]">Titre</TableHead>
					<TableHead>Contenu</TableHead>
					<TableHead>Dernière modification</TableHead>
					<TableHead className="text-right">Ajouté le</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{posts.map((post) => (
					<TableRow key={post.id}>
						<TableCell className="font-medium">{post.title}</TableCell>
						<TableCell>{post.content}</TableCell>
						<TableCell>{post.last_update}</TableCell>
						<TableCell className="text-right">{post.created_at}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};

export default PostsTable;
