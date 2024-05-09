export async function getSpiderDetails(id) {
  const response = await fetch(`${API_ENDPOINT}/api/spider/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      'Accept': "*/*",
      'authorization': `${sessionStorage.getItem('accessToken')}`
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch spider");
  }

  const data = await response.json();
  return data;
}
