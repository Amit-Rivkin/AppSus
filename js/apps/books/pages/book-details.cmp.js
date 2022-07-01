import longText from "../cmp/long-text.cmp.js"
import { bookService } from "../service/book-service.js"
import reviewAdd from "./review-add.js";

export default {
    props: ["book"],
    template: `
      <section v-if="books" class="book-details">
          <h1>Book Details</h1>
          <h5>Title:{{books.title}}</h5>
          <p>Page-Count: {{getBookPage}}</p>
          <p>Book-Published in: {{getBookYear}}</p>
          <p>Price: {{getcurrency}}</p>
         <long-text :text="books.description"></long-text>
          <p ><img :src= "getBookOnSale"></p>
          <div class=" flex space-between">
          <router-link class="router-btn" :to="'/book/'+nextBookId">Next Book</router-link>
          <br>
          <router-link class="router-btn" :to="'/book/'">Back</router-link>     
          </div>
         </section>
         <review-add v-if="books" :id="books.id"/>
  `,
    data() {
        return {
            showMore: false,
            books: null,
            nextBookId: null
        };
    },
    methods: {},
    created() {
    },
    computed: {
        getBookPage() {
            // console.log(this.book.pageCount);
            if (this.books.pageCount > 500) return this.books.pageCount + '- Long reading'
            if (this.books.pageCount > 200) return this.books.pageCount + '- Decent Reading'
            else return this.books.pageCount + '- Light Reading'
        },
        getBookYear() {
            // console.log(this.book.publishedDate);
            var date = new Date
            var year = date.getFullYear()
            if (year - this.books.publishedDate > 10) return this.books.publishedDate + '- is Veteran Book'
            if (year - this.books.publishedDate < 1) return this.books.publishedDate + '- is New!'
            else return this.books.publishedDate
        },
        getBookPrice() {
            // console.log(this.book.listPrice.amount);
            return { high: this.books.listPrice.amount > 150, low: this.books.listPrice.amount < 20 }

        },
        getcurrency() {
            const { currencyCode, amount } = this.books.listPrice
            return new Intl.NumberFormat('en-US', { style: 'currency', currency: currencyCode }).format(amount);

        },
        getBookOnSale() {
            if (this.books.listPrice.isOnSale) return `imgs/sale.png`
            else return ''
        },
        getBookDescription() {
            if (this.showMore) return this.books.description
            else if (!this.showMore && this.books.description < 100) return this.books.description
            else return this.books.description.slice(0, 100)
        },
    },
    components: {
        longText,
        reviewAdd
    },
    watch: {
        '$route.params.bookid': {
            handler() {
                const id = this.$route.params.bookid
                bookService.get(id).then(book => {
                    this.books = book
                    bookService.getNextBookId(book.id)
                        .then(nextBookId => this.nextBookId = nextBookId)
                })
            },
            immediate: true

        }
    }
};
