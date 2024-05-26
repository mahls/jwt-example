import React from "react"

export const HomeNav = ({ username }: { username: string }) => {
    console.log(username)
    return (
        <div className=" text-white p-5 border-b border-stone-600 flex justify-between">
            <div>
                <h1 className="text-2xl font-bold">mespace</h1>
            </div>
            <div>
                <h1 className="text-2xl font-bold">{username}</h1>
            </div>
        </div>
    )
}

