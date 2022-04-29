import { StyleSheet, View, Text, Alert } from 'react-native';
import { useState } from 'react';
import Input from './Input';
import Button from "../UI/Button";
import { getFormattedDate } from '../../util/date';
import { GlobalStyles } from '../../constants/styles';


const ExpenseForm = ({onCancel, submitButtonLabel, onSubmit, defaultValues}) => {

    // whenever user enters an input value, we'll get it as a string
    // even if input provides a number
    // const [amountValue, setAmountValue] =useState('');

    // enteredAmount value provided by ReactNative automatically
    // const amountChangeHandler = (enteredAmount) => {
    //     setAmountValue(enteredAmount)
    // }   

    const [inputs, setInputs] = useState({
        amount: { 
            value: defaultValues ? defaultValues.amount.toString() : '', 
            isValid: true
            // isValid: !!defaultValues // turns into boolean based on truthy or falsy
        },
        date: {
            value:defaultValues ? getFormattedDate(defaultValues.date) : '',
            isValid: true
        },
        description: {
            value: defaultValues ? defaultValues.description.toString() : '',
            isValid: true
        },
    })

    const inputChangedHandler = (inputIdentifier, enteredValue) => {
        // while updating state based on previous state
        // we should use state updating function like this: 
        setInputs((curInputs) => {
            return {
                ...curInputs,
                // to set and target a property dynamically:
                [inputIdentifier]: { value: enteredValue, isValid: true },
            };
        });
    }   

    const submitHandler = () => {
        const expenseData = {
            // + : means convert to number
            amount: +inputs.amount.value,
            date: new Date(inputs.date.value),
            description: inputs.description.value
        };

        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
        const descriptionIsValid = expenseData.description.trim().length > 0;

        if(!amountIsValid || !dateIsValid || !descriptionIsValid){
            // Alert.alert('Invalid iput', 'Please check your input values'); 

            setInputs((curInputs) => {
                return {
                    amount: {value:curInputs.amount.value, isValid: amountIsValid},
                    date: {value:curInputs.date.value, isValid: dateIsValid},
                    description: {value:curInputs.description.value, isValid: descriptionIsValid},
                };
            })

            return;
        }

        onSubmit(expenseData);
    }

const formIsInvalid = !inputs.amount.isValid 
    || !inputs.date.isValid 
    || !inputs.description.isValid;

return (
    <View style={styles.form}>
        <Text style={styles.title}>Your Expense</Text>
        <View style={styles.inputsRow}>
            <Input 
                style={styles.rowInput}
                label="Amount" 
                invalid={!inputs.amount.isValid}
                textInputConfig={{
                    keyboardType: 'decimal-pad',
                    onChangeText: inputChangedHandler.bind(this, 'amount'), 
                    // pre-configure the first parameter value
                    // second value still will be passed automatically by ReactNative
                    value: inputs.amount.value // two-way binding
                }} 
            />
            <Input 
                style={styles.rowInput}
                label="Date" 
                invalid={!inputs.date.isValid}
                textInputConfig={{
                    placeholder: 'YYYY-MM-DD',
                    maxLength: 10,
                    onChangeText: inputChangedHandler.bind(this, 'date'),
                    value: inputs.date.value
                }} 
            />
        </View>
        <Input 
            label="Description" 
            invalid={!inputs.description.isValid}
            textInputConfig={{
                multiline: true,
                // autoCorrect: false :: default is true
                // autoCapitalize: 'none' :: default is sentences
                onChangeText: inputChangedHandler.bind(this, 'description'),
                value: inputs.description.value
            }}
        />
        {formIsInvalid && (
            <Text style={styles.errorText}>Invalid input values - please check your entered data!</Text>
            )}
         <View style={styles.buttons}>
            <Button 
                style={styles.button} 
                mode="flat" 
                onPress={onCancel}>
                    Cancel
            </Button>
            <Button
                style={styles.button} 
                onPress={submitHandler}>
                    {submitButtonLabel}
            </Button>
        </View>
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
    },
    errorText: {
        textAlign: 'center',
        color: GlobalStyles.colors.error500,
        margin: 8
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8
    },
});

export default ExpenseForm;