import { eventBus } from '../../../general-service/eventBus-service.js'

export default {
    props: ['note'],
    template: `<article class="note-actions-container">
 <div class="change-color-container">
                    <button class="note-tools change-bg-color"><i class="fa-solid fa-palette"></i></button>
                    <input class="change-bg-color-input" type="color" :style="{ color: color}" v-model="color" 
                    @input="changeBgColor">
                </div>
  <button class="note-tools delete" @click="deleteNote(note.id)"><i class="fa-solid fa-trash-can"></i></button>
        <button class="note-tools pin" @click="pinNote(note.id)" :style="changePinColor(note.id)"><i class="fa-solid fa-thumbtack"></i></button>
        <button class="note-tools duplicate" @click="duplicateNote(note,idx)"><i class="fa-solid fa-clone"></i></i></button>
    </article>
    `,
    data() {
        return {
        };
    },
    methods: {
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
        },
        changeBgColor() {
            this.note.style.backgroundColor = this.color
            NotesService.save(this.note)
          },

      
    },
    computed: {
    },
};
