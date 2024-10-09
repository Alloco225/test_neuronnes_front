import { z } from "zod";

export const postSchema = z.object({
	title: z.string({ message: "Oups, il manque le titre" }),
	content: z.string({ message: "Vous avez oublié d'écrire votre post" }).min(3, { message: "Trop court comme post" }),
});

