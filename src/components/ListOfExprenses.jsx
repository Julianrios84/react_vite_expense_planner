import Expense from './Expense';

const ListOfExprenses = ({
  expenses,
  setUpdateExpense,
  removeExpense,
  filter,
  filterExpenses,
}) => {
  return (
    <div className="listado-gastos contenedor">
      {filter ? (
        <>
          <h2 className="font-sansita">
            {filterExpenses.length
              ? 'List of exprenses'
              : 'There are no expenses in this category.'}
          </h2>
          {filterExpenses.map((expense) => (
            <Expense
              key={expense.id}
              expense={expense}
              setUpdateExpense={setUpdateExpense}
              removeExpense={removeExpense}
            />
          ))}
        </>
      ) : (
        <>
          <h2 className="font-sansita">
            {expenses.length
              ? 'List of exprenses'
              : 'There are no expenses yet.'}
          </h2>
          {expenses.map((expense) => (
            <Expense
              key={expense.id}
              expense={expense}
              setUpdateExpense={setUpdateExpense}
              removeExpense={removeExpense}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default ListOfExprenses;
