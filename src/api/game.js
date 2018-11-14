import axios from 'axios';
import config from '~/config.js';
'use strict';
var url = config.Api;

export async function ListGames(){
  let res = await axios.get(`${url}/api/game`,
    { headers: { 'Authorization': `${localStorage.token}` } }
  )
  if(res.status === 401)
    throw `Unauthenticated`
  return res.data;
}

export async function GetGame(id){
  let res = await axios.get(`${url}/api/game/${id}`,
    { headers: { 'Authorization': `${localStorage.token}` } });
  if(res.status == 200)
    return res.data
  if(res.status == 500)
    throw `Server error`
  if(res.status == 404)
    return null
  throw `Bad game request`
} 
export async function CreateGame(name, startingValue, password){
  let res = await axios.post(`${url}/api/game`,
    { Name: name, StartingValue: startingValue, Password: password },
    { headers: { 'Authorization': localStorage.token } } 
  )
  if(res.status === 401)
    throw `Unauthenticated`
  if(res.status === 200)
    return res.data
  throw `Error creating game: ${res}`
}

export default {
  ListGames,
  GetGame,
  CreateGame
}