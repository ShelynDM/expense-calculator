// Functional component that displays the name and amount of an expense
export default function Expense({expenseName, expenseAmount}) {
    return (
        <div className="flex flex-row justify-between w-auto border-2 border-blue-500 m-2 p-2">
            <div>
                {expenseName}
            </div>
            <div>
                $ {expenseAmount}
            </div>
        </div>
    );
}
