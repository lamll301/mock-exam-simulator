import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// Markup theo login_hide_navbar.html; style do CSS gốc Limitless lo.
export default function LoginPage() {
  const navigate = useNavigate()
  const [remember, setRemember] = useState(true)
  // TODO: gọi API đăng nhập thật
  function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.currentTarget))
    console.log('login', data)
    navigate('/')
  }

  return (
    <div className="page-content">
      <div className="content-wrapper">
        <div className="content d-flex justify-content-center align-items-center">
          <form className="login-form" onSubmit={handleLogin}>
            <div className="card mb-0">
              <div className="card-body">
                <div className="text-center mb-3">
                  <i className="icon-reading icon-2x text-slate-300 border-slate-300 border-3 rounded-round p-3 mb-3 mt-1" />
                  <h5 className="mb-0">Login to your account</h5>
                  <span className="d-block text-muted">Your credentials</span>
                </div>

                <div className="form-group form-group-feedback form-group-feedback-left">
                  <input type="text" name="username" className="form-control" placeholder="Username" />
                  <div className="form-control-feedback">
                    <i className="icon-user text-muted" />
                  </div>
                </div>

                <div className="form-group form-group-feedback form-group-feedback-left">
                  <input type="password" name="password" className="form-control" placeholder="Password" />
                  <div className="form-control-feedback">
                    <i className="icon-lock2 text-muted" />
                  </div>
                </div>

                <div className="form-group d-flex align-items-center">
                  <div className="form-check mb-0">
                    <label className="form-check-label">
                      <div className="uniform-checker">
                        <span className={remember ? 'checked' : ''}>
                          <input
                            type="checkbox"
                            name="remember"
                            className="form-input-styled"
                            checked={remember}
                            onChange={(e) => setRemember(e.target.checked)}
                          />
                        </span>
                      </div>
                      Remember
                    </label>
                  </div>
                  <a href="#" className="ml-auto">Forgot password?</a>
                </div>

                <div className="form-group">
                  <button type="submit" className="btn btn-primary btn-block">
                    Sign in <i className="icon-circle-right2 ml-2" />
                  </button>
                </div>

                <div className="form-group text-center text-muted content-divider">
                  <span className="px-2">or sign in with</span>
                </div>

                <div className="form-group text-center">
                  <button type="button" className="btn btn-outline bg-indigo border-indigo text-indigo btn-icon rounded-round border-2"><i className="icon-facebook" /></button>{' '}
                  <button type="button" className="btn btn-outline bg-pink-300 border-pink-300 text-pink-300 btn-icon rounded-round border-2 ml-2"><i className="icon-dribbble3" /></button>{' '}
                  <button type="button" className="btn btn-outline bg-slate-600 border-slate-600 text-slate-600 btn-icon rounded-round border-2 ml-2"><i className="icon-github" /></button>{' '}
                  <button type="button" className="btn btn-outline bg-info border-info text-info btn-icon rounded-round border-2 ml-2"><i className="icon-twitter" /></button>
                </div>

                <div className="form-group text-center text-muted content-divider">
                  <span className="px-2">Don't have an account?</span>
                </div>

                <div className="form-group">
                  <Link to="#" className="btn btn-light btn-block">Sign up</Link>
                </div>

                <span className="form-text text-center text-muted">
                  By continuing, you're confirming that you've read our <a href="#">Terms &amp; Conditions</a> and{' '}
                  <a href="#">Cookie Policy</a>
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
