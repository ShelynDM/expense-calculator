// Functional component that displays the name and amount of an expense
export default function Expense({expenseName, expenseAmount}) {
    return (
        <div className="flex-column w-auto ">
            <div className="flex flex-row justify-between mx-4"  >            
                <div>
                    <p>{expenseName}</p>
                </div>
                <div>
                    <p>${expenseAmount}</p>
                </div>
            </div>
        </div>
    );
}
