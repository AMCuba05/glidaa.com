import React, { useEffect, useState } from 'react';
import '../assets/styles/components/Dashboard.css';
import S3 from 'react-aws-s3'

const { S3Client, CreateBucketCommand } = require("@aws-sdk/client-s3");

// Set the AWS region
const REGION = "us-east-1"; //e.g. "us-east-1"

// Set the bucket parameters
const bucketParams = { Bucket: "BUCKET_NAME" };

// Create S3 service object
const s3 = new S3Client({ region: REGION });

//Attempt to create the bucket
const run = async () => {
  const auxS3 = new S3({
    bucketName: "Prueba",
    region: REGION,
    accessKeyId: '1234',
    secretAccessKey: '23568'
  });
  try {
    const data = await s3.send(new CreateBucketCommand(bucketParams));
    console.log("Success", data.$metadata.httpHeaders.location);
  } catch (err) {
    console.log("Error", err);
  }
};

const Dashboard = () => {
  const [pages, setpages] = useState([]);
  const [pageslist, setPageslist] = useState([]);
  const [filter, setFilter] = useState('');
  useEffect(() => {
    fetch(process.env.PUBLIC_URL + '/pages.json')
      .then((response) => response.json())
      .then((data) => {
        setpages(data);
      })
      .catch(function (err) {
        console.log('Error: ', err);
      });
  }, []);

  const Filterpages = () => {
    setPageslist(pages.filter((page) => page.name.toLowerCase().includes(filter.toLowerCase())));
  };
  useEffect(() => {
    Filterpages();
    console.log('Prueba');
  }, [filter]);
  useEffect(() => {
    setPageslist(pages);
  }, [pages]);
  const filterhandled = (event) => {
    setFilter(event.target.value);
  };
  const searchhandler = () => {
    if (filter !== '') {
      const exist = false;
      for (var i = 0; i < pageslist.length; i++) {
        if (pageslist[i].name.toLowerCase() === filter.toLowerCase()) {
          console.log(pageslist[i], i);
          exist = true;
          break;
        }
      }
      if (!exist) {
        const auxPages = pages;
        auxPages.push({ name: filter, pageId: pages.length });
        setpages(auxPages);
        Filterpages();
      }
    }
  };
  const editOrCreatePage = /*async*/ (pos) => {
    if (pos >= 0 && pos < pages.length) {
      const page = pages[pos];
      console.log(page);
      //await run();
    } else {
      alert('error');
    }
  };
  return (
    <div className="Dashboard">
      <h1>PAGES</h1>
      <div className="Dashboard-search">
        <input type="text" placeholder="Pages" name="filterInput" value={filter} onChange={filterhandled}></input>
        <button onClick={searchhandler}>Select</button>
      </div>
      {pageslist.map((page, i) => (
        <div className="Dashboard-page" key={`page${i}`}>
          <div>{page.name}</div>
          <button onClick={() => editOrCreatePage(i)}>Edit</button>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
