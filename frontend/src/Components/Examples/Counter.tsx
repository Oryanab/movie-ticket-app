import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { counterActions } from '../../Redux/CombineActions/counterActions';
import { State } from '../../Redux/Types/storeTypes';

export default function Counter() {
  const [incrementAmount, setIncrementAmount] = useState('');
  const [decrementAmount, setDecrementAmount] = useState('');

  const Dispatch = useDispatch();
  const count = useSelector((state: State) => state.counter);

  const handleIncrement = (e: React.MouseEvent<HTMLElement>): any => {
    e.preventDefault();
    Dispatch(counterActions.increment(Number(incrementAmount)));
  };
  const handleDecrement = (e: React.MouseEvent<HTMLElement>): any => {
    e.preventDefault();
    Dispatch(counterActions.decrement(Number(decrementAmount)));
  };
  return (
    <div>
      <Form style={{ display: 'flex', justifyContent: 'center', marginTop: '10vh' }}>
        <div>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setIncrementAmount(e.target.value);
              }}
              type="number"
              placeholder="Enter number"
            />
          </Form.Group>
          <Button onClick={(e: React.MouseEvent<HTMLElement>) => handleIncrement(e)} variant="primary" type="submit">
            Add
          </Button>
        </div>
        <h1 style={{ margin: '10vh' }}>{count}</h1>
        <div>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setDecrementAmount(e.target.value);
              }}
              type="number"
              placeholder="Enter number"
            />
          </Form.Group>
          <Button onClick={(e: React.MouseEvent<HTMLElement>) => handleDecrement(e)} variant="primary" type="submit">
            Reduce
          </Button>
        </div>
      </Form>
    </div>
  );
}
