import { useMemo, useState } from 'react'
import { useUsers } from '@/hooks/useUsers'
import { useCreateUser } from '@/hooks/useCreateUser'
import { useUpdateUser } from '@/hooks/useUpdateUser'
import { useDeleteUser } from '@/hooks/useDeleteUser'
import Button from '@/components/Button'
import Modal from '@/components/Modal'
import ConfirmModal from '@/components/ConfirmModal'
import UserForm from '@/components/UserForm'
import type { User } from '@/types/user'
import { USER_FIELDS, type CreateUserDto } from '@/services/userService'
import { getErrorMessage, getFieldErrors } from '@/utils/apiError'

export default function HomePage() {
  const [formOpen, setFormOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [deletingUser, setDeletingUser] = useState<User | null>(null)

  const { data, isLoading, error } = useUsers()
  const createUser = useCreateUser()
  const updateUser = useUpdateUser()
  const deleteUser = useDeleteUser()

  const submitError = editingUser ? updateUser.error : createUser.error
  const fieldErrors = useMemo(() => getFieldErrors(submitError, USER_FIELDS), [submitError])
  const hasFieldErrors = Object.keys(fieldErrors).length > 0

  const openCreate = () => {
    setEditingUser(null)
    setFormOpen(true)
  }

  const openEdit = (user: User) => {
    setEditingUser(user)
    setFormOpen(true)
  }

  const closeForm = () => {
    setFormOpen(false)
    setEditingUser(null)
    createUser.reset()
    updateUser.reset()
  }

  const handleSubmit = (values: CreateUserDto) => {
    if (editingUser) {
      updateUser.mutate({ id: editingUser.id, dto: values }, { onSuccess: closeForm })
    } else {
      createUser.mutate(values, { onSuccess: closeForm })
    }
  }

  const handleConfirmDelete = () => {
    if (!deletingUser) return
    deleteUser.mutate(deletingUser.id, { onSuccess: () => setDeletingUser(null) })
  }

  if (isLoading) return <p>Đang tải...</p>
  if (error) return <p className="text-red-600">{getErrorMessage(error)}</p>

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Danh sách user</h1>
        <Button onClick={openCreate}>Thêm user</Button>
      </div>

      <ul className="space-y-2">
        {data?.map((u) => (
          <li key={u.id} className="flex items-center justify-between rounded bg-white p-3 shadow">
            <span>
              {u.name} - {u.email}
            </span>
            <div className="flex gap-2">
              <Button variant="secondary" onClick={() => openEdit(u)}>
                Sửa
              </Button>
              <Button variant="danger" onClick={() => setDeletingUser(u)}>
                Xóa
              </Button>
            </div>
          </li>
        ))}
      </ul>

      <Modal
        open={formOpen}
        title={editingUser ? 'Sửa user' : 'Thêm user'}
        onClose={closeForm}
      >
        <UserForm
          defaultValues={editingUser ?? undefined}
          submitLabel={editingUser ? 'Cập nhật' : 'Lưu'}
          fieldErrors={fieldErrors}
          serverError={submitError && !hasFieldErrors ? getErrorMessage(submitError) : undefined}
          onSubmit={handleSubmit}
          onCancel={closeForm}
          submitting={createUser.isPending || updateUser.isPending}
        />
      </Modal>

      <ConfirmModal
        open={deletingUser !== null}
        title="Xóa user"
        message={`Bạn có chắc muốn xóa "${deletingUser?.name}"? Thao tác này không thể hoàn tác.`}
        loading={deleteUser.isPending}
        onConfirm={handleConfirmDelete}
        onClose={() => setDeletingUser(null)}
      />
    </div>
  )
}