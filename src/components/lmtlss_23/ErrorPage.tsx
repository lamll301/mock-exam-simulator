import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'

interface ErrorPageProps {
  code: string
  message: string
}

// TODO: nối với chức năng tìm kiếm thật của app
function handleSearch(e: FormEvent<HTMLFormElement>) {
  e.preventDefault()
}

// Markup copy từ template (error_*.html), bỏ navbar/footer. Style do CSS gốc Limitless lo.
export default function ErrorPage({ code, message }: ErrorPageProps) {
  return (
    <div className="page-content">
      <div className="content-wrapper">
        <div className="content d-flex justify-content-center align-items-center">
          <div className="flex-fill">
            <div className="text-center mb-3">
              <h1 className="error-title">{code}</h1>
              <h5>{message}</h5>
            </div>

            <div className="row">
              <div className="col-xl-4 offset-xl-4 col-md-8 offset-md-2">
                <form onSubmit={handleSearch}>
                  <div className="input-group mb-3">
                    <input type="text" className="form-control form-control-lg" placeholder="Search" />
                    <div className="input-group-append">
                      <button className="btn bg-slate-600 btn-icon btn-lg" type="submit">
                        <i className="icon-search4" />
                      </button>
                    </div>
                  </div>
                </form>

                <div className="row">
                  <div className="col-sm-6">
                    <Link to="/" className="btn btn-primary btn-block">
                      <i className="icon-home4 mr-2" /> Dashboard
                    </Link>
                  </div>
                  <div className="col-sm-6">
                    <a href="#" className="btn btn-light btn-block mt-3 mt-sm-0">
                      <i className="icon-menu7 mr-2" /> Advanced search
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}