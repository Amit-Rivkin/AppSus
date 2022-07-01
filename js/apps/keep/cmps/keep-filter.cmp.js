import { NotesService } from '../services/keep-service.js'

export default {
    template: `
          <section class="note-filter-container flex space-between">
              <form @submit.prevent="save">
                <!-- <input class="search-input-keep" v-if="type==='noteImg'" type="file"> -->
                <input class="search-input-keep" :type="getType" :placeholder="placeholderText" v-model="note"/>
            </form>
                  <button :class="{ 'clicked-btn': type === 'noteTxt' }" class="add-btn txt" @click="changeType('noteTxt')"><i class="fa-solid fa-a"></i></button>
                  <button :class="{ 'clicked-btn': type === 'noteImg' }" class="add-btn image" @click="changeType('noteImg')"><i class="fa-solid fa-image"></i></i></button>
                  <button :class="{ 'clicked-btn': type === 'noteTodos' }" class="add-btn list" @click="changeType('noteTodos')"><i class="fa-solid fa-list"></i></button>
                  <button :class="{ 'clicked-btn': type === 'noteVideo' }" class="add-btn video" @click="changeType('noteVideo')"><i class="fa-brands fa-youtube"></i></button>
          </section>
          `,
    data() {
        return {
            note: '',
            type: 'noteTxt',
        }
    },
    methods: {
        changeType(type) {
            this.type = type
          
        },
        save() {
            if (this.note==='') return
            let newCmp;
            if (this.type === 'noteTxt') {
                newCmp = NotesService.getEmptyText()
                newCmp.info.txt = this.note
            }
            if (this.type === 'noteImg') {
                newCmp = NotesService.getEmptyImg()
                newCmp.info.url = this.note
            }
            if (this.type === 'noteTodos') {
                newCmp = NotesService.getEmptyTodo()
                newCmp.info.todos[0].txt = this.note
            }
            if (this.type === 'noteVideo') {
                newCmp = NotesService.getEmptyVideo()
                newCmp.info.url = this.note
            }
             
            NotesService.save(newCmp).then(()=>{

                this.note = ''
                this.$emit('addCmp', newCmp)
            })
        }
    },
    computed: {
        placeholderText() {
            if (this.type === 'noteTxt') {
                return 'Write Your Note...'
            } else if (this.type === 'noteImg') {
                return 'Enter Image Url'
            } else if (this.type === 'noteVideo') {
                return 'Enter Youtube Video Url'
            } else if (this.type === 'noteTodos') {
                return 'Enter Todo List Title'
            }
        },
    }
}