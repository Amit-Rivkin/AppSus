import emailPreview from './email-preview.cmp.js'
export default{
    props:['emails'],
    template: `
    <section class="email-list">
    <ul>
                <li v-for="email in emails" :key="email.id">
                   <email-preview :email="email" @read-msg="readMsg" @delete-msg="deleteMsg"/>
                   <!-- <div>{{email}}</div> -->
                </li>
                
            </ul>
    </section>
   `,
       data() {
           return {};
       },
       created() {},
       methods: {
        readMsg(id){
            this.$emit('readMsg',id)
        },
        deleteMsg(id){
            this.$emit('deleteMsg', id)
        },
       },
       computed: {},
       components:{
        emailPreview,
       },
   };
