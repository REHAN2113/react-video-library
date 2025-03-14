import "../Videohome.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

export function Videohome() {
 
  const [cookies,setCookie,removeCookie] = useCookies("userid");
  useEffect(()=>{
    
   if(cookies["userid"]!=undefined)
   {
    removeCookie("userid");
    
   }
   else{
   
   }

  })

    return (

        <div id="video-home-con">

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
            <main>

                <div id="container">

                    <div id="heading"  >
                        <span>Welcome to StreamVault Your Ultimate Video Library!</span>
                    </div>
                </div>
                <div id="get-started">
                    <div id="btn-con">

                        <div id="sub-btn-con">
                            <Link to="/user-login" id="signInBtn" className="btn me-3">User Login</Link>
                            <Link to="/register-user" id="createBtn" className="btn"> Create Account</Link>
                        </div>

                    </div>

                </div>

            </main>
        </div>

    )
}