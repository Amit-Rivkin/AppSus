import { NotesService } from '../services/keep-service.js'
import noteTxt from '../cmps/note-text.cmp.js'
import noteImg from '../cmps/note-img.cmp.js'
import noteVideo from '../cmps/note-video.cmp.js'
import noteTodos from '../cmps/note-todos.cmp.js'
import keepFilter from '../cmps/keep-filter.cmp.js'

export default {
    template: `
        <keep-filter  @addCmp="reRender()"/>
    <section v-if="notes" class="notes-area">
        <div v-for="(cmp,idx) in notes" class="note-card" :style="{ backgroundColor: notes[idx].style.backgroundColor}">
            
            <component class="note-container" @todoDone="reRender"
            :is="cmp.type"
            :note="cmp">
        </component>
        <button class="note-tools delete" @click="deleteNote(cmp.id)"><i class="fa-solid fa-trash-can"></i></button>
        <button class="note-tools pin" @click="pinNote(cmp.id)" :style="changePinColor(cmp.id)"><i class="fa-solid fa-thumbtack"></i></button>
        <button class="note-tools duplicate" @click="duplicateNote(cmp,idx)"><i class="fa-solid fa-clone"></i></i></button>

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
                    this.notes.unshift(this.notes.splice(idx, 1)[0])
                    this.notes[0].isPinned = !this.notes[0].isPinned
                    NotesService.saveMany(this.notes)
                })
        },
        changePinColor(id) {
            let note = this.notes.find(note => note.id === id)
            if (note.isPinned) return { color: 'red' }
        },
        duplicateNote(cmp, idx) {
            console.log(cmp);
            NotesService.query()
                .then(note => {
                    // console.log(note);
                    // if (cmp.type === 'noteTxt') {
                    //     cmp = NotesService.getEmptyText()
                    //     this.note[idx].info.txt=cmp.info.txt 
                    // }
                    // if (cmp.type === 'noteImg') {
                    //     cmp = NotesService.getEmptyImg()
                    //     cmp.info.url = this.note
                    // }
                    // if (cmp.type === 'noteTodos') {
                    //     cmp = NotesService.getEmptyTodo()
                    //     cmp.info.todos[0].txt = this.note
                    // }
                    // if (cmp.type === 'noteVideo') {
                    //     cmp = NotesService.getEmptyVideo()
                    //     cmp.url = this.note
                    // }
                    note.push(Object.assign({}, cmp))
                    this.notes = note
                    NotesService.saveMany(this.notes)
                }
                )
        }
    },
    computed: {},
    unmounted() { },
};
