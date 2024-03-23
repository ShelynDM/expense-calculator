"use client";
import Expense from "./expense";
import { useState } from "react";

// Function to display the list of expenses
export default function ExpenseList({expense}) {
  const [sortBy, setSortBy] = useState("expenseName");

  expense.sort((a, b) => {
    if (sortBy === "expenseName") {
      return a.expenseName.localeCompare(b.expenseName);
    } else if (sortBy === "amount") {
      return b.amount - a.amount;
    }

  });

  return (
    <div className="m-4">
      <div className="flex flex-row justify-between m-2">
        <button onClick={() => setSortBy("expenseName")} style={{backgroundColor: sortBy === "expenseName" ? "#1a6985" : ""}} className=" hover:text-blue-500 p-1" >Sort by Name</button>
        <button onClick={() => setSortBy("amount")} style={{backgroundColor: sortBy === "amount" ? "#1a6985" : ""}} className=" hover:text-blue-500 p-1">Sort By Amount</button>
      </div>
      <ul>
        {expense.map((x) => (
          <li key={x.id}>
            <Expense expenseName={x.expenseName} expenseAmount={x.amount} />
          </li>
        ))}

      </ul>
    </div>
  );
}