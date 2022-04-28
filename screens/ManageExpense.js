import { View, StyleSheet } from "react-native";
import { useLayoutEffect, useContext } from "react";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import Button from "../components/UI/Button";
import { ExpensesContext } from '../store/expenses-context';


const ManageExpense = ({ route, navigation }) => {
  const expensesCtx = useContext(ExpensesContext);


  // if param is undefined rest of code (expenseId) will not executed
  const editedExpenseId = route.params?.expenseId;
  // editedExpenseId converting to boolean with !!
  const isEditing = !!editedExpenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  const deleteExpenseHandler = () => {
    expensesCtx.deleteExpense(editedExpenseId);
    navigation.goBack();
  };

  const cancelHandler = () => {
      navigation.goBack();
  };

  const confirmHandler = () => {
    if(isEditing){
      expensesCtx.updateExpense(editedExpenseId, {description: 'Test XX', amount: 28.88, date: new Date('2022-05-20')});
    } else {
      expensesCtx.addExpense({description: 'Test', amount: 18.88, date: new Date('2022-05-18')});
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container} >
        <View style={styles.buttons}>
            <Button 
                style={styles.button} 
                mode="flat" 
                onPress={cancelHandler}>
                    Cancel
            </Button>
            <Button
                style={styles.button} 
                onPress={confirmHandler}>
                    {isEditing ? 'Update' : 'Add'}
            </Button>
        </View>

      {isEditing && (
        <View style={styles.deleteContainer} >
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800
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
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center'
    }
});

export default ManageExpense;
