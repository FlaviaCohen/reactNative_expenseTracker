import { StyleSheet, View } from "react-native";
import { useContext, useLayoutEffect, useState } from "react";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expenses-context";
import Form from "../components/ManageExpense/Form";
import { deleteExpense, postExpense, updateExpense } from "../utils/services";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

const { colors } = GlobalStyles;
const ManageExpenses = ({ route, navigation }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const {
    deleteExpense: deleteContextExpense,
    updateExpense: updateContextExpense,
    addExpense,
    expenses,
  } = useContext(ExpensesContext);

  const id = route.params?.id;

  const selectedExpense = expenses.find((expense) => expense.id === id);

  const handleTitle = () => {
    navigation.setOptions({
      title: !id ? "Add Expense" : "Edit Expense",
    });
  };

  const deleteHandler = async () => {
    setLoading(true);
    try {
      await deleteExpense(id);
      deleteContextExpense(id);
      navigation.goBack();
    } catch (error) {
      setError("Could not detele expense - please try again later");
    }
    setLoading(false);
  };

  const cancelHandler = () => {
    navigation.goBack();
  };

  const confirmHandler = async (expense) => {
    setLoading(true);
    try {
      if (id) {
        await updateExpense(id, expense);
        updateContextExpense({ id, ...expense });
      } else {
        const id = await postExpense(expense);
        addExpense({ id, ...expense });
      }
      navigation.goBack();
    } catch (error) {
      setError("Could not save data = please try again later!");
      setLoading(false);
    }
  };

  useLayoutEffect(() => {
    handleTitle();
  }, [navigation, id]);

  if (error && !loading) {
    return <ErrorOverlay message={error} onConfirm={() => setError(null)} />;
  }

  if (loading) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <Form
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        id={id}
        submitButtonLabel={id ? "Update" : "Add"}
        defaultValues={selectedExpense}
      />

      {id && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={colors.error500}
            size={36}
            onPress={deleteHandler}
          />
        </View>
      )}
    </View>
  );
};

export default ManageExpenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: colors.primary800,
  },

  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: colors.primary200,
    alignItems: "center",
  },
});
