
export default {
    props: ['note'],
    template: `
        <section>
            <h1>{{note.info.title}}</h1>   
            <div class="img-container">
                <img :src= "note.info.url" >
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

    },
    
}
