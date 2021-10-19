import PropTypes from 'prop-types';
import s from '../ContactList/ContactList.module.css';
import { TiUserDeleteOutline } from 'react-icons/ti';

function ContactList({ contacts, onDeleteContact }) {
  // console.log(contacts.map(contact=> contact))

  return (
    <div>
      <ul className={s.list}>
        {contacts.map(contact => (
          <li className={s.item} key={contact.id}>
            <p>
              <span>{contact.name}:</span> <span>{contact.number}</span>
            </p>

            <button
              className={s.buttonDelete}
              type="button"
              onClick={() => onDeleteContact(contact.id)}
            >
              <TiUserDeleteOutline color="red" size="18px" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  onDeleteContact: PropTypes.func,
};
export default ContactList;
