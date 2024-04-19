"use client";
import { useState, useEffect } from "react";
import ExpenseList from "./expense-list";
import NewExpense from "./new-expense";
import RandomQuotes from "./random-quotes";
import { getExpenses, addExpense, deleteExpense } from "../_services/expense-list-service";
import { useUserAuth } from "../_utils/auth-context";
import Image from 'next/image';

export default function Page() {
    const { user } = useUserAuth();
    const [expense, setExpense] = useState([]);
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [calculatedTotal, setCalculatedTotal] = useState(0);

    // Function to load the expenses
    const loadExpenses = async () => {
      const expenses = await getExpenses(user.uid);
      setExpense(expenses);

    };

    // Load the expenses when the user changes
    useEffect(() => {
        loadExpenses();
    }, [user]);

    // Function to handle adding an expense
    const handleAddExpense = (newExpense) => {
        addExpense(user.uid, newExpense).then(() => {
            loadExpenses();
        });
    };

    // Function to handle deleting an expense
    const handleDelete = (expenseId) => {
      deleteExpense(user.uid, expenseId).then(() => {
          // Remove the deleted expense from the expense state
          setExpense((prevExpenses) => prevExpenses.filter((expense) => expense.id !== expenseId));
  
      }).catch((error) => {
          console.error("Error deleting expense:", error);
      });
    };

    // Function to calculate the total expenses between the selected dates
    const handleCalculateTotal = () => {
        const filteredExpenses = expense.filter((exp) => {
            const expDate = new Date(exp.expenseDate);
            return expDate >= new Date(fromDate) && expDate <= new Date(toDate);
        });

        if (new Date(fromDate) > new Date(toDate)) {
            alert(' "From Date" cannot be after "To date".');
            return;
        }
        const total = filteredExpenses.reduce((acc, curr) => acc + curr.amount, 0);
        setCalculatedTotal(total);
    };

    return (
        <div>
            <RandomQuotes />
            <div className="flex flex-row justify-evenly m-4">
                <div>
                    Input your expenses here:
                    <NewExpense onAddExpense={handleAddExpense} />
                    Calculate total expenses between dates:
                    <div className="flex flex-col justify-evenly m-4 ring-2 p-4 ring-blue-500">
                      <div className="flex justify-between m-1">
                        <label>
                              From Date:
                        </label>
                        <input className="text-black" type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
                      </div>
                      <div className="flex justify-between m-1">
                        <label>
                            To Date:
                        </label>
                        <input className="text-black" type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
                      </div>
                      <div className="flex flex-col justify-center">
                        <button onClick={handleCalculateTotal} className=" bg-slate-700 m-1 text-white hover:bg-sky-600">Calculate Total</button>
                        <p className="text-center font-extrabold text-2xl">$ {calculatedTotal}</p>
                      </div>
                    </div>
                    <div className='flex justify-center h-auto w-auto my-5'>
                        <Image src="/xtract-logo.jpg" alt="Xtract Logo" width={200} height={200} style={{ width: 'auto', height: 'auto' }} priority />
                    </div>
                </div>
                <div className="w-3/6">
                    <ExpenseList expense={expense} onDeleteExpense={handleDelete}/>
                </div>
            </div>
        </div>
    );
}
