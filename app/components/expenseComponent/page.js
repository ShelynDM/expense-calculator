"use client";
import { useState, useEffect } from "react";
import ExpenseList from "./expense-list";
import NewExpense from "./new-expense";
import RandomQuotes from "./random-quotes";
import { getExpenses, addExpense, deleteExpense } from "../_services/expense-list-service";
import { useUserAuth } from "../_utils/auth-context";


export default function Page() {
    const { user } = useUserAuth();
    const [expense, setExpense] = useState([]);

    const loadExpenses = async () => {
      const expenses = await getExpenses(user.uid);
      setExpense(expenses);
  };

    // Function to handle the addition of a new expense
    function handleAddExpense(newExpense) {
      addExpense(user.uid, newExpense).then((docRef) => {
        setExpense((prevItems) => {
          return [{ id: docRef.id, ...newExpense }, ...prevItems];
        });
      });
    }



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
                <ExpenseList expense={expense} />
            </div>
        </div>
    </div>
  );
}