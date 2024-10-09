import Image from "next/image";
// const illustration = "/images/image_with_slogan.png"
// const illustration = "@/static/images/front2.jpeg"
const illustration = null;

export default function AuthFormLayout({ children }: { children: React.ReactNode }) {
    if(illustration == null){
        return children;
    }
	return (
        
		<div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px] h-full">
			{children}
			<div className="hidden bg-muted lg:block">
				<Image src={illustration} alt="Image" width="1920" height="1080" className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale" />
			</div>
		</div>
	);
}
