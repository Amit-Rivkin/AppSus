import { NotesService } from '../services/keep-service.js'
import noteTxt from '../cmps/note-text.cmp.js'
import noteImg from '../cmps/note-img.cmp.js'
import noteVideo from '../cmps/note-video.cmp.js'
import noteTodos from '../cmps/note-todos.cmp.js'
import keepFilter from '../cmps/keep-filter.cmp.js'

export default {
    template: `
    <section v-if="notes">
        <h3>keep page</h3>
        <keep-filter  @addCmp="reRender"/>
        <div v-for="cmp in notes">
            <button @click="deleteNote(cmp.id)">X</button>
            <button @click="pinNote(cmp.id)">📌</button>
            <component :is="cmp.type"
                :info="cmp.info">
            </component>

       </div>
    </section>
   `,
    data() {
        return {
            notes: null,
        };
    },
    created() {
        NotesService.query()
            .then(note => {
                console.log(note);
                this.notes = note
            })
    },
    components: {
        noteTxt,
        noteImg,
        noteTodos,
        noteVideo,
        keepFilter
    },
    methods: {
        reRender() {
            NotesService.query()
                .then(note => {
                    console.log(note);
                    this.notes = note
                })
        },
        deleteNote(id) {
            console.log(id);
            NotesService.remove(id)
                .then(() => {
                    const idx = this.notes.findIndex((note) => note.id === id)
                    this.notes.splice(idx, 1);
                })
        },
        pinNote(id) {
            console.log(id);
            NotesService.get(id)
                .then(() => {
                    const idx = this.notes.findIndex((note) => note.id === id)
                    this.notes.unshift(this.notes.splice(idx, 1)[0]);
                   
                })

        }

    },
    computed: {},
    unmounted() { },
};
