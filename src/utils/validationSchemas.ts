import Joi from 'joi';

export const contactSchema = Joi.object({
  contact: Joi.object({
    firstName: Joi.string().max(30).required(),
    lastName: Joi.string().max(30).required(),
    phone: Joi.number().integer().required(),
    address: Joi.string().max(200).required()
  }).required(),
  token: Joi.string().max(500).optional()
});
