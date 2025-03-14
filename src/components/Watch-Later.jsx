import { useParams } from "react-router-dom"

import "../User-Dashboard.css"
import axios from "axios"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";


export function WatchLaterVideos() {

  var { userid } = useParams();

  const [categories, setcategories] = useState([]);
  const [videos, setvideos] = useState([]);
  const [empty, setempty] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies("userid");
  useEffect(() => {

    axios.get(`${process.env.REACT_APP_API_URL}/get-watchlater-videos/${userid}`).then(response => {
      setvideos(response.data);
      if (response.data.length == 0) {
        setempty(true);
      }

    })
  }, [])



  return (
    <div id="user-dashboard">

      <header id="user-dash-header" className="px-4">
        <div><span className="fw-bold"id="webTitle">StreamVault</span></div>
       
        <div> <Link id="logoutBtn" className="btn btn-danger" to="/">LOG OUT</Link> </div>
      </header>

      <div id="user-dashboard-grid">
        <div id="nav-panel">
          <div id="menu-con">
            <div className="btns-con"><Link id="nav-item-1" to="/user-dashboard" className="btn btn-light btns bi bi-house"> Home</Link></div>
            <div className="btns-con" ><Link id="nav-item-2" to={`/liked-videos/${cookies['userid']}`} className="btn btn-light btns  bi bi-hand-thumbs-up"> Liked's</Link></div>
            <div className="btns-con"><Link id="nav-item-3" to={`/watchlater-videos/${cookies['userid']}`} className="btn btn-danger btns bi bi-clock"> Watch Later</Link></div>
            <div className="btns-con"><Link id="nav-item-4" to={`/history/${cookies['userid']}`} className="btn btn-light btns bi bi-clock-history"> History</Link></div>
          </div>
          <div id="user-dash-category-con">
            <div id="user-dash-category-sub-con">
              <div className="text-center pt-3">
                <span id="SelectCategoryTitle" className="text-light fw-bold "></span>
              </div>
              <div className="p-3 text-light fw-bold ">
                <div id="pageTitle" className="text-center"> Watch Later Videos</div>
                <div className="text-center"> <span className="bi bi-arrow-right"></span> </div>
              </div>
            </div>
          </div>
        </div>
        <div id="user-display-videos-con">

          <div id="user-display-videos-sub-con">

            {
              (!empty) ? videos.map(video => <div className="card text-light card-class" style={{ backgroundColor: "black" }} key={video.VideoId}>

                <div className="card-header card-header-class">
                  <iframe style={{ height: "100%", width: "100%" }} src={video.Url} ></iframe>
                </div>
                <div className="card-body card-body-class">
                  <div className="fw-bold card-title-class"><span>{video.Title}</span></div>
                  <div id="viewsCount" ><span className="bi bi-eye" > Views {video.Views}</span> <span className="bi bi-hand-thumbs-up ms-3"> Likes {video.Likes}</span></div>
                  <div className="text-end"><Link to={`/video-playing/${video.VideoId}`} className="btn btn-warning bi bi-play-fill watchBtn"> Watch</Link></div>
                </div>
              </div>) : <div style={{ height: "100%", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <h1 className="text-light" style={{fontSize:"24px"}}>No Videos Yet !</h1>
              </div>
            }

          </div>
        </div>
      </div>

    </div>
  )
}