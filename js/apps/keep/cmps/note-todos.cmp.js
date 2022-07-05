

export default {
  props: ['note'],
  template: `<article class="note-container">
    <input class="title-input" type="text" v-model="label" @change="saveLabel"/>
    <ul>
        <li class="clean-list flex space-between" v-for="(todo,idx) in note.info.todos">
          <h1 class="todo-txt" :style="setMarked(todo)"
          @click="markTodo(todo)">{{todo.txt}}</h1>
          <button class="remove-todo" @click="removeTodo(idx)"><i class="fa-solid fa-trash-can"></i></button>
        </li>
      </ul>
      <form @submit.prevent="addTodo(this.note.info.todos)">
        <input class="todo-input" type="text" placeholder="Enter your todo here" v-model="todoTxt">
      </form>
      <div class="change-color-container">
                <button class="note-tools change-bg-color"><i class="fa-solid fa-palette"></i></button>
                <input class="change-bg-color-input" title="Change bg color"  type="color" :style="{ color: color}" v-model="color" 
                @input="changeBgColor">
            </div>
    </article>
    `,
  data() {
    return {
      label: this.note.info.label,
      todoTxt: '',
      color: ''
    };
  },
  methods: {
    markTodo(todo) {
      todo.doneAt = todo.doneAt ? null : Date.now()
        this.$emit('saveNote', this.note)
    },
    removeTodo(todoIdx) {
      this.note.info.todos.splice(todoIdx, 1)
        this.$emit('saveNote', this.note)
    },
    setMarked(todo) {
      return {
        cursor: 'pointer',
        textDecoration: todo.doneAt ? 'line-through' : 'none'
      }
    },
    addTodo(todo) {
      todo.push({ txt: this.todoTxt, doneAt: null })
      this.todoTxt = ''
        this.$emit('saveNote', this.note)
    },
    changeBgColor() {
      this.note.style.backgroundColor = this.color
        this.$emit('saveNote', this.note)
    },
    saveLabel() {
      this.note.info.label = this.label 
         this.$emit('saveNote', this.note)
     },
  },
  
  computed: {
  },

};
