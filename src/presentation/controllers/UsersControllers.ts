import { Request, Response } from "express";
import { ICreateUser, IMassCreateUser } from "../../domain/useCases";



export class UsersControllers {
    constructor(private createUsersServices: ICreateUser,
        private massCreateUsersServices: IMassCreateUser) {}

    async handle(req: Request, res: Response): Promise<Response> {
        try {
            const { name, email, password } = req.body;
            await this.createUsersServices.create(name, email, password);
            return res.status(201).json({msg: 'User created successfully!'});
        } catch(e) {
            console.error(e)
            return res.status(500).json("Internal Server error!");
        }
    }

    async massCreate(req: Request, res: Response): Promise<Response> {
        try {
            await this.massCreateUsersServices.massCreate();
            return res.status(201).json({msg: 'User created successfully!'});
        } catch(e) {
            console.error(e)
            return res.status(500).json("Internal Server error!");
        }
    } 
}