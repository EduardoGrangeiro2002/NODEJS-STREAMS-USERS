import { Bcrypt } from "../../data/crypto";
import { UserRepositoryMYSQL } from "../../data/repositories";
import { CreateUser } from "../../data/services/CreateUser";
import { MassCreateUser } from "../../data/services/MassCreateUser";
import { UsersControllers } from "../../presentation/controllers";



export function makeFactoryUsersController() {
    const crypto = new Bcrypt()
    const usersRepository = new UserRepositoryMYSQL()
    const createUsersService = new CreateUser(usersRepository, crypto)
    const massCreateUsersService = new MassCreateUser()
    const usersControllers = new UsersControllers(createUsersService, massCreateUsersService)

    return usersControllers
}