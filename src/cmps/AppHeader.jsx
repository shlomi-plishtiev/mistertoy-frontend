import { useSelector } from 'react-redux'
import { NavLink,Link } from 'react-router-dom'
import { logout } from '../store/actions/userActions';
import { LoginSignup } from '../pages/LoginSignup';

export function AppHeader() {

  const user = useSelector((storeState) => storeState.userModule.loggedInUser)

  async function onLogout() {
    try {
      const exit = await logout()
      console.log(exit, 'bye')
    } catch (err) {
      showErrorMsg('OOPs try again')
    }
  }
  // console.log(user);
  return (
    <section className="app-header">
     
      <nav className="nav-header" >
        <NavLink to="/">Home</NavLink> |<NavLink to="/toy"> Toys</NavLink> |
        <NavLink to="/dashboard"> Dashboard</NavLink> |
        <NavLink to="/about"> About</NavLink>
      </nav>
      <div className="logo"><img src="src/assets/img/a2b22868-6c0f-4e41-8157-1f665b006419.png" /></div>
      {user ? (
        < section className="flex space-between align-center container">
          <div className='logout-header'>
            <Link className='header-a' to={`/user`}>Hello {user.fullname}</Link>
            <button className='header-btn' onClick={onLogout}>Logout</button>
          </div>  
        </ section >
      ) : (
        <section>
          <LoginSignup />
        </section>
      )}
    </section>
  )
}
