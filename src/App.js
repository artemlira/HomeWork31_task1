import { useState, createRef } from "react";

export default function App() {
  const maxRef = createRef();
  const minRef = createRef();
  const amountRef = createRef();
  const [data, setData] = useState([]);

  const addNumbers = () => {
    for (let i = 0; i < amountRef.current.value; i++) {
      setData(data => [
        ...data,
        Math.floor(Math.random() * (+maxRef.current.value - +minRef.current.value + 1)) + +minRef.current.value
      ])
    }
  }

  return (
    <>
      <div className="wrapper">
        <form>
          <label>Введіть початок діапазону</label>
          <input className="btn__text" type='text' ref={minRef} />
          <label>Введіть кінець діапазону</label>
          <input className="btn__text" type='text' ref={maxRef} />
          <label>Введіть кількість чисел, які хочете побачити</label>
          <input className="btn__text" type='text' ref={amountRef} />
          <input className="btn" type='button' value="Показати результат" onClick={addNumbers} />
        </form>
        <div className="result">
          <h3 className="result__title">Ваші числа:</h3>
          <div className="result__text">
            <p>{data ? data.join(' - ') : ''}</p>
          </div>
        </div>
      </div>

    </>
  );
}