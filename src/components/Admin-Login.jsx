import "../Admin-Login.css"
import { NavBar } from "./NavBar"
import { Formik,useFormik } from "formik"
import axios from "axios"
import { Link } from "react-router-dom"
import { useNavigate  } from "react-router-dom"
import { useState ,useEffect } from "react"
export function AdminLogin(){

         const [admin,setadmin] = useState({UserId:"",Password:""});

         
      let navigate = useNavigate();
         const formik = useFormik(
 {
     initialValues:{UserId:"",Password:"" },
     onSubmit:(admin)=>{
        setadmin(admin);
        axios.get(`${process.env.REACT_APP_API_URL}/get-admin`).then(response=>{
           response.data.map(user=>{
             if(user.UserId === admin.UserId && user.Password===admin.Password)
             {
                navigate("/admin-dashboard");
             }else{
                alert("Invalid UserId or Password")
             }
           })
        })

     }
 }

         )


    return (
        <div id="admin-login-con"> 
                
                <nav className="px-3" >
                <div  ><span id="title" style={{color:"skyblue"}} >StreamVault</span></div>
                <div id="nav-menu">
                  <Link  to="/register-user" style={{textDecoration:"none",color:"black"}}>create account</Link>
                 <Link  to="/user-login"style={{textDecoration:"none",color:"black"}} >user login</Link>
                </div>
                <div>

                    <Link  to="/" className="admin-btn" id="admin-accessBtn">Go Back</Link>
                </div>
            </nav>
            
             <div id="admin-login-sub-con">
                   
         <form onSubmit={formik.handleSubmit}  id="admin-login-form">
            <div className="text-center" id="admin-login-title" ><span className="fw-bold" >ADMIN LOGIN</span></div>
              <dl id="admin-login-form-dl">
                <dt>ENTER USERNAME</dt>
                <dd><input type="text" name="UserId" onChange={formik.handleChange} placeholder="enter username" className="form-control"  /></dd>
                <dt>ENTER PASSWORD</dt>
                <dd><input type="text" name="Password" onChange={formik.handleChange} placeholder="enter password" className="form-control" /></dd>
                <dd><button type="submit" id="adminLoginBtn" className="btn btn-success">LOGIN</button></dd>
              </dl>

         </form>

             </div>

        </div>
    )
}