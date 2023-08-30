app.component('review-form', {
    template:
        `<form class="review-form" @submit.prevent="onSubmit">
    <h3>Leave a review</h3>
    <label for="name">Name:</label>
    <input id="name" v-model="name">

    <label for="review">Review:</label>      
    <textarea id="review" v-model="review"></textarea>

    <label for="rating">Rating:</label>
    <select id="rating" v-model.number="rating">
      <option>5</option>
      <option>4</option>
      <option>3</option>
      <option>2</option>
      <option>1</option>
    </select>

    <!-- solution -->
    <label for="recommend">Would you recommend this product?</label>
    <select id="recommend" v-model="recommend">
      <option>Yes</option>
      <option>No</option>
    </select>
    <!-- solution -->   
    <div class="d-flex justify-content-center">
<!--    <input class="button" type="submit" value="Submit">  -->
        <button type="submit" class="btn btn-primary w-50 mt-3 justify-content-center">Primary</button>
        </div>

  </form>`,

    data() {
        return {
            name: '',
            review: '',
            rating: null,
            recommend: null,
        }
    },
    methods: {
        onSubmit(){
            let productReview = {
                name : this.name,
                review : this.review,
                rating : this.rating,
                recommend : this.recommend,
            }
            this.$emit('review-submitted', productReview)

            this.name = ''
            this.review = ''
            this.rating = ''
            this.recommend = null
        }
    }
})