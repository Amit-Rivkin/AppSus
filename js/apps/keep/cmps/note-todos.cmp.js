
import { NotesService } from "../services/keep-service.js"

export default {
  props: ['note'],
  template: `<article class="note-container">
    <div class="change-color-container">
              <button class="note-tools change-bg-color"><i class="fa-solid fa-palette"></i></button>
              <input class="change-bg-color-input" type="color" :style="{ color: color}" v-model="color" 
              @input="changeBgColor">
          </div>
    <h2>{{note.info.label}}</h2>
      <ul>
        <li class="clean-list flex space-between" v-for="(todo,idx) in note.info.todos">
          <h1 :style="setMarked(todo)"
          @click="markTodo(todo)">{{todo.txt}}</h1>
          <button @click="removeTodo(idx)">X</button>
        </li>
      </ul>
      <form @submit.prevent="addTodo(this.note.info.todos)">
      <input type="text" placeholder="Enter your todo here" v-model="todoTxt">
      </form>
    </article>
    `,
  data() {
    return {
      todoTxt: '',
      color: ''
    };
  },
  methods: {
    markTodo(todo) {
      todo.doneAt = todo.doneAt ? null : Date.now()
      NotesService.save(this.note)
    },
    removeTodo(todoIdx) {
      this.note.info.todos.splice(todoIdx, 1)
      NotesService.save(this.note)
    },
    setMarked(todo) {
      return {
        cursor: 'pointer',
        textDecoration: todo.doneAt ? 'line-through' : 'none'
      }
    },
    addTodo(todo) {
      console.log(todo);
      todo.push({ txt: this.todoTxt, doneAt: null })
      this.todoTxt = ''
      NotesService.save(this.note)
    },
    changeBgColor() {
      this.note.style.backgroundColor = this.color
      NotesService.save(this.note)
    }
  },
  computed: {
  },

};
