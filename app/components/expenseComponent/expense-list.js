
import Expense from "./expense";
import { useState } from "react";

export default function ExpenseList({expense, onDeleteExpense}) {
  const [sortBy, setSortBy] = useState("expenseName");
  const [isHovering, setIsHovering] = useState(false);

  // Sort the expenses based on the selected sort option
  expense.sort((a, b) => {
    if (sortBy === "expenseName") {
      return a.expenseName.localeCompare(b.expenseName);
    } else if (sortBy === "amount") {
      return b.amount - a.amount;
    }

  });

  // Function to handle mouse enter event
  const handleMouseEnter = () => {
      setIsHovering(true);
    };
  
  // Function to handle mouse leave event
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
          <li key={x.expId} >
            <div className="flex flex-row" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <div className="flex-1">
                <Expense expenseName={x.expenseName} expenseAmount={x.amount}/>
              </div>
              {isHovering ? (
                    <div className="w-auto border-2 border-red-500 m-2 p-2 bg-red-500">
                      <button onClick={() => onDeleteExpense(x.id)} className=" bg-red-500">X</button>
                    </div>
                ): null}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}