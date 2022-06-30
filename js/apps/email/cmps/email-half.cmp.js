export default {
    props:['email'],
    template:`
        <section class="email-half">
            <button>Big</button>
            <button>star</button>
            <div>Subject {{email.subject}}</div>
            <div>{{email.from}}</div>
            <p>{{email.body}}</p>
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