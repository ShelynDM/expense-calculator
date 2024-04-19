import Expense from "./expense";
import { useState } from "react";

export default function ExpenseList({expense, onDeleteExpense}) {
  const [sortBy, setSortBy] = useState("expenseName");
  const [isHovering, setIsHovering] = useState(false);

  // Sort the expenses based on the selected sort option
  const sortedExpenses = [...expense].sort((a, b) => {
    if (sortBy === "expenseDate") {
      return new Date(a.expenseDate) - new Date(b.expenseDate);
    } else if (sortBy === "amount") {
      return b.amount - a.amount || new Date(a.expenseDate) - new Date(b.expenseDate);
    } else {
      return a.expenseName.localeCompare(b.expenseName) || new Date(a.expenseDate) - new Date(b.expenseDate);
    }
  });

  // Group the expenses by date
  const groupedExpenses = sortedExpenses.reduce((acc, cur) => {
    const date = new Date(cur.expenseDate);
    const formattedDate = date.toISOString().split('T')[0];
    acc[formattedDate] = acc[formattedDate] || { total: 0, expenses: [] };
    acc[formattedDate].expenses.push(cur);
    acc[formattedDate].total += cur.amount;
    return acc;
  }, {});

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
        <button
          onClick={() => setSortBy("expenseDate")}
          style={{ backgroundColor: sortBy === "expenseDate" ? "#1a6985" : "" }}
          className="hover:text-blue-500 p-1"
        >
          Sort by Date
        </button>
        <button
          onClick={() => setSortBy("expenseName")}
          style={{ backgroundColor: sortBy === "expenseName" ? "#1a6985" : "" }}
          className="hover:text-blue-500 p-1"
        >
          Sort by Name
        </button>
        <button
          onClick={() => setSortBy("amount")}
          style={{ backgroundColor: sortBy === "amount" ? "#1a6985" : "" }}
          className="hover:text-blue-500 p-1"
        >
          Sort By Amount
        </button>
      </div>
      {Object.keys(groupedExpenses).map((date) => (
        <div key={date} className="border-2 border-blue-500 m-2 p-2">
          <p> Number of Expenses: {groupedExpenses[date].expenses.length}</p>
          <p> Average expense: ${(groupedExpenses[date].total /groupedExpenses[date].expenses.length).toFixed(2)}</p>
          <div className="flex flex-row justify-between border-b-2 font-bold">
            <h2>{date}</h2>
            <div className="flex flex-col">
                <p>Total: </p>
                <p>${groupedExpenses[date].total.toFixed(2)}</p>
            </div>
          </div>
          <ul>
            {groupedExpenses[date].expenses.map((x) => (
              <li key={x.id}>
                <div className="flex flex-row" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                  <div className="flex-1">
                    <Expense expenseName={x.expenseName} expenseAmount={x.amount} />
                  </div>
                  {isHovering ? (
                      <button onClick={() => onDeleteExpense(x.id)} className=" text-white bg-blue-500 hover:bg-red-600 w-auto border-2 border-black mx-2 px-2">
                        X
                      </button>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
