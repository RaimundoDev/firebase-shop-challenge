import React, {useEffect, useState} from 'react';
import {apiURL} from '../apiUrl'

const EditPage = (props) => {

  const setMainContent = props.setContent;
  const productsInfo = props.productsInfo;

  const [product, setProduct] = useState(...productsInfo);
  const [name, setName] = useState(product.data.name);
  const [img, setImg] = useState(product.data.img);
  const [price, setPrice] = useState(product.data.price);
  const [platform, setPlatform] = useState('');
  const [genres, setGenres] = useState('');

  const [isSave, setIsSave] = useState(false);

  useEffect(() => {
    setPlatform((prevState) => {

      prevState = '';

      product.data.platform.forEach((p) => {
        prevState += p + ' ';
      });

      return prevState.trimEnd();
    });

    setGenres((prevState) => {

      prevState = '';

      product.data.genres.forEach((g) => {
        prevState += g + ' ';
      });

      return prevState.trimEnd();
    });
  }, []);
 
  const handleSubmit = (e) => {


    const productID = productsInfo[0].i;
    const URL = `${apiURL}${productID}`;

    e.preventDefault();

    const productData = {
      name: name, 
      img: img,
      price: price, 
      platform: platform.split(' '), 
      genres: genres.split(' ')
    };

    fetch(URL, {
      method: 'PUT',
      mode: 'cors',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(productData)
    })
      .then(res => {
        console.log(res.status);
          showSave();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleExit = () => {
    setMainContent(prevState => !prevState);
  };

  const showSave = () => {
    setIsSave(true);

    setTimeout(()=>{
      setIsSave(prevState=>!prevState);
    }, 2500);

  };

  return (
    <section className='editproductsection'>
      <form onSubmit={handleSubmit}>
        <article className='imgeditsection'>
          <img src={img} alt={name} width='300px' height='300px'/>
          <input 
            type='text' 
            placeholder='image url'
            onChange={(e) => setImg(e.target.value)}
            value={img || ""}/>
        </article>

        <article className='editinputs'>

          <label htmlFor='name'>Nome: </label>
          <input 
            id='name' 
            type='text' 
            onChange={(e) => setName(e.target.value)}
            value={name}/>
        
          <label htmlFor='price'>Preço: </label>
          <input 
            id='price' 
            type='number' 
            onChange={(e) => setPrice(e.target.value)}
            value={price}/>
        
          <label htmlFor='platform'>Plataformas: </label>
          <div>
            <p>
              (Separe as plataforma disponíveis por espaço!)
            </p>
            <input 
              id='platform' 
              type='text'
              onChange={(e) => setPlatform(e.target.value)}
              value={platform}/>
          </div> 
          <label htmlFor='genres'>Gêneros: </label>
          <div>
            <p>
              (Separe os gêneros usando espaço!)
            </p>
          <input 
            id='genres' 
            type='text'
            onChange={(e) => setGenres(e.target.value)}
            value={genres}/>
          </div>
          </article>
          {isSave && <article className='saveMessage'>Produto Salvo!</article>}
          <article className='editinteractionbtn'>
            <button type='button' onClick={handleExit}>Voltar</button>
            <button type='submit'>Salvar</button>
        </article>
      </form>
    </section>
  )
};

export default EditPage;
