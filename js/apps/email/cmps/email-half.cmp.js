export default {
    props:['email'],
    template:`
        <section class="email-half">
            <div class="email-half-control-btn">
            <button class="control-btn big-btn">big</button>
            <button class="control-btn star-btn">star</button>
            </div>
            <div class="email-half-main-content" >
            <div class="line-content subject">Subject: {{email.subject}}</div>
            <div class="line-content">{{email.from}}</div>
            <p class="line-content">{{email.body}}</p>
            </div>
        </section>

    `,
    data(){
        return{
            showPreview:"false",
        }
    },
    created(){},
    methods:{
        togglePreview(){
            this.showPreview = !this.showPreview
        }
    },
    computed:{}
}