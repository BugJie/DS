import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [{
        path: "/",
        redirect: "/login",
    },
    // 主页
    {
        path: "/index",
        name: "Index",
        component: () =>
            import ( /* webpackChunkName: "about" */ "../views/index.vue"),
        children: [
            // 用户管理
            {
                path: "users",
                name: "Users",
                component: () =>
                    import (
                        /* webpackChunkName: "about" */
                        "../components/user/users.vue"
                    ),
            },
            // 角色列表
            {
                path: "roles",
                name: "roles",
                component: () =>
                    import (
                        /* webpackChunkName: "about" */
                        "../components/roles/roles.vue"
                    ),
            },
            // 权限列表
            {
                path: "rights",
                name: "rights",
                component: () =>
                    import (
                        /* webpackChunkName: "about" */
                        "../components/rights/rights.vue"
                    ),
            },
            // 数据统计
            {
                path: "reports",
                name: "reports",
                component: () =>
                    import (
                        /* webpackChunkName: "about" */
                        "../components/reports/reports.vue"
                    ),
            },
        ],
    },
    // 登录
    {
        path: "/login",
        name: "Login",
        component: () =>
            import ( /* webpackChunkName: "about" */ "../components/login/login.vue"),
    },
];



const router = new VueRouter({
    routes,
});
// 挂载导航的路由守卫
router.beforeEach((to, from, next) => {
    // 如果访问的是登陆页面，可以直接放行
    if (to.path === '/login') return next()
        // 获取token
    const tokenstr = window.sessionStorage.getItem('token')
    if (!tokenstr) return next('/login')
    next()

})

export default router;