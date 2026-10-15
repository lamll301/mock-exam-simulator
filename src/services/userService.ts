import { api } from './api'
import type { User } from '@/types/user'

export type CreateUserDto = Omit<User, 'id'>

export const USER_FIELDS: (keyof CreateUserDto)[] = ['name', 'email']

export async function getUsers(): Promise<User[]> {
  const { data } = await api.get<User[]>('/users')
  return data
}

export async function createUser(dto: CreateUserDto): Promise<User> {
  const { data } = await api.post<User>('/users', dto)
  return data
}

export async function updateUser(id: number, dto: CreateUserDto): Promise<User> {
  const { data } = await api.put<User>(`/users/${id}`, dto)
  return data
}

export async function deleteUser(id: number): Promise<void> {
  await api.delete(`/users/${id}`)
}