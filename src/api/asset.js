import axios from 'axios';
import config from '~/config.js';
'use strict';
const url = config.Api;
export async function Quote(symbol){
  let res = await axios.get(`${url}/api/quote/${symbol}`)
  if(res.status == 200)
    return res.data
  throw `Error getting quote: ${res}`
}
export async function Historical(symbol){
  let res = await axios.get(`${url}/api/historical/${symbol}`)
  if(res.status == 200)
    return res.data
  throw `Error getting historical data: ${res}`
}

export async function Search(symbol){
  let res = await axios.get(`${url}/api/search/${symbol}`)
  if(res.status == 200)
    return res.data
    throw `Error searching symbols: ${res}`
}

export default {
  Quote,
  Historical,
  Search
}