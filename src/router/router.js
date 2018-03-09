import Vue from 'vue'
import VueRouter from 'vue-router'

//COMPONENTS T0 BE RENDERED
import App from '../App.vue'
import Home from '../components/home/Home.vue'
import Login from '../components/home/Login.vue'
import Signup from '../components/home/Signup.vue'
import Terms from '../components/home/Terms.vue'
import ForgotPassword from '../components/home/ForgotPassword.vue'
import Profile from '../components/home/Profile.vue'
import Comments from '../components/comments/CommentDetails.vue'
import PostDetails from '../components/posts/PostDetails.vue'


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
      // children: [
      //   {
      //     // Comments Component will be rendered inside Home <router-view>
      //     // when /comments is matched
      //     path: '/comments',
      //     component: Comments,
      //     name:'comments',
      //   },
      //   {
      //     //Comments Component will be rendered inside Home <router-view>
      //     //when /comments is matched
      //     path: '/post-details',
      //     component: PostDetails,
      //     name:'postDetails',
      //   },
      // ]
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
    {
      path: '/profile',
      component: Profile,
      name:'profile',
    },
]

export default new VueRouter({
  mode: 'history',
  routes: routes,
})
