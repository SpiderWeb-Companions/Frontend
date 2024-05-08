export async function getSpiderDetails(id) {
  const response = await fetch(`${API_ENDPOINT}/spider?id=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch spider");
  }

  const data = await response.json();
  return data;
}
