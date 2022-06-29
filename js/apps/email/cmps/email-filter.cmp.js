export default {
    
    template:`
        <section class="email-filter">
        <input type="text" v-model="search" placeholder="search in emails" @input="setDisplayFilter({type: 'txt',value:search})"><br>
        <button @click="setDisplayFilter({type: 'status',value:'inbox'})">Inbox</button>
        <button @click="setDisplayFilter({type: 'status',value:'sent'})">Sent</button>
        <button @click="setDisplayFilter({type: 'status',value:'trash'})">Trash</button>
        <button @click="setDisplayFilter({type: 'status',value:'draft'})">Draft</button>
        <section>

            <button @click="setDisplayFilter({type: 'isRead',value:true})">Show Read</button>
            <button @click="setDisplayFilter({type: 'isRead',value:false})">Show Unread</button>
            <button @click="setDisplayFilter({type: 'isRead',value:null})">Show All</button>
        </section>
        <hr>
        </section>

    `,
    data(){
        return{
            search:'',
        }
    },
    created(){},
    methods:{
        setDisplayFilter(filter){
            this.$emit('filterChange', filter)
        }
    },
    computed:{}
}