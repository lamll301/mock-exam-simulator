import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { deleteUser } from '@/services/userService'
import { getErrorMessage } from '@/utils/apiError'

export function useDeleteUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      toast.success('Đã xóa user')
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  })
}