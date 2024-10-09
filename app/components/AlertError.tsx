import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function AlertError({message, }: {message:string}) {
	return (
		<Alert variant="destructive" className="flex items-center justify-start">
			<ExclamationTriangleIcon className="h-4 w-4" />
			{/* <AlertTitle>Erreur</AlertTitle> */}
			<span></span>
			<AlertDescription>{message}</AlertDescription>
		</Alert>
	);
}
