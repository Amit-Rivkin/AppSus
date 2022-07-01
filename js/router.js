import homePage from './general-pages/home-page-cmp.js'
import emailPage  from './apps/email/pages/email-app.cmp.js'
import keepPage  from './apps/keep/pages/keep-app.cmp.js'
import bookApp  from './apps/books/pages/book-app.cmp.js'
import bookDetails from './apps/books/pages/book-details.cmp.js'
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
    {
        path: '/book',
        component: bookApp
    },
    {
        path: '/book/:bookid',
        component: bookDetails
    },
    
]

export const router = VueRouter.createRouter({
    routes,
    history: VueRouter.createWebHashHistory()
})