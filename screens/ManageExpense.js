import { View, StyleSheet, TextInput } from "react-native";
import { useLayoutEffect, useContext } from "react";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from '../store/expenses-context';
import ExpenseForm from "../components/ManageExpense/ExpenseForm";


const ManageExpense = ({ route, navigation }) => {
  const expensesCtx = useContext(ExpensesContext);


  // if param is undefined rest of code (expenseId) will not executed
  const editedExpenseId = route.params?.expenseId;
  // editedExpenseId converting to boolean with !!
  const isEditing = !!editedExpenseId;

  const selectedExpense = expensesCtx.expenses.find(expense => expense.id === editedExpenseId);

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

  const confirmHandler = (expenseData) => {
    if(isEditing){
      expensesCtx.updateExpense(editedExpenseId, expenseData);
    } else {
      expensesCtx.addExpense(expenseData);
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container} >
      <ExpenseForm 
        submitButtonLabel={isEditing ? 'Update' : 'Add'} 
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
        defaultValues={selectedExpense}
      />
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
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center'
    }
});

export default ManageExpense;
