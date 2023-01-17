import axios from 'axios'

const API_URL = 'http://localhost:8000/'

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL+"Register", userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + 'Login', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

const sendEmail = async (Data) => {
  //console.log(Data)
const response = await axios.post(API_URL+"sendemail", Data)

if (response.data) {
  localStorage.setItem('user', JSON.stringify(response.data))
}
console.log(response)
return response.data
}

// Logout user
const logout = () => {
  localStorage.removeItem('user')
}

const authService = {
  register,
  logout,
  login,
  sendEmail,
}

export default authService