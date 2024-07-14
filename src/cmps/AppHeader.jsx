import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { logout } from '../store/actions/userActions';
import { LoginSignup } from './LoginSignup';

export function AppHeader() {

  const user = useSelector((storeState) => storeState.user)

  function onLogout() {
    logout()
      .then(() => {
        console.log('bye');
      })
      .catch((err) => {
        showErrorMsg('OOPs try again')
      })
  }
  return (
    <section className="app-header">
      {user ? (
        < section className="flex space-between align-center container">
          <div>
            <Link to={`/user`}>Hello {user.fullname}</Link>
            <p>Your balance is {user.balance}</p>
            <button onClick={onLogout}>Logout</button>
          </div>
          {todos &&
            <section className="todos-progress">
              <h3>you have finished {formattedPercent}</h3>
              <div className="progress-bar-container" >
                <span>{formattedPercent}</span>
                <div style={{ width: formattedPercent }}>

                </div>
              </div>
            </section>
          }
        </ section >
      ) : (
        <section>
          <LoginSignup />
        </section>
      )}
      <nav className="nav-header" >
        <NavLink to="/">Home</NavLink> |<NavLink to="/toy"> Toys</NavLink> |
        <NavLink to="/dashboard"> Dashboard</NavLink> |
        <NavLink to="/about"> About</NavLink>
      </nav>
      <div className="logo"><img src="src/assets/img/a2b22868-6c0f-4e41-8157-1f665b006419.png" /></div>
    </section>
  )
}
