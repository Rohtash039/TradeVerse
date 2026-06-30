import Joi from 'joi';

export const addSymbolSchema = Joi.object({
  symbol: Joi.string().lowercase().required().messages({ 'any.required': 'Symbol is required (e.g. "bitcoin")' }),
});
