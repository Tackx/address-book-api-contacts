import { NextFunction, Request, Response } from 'express';
import { contactSchema } from '../utils/validationSchemas';

export const validateContact = (req: Request, res: Response, next: NextFunction) => {
  const { error } = contactSchema.validate(req.body);
  if (error) {
    const msg = error.details.map(el => el.message).join(',');
    res.status(400).json({ 'Error message': msg });
  } else {
    next();
  }
};
