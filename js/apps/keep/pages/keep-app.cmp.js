import { notesService } from '../services/keep-service.js'
import noteTxt from '../cmps/note-text.cmp.js'
import noteImg from '../cmps/note-img.cmp.js'
import noteVideo from '../cmps/note-video.cmp.js'
import noteTodos from '../cmps/note-todos.cmp.js'
import keepFilter from '../cmps/keep-filter.cmp.js'
import { utilService } from '../../books/service/util-service.js'

export default {
    template: `
        <keep-filter  @addCmp="reRender"/>
    <section v-if="notes" class="notes-area main-layout">
        <div v-for="(cmp,idx) in notes" class="note-card" :key="cmp.id" :style="{ backgroundColor: notes[idx].style.backgroundColor }">
            
            <component class="note-container "
             @todoDone="reRender"
             @saveNote="saveNote"
            :is="cmp.type"
            :note="cmp">
        </component>
        <div class="note-tools">
        <button class="note-tool delete" title="Delete note" @click="deleteNote(cmp.id)"><i class="fa-solid fa-trash-can"></i></button>
        <button class="note-tool pin" title="Note note" @click="pinNote(cmp.id)" :style="changePinColor(cmp.id)"><i class="fa-solid fa-thumbtack"></i></button>
        <button class="note-tool duplicate" title="Duplicate note" @click="duplicateNote(cmp,idx)"><i class="fa-solid fa-clone"></i></button>
        </div>

       </div>
    </section>
   `,
    data() {
        return {
            notes: null,
        };
    },
    created() {
        notesService.query()
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
            notesService.query()
                .then(note => {
                    // console.log("yoyo",note);
                    this.notes = note
                })
        },
        saveNote(note) {
            notesService.save(note)
        },
        deleteNote(id) {
            notesService.remove(id)
                .then(() => {
                    const idx = this.notes.findIndex((note) => note.id === id)
                    this.notes.splice(idx, 1);
                })
        },
        pinNote(id) {
            const idx = this.notes.findIndex((note) => note.id === id)
            var x = this.notes.splice(idx, 1)[0]
            this.notes.unshift(x)
            this.notes[0].isPinned = !this.notes[0].isPinned
            notesService.saveMany(this.notes).then((note) => {
                this.notes = note
            })

        },
        changePinColor(id) {
            let note = this.notes.find(note => note.id === id)
            if (note.isPinned) return { color: 'red' }
        },
        duplicateNote(note, idx) {
            // console.log(note);
            notesService.query()
                .then(notes => {
                    const newNote = { ...note, id: utilService.makeId() }
                    notes.push(newNote)
                    this.notes = notes
                    notesService.saveMany(this.notes)
                })
        }
    },
    computed: {},
    unmounted() { },
}