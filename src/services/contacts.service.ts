import { Contact } from '../interfaces/contact.interface';
import { getDatabase } from 'firebase-admin/database';
import { User } from '../interfaces/user.interface';

export class ContactsService {
  public static async create(user: User, contact: Contact) {
    const db = getDatabase();

    const ref = db.ref('addressBook');

    const userId = user.user_id;

    const contactsRef = ref.child(`${userId}/contacts`);

    const savedContact = await contactsRef.push(contact);

    return savedContact;
  }
}
