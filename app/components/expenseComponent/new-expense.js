import { useEffect, useState } from "react";
import { getExpenses } from "../_services/expense-list-service";
import { useUserAuth } from "../_utils/auth-context";

export default function NewExpense({onAddExpense, expense}) {
    const [expenseName, setExpenseName] = useState("");
    const [expenseAmount, setExpenseAmount] = useState("");
    const [totalAmount, setTotalAmount] = useState(0);
    const { user } = useUserAuth();

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
        //Generate a random id for the new expense
        const newId = Math.random().toString(36);


        // Create a new expense object
        const newExpense = {expId: newId, expenseName: expenseName, amount: expenseAmount };
        onAddExpense(newExpense);


        // Clear the form fields
        setExpenseName("");
        setExpenseAmount(0);
    };

    
    useEffect(() => {
        // Fetch expenses from the database when the component mounts
        getExpenses(user.uid)
            .then((expenses) => {
                const totalAmount = expenses.reduce((total, expense) => total + expense.amount, 0);
                setTotalAmount(totalAmount);
            })
            .catch((error) => {
                console.error("Error fetching expenses:", error);
            });
    }, [totalAmount, expense]);

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
                        <input className=" text-black m-1" type='number' placeholder="0" value={expenseAmount} onChange={(e) => setExpenseAmount(parseFloat(e.target.value))} />
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