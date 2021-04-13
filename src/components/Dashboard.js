import React, { useEffect, useState } from 'react';
import '../assets/styles/components/Dashboard.css';
const Dashboard = () => {
  const [pages, setpages] = useState([]);
  const [pageslist, setPageslist] = useState([]);
  const [filter, setFilter] = useState('');
  useEffect(() => {
    setpages([
      { name: 'salmon salad 0', pageId: '0' },
      { name: 'my personal page 1', pageId: '1' },
      { name: 'history 2', pageId: '2' },
      { name: 'salmon salad 3', pageId: '3' },
      { name: 'salmon salad 4', pageId: '4' },
      { name: 'salmon salad 5', pageId: '5' },
      { name: 'salmon salad 6', pageId: '6' },
    ]);
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
  const editOrCreatePage = (pos) => {
    if (pos >= 0 && pos < pages.length) {
      const page = pages[pos];
      console.log(page);
    } else {
      alert('error');
    }
  };
  return (
    <div className="Dashboard">
      <h1>Pages</h1>
      <div>
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
