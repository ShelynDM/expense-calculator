"use client";
import { useState } from "react";
import ExpenseList from "./expense-list";


export default function Page() {
    //add code to be able to add another expense name and amount to the json file
    const [expense, setExpense] = useState(ExpenseList);
    const [expenseName, setExpenseName] = useState("");
    const [expenseAmount, setExpenseAmount] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);

    function handleAddExpense(newExpense) {
        setExpense([...ExpenseList, newExpense]);

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const newExpense = { expenseName: expenseName, amount: expenseAmount };
        handleAddExpense(newExpense);

        const totalAmount = expense.reduce((total, expense) => total + expense.amount, 0);
        setTotalAmount(totalAmount + expenseAmount); 
        

        setExpenseName("");
        setExpenseAmount(0);
    }

  return (
    <div>
        This is the main Page
        <form onSubmit={handleSubmit}>
            <label>
                Expense Name:
                <input className=" text-black" type="text" value={expenseName} onChange={(e) => setExpenseName(e.target.value)} />
            </label>
            <label>
                Expense Amount:
                <input className=" text-black" type='number' value={expenseAmount} onChange={(e) => setExpenseAmount(parseFloat(e.target.value))} />
            </label>
            <button type="submit">Add Expense</button>
        </form>
            <h2>Expenses</h2>
            <ul>
                {expense.map((expense, index) => {
                    return (
                        <li key={index}>
                            {expense.expenseName} - {expense.amount}
                        </li>
                    );
                })}
            </ul>
        <div>
            <h2>Total Amount: {totalAmount}</h2>
        </div>


    </div>
  );
}