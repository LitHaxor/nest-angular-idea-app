import { Controller, Body, Delete, Get, Param, Post, Put, UsePipes, UseGuards, Logger } from "@nestjs/common";
import { User } from "src/utils/decorator/user.decorator";
import { AuthGuard } from "src/utils/gurds/auth.guard";
import { ValidationPipe } from "src/utils/validations/validation.pipe";
import { CreateIdeaDto } from "../dtos/CreateIdea.dto";
import { UpdateIdeaDtos } from "../dtos/UpdateIdea.dto";
import { IdeaServices } from "../services/idea.service";

@Controller('v1/idea')
export class IdeaController {

    constructor(private readonly ideaService: IdeaServices) { }
    private logger = new Logger('IdeaController');
    private logData (id?:number, data?:any, user?:any){
        id && this.logger.log('IDEAS', JSON.stringify(id));
        data && this.logger.log('BODY', JSON.stringify(data));
        user && this.logger.log('USER', JSON.stringify(user));
    }
    @Get()
    getAllIdeas() {
        return this.ideaService.getAllIdeas();
    }

    @Post()
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe())
    createIdea(@User('id') id,@Body() createIdeaDto: CreateIdeaDto) {
        this.logData(id,createIdeaDto);
        return this.ideaService.createIdea(+id,createIdeaDto);
    }

    @Get(':id')
    getOneIdea(@Param('id') id: number) {
        return this.ideaService.getOneIdea(+id);
    }


    @Put(':id')
    @UseGuards(AuthGuard)
    @UsePipes(ValidationPipe)
    updateIdea(
        @Param('id') id: number,
        @Body() updateIdeaDto: Partial<UpdateIdeaDtos>,
        @User('id') userId: number
        ) {
        this.logData(id, updateIdeaDto);

        return this.ideaService.updateIdea(+id,+userId, updateIdeaDto);
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    destoryIdea(
        @Param('id') id: number,
        @User('id') userId: number,
        ) {
        return this.ideaService.deleteOne(+id, userId);
    }
}
