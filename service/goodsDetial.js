import request from "./network"

export function goodsDetial(goods_id){
  return request({
    url:"/goods/detail",
    data:{
      goods_id
    }
  })
}