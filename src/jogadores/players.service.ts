import { v4 as uuidv4 } from 'uuid';
import { Injectable, Logger } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { Player } from './interfaces/player.interface';

@Injectable()
export class PlayersService {
  private readonly logger = new Logger(CreatePlayerDto.name);
  private listPlayers: Player[] = [];

  async createUpdatePlayer(createPlayerDto: CreatePlayerDto): Promise<void> {
    const playerFound: Player = await this.find(createPlayerDto.email);

    if (playerFound == undefined) {
      this.create(createPlayerDto);
    } else {
      this.update(playerFound);
    }
  }

  async listPlayersService(): Promise<Player[]> {
    return await this.list();
  }

  private create(createPlayerDto: CreatePlayerDto): void {
    const { name, email, phoneNumber } = createPlayerDto;

    const player: Player = {
      _id: uuidv4(),
      name: name,
      email: email,
      phoneNumber: phoneNumber,
    };
    this.listPlayers.push(player);
    this.logger.debug(`Player criado: ${JSON.stringify(player)}`);
  }

  private update(playerFound: Player): void {
    this.listPlayers.slice(this.listPlayers.indexOf(playerFound), 1);
    this.listPlayers.push(playerFound);
    this.logger.debug(`Player atualizado: ${JSON.stringify(playerFound)}`);
  }

  private list(): Promise<Player[]> {
    return Promise.resolve(this.listPlayers);
  }

  private find(email: string): Promise<Player> {
    return Promise.resolve(
      this.listPlayers.find((element) => element.email == email),
    );
  }

  //private createPlayerStatus(idPlayer: String, createPlayerDto: CreatePlayerDto): void {}
}
