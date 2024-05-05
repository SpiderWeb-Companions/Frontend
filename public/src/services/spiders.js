export async function getSpiders(page) {
    const response = await fetch(`${API_ENDPOINT}/api/all/spiders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*'
        },
        body: JSON.stringify({ limit: 3 })
    });

    if (!response.ok) {
        throw new Error('Failed to fetch spiders');
    }

    const data = await response.json();
    return data;
}

export async function getSpecies() {
    const response = await fetch(`${API_ENDPOINT}/api/species`);

    if (!response.ok) {
        throw new Error('Failed to fetch spiders');
    }

    const data = await response.json();
    return data;
}

export async function getAdoptionStatuses() {
    const response = await fetch(`${API_ENDPOINT}/api/status`);

    if (!response.ok) {
        throw new Error('Failed to fetch spiders');
    }

    const data = await response.json();
    return data;
}