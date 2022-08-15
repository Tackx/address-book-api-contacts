import express from 'express';
import { ContactsController } from '../controllers/contacts.controller';
import { validateContact } from '../middleware/dataValidation';

const router = express.Router();

router.route('/').post(validateContact, ContactsController.create);

export default router;
