import { useState } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import Input from "./Input";
import Button from "../UI/Button";
import { getFormattedDate } from "../../utils/date";
import { GlobalStyles } from "../../constants/styles";

const { colors } = GlobalStyles;

const Form = ({ onCancel, onSubmit, submitButtonLabel, defaultValues, id }) => {
  const [values, setValues] = useState({
    amount: {
      value: id ? defaultValues.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: id ? getFormattedDate(defaultValues.date) : "",
      isValid: true,
    },
    description: {
      value: id ? defaultValues.description : "",
      isValid: true,
    },
  });

  const changeHandler = (name, value) => {
    setValues((current) => ({ ...current, [name]: { value, isValid: true } }));
  };

  const submitHandler = () => {
    const expense = {
      amount: +values.amount.value,
      date: new Date(values.date.value),
      description: values.description.value,
    };

    const { amount, date, description } = expense;

    const amountIsValid = !isNaN(amount) && !!amount;
    const dateIsValid = date.toString() !== "Invalid Date";
    const descriptionIsValid = !!description;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      //return Alert.alert("Invalid input", "Please check your input values");
      return setValues((current) => ({
        amount: { value: current.amount.value, isValid: amountIsValid },
        date: { value: current.date.value, isValid: dateIsValid },
        description: {
          value: current.description.value,
          isValid: descriptionIsValid,
        },
      }));
    }
    onSubmit(expense);
  };

  const formIsValid =
    values.amount.isValid || values.date.isValid || values.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputs}>
        <Input
          style={styles.input}
          label="Amount"
          invalid={!values.amount.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: (value) => changeHandler("amount", value),
            value: values.amount.value,
          }}
        />
        <Input
          style={styles.input}
          label="Date"
          invalid={!values.date.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: (value) => changeHandler("date", value),
            value: values.date.value,
          }}
        />
      </View>
      <Input
        label="Description"
        invalid={!values.description.isValid}
        textInputConfig={{
          multiline: true,
          onChangeText: (value) => changeHandler("description", value),
          value: values.description.value,
        }}
      />
      {!formIsValid && (
        <Text style={styles.error}>
          Invalid input values - please check your entered data!
        </Text>
      )}
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
};

export default Form;

const styles = StyleSheet.create({
  form: {
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
  inputs: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    flex: 1,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 20,
  },
  error: {
    textAlign: "center",
    color: colors.error500,
    margin: 8,
  },
});
