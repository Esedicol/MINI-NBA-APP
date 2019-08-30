import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home'
import Player from './components/Players/player'
import NewPlayer from './components/Players/newPlayer'
import Champs from './components/WorldChamps'
import newChamps from './newChamps'
import signUp from './components/User/signUp'
import login from './components/User/login'

import firebase from  'firebase';


Vue.use(Router);

let router =  new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
          requiresAuth: true
      }
    },

      {
          path: '/players',
          name: 'Player',
          component: Player,
          meta: {
              requiresAuth: true
          }
      },
      {
          path: '/newPlayer',
          name: 'newPlayer',
          component: NewPlayer,
          meta: {
              requiresAuth: true
          }
      },
      {
          path: '/champs',
          name: 'champs',
          component: Champs,
          meta: {
              requiresAuth: true
          }
      },
      {
          path: '/newChamps',
          name: 'newChamps',
          component: newChamps,
          meta: {
              requiresAuth: true
          }
      },
      {
          path: '/signUp',
          name: 'signUp',
          component: signUp
      },
      {
          path: '/login',
          name: 'login',
          component: login
      }
  ]
});

// Nav Guard
router.beforeEach((to, from, next) => {
    // Check for requiresAuth guard
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // Check if NO logged user
        if (!firebase.auth().currentUser) {
            // Go to login
            next({
                path: '/login',
                query: {
                    redirect: to.fullPath
                }
            });
        } else {
            // Proceed to route
            next();
        }
    }
    else {
        // Proceed to route
        next();
    }
});

export default router;
