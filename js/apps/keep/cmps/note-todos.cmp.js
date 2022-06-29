

export default {
props:["info"],
template:`
<h1>{{info.label}}</h1>
<section>
    <ul>
        <li v-for="todo in info.todos" >
            <h1 @click="toggleTodo">{{todo.txt}}</h1>
        </li>
    </ul>

</section>
`,
methods:{
    toggleTodo(){
    const todo = this.info.find(todo => todo.id === todoId)
    todo.isDone = !todo.isDone
    }
},

components: {
},
}