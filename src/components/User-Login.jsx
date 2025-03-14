
import { Link, useNavigate } from "react-router-dom";
import "../User-Login.css"
import { NavBar } from "./NavBar";
import { Formik ,useFormik } from "formik";
import axios from "axios";
import { useState , useEffect } from "react";
import * as yup from "yup"
import { useCookies } from "react-cookie";


export function UserLogin()
{
      const [users, setusers] = useState([]);
    let navigate = useNavigate();

    const [cookies, setCookie, removeCookie] = useCookies('userid');


      useEffect(()=>{
          axios.get(`${process.env.REACT_APP_API_URL}/get-user`).then(response=>{
                  setusers(response.data); 
          })

      },[])

       const formik = useFormik({
        initialValues:{
            UserId:"",
            Password:""
        }
        ,
        onSubmit:(user)=>{
            const isUser = users.find(findUser => findUser.UserId==user.UserId && findUser.Password == user.Password)
            if(isUser)
            {
             
              setCookie("userid",user.UserId);
              navigate("/user-dashboard");

            }
            else{
              alert("wrong userid or password");
            }
        }

       })

    return(
      <div id="user-login-con">
    <NavBar></NavBar>

     <div id="user-login-sub-con">
           <div id="login-form">
             <div id="login-title">
             <span>USER LOGIN</span>
             </div>
             <form onSubmit={formik.handleSubmit} id="formLogin" >
                <dl style={{width:"70%",height:"70%",display:"flex" ,flexDirection:"column" , justifyContent:"space-evenly" }} >
                    <dt>ENTER USERNAME</dt>
                    <dd><input onChange={formik.handleChange} name="UserId" placeholder="enter name" type="text" className="form-control"  /></dd>
                    <dt>ENTER PASSWORD</dt>
                    <dd><input onChange={formik.handleChange} name="Password" type="text" placeholder="enter password" className="form-control" /></dd>
                    <dd><button className="btn btn-success" id="btnLogin">Login</button> <Link id="btnHome" className="btn btn-warning" to="/" >Back to home</Link></dd>
   
                </dl>
             </form>

           </div>
           <div  id="login-quote" >
           Unlimited Videos, Endless Entertainment Explore the World’s Stories at Your Fingertips!   
           </div>
     </div>
      </div>
    )
}