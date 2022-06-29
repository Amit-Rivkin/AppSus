

export default {
    props: ['note'],
    template: `
        <section>
            <div>
            <h1>{{note.info.title}}</h1>  
            <h1>{{note.info.url}}</h1>
                <video width="320" height="240" controls>
                    <source src="note.info.url" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
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
