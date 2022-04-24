import React, { useRef, useState } from "react";
import Card from "./Card";
import classes from "./Expenses.module.css";
import ExpenseList from "./ExpensesList";

const ExpenseForm = (props) => {
  const dummyExpense = [
    {
      id: "A1",
      money: "1000",
      description: "Tv EMI",
      category: "EMI",
    },
  ];
  const [expense, setExpense] = useState(dummyExpense);

  const moneyInputRef = useRef();
  const desInputRef = useRef();
  const categoryRef = useRef();

  const addListHandler = (event) => {
    event.preventDefault();

    const enteredMoney = moneyInputRef.current.value;
    const enteredDescription = desInputRef.current.value;
    const enteredCategory = categoryRef.current.value;

    setExpense((prevState) => {
      return [
        {
          money: enteredMoney,
          description: enteredDescription,
          category: enteredCategory,
        },
        ...prevState,
      ];
    });
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
              <input type="number" ref={moneyInputRef}></input>
            </div>
            <div>
              <label>Desricption</label>
            </div>
            <div>
              <input type="text" ref={desInputRef}></input>
            </div>
            <div>
              <label>Category</label>
            </div>
            <div>
              <select ref={categoryRef}>
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
