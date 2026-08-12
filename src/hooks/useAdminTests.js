import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../api/client'

const key = ['admin-tests']
const wait = (value) => new Promise(resolve => setTimeout(() => resolve(value), 350))
const read = async () => {
  const saved = localStorage.getItem('ncp-admin-tests')
  return saved ? JSON.parse(saved) : (await api.get('/tests.json')).data
}
const write = async tests => { localStorage.setItem('ncp-admin-tests', JSON.stringify(tests)); return wait(tests) }

export function useAdminTests() {
  const client = useQueryClient()
  const query = useQuery({ queryKey:key, queryFn:read, staleTime:Infinity })
  const update = useMutation({ mutationFn:write, onSuccess:data=>client.setQueryData(key,data) })
  const createTest = test => update.mutate([...(query.data||[]), {...test,id:`custom-${Date.now()}`,attempts:0}])
  const editTest = test => update.mutate((query.data||[]).map(item=>item.id===test.id?test:item))
  const deleteTest = id => update.mutate((query.data||[]).filter(item=>item.id!==id))
  return {...query, createTest, editTest, deleteTest, isSaving:update.isPending}
}
