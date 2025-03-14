import { NavBar } from "./NavBar"
import "../Admin-Dashboard.css"
import { Formik, useFormik } from "formik"
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { yup } from "yup"

export function AdminDashboard() {
    const [userConfirmed, setUserConfirm] = useState();
    let navigate = useNavigate();



    function handleDeleteClick(e) {
        var confirmDel = window.confirm("Are You Sure");


        if (confirmDel) {
            axios.delete(`${process.env.REACT_APP_API_URL}/delete-video/${e.target.id}`).then(() => {
                axios.get(`${process.env.REACT_APP_API_URL}/get-videos`).then(response => {
                    setvideos(response.data);
                })
            })
        }


    }


    function handleChangeCat(e) {

        axios.get(`${process.env.REACT_APP_API_URL}/filter-category/${e.target.value}`).then(response => {

            setvideos(response.data);
        })
    }



    const [categories, setcategory] = useState([{ CategoryId: 0, CategoryName: "" }]);


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

    useEffect(() => {

        axios.get(`${process.env.REACT_APP_API_URL}/get-categories`).then(response => {
            setcategory(response.data);

        })

        axios.get(`${process.env.REACT_APP_API_URL}/get-videos`).then(response => {
            setvideos(response.data);

        })
    }, [])

    return (
        <div id="admin-dashboard-con">
            <nav className="px-3" >
                <div  ><span id="title" >StreamVault</span></div>
                <div id="nav-menu">
                    <Link to="/register-user" style={{ textDecoration: "none", color: "white" }}>create account</Link>
                    <Link to="/user-login" style={{ textDecoration: "none", color: "white" }} >user login</Link>
                </div>
                <div>

                    <Link to="/" className="admin-btn" id="admin-accessBtn">Go Back</Link>
                </div>
            </nav>

            <div id="admin-sub-dashboard">
                <div id="select-category-con" >
                    <div id="select-category-con-child" >
                        <select className="form-select" name="" id="" onChange={handleChangeCat} >

                            {

                                categories.map(category => <option value={category.CategoryId} key={category.CategoryId} >{category.CategoryName}</option>)}
                        </select>
                    </div>
                    <div className="text-center">
                        <Link to="/add-category" id="addCategory" className="btn btn-success">ADD CATEGORY</Link>
                    </div>
                </div>
                <div id="video-list-con">
                    <div id="video-table-con">


                        <table id="table" className="table table-hover text-center" >
                            <thead>
                                <tr id="table-headings">
                                    <th>Id</th>
                                    <th>Title</th>
                                    <th>Preview</th>
                                    <th>Category</th>
                                    <th colSpan={2}>Modification</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    videos.map(video =>

                                        <tr key={video.VideoId} id="row" >
                                            <td id="videoId">{video.VideoId}</td>
                                            <td   >
                                                <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly" }}>
                                                    <div className="info-text fw-bold">{video.Title}</div>
                                                    <div className="info-text">Likes <span className="bi bi-hand-thumbs-up"></span> - {video.Likes} </div>
                                                    <div className="info-text">Dislikes <span className="bi bi-hand-thumbs-down"></span> - {video.Dislikes}</div>
                                                    <div className="info-text">Views <span className="bi bi-eye"></span> - {video.Views}</div>
                                                </div>
                                            </td>
                                            <td id="iframe"> {video.Url ? < iframe src={video.Url} /> : null}</td>
                                            <td id="categoryName">{categories.find(category => category.CategoryId == video.CategoryId)?.CategoryName || "Loading..."}</td>

                                            <td><Link to={`/edit-video/${video.VideoId}`} className="btn btn-warning bi bi-pen-fill actionBtns" ></Link></td>
                                            <td><button onClick={handleDeleteClick} id={video.VideoId} className="btn btn-danger bi bi-trash actionBtns" ></button></td>

                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>


                    </div>


                </div>

            </div>
            <div id="add-video-btn-con">
                <Link to="/add-video-dashboard" className="btn btn-success" >ADD VIDEO <span className="bi bi-camera-reels"></span></Link>
            </div>




        </div>



    )
}