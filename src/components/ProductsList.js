import React from 'react'
import EditPage from './EditPage';
import AddPage from './AddPage'
import {apiURL} from '../apiUrl';

const ProductsList = (props) => {
  
  const productsInfo = props.productsInfo;
  const setMainContent = props.setContent;
  const setPage = props.setPage;
  const reloadPage = props.reloadPage;

  const handleDeleteItem  = (id) => {
    const URL = `${apiURL}${id}`;

    fetch(URL, {
      method: 'delete',
      mode: 'cors'
    });
    reloadPage(prevState=>!prevState);
  };

  const handleEditItem = () => {

    setPage(<EditPage setContent={setMainContent} productsInfo={productsInfo}/>)
    setMainContent(prevState=>!prevState);
  };

  const handleAddProduct = () => {

    setPage(<AddPage setContent={setMainContent}/>)
    setMainContent(prevState=>!prevState);
  };

  return (
    <section className='productslist'>

      <article className='productcard'>
        <article className='addproduct' onClick={handleAddProduct}>
          <p>Adicionar Produto</p>
        </article>
      </article>

      {productsInfo.map((p) => {

        const {name, img, price, platform, genres} = p.data

        const backgroundImg = img === "" || img === null ? {} : {backgroundImage: `url(${img})`};

        return (
          <article className='productcard' key={p.i}>
            <article 
              className='productimg' 
              onClick={handleEditItem} 
              style={backgroundImg}
            />
            <article className='productinfo' onClick={handleEditItem}>
              <p className='productname'>{name}</p>
              <p className='productprice'>R$: {price}</p>
              <p>Disponível para: {platform.map((tag, i) => {
                return (
                  <span key={i} className='productplatformtag'>{tag}</span>
                );
              })}
              </p>
              <p>{genres.map((tag, i) => {
                return (
                  <span key={i} className='genreplatformtag'>#{tag}</span>
                );
              })}
              </p>
            </article>
            <button 
              className='deleteproductbtn'
              onClick={()=>handleDeleteItem(p.i)}>
              Deletar Produto
            </button>
          </article>
        )
      })}
    </section>
  );
}

export default ProductsList;
