import React, { useCallback, useRef } from "react";

import className from "classnames";
import { Waypoint } from "react-waypoint";
import { Card } from "react-bootstrap";

const WaypointCard = (props) => {
  const {
    i,
    text,
    onStepEnter,
    leftSideDiv,
    isLoading,
    changeWaypoint,
    Ref,
  } = props;

  return (
    <div
      ref={Ref}
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {text ? (
        text.map((card, j) => (
          <div className="desc" id={`desc${i}-${j}`} key={`${i}-${j}`}>
            <Waypoint
              fireOnRapidScroll={true}
              onEnter={
                leftSideDiv && isLoading
                  ? changeWaypoint
                    ? () => {
                        onStepEnter(i, j);
                      }
                    : () => {
                        onStepEnter(i);
                      }
                  : null
              }
            >
              <Card>
                <Card.Body>
                  <Card.Text>{card}</Card.Text>
                </Card.Body>
              </Card>
            </Waypoint>
          </div>
        ))
      ) : (
        <div className="desc" id={`desc${i + 1}`} key={`${i}-0`}>
          <Card>
            <Card.Body>
              <Card.Text>Loading</Card.Text>
            </Card.Body>
          </Card>
        </div>
      )}
    </div>
  );
};
export default WaypointCard;
