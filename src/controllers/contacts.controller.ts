import { Request, Response } from 'express';
import { ContactsService } from '../services/contacts.service';

export class ContactsController {
  public static async create(req: Request, res: Response) {
    try {
      const user = JSON.parse(<string>req.headers.user);
      const contact = req.body.contact;

      const savedContact = await ContactsService.create(user, contact);
      res.status(201).json({ message: 'Contact added to the contact list.', savedContact });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: 'Error while saving contact.' });
    }
  }
}
