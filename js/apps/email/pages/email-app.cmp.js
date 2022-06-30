import {emailService} from '../services/email-service.js'
import emailList from '../cmps/email-list.cmp.js'
import composeEmail from '../cmps/compose.cmp.js'
import emailFilter from '../cmps/email-filter.cmp.js'
export default{
    template: `
       <h1>Unread Email: {{unread}}</h1>
       <button class="compose-btn" @click="compose"><i class="fa-solid fa-plus"></i> Compose</button>
    <section class="email-app" v-if="emails">
 
        <email-filter class="flex flex-column gap" @filter-change="setDisplayFilter"/>
       <email-list :emails="emailsForDisplay" @read-msg="updateMsgs" @delete-msg="removeEmail"/>
       <compose-email v-if="isCompose" @exit-compose="isCompose=false" @send-email="updateEmails"/>
    </section>
   `,
       data() {
           return {
            emails: null,
            filterBy: { //'inbox/sent/trash/draft'
                
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
        updateMsgs(id){
            let email = this.emails.find(eml=>eml.id === id)
            email.isRead =true
            this.unread--;
        },
        removeEmail(id){

            const idx = this.emails.findIndex(email => {
                return email.id === id.id;
              });

            if(id.type === 'delete'){
                  this.emails.splice(idx, 1);

            }else{
                
                emailService.save(this.emails[idx])
            }
            if(this.emails[idx].isRead){
                this.unread--;}
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
            if(filter.type === "isRead") {
                
                this.filterBy.status = "inbox" 
            }
            console.log("filterby", this.filterBy)
            emailService.setFilter(filter.type, filter.value)
        }
       },
       computed: {
        emailsForDisplay() {
            var emails = this.emails
            if(!this.filterBy)return emails
            //filter by text
            if(this.filterBy.txt !== '') emails = emails.filter(email=> email.from.includes(this.filterBy.txt) || email.subject.includes(this.filterBy.txt) || email.body.includes(this.filterBy.txt))
            //filter by read
            if(this.filterBy.isRead !== null){
                if(this.filterBy.isRead) emails = emails.filter(email=> email.isRead)
                else emails = emails.filter(email=> !email.isRead)

            }
            //filter by status
            if(this.filterBy.status === "inbox") {
                return emails.filter(email=> email.to === emailService.getLoggedUserEmail() && !email.inTrash)
            }
            if(this.filterBy.status === "sent") {
                return emails.filter(email=> email.from === emailService.getLoggedUserEmail() && !email.inTrash)
            }
            if(this.filterBy.status === "trash"){
                return emails.filter(email=> email.inTrash)
            }
        },
       },
       components:{
        emailList,
        composeEmail,
        emailFilter,

       }
   };
