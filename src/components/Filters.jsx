const Filters = ({ filter, setFilter }) => {
  return (
    <div className="filtros sombra contenedor">
      <form>
        <div className="campo">
          <label htmlFor="filter">Expenses filter</label>
          <select
            id="filter"
            name="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="">-- All categories --</option>
            <option value="saving">Saving</option>
            <option value="food">Food</option>
            <option value="house">House</option>
            <option value="expenses">Expenses</option>
            <option value="leisure">Leisure</option>
            <option value="health">Health</option>
            <option value="subscriptions">Subscriptions</option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default Filters;
