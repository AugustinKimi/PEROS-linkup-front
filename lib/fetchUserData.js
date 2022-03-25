

const fetchUserData = async (userId) => {
    const requestData = {
        userId
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/me`,
    {
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(requestData)
    })
    const json = await res.json()
    return json
}

export default fetchUserData