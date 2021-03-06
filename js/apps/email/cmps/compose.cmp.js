import {emailService} from '../services/email-service.js'

export default {
    template:`
        <section class="compose">
            <h1 class="compose-title">New Message</h1>
            <input type="text" placeholder="To" v-model="to">
            <input type="text" placeholder="Subject" v-model="subject">
            <textarea rows="30" cols="50" v-model="messageText"></textarea>
            <div class="flex space-between">
            <button class="send-btn" @click="sendEmail">Send</button>
            <button class="exit-btn" @click="exitCompose">X</button>
            </div>

            <!-- <pre>to: {{to}}</pre>
            <pre>sub: {{subject}}</pre>
            <pre>msg: {{messageText}}</pre> -->
        </section>

    `,
    data(){
        return{
            to:'',
            subject:'',
            messageText:'',

        }
    },
    created(){},
    methods:{
     exitCompose(){
        this.$emit('exitCompose')
     },
     sendEmail(){
        if(this.subject === '' || this.messageText === ''){
            console.log('one of the mendatory fields is empty')
            return
            //TODO: add modal, add email sanitization
        }
        //create empty email
        var eml = emailService.getEmptyEmail()
        eml.to = this.to
        eml.subject = this.subject
        eml.body = this.messageText
        //add to email array
        emailService.save(eml).then(()=>{

            //emit to change email list on main component
            this.$emit('sendEmail',eml)
        })

     }
    },
    computed:{}
}