// import {
//   Add_COUNTER,Add_TO_CART
// } from "./mutation-types";
//
// const mutations = {
//   addCounter(state, oldProduct){
//     oldProduct.count++
//     console.log(oldProduct.count)
//   },
//   addToCart(state, product){
//     state.cartList.push(product)
//   }
// }
//
// export default mutations


const mutations = {
  addCart(state, info) {
    console.log(info);
    // 1.查看是否添加过
    const oldInfo = state.cartList.find(item => item.iid === info.iid)
    console.log(oldInfo)

    // 2.+1或者新添加
    if (oldInfo) {
      oldInfo.count ++
      console.log(oldInfo.count)
    } else {
      info.count = 1
      info.checked = true
      state.cartList.push(info)
      console.log(info.count)
    }
  }
}

export default mutations


