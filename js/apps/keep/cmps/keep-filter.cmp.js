import { NotesService } from '../services/keep-service.js'

export default {
    template: `
          <section>
            <form @submit.prevent="save">
                <input type="text" v-model="note"/>
            </form>
                  <button @click="changeType('noteTxt')">Text</button>
                  <button @click="changeType('noteImg')">Img</button>
                  <button @click="changeType('noteTodos')">Todo</button>
                  <button @click="changeType('noteVideo')">Video</button>
                  <!-- <button @click="save">save</button> -->
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
                newCmp.url = this.note
            }
            if (this.type === 'noteTodos') {
                newCmp = NotesService.getEmptyTodo()
                //fill the object with the data
                newCmp.todos.txt = this.note
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