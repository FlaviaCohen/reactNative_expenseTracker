import axios from "axios";

const FIREBASE_URL = "https://expensetracker-rn-default-rtdb.firebaseio.com";

export const postExpense = async (expense) => {
  const response = await axios.post(`${FIREBASE_URL}/expenses.json`, expense);
  const id = response.data.name;
  return id;
};

export const getExpenses = async () => {
  const response = await axios.get(`${FIREBASE_URL}/expenses.json`);
  const expenses = Object.keys(response.data).map((id) => ({
    id,
    ...response.data[id],
    date: new Date(response.data[id].date),
  }));

  return expenses;
};

export const updateExpense = (id, expense) => {
  axios.put(`${FIREBASE_URL}/expenses/${id}.json`, expense);
};

export const deleteExpense = (id) => {
  axios.delete(`${FIREBASE_URL}/expenses/${id}.json`);
};
