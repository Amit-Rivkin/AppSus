export default {
    template: `
        <header class="app-header ">
            <div class="main-layout flex space-between ">
            <img class="logo-img" src="imgs/logo.png" alt="">
            <nav class="nav-bar flex justify-center align-self-center ">
                <router-link class="header-link home" to="/">Home</router-link>
                <router-link class="header-link books"  to="/book">Books</router-link>
                <router-link class="header-link email"  to="/email">Email</router-link>
                <router-link class="header-link keep" to="/keep">Keep</router-link>
                
            </nav>
        </div>
        </header>
    
    `
}