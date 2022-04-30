import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';
import { ExpensesContext } from '../store/expenses-context';
import { getDateMinusDays } from '../util/date';
import { getExpenses } from '../util/http';

const RecentExpenses = () => {

    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState();

    const expensesCtx = useContext(ExpensesContext);
    // const [fetchedExpenses, setFetchedExpenses] = useState([]);

    useEffect(() => {
        // without effect func turning into an async we can workaround this:
        const fetchExpenses = async () => {
            setIsFetching(true);
            try {
                const expenses = await getExpenses();
                expensesCtx.setExpenses(expenses);
            }catch(error){
                setError('Could not fetch expenses!');
            }
            setIsFetching(false);
        }
        fetchExpenses();    
    }, []);

    const errorHandler = () => {
        setError(null);
    }

    if(error && !isFetching){
        return <ErrorOverlay message={error} onConfirm={errorHandler} />
    }

    if(isFetching){
        return <LoadingOverlay />
    }

    const recentExpenses = expensesCtx.expenses.filter((expense) => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7);

        return (expense.date >= date7DaysAgo) && (expense.date <= today);
    })

    return <ExpensesOutput
        expenses={recentExpenses} 
        expensesPeriod="Last 7 Days" 
        fallbackText="No expenses registered for the last 7 days."
        />;
};

const styles = StyleSheet.create({

});

export default RecentExpenses;