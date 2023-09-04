import { useState, useEffect } from "react";
import "./App.css";
import { LuDelete } from "react-icons/lu";
function App() {
  const [arithmetic, setArithmetic] = useState("");
  const [result, setResult] = useState(0);
  const [isCalculated, setIsCalculated] = useState(false);
  const [isAlert, setIsAlert] = useState(false);
  let deleteInterval = null;

  function handleClick(e) {
    const char = e.target.innerText === "X" ? "*" : e.target.innerText;
    const regex = /[+*\/-]/;
    const regexNum = /\d|\(|\)|\./;
    setIsAlert(false);
    if (isCalculated && !isAlert) {
      if (regex.test(char)) {
        setArithmetic(result.toString() + char);
        setIsCalculated(false);
      } else if (regexNum.test(char)) {
        setResult(0);
        setArithmetic("");
        setIsCalculated(false);
      }
    }
    setArithmetic((prev) => {
      // Check for multiple zeros at the start or leading zeros
      const regexForZeros = /(^[0]+[0-9])|^[+*\/-]|([+*\/-][0]+[0-9])/g;
      const endsRegex = /[+*\/-]$/;
      if (regexForZeros.test(prev + char)) {
        return prev.slice(0, -1) + char;
      }
      if (endsRegex.test(prev) && regex.test(char)) {
        return prev.replace(endsRegex, char);
      }
      if (char === "=") {
        return prev;
      }
      return prev + char;
    });
    if (char === "=") {
      findResult();
    }
  }
  function clearArithmetics() {
    setResult(0);
    setArithmetic("");
  }
  function backspace() {
    arithmetic.length > 0 && setArithmetic((prev) => prev.slice(0, -1)), 100;
  }

  function checkParentheses(string) {
    let amountL = 0;
    let amountR = 0;
    string.split("").forEach((char) => {
      if (char === "(") amountL++;
      if (char === ")") amountR++;
    });
    return amountL === amountR;
  }
  function findResult() {
    if (arithmetic === "") {
      setResult(0);
    } else if (arithmetic.length > 16) {
      setResult("too many digits");
    } else {
      let prepareTask = arithmetic.replace(/(\d)\(/g, "$1*(");
      prepareTask = prepareTask.replace(/[*-+\/]$|[*-+\/]\($|[*-+\/]\)$/, "");
      // console.log(prepareTask);
      setArithmetic(prepareTask);
      const isParentheses = checkParentheses(prepareTask);
      if (!isParentheses) {
        setIsAlert(true);
        alert("Please close all parenthesis before calculating!");
      } else {
        const findSolution = eval(prepareTask);
        if (isNaN(findSolution) || !isFinite(findSolution)) {
          setResult("Error");
        } else {
          setIsCalculated(true);
          console.log(arithmetic);
          setResult(Math.round(findSolution * 100000000) / 100000000);
        }
      }
    }
  }

  return (
    <>
      <div className="calculator">
        <div className="calc-head" id="display">
          <div className="arithmetic">{arithmetic}</div>
          <div className="result">{result}</div>
        </div>
        <div onClick={clearArithmetics} className="clear">
          AC
        </div>
        <div onClick={backspace} className="delete">
          <LuDelete />
        </div>

        <div onClick={handleClick} className="parentheses-left">
          {"("}
        </div>
        <div onClick={handleClick} className="parentheses-right">
          {")"}
        </div>
        <div onClick={handleClick} className="divide">
          /
        </div>
        <div onClick={handleClick} className="mult">
          X
        </div>
        <div onClick={handleClick} className="minus">
          -
        </div>
        <div onClick={handleClick} className="plus">
          +
        </div>
        <div onClick={handleClick} className="equal">
          =
        </div>
        <div onClick={handleClick} className="comma">
          .
        </div>
        <div onClick={handleClick} className="zero">
          0
        </div>
        <div onClick={handleClick} className="one">
          1
        </div>
        <div onClick={handleClick} className="two">
          2
        </div>
        <div onClick={handleClick} className="three">
          3
        </div>
        <div onClick={handleClick} className="four">
          4
        </div>
        <div onClick={handleClick} className="five">
          5
        </div>
        <div onClick={handleClick} className="six">
          6
        </div>
        <div onClick={handleClick} className="seven">
          7
        </div>
        <div onClick={handleClick} className="eight">
          8
        </div>
        <div onClick={handleClick} className="nine">
          9
        </div>
      </div>
    </>
  );
}

export default App;
