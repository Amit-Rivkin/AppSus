import homePage from './general-pages/home-page-cmp.js'
import emailPage  from './apps/email/pages/email-app.cmp.js'
import keepPage  from './apps/keep/pages/keep-app.cmp.js'
// import bookApp  from './views/book-app.cmp.js'
// import bookDetails from './views/book-details.cmp.js'
const routes = [
    {
        path: '/',
        component: homePage
    },
    {
        path: '/email',
        component: emailPage
    },
    {
        path: '/keep',
        component: keepPage
    },
    // {
    //     path: '/book',
    //     component: bookApp
    // },
    // {
    //     path: '/book/:bookid',
    //     component: bookDetails
    // },
    
]

export const router = VueRouter.createRouter({
    routes,
    history: VueRouter.createWebHashHistory()
})