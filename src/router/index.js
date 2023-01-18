import Vue from 'vue'
import VueRouter from "vue-router";
import TableComponents from "@/components/TableComponents";
import Search from "@/components/SearchProduct";
import Register from "@/components/Register";
import PageTwo from "@/components/PageTwo";
import Index from "@/components/index"

Vue.use(VueRouter);

const routes = [
    {
        path:"/",
        name:"Product",
        component:Index,
        redirect:"/pageOne",
        children:[
            {
                path:"/searchProduct",
                name:"Search Product",
                component:Search
            },
            {
                path:"/pageTwo",
                name:"第二页",
                component:PageTwo
            }
        ]
    },

    {
        path:"/",
        name:"User",
        component:Index,
        children:[
            {
                path:"/pageOne",
                name:"Register",
                component:Register
            },
            {
                path:"/userAddProducts",
                name:"Add Products",
                component:TableComponents
            }
        ]
    }
]
const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;