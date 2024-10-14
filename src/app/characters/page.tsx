import Image from "next/image";
import rickMortyLogo from "/public/images/rick-and-morty-logo.webp"

export default function Characters() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <Image src={rickMortyLogo} width={400} height={300} alt="Rick and Morty Logo" unoptimized={true} priority={true} />
            <h1 className="text-center text-2xl font-bold">Characters</h1>
        </div>
    )
}