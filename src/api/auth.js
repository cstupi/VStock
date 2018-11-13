import axios from 'axios';
import config from '~/config.js';
'use strict';
var url = config.Api;
const DEFAULT_HEADERS = {
  'Content-Type': 'application/json'
}
function getHeaders(multipart = false) {
  let defaultHeaders = DEFAULT_HEADERS

  if (multipart) {
    defaultHeaders = {}
  }

  if (localStorage.token) {
    defaultHeaders = {
      'Authorization': `JWT ${localStorage.token}`,
      ...defaultHeaders
    }
  }

  return defaultHeaders
}
export async function Login(user, password){
  let res = await axios.post(`${url}/api/user/login`,{ "Email": user, "Password": password})
  if(res.status === 200){
    console.log(res.data)
    localStorage.token = res.data.Token
    return res.data
  }
  if(res.status === 401)
    return null
  throw `Login error`
}

export async function Game(){
  let res = await axios.get(`${url}/api/game`,{
    headers: {
      'Authorization': `${localStorage.token}`
    }
  })
  if(res.status === 401)
    throw `Unauthenticated`
  return res.data;
}