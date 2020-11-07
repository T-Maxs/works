import request from "./network"

export function category(){
  return request({
    url:"/categories"
  })
}