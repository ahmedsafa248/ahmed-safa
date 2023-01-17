import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import Header from './components/Header'
import Instructor from './pages/InstructorDash'
import InstructorSCTSI from './components/InstructorSCTSI'
import InstructorAddCourse from './components/InstructorAddCourse'
import Admin from './pages/AdminDash'
import AddInstructor from './components/AddInstructor';
import AddAdmin from './components/AddAdmin';
import AddCorporate from './components/AddCorporate';
import SendEmail from './components/SendEmail';
import ViewEnrolledCoursesCorp from './components/ViewEnrolledCourses';
import Corporate from './pages/CorporateDash'
import Trainee from './pages/TraineeDash'
import OpenCourse from './components/OpenCourse'
import RateCourse from './components/RateCourse'
import RateInstructor from './components/RateInstructor'
import ReportProblem from './components/ReportProblem'
import ShowRequests from './components/ShowRequests';
//import AllowAccess from './components/AllowAccess';
function App() {
  return (
    <>
    <Router>
    <div className='container'>
      <Header/>
      <Routes>
    <Route path='/' element={<Dashboard/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/instructor' element={<Instructor/>}/>
    <Route path='/instructorViewOwnCourses' element={<InstructorSCTSI/>}/>
    <Route path='/instructorAddCourse' element={<InstructorAddCourse/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/add_instructor' element={<AddInstructor/>}/>
    <Route path='/admin' element={<Admin/>}/>
    <Route path='/add_admin' element={<AddAdmin/>}/>
    <Route path='/add_corporate' element={<AddCorporate/>}/>
    <Route path='/sendemail' element={<SendEmail/>}/>
    <Route path='/viewEnrolledCoursesCorp' element={<ViewEnrolledCoursesCorp/>}/>
    <Route path='/corporate' element={<Corporate/>}/>
    <Route path='/openCourse' element={<OpenCourse/>}/>
    <Route path='/rateCourse' element={<RateCourse/>}/>
    <Route path='/rateinstructor' element={<RateInstructor/>}/>
    <Route path='/reportProblem' element={<ReportProblem/>}/>
    <Route path='/showRequests' element={<ShowRequests/>}/>
   {/* // <Route path='/allowAccess' element={<AllowAccess/>}/> */}
      </Routes>
    </div>
    </Router>
    <ToastContainer/>
    </>
  );
}

export default App;
