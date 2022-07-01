import { bookService } from "../service/book-service.js";

export default {
  props:["id"],
    template: `
    <h1>Reviews</h1>
    <div v-if="pastReviews" v-for="review in pastReviews">
          <pre>{{review}}</pre>
     </div>

     <h1>Add Review</h1>
     <form @submit="saveRev">
        <input ref="nameInput" type="text" v-model="review.name" >
        <select v-model.number="review.rating" name="rating" id="rating">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <input v-model="review.date" type="date" >
          <textarea v-model="review.freeText" rows="4" cols="50"></textarea>
          <br/>
          <input type="submit" value="Submit">
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
