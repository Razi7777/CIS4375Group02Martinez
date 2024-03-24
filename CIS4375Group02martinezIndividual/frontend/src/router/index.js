import { createRouter, createWebHistory } from 'vue-router'
import { useLoggedInUserStore } from '../store/loggedInUser'

// make all paths and names lowercase for consistency
const routes = [
  {
    path: '/',
    redirect: '/login' // Redirect root URL to login page
  },
  {
    path: "/login",
    name: "login",
    component: () => import('../views/login.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/product-catalog',
    name: 'productcatalog',
    component: () => import('../views/ProductCatalog.vue'),
    //meta: { requiresAuth: true },
  },
  {
    path: '/clientform',
    name: 'clientform',
    // only authenticated users can create clients
    //meta: { requiresAuth: true },
    component: () => import('../views/clientform.vue')
  },
  {
    path: '/ordertracking',
    name: 'ordertracking',
    //meta: { requiresAuth: true },
    component: () => import('../views/ordertracking.vue')
  },
  {
    path: '/FAQ',
    name: 'FAQ',
    //meta: { requiresAuth: true },
    component: () => import('../views/FAQ.vue')
  },
  {
    path: '/Contact',
    name: 'Contact',
    //meta: { requiresAuth: true },
    component: () => import('../views/Contact.vue')
  },
  {
    path: '/clientdetails/:id',
    name: 'clientdetails',
    //meta: { requiresAuth: true },
    component: () => import('../views/clientdetails.vue')
  },
  {
    path: '/eventform',
    name: 'eventform',
    //meta: { requiresAuth: true },
    component: () => import('../views/eventform.vue')
  },
  {
    path: '/findevents',
    name: 'findevents',
    //meta: { requiresAuth: true },
    component: () => import('../views/findevents.vue')
  },
  {
    path: '/eventdetails/:id',
    name: 'eventdetails',
    //meta: { requiresAuth: true },
    component: () => import('../views/eventdetails.vue')
  },
  {
    path: '/serviceform',
    name: 'serviceform',
    //meta: { requiresAuth: true },
    component: () => import('../views/serviceform.vue')
  },
  {
    path: '/findservice',
    name: 'findservice',
    //meta: { requiresAuth: true },
    component: () => import('../views/findservice.vue')
  },
  {
    path: '/servicedetails/:id',
    name: 'servicedetails',
    //meta: { requiresAuth: true },
    component: () => import('../views/servicedetails.vue')
  },
  {
    path: '/terms-and-conditions',
    name: 'termsandconditions',
    component: () => import('../views/TermsAndConditions.vue'),
  },
  {
    path: '/privacy-policy',
    name: 'privacypolicy',
    component: () => import('../views/PrivacyPolicy.vue'),
  },
  {
    path: '/return-and-exchange',
    name: 'returnandexchange',
    component: () => import('../views/ReturnAndExchange.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// protecting the routes
router.beforeEach((to) => {
  const store = useLoggedInUserStore()
  if (to.meta.requiresAuth && !store.isLoggedIn) {
    return {
      path: '/login',
      // save the location we were at to come back later
      query: { redirect: to.fullPath },
    }
  }
})

export default router;

