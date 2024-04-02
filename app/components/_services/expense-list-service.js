import { db } from "../_utils/firebase";
import { collection, getDocs, addDoc, query } from "firebase/firestore";

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

export const addExpense = async (userId, expense) => {
    try{
        const docRef = await addDoc(collection(db, `users/${userId}/expense`), expense);
        return docRef.id;
    }
    catch(error){
        console.error("Error adding document: ", error);
    }
};

export const deleteExpense = async (userId, expenseId) => {
    try{
        await deleteDoc(doc(db, `users/${userId}/expense/${expenseId}`));
    }
    catch(error){
        console.error("Error deleting document: ", error);
    }
};