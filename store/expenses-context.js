import { createContext, useReducer } from "react";
//import { DUMMY_EXPENSES } from "../mock/expenses";

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  setExpenses: (expenses) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

const expensesReducer = (state, action) => {
  const helper = {
    ADD: {
      ...state,
      expenses: [...state.expenses, action.payload],
    },
    SET: {
      ...state,
      expenses: action.payload,
    },
    DELETE: {
      ...state,
      expenses: state.expenses.filter(
        (expense) => expense.id !== action.payload
      ),
    },
    UPDATE: {
      ...state,
      expenses: state.expenses.map((expense) => {
        if (expense.id === action.payload.id) {
          return action.payload.expense;
        }
        return expense;
      }),
    },
  };

  return helper[action.type] || state;
};

const ExpensesContextProvider = ({ children }) => {
  const [expensesState, dispatch] = useReducer(expensesReducer, {
    expenses: [],
  });

  const addExpense = (expense) => {
    dispatch({ type: "ADD", payload: expense });
  };

  const setExpenses = (expenses) => {
    dispatch({ type: "SET", payload: expenses });
  };
  const deleteExpense = (id) => {
    dispatch({ type: "DELETE", payload: id });
  };

  const updateExpense = (id, expense) => {
    dispatch({ type: "UPDATE", payload: { id, expense } });
  };

  const value = {
    expenses: expensesState.expenses,
    addExpense,
    setExpenses,
    deleteExpense,
    updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesContextProvider;
