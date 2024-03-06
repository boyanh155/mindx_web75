import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import IncreBt from "./components/IncreBt";
import DecreBt from "./components/DecreBt";
import { selectCount } from "./features/counter/counterSlice";
import { useSelector } from "react-redux";
import {
  increment,
  decrement,
  incrementByAmount,
} from "./features/counter/counterSlice";
import { useDispatch } from "react-redux";

function App() {
  const [count, setCount] = useState(0);

  //

  const countNew = useSelector(selectCount);
  const dispatch = useDispatch();

  return (
    <p>
      Count : {countNew}
      <IncreBt handleIncrease={() => dispatch(increment())} />
      <DecreBt handleDecrease={() => dispatch(decrement())} />
    </p>
  );
}

export default App;
