import { bookService } from "../service/book-service.js";
import reviewCmp from '../cmp/review-cmp.cmp.js'
export default {
  props:["id"],
    template: `
    <h1>Reviews</h1>
    <!-- <p>{{this.review.rating}}</p>
    <p>{{this.review.date}}</p>
    <p>{{this.review.freeText}}</p> -->
    <div v-if="pastReviews" v-for="review,idx in pastReviews">
      <!-- <h1>{{review}}</h1> -->
      <review-cmp  @delete-review="deleteReview" :review="review" :id="idx"></review-cmp>
     </div>

     <form class="flex flex-column align-center" @submit="saveRev">
       <h1 class="add">Add Review</h1>
        <input class="review-input" ref="nameInput" type="text" v-model="review.name" >
        <form class="rating-star">
  <label>
    <input type="radio" name="stars" value=1 v-model="review.rating" />
    <span class="icon">★</span>
  </label>
  <label>
    <input type="radio" name="stars" value=2  v-model="review.rating" />
    <span class="icon">★</span>
    <span class="icon">★</span>
  </label>
  <label>
    <input type="radio" name="stars" value=3  v-model="review.rating" />
    <span class="icon">★</span>
    <span class="icon">★</span>
    <span class="icon">★</span>   
  </label>
  <label>
    <input type="radio" name="stars" value=4 v-model="review.rating" />
    <span class="icon">★</span>
    <span class="icon">★</span>
    <span class="icon">★</span>
    <span class="icon">★</span>
  </label>
  <label>
    <input type="radio" name="stars" value=5  v-model="review.rating" />
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

     <!-- <pre>{{review.name}}</pre>
     <pre>{{review.date}}</pre>
     <pre>{{review.freeText}}</pre>
     <pre>{{review.id}}</pre>
     
     <h1>{{review.rating}}</h1> -->

  `,
    data() {return{

      review:{
        name: "Books Reader",
        rating:0,
        date:null,
        freeText:""

      },
      pastReviews: null,

    }},
    watch:{
      id: function(){
        bookService.get(this.id).then(book => this.pastReviews = book.reviews)
      }
    },
    mounted(){
      this.$refs.nameInput.focus()
      let day = new Date().getDate() < '10' ?  '0' + new Date().getDate() : new Date().getDate()
      let month = new Date().getMonth() < '10' ?  '0' + (+new Date().getMonth()+1) : (+new Date().getMonth()+1)
      this.review.date = new Date().getFullYear() + "-" + month  + "-" + day
      bookService.get(this.id).then(book => this.pastReviews = book.reviews)
    },
    methods: {
      saveRev(){
        if(!this.review.rating || !this.review.date || !this.review.freeText) return
        bookService.addReview(this.id, {...this.review}).then(()=>{

          bookService.get(this.id).then(book => this.pastReviews = book.reviews)
          this.review.rating = 0
          this.review.name = "Book Reader"
          this.review.freeText = ""
        })
      },
      deleteReview(revId){
        bookService.deleteReview(this.id,revId).then(()=>{
          this.pastReviews.splice(revId,1)
        })
      }
    },
    created(){
    },
    computed: {
    },
    components: {
      reviewCmp
    },
};
