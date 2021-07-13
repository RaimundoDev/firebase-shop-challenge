import React, {useEffect, useState} from 'react';
import ProductsList from './components/ProductsList';
import {apiURL} from './apiUrl';

const App = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [mainContent, setMainContent] = useState(true);
  const [page, setPage] = useState('<h1>A</h1>');
  const [products, setProducts] = useState([]);
  const [reloadPage, setReloadPage] = useState(false);

  const getAllProducts = async () => {
    await (fetch(apiURL)
      .then((res) => {
        if (res.status >=200 && res.status <=299) {
          return res.json()
        } else {
          setIsLoading(false);
          setIsError(true);
          throw new Error(res.statusText);
        }
      })
      .then((res) => {
        setIsLoading(false);
        setProducts(res);
      })
      .catch(() => {
        setIsLoading(false);
        setIsError(true);
      }))
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(()=>{
    setIsLoading(true);
    getAllProducts();

    return setReloadPage(false);
    
  }, [mainContent, reloadPage]);

  if (mainContent) {
    if (isLoading) {
      return (
        <section className='loadingsection'>
          <h1>Carregando, aguarde...</h1>
        </section>
      );  
    }

    if (isError) {
      return (
        <section className='errorsection'>
          <h1>Algo deu errado.</h1>
          <p>Não foi possível se conectar.</p>
        </section>
      );
    }
    return (
      <section className='App'>
        <ProductsList reloadPage={setReloadPage} productsInfo={products} setPage={setPage} setContent={setMainContent} />
      </section>
    );
  } else {
    return (
      <section className='secondPage'>
        {page}
      </section>
    );
  }
}

export default App;
