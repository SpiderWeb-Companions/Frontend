export async function getSpiders(username) {
    const response = await fetch(`${API_ENDPOINT}/api/my/spiders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
            'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
        },
        body: JSON.stringify({ username })
    });

    if (!response.ok) {
        throw new Error('Failed to fetch favourite spiders');
    }

    const data = await response.json();
    return data;
}