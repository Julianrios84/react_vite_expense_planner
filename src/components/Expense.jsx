import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';

import { formatterDate } from '../helpers';
import IconSaving from '../assets/img/icono_ahorro.svg';
import IconFood from '../assets/img/icono_casa.svg';
import IconHouse from '../assets/img/icono_comida.svg';
import IconExpenses from '../assets/img/icono_gastos.svg';
import IconLeisure from '../assets/img/icono_ocio.svg';
import IconHealth from '../assets/img/icono_salud.svg';
import IconSubscriptions from '../assets/img/icono_suscripciones.svg';

const iconDictionary = {
  saving: IconSaving,
  food: IconFood,
  house: IconHouse,
  expenses: IconExpenses,
  leisure: IconLeisure,
  health: IconHealth,
  subscriptions: IconSubscriptions,
};

const Expense = ({ expense, setUpdateExpense, removeExpense }) => {
  const { id, category, name, quantity, date } = expense;

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={() => setUpdateExpense(expense)}>
        Editar
      </SwipeAction>
    </LeadingActions>
  );

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction onClick={() => removeExpense(id)} destructive={true}>
        Remover
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <SwipeableList>
      <SwipeableListItem
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className="gasto sombra">
          <div className="contenido-gasto">
            <img src={iconDictionary[category]} alt="Icon" />
            <div className="descripcion-gasto">
              <p className="categoria">{category}</p>
              <p className="nombre-gasto">{name}</p>
              <p className="fecha-gasto">
                Agregado el: {''} <span>{formatterDate(date)}</span>
              </p>
            </div>
          </div>
          <p className="cantidad-gasto">${quantity}</p>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  );
};

export default Expense;
