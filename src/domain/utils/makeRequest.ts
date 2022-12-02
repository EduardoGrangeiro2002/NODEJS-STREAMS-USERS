async function makeRequest (data: any) {
    const request = await fetch('http://localhost:3000/users/create', {
        body: data,
        headers: {
            'Content-Type': 'application/json' 
        },
        method: 'POST'
    })
    return request.status
}

export {
    makeRequest
}
