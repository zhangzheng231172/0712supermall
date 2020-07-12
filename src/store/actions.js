const actions = {

}

export default actions




// import {
//   Add_COUNTER,Add_TO_CART
// } from "./mutation-types";
//
// const actions = {
//   addCart(context,product){
//     // console.log(state.cartList)
//     context.state.cartList.push(product)
//     // 1.info为新添加的商品对象，查看是否添加过
//     const oldProduct = context.state.cartList.find(item => item.iid === product.iid)
//
//     // 2.+1或者新添加
//     if (oldProduct) {
//       // oldProduct.count += 1
//       context.commit('addCounter',oldProduct)
//     } else {
//       product.count = 1
//       product.checked = true
//       // context.state.cartList.push(product)
//       context.commit('addToCart',product)
//       console.log(context.state.cartList)
//       console.log(product.count)
//     }
//   }
// }
//
// export default actions

