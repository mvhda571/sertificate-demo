import { useQuery } from '@tanstack/react-query'
import { api } from '../api/client'

export function useTests() {
  return useQuery({
    queryKey: ['tests'],
    queryFn: async () => (await api.get('/tests.json')).data,
    staleTime: 1000 * 60 * 10,
  })
}
