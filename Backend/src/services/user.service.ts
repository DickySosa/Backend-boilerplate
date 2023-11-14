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

    public async getAllUsers (req:Request, res:Response) {
        try {
            const users = await this.userRepository.find()
            res.status(200).json(users);
        } catch (error) {
            console.log('ERROR >>>> ', error)
            res.status(500).json({message:"Error ocurred while saving user in Database"});
        }
    }

    public async getUser (req:Request, res:Response) {
        try {
            const userId = parseInt(req.params.id)
            const user = await this.userRepository.findOneBy({
                id: userId
            })
            if(user){
             res.status(200).json(user)
            } else {
                res.status(404).json({message: 'User was not found'})
            }
        } catch (error) {
            console.log('ERROR >>>> ', error)
            res.status(500).json({message: 'Unable to get user'})
        }
    }

    public async updateUser  (req:Request, res:Response) {
        const {username,email,password} = req.body
        const userId = parseInt(req.params.id)
        try {
            const user = await this.userRepository.save({
                id: userId,username, email, password
            })
            this.userRepository.save(user)
            res.status(200).json({message:"User updated correctly"});
        } catch (error) {
            console.log('ERROR >>>> ', error)
            res.status(500).json({message:"Error ocurred while updating user in Database"});
        }
    }
    public async deleteUser (req:Request, res:Response) {
        try {
            const gameId = parseInt(req.params.id)
            const game = await this.userRepository.delete({
              id: gameId
            })
            if (game.affected === 1) {
              res.json({message:"User delete successfully"});
            } else {
              res.status(404).json({message:"User does not exist"});
            }
            console.log(game);
          } catch (error) {
            console.log("Error ocurred while deleting user >>>>", error);
            res.status(500).json({message: "Error ocurred while deleting game"});
          }
    }
 }
 