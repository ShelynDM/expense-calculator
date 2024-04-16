import { db } from "../_utils/firebase";
import { collection, getDocs, addDoc, query, deleteDoc, doc} from "firebase/firestore";

// Function to get all expenses from the database
export const getExpenses = async (userId) => {
    try{
        const expense = [];
        const q = query(collection(db, `users/${userId}/expense`));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            expense.push({id: doc.id, ...doc.data()});
        });
        return expense;
    }
    catch(error){
        console.error("Error getting documents: ", error);
    }
};

// Function to add a new expense to the database
export const addExpense = async (userId, expense) => {
    try{
        const docRef = await addDoc(collection(db, `users/${userId}/expense`), expense);
        return docRef.id;
    }
    catch(error){
        console.error("Error adding document: ", error);
    }
};

// Function to delete an existing expense in the database
export const deleteExpense = async (userId, expenseId) => {
    try{
        const docRef = doc(db, `users/${userId}/expense/${expenseId}`);
        await deleteDoc(docRef);
        //console.log(userId, expenseId);
    }
    catch(error){
        console.error("Error deleting document: ", error);
    }
};
