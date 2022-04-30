import axios from "axios"
import { useLayoutEffect } from "react/cjs/react.production.min";

const BACKEND_URL = 'https://expense-tracker-app-22aa4-default-rtdb.europe-west1.firebasedatabase.app';

export const storeExpense = async (expenseData) => {
    // json is necesarry for creating node on the firebase db
    const response = await axios.post(
        BACKEND_URL + '/expenses.json',
        expenseData
    );
    // firebase uses 'name' instead of 'id'
    const id = response.data.name;
    return id;
}

export const getExpenses = async (expenseData) => {
    // json is necesarry for creating node on the firebase db
    const response = await axios.get(
        BACKEND_URL + '/expenses.json'
    );

    const expenses = [];

    for(const key in response.data){
        const expenseObj = {
            id: key,
            amount: response.data[key].amount,
            date: new Date(response.data[key].date),
            description: response.data[key].description,
        }
        expenses.push(expenseObj);
    }

    return expenses;
}

export const updateExpense = (id, expenseData) => {
    return axios.put(BACKEND_URL + `/expenses/${id}.json`, expenseData);
}

export const deleteExpense = (id) => {
    return axios.delete(BACKEND_URL + `/expenses/${id}.json`);
}