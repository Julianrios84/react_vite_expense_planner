import { useEffect, useState } from 'react';
import CloseModalImage from '../assets/img/cerrar.svg';
import Message from './Message';

const Modal = ({
  setModal,
  animateModal,
  setAnimateModal,
  saveExpense,
  updateExpense,
  setUpdateExpense,
}) => {
  const [expense, setExprense] = useState({
    name: '',
    quantity: 0,
    category: '',
  });

  const [message, setMessage] = useState('');

  useEffect(() => {
    if (Object.keys(updateExpense).length > 0) {
      setExprense({ ...updateExpense });
    }
  }, []);

  const handleChange = (e) => {
    expense[e.target.name] = e.target.value;
    setExprense({ ...expense });
  };

  const handleCloseModal = () => {
    setAnimateModal(false);
    setUpdateExpense({});
    setTimeout(() => {
      setModal(false);
    }, 500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if ([expense.name, expense.quantity, expense.category].includes('')) {
      setMessage('All fields are required');
      setTimeout(() => {
        setMessage('');
      }, 1000);
      return;
    }

    saveExpense(expense);
  };

  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img
          src={CloseModalImage}
          alt="Close modal"
          onClick={handleCloseModal}
        />
      </div>

      <form
        onSubmit={handleSubmit}
        className={`formulario ${animateModal ? 'animar' : 'cerrar'}`}
      >
        <legend className="font-sansita">
          {updateExpense.name ? 'Edit Expense' : 'New Expense'}
        </legend>

        {message && <Message type="error">{message}</Message>}

        <div className="campo">
          <label htmlFor="name">Expense name</label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Add the name of the expense"
            value={expense.name}
            onChange={handleChange}
          />
        </div>
        <div className="campo">
          <label htmlFor="quantity">Quantity</label>
          <input
            id="quantity"
            type="number"
            name="quantity"
            placeholder="Add the amount of the expense"
            value={expense.quantity}
            onChange={handleChange}
          />
        </div>
        <div className="campo">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={expense.category}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="saving">Saving</option>
            <option value="food">Food</option>
            <option value="house">House</option>
            <option value="expenses">Expenses</option>
            <option value="leisure">Leisure</option>
            <option value="health">Health</option>
            <option value="subscriptions">Subscriptions</option>
          </select>
        </div>
        <input
          type="submit"
          value={updateExpense.name ? 'Update Expense' : 'Create Expense'}
        />
      </form>
    </div>
  );
};

export default Modal;
