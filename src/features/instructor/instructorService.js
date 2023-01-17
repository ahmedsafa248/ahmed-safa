import axios from 'axios'

const API_URL = 'http://localhost:8000/'

// Instructor search own courses using subject title
const instructorSOCTSI = async (Data) => {
   // console.log(Data)
  const response = await axios.post(API_URL+"SearchOwnCourseIns", Data)

  if (response.data) {
    localStorage.setItem('courses', JSON.stringify(response.data))
  }
console.log(response)
  return response.data
}

// Instructor adds a course
const AddCourse = async (Data) => {
    //console.log(Data)
  const response = await axios.post(API_URL+"add_course", Data)

  if (response.data) {
    localStorage.setItem('courses', JSON.stringify(response.data))
  }
console.log(response)
  return response.data
}

// Logout user
const logout = () => {
  localStorage.removeItem('user')
}



const instructorService = {
  logout,
  instructorSOCTSI,
  AddCourse,
}

export default instructorService