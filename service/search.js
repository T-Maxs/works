import request from "./network"

export function searchGoods(query){
  return request({
    url:"/goods/qsearch",
    data:{
      query,
    }
  })
}