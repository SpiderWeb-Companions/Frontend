export async function getSpiders(result_limit, page, name, spiderSpecies, adoptionStatus) {
    const result_offset = Math.max(0, result_limit * page);
    const response = await fetch(`${API_ENDPOINT}/api/all/spiders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
            'authorization': `${sessionStorage.getItem('accessToken')}`
        },
        body: JSON.stringify({ 
            limit: result_limit,
            offset: result_offset,
            search: name,
            species: spiderSpecies,
            status: adoptionStatus
        })
    });

    if (!response.ok) {
        throw new Error('Failed to fetch spiders');
    }

    const data = await response.json();
    return data;
}

export async function getSpecies() {
    const response = await fetch(`${API_ENDPOINT}/api/species`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch spiders');
    }

    const data = await response.json();
    return data;
}

export async function getAdoptionStatuses() {
    const response = await fetch(`${API_ENDPOINT}/api/status`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch spiders');
    }

    const data = await response.json();
    return data;
}

export async function getSpiderCount(name, spiderSpecies, adoptionStatus) {
    const response = await fetch(`${API_ENDPOINT}/api/count`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
            'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
        },
        body: JSON.stringify({ 
            search: name,
            species: spiderSpecies,
            status: adoptionStatus
        })
    });

    if (!response.ok) {
        throw new Error('Failed to fetch spiders');
    }

    const data = await response.json();
    return data.count;
}
