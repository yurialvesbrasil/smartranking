import { Module } from '@nestjs/common';
import { PlayersModule } from './jogadores/players.module';

@Module({
  imports: [PlayersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
