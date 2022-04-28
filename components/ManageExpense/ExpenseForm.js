import { StyleSheet, View, Text } from 'react-native';
import { useState } from 'react';
import Input from './Input';

const ExpenseForm = () => {

    // whenever user enters an input value, we'll get it as a string
    // even if input provides a number
    // const [amountValue, setAmountValue] =useState('');

    // enteredAmount value provided by ReactNative automatically
    // const amountChangeHandler = (enteredAmount) => {
    //     setAmountValue(enteredAmount)
    // }   

    const [inputValues, setInputValues] = useState({
        amount: '',
        date: '',
        description: ''
    })

    const inputChangedHandler = (inputIdentifier, enteredValue) => {
        // while updating state based on previous state
        // we should use state updating function like this: 
        setInputValues((curInputValues) => {
            return {
                ...curInputValues,
                // to set and target a property dynamically:
                [inputIdentifier]: enteredValue
            }
        });
    }   

return (
    <View style={styles.form}>
        <Text style={styles.title}>Your Expense</Text>
        <View style={styles.inputsRow}>
            <Input 
                style={styles.rowInput}
                label="Amount" 
                textInputConfig={{
                    keyboardType: 'decimal-pad',
                    onChangeText: inputChangedHandler.bind(this, 'amount'), 
                    // pre-configure the first parameter value
                    // second value still will be passed automatically by ReactNative
                    value: inputValues.amount // two-way binding
                }} 
            />
            <Input 
                style={styles.rowInput}
                label="Date" 
                textInputConfig={{
                    placeholder: 'YYYY-MM-DD',
                    maxLength: 10,
                    onChangeText: inputChangedHandler.bind(this, 'date'),
                    value: inputValues.date
                }} 
            />
        </View>
        <Input 
            label="Description" 
            textInputConfig={{
                multiline: true,
                // autoCorrect: false :: default is true
                // autoCapitalize: 'none' :: default is sentences
                onChangeText: inputChangedHandler.bind(this, 'description'),
                value: inputValues.description
            }}
        />
    </View>
);
};

const styles = StyleSheet.create({
    form: {
        marginTop: 40
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginVertical: 24,
        textAlign: 'center'
    },
    inputsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    rowInput: {
        flex: 1
    }
});

export default ExpenseForm;