export default {
    template: `
        <header class="app-header ">
            <div class="main-layout flex space-between ">
            <img class="logo-img" src="imgs/logo.png" alt="">
            <!-- <nav class="nav-bar flex justify-center align-self-center "> -->
            <nav class="nav-bar flex justify-center align-self-center " :class="{ 'nav-bar': !isOpen, 'nav-bar-open': isOpen }">
                <router-link @click="toggleHamburger" class="header-link home" to="/">Home</router-link>
                <router-link @click="toggleHamburger"  class="header-link books"  to="/book">Books</router-link>
                <router-link @click="toggleHamburger" class="header-link email"  to="/email">Email</router-link>
                <router-link @click="toggleHamburger" class="header-link keep" to="/keep">Keep</router-link>
                
            </nav>
        </div>
        <button class="hamburger-btn" @click="toggleHamburger">{{toggleIcon}}</button>
    </header>
    `,
    data() {
        return {
            isOpen: false,
        }
    },
    methods: {
        toggleHamburger() {
            this.isOpen = !this.isOpen
        },
        getClass(){
         return   this.isOpen ? "nav-bar-open" : "nav-bar"
        },
       
    },
    computed:{
    toggleIcon(){
        return   this.isOpen ? "X" : "☰"
       }
    },
}