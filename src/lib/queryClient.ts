import { MutationCache, QueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { getErrorMessage } from '@/utils/apiError'

export const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onError: (error, _variables, _context, mutation) => {
      // Mutation đã hiện lỗi tại chỗ (trong form) thì không toast nữa
      if (mutation.meta?.silent) return
      toast.error(getErrorMessage(error))
    },
  }),
})