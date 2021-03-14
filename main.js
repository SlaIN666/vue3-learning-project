const app = Vue.createApp({
  data() {
    return {
      cart: [],
      premium: false,
    }
  },
  methods: {
    updateCartAdd(id) {
      this.cart.push(id)
    },
    updateCartRemove(index) {
      this.cart.splice(index, 1)
    },
  },
})
