import "../Add-Category.css"
import { NavBar } from "./NavBar"
import { Link,useNavigate } from "react-router-dom"
import { Formik ,useFormik } from "formik"
import axios from "axios"
import { useState ,useEffect } from "react"
import * as yup from "yup"


export function AddCategory()
{  const [categories,setcategory] = useState([]);

   
    let navigate = useNavigate();


 
  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_API_URL}/get-categories`).then(response => {
      setcategory(response.data);
      
  })
  },[])
  const categoryIds = categories.map(cat => String(cat.CategoryId));


 
  const formik = useFormik(
    {
        initialValues:{ CategoryId:"",CategoryName:"" },
        validationSchema:yup.object({ CategoryId: yup.string().required('Id is Required').notOneOf(categoryIds,'Already Taken')}),
        onSubmit:(category)=>{
           
          axios.post(`${process.env.REACT_APP_API_URL}/add-category`,category).then(()=>{
            
            navigate("/admin-dashboard");
          })
        }
    }
  )

    return (
        <div id="add-category-con">
              <nav className="px-3" >
                <div  ><span id="title" >StreamVault</span></div>
                <div id="nav-menu">
                  <Link  to="/register-user" style={{textDecoration:"none",color:"white"}} id="createLink">create account</Link>
                 <Link  to="/user-login"style={{textDecoration:"none",color:"white"}} id="loginLink" >user login</Link>
                </div>
                <div>

                    <Link  to="/" className="admin-btn" id="admin-accessBtn">Go Back</Link>
                </div>
            </nav> 
             
     <div id="add-category-sub-con">
      
       <form onSubmit={formik.handleSubmit}  id="add-category-form-con">

        <dl id="categoryform-dl">
            <dt id="categoryID">ENTER CATEGORY ID</dt>
            <dd><input type="text" name="CategoryId" onChange={formik.handleChange} className="form-control" placeholder="Enter Category Id" /></dd>
            <dd><span className="text-danger" >{formik.errors.CategoryId}</span></dd>
            <dt id="categoryName" >ENTER CATEGORY NAME</dt>
            <dd><input type="text" name="CategoryName" onChange={formik.handleChange} className="form-control" placeholder="Enter Category Name" /></dd>
            <dd><button  id="saveCategoryBtn" className="btn btn-success me-1">SAVE CATEGORY</button><Link to="/admin-dashboard" className="btn btn-danger" id="goBackBtn">Go Back</Link></dd>
        </dl>
       </form>

     </div>

        </div>
    )
}