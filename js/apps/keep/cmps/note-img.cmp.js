
export default {
    props: ['info'],
    template: `
        <section>
            <div>
            <h1>{{info.title}}</h1>  
                <img :src="info.url">
            </div>
        </section>
        `,
    data() {
        return {

        }
    },
    methods: {
    
    },
    computed: {
    }
}
