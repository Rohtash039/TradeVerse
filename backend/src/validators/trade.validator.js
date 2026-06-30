import Joi from 'joi';

export const executeTradeSchema = Joi.object({
  symbol: Joi.string().uppercase().required().messages({ 'any.required': 'Symbol is required' }),
  quantity: Joi.number().positive().required().messages({ 'number.positive': 'Quantity must be greater than 0' }),
  action: Joi.string().valid('buy', 'sell').required(),
  orderType: Joi.string().valid('market', 'limit').default('market'),
  price: Joi.number().positive().required().messages({ 'number.positive': 'Price must be greater than 0' }),
  leverage: Joi.number().integer().min(1).max(100).default(1),
});

export const tradeHistorySchema = Joi.object({
  limit: Joi.number().integer().min(1).max(100).default(20),
  offset: Joi.number().integer().min(0).default(0),
});
