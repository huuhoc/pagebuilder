export const getListMenu = async (url: string) => {
  const urlWithParams = new URL(`${url}/api/MenuItems/list-type`)
  const response = await fetch(urlWithParams, {
    method: 'GET',
  })
  const data = await response.json()
  return data.result
}
