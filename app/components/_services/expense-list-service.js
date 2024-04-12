import { db } from "../_utils/firebase";
import { collection, getDocs, addDoc, query, deleteDoc, doc} from "firebase/firestore";

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
        const docRef = doc(db, `users/${userId}/expense/${expenseId}`);
        await deleteDoc(docRef);
        //console.log(userId, expenseId);
    }
    catch(error){
        console.error("Error deleting document: ", error);
    }
};

export const getExpenseById = async (userId, expenseId) => {
    try {
       const docRef = doc(db, `users/${userId}/expense/${expenseId}`);
       const docSnap = await getDocs(docRef);
   
       if (docSnap.exists()) {
         return docSnap.data();
       } else {
         console.log("No such document!");
       }
    } catch (error) {
       console.error("Error getting document:", error);
    }
};
