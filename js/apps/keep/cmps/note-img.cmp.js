
export default {
    props: ['note'],
    template: `
        <section>
            <input class="title-input" type="text" v-model="title" @change="savetitle"/>
                <img class="note-img" :src= "note.info.url" >
            <div class="change-color-container">
                    <button class="note-tools change-bg-color"><i class="fa-solid fa-palette"></i></button>
                    <input class="change-bg-color-input" title="Change bg color" type="color" :style="{ color: color}" v-model="color" 
                    @input="changeBgColor">
                </div>
                
        
        </section>
        `,
    data() {
        return {
            color: '',
            title: this.note.info.title,
        }
    },
    methods: {
        changeBgColor() {
            this.note.style.backgroundColor = this.color
             this.$emit('saveNote', this.note)
          },
          savetitle() {
            this.note.info.title = this.title 
              this.$emit('saveNote', this.note)
           },
    },
    computed: {

    },
    
}
