"use client";
import { useState } from "react";
import ExpenseList from "./expense-list";
import NewExpense from "./new-expense";
import ExpenseData from "./expense-list.json";
import RandomQuotes from "./random-quotes";


export default function Page() {
    const [expense, setExpense] = useState(ExpenseData);

    // Function to handle the addition of a new expense
    function handleAddExpense(newExpense) {
        setExpense((prevExpense) => {
            return [...prevExpense, newExpense];
        });
    }

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