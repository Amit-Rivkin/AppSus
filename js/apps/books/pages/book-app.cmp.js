import { bookService } from "../service/book-service.js"
import bookList from "../cmp/book-list.cmp.js"
import bookFilter from "../cmp/book-filter-cmp.js"

export default {
  template: `
  <section class="book-app">
    <book-filter @filtered="setFilter"/>
    <book-list v-if = "!isModalOpen" @selected="selectbook" :books="booksToDisplay" @click="showModal()" />    
  </section>
`,
components:{
  bookList,
  bookFilter
},
  data() {
    return {
      books: null,
      selectedbook: null,
      filterBy: null,
      isModalOpen: false,
    };
  },
  created(){
    bookService.query().then(books=> this.books =books)
  },
  methods: {
    selectbook(book) {
        this.selectedbook = book;
      },
      showModal() {
        this.isModalOpen = true
      },
      closeModal() {
        this.isModalOpen = false
        this.electedbook = null
      },
      setFilter(filterBy) {
        console.log(filterBy);
        this.filterBy = filterBy;
      },
  },
  computed: {
    booksToDisplay() {
      if (!this.filterBy) return this.books
      const regex = new RegExp(this.filterBy.name, "i");
      return this.books.filter((book) => regex.test(book.title) && book.listPrice.amount >= this.filterBy.price);
    },
  },

};
