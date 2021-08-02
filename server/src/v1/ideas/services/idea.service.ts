import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/v1/user/entity/User.entity";
import { Repository } from "typeorm";
import { CreateIdeaDto } from "../dtos/CreateIdea.dto";
import { UpdateIdeaDtos } from "../dtos/UpdateIdea.dto";
import { IdeaEntity } from "../entity/idea.entity";

@Injectable()
export class IdeaServices {
    
    constructor(
        @InjectRepository(IdeaEntity) private ideaRepository: Repository<IdeaEntity>,
        @InjectRepository(UserEntity) private readonly userRepository:Repository<UserEntity>
    ) { }


    toResponseObject(idea:IdeaEntity){
        return {...idea, author: idea.author.toReponseObject(false) };
    }

    private ensureOwnerShip (idea:IdeaEntity, userId: number){
        if(idea.author.id !== userId){
            throw new HttpException('You don\'t belong here!',HttpStatus.UNAUTHORIZED);
        }
    }

    async getAllIdeas() {
        const ideas =  await this.ideaRepository.find({
            relations: ['author']
        });
        return ideas.map(idea => this.toResponseObject(idea));
    }

    async createIdea(id: number,createIdeaDto: CreateIdeaDto) {
        const user = await this.userRepository.findOne(id);
        const idea =  await this.ideaRepository.save(
            this.ideaRepository.create({
                ...createIdeaDto,
                author: user
            })
        );
        return this.toResponseObject(idea);

    }

    async getOneIdea(id: number) {
        const idea = await this.ideaRepository.findOne({
            where:{id},
            relations: ['author']
        });
        if (!idea) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        return this.toResponseObject(idea);
    }

    async updateIdea(
        id: number,
        userId: number,
        updateIdeaDto: Partial<UpdateIdeaDtos>,
        ) {
        const idea = await this.ideaRepository.findOne(id, {
            relations: ['author']
        });
        if(!idea) throw new HttpException('Idea not found!', HttpStatus.NOT_FOUND);
        this.ensureOwnerShip(idea ,userId);
        try {
            await this.ideaRepository.update(id, updateIdeaDto);
        } catch (error) {
            Logger.log(error);
            throw new HttpException('Update failed', HttpStatus.BAD_REQUEST);
        }
        return this.getOneIdea(id);
    }

    async deleteOne(id: number, userId: number) {
        const idea = await this.ideaRepository.findOne(id,{
            relations: ['author']
        });
        if(!idea) throw new HttpException('Idea not found!', HttpStatus.NOT_FOUND);
        this.ensureOwnerShip(idea, userId);
        await this.ideaRepository.delete(id);
        return {
            deleted: true,
            ...idea.author.toReponseObject() 
        };
    }
}