import request from "./network"

export function goods(cid,pagenum,pagesize=10){
  return request({
    url:"/goods/search",
    data:{
      cid,
      pagenum,
      pagesize
    }
  })
}