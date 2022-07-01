import bookPreview from "../cmp/book-preview.cmp.js";

export default {
  props: ['books'],
  template: `
    <section class="book-list">
        <ul>
            <li  v-for="book in books" :key="book.id" class="book-preview-container" >
                <book-preview :book="book"/>
                 <router-link :to="'/book/'+book.id">Details</router-link>
            </li>
        </ul>
    </section>
`,
  components: {
    bookPreview,
  },

  data() {
    return {};
  },
  methods: {
    selcet(book) {
      // if (this.bookSelceted) return
      this.$emit("selected", book);
    },
  },
  computed: {},
  created() {
    // console.log(this.books);
  },
};
