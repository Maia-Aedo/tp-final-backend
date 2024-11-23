// Dependencias
import 'dotenv/config';
import * as joi from 'joi';

// Creamos interfaz para mejorar tipado de codigo
interface EnvVars{
    PORT : number;
    DATABASE_URL: string;
    JWT_SEED: string;
}

// Configuramos esquema de joi
const envsSchema = joi
    .object({
        PORT: joi.number().required(),
        DATABASE_URL: joi.string().required(),
        JWT_SEED: joi.string().required()
    })
    .unknown(true)

/**
 * @param error devuelve error si falla validez
 * @param value devuelve variables
 */

const { error, value } = envsSchema.validate(process.env);
// En caso de error
if (error) throw new Error(`Config validation error: ${error.message}`);
// Si no hay error
const envVars: EnvVars = value;

export const envs = {
    port: envVars.PORT,
    database_url: envVars.DATABASE_URL,
    jwt_seed: envVars.JWT_SEED
};

