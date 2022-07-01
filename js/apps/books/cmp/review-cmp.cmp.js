export default {
    props:['review','id'],
    template:`
        <section class="review-cmp">
            <h3 class="review-txt"> Name:{{review.name}}</h3>
            <h3 class="review-txt"> Rating:{{getRating}}</h3>
            <h3 class="review-txt"> Date:{{review.date}}</h3>
            <h3 class="review-txt"> Opinion:{{review.freeText}}</h3>
            <div>
            <button class="delete-review"   @click="onDelete"><i class="fa-solid fa-trash-can"></i></button>
            </div>
        </section>

    `,
 data(){
    return{}
},
created(){},
methods:{
    onDelete(){
        console.log(this.id)
        this.$emit('deleteReview',this.id)
    }
},
computed:{
    getRating(){
        
        return '⭐'.repeat(+this.review.rating)
    }
}
}