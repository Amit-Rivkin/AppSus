export default {
    props:['email'],
    template:`
        <section class="email-half">
            <div class="email-half-control-btn">
            <button class="control-btn big-btn"><i class="fa-solid fa-expand"></i></button>
            <button @click="emitStar" class="control-btn star-btn">⭐</button>
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
        },
        emitStar(){
            this.$emit('onStar')
        }
    },
    computed:{}
}