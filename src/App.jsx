import { useEffect, useState } from 'react';
import Header from './components/Header';
import IconNewExpense from './assets/img/nuevo-gasto.svg';
import Modal from './components/Modal';
import { generateId } from './helpers';
import ListOfExprenses from './components/ListOfExprenses';
import Filters from './components/Filters';

function App() {
  const [expenses, setExpenses] = useState(
    localStorage.getItem('expenses')
      ? JSON.parse(localStorage.getItem('expenses'))
      : []
  );
  const [budget, setBudget] = useState(
    Number(localStorage.getItem('budget')) ?? 0
  );
  const [isValidBudget, setIsValidBudget] = useState(false);
  const [modal, setModal] = useState(false);
  const [animateModal, setAnimateModal] = useState(false);
  const [updateExpense, setUpdateExpense] = useState({});

  const [filter, setFilter] = useState('');
  const [filterExpenses, setFilterExpenses] = useState([]);

  useEffect(() => {
    if (Object.keys(updateExpense).length > 0) {
      setModal(true);
      setTimeout(() => {
        setAnimateModal(true);
      }, 500);
    }
  }, [updateExpense]);

  useEffect(() => {
    localStorage.setItem('budget', budget ?? 0);
  }, [budget]);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses) ?? []);
  }, [expenses]);

  useEffect(() => {
    if (filter) {
      const expensesFilter = expenses.filter(
        (item) => item.category === filter
      );
      setFilterExpenses(expensesFilter);
    }
  }, [filter]);

  useEffect(() => {
    const budgetLocal = Number(localStorage.getItem('budget')) ?? 0;
    if (budgetLocal > 0) {
      setIsValidBudget(true);
    }
  }, []);

  const handleNewExprense = () => {
    setModal(true);
    setUpdateExpense({});
    setTimeout(() => {
      setAnimateModal(true);
    }, 500);
  };

  const saveExpense = (expense) => {
    if (expense.id) {
      const updateExpenses = expenses.map((item) =>
        item.id === expense.id ? expense : item
      );
      setExpenses(updateExpenses);
      setUpdateExpense({});
    } else {
      expense.id = generateId();
      expense.date = Date.now();
      setExpenses([...expenses, expense]);
    }

    setModal(false);
    setTimeout(() => {
      setAnimateModal(false);
    }, 500);
  };

  const removeExpense = (id) => {
    const updateExpenses = expenses.filter((item) => item.id !== id);
    setExpenses(updateExpenses);
  };

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
        expenses={expenses}
        setExpenses={setExpenses}
        budget={budget}
        setBudget={setBudget}
        isValidBudget={isValidBudget}
        setIsValidBudget={setIsValidBudget}
      />
      {isValidBudget && (
        <>
          <main>
            <Filters filter={filter} setFilter={setFilter} />
            <ListOfExprenses
              expenses={expenses}
              setUpdateExpense={setUpdateExpense}
              removeExpense={removeExpense}
              filter={filter}
              filterExpenses={filterExpenses}
            />
          </main>
          <div className="nuevo-gasto">
            <img
              src={IconNewExpense}
              alt="icon new expense"
              onClick={handleNewExprense}
            />
          </div>
        </>
      )}

      {modal && (
        <Modal
          setModal={setModal}
          animateModal={animateModal}
          setAnimateModal={setAnimateModal}
          saveExpense={saveExpense}
          updateExpense={updateExpense}
          setUpdateExpense={setUpdateExpense}
        />
      )}
    </div>
  );
}

export default App;
