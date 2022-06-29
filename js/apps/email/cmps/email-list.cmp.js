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
        readMsg(){
            this.$emit('readMsg')
        },
        deleteMsg(id){
            console.log(id, "ssss")
            this.$emit('deleteMsg', id)
        },
       },
       computed: {},
       components:{
        emailPreview,
       },
   };
