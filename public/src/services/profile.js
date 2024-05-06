export async function getSpiders(username) {
    const response = await fetch(`${API_ENDPOINT}/api/favourite`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*'
        },
        body: JSON.stringify({ username })
    });

    if (!response.ok) {
        throw new Error('Failed to fetch favourite spiders');
    }

    const data = await response.json();
    return data;
}