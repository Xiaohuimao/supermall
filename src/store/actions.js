import {
  ADD_COUNTER,
  ADD_TO_CART,
} from './mutation-types.js'

export default {
  addCart(context,payload) {
    // 1,查找之前数组中是否有该商品
    let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
    // let oldProduct = null;
    // for (let item of context.state.cartList) {
    //   if (item.iid === payload.iid) {
    //     oldProduct = item
    //   }
    // }
    console.log(oldProduct)
    // 2,判断oldProduct
    if (oldProduct) {
      // oldProduct.count += 1
      context.commit(ADD_COUNTER,oldProduct)
    }else {
      payload.count = 1
      // state.cartList.push(payload)
      context.commit(ADD_TO_CART,payload)
    }
  }
}