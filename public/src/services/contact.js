export async function sendContactForm (name, email, message) {
    const requestBody = {
        name,
        email,
        message
    };

    console.table(requestBody);
    console.log(API_ENDPOINT);

    try {
        const response = await fetch(`${API_ENDPOINT}/api/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*'
            },
            body: JSON.stringify(requestBody)
        });

        const data = await response.json();

        if (response.ok) {
            console.log(data.message);
        } else {
            console.error(data.message);
        }
    } catch (error) {
        console.error('Network error:', error);
    }
}