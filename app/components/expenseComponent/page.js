"use client";
import { useState, useEffect } from "react";
import ExpenseList from "./expense-list";
import NewExpense from "./new-expense";
import RandomQuotes from "./random-quotes";
import { getExpenses, addExpense, deleteExpense, updateExpense } from "../_services/expense-list-service";
import { useUserAuth } from "../_utils/auth-context";
//import { updateDoc } from "firebase/firestore";

export default function Page() {
    const { user } = useUserAuth();
    const [expense, setExpense] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);

    const loadExpenses = async () => {
      const expenses = await getExpenses(user.uid);
      setExpense(expenses);

      // Recalculate the total amount
      const updatedTotalAmount = expense.reduce((total, expenseItem) => total + expenseItem.amount, 0);
      setTotalAmount(updatedTotalAmount);
    };



    // Function to handle the addition of a new expense
    function handleAddExpense(newExpense) {
      addExpense(user.uid, newExpense).then((docRef) => {
        setExpense((prevItems) => {
          return [{ id: docRef.id, ...newExpense }, ...prevItems];
        });
      });
    };

  // Function to handle the deletion of an expense
    function handleDelete(expenseId) {
    // Delete expense in the database
    deleteExpense(user.uid, expenseId, expense).then(() => {
      // Update local state to remove the deleted expense
      setExpense((prevItems) => {
        return prevItems.filter((item) => item.id !== expenseId);
      });
    }).catch((error) => {
      console.error("Error deleting expense:", error);
    });
  };



    useEffect(() => {
        loadExpenses();
    }, [user]);
  return (
    <div>
      <RandomQuotes />
        <div className="flex flex-row justify-evenly m-4">
            <div>
                <NewExpense onAddExpense={handleAddExpense} 
                expense={expense}/>
            </div>
            <div className="w-3/6">
                <ExpenseList expense={expense} onDeleteExpense={handleDelete} totalAmount={totalAmount} setTotalAmount={setTotalAmount}/>
            </div>
        </div>
    </div>
  );
}