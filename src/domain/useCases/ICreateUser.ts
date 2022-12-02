export interface ICreateUser {
    create (name: string, email: string, password: string): Promise<void>
}