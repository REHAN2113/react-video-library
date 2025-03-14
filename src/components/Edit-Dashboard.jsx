import { NavBar } from "./NavBar"
import { VideoDashboard } from "./Add-Video-Dashboard"
import "../Edit-Video-Dash.css"
import { Formik, useFormik } from "formik"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"
import * as yup from "yup"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export function EditDash() {

 
    const [loading, setLoading] = useState(false);
    
    var { id } = useParams();
    
    const [video, setvideo] = useState([{
        VideoId: 0,
        Title: "",
        Url: "",
        Description: "",
        CategoryId: 0,
        Likes: 0,
        Dislikes: 0,
        Views: 0,
        Comments: []
    }]);
    const [videos, setvideos] = useState([{
        VideoId: 0,
        Title: "",
        Url: "",
        Description: "",
        CategoryId: 0,
        Likes: 0,
        Dislikes: 0,
        Views: 0,
        Comments: []
    }]);
    const videoIds = videos.map(vidId => String(vidId.VideoId));
    let navigate = useNavigate();
    const formik = useFormik(
        {
            initialValues: {
                VideoId: 0,
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
                VideoId: yup.string().required('Id is Required').notOneOf(videoIds, "Already Taken"),
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
                axios.put(`${process.env.REACT_APP_API_URL}/edit-video/${id}`, data);
               
               navigate("/admin-dashboard");
               
            }

        }
    )

    
    
       useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API_URL}/get-video/${id}`).then(
            response=>{
                setvideo(response.data[0]);
                formik.setValues(response.data[0]);
                setLoading(true);


            }
        )
        axios.get(`${process.env.REACT_APP_API_URL}/get-videos`).then(
            response=>{
                response.data.map((video)=> {
                    const filteredVideos = response.data.filter(video => video.VideoId != id);
                    setvideos(filteredVideos);
                    
                })

            }
        )
        axios.get(`${process.env.REACT_APP_API_URL}/get-categories`).then(response=>{
             setcategory(response.data);
        })
       },[])

      

 

    const [categories, setcategory] = useState([]);
    return (
        <div style={{ height: "100%" }} id="edit-parent-con">
            <NavBar Theme="text-light"></NavBar>
            {
                loading ? (
                    <div id="edit-con">

                    <div id="edit-con-sub" >
                        <div id="edit-details">
    
                            <form id="add-video-form" onSubmit={formik.handleSubmit} >
    
                                <dl id="form-sub-con">
                                    <dt >ENTER VIDEO ID</dt>
                                    <dd>
                                        <input
                                            name="VideoId"
                                            type="number"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}  // ✅ Tracks "touched" state
                                            className="form-control"
                                            placeholder="enter video id"
                                            value={formik.values.VideoId}
                                        />
                                    </dd>
                                    <dd>
    
                                        <span className="text-danger">{formik.errors.VideoId}</span>
    
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
                                            value={formik.values.Title}
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
                                            value={formik.values.Url}
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
                                            value={formik.values.Description}
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
    
                                    <dt>VIEWS</dt>
                                    <dd>
                                        <input
                                            name="Views"
                                            type="number"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className="form-control"
                                            placeholder="enter views"
                                            value={formik.values.Views}
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
                                            value={formik.values.Likes}
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
                                            value={formik.values.Dislikes}
                                        />
                                    </dd>
                                    <dd>
                                        {formik.errors.Dislikes && formik.touched.Dislikes && (
                                            <span className="text-danger">{formik.errors.Dislikes}</span>
                                        )}
                                    </dd>
    
                                    <button type="submit" className="btn btn-success me-3 Btns" >SAVE</button>
                                    <Link to="/admin-dashboard" className="btn btn-danger Btns">Back</Link>
                                </dl>
    
                            </form>
    
                        </div>
                        <div id="video-thumbnail">
                            <iframe style={{ width: "100%" ,height:"100%" }} src={video.Url} ></iframe>
                        </div>
                    </div>
                </div>
    
                ):(
                    <div style={{height:"100%", display:"flex",justifyContent:'center',alignItems:'center'}}>
                      <span>Loading</span>
                    </div>
                )
            }
        </div>
    )
}