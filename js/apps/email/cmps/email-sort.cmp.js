export default {
    template:`
        <section class="email-sort">
            <label for="sort">Sort By:</label>
            <select @change="onSort">
                <option>None</option>
                <option>Date</option>
                <option>Title</option>

            </select>
        </section>

    `,
    data(){
        return{}
    },
    created(){},
    methods:{
        onSort(ev){
            this.$emit('onSort',ev.target.value)
        }
    },
    computed:{}
}