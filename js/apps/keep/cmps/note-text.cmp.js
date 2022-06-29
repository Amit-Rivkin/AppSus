export default {
    props: ['info'],
    template: `
          <section>
              <textarea class="textArea" cols="30" rows="10" :style="{ backgroundColor: color}" >
              {{info.txt}}
              </textarea>
                  <input type="color"   :style="{ color: color}" v-model="color">
                  
  
          </section>
          `,
    data() {
      return {
    color : 'aqua'
      }
    },
    methods: {

    
    },
    computed: {
      }
    }
  