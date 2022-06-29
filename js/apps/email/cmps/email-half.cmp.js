export default {
    props:['email'],
    template:`
        <section class="email-half">
            <p>text: {{email.body}}</p>
            <hr>
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