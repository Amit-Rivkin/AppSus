

export default {
    props: ['note'],
    template: `
          <section>
              <textarea class="text-area" cols="30" rows="10" >
              {{note.info.txt}}
            </textarea>
          </section>
          `,
    data() {
      return {
      }
    },
    methods: {

    
    },
    computed: {
      },
    }
  