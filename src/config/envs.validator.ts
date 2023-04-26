import Joi from '@hapi/joi';

export const envsValidator = Joi.object({
  APP_PORT: Joi.number().default(3000),
  DATABASE_URL: Joi.string().required(),
  SECRET_JWT: Joi.string().required(),
});
