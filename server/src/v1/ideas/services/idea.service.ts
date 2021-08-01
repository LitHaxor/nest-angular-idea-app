import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateIdeaDto } from "../dtos/CreateIdea.dto";
import { UpdateIdeaDtos } from "../dtos/UpdateIdea.dto";
import { IdeaEntity } from "../entity/idea.entity";

@Injectable()
export class IdeaServices {
    constructor(@InjectRepository(IdeaEntity) private ideaRepository: Repository<IdeaEntity>) { }

    async getAllIdeas() {
        return await this.ideaRepository.find();
    }

    async createIdea(createIdeaDto: CreateIdeaDto) {
        return await this.ideaRepository.save(this.ideaRepository.create(createIdeaDto));
    }

    async getOneIdea(id: number) {
        return await this.ideaRepository.findOne(id);
    }

    async updateIdea(id: number, updateIdeaDto: Partial<UpdateIdeaDtos>) {
        return await this.ideaRepository.update(id, updateIdeaDto);
    }

    async deleteOne(id: number) {
        return await this.ideaRepository.delete(id);
    }
}