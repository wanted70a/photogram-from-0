import Vue from 'vue'
import VueRouter from 'vue-router'

//COMPONENTS T0 BE RENDERED
import App from '../App.vue'
import Home from '../components/home/Home.vue'
import Login from '../components/home/Login.vue'
import Signup from '../components/home/Signup.vue'
import Terms from '../components/home/Terms.vue'
import Comments from '../components/comments/Comments.vue'
import ForgotPassword from '../components/home/ForgotPassword.vue'


Vue.use(VueRouter);

var routes = [
    {
        path:'/',
        component:Login,
        name:'login',
        meta: { requiresAuth: false },
    },
    {
      path: '/home',
      component: Home,
      name:'home',
      meta: { requiresAuth: true },
      children: [
        {
          // UserProfile will be rendered inside User's <router-view>
          // when /user/:id/profile is matched
          path: '/comments',
          component: Comments,
          name:'comments',
        },
      ]
    },
    {
      path: '/signup',
      component: Signup,
      name:'signup'
    },
    {
      path: '/terms',
      component: Terms,
      name:'terms'
    },
    {
      path: '/forgot-password',
      component: ForgotPassword,
      name:'forogotPassword'
    },
]

export default new VueRouter({
  mode: 'history',
  routes: routes,
})
