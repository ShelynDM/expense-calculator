// Functional component that displays the name and amount of an expense
import { useState } from "react";
export default function Expense({expenseName, expenseAmount}) {

    // const [isHovering, setIsHovering] = useState(false);

    // const handleMouseEnter = () => {
    //     setIsHovering(true);
    //   };
    
    //   const handleMouseLeave = () => {
    //     setIsHovering(false);
    //   };
    return (
        <div className="flex-column">
            <div className="flex flex-row justify-between w-auto border-2 border-blue-500 m-2 p-2"  >            
                <div>
                    {expenseName}
                </div>
                <div>
                    $ {expenseAmount}
                </div>
            </div>
            {/* <div>
            {isHovering ? (
                <button onClick={() => deleteExpense(x.id)} className=" text-white">
                    Delete
                </button>
                ): null}
            </div> */}
        </div>
    );
}
