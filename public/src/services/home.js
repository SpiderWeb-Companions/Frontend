export async function getAllSpiders() {
  const response = await fetch(`${API_ENDPOINT}/api/all/spiders`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Accept': '*/*',
      'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
    },
    body: JSON.stringify({ limit: 3 }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch all spiders");
  }

  const data = await response.json();
  return data;
}
