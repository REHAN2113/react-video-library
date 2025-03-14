import { NavBar } from "./NavBar"
import { Link } from "react-router-dom"
import "../Register-User.css"
import { Formik, useFormik } from "formik"
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import * as yup from "yup"

export function RegisterUser() {
  let navigate = useNavigate();
  const [users, setusers] = useState([]);

  const userIDs = users.map((user) => user.UserId);
  const formik = useFormik(
    {
      initialValues: {
        UserId: "",
        UserName: "",
        Password: "",
        Email: "",
        Mobile: ""
      }
      ,
      validationSchema: yup.object({
        UserId: yup.string().required("UserId is Required").notOneOf(userIDs, "Already Taken"),
        UserName: yup.string().required("UserName is Required"),
        Password: yup.string().required("Password is Required").min(5, "Minimum 5 Chars").max(10, "Maximum 10 Chars"),
        Email: yup.string().required("Email is Required").matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid Email"),
        Mobile: yup.string().required("Mobile is Required").matches(/\d{10}/, "Invalid Mobile")
      })
      ,
      onSubmit: (user) => {
        axios.post(`${process.env.REACT_APP_API_URL}/register-user`, user).then(() => {
          alert("Register Successfully");
          navigate("/user-login");
        })
      }
    }

  )

  useEffect(() => {

    axios.get(`${process.env.REACT_APP_API_URL}/get-user`).then(response => {
      setusers(response.data);
    })

  }, [])

  return (
    <div id="register-con">
      <NavBar></NavBar>

      <div id="register-sub-con">
        <div id="create-user-con">

          <form onSubmit={formik.handleSubmit} onBlur={formik.handleBlur} id="create-form">
            <div id="create-heading" className="py-2 " ><span>CREATE ACCOUNT</span></div>
            <dl id="create-form-body" >

              <dt className="label">ENTER USERID</dt>
              <dd className="fields">
                
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} name="UserId" placeholder="enter userid" className="form-control " type="text" />
              
              </dd>
              <dd className="errors"><span className="text-danger errors">{formik.errors.UserId}</span></dd>
              <dt className="label">ENTER USERNAME</dt>
              <dd className="fields">
          
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} name="UserName" placeholder="enter username" type="text" className="form-control " /></dd>
              <dd className="errors">
              {formik.errors.UserName && formik.touched.UserName && (
                                <span className="text-danger errors">{formik.errors.UserName}</span>
                            )}
              
              </dd>
              <dt className="label">ENTER PASSWORD</dt>
              <dd className="fields"><input onChange={formik.handleChange} onBlur={formik.handleBlur} name="Password" placeholder="enter password" type="text" className="form-control " /></dd>
              <dd className="errors">
              {formik.errors.Password && formik.touched.Password && (
                                <span className="text-danger errors">{formik.errors.Password}</span>
                            )}
                
                </dd>
              <dt className="label">ENTER EMAIL</dt>
              <dd className="fields"><input onChange={formik.handleChange} onBlur={formik.handleBlur} name="Email" placeholder="enter email" type="text" className="form-control " /></dd>
              <dd className="errors"> {formik.errors.Email && formik.touched.Email && (
                                <span className="text-danger errors">{formik.errors.Email}</span>
                            )}</dd>
              <dt className="label">ENTER MOBILE</dt>
              <dd className="fields"><input onChange={formik.handleChange} onBlur={formik.handleBlur} name="Mobile" placeholder="enter mobile" type="text" className="form-control" /></dd>
              <dd className="errors"> {formik.errors.Mobile && formik.touched.Mobile && (
                                <span className="text-danger errors">{formik.errors.Mobile}</span>
                            )}</dd>
            
            </dl>
               <div id="btn-con"><button className="btn btn-primary"id="btnSubmit" >SUBMIT</button> <Link className="btn btn-warning" to="/" id="backtoHome" >Back to home</Link></div>
          </form>

        </div>
        <div id="create-quote">
          <span>
            Join Now & Unlock Unlimited Entertainment

          </span>
        </div>
      </div>

    </div>
  )
}