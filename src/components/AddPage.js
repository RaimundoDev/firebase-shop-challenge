import React, {useState} from 'react';
import {apiURL} from '../apiUrl';

const AddPage = (props) => {

  const setMainContent = props.setContent;
  const [name, setName] = useState('');
  const [img, setImg] = useState('');
  const [price, setPrice] = useState(0);
  const [platform, setPlatform] = useState([]);
  const [genres, setGenres] = useState([]);
  
  const [isSave, setIsSave] = useState(false);
  
  const handleSubmit = (e) => {

    e.preventDefault();

    const productData = {
      name: name,
      img: img,
      price: price,
      platform: platform.split(' '),
      genres: genres.split(' ')
    };

    fetch(apiURL, {
      method: 'POST',
      mode: 'cors',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(productData)
    })
      .then(res => console.log(res.status))
      .catch((error) => console.log(error));
  
    setIsSave(true);
    setTimeout(()=>{
      setIsSave(false);
    }, 2000);
  };

  const handleExit = () => {
    setMainContent(prevState=>!prevState);
  };

  return (
    <section className='addproductsection'>
      <form onSubmit={(e) => handleSubmit(e)}>

        <article className='imgeditsection'>
          <img src={img} alt={name}/>
          <input
            type='text'
            placeholder='image url'
            onChange={(e) => setImg(e.target.value)}
            value={img || ""}/>
        </article>

        <article className='productinfo'>

          <label htmlFor='name'>Nome: </label>
          <input
            id='name'
            type='text'
            required
            onChange={(e) => setName(e.target.value)}
            value={name}/>

          <label htmlFor='price'>Preço: </label>
          <input
            id='price'
            type='number'
            required
            onChange={(e) => setPrice(e.target.value)}
            value={price}/>

          <label htmlFor='platform'>Plataformas: </label>
          <div>
            <p>
              (Separe as plataformas disponíveis por espaço!)
            </p>
           <input
             id='platform'
             type='text'
             required
             onChange={(e) => setPlatform(e.target.value)}
             value={platform}/>
          </div>

          <label htmlFor='genres'>Gêneros: </label>
          <div>
            <p>
              (Separe os gêneros por espaço!)
            </p>
            <input
              id='genres'
              type='text'
              required
              onChange={(e) => setGenres(e.target.value)}
              value={genres}/>
          </div>
        </article>
       {isSave && <span className='saveMessage'>Produto Adicionado!</span>}
        <article className='addproductbtn'>
          <button type='button' onClick={handleExit}>Voltar</button>
          <button type='submit'>Enviar</button>
        </article>
      </form>
    </section>
  );
};

export default AddPage;
