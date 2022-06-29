import emailHalf from './email-half.cmp.js'
import { emailService } from '../services/email-service.js'
export default {
    props:['email'],
    template:`
    <section>
        <section  class="email-preview" @click="checkStatus(email.id)">
            <p>From : {{email.to}}</p>
            <p>Subject: {{email.subject}}</p>
            <p>sent at: {{email.sentAt}}</p>
            <p>isRead: {{isRead}}</p>
            <email-half v-if="shouldPreview" :email="email"/>
        </section>
        <button @Click="deleteMsg(email.id)">Delete</button>
        <hr>
        </section>
    `,
    data(){
        return{
            shouldPreview:false,
            isRead:this.email.isRead,

        }
    },
    created(){
    },
    methods:{
        checkStatus(id){
            //toggle preview
            this.shouldPreview = !this.shouldPreview
            //take care of read status
            if(!this.isRead){
                this.isRead = !this.isRead
                emailService.get(id).then(email=>{
                    email.isRead = true
                    emailService.save(email)
                    this.$emit('readMsg')
                })

            }

            
        },
        deleteMsg(id){
            emailService.remove(id).then(()=>{

                this.$emit('deleteMsg', id)
            })
        }
       
    },
    computed:{
    },
    components:{
        emailHalf,
    }
}