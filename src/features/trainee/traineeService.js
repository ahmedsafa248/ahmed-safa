import axios from 'axios'

const API_URL = 'http://localhost:8000/'


const ViewEnrolledCourses = async (Data) => {
    //console.log(Data)
    console.log(Data);
  const response = await axios.post(API_URL+"enrolledin", Data)
  
  if (response.data) {
    localStorage.setItem('trainee', JSON.stringify(response.data))
  }
  console.log(response)
  return response.data
  }

  const rateCourse = async (Data) => {
    //console.log(Data)
  const response = await axios.post(API_URL+"RateCourseInd", Data)
  
  if (response.data) {
    localStorage.setItem('trainee', JSON.stringify(response.data))
  }
  console.log(response)
  return response.data
  }

  const rateInstructor = async (Data) => {
    //console.log(Data)
  const response = await axios.post(API_URL+"RateInstructorInd", Data)
  
  if (response.data) {
    localStorage.setItem('trainee', JSON.stringify(response.data))
  }
  console.log(response)
  return response.data
  }

  const reportProblem = async (Data) => {
    //console.log(Data)
  const response = await axios.post(API_URL+"report_problem", Data)
  
  if (response.data) {
    localStorage.setItem('trainee', JSON.stringify(response.data))
  }
  console.log(response)
  return response.data
  }

// Logout user
const logout = () => {
  localStorage.removeItem('user')
}

const getcoursebyid = async (Data) => {
const response = await axios.post(API_URL+"getById", Data)

if (response.data) {
  localStorage.setItem('trainee', JSON.stringify(response.data))
}
console.log(response)
return response.data
}



const traineeService = {
  ViewEnrolledCourses,
  rateCourse,
  logout,
  getcoursebyid,
  reportProblem,
  rateInstructor,

}

export default traineeService