import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateIdeaDto } from "../dtos/CreateIdea.dto";
import { UpdateIdeaDtos } from "../dtos/UpdateIdea.dto";
import { IdeaEntity } from "../entity/idea.entity";

@Injectable()
export class IdeaServices {
    private logger = new Logger('IdeaController');
    constructor(@InjectRepository(IdeaEntity) private ideaRepository: Repository<IdeaEntity>) { }

    async getAllIdeas() {
        return await this.ideaRepository.find();
    }

    async createIdea(createIdeaDto: CreateIdeaDto) {
        this.logger.log(JSON.stringify(createIdeaDto));
        return await this.ideaRepository.save(this.ideaRepository.create(createIdeaDto));
    }

    async getOneIdea(id: number) {
        const idea = await this.ideaRepository.findOne(id);
        if (!idea) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        return idea;
    }

    async updateIdea(id: number, updateIdeaDto: Partial<UpdateIdeaDtos>) {
        this.logger.log(JSON.stringify(updateIdeaDto));
        this.getOneIdea(id);
        try {
            await this.ideaRepository.update(id, updateIdeaDto);
        } catch (error) {
            Logger.log(error);
            throw new HttpException('Update failed', HttpStatus.BAD_REQUEST);
        }
        return this.getOneIdea(id);
    }

    async deleteOne(id: number) {
        const idea = this.getOneIdea(id);
        await this.ideaRepository.delete(id);
        return idea;
    }
}