export default {
    template: `
        <header class="app-header">
            <div class="logo">
            <img class="logo-img" src="../../imgs/logo.png" alt="">
            </div>
            <!-- <button  @click="toggleHamborger" class="hamburger-btn">🎞️</button> -->
            <nav class="nav-bar">
                <router-link to="/">Home</router-link>|
                <!-- <router-link to="/book">Books</router-link>| -->
                <router-link to="/email">Email</router-link>|
                <router-link to="/keep">Keep</router-link>|
             
            </nav>
        </header>
    
    `
}