export default {
    SALT_ROUNDS: 8,
    PORT_DB: 3306,
    PORT: 3000,
    USER: 'api',
    DATABASE: 'company',
    HOST: 'localhost',
    PASSWORD: '123456',
    REQUESTS_PER_SECOND: 100,
    SCRIPT_TABLE: "CREATE TABLE IF NOT EXISTS `company`.`user_table` (`id_user` INT NOT NULL AUTO_INCREMENT,`name` VARCHAR(45) NOT NULL,`email` VARCHAR(45) NOT NULL,`password` VARCHAR(200) NOT NULL, PRIMARY KEY (`id_user`));"
}