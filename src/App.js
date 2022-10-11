import { useState, createRef, useEffect } from "react";
// import axios from "axios";


export default function App() {
  const maxRef = createRef();
  const minRef = createRef();
  const amountRef = createRef();
  const [userValue, setUserValue] = useState([]);
  const [randomValue, setRandomValue] = useState([]);

  const url = 'https://api.random.org/json-rpc/4/invoke';
  const data = {
    "jsonrpc": "2.0",
    "method": "generateIntegers",
    "params": {
      apiKey: '279c0934-2766-4615-b3c5-c15d9eddf827',
      n: userValue[2],
      min: userValue[0],
      max: userValue[1]
    },
    "id": 1
  }

  useEffect(() => {
    if (userValue.length) {

      //=================  Метод fetch  =========================================================================      
      fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
      })
        .then((res) => res.json())
        .then((myRes) => setRandomValue(myRes.result.random.data))
        .catch((error) => {
          console.error(error);
        });

      //=================  Метод axios  =========================================================================   
      // axios.post('https://api.random.org/json-rpc/4/invoke', {
      //   method: 'generateIntegers',
      //   jsonrpc: "2.0",
      //   params: {
      //     apiKey: '279c0934-2766-4615-b3c5-c15d9eddf827',
      //     n: userValue[2],
      //     min: userValue[0],
      //     max: userValue[1]
      //   },
      //   id: 1
      // })
      //   .then((response) => setRandomValue(response.data.result.random.data))
      //   .catch((error) => {
      //     console.error(error);
      //   });
    }
  }, [userValue]);

  const formHendler = () => {

    if (minRef.current.value !== '' && maxRef.current.value !== '' && amountRef.current.value !== '') {
      setUserValue([minRef.current.value, maxRef.current.value, amountRef.current.value]);
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
          <input className="btn" type='button' value="Показати результат" onClick={formHendler} />
        </form>
        <div className="result">
          <h3 className="result__title">Ваші числа:</h3>
          <div className="result__text">
            <p>{randomValue ? randomValue.join(' - ') : ''}</p>
          </div>
        </div>
      </div>
    </>
  );
}