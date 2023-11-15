import axios from "axios";
import { DB_URL } from "@env";

export const postExpense = async (expense) => {
  const response = await axios.post(`${DB_URL}/expenses.json`, expense);
  const id = response.data.name;
  return id;
};

export const getExpenses = async () => {
  const response = await axios.get(`${DB_URL}/expenses.json`);
  const expenses = Object.keys(response.data).map((id) => ({
    id,
    ...response.data[id],
    date: new Date(response.data[id].date),
  }));

  return expenses;
};

export const updateExpense = (id, expense) => {
  axios.put(`${DB_URL}/expenses/${id}.json`, expense);
};

export const deleteExpense = (id) => {
  axios.delete(`${DB_URL}/expenses/${id}.json`);
};
