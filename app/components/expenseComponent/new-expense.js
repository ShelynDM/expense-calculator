"use client"

import { useEffect, useState } from "react";

export default function NewExpense({onAddExpense, expense}) {
    const [expenseName, setExpenseName] = useState("");
    const [expenseAmount, setExpenseAmount] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);

    // Function to handle the form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!expenseName) {
            alert("Please enter expense name.");
            return;
        }
        // Generate a random id for the new expense
        const newId = Math.random().toString(36);

        // Create a new expense object
        const newExpense = { id: newId, expenseName: expenseName, amount: expenseAmount };
        onAddExpense(newExpense);

        // Calculate the total amount
        const totalAmount = expense.reduce((total, expense) => total + expense.amount, 0);
        setTotalAmount(totalAmount + expenseAmount); 

        // Clear the form fields
        setExpenseName("");
        setExpenseAmount(0);
    };

    // Function to calculate the total amount
    function totalAmountCalculation() {
        const totalAmount = expense.reduce((total, expense) => total + expense.amount, 0);
        setTotalAmount(totalAmount);
    }

    // UseEffect hook to calculate the total amount, this will be called whenever the expense array changes
    useEffect(() => {
        totalAmountCalculation();
    }, [totalAmount]);

    return (
        <div className="flex flex-col w-max">
            <form onSubmit={handleSubmit} >
                <div className="flex flex-col m-4 ring-2 p-6 ring-blue-500 ">
                    <label>
                        <div className="m-1">
                            Expense Name:
                        </div>
                        <input className=" text-black m-1" type="text" value={expenseName} onChange={(e) => setExpenseName(e.target.value)} />
                    </label>
                    <label>
                        <div className="m-1">
                            Expense Amount:
                        </div>                        
                        <input className=" text-black m-1" type='number' value={expenseAmount} onChange={(e) => setExpenseAmount(parseFloat(e.target.value))} />
                    </label>
                    <button type="submit" className=" bg-slate-700 m-1">Add Expense</button>
                </div>
            </form>
            <div className="m-4 ring-2 ring-blue-500 p-6">
                    <h1 className="m-2 text-2xl font-bold">Total Expense:</h1>
                    <h2 className="m-2 text-xl"> $ {totalAmount}</h2>
            </div>
        </div>

    );
}