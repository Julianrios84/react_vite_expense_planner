import { useState } from 'react';
import Message from './Message';

const NewBudget = ({ budget, setBudget, setIsValidBudget }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!budget || budget < 0) {
      setMessage('It is not a valid budget');
      return;
    }
    setMessage('');
    setIsValidBudget(true);
  };

  return (
    <div className="contenedor-presupuesto contenedor sombra">
      <form onSubmit={handleSubmit} className="formulario">
        <div className="campo">
          <label htmlFor="">Define budget</label>
          <input
            type="number"
            className="nuevo-presupuesto"
            placeholder="Add a budget"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
          />
        </div>

        <input type="submit" value="Add" />

        {message && <Message type="error">{message}</Message>}
      </form>
    </div>
  );
};

export default NewBudget;
