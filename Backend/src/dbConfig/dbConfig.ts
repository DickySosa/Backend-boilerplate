import { DataSource } from "typeorm";
/**
 * @description type: The type of database used (e.g., postgres, mysql).
 * @description host: The address of the database server (e.g., localhost).
 * @description port: The port where the database server is listening (e.g., 5432).
 * @description username: The username to access the database (e.g., "postgres").
 * @description password: The password for the database user.
 * @description database: The name of the database being connected to.
 * @description entities: Location of entities (models or classes representing database tables).
 * @description logging: Enable or disable query logging to the console.
 * @description synchronize: Synchronize entities with the database (for development environments).
*/

export class DbSource {

   private static instance: DataSource;
   private constructor(){}

   public static getInstance(): DataSource {
      if(!DbSource.instance){
         DbSource.instance = new DataSource({
            type: "postgres",
            host: "localhost",
            port: 5432,
            username: "postgres",
            password: "Password",
            database: "database-name",
            entities: ["src/entity/**/*.ts"],
            logging: true,
            synchronize: true,
         });
      }
      return DbSource.instance
   }
}
