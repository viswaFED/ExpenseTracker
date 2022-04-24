import React from "react";
import "./ExpensesList.css";

const ExpenseList = (props) => {
  let expenseTotal = 0;
  props.items.forEach((item) => {
    let subtotal = 0;
    subtotal = Number(item.money);
    expenseTotal = expenseTotal + subtotal;
  });
  return (
    <>
      <div className="headings">
        <h5>
          <span className="left">Money spent</span>
          <span className="center">Description</span>
          <span className="right">category</span>
        </h5>
      </div>

      <div className="addeditems">
        {props.items.map((item) => {
          return (
            <ul key={item.id}>
              <span className="left"> {item.money}</span>
              <span className="center">{item.description}</span>
              <span className="right">{item.category}</span>
            </ul>
          );
        })}
      </div>
      <div className="expensetotal">
        <h5> Total Money spent : {expenseTotal}</h5>
      </div>
    </>
  );
};

export default ExpenseList;
