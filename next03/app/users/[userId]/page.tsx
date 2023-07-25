import getUser from "@/lib/getUser"
import getUserPosts from "@/lib/getUserPosts"
import { Suspense } from "react"
import UserPosts from "./components/UserPosts"
import { Metadata } from "next"
import getAllUsers from "@/lib/getAllUsers"
import {notFound} from "next/navigation"


type Params = {
    params: {
        userId: string
    }
}

export async function generateMetadata({ params: { userId } }: Params): Promise<Metadata> {
    const userData: Promise<User> = await getUser(userId)
    const user = await userData

    if(!user?.name){
        return {title: 'User not found'}
    }

    return { title: user.name, description: `This is the page of ${user.name}` }
}

export default async function UsersPage({ params: { userId } }: Params) {


    console.log('loaded', { userId })
    const userData: Promise<User> = getUser(userId)
    const userPostsData: Promise<Post[]> = getUserPosts(userId)

    // const [user, userPosts] = await Promise.all([userData, userPostsData])
    // leverage the suspense 
    const user = await userData
    if(!user?.name){
        return notFound()
    }
    return (
        <>
            <h2>{user.name}</h2>
            <br />
            <Suspense fallback={<h2>Loading ...</h2>}>
                <UserPosts promise={userPostsData}></UserPosts>
            </Suspense>
        </>
    )
}

// Static site generation -> SSG
// SSR is generated dynamically 

//SSG and SSR 
// SSR -> SSG pages, tell nexjs upfront what parms to be expected 
// generate static parms and avoid server side rendering
// Incremental static Regeneration based on time interval ISR strategy 
// dymaicparams
export async function generateStaticParams(){
    const userData: Promise<User[]> = getAllUsers()
    const users =await userData
    // return the expected params in this file
    return users.map(user=> {userId: user.id.toString()})
}
