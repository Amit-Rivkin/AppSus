import { NotesService } from "../services/keep-service.js"

export default {
props:['note'],
template:`
<article>
<button @click="pinNote">📌</button>
<button @click="deleteNote">X</button>
<input type="color" :style="{ color: color}" v-model="color">
</article>
`,
data(){
    return{
    color:'blue'
    }
},
methods:{
    pinNote(id) {
        NotesService.get(id)
            .then(() => {
                const idx = this.notes.findIndex((note) => note.id === id)
                this.notes.unshift(this.notes.splice(idx, 1)[0]);
                NotesService.save(this.note)
            })
        },
        deleteNote() {
            NotesService.remove(this.note.id)
            },

}

}