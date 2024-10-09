import { useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";

const ServerImage = ({ imageSrc, alt }: { imageSrc: string; alt: string }) => {
	const [imageUrl, setImageUrl] = useState(null);

	useEffect(() => {
		fetch(imageSrc)
			.then((response) => response.json())
			.then((data) => {
				setImageUrl(data.imageUrl);
			})
			.catch((error) => console.error("Error fetching image:", error));
	}, []);

	return (
		<div>
			{imageUrl ? (
				<img src={imageUrl} alt="Fetched from server" />
			) : (
				<p>
					<LoaderCircle className="animate-spin" />
				</p>
			)}
		</div>
	);
};

export default ServerImage;
