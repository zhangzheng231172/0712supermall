// const getters = {
//    cartCount(state){
//      return state.cartList.length
//    },
//   cartList(state){
//     return state.cartList
//   }
//
//
// }

// export default getters

const getters = {
  cartList(state) {
    console.log(state.cartList)
    return state.cartList
  },
  cartCount(state, getters) {
    return getters.cartList.length
  }
}

export default getters
