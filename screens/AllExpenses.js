import { Text } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useContext } from "react";
import { ExpensesContext } from "../store/expenses-context";

const AllExpenses = () => {
  const { expenses } = useContext(ExpensesContext);
  return (
    <ExpensesOutput
      expenses={expenses}
      period="Total"
      fallbackText="No registered expenses found."
    />
  );
};

export default AllExpenses;
