import 'dotenv/config';
import * as joi from 'joi';
interface EnvVars {
  PORT: number;
  /// 1 Definir
  ORDER_MICROSERVICE_HOST: string;
  ORDER_MICROSERVICE_PORT: number;

  PRODUCTS_MICROSERVICE_HOST: string;
  PRODUCTS_MICROSERVICE_PORT: number;
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    /// 2 Validar
    ORDER_MICROSERVICE_HOST: joi.string().required(),
    ORDER_MICROSERVICE_PORT: joi.number().required(),

    PRODUCTS_MICROSERVICE_HOST: joi.string().required(),
    PRODUCTS_MICROSERVICE_PORT: joi.number().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
  throw new Error(`Environment variables validation failed ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  /// 3 hacer disponible
  orderMicroserviceHost: envVars.ORDER_MICROSERVICE_HOST,
  orderMicroservicePort: envVars.ORDER_MICROSERVICE_PORT,

  productsMicroserviceHost: envVars.PRODUCTS_MICROSERVICE_HOST,
  productsMicroservicePort: envVars.PRODUCTS_MICROSERVICE_PORT,
};
