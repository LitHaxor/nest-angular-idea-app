import { Controller, Body, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CreateIdeaDto } from "../dtos/CreateIdea.dto";
import { UpdateIdeaDtos } from "../dtos/UpdateIdea.dto";
import { IdeaServices } from "../services/idea.service";

@Controller('v1/idea')
export class IdeaController {

    constructor(private readonly ideaService: IdeaServices) { }
    @Get()
    getAllIdeas() {
        return this.ideaService.getAllIdeas();
    }

    @Post()
    createIdea(@Body() createIdeaDto: CreateIdeaDto) {
        return this.ideaService.createIdea(createIdeaDto);
    }

    @Get(':id')
    getOneIdea(@Param('id') id: number) {
        return this.ideaService.getOneIdea(+id);
    }

    @Put(':id')
    updateIdea(@Param('id') id: number, @Body() updateIdeaDto: UpdateIdeaDtos) {
        return this.ideaService.updateIdea(id, updateIdeaDto);
    }

    @Delete(':id')
    destoryIdea(@Param('id') id: number) {
        return this.ideaService.deleteOne(+id);
    }
}