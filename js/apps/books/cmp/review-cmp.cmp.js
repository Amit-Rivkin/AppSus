export default {
    props:['review','id'],
    template:`
        <section class="review-cmp">
            <h3>Name:{{review.name}}</h3>
            <h3>Rating:{{getRating}}</h3>
            <h3>Date:{{review.date}}</h3>
            <h3>Opinion:{{review.freeText}}</h3>
            <button @click="onDelete">Delete Review</button>
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