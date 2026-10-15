import { useForm } from 'react-hook-form'
import Input from '@/components/Input'
import Button from '@/components/Button'
import { USER_FIELDS, type CreateUserDto } from '@/services/userService'
import { useEffect } from 'react'

interface UserFormProps {
    defaultValues?: CreateUserDto
    submitLabel?: string
    serverError?: string
    fieldErrors?: Partial<Record<keyof CreateUserDto, string>>
    onSubmit: (values: CreateUserDto) => void
    onCancel: () => void
    submitting?: boolean
}

export default function UserForm({ defaultValues, submitLabel = 'Lưu', serverError, fieldErrors, onSubmit, onCancel, submitting }: UserFormProps) {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<CreateUserDto>({ defaultValues })

    useEffect(() => {
        if (!fieldErrors) return
        USER_FIELDS.forEach((field) => {
            const message = fieldErrors[field]
            if (message) setError(field, { type: 'server', message })
        })
    }, [fieldErrors, setError])

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <Input
                label="Họ tên"
                error={errors.name?.message}
                {...register('name', {
                    required: 'Vui lòng nhập họ tên',
                    minLength: { value: 2, message: 'Tối thiểu 2 ký tự' },
                })}
            />

            <Input
                label="Email"
                type="email"
                error={errors.email?.message}
                {...register('email', {
                    required: 'Vui lòng nhập email',
                    pattern: { value: /^\S+@\S+\.\S+$/, message: 'Email không hợp lệ' },
                })}
            />

            {serverError && (
                <div role="alert" className="rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                    {serverError}
                </div>
            )}

            <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="secondary" onClick={onCancel}>
                    Hủy
                </Button>
                <Button type="submit" loading={submitting}>
                    {submitLabel}
                </Button>
            </div>
        </form>
    )
}