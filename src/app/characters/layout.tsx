interface CharactersLayoutProp {
    children: React.ReactNode;
}

export default function CharactersLayout({ children }: CharactersLayoutProp) {
    return (
        <main className="w-full h-screen flex">
            <aside className="w-[450px] h-screen px-8">
                <h1 className="font-bold text-[24px] mt-8 mb-4">Rick and Morty List</h1>
                {/* SEARCH */}
                <div className="flex flex-col gap-y-2">
                    <span className="text-xs uppercase text-gray-500 font-semibold">Starred characters</span>
                    {/* STARRED CHARACTERS */}
                    <span className="text-xs uppercase text-gray-500 font-semibold">Characters</span>
                    {/* CHARACTERS */}
                </div>
            </aside>
            <section className="w-full h-screen shadow-2xl shadow-slate-200">{children}</section>
        </main>
    )
}
