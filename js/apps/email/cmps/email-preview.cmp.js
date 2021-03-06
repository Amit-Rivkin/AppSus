import emailHalf from './email-half.cmp.js'
import { emailService } from '../services/email-service.js'
export default {
    props:['email'],
    template:`
    <section class="email-container">
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
                    <div class="td"><span @click.stop="starMsg">{{getStar}}</span></div>
                    <div class="td">{{getSubject}}</div>
                    <div class="td">{{email.from}}</div>
                    <div class="td">{{convertTime}}</div>
                    <div class="td"><span :title="getTitle" @click.stop="markReadUnread" v-html="getReadStatus"></span></div>
                    <button class="delete-eml-btn" @Click="deleteMsg(email.id)"><i class="fa fa-trash" aria-hidden="true"></i></button>
                </div>
            </div>
        </section>
        <email-half @on-star="starMsg" v-if="shouldPreview" :email="email"/>
        <hr>
        </section>
    `,
    data(){
        return{
            shouldPreview:false,
            isRead:this.email.isRead,
            readColor: null,
            isStar: this.email.isStar

        }
    },
    created(){
        if(this.isRead) this.readColor = "#e0ecf9"
    },
    methods:{
        checkStatus(id){
            //toggle preview
            this.shouldPreview = !this.shouldPreview
            //take care of read status
            if(!this.isRead){
                this.isRead = !this.isRead
                this.readColor = "#e0ecf9"
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
                // this.email.isRead = true
                this.$emit('deleteMsg', {type:'update', id:this.email.id})

            }else{

                emailService.remove(id).then(()=>{
    
                    this.$emit('deleteMsg', {type:'delete', id:this.email.id})
                })
            }
        },
        starMsg(){
            this.isStar = !this.isStar
            this.email.isStar = !this.email.isStar
            emailService.save(this.email)
        },
        markReadUnread(){
            if(this.email.inTrash || this.email.from === emailService.getLoggedUserEmail()) return
            this.isRead = !this.isRead
            this.email.isRead = this.isRead
            this.isRead ? this.readColor = "#e0ecf9" : this.readColor = "#FFFFFF"
            emailService.save(this.email)
        }
    },
    computed:{
        getStar(){
            return this.isStar ? '???' : '???'
            
        },
        getReadStatus(){
           return this.isRead ?  '<i class="fa-solid fa-envelope-open"></i>' : '<i class="fa-solid fa-envelope"></i>'
        },
        convertTime(){
            return (Date.now() - this.email.sentAt > 86400000) ? 
            new Date(this.email.sentAt).toString().split(' ').slice(1,4).join(' ') : // return mon-day-year if over a day ago
            new Date(this.email.sentAt).toString().split(' ').slice(4,5).join(' ').slice(0,5) //return hh:mm
        },
        getTitle(){
           return this.isRead ? "Mark As Unread" : "Mark As Read"
        },
        getSubject(){
            return (this.email.subject.length>13) ? this.email.subject.slice(0,13) + "..." : this.email.subject
        }
       
    },
    components:{
        emailHalf,
    }
}