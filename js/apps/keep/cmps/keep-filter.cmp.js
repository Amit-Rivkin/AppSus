import { NotesService } from '../services/keep-service.js'

export default {
    template: `
          <section class="note-filter-container flex space-between">
            <form @submit.prevent="save">
                <input type="text" v-model="note"/>
            </form>
                  <button class="add-btn txt" @click="changeType('noteTxt')"><i class="fa-solid fa-a"></i></button>
                  <button class="add-btn image" @click="changeType('noteImg')"><i class="fa-solid fa-image"></i></i></button>
                  <button class="add-btn list" @click="changeType('noteTodos')"><i class="fa-solid fa-list"></i></button>
                  <button class="add-btn video" @click="changeType('noteVideo')"><i class="fa-brands fa-youtube"></i></button>
          </section>
          `,
    data() {
        return {
            note: null,
            type: 'noteTxt'
        }
    },
    methods: {
        changeType(type) {
            this.type = type
        },
        save() {
            let newCmp;
            //get empty object by type
            if (this.type === 'noteTxt') {
                newCmp = NotesService.getEmptyText()
                //fill the object with the data
                newCmp.info.txt = this.note
            }
            if (this.type === 'noteImg') {
                newCmp = NotesService.getEmptyImg()
                //fill the object with the data
                newCmp.info.url = this.note
            }
            if (this.type === 'noteTodos') {
                newCmp = NotesService.getEmptyTodo()
                //fill the object with the data
                newCmp.info.todos[0].txt = this.note
            }
            if (this.type === 'noteVideo') {
                newCmp = NotesService.getEmptyVideo()
                //fill the object with the data
                newCmp.url = this.note
            }
             
            NotesService.save(newCmp)
            this.$emit('addCmp')
        }
    },
    computed: {

    }
}