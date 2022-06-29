import {emailService} from '../services/email-service.js'
import emailList from '../cmps/email-list.cmp.js'

export default{
    template: `
    <section class="email-app" v-if="emails">
       <h3>email page</h3>
       <h6>Unread Email: {{unread}}</h6>
       <email-list :emails="emailsForDisplay" @read-msg="updateMsgs" @delete-msg="updateEmails"/>
    </section>
   `,
       data() {
           return {
            emails: null,
            filterBy: null,
            unread:0,

           };
       },
       created() {
        emailService.query().then(emails=> {
            this.emails = emails
            this.emails.forEach(eml=>{
                if(!eml.isRead) this.unread++
            })
        })
        
       },
       methods: {
        updateMsgs(){
            this.unread--;
        },
        updateEmails(id){
            const idx = this.emails.findIndex(email => {
                return email.id === id;
              });
              this.emails.splice(idx, 1);
        }
       },
       computed: {
        emailsForDisplay() {
            var emails = this.emails
            if(!this.filterBy)return emails
        },
       },
       components:{
        emailList,
       }
   };
