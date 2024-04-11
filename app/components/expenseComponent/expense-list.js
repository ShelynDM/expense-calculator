"use client";
import Expense from "./expense";
import { useState } from "react";

// Function to display the list of expenses
export default function ExpenseList({expense, onDeleteExpense}) {
  const [sortBy, setSortBy] = useState("expenseName");
  const [isHovering, setIsHovering] = useState(false);

  expense.sort((a, b) => {
    if (sortBy === "expenseName") {
      return a.expenseName.localeCompare(b.expenseName);
    } else if (sortBy === "amount") {
      return b.amount - a.amount;
    }

  });


    const handleMouseEnter = () => {
        setIsHovering(true);
      };
    
      const handleMouseLeave = () => {
        setIsHovering(false);
      };

  return (
    <div className="m-4">
      <div className="flex flex-row justify-between m-2">
        <button onClick={() => setSortBy("expenseName")} style={{backgroundColor: sortBy === "expenseName" ? "#1a6985" : ""}} className=" hover:text-blue-500 p-1" >Sort by Name</button>
        <button onClick={() => setSortBy("amount")} style={{backgroundColor: sortBy === "amount" ? "#1a6985" : ""}} className=" hover:text-blue-500 p-1">Sort By Amount</button>
      </div>
      <ul >
        {expense.map((x) => (
          <li key={x.id} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <div className="flex flex-row" >
              <div className="flex-1">
                <Expense expenseName={x.expenseName} expenseAmount={x.amount}/>
              </div>
              {isHovering ? (
                    <div className="w-auto border-2 border-red-500 m-2 p-2">
                      <button onClick={() => onDeleteExpense(x.id)}>X</button>
                    </div>
                ): null}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}