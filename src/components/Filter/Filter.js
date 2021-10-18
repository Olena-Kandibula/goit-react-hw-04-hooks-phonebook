import PropTypes from 'prop-types';
import s from '../Filter/Filter.module.css';

const Filter = ({ filter, onChangeFilter }) => {
  return (
    <label>
      Find contact by name
      <input
        className={s.input}
        type="text"
        name="filter"
        autoComplete="off"
        value={filter}
        onChange={onChangeFilter}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
        required
      />
    </label>
  );
};
Filter.propTypes = {
  filter: PropTypes.string,
  onChangeFilter: PropTypes.func,
};

export default Filter;
