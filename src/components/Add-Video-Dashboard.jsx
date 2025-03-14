
import { Formik, useFormik } from "formik"
import axios from "axios"
import { NavBar } from "./NavBar"
import "../Add-Video-Dash.css"
import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import * as yup from "yup"

export function VideoDashboard() {

    const [categories, setcategory] = useState([{ CategoryId: 0, CategoryName: "" }]);
    const [videos, setvideos] = useState([]);

    const videoIds = videos.map(vidId => String(vidId.VideoId));

    let navigate = useNavigate();

    useEffect(() => {

        axios.get(`${process.env.REACT_APP_API_URL}/get-categories`).then(response => {
            setcategory(response.data);
        })
        axios.get(`${process.env.REACT_APP_API_URL}/get-videos`).then(response => {
            setvideos(response.data);
        })

    }, [])

    const formik = useFormik(
        {
            initialValues: {
                VideoID: 0,
                Title: "",
                Url: "",
                Description: "",
                CategoryId: 0,
                Likes: 0,
                Views: 0,
                Dislikes: 0,
                Comments: []
            },
            validationSchema: yup.object({
                VideoID: yup.string().required('Id is Required').notOneOf(videoIds, "Already Taken"),
                Title: yup.string().required('Title is Required'),
                Url: yup.string().required('Url is Required'),
                Description: yup.string().required('Description is Required'),
                Views: yup.string().required('Views is Required'),
                Likes: yup.string().required('Likes is Required'),
                Dislikes: yup.string().required('Dislikes is Required'),
                CategoryId: yup.number()
    .notOneOf([0], 'Select Specific Category') // Ensures CategoryId is not 0
    .required('CategoryId is required')

            })
            ,
            onSubmit: (data) => {
                axios.post(`${process.env.REACT_APP_API_URL}/add-video`, data);
                navigate("/admin-dashboard");
            }

        }
    )



    return (


        <div id="add-video-dash-con">
            <nav className="px-3" >
                <div  ><span id="title" >StreamVault</span></div>
                <div id="nav-menu">
                  <Link  to="/register-user" style={{textDecoration:"none",color:"white"}}>create account</Link>
                 <Link  to="/user-login"style={{textDecoration:"none",color:"white"}} >user login</Link>
                </div>
                <div>

                    <Link  to="/" className="admin-btn" id="admin-accessBtn">Go Back</Link>
                </div>
            </nav>
            <div id="add-video-sub-con">

                <form id="add-video-form" onSubmit={formik.handleSubmit} >

                    <dl  id="add-video-form-dl">
                        <dt >ENTER VIDEO ID</dt>
                        <dd>
                            <input
                                name="VideoID"
                                type="number"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}  // ✅ Tracks "touched" state
                                className="form-control"
                                placeholder="enter video id"
                            />
                        </dd>
                        <dd>

                            <span className="text-danger">{formik.errors.VideoID}</span>

                        </dd>

                        <dt >ENTER VIDEO TITLE</dt>
                        <dd>
                            <input
                                name="Title"
                                type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="form-control"
                                placeholder="enter video title"
                            />
                        </dd>
                        <dd>
                            {formik.errors.Title && formik.touched.Title && (
                                <span className="text-danger">{formik.errors.Title}</span>
                            )}
                        </dd>

                        <dt >ENTER VIDEO URL</dt>
                        <dd>
                            <input
                                name="Url"
                                type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="form-control"
                                placeholder="enter video url"
                            />
                        </dd>
                        <dd>
                            {formik.errors.Url && formik.touched.Url && (
                                <span className="text-danger">{formik.errors.Url}</span>
                            )}
                        </dd>

                        <dt >ENTER VIDEO DESCRIPTION</dt>
                        <dd>
                            <input
                                name="Description"
                                type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="form-control"
                                placeholder="enter video description"
                            />
                        </dd>
                        <dd>
                            {formik.errors.Description && formik.touched.Description && (
                                <span className="text-danger">{formik.errors.Description}</span>
                            )}
                        </dd>

                        <dt >SELECT CATEGORY TYPE</dt>
                        <dd>
                            <select
                                name="CategoryId"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="form-select"
                                id="SelectCategory"
                            >

                                {categories.map(category =>
                                     (
                                        <option value={category.CategoryId} key={category.CategoryId}>
                                            {category.CategoryName}
                                        </option>
                                    ) 
                                )}

                            </select>
                        </dd>
                        <dd>
                            {formik.errors.CategoryId && formik.touched.CategoryId && (
                                <span className="text-danger">{formik.errors.CategoryId}</span>
                            )}
                        </dd>

                        <dt >VIEWS</dt>
                        <dd>
                            <input
                                name="Views"
                                type="number"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="form-control"
                                placeholder="enter views"
                            />
                        </dd>
                        <dd>
                            {formik.errors.Views && formik.touched.Views && (
                                <span className="text-danger">{formik.errors.Views}</span>
                            )}
                        </dd>

                        <dt >LIKES</dt>
                        <dd>
                            <input
                                name="Likes"
                                type="number"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="form-control"
                                placeholder="enter likes"
                            />
                        </dd>
                        <dd>
                            {formik.errors.Likes && formik.touched.Likes && (
                                <span className="text-danger">{formik.errors.Likes}</span>
                            )}
                        </dd>

                        <dt >DISLIKES</dt>
                        <dd>
                            <input
                                name="Dislikes"
                                type="number"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="form-control"
                                placeholder="enter dislikes"
                            />
                        </dd>
                        <dd>
                            {formik.errors.Dislikes && formik.touched.Dislikes && (
                                <span className="text-danger">{formik.errors.Dislikes}</span>
                            )}
                        </dd>

                        <button  type="submit" className="btn btn-success Btns">ADD</button>
                        <Link to="/admin-dashboard" className="btn btn-danger Btns">Back</Link>
                    </dl>

                </form>

            </div>

        </div>
    )
}