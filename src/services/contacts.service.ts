import { Contact } from '../interfaces/contact.interface';
import { User } from '../interfaces/user.interface';
import { ref, push } from 'firebase/database';
import { db } from '../firebase';

export class ContactsService {
  public static async create(user: User, contact: Contact) {
    const userId = user.user_id;

    const savedContact = await push(ref(db, 'addressBook/' + userId + '/contacts'), contact);

    return savedContact;
  }
}
