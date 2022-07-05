import { notesService } from '../services/keep-service.js'

export default {
    template: `
          <section class="note-filter-container flex space-between">
              <form @submit.prevent="save">
                <form @submit.prevent="save">
                <input class="search-input-keep" v-if="type!=='noteTxt' "  type="text" placeholder="Enter a title" v-model="title"/>
                </form>
                <input class="search-input-keep" type="text" :placeholder="placeholderText" v-model="note"/>
            </form>
                  <button :class="{ 'clicked-btn': type === 'noteTxt' }" class="add-btn txt" @click="changeType('noteTxt')"><i class="fa-solid fa-a"></i></button>
                  <button :class="{ 'clicked-btn': type === 'noteImg' }" class="add-btn image" @click="changeType('noteImg')"><i class="fa-solid fa-image"></i></button>
                  <button :class="{ 'clicked-btn': type === 'noteTodos' }" class="add-btn list" @click="changeType('noteTodos')"><i class="fa-solid fa-list"></i></button>
                  <button :class="{ 'clicked-btn': type === 'noteVideo' }" class="add-btn video" @click="changeType('noteVideo')"><i class="fa-brands fa-youtube"></i></button>
          </section>
          `,
    data() {
        return {
            note: '',
            title: '',
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
                newCmp = notesService.getEmptyText()
                newCmp.info.txt = this.note
            }
            if (this.type === 'noteImg') {
                newCmp = notesService.getEmptyImg()
                newCmp.info.url = this.note
                newCmp.info.title = this.title
            }
            if (this.type === 'noteTodos') {
                newCmp = notesService.getEmptyTodo()
                newCmp.info.todos[0].txt = this.note
                newCmp.info.label = this.title
            }
            if (this.type === 'noteVideo') {
                newCmp = notesService.getEmptyVideo()
                newCmp.info.url = this.note
                newCmp.info.title = this.title
            }
             
            notesService.save(newCmp).then(()=>{
                this.title=''
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