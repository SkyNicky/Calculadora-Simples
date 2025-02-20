import React, { useState } from "react";
import { create, all } from "mathjs";
import "./CalSimples.css";  // CSS fornecido

const math = create(all); // Create a mathjs instance

const Calculator = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handleButtonClick = (value) => {
    // Se o valor for π, adiciona 3.14 em vez do símbolo π
    if (value === "π") {
      setInput((prevInput) => prevInput + "3.14");
    } else {
      setInput((prevInput) => prevInput + value);
    }
  };

  const handleClear = () => {
    setInput("");
    setResult("");
  };

  const handleSolve = () => {
    try {
      let expression = input;
        .replace(/×/g, "*") // Converte "×" para "*"
        .replace(/÷/g, "/") // Converte "÷" para "/"
      // Substitui o símbolo √ por sqrt() para avaliação
      expression = expression.replace(/√(\d+)/g, "sqrt($1)");

      // Verificando no console se a expressão está correta
      console.log("Expressão para avaliar:", expression);

      // Usando evaluate para calcular o resultado da expressão
      const evaluatedResult = math.evaluate(expression);
      setResult(evaluatedResult);
    } catch (error) {
      console.error("Erro ao avaliar:", error);
      setResult("Error");
    }
  };

  return (
    <div className="calculator">
      {/* Título da Calculadora */}
      <div className="title">Calculadora</div>

      <div className="display">{input || "0"}</div>
      <div className="result">{result || ""}</div>

      <div className="buttons">
        {/* Números e Operações */}
        <button className="button" onClick={() => handleButtonClick("7")}>7</button>
        <button className="button" onClick={() => handleButtonClick("8")}>8</button>
        <button className="button" onClick={() => handleButtonClick("9")}>9</button>
        <button className="button" onClick={() => handleButtonClick("÷")}>/</button>

        <button className="button" onClick={() => handleButtonClick("4")}>4</button>
        <button className="button" onClick={() => handleButtonClick("5")}>5</button>
        <button className="button" onClick={() => handleButtonClick("6")}>6</button>
        <button className="button" onClick={() => handleButtonClick("×")}>*</button>

        <button className="button" onClick={() => handleButtonClick("1")}>1</button>
        <button className="button" onClick={() => handleButtonClick("2")}>2</button>
        <button className="button" onClick={() => handleButtonClick("3")}>3</button>
        <button className="button" onClick={() => handleButtonClick("+")}>+</button>

        <button className="button" onClick={() => handleButtonClick("0")}>0</button>
        <button className="button" onClick={() => handleButtonClick(".")}>.</button>
        <button className="button" onClick={() => handleButtonClick("π")}>π</button> {/* Botão π */}
        <button className="button" onClick={() => handleButtonClick("-")}>-</button>

        {/* Botões de potência, raiz, parênteses e C */}
        <button className="button" onClick={() => handleButtonClick("^")}>^</button>
        <button className="button" onClick={() => handleButtonClick("√")}>√</button>
        <button className="button" onClick={() => handleButtonClick("(")}>(</button>
        <button className="button" onClick={() => handleButtonClick(")")}>)</button>
        <button className="button clear-button" onClick={handleClear}>C</button> {/* Botão C */}

        {/* Botão de igual que preenche 2 colunas */}
        <button className="button solve-button" onClick={handleSolve} style={{ gridColumn: 'span 2' }}>=</button>
      </div>
    </div>
  );
};

export default Calculator;
