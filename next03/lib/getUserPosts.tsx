
export default async function getUserPosts(userId: string){
    // incremental static page generate
    // ISR strategy 
    // export const revalidate =60 in page.tsx / layout.tsx
    
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?userid=${userId}`, {next: {revalidate: 60}})
    if (!res.ok) return undefined
    return res.json()
}
