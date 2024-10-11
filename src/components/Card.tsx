import Image from "next/image";
import Link from "next/link";

import { HeartIcon } from "../../public/icons/heart";

import { Character } from "@/types/queryTypes";

export const CharacterCardList = ({ character }: { character: Character }) => {
    const { id, name, image, species } = character;
    return (
        <Link href={`/characters/${id}`} className="border-t border-gray-200">
            <div className="flex flex-row justify-between items-center rounded-lg p-4 hover:bg-gray-200 ">
                <div className="flex items-center gap-2">
                    <Image loader={() => image} src={image} alt={`imagen de ${name}`} width={40} height={40} className="rounded-full" unoptimized={true} />
                    <div className="flex flex-col ">
                        <span className="text-sm font-semibold">{name}</span>
                        <span className="text-sm text-gray-500">{species}</span>
                    </div>
                </div>
                <span className="p-1 rounded-full bg-white">
                    <HeartIcon isFilled={false} />
                </span>
            </div>
        </Link>
    )
}