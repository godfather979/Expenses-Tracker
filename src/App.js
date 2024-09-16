import { useState } from "react";
import { GrUpdate } from "react-icons/gr";
import { MdDeleteOutline } from "react-icons/md";

const App = () => {

  const [inputValue1, setInputValue1] = useState('');
  const [inputValue2, setInputValue2] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editDescription, setEditDescription] = useState('');
  const [editAmount, setEditAmount] = useState('');
  const [error, setError] = useState('');

  // Function to handle input change
  const handleInputChange1 = (event) => {
    setInputValue1(event.target.value);
  };

  const handleInputChange2 = (event) => {
    setInputValue2(event.target.value);
  };

  const handleUpdate = (index) => {
    // Set the current transaction to be edited
    const transaction = transactions[index];
    setEditingIndex(index);
    setEditDescription(transaction.description);
    setEditAmount(transaction.amount);
  };
  
  const handleSaveUpdate = () => {
    if (editDescription && editAmount) {
      const updatedAmount = Number(editAmount);
      const updatedTransactions = [...transactions];
      const oldAmount = Number(transactions[editingIndex].amount);


      updatedTransactions[editingIndex] = {
        description: editDescription,
        amount: updatedAmount,
      };
  
      setTransactions(updatedTransactions);
  
      // Update income/expenses
      console.log(oldAmount);
      console.log(updatedAmount);
    
      if (oldAmount > 0) {
        setIncome(prevIncome => prevIncome - oldAmount );
      } else {
        setExpenses(prevExpenses => prevExpenses + oldAmount );
      }
      
      if (updatedAmount > 0) {
        setIncome(prevIncome => prevIncome + updatedAmount);
      } else {
        setExpenses(prevExpenses => prevExpenses - updatedAmount);
      }
  
      setEditingIndex(null);
      setEditDescription('');
      setEditAmount('');
    }
  };

  const handleDelete = (index) => {
    const newTransactions = transactions.filter((_, i) => i !== index);
    setTransactions(newTransactions);
  
    // Update income/expenses
    const deletedTransaction = transactions[index];
    const deletedAmount = Number(deletedTransaction.amount);
    if (deletedAmount > 0) {
      setIncome(prevIncome => prevIncome - deletedAmount);
    } else {
      setExpenses(prevExpenses => prevExpenses + deletedAmount);
    }
  };


  const addIncome = () => {

    try{
    if (inputValue1 && inputValue2) {
      
      const newTransaction = {
        description: inputValue1,
        amount: Number(inputValue2),
      };
      setError('');

      if (newTransaction.amount<0)
        throw new Error("Amount cannot be negative")
    

      // Add the new income transaction to the list
      setTransactions([...transactions, newTransaction]);
      setIncome(prevIncome => prevIncome + newTransaction.amount);

      // Clear the input fields
      setInputValue1('');
      setInputValue2('');
    }
    else 
      throw new Error("Values not entered");} 
    catch(error){setError(error.message);}
    
  };

  const addExpense = () => {

    try{
    if (inputValue1 && inputValue2) {
      const newTransaction = {
        description: inputValue1,
        amount: -Number(inputValue2),
      };
      setError('');

      if (newTransaction.amount>0)
        throw new Error("Amount cannot be negative")

      // Add the new expense transaction to the list
      setTransactions([...transactions, newTransaction]);
      setExpenses(prevExpenses => prevExpenses - newTransaction.amount);

      // Clear the input fields
      setInputValue1('');
      setInputValue2('');
    }else 
    throw new Error("Values not entered");}
     catch(error){setError(error.message);}
  };
 


  

  return (
    <>
      <div className="min-h-screen flex flex-col items-center bg-slate-900 p-10">
        
        {/* First Section */}
        <div className="bg-slate-400 w-1/2 p-5 mb-5">
          <h1 className="text-5xl text-center text-slate-900 font-bold">Expense Tracker</h1>
        </div>

        {/* Second Section */}
        <div className="w-1/2 px-20 flex">
          {/* First Half of the Second Section */}
          <div className="bg-slate-400 w-1/2 p-4 flex flex-col">
            <h1 className = "w-full text-center text-3xl font-bold ">Income</h1>
            <h1 className = "w-full text-center text-lg font-medium">{income}</h1>
          </div>

          {/* Partition Line */}
          <div className="border-l-4 border-slate-600 h-full"></div>
          
          {/* Second Half of the Second Section */}
          <div className="bg-slate-400 w-1/2 p-4 flex flex-col">
            <h1 className = "w-full text-center text-3xl font-bold ">Expenses</h1>
            <h1 className = "w-full text-center text-lg font-medium">{expenses}</h1>
          </div>
          </div>

          
        
          <div className= "flex space-x-2 w-1/2 mt-5 justify-center px-36">
          <button className = "block w-1/2  border-4 rounded-xl border-slate-600 text-2xl font-semibold text-slate-700 mb-3 bg-slate-300  p-3 hover:bg-green-600 hover:text-slate-300 hover:border-slate-300" onClick={addIncome}>Add Income</button>
          <button className = "block w-1/2  border-4 rounded-xl border-slate-600 text-2xl font-semibold text-slate-700 mb-3 bg-slate-300  p-3 hover:bg-red-600 hover:text-slate-300 hover:border-slate-300" onClick={addExpense}>Add Expense</button>
          </div>
          <h1>{error && <p style={{ color: 'red' }}>{error}</p>}</h1>
        {/* Input field */}
        <div className="min-h-screen flex flex-col items-center bg-slate-900 p-3 w-full">
        <input
          type="text"
          value={inputValue1}
          onChange={handleInputChange1}
          placeholder="Enter description"
          className="p-2 border border-slate-400 rounded mb-4 w-1/2"
        />

        <input
          type="text"
          value={inputValue2}
          onChange={handleInputChange2}
          placeholder="Enter amount"
          className="p-2 border border-slate-400 rounded mb-4 w-1/2"
        />

          {/* <div className="w-2/3 mt-5 bg-slate-400 min-h-36 p-3">
            <h2 className=" text-3xl text-slate-900 font-bold text-center">Transactions</h2>
            <ul className="mt-3">
              {transactions.map((transaction, index) => (
                <li key={index} className={`bg-slate-600 p-3 mb-2 rounded-lg text-xl font-semibold ${transaction.amount > 0 ? 'text-green-500' : 'text-red-700'}`}
                >
                  {transaction.description}: {Math.abs(transaction.amount)}
                </li >
              ))}
            </ul>
          </div> */}
        
 
        {transactions.length!==0 && (
        <div className="w-2/3 mt-5 bg-slate-400 min-h-36 p-3 rounded-lg">
            <h2 className=" text-3xl text-slate-900 font-bold text-center">Transactions</h2>
            <ul className="mt-3">
              {transactions.map((transaction, index) => (
                <li key={index} className={`p-3 mb-2 rounded-lg text-xl flex justify-between font-semibold ${transaction.amount > 0 ? 'bg-green-600' : 'bg-red-600'}`}
                >
                  {transaction.description}: {Math.abs(transaction.amount)}

                  <div>
                    <button className="px-3" onClick={() => handleUpdate(index)}><GrUpdate /></button>

                    <button className="px-1" onClick={() => handleDelete(index)}><MdDeleteOutline /></button>
                  </div>

                </li >
              ))}
            </ul>
          </div> 
        )}
          

          {editingIndex !== null && (
        <div className="w-1/2 mt-5 bg-slate-400 px-3 rounded-lg">
          <h2 className="text-2xl text-slate-900 font-bold text-center py-3">Edit Transaction</h2>
          <input
            type="text"
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            placeholder="Enter new description"
            className="p-2 border border-slate-400 rounded mb-4 w-full"
          />

          {editAmount<0 ? (<input
            type="text"
            value={-editAmount}
            onChange={(e) => setEditAmount("-" + e.target.value)}
            placeholder="Enter new amount"
            className="p-2 border border-slate-400 rounded mb-4 w-full"
          />):(<input
            type="text"
            value={editAmount}
            onChange={(e) => setEditAmount(e.target.value)}
            placeholder="Enter new amount"
            className="p-2 border border-slate-400 rounded mb-4 w-full"
          />)}
          
          <div className = "flex justify-end gap-3">
          <button
            className="block border-4 rounded-xl border-slate-600 text-lg font-semibold text-slate-700 mb-3  bg-slate-300 px-2 py-1 hover:bg-slate-700 hover:text-slate-300 hover:border-slate-300"
            onClick={handleSaveUpdate}
          >
            Save Update
          </button>
          <button
            className="block border-4 rounded-xl border-slate-600 text-lg font-semibold text-slate-700 mb-3 bg-slate-300 px-2 py-1 hover:bg-slate-700 hover:text-slate-300 hover:border-slate-300"
            onClick={() => setEditingIndex(null)}
          >
            Cancel
          </button>
          </div>
        </div>
          )}
        
        </div> 
        

       

          

      </div>
    </>
  );
};

export default App;

