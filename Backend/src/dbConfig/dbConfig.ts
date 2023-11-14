import { DataSource } from "typeorm";

/**
 * @description Type: The type of database used (e.g., postgres, mysql).
 * @description Host: The address of the database server (e.g., localhost).
 * @description Port: The port where the database server is listening (e.g., 5432).
 * @description Username: The username to access the database (e.g., "postgres").
 * @description Password: The password for the database user.
 * @description Database: The name of the database being connected to.
 * @description Entities: Location of entities (models or classes representing database tables).
 * @description Logging: Enable or disable query logging to the console.
 * @description Synchronize: Synchronize entities with the database (for development environments).
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
            password: "your-password",
            database: "database-name",
            entities: ["src/entity/**/*.ts"],
            logging: true,
            synchronize: true,
         });
      }
      return DbSource.instance
   }
}
