import { IsNotEmpty, IsString } from 'class-validator';

export class CreateIdeaDto {

    @IsString()
    description: string;

    @IsString()
    idea: string;
}