import logo from './logo.svg';
import './App.css';
import { Videohome } from './components/Video-home'
import { UserLogin } from './components/User-Login';
import { RegisterUser } from './components/Register-User';
import { AdminDashboard } from './components/admin-dashboard';
import {BrowserRouter , Route, Routes} from "react-router-dom"
import { VideoDashboard } from './components/Add-Video-Dashboard';
import { AdminLogin } from './components/Admin-Login';
import { AddCategory } from './components/Add-Category';
import { EditDash } from './components/Edit-Dashboard';
import { UserDashboard } from './components/User-Dashboard';
import { Video } from './components/Video';
import { CookiesProvider } from 'react-cookie';
import { LikedVideos } from './components/Liked-Videos';
import { WatchLaterVideos } from './components/Watch-Later';
import { HistoryVideos } from './components/History';
function App() {
  return (
 <div id='entry-point'>

 <BrowserRouter>
 
  <Routes>

  <Route path="/" element={<Videohome></Videohome>}> </Route>
  <Route path="/user-login" element={<UserLogin></UserLogin>}> </Route>
  <Route path="/register-user" element={<RegisterUser></RegisterUser>}> </Route>
  <Route path="/admin-dashboard" element={<AdminDashboard></AdminDashboard>}> </Route>
  <Route path="/add-video-dashboard" element={<VideoDashboard></VideoDashboard>}> </Route>
  <Route path="/admin-login" element={<AdminLogin></AdminLogin>}> </Route>
  <Route path="/add-category" element={<AddCategory></AddCategory>}> </Route>
  <Route path="/edit-video/:id" element={<EditDash></EditDash>}> </Route>
  <Route path="/user-dashboard" element={<UserDashboard></UserDashboard>}> </Route>
  <Route path="/video-playing/:id" element={<Video></Video>}> </Route>
  <Route path="/liked-videos/:userid" element={<LikedVideos></LikedVideos>}> </Route>
  <Route path="/watchlater-videos/:userid" element={<WatchLaterVideos></WatchLaterVideos>}> </Route>
  <Route path="/history/:userid" element={<HistoryVideos></HistoryVideos>}> </Route>

 

  </Routes>
 </BrowserRouter>


 </div>
  );
}

export default App;
