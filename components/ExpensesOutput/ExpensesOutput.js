import { View, StyleSheet, Text } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { GlobalStyles } from "../../constants/styles";

const { colors } = GlobalStyles;

const ExpensesOutput = ({ expenses, period, fallbackText }) => {
  return (
    <View style={styles.container}>
      {expenses.length ? (
        <ExpensesSummary expenses={expenses} periodName={period} />
      ) : (
        <Text style={styles.text}>{fallbackText}</Text>
      )}
      <ExpensesList expenses={expenses} />
    </View>
  );
};

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    backgroundColor: colors.primary700,
  },
  text: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
});
