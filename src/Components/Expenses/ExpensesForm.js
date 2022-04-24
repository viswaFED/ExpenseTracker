import React, { useRef, useState, useEffect } from "react";
import Card from "./Card";
import classes from "./Expenses.module.css";
import ExpenseList from "./ExpensesList";
import axios from "axios";

const ExpenseForm = (props) => {
  // const dummyExpense = [
  //   {
  //     id: "A1",
  //     money: "1000",
  //     description: "Tv EMI",
  //     category: "EMI",
  //   },
  // ];
  const [expense, setExpense] = useState([]);

  const moneyInputRef = useRef();
  const desInputRef = useRef();
  const categoryRef = useRef();

  const autoreloadExpenses = async () => {
    const userId = localStorage.getItem("userID");
    try {
      const res = await axios.get(
        `https://expensetracker-39d53-default-rtdb.firebaseio.com/expenses/${userId}.json`
      );
      const data = res.data;
      let arr = [];
      let index = 0;
      for (const key in data) {
        arr[index] = data[key];
        index++;
      }
      setExpense([...arr]);
    } catch (err) {
      console.log(`Some error ${err}`);
    }
  };
  useEffect(() => {
    autoreloadExpenses();
  }, );

  const addListHandler = async (event) => {
    event.preventDefault();

    const enteredMoney = moneyInputRef.current.value;
    const enteredDescription = desInputRef.current.value;
    const enteredCategory = categoryRef.current.value;

    // setExpense((prevState) => {
    //   return [
    //     {
    //       money: enteredMoney,
    //       description: enteredDescription,
    //       category: enteredCategory,
    //     },
    //     ...prevState,
    //   ];
    // });

    const newExpense = {
      money: enteredMoney,
      description: enteredDescription,
      category: enteredCategory,
    };
    const userId = localStorage.getItem("userID");
    try {
      const res = axios.post(
        `https://expensetracker-39d53-default-rtdb.firebaseio.com//expenses/${userId}.json`,
        newExpense
      );
      console.log(res);
    } catch (err) {
      console.log(`Some error ${err}`);
    }

    moneyInputRef.current.value = "";
    desInputRef.current.value = "";
    categoryRef.current.value = "";
  };

  return (
    <>
      <Card>
        <div className={classes.control}>
          <h2> Add Expenses</h2>
          <form onSubmit={addListHandler}>
            <div>
              <label>Money</label>
            </div>
            <div>
              <input type="number" ref={moneyInputRef} required></input>
            </div>
            <div>
              <label>Desricption</label>
            </div>
            <div>
              <input type="text" ref={desInputRef} required></input>
            </div>
            <div>
              <label>Category</label>
            </div>
            <div>
              <select ref={categoryRef} required>
                <option value="Food">Food</option>
                <option value="Petrol">Petrol</option>
                <option value="EMI">EMI</option>
                <option value="Salary">Salary</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <button>Add</button>
            </div>
          </form>
        </div>
      </Card>
      <Card>
        <ExpenseList items={expense} />
      </Card>
    </>
  );
};
export default ExpenseForm;
