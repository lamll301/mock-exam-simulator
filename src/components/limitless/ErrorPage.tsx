import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import Icon from './Icon'

interface ErrorPageProps {
  /** "404", "500"... hoặc "Offline" */
  code: string
  message: string
  /** Chữ "Offline" dài hơn mã số nên dùng cỡ chữ nhỏ hơn */
  offline?: boolean
}

// TODO: nối với chức năng tìm kiếm thật của app
function handleSearch(e: FormEvent<HTMLFormElement>) {
  e.preventDefault()
}

/**
 * Trang lỗi của template: đứng riêng, không navbar/footer.
 * Bố cục giữa dùng lưới giống Bootstrap (row -10px, cột padding 10px, offset 1/6 và 1/3)
 * để độ rộng khớp template ở mọi cỡ màn hình. Breakpoint Bootstrap: sm 576, md 768, xl 1200.
 */
export default function ErrorPage({ code, message, offline = false }: ErrorPageProps) {
  // Cỡ chữ "error-title" đo từ template (~215px ở màn hình rộng)
  const titleSize = offline
    ? 'text-[5rem] md:text-[8rem]'
    : 'text-[8.4rem] md:text-[13.44rem]'

  return (
    <div className="flex min-h-screen items-center justify-center bg-lt-page p-5 font-sans text-[13px] leading-[1.5385] text-lt-text">
      <div className="w-full">
        {/* Tiêu đề lỗi: chữ trắng nổi (emboss) */}
        <div className="mb-[1.38rem] text-center">
          <h1
            className={`${titleSize} mb-[1.9rem] leading-none font-light text-white [text-shadow:0_0_1px_rgba(0,0,0,0.45),0_5px_8px_rgba(0,0,0,0.18)]`}
          >
            {code}
          </h1>
          <h5 className="text-base leading-[1.5385] font-normal">{message}</h5>
        </div>

        <div className="-mx-2.5 flex flex-wrap">
          <div className="w-full px-2.5 md:ml-[16.6667%] md:w-2/3 [@media(min-width:1200px)]:ml-[33.3333%] [@media(min-width:1200px)]:w-1/3">
            {/* Ô tìm kiếm (input-group lg) */}
            <form onSubmit={handleSearch} className="mb-5 flex">
              <input
                type="text"
                placeholder="Search"
                className="h-10 min-w-0 flex-1 rounded-l-[3px] border border-lt-border bg-white px-4 text-[0.9375rem] outline-none placeholder:text-lt-muted focus:border-lt-primary"
              />
              <button
                type="submit"
                aria-label="Search"
                className="flex h-10 w-10 items-center justify-center rounded-r-[3px] bg-[#546e7a] text-white hover:brightness-95"
              >
                <Icon name="search4" />
              </button>
            </form>

            {/* 2 nút: mỗi nút nửa hàng, khoảng cách 20px */}
            <div className="-mx-2.5 flex flex-wrap">
              <div className="w-full px-2.5 min-[576px]:w-1/2">
                <Link
                  to="/"
                  className="flex h-9 items-center justify-center rounded-[3px] bg-lt-primary text-white hover:brightness-95"
                >
                  <Icon name="home4" className="mr-2" /> Dashboard
                </Link>
              </div>
              <div className="mt-5 w-full px-2.5 min-[576px]:mt-0 min-[576px]:w-1/2">
                <a
                  href="#"
                  className="flex h-9 items-center justify-center rounded-[3px] border border-lt-border bg-[#fafafa] hover:bg-[#f0f0f0]"
                >
                  <Icon name="menu7" className="mr-2" /> Advanced search
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
