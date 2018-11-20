import axios from 'axios';
import config from '~/config.js';
'use strict';
var url = config.Api;

export async function Login(user, password){
  if(!user || !password)
    throw `User and Password required`
  let res = await axios.post(`${url}/api/user/login`,{ "Email": user, "Password": password})
  if(res.status === 200){
    localStorage.token = res.data.Token
    localStorage.User = JSON.stringify(res.data)
    return res.data
  }
  if(res.status === 401)
    return null
  throw `Login error`
}

export async function Register(user, password){
  let res = await axios.post(`${url}/api/user/register`,
    { "Email": user, "Password": password},
    { headers: { 'Authorization': `${localStorage.token}` }
  })
  if(res.status === 400)
    throw `Invalid Data`
  if(res.status === 204)
    return await Login(user,password);
  throw `Register error`
}
export default {
  Login,
  Register
}