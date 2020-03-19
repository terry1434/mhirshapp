import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Demo from '../views/Demo.vue'
import items from '../views/itemConfig/items.vue'
import itemEdit from '../views/itemConfig/itemEdit.vue'
import chargeInput from '../views/inputLayout/chargeInput.vue'
Vue.use(VueRouter)


const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'Demo',
    component: Demo,
    children: [
      { component: items, path: "itemConfig/items", meta: { keepAlive: true } },
      { component: itemEdit, path: "itemConfig/itemCreate" },
      { component: itemEdit, path: "itemConfig/itemCreate/:id", props: true },
      { component: itemEdit, path: "itemConfig/itemEdit/:id", props: true },//props表示将:id作为组件的prop
      { component: chargeInput, path: "inputLayout/chargeInput" }
    ],
    redirect: "/itemConfig/items"
  },
]

const router = new VueRouter({
  routes,

})

export default router
