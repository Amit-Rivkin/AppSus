export default {
  template: `
   <section class="book-filter">
          <input type="text" v-model="filterBy.name" @input="filter">
      <input type="range" v-model.number="filterBy.price" @input="filter" min= 0 max=186> 
   </section>
  `,
  data() {
    return {
      filterBy: {
        name: "",
        price: 0

      },
    };
  },
  methods: {
    filter() {
      this.$emit("filtered", this.filterBy);
    },
  },
  computed: {},
};