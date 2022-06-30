export default {
    
    template:`
        <section class="email-filter">
        <input class="search-input" type="text" v-model="search" placeholder="search in emails" @input="setDisplayFilter({type: 'txt',value:search})">
        <button class="btn" @click="setDisplayFilter({type: 'status',value:'inbox'})"><i class="fa-solid fa-inbox"></i> Inbox</button>
        <button class="btn" @click="setDisplayFilter({type: 'status',value:'sent'})"><i class="fa-solid fa-paper-plane"></i> Sent</button>
        <button class="btn" @click="setDisplayFilter({type: 'status',value:'trash'})"><i class="fa-solid fa-trash-can"></i> Trash</button>
        <button class="btn" @click="setDisplayFilter({type: 'status',value:'draft'})">Draft</button>
  

            <button class="btn" @click="setDisplayFilter({type: 'isRead',value:true})">Show Read</button>
            <button class="btn" @click="setDisplayFilter({type: 'isRead',value:false})">Show Unread</button>
            <button class="btn" @click="setDisplayFilter({type: 'isRead',value:null})">Show All</button>
 
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