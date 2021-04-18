import React, { useEffect, useState } from 'react';
import Explainerpage from './hydrationPage/components/Explainerpage';
import '../assets/styles/components/Editor.css';
const Editor = () => {
  const [itemJson, setItemJson] = useState([]);
  const [item, setItem] = useState({})
  const [description, setDescription] = useState({})
  const [attribName, setattribName] = useState("")
  useEffect(() => {
        setItem(itemJson?.length > 0?itemJson[itemJson.length-1]:[])
        console.log("Prueba",itemJson)
  }, [itemJson,setItem])
  useEffect(() => {
      console.log(item)
  }, [item])
  useEffect(() => {
    if(itemJson?.length>0){
      const auxItemJson = itemJson;
      let auxItem =auxItemJson[auxItemJson.length-1][0];
      console.log("Atrib:",attribName)
      if(attribName && description[attribName] !==auxItem[attribName]){
        console.log("descripción",description)
        auxItem = {
          ...auxItem,
          ...description};
          auxItemJson[auxItemJson.length-1][0] = auxItem

        setItemJson([...auxItemJson])
      }
    }
  }, [description,itemJson,attribName])
  const handleDescriptionbchange = (event)=>{
    setDescription({
      ...description,
      [event.target.name]: event.target.value
    });
    setattribName(event.target.name)
  }
  const handleVideoAdd = (i) => {
    setattribName("")
    setDescription({})
    const Video = [
      {
        slide: i,
        card: '1',
        slideType: 'video',
        description: ""/*'Samurai Salmon Sashimi Salad'*/,
        descriptionType: '',
        data: ''/*'https://explainerpage-assets.s3.amazonaws.com/salmonvideos/00topfull.mp4'*/,
        frames: '',
        graphChange: '',
        static: '',
      },
    ];
    setItemJson([...itemJson, Video]);
  };
  const handleAnimationAdd = (i) => {
    setattribName("")
    setDescription({})
    const Animation = [
      {
        slide: i,
        card: '1',
        slideType: '2d',
        description:"",//'The Samurai are one of the most recognised warrior classes in history. Few names conjure such distinct images in the mind. The armour, the sword and bow, the stoic honour and sense of duty, they paint the picture of the pop culture icons and the perfect warriors. But what did these perfect warriors eat? And what can we take away from their diets and apply to our own?',
        descriptionType: 'card',
        data: '',//'https://assets7.lottiefiles.com/private_files/lf30_k6oprjex.json',
        frames: '31',//'451',
        graphChange: '',
        static: '',
      },
    ];
    setItemJson([...itemJson, Animation]);
  };
  const handleTextAdd = (i) => {
    setattribName("")
    setDescription({})
    const Text = [
      {
        slide: i,
        card: '2',
        slideType: 'text',
        description: "",//'Prep Time: 30 min Cook Time: 30 min',
        descriptionType: 'card',
        data: '',
        frames: '',
        graphChange: '',
        static: '',
      },
    ];
    setItemJson([...itemJson, Text]);
  };
  return (
    <div className="Editor">
      <div className="">
        <Explainerpage itemJsonFile={itemJson} />
      </div>
      <div className="graphic Editor-Graphic">
          Editor
          <button onClick={()=>(handleVideoAdd(itemJson.length))}>Add Video</button>
          <button onClick={()=>(handleAnimationAdd(itemJson.length))}>Add Animation</button>
          <button onClick={()=>(handleTextAdd(itemJson.length))}>Add Text</button>
          <div>
            {itemJson?.length > 0 ? (
              itemJson.map((left, i) => {
                return <div key={i}>{left[0].slideType}</div>;
              })
            ) : (
              <div>Vacio</div>
            )}
          </div>
        </div>
        <div className="graphic Editor-Graphic">
          Opciones
          <div>
            {item && item[0]?
            <div>
              <div>{item[0].slideType}</div>
              <input placeholder="description" onChange={handleDescriptionbchange} name='description' value={description.description?description.description:""}></input>
              {item[0].slideType==='video' || item[0].slideType==='2d'?
              <input placeholder="url" onChange={handleDescriptionbchange} name='data' value={description.data?description.data:""}></input>:null
            }
              {
                item[0].slideType==='2d'?
              <input placeholder="frames" onChange={handleDescriptionbchange} name='frames' value={description.frames?description.frames:""}></input>:null
              }
              </div>
             : 
              <div>Vacio</div>
            }
          </div>
        </div>
    </div>
  );
};

export default Editor;
