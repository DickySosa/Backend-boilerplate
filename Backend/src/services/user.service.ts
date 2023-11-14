import { Request, Response } from 'express';
import { User } from "../entity/user.entity";
import { DbSource } from '../dbConfig/dbConfig';
import { DataSource, Repository } from 'typeorm';


export class UserService {
    private db: DataSource;
    private userRepository: Repository<User>;
    private static instance: UserService;
 
    private constructor(){
        this.db = DbSource.getInstance();
        this.userRepository = this.db.getRepository(User)
        
    }
 
    public static getInstance(): UserService {
       if(!UserService.instance){
          UserService.instance = new UserService();
       }
       return UserService.instance
    }

    public async createUser  (req:Request, res:Response){
        const {username,email,password} = req.body
        try {
            const user = await this.userRepository.save({
                username, email, password
            })
            this.userRepository.save(user)
            res.status(200).json({message:"User saved in Database"});
        } catch (error) {
            console.log('ERROR >>>> ', error)
            res.status(500).json({message:"Error ocurred while saving user in Database"});
        }
    }
 }
 