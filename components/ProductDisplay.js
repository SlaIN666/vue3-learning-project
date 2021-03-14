app.component('product-display', {
  props: {
    premium: {
      type: Boolean,
      required: true,
    },
  },
  template:
    /*html*/
    `<div class="product-display">
      <div class="product-container">
        <div class="product-image">
          <a :href="url">
            <img
              :class="{'disabled-img': !onSale}"
              :src="image"
              alt="image-of-dragX"
            />
          </a>
        </div>

        <div class="product-info">
          <h1 v-if="onSale > 0">{{ titleOnSale }}</h1>
          <h1 v-else>{{ title }}</h1>
          <p>{{ description }}</p>

          <h5 v-if="onSale > 10">In Stock</h5>
          <h5 v-else-if="onSale <= 10 && onSale > 0">Almost Sold Out!</h5>
          <h5 v-else>Out of Stock</h5>

          <p>Shipping: {{ shipping }}</p>

          <product-details :details="details"></product-details>

          <div
            v-for="(variant, index) in variants"
            :key="variant.id"
            @mouseover="updateVariant(index)"
            class="color-circle"
            :style="{ backgroundColor: variant.color }"
          ></div>

          <button
            class="button"
            :class="{ disabled: !onSale }"
            @click="addToCart"
            :disabled="!onSale"
          >
            Add to Cart
          </button>
          <button
            class="button"
            :class="{ disabled: !onSale }"
            @click="removeFromCart"
            :disabled="!onSale"
          >
            Remove from Cart
          </button>
        </div>
      </div>
      <review-list v-if="reviews.length" :reviews="reviews"></review-list>
      <review-form @review-submitted="addReview"></review-form>
    </div>`,
  data() {
    return {
      product: 'DragX',
      brand: 'Voopoo',
      selectedVariant: 0,
      description: 'The impressive pod-system',
      url: '/',
      details: ['1 Cartridge', '2 Atomizers', 'Pod-System'],
      variants: [
        {
          id: 2234,
          color: 'black',
          size: '124x33',
          image: '/assets/images/drag-black.jpg',
          quantity: 50,
        },
        {
          id: 2235,
          color: '#cd7f32',
          size: '124x30',
          image: '/assets/images/drag-bronze.jpg',
          quantity: 0,
        },
      ],
      reviews: [],
    }
  },
  methods: {
    addToCart() {
      this.$emit('add-to-cart', this.variants[this.selectedVariant].id)
    },
    removeFromCart() {
      this.$emit('remove-from-cart', this.selectedVariant)
    },
    updateVariant(index) {
      this.selectedVariant = index
    },
    addReview(review) {
      this.reviews.push(review)
    },
  },
  computed: {
    title() {
      return this.brand + ' ' + this.product
    },
    titleOnSale() {
      return this.brand + ' ' + this.product + ' is on sale'
    },
    image() {
      return this.variants[this.selectedVariant].image
    },
    onSale() {
      return this.variants[this.selectedVariant].quantity
    },
    shipping() {
      if (this.premium) return 'Free'
      return 2.99
    },
  },
})
