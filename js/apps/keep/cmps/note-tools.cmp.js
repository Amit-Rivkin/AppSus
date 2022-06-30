import { eventBus } from '../../../general-service/eventBus-service.js'

export default {
    props: ['note'],
    template: `<article class="note-actions-container">
 <div class="change-color-container">
                    <button class="note-tools change-bg-color"><i class="fa-solid fa-palette"></i></button>
                    <input class="change-bg-color-input" type="color" :style="{ color: color}" v-model="color" 
                    @input="changeBgColor">
                </div>
  <button class="note-tools delete" @click="deleteNote(cmp.id)"><i class="fa-solid fa-trash-can"></i></button>
        <button class="note-tools pin" @click="pinNote(cmp.id)" :style="changePinColor(cmp.id)"><i class="fa-solid fa-thumbtack"></i></button>
        <button class="note-tools duplicate" @click="duplicateNote(cmp,idx)"><i class="fa-solid fa-clone"></i></i></button>
    </article>
    `,
    data() {
        return {
        };
    },
    methods: {
      
    },
    computed: {
    },
};
