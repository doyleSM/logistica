import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService {
  constructor(private readonly nestConfigService: NestConfigService) {}

  get(key: string): any {
    return this.nestConfigService.get(key);
  }

  getInt(key: string): number {
    return this.nestConfigService.get<number>(key)!;
  }

  getBoolean(key: string): boolean {
    return this.nestConfigService.get<boolean>(key)!;
  }

  getEnv(): Record<string, string | undefined> {
    return this.nestConfigService.get<Record<string, string | undefined>>('env')!;
  }
}
