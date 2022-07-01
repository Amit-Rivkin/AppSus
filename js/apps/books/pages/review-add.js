import { bookService } from "../service/book-service.js";

export default {
  props:["id"],
    template: `
    <h1>Reviews</h1>
    <!-- <p>{{this.review.rating}}</p>
    <p>{{this.review.date}}</p>
    <p>{{this.review.freeText}}</p> -->
    <div v-if="pastReviews" v-for="review in pastReviews">
      <h1>{{this.pastReviews}}</h1>
     </div>

     <form class="flex flex-column align-center" @submit="saveRev">
       <h1 class="add">Add Review</h1>
        <input class="review-input" ref="nameInput" type="text" v-model="review.name" >
        <form class="rating-star">
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
          <input class="review-input" v-model="review.date" type="date" >
          <textarea class="review-textArea"  v-model="review.freeText" rows="4" cols="50"></textarea>
          <br/>
          <input class="review-input" type="submit" value="Submit">
     </form>
     <!-- <pre>{{name}}</pre>
     <pre>{{rating}}</pre>
     <pre>{{date}}</pre>
     <pre>{{freeText}}</pre>
     <pre>{{id}}</pre> -->


  `,
    data() {return{

      review:{
        name: "Books Reader",
        rating:1,
        date:null,
        freeText:""

      },
      pastReviews: null,

    }},
    mounted(){
      this.$refs.nameInput.focus()
      let day = new Date().getDate() < '10' ?  '0' + new Date().getDate() : new Date().getDate()
      let month = new Date().getMonth() < '10' ?  '0' + (+new Date().getMonth()+1) : (+new Date().getMonth()+1)
      this.review.date = new Date().getFullYear() + "-" + month  + "-" + day
      bookService.get(this.id).then(book => this.pastReviews = book.reviews)
    },
    methods: {
      saveRev(){
        bookService.addReview(this.id, {...this.review}).then(()=>{

          bookService.get(this.id).then(book => this.pastReviews = book.reviews)
        })
      }
    },
    created(){
    },
    computed: {
    },
    components: {},
};
