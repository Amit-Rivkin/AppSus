import { NotesService } from "../services/keep-service.js"


export default {
    props: ['note'],
    template: `
        <section>
            <div>
                <input class="title-input" type="text" v-model="title" @change="savetitle"/> 
                <iframe v-if="url" width="200" height="100"
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
            NotesService.save(this.note)
        },
        savetitle() {
            this.note.info.title = this.title
            NotesService.save(this.note)
        },
    },
    computed: {
        youtube_parser(){
            console.log(this.url);
          var vidId = this.url.match('[v=].*')
          if (vidId) return "https://www.youtube.com/embed/"+vidId[0].slice(2)
          console.log(vidId);
          
        },
    },

}
