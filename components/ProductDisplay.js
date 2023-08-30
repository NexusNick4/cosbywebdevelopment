app.component('product-display', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template:
        `<div class="product-display">
                <div class="product-container">
                    <div class="product-image">
                        <img :src="image" :class="{ 'out-of-stock-img': !inStock }">
                    </div>
                    <div class="product-info">
                        <h1>{{ sale }}</h1>
                        <p v-if="inStock">In Stock</p>
                        <p v-else>Out of Stock</p>
                        
                        <p>Shipping: {{ shipping }}</p>
                        
                        <ul>
                            <li v-for="detail in details">{{ detail }}</li>
                        </ul>
                        <div v-for="(variant, index) in variants"
                             :key="variant.id"
                             @mouseover="updateVariant(index)"
                             class="color-circle" :style="{ backgroundColor: variant.color }">
                        </div>

                        <button @click="addToCart" :disabled="!inStock" class="btn btn-dark mt-3">Add to Cart</button>
                    </div>
                </div>
                <review-list :reviews="reviews"></review-list>
                <review-form @review-submitted="addReview"></review-form>
                
            </div>`,
    data() {
        return {
            product: 'Socks',
            selectedVariant: 0,
            brand: 'Vue Master',
            details: ['50% cotton', '30% wool', '20% polyester'],
            variants: [
                { id: 2234, color: 'green', image: './assets/img/socks_green.jpg', qty: 50, onSale: true },
                { id: 2235, color: 'blue', image: './assets/img/socks_blue.jpg', qty: 0, onSale: false },
            ],
            reviews: []
        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].id)
        },
        updateVariant(index) {
            this.selectedVariant = index
        },
        addReview(review){
            this.reviews.push(review)
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product
        },
        image(){
            return this.variants[this.selectedVariant].image
        },
        inStock(){
            return this.variants[this.selectedVariant].qty
        },
        sale(){
            if(this.variants[this.selectedVariant].onSale){
                return this.title + ' ' + 'On Sale!'
            }
            return this.title
        },
        shipping(){
            if(this.premium){
                return 'FREE!'
            }
            return 2.99
        }
    }
})