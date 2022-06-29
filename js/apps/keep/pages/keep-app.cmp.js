import { NotesService } from '../services/keep-service.js'
import noteTxt from '../cmps/note-text.cmp.js'
import noteImg from '../cmps/note-img.cmp.js'
import noteVideo from '../cmps/note-video.cmp.js'
import noteTodos from '../cmps/note-todos.cmp.js'
import keepFilter from '../cmps/keep-filter.cmp.js'

export default {
    template: `
        <h3>keep page</h3>
        <keep-filter  @addCmp="reRender"/>
    <section v-if="notes" class="notes-area">
        <div v-for="cmp in notes" class="note-card" :style="{ backgroundColor: color}">
            <button class="note-tools pin" @click="deleteNote(cmp.id)"><i class="fa-solid fa-trash-can"></i></button>
            <button class="note-tools delete" @click="pinNote(cmp.id)"><i class="fa-solid fa-thumbtack"></i></button>
            <div class="change-color-container">
                <button class="note-tools change-bg-color"><i class="fa-solid fa-palette"></i></button>
                <input class="change-bg-color-input" type="color" :style="{ color: color}" v-model="color">
            </div>
            <!-- <button @click="duplicateNote(cmp.id)">2️⃣</button> -->
            <component class="note-container" @todoDone="reRender"
                :is="cmp.type"
                :note="cmp">
            </component>

       </div>
    </section>
   `,
    data() {
        return {
            notes: null,
            color: '#rrggbb'
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
            NotesService.remove(id)
                .then(() => {
                    const idx = this.notes.findIndex((note) => note.id === id)
                    this.notes.splice(idx, 1);
                })
        },
        pinNote(id) {
            NotesService.get(id)
                .then(() => {
                    const idx = this.notes.findIndex((note) => note.id === id)
                    this.notes.unshift(this.notes.splice(idx, 1)[0]);
                    NotesService.save(this.note)
                })
        },
        // duplicateNote(){
        //     NotesService.get(id)
        //     .then(() => {
        //       this.notes.findIndex((note) => note.id === id) .reduce(function (res, current, index, array) {
        //         return res.concat([current, current]);
        //     }, []);}

    },
    computed: {},
    unmounted() { },
};
