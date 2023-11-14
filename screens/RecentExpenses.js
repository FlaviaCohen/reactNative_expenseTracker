import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useContext, useEffect, useState } from "react";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../utils/date";
import { getExpenses } from "../utils/services";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

const RecentExpenses = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { setExpenses: setContextExpenses, expenses } =
    useContext(ExpensesContext);
  //const [expenses, setExpenses] = useState([]);

  const recentExpenses = expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date >= date7DaysAgo && expense.date <= today;
  });

  const handleExpenses = async () => {
    setLoading(true);
    try {
      const expenses = await getExpenses();
      setContextExpenses(expenses);
      //setExpenses(expenses);
    } catch (error) {
      setError("Could not fetch expenses!");
    }
    setLoading(false);
  };

  useEffect(() => {
    handleExpenses();
  }, []);

  if (error && !loading) {
    return <ErrorOverlay message={error} onConfirm={() => setError(null)} />;
  }

  if (loading) {
    return <LoadingOverlay />;
  }

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      period="Last 7 Days"
      fallbackText="No expenses registered for the last 7 days"
    />
  );
};

export default RecentExpenses;
