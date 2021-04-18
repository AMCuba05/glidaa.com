import React, { useEffect } from 'react';
import className from 'classnames';
import { Card } from 'react-bootstrap';
import { useInView } from 'react-intersection-observer';
import '../assets/styles/components/WaypointCard.css';
import { useResizeDetector } from 'react-resize-detector/build/withPolyfill';

const WaypointCard = (props) => {
  const { i, setComponentNumberstate, componentNumberstate, text, isText, isFirst, isLast } = props;
  const [refView, inView] = useInView();
  const { height, ref } = useResizeDetector();
  useEffect(() => {
    const auxarray = Array(...componentNumberstate);
    auxarray[i] = inView;
    setComponentNumberstate(auxarray);
  }, [inView]);
  const setHTML = (data) => {
    data = Array.isArray(data) ? data.filter((t) => t !== ',') : data;
    return { __html: data };
  };
  return (
    <div
      className={className('w-card-maindiv', { 'w-card-maindiv-first': isFirst }, { 'w-card-maindiv-last': isLast })}
      id={`step${i}`}
      key={i}
      style={{height:isText?`${height}px`:'auto'}}
    >
      <div ref={refView} className={className('w-card-div', { 'w-card-text': isText })}>
        <div ref={ref} style={{ width: '100%' }}>
          {text ? (
            text.map((card, j) => (
              <div
                className={className('w-card', { 'w-card-first': j === 0 }, { 'w-card-last': j === text.length - 1 })}
                id={`desc${i}-${j}`}
                key={`${i}-${j}`}
              >
                <Card className={className({'card-text':isText})}>
                  <Card.Body >
                    <div dangerouslySetInnerHTML={setHTML(card)}
                    style={{overflowWrap:"anywhere"}}></div>
                  </Card.Body>
                </Card>
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
      </div>
    </div>
  );
};
export default WaypointCard;
