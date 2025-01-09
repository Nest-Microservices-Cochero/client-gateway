import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  /// es un array
  NATS_SERVERS: string[];
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    ///, es un array y los items son string
    NATS_SERVERS: joi.array().items(joi.string()).required(),
  })
  .unknown(true);

/// de esta forma lo desestructuramos
const { error, value } = envsSchema.validate({
  ...process.env,
  NATS_SERVERS: process.env.NATS_SERVERS.split(','),
});

if (error) {
  throw new Error(`Environment variables validation failed ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  /// HACER DISPONIBLE
  natsServers: envVars.NATS_SERVERS,
};
