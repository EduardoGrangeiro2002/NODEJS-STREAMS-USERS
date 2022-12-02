import { Router } from "express";
import { makeFactoryUsersController } from "../../factory";
import multer from "multer";


const router = Router();
const upload = multer({
    dest: '../../../tmp'
})
const usersControllers = makeFactoryUsersController();

router.post("/mass-create", upload.single('file'), (req, res) => usersControllers.massCreate(req, res))

router.post("/create", (req, res) => usersControllers.handle(req, res))

export default router;