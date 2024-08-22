'use client'

import Story from "@/components/Story"
import StorySkeleton from "@/components/StorySkeleton";
import { getStories } from "@/services/interactions";
import { useEffect, useState } from "react"

export default function Page() {
    const [stories, setStories] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getStories().then((data) => {
            setStories(data)
            setLoading(false)
        }).catch((error) => {
            console.error(error)
        }).finally(() => {
            setLoading(false)
        })
    }, [])

    return (
        <main class="flex flex-col items-center gap-10 my-5">
            <h1 className="text-4xl font-bold text-gray-800">Inspirate</h1>
            {loading && <StorySkeleton />}
            {!loading && stories && stories.map((story) => <Story key={story.id} story={story} />)}
        </main>
    )
}
