import { StyleSheet, View } from 'react-native';
import ExpensesList from './ExpensesList';
import ExpensesSummary from './ExpensesSummary';

const DUMMY_EXPENSES = [
    {
        id: 'e1',
        description: 'A pair of shoes',
        amount: 59.99,
        date: new Date('2021-12-19')
    },
    {
        id: 'e2',
        description: 'A pair of trousers',
        amount: 89.29,
        date: new Date('2022-04-26')
    },
    {
        id: 'e3',
        description: 'Cherry Tomatoes',
        amount: 5.99,
        date: new Date('2021-04-22')
    },
    {
        id: 'e4',
        description: 'The Silmarillion Book',
        amount: 40.99,
        date: new Date('2021-03-05')
    },
    {
        id: 'e5',
        description: 'The LOTR Book',
        amount: 35.99,
        date: new Date('2021-03-28')
    },
];

const ExpensesOutput = ({expenses, expensesPeriod }) => {
    return (
        <View>
            <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={expensesPeriod} />
            <ExpensesList expenses={DUMMY_EXPENSES} />
        </View>
    )
};

const styles = StyleSheet.create({

});

export default ExpensesOutput;