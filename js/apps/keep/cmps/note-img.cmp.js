import { NotesService } from "../services/keep-service.js"

export default {
    props: ['note'],
    template: `
        <section>
            <input class="title-input" type="text" v-model="title" @change="savetitle"/>
            <div class="img-container">
                <img :src= "note.info.url" >
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

    },
    
}
