import Vue from 'vue'
import VueRouter from 'vue-router'

//COMPONENTS T0 BE RENDERED
import App from '../App.vue'
import Home from '../components/home/Home.vue'
import Create from '../components/home/CreateNewPost.vue'
import Login from '../components/home/Login.vue'
import Signup from '../components/home/Signup.vue'
import Terms from '../components/home/Terms.vue'
import ForgotPassword from '../components/home/ForgotPassword.vue'
import Profile from '../components/home/Profile.vue'
import EditProfile from '../components/home/EditProfile.vue'
import Comments from '../components/comments/CommentDetails.vue'
import PostDetails from '../components/posts/PostDetails.vue'
import UploadPhoto from '../components/user/UploadPhoto.vue'


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
      name:'forgotPassword'
    },
    {
      path: '/profile/:id',
      component: Profile,
      name:'profile',
      children:[

      ]
    },
    {
      path: '/create',
      component: Create,
      name:'create',
      meta: { requiresAuth: true },
    },
    {
      path: '/edit-profile',
      component: EditProfile,
      name:'editProfile',
      meta: { requiresAuth: true },
      children:[
          {
            path: '/upload-photo',
            component: UploadPhoto,
            name:'uploadPhoto',
            meta: { requiresAuth: true },
          },
      ]
    },
]

export default new VueRouter({
  mode: 'history',
  routes: routes,
})
