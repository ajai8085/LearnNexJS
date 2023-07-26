'use client'
// error component should be clien

import * as React from 'react'
import { useRouter } from "next/navigation"

export default function Search() {
    const [search, setSearch] = React.useState('')
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        router.push(`${search}`)
        setSearch('')

    }
    return (
        <form className="w-50 flex justify-center md:justify-between" onSubmit={handleSubmit}  >
            <input type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-white p-2 w-80 text-xl rounded-xl"
                placeholder='Search'
            />
            <button className="p-2 text-xl rounded-xl bg-slate-300 ml-2 font-bold">
                🚀
            </button>
        </form>
    )
}
