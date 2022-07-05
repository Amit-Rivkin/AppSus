

export default {
    props: ['note'],
    template: `
        <section>
            <div class="video-conatiner">
                <input class="title-input" type="text" v-model="title" @change="savetitle"/> 
                <iframe  width="200" height="100"
                frameborder="0" allow="accelerometer; autoplay; 
         encrypted-media; gyroscope; picture-in-picture"
         allowfullscreen
                    :src="youtube_parser">
                    
                    </iframe>
            </div>
            <div class="change-color-container">
                <button class="note-tools change-bg-color"><i class="fa-solid fa-palette"></i></button>
                <input class="change-bg-color-input" type="color" :style="{ color: color}" v-model="color" 
                @input="changeBgColor">
            </div>
        </section>
        `,
    data() {
        return {
            color: '',
            title: this.note.info.title,
            url: this.note.info.url
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
        youtube_parser(){
          var vidId = this.url.match('[v=].*')
          if (vidId) return "https://www.youtube.com/embed/"+vidId[0].slice(2)
          
        },
    },

}
