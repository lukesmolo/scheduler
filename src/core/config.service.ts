import { JobConfig } from '../jobs/types/job-config';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as Joi from 'joi';

export interface EnvConfig {
  [key: string]: string;
}

export class ConfigService {
  private envConfig: EnvConfig;

  constructor(filePath: string) {
    let config = dotenv.parse(fs.readFileSync(filePath));
    config = this.mergeConfig(config);
    this.validateInput(config);
  }

  private mergeConfig(config: dotenv.DotenvParseOutput) {
    for (const key in config) {
      if (process.env && key in process.env) {
        config[key] = process.env[key];
      }
    }
    return config;
  }

  private async validateInput(envConfig: EnvConfig) {
    envConfig.JOBS = JSON.parse(envConfig.JOBS);
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid('development', 'staging', 'production')
        .default('development'),
      JOBS: Joi.array().items(
        Joi.object({
          name: Joi.string().required(),
          cronTime: Joi.string().required(),
          type: Joi.string().valid('ts', 'py').required(),
        }),
      ),
      KEYVALUE_DIR: Joi.string().required(),
    });

    const { error, value } = envVarsSchema.validate(envConfig, {
      convert: true,
    });
    this.envConfig = value;
    console.log(this.envConfig);
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
  }

  public get env(): string {
    return this.envConfig.NODE_ENV;
  }

  public get jobs(): Array<JobConfig> {
    return this.envConfig.JOBS as unknown as Array<JobConfig>;
  }

  public get keyValueDir(): string {
    return this.envConfig.KEYVALUE_DIR;
  }
}
