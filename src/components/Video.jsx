import "../User-Dashboard.css"
import "../Video.css"
import axios from "axios"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { Formik, useFormik } from "formik";
import * as yup from "yup";


export function Video() {

    var navigate = useNavigate();
    var { id } = useParams();
    var navigate = useNavigate();
    const [categories, setcategories] = useState([]);
    const [video, setvideo] = useState([]);
    const [videos,setvideos] = useState([]);
    const [cookies, setCookie, removeCookie] = useCookies("userid");
    const [interactions, setinterractions] = useState([]);
    const [load, setload] = useState(false);
    const [Liked, setLiked] = useState(false);
    const [unLiked, setunliked] = useState(false);
    const [interactionAdded, setInteractionAdded] = useState(false);
    const [WatchLater, setWatchLater] = useState(false);
    const [unWatchLater, setunWatchLater] = useState(false);
    const effectRun = useRef(false);
    useEffect(() => {
        if (!effectRun.current || load || Liked || unLiked || WatchLater || unWatchLater) {
            effectRun.current = true;
            axios.get(`${process.env.REACT_APP_API_URL}/get-categories`).then(response => {
                setcategories(response.data);
            })
            axios.get(`${process.env.REACT_APP_API_URL}/get-video/${id}`).then(response => {
                setvideo(response.data[0]);
                console.log("checking loading");
            }).then(()=>{
                console.log(video);
            })

            axios.get(`${process.env.REACT_APP_API_URL}/get-interactions`).then(response => {
                setinterractions(response.data);

                const ifUserViewed = response.data.find(interaction =>
                    interaction.VideoId == id && interaction.UserId == cookies["userid"] && interaction.Viewed == true
                );
                
                if (ifUserViewed == undefined) {
                    const newObj = {
                        VideoId: id,
                        UserId: cookies["userid"],
                        Viewed: true,
                        Liked: false,
                        Disliked: false,
                        WatchLater: false
                    };
                    axios.post(`${process.env.REACT_APP_API_URL}/add-interaction`, newObj).then(() => {

                    });

                    axios.put(`${process.env.REACT_APP_API_URL}/viewed/${id}`).then(() => {
                        axios.put(`${process.env.REACT_APP_API_URL}/edit-interaction-view/${id}/${cookies['userid']}`);

                    }).then(()=>{
                        setload(true);
                    })
                    
                }
            });
        }


    }, [load, Liked, unLiked, WatchLater, unWatchLater])


    function handleLikeClick(e) {

        axios.get(`${process.env.REACT_APP_API_URL}/get-interactions`).then(response => {
            setinterractions(response.data);
        }).then(() => {
            const isLiked = interactions.find(interaction =>
                interaction.VideoId == id && interaction.UserId == cookies["userid"] && interaction.Liked == false
            );
            
            if (isLiked) {

                axios.put(`${process.env.REACT_APP_API_URL}/liked/${id}`).then(() => {

                    axios.put(`${process.env.REACT_APP_API_URL}/edit-interaction-like/${id}/${cookies['userid']}`);
                    setLiked(true);
                    setunliked(false);

                })
            }
            else {
                
                axios.put(`${process.env.REACT_APP_API_URL}/disliked/${id}`).then(() => {


                    axios.put(`${process.env.REACT_APP_API_URL}/edit-interaction-dislike/${id}/${cookies['userid']}`);
                    setunliked(true);
                    setLiked(false)

                })
            }
        })



    }
    function WatchLaterClick(e) {
        axios.get(`${process.env.REACT_APP_API_URL}/get-interactions`).then(response => {
            setinterractions(response.data);
        }).then(() => {
            const isWatch = interactions.find(interaction =>
                interaction.VideoId == id && interaction.UserId == cookies["userid"] && interaction.WatchLater == false
            );
           
            var checkWatch;
            if (isWatch) {
                checkWatch = true;
            }
            else {
                checkWatch = false;
            }

            if (isWatch) {


                axios.put(`${process.env.REACT_APP_API_URL}/edit-interaction-watchlater/${id}/${cookies['userid']}/${checkWatch}`).then(() => {
                    setWatchLater(true);
                    setunWatchLater(false);
                })



            }
            else {
                axios.put(`${process.env.REACT_APP_API_URL}/edit-interaction-watchlater/${id}/${cookies['userid']}/${checkWatch}`).then(() => {


                    setunWatchLater(true);
                    setWatchLater(false);
                })

            }
        })

    }
    function Logout() {
        effectRun.current = false;
        removeCookie("userid");
      
      
        navigate("/");
    }

    const formik = useFormik(
        {
            initialValues: { Comments: "", VideoId: id, UserId: cookies["userid"] },
            validationSchema: yup.object(
                {
                    Comments: yup.string().required("Write Something...!").max(100, "Limit Reached")

                }
            ),
            onSubmit: (data) => {
                axios.put(`${process.env.REACT_APP_API_URL}/add-comment`, data).then( ()=>{
                    axios.get(`${process.env.REACT_APP_API_URL}/get-video/${id}`).then(response => {
                        setvideo(response.data[0]);
                    })
                } );
                
               
            }

        }
    )
 


    return (
        <div id="user-dashboard">

            <header id="user-dash-header" className="px-4">
                <div ><span className="fw-bold" id="webTitle">StreamVault</span></div>
               
                <div> <Link id="logoutBtn" className="btn btn-danger" to="/">LOG OUT</Link> </div>
            </header>

            <div id="user-dashboard-grid">
            <div id="nav-panel">
          <div id="menu-con">
            <div className="btns-con"><Link id="nav-item-1" to="/user-dashboard" className="btn btn-danger btns bi bi-house"> Home</Link></div>
            <div className="btns-con" ><Link id="nav-item-2" to={`/liked-videos/${cookies['userid']}`} className="btn btn-light btns  bi bi-hand-thumbs-up"> Liked's</Link></div>
            <div className="btns-con"><Link id="nav-item-3" to={`/watchlater-videos/${cookies['userid']}`} className="btn btn-light btns bi bi-clock"> Watch Later</Link></div>
            <div className="btns-con"><Link id="nav-item-4" to={`/history/${cookies['userid']}`} className="btn btn-light btns bi bi-clock-history"> History</Link></div>
          </div>
          <div id="user-dash-category-con">
            <div id="user-dash-category-sub-con">
              <div className="text-center pt-3">
                
              </div>
              <div className="p-3">
                <Link  to="/user-dashboard" id="nav-item-1" className="btn btn-danger bi bi-arrow-left"> Go Back</Link>
              </div>
            </div>
          </div>
        </div>
                <div id="user-display-videos-con">

                    <div id="user-display-videos-sub-con">

                        <div id="playing-video-con" >
                            <div>
                                <div className="card text-light bg-dark" style={{ width: "100%" }}>

                                    <div className="card-img-top" >
                                        <iframe id="iframevideo" src={video.Url} ></iframe>
                                    </div>
                                    <div className="card-footer" id="card-footer" >
                                        <div>
                                            <span id="videoTitle" className="fw-bold">{video.Title}</span>

                                        </div>
                                        <div id="videoDescription">
                                           {video.Description}
                                        </div>
                                        <div>
                                            <span id="LikesViews" >{video.Likes} Likes & {video.Views} Views</span>
                                        </div>
                                        <div>
                                            <button   className={(interactions.find(interaction => interaction.VideoId == id && interaction.UserId == cookies['userid'] && interaction.Liked == false)) ? "btn btn-dark bi bi-hand-thumbs-up" : "btn btn-dark bi bi-hand-thumbs-up-fill"} id="LikedVideoBtn" onClick={handleLikeClick}> Like</button>
                                            <button  className={(interactions.find(interaction => interaction.VideoId == id && interaction.UserId == cookies['userid'] && interaction.WatchLater == false)) ? "btn btn-dark bi bi-clock-history" : "btn btn-warning bi bi-clock"}  id="WatchLaterBtn" onClick={WatchLaterClick} > Watch Later</button>


                                        </div>
                                    </div>
                                </div>
                                <div>
                                <form onSubmit={formik.handleSubmit} id="comment-input">
                                    <div className="input-group" id="input-group-comment">
                                        <input id="comment-input-field" type="text" onChange={formik.handleChange} name="Comments" placeholder="Your Comment" className="form-control" />
                                        <button className="btn btn-primary" id="sendCommentBtn" >SEND</button>
                                    </div>
                                    <div className="text-center text-danger"> <span id="commentError">{formik.errors.Comments}</span></div>
                                </form>
                                </div>

                            </div>
                            <div id="comments-main-con">
                                <div className=" py-1 fw-bold text-light text-center">Comments</div>
                                <div id="comments-sub-con"  >
                                    <div id="comments"    >
                                        {video?.Comments?.length > 0 ? (
                                            video.Comments.map((comment, index) => (
                                                <div id="user-comment-con" key={index}>
                                                    <div className="mb-2">
                                                        <span id="userid">{comment.UserId} :</span>
                                                    </div>
                                                    <div id="user-comment" style={{wordBreak:"break-all",padding:"10px"}}>
                                                        {comment.Comments}
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-light p-4">No comments yet.</p>
                                        )}
                                    </div>
                                </div>
                               

                            </div>

                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}