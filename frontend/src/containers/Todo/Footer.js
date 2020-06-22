import React, { useContext, useCallback, useState, useMemo } from "react";
import { Button, Row, Col } from "reactstrap";

import { todoActions } from "../../store/actions";
import { TodoContext } from "../../contexts/todos";

export default function Footer() {
  const [delta, setDelta] = useState(1);
  const [num, setNum] = useState(0);

  const { dispatch } = useContext(TodoContext);

  const incrementDelta = useCallback(() => {
    setDelta((delta) => delta + 1);
  }, []);
  const increment = useCallback(() => {
    setNum((num) => num + delta);
  }, [delta]);

  const randomColour = useCallback(
    () => "#" + ((Math.random() * 0xffffff) << 0).toString(16),
    []
  );

  const renderDelta = useMemo(() => {
    return <div style={{ background: randomColour() }}> Delta is {delta} </div>;
  }, [delta]);

  const renderNum = useMemo(() => {
    return <div style={{ background: randomColour() }}> Counter is {num} </div>;
  }, [num]);

  const clearTodo = () => {
    dispatch(todoActions.clearTodo());
  };

  const resetTodo = () => {
    dispatch(todoActions.resetTodo());
  };

  return (
    <Row>
      {renderDelta}
      {renderNum}
      <Col sm={12}>
        <br />
        <Button color="info" type="button" onClick={() => clearTodo()}>
          Clear Tasks
        </Button>
        <Button
          color="info"
          type="button"
          className="btn btn-reset"
          onClick={() => resetTodo()}
        >
          Reset Tasks
        </Button>
        <Button color="primary" onClick={() => incrementDelta()}>
          Increment Delta
        </Button>
        <Button color="primary" onClick={increment}>
          Increment Counter
        </Button>
      </Col>
    </Row>
  );
}
