import { StyleSheet, FlatList } from 'react-native';
import ExpenseItem from './ExpenseItem';

const renderExpenseItem = (itemData) => {
    // itemData has index and item properties
    return <ExpenseItem {...itemData.item} />;
}

const ExpensesList = ({expenses}) => {
    return (
        <FlatList 
            data={expenses} 
            renderItem={renderExpenseItem} 
            keyExtractor={(item) => item.id}
        />
    );
};

const styles = StyleSheet.create({

});

export default ExpensesList;