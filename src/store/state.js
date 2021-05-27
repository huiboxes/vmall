/**
 * 商城Vuex-state
 */
import storage from '../storage'

export default {
  username: storage.getItem('username') || '',
  cartCount: storage.getItem('cartCount') || 0, //购物车商品数量
}
