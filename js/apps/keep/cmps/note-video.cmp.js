import { NotesService } from "../services/keep-service.js"


export default {
    props: ['note'],
    template: `
        <section>
            <div>
            <div class="change-color-container">
                <button class="note-tools change-bg-color"><i class="fa-solid fa-palette"></i></button>
                <input class="change-bg-color-input" type="color" :style="{ color: color}" v-model="color" 
                @input="changeBgColor">
            </div>
            <h1>{{note.info.title}}</h1>  
            <h1>{{note.info.url}}</h1>
                <video width="150" height="100" controls>
                    <source src="note.info.url" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            </div>
        </section>
        `,
    data() {
        return {
            color: ''
        }
    },
    methods: {
        changeBgColor() {
            this.note.style.backgroundColor = this.color
            NotesService.save(this.note)
          }
    },
    computed: {
    },
  
}
