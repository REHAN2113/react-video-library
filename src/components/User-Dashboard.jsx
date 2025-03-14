import "../User-Dashboard.css"
import axios from "axios"
import { useState, useEffect, use } from "react"
import { Link } from "react-router-dom";

import { useCookies } from "react-cookie";
import { Formik, useFormik } from "formik";

export function UserDashboard() {

  const [cookies, setCookie, removeCookie] = useCookies('userid');

  const [categories, setcategories] = useState([]);
  const [videos, setvideos] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredTitles, setFilteredTitles] = useState([]);
  const [AllVideos, setAllVideos] = useState([]);
  const [empty, setempty] = useState(false);
  var VideoTitle = [];

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/get-categories`).then(response => {
      setcategories(response.data);


    })
    axios.get(`${process.env.REACT_APP_API_URL}/get-videos`).then(response => {
      setvideos(response.data);
      setAllVideos(response.data);

    });


  }, [])

  AllVideos.map((video) => {
    VideoTitle.push(video.Title);

  })


  function handleChange(e) {
    console.log(e.target.value);
    if (e.target.value == 0) {
      axios.get(`${process.env.REACT_APP_API_URL}/get-videos`).then(response => {
        setvideos(response.data);
        if (response.data.length == 0) {
          setempty(true);
        }
        else {
          setempty(false);
        }
      })
    }
    else {
      axios.get(`${process.env.REACT_APP_API_URL}/filter-category/${e.target.value}`).then(response => {

        setvideos(response.data);
        if (response.data.length == 0) {
          setempty(true);
        } else {
          setempty(false);
        }
      })
    }
  }
  const handleChangeSearch = (e) => {
    const value = e.target.value;
    setSearchText(value);

    // If input is empty, clear suggestions
    if (value === "") {
      setFilteredTitles([]);
      return;
    }

    // Filter matching video titles
    const matches = VideoTitle.filter((title) =>
      title.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredTitles(matches);
  };

  function handleSearchSubmit(title) {

    axios.get(`${process.env.REACT_APP_API_URL}/get-videoby-title/${title}`).then(response => {
      setvideos(response.data);
    })
  }
  function handleBlur() {
    filteredTitles.length = 0;
  }

  return (
    <div id="user-dashboard">

      <header id="user-dash-header" className="px-3">
        <div><span className="fw-bold" id="title">StreamVault</span></div>
        <div id="user-nav-middle" className="w-50" >

          <div id="user-nav-middle-sub" className="input-group">
            <input id="inputSearchUser" onBlur={handleBlur} value={searchText} onChange={handleChangeSearch} placeholder="Search" name="userSearch" type="text" className="form-control" />
            <button id="userSearchBtn" className="btn btn-primary"><span className="bi bi-search"></span></button>
          </div>
          {filteredTitles.length > 0 && (
            <ul
              style={{
                position: "absolute",
                width: "49%",
                background: "white",
                border: "1px solid #ccc",
                borderTop: "none",
                listStyle: "none",
                padding: "0",
                margin: "0",
                maxHeight: "200px",
                overflowY: "auto",
                boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                borderRadius: "5px",
                zIndex: "10"
              }}
            >
              {filteredTitles.map((title, index) => (
                <li
                  key={index}
                  style={{
                    padding: "8px",
                    cursor: "pointer",
                    borderBottom: "1px solid gray",
                    color: "black"
                  }}
                  onClick={() => handleSearchSubmit(title)} // Set input value on click
                >
                  {title}
                </li>
              ))}
            </ul>
          )}
        </div>
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
                <span id="SelectCategoryTitle" className="text-light fw-bold "> Select Category</span>
              </div>
              <div className="p-3">
                <select onChange={handleChange} name="" id="userDash-SelectCatgegory" className="form-select">
                  {
                    categories.map(category => <option key={category.CategoryId} value={category.CategoryId}>{category.CategoryName}</option>)
                  }

                </select>
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
                <h1 className="text-light">No Videos Yet !</h1>
              </div>
            }

          </div>
        </div>
      </div>

    </div>
  )
}