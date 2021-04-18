import React, { useEffect, useState } from 'react';
import Explainerpage from './hydrationPage/components/Explainerpage';
import '../assets/styles/components/Editor.css';
const Editor = () => {
  const [itemJson, setItemJson] = useState([]);
  const [item, setItem] = useState([]);
  const [attribName, setattribName] = useState('');
  const [attribValue, setattribValue] = useState('');

  useEffect(() => {
    if (itemJson?.length > 0) {
      const auxItemJson = itemJson;
      //console.log('Atrib:', attribName);
      
      if (attribName && attribValue !== item[attribName]) {
      const SelectedItem = auxItemJson.findIndex((auxItem) => {
        return auxItem[0].slide === item[0].slide;
      });
      if (SelectedItem >= 0 && SelectedItem < auxItemJson.length) {
        
        //console.log('descripción', attribValue);
        let auxItem = item;
        auxItem[0][attribName] = attribValue;
        setItem([...auxItem]);
        auxItemJson[SelectedItem] = [...auxItem];
        //console.log('Aux', auxItemJson);
      }
      }
    }
  }, [attribValue, itemJson, attribName]);
  const handleDescriptionbchange = (event) => {
    setattribName(event.target.name);
    setattribValue(event.target.value);
  };
  const handleVideoAdd = (i) => {
    setattribName('');
    setattribValue('');
    const Video = [
      {
        slide: i,
        card: '1',
        slideType: 'video',
        description: '',
        descriptionType: '',
        data: '',
        frames: '',
        graphChange: '',
        static: '',
      },
    ];
    setItemJson([...itemJson, Video]);
    setItem(Video);
  };
  const handleAnimationAdd = (i) => {
    setattribValue('');
    setattribName('');
    const Animation = [
      {
        slide: i,
        card: '1',
        slideType: '2d',
        description: '',
        descriptionType: 'card',
        data: '',
        frames: '',
        graphChange: '',
        static: '',
      },
    ];
    setItemJson([...itemJson, Animation]);
    setItem(Animation);
  };
  const handleTextAdd = (i) => {
    setattribName('');
    setattribValue('');
    const Text = [
      {
        slide: i,
        card: '2',
        slideType: 'text',
        description: '', //'Prep Time: 30 min Cook Time: 30 min',
        descriptionType: 'card',
        data: '',
        frames: '',
        graphChange: '',
        static: '',
      },
    ];
    setItemJson([...itemJson, Text]);
    setItem(Text);
  };
  const handledItemClick = (slide) => {
    const SelectedItem = itemJson.findIndex((auxItem) => {
      return auxItem[0].slide === slide;
    });
    if (SelectedItem >= 0 && SelectedItem < itemJson.length) {
      const selectItem = itemJson[SelectedItem] 
      setItem([...selectItem]);
      //console.log([...selectItem])
    }
  };
  return (
    <div className="Editor">
      <div className="">
        <Explainerpage itemJsonFile={itemJson} />
      </div>
      <div className="graphic Editor-Graphic">
        Editor
        <button onClick={() => handleVideoAdd(itemJson.length)}>Add Video</button>
        <button onClick={() => handleAnimationAdd(itemJson.length)}>Add Animation</button>
        <button onClick={() => handleTextAdd(itemJson.length)}>Add Text</button>
        <div>
          {itemJson?.length > 0 ? (
            itemJson.map((left, i) => {
              return (
                <div className={"Edit-Itemlist"} key={i} onClick={() => handledItemClick(left[0].slide)}>
                  {left[0].slideType}
                </div>
              );
            })
          ) : (
            <div>Vacio</div>
          )}
        </div>
      </div>
      <div className="graphic Editor-Graphic">
        Options
        <div>
          {item && item[0] ? (
            <div>
              <div>{item[0].slideType}</div>
              <textarea
                placeholder="description"
                onChange={handleDescriptionbchange}
                name="description"
                value={item[0].description ? item[0].description : ''}
                style={{width:'100%'}}
              ></textarea>
              {item[0].slideType === 'video' || item[0].slideType === '2d' ? (
                <input placeholder="url" onChange={handleDescriptionbchange} name="data" value={item[0].data ? item[0].data : ''}></input>
              ) : null}
              {item[0].slideType === '2d' ? (
                <input
                  placeholder="frames"
                  onChange={handleDescriptionbchange}
                  name="frames"
                  value={item[0].frames ? item[0].frames : ''}
                ></input>
              ) : null}
            </div>
          ) : (
            <div>Vacio</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Editor;
