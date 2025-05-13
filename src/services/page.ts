import type { FilterCategory } from '@/types'
import { deletePayloadNull } from '@/helper'

export const getListPage = async (url: string, params: FilterCategory) => {
  const urlWithParams = new URL(`${url}/api/Pages/list`)
  const clearParams = deletePayloadNull(params)
  Object.keys(clearParams).forEach((key) => {
    urlWithParams.searchParams.append(key, clearParams[key] || '')
  })
  // urlWithParams.searchParams.append('MaxResultCount', '9999')
  const response = await fetch(urlWithParams, {
    method: 'GET',
  })

  const data = await response.json()
  return data.result
}
