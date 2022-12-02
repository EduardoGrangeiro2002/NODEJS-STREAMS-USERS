import { Router } from "express";
import userRoutes from "./users.routes";

class Routes {
    public static define(router: Router) {
        router.use("/users", userRoutes);
        return router
    }
}

export default Routes.define(Router());