export const getLayout = async (url: string, id: string) => {
  const response = await fetch(`${url}/${id}`, {
    method: 'GET',
  })
  const data = await response.json()
  return data
}

export const saveLayout = async (url: string, params: any) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })
  const data = await response.json()
  return data
}
