// import Link from 'next/link';
// import ComponentPage from './components/page';

// export default function Page() {
//   return (
//     <div>
//       <ComponentPage />
//     </div>
//   );
// }

"use client";
//import ExpenseComponent from './assest/components/expenseComponent/page'
import ExpenseComponent from './components/expenseComponent/page'

//import logo from '../assets/Xtract-logo.png'
//import logo from '../assets/Xtract-logo.svg'
//import { useUserAuth } from "./components/_utils/auth-context";
import { useUserAuth } from "./components/_utils/auth-context";

export default function Page() {
    const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();
    
    const signIn = async () => {
        await gitHubSignIn();
    }

    const signOut = async () => {
        await firebaseSignOut();
    }

    return (
        <div>
            {user ? (
                <div>
                    <div className=' flex flex-row justify-between p-2 border-b-2 border-white'>
                        <div>
                            <p>{user.displayName}</p>
                            <p>{user.email}</p>
                        </div>
                        <div>
                            <button onClick={signOut} className="p-1 bg-slate-800 hover:bg-red-700 mr-2 ring-1 ring-white">Sign Out</button>
                        </div>
                    </div>
                    <div className='p-4 border-2 border-blue-500 m-4'>
                        <h1 className="text-center text-3xl font-bold ">Expense Tracker</h1>
                    </div>
                    <ExpenseComponent />
                    <div className=' border-t-2 border-white'>
                        <p>Footer</p>
                    </div>    
                </div>        
            ) : (
            <div>
                <div className=' text-center p-2 border-b-2 border-white'>
                    <div className='flex flex-row'>
                        Welcome to Xtract
                    </div>
                </div>
                <div className='p-4 border-2 border-blue-500 m-4'>
                    <h1 className="text-center text-3xl font-bold ">Expense Tracker</h1>
                </div>
                <div className="flex flex-col items-center m-52 ">
                    <div className="flex justify-end">
                        <button onClick={signIn} className="m-10 p-4 bg-slate-800 hover:bg-blue-600 ">Sign in with GitHub</button>
                    </div>
                </div>
                <div className=' border-t-2 border-white'>
                    <p>Footer</p>
                </div> 
            </div>
            )}
        </div>
    );
}