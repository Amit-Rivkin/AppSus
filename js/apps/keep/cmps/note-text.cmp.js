import { NotesService } from "../services/keep-service.js"


export default {
    props: ['note'],
    template: `
          <section>
            <textarea @change="saveTxt()" class="text-area" cols="30" rows="7" v-model="txt" >
              {{note.info.txt}}
            </textarea>
            <div class="change-color-container">
                  <button class="note-tools change-bg-color"><i class="fa-solid fa-palette"></i></button>
                  <input class="change-bg-color-input" type="color" :style="{ color: color}" v-model="color" 
                  @input="changeBgColor">
              </div>
          </section>
          `,
    data() {
      return {
        color: '',
        txt: this.note.info.txt
      }

    },
    methods: {
      changeBgColor() {
        this.note.style.backgroundColor = this.color
        NotesService.save(this.note)
      },
      saveTxt(){
       this.note.info.txt = this.txt
        NotesService.save(this.note)
        
      },
      
    
    
    },
    computed: {
      },
    }
  