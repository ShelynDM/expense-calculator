import { useState } from "react";

export default function NewExpense({onAddExpense}) {
    const [expenseDate, setExpenseDate] = useState(() => new Date().toISOString().split('T')[0]);
    const [expenseName, setExpenseName] = useState("");
    const [expenseAmount, setExpenseAmount] = useState("");


    // Function to handle the form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Alert the user if the expense name is empty
        if (!expenseName) {
            alert("Expense name cannot be empty.");
            return;
        }
        // Alert the user if the expense amount is negative
        if (expenseAmount < 0) {
            alert("Expense amount cannot be negative.");
            return;
        }
        // Alert the user if the expense amount is zero
        if (expenseAmount === 0) {
            alert("Expense amount cannot be zero.");
            return;
        }
        // Alert the user if the expense amount is not a number
        if (isNaN(expenseAmount)) {
            alert("Expense amount must be a number.");
            return;
        }
        // Alert the user if the expense amount is empty
        if (expenseAmount === "") {
            alert("Expense amount cannot be empty.");
            return;
        }

        // Create a new expense object
        const newExpense = {expenseDate: expenseDate, expenseName: expenseName, amount: expenseAmount };
        onAddExpense(newExpense);


        // Clear the form fields
        setExpenseName("");
        setExpenseAmount(0);

    };

    return (
        <div className="flex flex-col w-max">
            <form onSubmit={handleSubmit} >
                <div className="flex flex-col m-4 ring-2 p-6 ring-blue-500 ">
                    <label>
                        <div className="m-1">
                            Date:
                        </div>
                        <input className="text-black m-1" type="date" value={expenseDate} onChange={(e) => setExpenseDate(new Date(e.target.value).toISOString().split('T')[0])} />
                    </label>
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
                        <input className=" text-black m-1" type='number' placeholder="0" value={expenseAmount} step="0.01" onChange={(e) => setExpenseAmount(parseFloat(e.target.value))} />
                    </label>
                    <button type="submit" className=" bg-slate-700 m-1 text-white hover:bg-sky-600" >Add Expense</button>
                </div>
            </form>
        </div>

    );
}