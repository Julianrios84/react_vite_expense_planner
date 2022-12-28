import { useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const BudgetControl = ({
  expenses,
  setExpenses,
  budget,
  setBudget,
  setIsValidBudget,
}) => {
  const [percentage, setPercentage] = useState(0);
  const [available, setAvailable] = useState(0);
  const [used, setUsed] = useState(0);

  useEffect(() => {
    const totalUsed = expenses.reduce(
      (total, expense) => Number(expense.quantity) + total,
      0
    );

    const totalAvailable = budget - totalUsed;
    const totalPercentage = (
      ((budget - totalAvailable) / budget) *
      100
    ).toFixed(2);

    setAvailable(totalAvailable);
    setUsed(totalUsed);

    setTimeout(() => {
      setPercentage(totalPercentage);
    }, 500);
  }, [expenses]);

  const formatterQuantity = (quantity) => {
    return quantity.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  };

  const handleResetApp = () => {
    const result = confirm('Do you want to reset budget and expenses?');
    if (result) {
      setExpenses([]);
      setBudget(0);
      setIsValidBudget(false);
    }
  };

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <CircularProgressbar
          styles={buildStyles({
            pathColor: percentage > 100 ? '#dc2626' : '#3b82f6',
            trailColor: '#d5d5d5',
            textColor: percentage > 100 ? '#dc2626' : '#3b82f6',
          })}
          value={percentage}
          text={`${percentage}% Used`}
        />
      </div>
      <div className="contenido-presupuesto">
        <button className="reset-app" type="button" onClick={handleResetApp}>
          Reset App
        </button>
        <p>
          <span>Budget: </span> {formatterQuantity(budget)}
        </p>
        <p className={`${available < 0 ? 'negativo' : ''}`}>
          <span>Available: </span> {formatterQuantity(available)}
        </p>
        <p>
          <span>Used: </span> {formatterQuantity(used)}
        </p>
      </div>
    </div>
  );
};

export default BudgetControl;
