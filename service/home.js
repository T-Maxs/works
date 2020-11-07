import request from "./network"

export function homeSwiper(){
  return request({
    url:"/home/swiperdata"
  })
}

export function homeFollor(){
  return request({
    url:"/home/floordata"
  })
}