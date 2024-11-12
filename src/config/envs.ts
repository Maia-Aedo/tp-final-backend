// Dependencias
import 'dotenv/config';
import * as joi from 'joi';

// Creamos interfaz para mejorar tipado de codigo
interface EnvVars{
    PORT : number;
}

// Configuramos esquema de joi
const envsSchema = joi
    .object({
        PORT: joi.number().required()
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
    port: envVars.PORT
};

