import { StyleSheet, FlatList } from 'react-native';

const renderExpenseItem = (itemData) => {
    // itemData has index and item properties
    return <Text>{itemData.item.description}</Text>
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