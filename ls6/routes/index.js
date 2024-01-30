import { postRouter } from "./post.js";
import { authRouter } from "./public.js";
import { userRouter } from "./user.js";
import { authenticated, authorization } from "../middlewares/auth.middleware.js"

const routes = [
    // PRIVATE - Protected
    {
        path: "/posts",
        router: postRouter,
    },
    {
        path: "/users",
        router: userRouter,
    },
    // PUBLIC
    {
        path: "/auth",
        router: authRouter
    }
]

const routesFn = (app) => {

    routes.forEach((route) => {
        if (route.path === "/auth") {
            app.use(route.path, route.router);
        } else if (route.path === "/posts") {
            app.use(route.path, authenticated, route.router);
        } else if (route.path === "/users") {
            app.use(route.path, authenticated, authorization, route.router);
        }
    });
}

// app.use("/posts",authenticated ,postRouter)
// app.use('/users', authenticated, authorization,userRouter)
// app.user("/auth",authRouter)


export default routesFn