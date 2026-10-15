import axios from 'axios'

interface ProblemDetails {
    title?: string
    detail?: string
    message?: string
    errors?: Record<string, string[]>
}

export function getErrorMessage(error: unknown): string {
    if (axios.isAxiosError(error)) {
        if (!error.response) return 'Không kết nối được tới server'

        const data = error.response.data
        if (typeof data === 'string' && data && data.length < 200) return data

        return extractFromProblem(data) ?? `Lỗi ${error.response.status}`
    }

    if (error instanceof Error) return error.message
    return 'Đã có lỗi xảy ra'
}

function extractFromProblem(data?: ProblemDetails): string | undefined {
    if (!data || typeof data !== 'object') return undefined

    // Lỗi validation của ASP.NET Core: { errors: { Email: ["..."] } }
    const firstValidation = data.errors ? Object.values(data.errors).flat()[0] : undefined

    return firstValidation ?? data.detail ?? data.message ?? data.title
}

export function getFieldErrors<T extends string>(
    error: unknown,
    fields: readonly T[],
): Partial<Record<T, string>> {
    const result: Partial<Record<T, string>> = {}
    if (!axios.isAxiosError(error)) return result

    const errors = (error.response?.data as ProblemDetails | undefined)?.errors
    if (!errors) return result

    for (const [key, messages] of Object.entries(errors)) {
        // So khớp không phân biệt hoa thường: "Email" (ASP.NET) khớp "email" (form)
        const field = fields.find((f) => f.toLowerCase() === key.toLowerCase())
        if (field && messages[0]) result[field] = messages[0]
    }
    return result
}