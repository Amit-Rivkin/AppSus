import emailHalf from './email-half.cmp.js'
import { emailService } from '../services/email-service.js'
export default {
    props:['email'],
    template:`
    <section>
        <section  class="email-preview" @click="checkStatus(email.id)">
            <!-- <section class="flex">
                <p>{{getStar}}</p>
                <p>From : {{email.from}}</p>
                <p>Subject: {{email.subject}}</p>
                <p>sent at: {{email.sentAt}}</p>
                <p>isRead: {{isRead}}</p>
            </section> -->
            <div id="table">
                <div class="tr" :style="{backgroundColor: readColor}">
                    <div class="td">{{getStar}}</div>
                    <div class="td">{{email.subject}}</div>
                    <div class="td">{{email.from}}</div>
                    <div class="td">{{email.sentAt}}</div>
                    <div class="td">{{isRead}}</div>
                    <button class="delete-eml-btn" @Click="deleteMsg(email.id)"><i class="fa fa-trash" aria-hidden="true"></i>Delete</button>
                </div>
            </div>
            <email-half v-if="shouldPreview" :email="email"/>
        </section>
        <hr>
        </section>
    `,
    data(){
        return{
            shouldPreview:false,
            isRead:this.email.isRead,
            readColor: null,

        }
    },
    created(){
        if(this.isRead) this.readColor = "lightgrey"
    },
    methods:{
        checkStatus(id){
            //toggle preview
            this.shouldPreview = !this.shouldPreview
            //take care of read status
            if(!this.isRead){
                this.isRead = !this.isRead
                this.readColor = "lightgrey"
                emailService.get(id).then(email=>{
                    email.isRead = true
                    emailService.save(email)
                    this.$emit('readMsg', id)
                })

            }

            
        },
        deleteMsg(id){
            if(!this.email.inTrash){
                this.email.inTrash = true
                this.email.isRead = true
                this.$emit('deleteMsg', {type:'update', id:this.email.id})

            }else{

                emailService.remove(id).then(()=>{
    
                    this.$emit('deleteMsg', {type:'delete', id:this.email.id})
                })
            }
        },
        isReadStyle(){
            if(this.isRead){
                return 'grey'
            } 
        }
    },
    computed:{
        getStar(){
            return this.email.isStar ? '★' : '☆'
            
        }
       
    },
    components:{
        emailHalf,
    }
}