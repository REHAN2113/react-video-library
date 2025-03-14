import { Link } from "react-router-dom"
export function NavBar()

{
    return (
        <nav className="px-3" >
        <div  ><span id="title" >StreamVault</span></div>
        <div id="nav-menu">
          <Link  to="/register-user" style={{textDecoration:"none",color:"white"}}>create account</Link>
         <Link  to="/user-login"style={{textDecoration:"none",color:"white"}} >user login</Link>
        </div>
        <div>

            <Link  to="/admin-login" className="admin-btn" id="admin-accessBtn">Admin Access</Link>
        </div>
    </nav>
    )
}