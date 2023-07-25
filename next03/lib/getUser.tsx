

export default async function getUser(userId: string) {
    const url =`https://jsonplaceholder.typicode.com/users/${userId}`
    const res = await fetch(url)
    if (!res.ok) return undefined
    return res.json()
}
