'use client'

import { GET_CHARACTER_BY_ID } from "@/apollo/querys/querys"
import { useQuery } from "@apollo/client"
import Image from "next/image"

export default function Page({ params }: { params: { id: string } }) {

    const { data, loading, error } = useQuery(GET_CHARACTER_BY_ID, {
        variables: {
            id: params.id
        }
    })

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>
    if (!data) return <div>No data</div>

    const { name, image, status, species, gender } = data.character

    return (
        <div className="flex flex-col px-[5rem] py-[2rem]">
            <Image loader={() => image} src={image} alt={`imagen de ${name}`} width={75} height={75} className="rounded-full" unoptimized={true} />
            <h1 className="text-[24px] font-bold">{name}</h1>
            <div className="flex flex-col gap-2 mt-4">
                <div className="flex flex-col border-b border-gray-200 py-3">
                    <span className="text-base font-semibold">Specie</span>
                    <span className="text-sm text-gray-500 font-semibold">{species}</span>
                </div>
                <div className="flex flex-col border-b border-gray-200 py-3">
                    <span className="text-base font-semibold">Status</span>
                    <span className="text-sm text-gray-500 font-semibold">{status}</span>
                </div>
                <div className="flex flex-col py-3">
                    <span className="text-base font-semibold">Gender</span>
                    <span className="text-sm text-gray-500 font-semibold">{gender}</span>
                </div>
            </div>
        </div>
    )

}