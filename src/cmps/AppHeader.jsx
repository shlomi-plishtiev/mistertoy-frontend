import { NavLink } from 'react-router-dom'

export function AppHeader() {
  return (
    <section className="app-header">
      <nav className="nav-header" >
        <NavLink to="/">Home</NavLink> |<NavLink to="/toy"> Toys</NavLink> |
        <NavLink to="/dashboard"> Dashboard</NavLink> |
        <NavLink to="/about"> About</NavLink>
      </nav>
      <div className="logo"><img src="src/assets/img/a2b22868-6c0f-4e41-8157-1f665b006419.png" /></div>
    </section>
  )
}
