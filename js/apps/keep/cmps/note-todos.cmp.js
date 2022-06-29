
import { NotesService } from "../services/keep-service.js"



export default {
  props: ['note'],
  template: `<article class="note-container">
      <h2>{{note.info.label}}</h2>
      <ul>
        <li class="clean-list flex space-between" v-for="(todo,idx) in note.info.todos">
          <h1 :style="setMarked(todo)"
          @click="markTodo(todo)">{{todo.txt}}</h1>
          <button @click="removeTodo(idx)">X</button>
        </li>
      </ul>
      <form @submit.prevent="addTodo(this.note.info.todos)">
      <input type="text" placeholder="Enter your todo here">
      </form>
    </article>
    `,
  data() {
    return {

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
      NotesService.query()
      .then( note=> {
      })
    }
  },
  computed: {
  },

};
