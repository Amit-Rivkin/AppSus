import { NotesService } from "../services/keep-service.js"

export default {
    props: ['note'],
    template: `
        <section>
        <div class="change-color-container">
                <button class="note-tools change-bg-color"><i class="fa-solid fa-palette"></i></button>
                <input class="change-bg-color-input" type="color" :style="{ color: color}" v-model="color" 
                @input="changeBgColor">
            </div>
            <h1>{{note.info.title}}</h1>   
            <div class="img-container">
                <img :src= "note.info.url" >
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
