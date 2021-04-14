import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Editor = () => {
  const { pageId } = useParams();
  const [page, setpage] = useState({ name: 'prueba' });
  useEffect(() => {
    fetch(process.env.PUBLIC_URL + '/pages.json')
      .then((response) => response.json())
      .then((data) => {
        const auxpages = data.filter((p) => p.pageId === pageId);
        if (auxpages?.length > 0) {
            setpage(auxpages[0]);
            console.log('AuxPages:', auxpages,data,pageId);
        }
      })
      .catch(function (err) {
        console.log('Error: ', err);
      });
  }, []);
  return (
    <div>
      <h1>{page.name}</h1>
    </div>
  );
};
export default Editor;
