import {emailService} from '../services/email-service.js'
import emailList from '../cmps/email-list.cmp.js'
import composeEmail from '../cmps/compose.cmp.js'
import emailFilter from '../cmps/email-filter.cmp.js'
export default{
    template: `
    <section class="email-app" v-if="emails">
       <h3>email page</h3>
       <h6>Unread Email: {{unread}}</h6>
       <email-filter @filter-change="setDisplayFilter"/>
       <button @click="compose">Compose</button>
       <email-list :emails="emailsForDisplay" @read-msg="updateMsgs" @delete-msg="removeEmail"/>
       <compose-email v-if="isCompose" @exit-compose="isCompose=false" @send-email="updateEmails"/>
    </section>
   `,
       data() {
           return {
            emails: null,
            filterBy: { //'inbox/sent/trash/draft'
                showType:'inbox'
            },
            unread:0,
            isCompose:false,

           };
       },
       created() {
        emailService.query().then(emails=> {
            this.emails = emails
            this.emails.forEach(eml=>{
                if(!eml.isRead) this.unread++
            })

        })
        this.filterBy = emailService.getFilter()
        
       },
       methods: {
        updateMsgs(){
            this.unread--;
        },
        removeEmail(id){
            const idx = this.emails.findIndex(email => {
                return email.id === id;
              });
              this.emails.splice(idx, 1);
        },
        compose(){
            this.isCompose = true
        },
        updateEmails(eml){
            this.isCompose=false
            this.emails.push(eml)
            //add modal for successfully sending message
        },
        setDisplayFilter(filter){
            this.filterBy[filter.type] = filter.value
            emailService.setFilter(filter.type, filter.value)
        }
       },
       computed: {
        emailsForDisplay() {
            var emails = this.emails
            if(!this.filterBy)return emails
            if(this.filterBy.status === "inbox") {
                return emails.filter(email=> email.to === emailService.getLoggedUserEmail())
            }
            if(this.filterBy.status === "sent") {
                return emails.filter(email=> email.from === emailService.getLoggedUserEmail())
            }
        },
       },
       components:{
        emailList,
        composeEmail,
        emailFilter,

       }
   };
