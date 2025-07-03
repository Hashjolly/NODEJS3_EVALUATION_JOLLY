import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Furniture from '../views/Furniture.vue'
import FurnitureDetail from '../views/FurnitureDetail.vue'
import Materials from '../views/Materials.vue'
import MaterialDetail from '../views/MaterialDetail.vue'
import Suppliers from '../views/Suppliers.vue'
import SupplierDetail from '../views/SupplierDetail.vue'
import About from '../views/About.vue'
import Contact from '../views/Contact.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/furniture',
    name: 'Furniture',
    component: Furniture
  },
  {
    path: '/furniture/:id',
    name: 'FurnitureDetail',
    component: FurnitureDetail,
    props: true
  },
  {
    path: '/materials',
    name: 'Materials',
    component: Materials
  },
  {
    path: '/materials/:id',
    name: 'MaterialDetail',
    component: MaterialDetail,
    props: true
  },
  {
    path: '/suppliers',
    name: 'Suppliers',
    component: Suppliers
  },
  {
    path: '/suppliers/:id',
    name: 'SupplierDetail',
    component: SupplierDetail,
    props: true
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
