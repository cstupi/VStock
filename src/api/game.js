import axios from 'axios';
import config from '~/config.js';
'use strict';
var url = config.Api;

export async function ListGames(userId){
  let u = userId ? `${url}/api/game?user=${userId}` : `${url}/api/game`
  let res = await axios.get(u)
  if(res.status === 401)
    throw `Unauthenticated`
  return res.data;
}

export async function GetGame(id){
  let res = await axios.get(`${url}/api/game/${id}`);
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
    { Name: name, StartingValue: startingValue, Password: password })
  if(res.status === 401)
    throw `Unauthenticated`
  if(res.status === 200)
    return res.data
  throw `Error creating game: ${res}`
}
export async function JoinGame(gameId) {
  let res = await axios.post(`${url}/api/GameMember`, 
    { Game: gameId, IsAdmin: false })
  if(res.status === 401)
    throw `Unauthenticated`
}
export async function LeaveGame(gameId){
  let res = await axios.delete(`${url}/api/GameMember/${gameId}`)
  if(res.status === 401)
    throw `Unauthenticated`
}
export async function ListAssets(gameId, userId){
  let u = `${url}/api/game/${gameId}/portfolio`
  if(userId)
    u += `?user=${userId}`
  let res = await axios.get(u)
  if(res.status === 401)
    throw `Unauthenticated`
  return res.data
}
export default {
  ListGames,
  GetGame,
  CreateGame,
  JoinGame,
  LeaveGame,
  ListAssets
}