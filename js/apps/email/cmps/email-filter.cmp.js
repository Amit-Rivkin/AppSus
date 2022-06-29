export default {
    
    template:`
        <section class="email-filter">
        <button @click="setDisplayFilter({type: 'status',value:'inbox'})">Inbox</button>
        <button @click="setDisplayFilter({type: 'status',value:'sent'})">Sent</button>
        <button @click="setDisplayFilter({type: 'status',value:'trash'})">Trash</button>
        <button @click="setDisplayFilter({type: 'status',value:'draft'})">Draft</button>
        <hr>
        </section>

    `,
    data(){
        return{
            
        }
    },
    created(){},
    methods:{
        setDisplayFilter(filter){
            console.log(filter)
            this.$emit('filterChange', filter)
        }
    },
    computed:{}
}