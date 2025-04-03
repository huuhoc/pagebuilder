export const getLayout = async (url: string, id: string) => {
  const response = await fetch(`${url}/${id}`, {
    method: 'GET',
  })
  const data = await response.json()
  return data
}
