"use client";
import Link from 'next/link';
import Image from 'next/image';
import ExpenseComponent from './components/expenseComponent/page'

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
        <div className='m-2 justify-center'>
            {user ? (
                <div>
                    <div className=' flex flex-row justify-between p-2 border-b-2 border-white'>
                        <div>
                            <p>{user.displayName}</p>
                            <p>{user.email}</p>
                        </div>
                        <div className='self-center'>
                            <button onClick={signOut} className="p-1 bg-slate-800 hover:bg-red-700 mr-2 ring-1 ring-white">Sign Out</button>
                        </div>
                    </div>
                    <div className='p-4 border-2 border-blue-500 m-4'>
                        <h1 className="text-center text-3xl font-bold ">Expense Tracker</h1>
                    </div>
                    <div className=' h-screen'>
                    <ExpenseComponent />
                    </div>
                    <div className=' border-t-2 border-white text-center' >
                        <p>Credits</p>
                        <p>                        
                            <Link href="https://github.com/lukePeavey/quotable" className='hover:underline hover:text-blue-500'>Quotable</Link>
                        </p>
                        <p>
                            <Link href="https://logo.com/" className='hover:underline  hover:text-blue-500'>Logo Maker</Link>
                        </p>
                    </div>    
                </div>        
            ) : (
            <div>
                <div className=' text-center p-2 border-b-2 border-white'>
                        Welcome to Xtract
                </div>
                <div className='p-4 border-2 border-blue-500 m-4'>
                    <h1 className="text-center text-3xl font-bold ">Expense Tracker</h1>
                </div>
                <div className='flex justify-center my-14'>
                        <Image src="/xtract-logo.jpg" alt="Xtract Logo" width={200} height={200}  style={{width: 'auto', height: 'auto'}} priority></Image>           
                </div>
                <div className="flex flex-col items-center my-12 h-screen">
                    <div className="flex justify-end">
                        <button onClick={signIn} className="m-10 p-4 bg-slate-800 hover:bg-blue-600 ">Sign in with GitHub</button>
                    </div>
                </div>
                <div className=' border-t-2 border-white text-center' >
                <div className=' border-t-2 border-white text-center' >
                        <p>Credits</p>
                        <p>                        
                            <Link href="https://github.com/lukePeavey/quotable" className='hover:underline hover:text-blue-500'>Quotable</Link>
                        </p>
                        <p>
                            <Link href="https://logo.com/" className='hover:underline  hover:text-blue-500'>Logo Maker</Link>
                        </p>
                    </div>    
                </div>   
            </div>
            )}
        </div>
    );
}