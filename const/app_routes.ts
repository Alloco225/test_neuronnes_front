// export const GUEST_ROUTES = {
// }
const APP_ROUTES = {
    login: '/login',
    register: '/register',
    home: '/',
    // posts: '/posts',
    posts: {
        index: '/posts',
        create: '/posts/new',
    },
    error404: '/404',
}
export default APP_ROUTES;