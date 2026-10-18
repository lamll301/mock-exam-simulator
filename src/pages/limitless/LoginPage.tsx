import type { ComponentProps } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Icon } from '@/components/limitless'

interface LoginForm {
  username: string
  password: string
  remember: boolean
}

// Class màu viết đầy đủ để Tailwind nhận diện (màu lấy từ template Limitless)
const socialButtons = [
  { icon: 'facebook', color: 'border-[#3f51b5] text-[#3f51b5] hover:bg-[#3f51b5]' },
  // { icon: 'dribbble3', color: 'border-[#f06292] text-[#f06292] hover:bg-[#f06292]' },
  { icon: 'google', color: 'border-[#db4437] text-[#db4437] hover:bg-[#db4437]' },
  { icon: 'github', color: 'border-[#546e7a] text-[#546e7a] hover:bg-[#546e7a]' },
  { icon: 'twitter', color: 'border-[#00bcd4] text-[#00bcd4] hover:bg-[#00bcd4]' },
]

// ---------- component nhỏ ----------

interface TextFieldProps extends ComponentProps<'input'> {
  icon: string
  error?: string
}

/** Ô nhập có icon bên trái (form-group-feedback-left của template) */
function TextField({ icon, error, ...inputProps }: TextFieldProps) {
  return (
    <div className="mb-5">
      <div className="relative">
        <input
          {...inputProps}
          className={`h-9 w-full rounded-[3px] border bg-white pr-3.5 pl-11 outline-none placeholder:text-lt-muted focus:border-lt-primary ${
            error ? 'border-lt-danger' : 'border-lt-border'
          }`}
        />
        <Icon
          name={icon}
          className="pointer-events-none absolute top-1/2 left-[0.9rem] -translate-y-1/2 text-lt-muted"
        />
      </div>
      {error && <p className="mt-1 text-xs text-lt-danger">{error}</p>}
    </div>
  )
}

/** Checkbox kiểu uniform của template: ô vuông viền đậm 2px, dấu tick bên trong */
function Checkbox({ label, ...inputProps }: ComponentProps<'input'> & { label: string }) {
  return (
    <label className="flex cursor-pointer items-center gap-[0.6rem]">
      <input type="checkbox" className="peer sr-only" {...inputProps} />
      <span className="flex size-5 items-center justify-center rounded-[3px] border-2 border-[#333] peer-checked:[&>svg]:block peer-focus-visible:ring-2 peer-focus-visible:ring-lt-primary/40">
        <svg className="hidden size-3.5" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth={3}>
          <path d="M4 12.5l5 5L20 6.5" />
        </svg>
      </span>
      {label}
    </label>
  )
}

/** Đường kẻ có chữ ở giữa (content-divider) */
function Divider({ text }: { text: string }) {
  return (
    <div className="mb-5 flex h-5 items-center gap-2 text-lt-muted">
      <span className="h-px flex-1 bg-lt-border" />
      <span>{text}</span>
      <span className="h-px flex-1 bg-lt-border" />
    </div>
  )
}

// ---------- trang chính ----------

export default function LoginPage() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({ defaultValues: { remember: true } })

  // TODO: gọi API đăng nhập ở đây (ví dụ trong src/services), lưu token rồi mới chuyển trang
  async function handleLogin(values: LoginForm) {
    console.log('login', values)
    navigate('/')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-lt-page p-5 font-sans text-[13px] leading-[1.5385] text-lt-text">
      <form onSubmit={handleSubmit(handleLogin)} className="w-80" noValidate>
        <div className="rounded-[3px] border border-lt-border bg-white p-5">
          <div className="mb-5 text-center">
            <div className="mx-auto mt-1 mb-[1.38rem] flex size-[4.8rem] items-center justify-center rounded-full border-[3px] border-[#90a4ae] text-[#90a4ae]">
              {/* Cỡ chữ phải đặt ngay trên icon (icon-2x = 2rem), vì Icomoon tự đặt font-size cho thẻ <i> */}
              <Icon name="reading" className="text-[2rem]" />
            </div>
            <h5 className="text-base leading-[1.5385] font-normal">Login to your account</h5>
            <span className="block text-lt-muted">Your credentials</span>
          </div>

          <TextField
            icon="user"
            type="text"
            placeholder="Username"
            autoComplete="username"
            error={errors.username?.message}
            {...register('username', { required: 'Username is required' })}
          />
          <TextField
            icon="lock2"
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            error={errors.password?.message}
            {...register('password', { required: 'Password is required' })}
          />

          <div className="mb-5 flex items-center">
            <Checkbox label="Remember" {...register('remember')} />
            <a href="#" className="ml-auto text-lt-primary hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mb-5 h-9 w-full rounded-[3px] bg-lt-primary text-white hover:brightness-95 disabled:opacity-60"
          >
            Sign in <Icon name="circle-right2" className="ml-2" />
          </button>

          <Divider text="or sign in with" />

          <div className="mb-5 flex justify-center gap-[0.85rem]">
            {socialButtons.map((b) => (
              <button
                key={b.icon}
                type="button"
                className={`flex size-[2.2rem] items-center justify-center rounded-full border-2 transition-colors hover:text-white ${b.color}`}
              >
                <Icon name={b.icon} />
              </button>
            ))}
          </div>

          <Divider text="Don't have an account?" />

          <a
            href="#"
            className="mb-5 flex h-9 items-center justify-center rounded-[3px] border border-lt-border bg-[#fafafa] hover:bg-[#f0f0f0]"
          >
            Sign up
          </a>

          <p className="text-center text-lt-muted">
            By continuing, you&apos;re confirming that you&apos;ve read our{' '}
            <a href="#" className="text-lt-primary hover:underline">
              Terms &amp; Conditions
            </a>{' '}
            and{' '}
            <a href="#" className="text-lt-primary hover:underline">
              Cookie Policy
            </a>
          </p>
        </div>
      </form>
    </div>
  )
}
