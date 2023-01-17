import axios from 'axios'

const API_URL = 'http://localhost:8000/'

// Add Instructor
const addInstructor = async (Data) => {
    //console.log(Data)
  const response = await axios.post(API_URL+"add_instructor", Data)

  if (response.data) {
    localStorage.setItem('instructor', JSON.stringify(response.data))
  }
console.log(response)
  return response.data
}

const addAdmin = async (Data) => {
    //console.log(Data)
  const response = await axios.post(API_URL+"add_admnistrator", Data)

  if (response.data) {
    localStorage.setItem('admin', JSON.stringify(response.data))
  }
console.log(response)
  return response.data
}

const addCorporate = async (Data) => {
  //console.log(Data)
const response = await axios.post(API_URL+"add_corporate", Data)

if (response.data) {
  localStorage.setItem('admin', JSON.stringify(response.data))
}
console.log(response)
return response.data
}

const showRequests = async (Data) => {
  console.log(Data)
const response = await axios.post("http://localhost:8000/view_requests", Data)

if (response.data) {
  localStorage.setItem('admin', JSON.stringify(response.data))
}
console.log(response)
return response.data
}

const allowAccess = async (Data) => {
console.log(Data)
const response = await axios.post("http://localhost:8000/giveaccess", Data)

if (response.data) {
  localStorage.setItem('admin', JSON.stringify(response.data))
}
console.log(response)
return response.data
}


// Logout user
const logout = () => {
  localStorage.removeItem('user')
}



const adminService = {
  logout,
  addInstructor,
  addAdmin,
  addCorporate,
  showRequests,
  allowAccess,
}

export default adminService