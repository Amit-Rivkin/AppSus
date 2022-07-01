export default {
    props: ["book"],
    template: `<section class="book-list">
      <img :src="book.thumbnail"/>
      <p>{{book.title}}</p>
      <p>Price: {{getcurrency}}</p>
      
      </section>
  `,
    data() {
      return {};
    },
    methods: {},
    computed: {
        getcurrency(){
          const { currencyCode, amount } = this.book.listPrice
          return new Intl.NumberFormat('en-US', { style: 'currency', currency: currencyCode }).format(amount);
        }
    },
  };
  