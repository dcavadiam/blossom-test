'use client'

import { useState, useRef, useContext } from "react"
import { useQuery } from "@apollo/client"
import Image from "next/image"

import { GET_CHARACTER_BY_ID } from "@/apollo/querys/querys"

import { CommentType } from "@/types/generalTypes"
import { Comment } from "@/components/Comment"
import { HeartIcon } from "../../../../public/icons/heart"
import { FavoriteContext } from "@/context/favorite"
import { OrbitProgress } from "react-loading-indicators"
import { Error } from "@/components/Error"
import { GoBackIcon } from "../../../../public/icons/back"
import { LayoutContext } from "@/context/layout"
import Link from "next/link"

type InputRef = HTMLInputElement | null;

export default function Page({ params }: { params: { id: string } }) {

    const [comments, setComments] = useState<CommentType[]>(() => {
        if (typeof window !== "undefined") {
            const storedComments = localStorage.getItem(`comments-${params.id}`)
            if (storedComments) {
                return JSON.parse(storedComments)
            }
        }
        return []
    });


    const { favorite } = useContext(FavoriteContext);
    const { isLayoutHidden, setIsLayoutHidden } = useContext(LayoutContext)

    const inputRef = useRef<InputRef>(null);

    const handleSubmitComment = () => {

        if (inputRef.current?.value) {
            const comment: CommentType = {
                id: params.id,
                comment: inputRef.current.value
            }
            const newComments = [...comments, comment]
            setComments(newComments)
            localStorage.setItem(`comments-${params.id}`, JSON.stringify(newComments))
            inputRef.current.value = ""
        } else {
            alert("Please enter a comment")
        }
    }

    const { data, loading, error } = useQuery(GET_CHARACTER_BY_ID, {
        variables: {
            id: params.id
        }
    })

    if (loading) return <div className="flex justify-center items-center h-screen">
        <OrbitProgress color={"#8054C7"} size="small" text="" textColor="" />
    </div>
    if (error) return <Error error={error.message} />
    if (!data) return <div>No data</div>

    const { name, image, status, species, gender } = data.character

    return (
        <div className="flex flex-col px-[5rem] py-[2rem] overflow-x-auto h-full max-md:px-8">
            <Link href={`/characters`} className=" py-4 md:hidden" onClick={() => {
                const updateLayoutHidden = !isLayoutHidden
                setIsLayoutHidden(updateLayoutHidden)
                localStorage.setItem(`isLayoutHidden`, JSON.stringify(updateLayoutHidden))

            }}>
                <span> <GoBackIcon /> </span>
            </Link>
            <div className="relative w-fit">
                <Image loader={() => image} src={image} alt={`imagen de ${name}`} width={75} height={75} className="rounded-full" unoptimized={true} />
                <span className="p-1 rounded-full bg-white absolute z-2 right-0 bottom-0 duration-150">
                    <HeartIcon isFilled={favorite.find(fav => fav.id === params.id) && favorite.find(fav => fav.id === params.id)?.favorite ? true : false} />
                </span>
            </div>
            <h1 className="text-[24px] font-bold">{name}</h1>

            <div className="flex flex-col gap-2 my-4">
                <div className="flex flex-col border-b border-gray-200 py-3">
                    <span className="text-sm font-semibold">Specie</span>
                    <span className="text-sm text-gray-500 font-semibold">{species}</span>
                </div>
                <div className="flex flex-col border-b border-gray-200 py-3">
                    <span className="text-sm font-semibold">Status</span>
                    <span className="text-sm text-gray-500 font-semibold">{status}</span>
                </div>
                <div className="flex flex-col py-3">
                    <span className="text-sm font-semibold">Gender</span>
                    <span className="text-sm text-gray-500 font-semibold">{gender}</span>
                </div>
            </div>
            {/* Comments */}
            <div>
                <h2 className="text-lg font-bold">Comments</h2>
                {

                    comments && comments.map(({ id, comment }) => id === params.id &&
                        <Comment key={`comment-${id}-${Math.random()}`}>{comment}</Comment>
                    )
                }
                <input type="text" className="w-full p-3 border-b border-gray-300 outline-none invalid:border-red-500 " placeholder="Add a comment" ref={inputRef} />
                <button className="bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold py-2 px-4 rounded-lg mt-3" onClick={handleSubmitComment} type="submit">Add comment</button>
            </div>
        </div>
    )
}