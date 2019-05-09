
const BASE_API = 'https://syb.qhkltn.com/index.php/Api'
const BASE_IMG = 'https://syb.qhkltn.com/'
// const BASE_ID = app.globalData.id
//获取openid
function getOpenid(a, b, c,id) {
  return BASE_API + `/user/openid?appid=${a}&secret=${b}&code=${c}&admin_id=${id}`
}
//课程列表
function getKcList (a,b,id) {
  return BASE_API + `/Goods/pinkeList?admin_id=${id}&page=${a}&type=${a,b}`
}
//商品列表
function getGoodsList(id){
  return BASE_API + `/goods/pinkeList?admin_id=${id}&page=0`
}
//课程详情
function getKcDetail(a){
  return BASE_API + `/Goods/pinkeDetail?id=${a}`
}
//商品详情
function getGoodsDetail(a) {
  return BASE_API + `/goods/pinkeDetail?id=${a}`
}
//收藏
function like(a,b,id){
  return BASE_API + `/Collectionp/collAdd?admin_id=${id}&goods_id=${a}&openid=${b}`
}
//当前商品是否被收藏
function isLike(a,b,id){
  return BASE_API + `/Goods/colGoods?admin_id=${id}&goods_id=${a}&openid=${b}`
}
//开团1&&参团0
function makeGroup(){
  return BASE_API + `/Goods/pinke_order`
}
//统一下单
function makeOrder(a,b,c){
  return BASE_API + `/Common/pay?ord_id=${a}&openid=${b}&pay_price=${c}`
}
//我的订单（全部）
function myAllOrder(a,id){
  return BASE_API +`/Orderk/orderk?admin_id=${id}&openid=${a}`
}
//我的订单（分类）
function myOrder(a,b,id){
  return BASE_API + `/Orderk/orderStatus?admin_id=${id}&openid=${a}&status=${b}`
}
//订单详情
function orderDetail(a){
  return BASE_API + `/Orderk/orderDetail?ord_bh=${a}`
}
//我的拼团
function myGroup(a,id){
  return BASE_API + `/Orderk/myPin?admin_id=${id}&openid=${a}`
}
//我的收藏
function myLike(a,id){
  return BASE_API + `/Collectionp/collection?admin_id=${id}&openid=${a}`
}
//首页推荐商品
function tuijian(id){
  return BASE_API + `/Goods/recommend?admin_id=${id}`
}
//模板消息(支付成功)
function sendMsg(a,b,d,e,f){
  return BASE_API + `/Common/sendpaymsg?goods_name=${a}&ord_bh=${b}&ord_price=${d}&prepay_id=${e}&openid=${f}`
}
//模板消息(开团、参团成功)
function sendMsg2(a,b){
  return BASE_API + `/common/sendpin_success?&gb_id=${a}&start_time=${b}`
}
//模板消息(倒计时结束，拼团失败)
function sendMsg3(a){
  return BASE_API + `/Common/sendpin_fail?gb_id=${a}`
}
//判断是否拼团成功
function isOk(a){
  return BASE_API + `/common/is_pin_success?gb_id=${a}`
}
//查看该团成员
function checkP(a){
  return BASE_API + `/Orderk/group?gb_id=${a}`
}


// ----------砍价相关接口-------------

//砍价商品列表
function cutList(a,id){
  return BASE_API + `/Goods/bargain?admin_id=${id}&page=${a}`
}

// -----------------------
module.exports = {
  BASE_IMG,
  getOpenid,
  getKcList,
  getKcDetail,
  like,
  isLike,
  makeGroup,
  makeOrder,
  myAllOrder,
  myOrder,
  orderDetail,
  myGroup,
  myLike,
  tuijian,
  sendMsg,
  isOk,
  sendMsg2,
  checkP,
  sendMsg3,
  getGoodsList,
  getGoodsDetail,
  cutList
}