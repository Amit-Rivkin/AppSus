import { bookService } from "../service/book-service.js";

export default {
  props: ['id'],

  template: ` 
  <h1>Review</h1>
   <form @submit.prevent="saveReview">
      <input ref="nameInput" type="text" v-model="name" >
      <br>
      <form class="rating">
  <label>
    <input type="radio" name="stars" value="1" v-model="rating" />
    <span class="icon">★</span>
  </label>
  <label>
    <input type="radio" name="stars" value="2"  v-model="rating" />
    <span class="icon">★</span>
    <span class="icon">★</span>
  </label>
  <label>
    <input type="radio" name="stars" value="3"  v-model="rating" />
    <span class="icon">★</span>
    <span class="icon">★</span>
    <span class="icon">★</span>   
  </label>
  <label>
    <input type="radio" name="stars" value="4"  v-model="rating" />
    <span class="icon">★</span>
    <span class="icon">★</span>
    <span class="icon">★</span>
    <span class="icon">★</span>
  </label>
  <label>
    <input type="radio" name="stars" value="5"  v-model="rating" />
    <span class="icon">★</span>
    <span class="icon">★</span>
    <span class="icon">★</span>
    <span class="icon">★</span>
    <span class="icon">★</span>
  </label>
</form>
<br>
<input type="date" v-model="currDate">
<br>
<textarea v-model="review" cols="30" rows="10"></textarea>
<br>
<input type="submit" value="submit">
</form>
<section v-if="id">
  <ul v-if="book.reviews"></ul>
  
   </section>
   `
  ,
  data() {
    return {
      name: "Books Reader",
      rating: 0,
      currDate: Date.now(),
      review: '',


    }
  },
  mounted() {
    this.$refs.nameInput.focus()
  },
  methods: {
    saveReview() {
      bookService.addReview(this.id, { name: this.name, reting: this.rating, currDate: this.currDate, review: this.review })
    }
  },
  created() { },
  computed: {
    getCurrDate() {
      return Date.now()
    }
  },
  components: {},
};