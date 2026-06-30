import Joi from 'joi';

export const updateProfileSchema = Joi.object({
  displayName: Joi.string().max(100).allow(''),
  settings: Joi.object({
    currency: Joi.string().valid('USD', 'EUR', 'GBP'),
    theme: Joi.string().valid('dark', 'light'),
    notifications: Joi.boolean(),
  }),
});
