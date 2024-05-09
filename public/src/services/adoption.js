export async function submitAdoptionForm (email, adoptionReason, comments,spiderID ) {
    const requestBody = {
        email,
        adoptionReason,
        comments,
        spiderID
    };

    try {
        const response = await fetch(`${API_ENDPOINT}/api/adopt`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*'
            },
            body: JSON.stringify(requestBody)
        });

        const data = await response.json();

        if (response.ok) {
            return {
                status: response.status,
                message: data.message
            }
        } else {
            return {
                status: response.status,
                message: data.message
            }
        }
    } catch (error) {
        console.error('Network error:', error);
    }
}