import { useEffect, useState } from 'react';
import './View.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';


function View() {
  const { id } = useParams(); // Extract the 'id' from the URL

  useEffect(() => {
    const metaTag = document.querySelector('meta[name="theme-color"]');
    if (metaTag) {
      metaTag.setAttribute('content', '#005EB8');
    }
  });

  
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  
  const fetchCategories = async () => {
      const response = await axios.get(process.env.REACT_APP_URL+'api/categories');
      setCategories(response.data);
  };
  const fetchProductsById = async (id) => {
    const response = await axios.get(`${process.env.REACT_APP_URL}api/products/id/${id}`);
    setProducts(response.data);
};

useEffect(() => {
  fetchCategories();
  fetchProductsById(id);
}, [id]);


  return (
    <div className="View">
      <div
        className="Navbar2">
        <div className="navleft">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" onClick={() => window.history.back()} className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>



          <div className="logo">Zesto</div>
        </div>
        <div className="navright">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="size-6">
            <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
          </svg>

        </div>

      </div>

      {products.map((pro, index) => (
                        <div key={index} className="product-details">
        <div className="left">
          <img src="https://5.imimg.com/data5/SELLER/Default/2021/3/KM/HD/TW/41856382/tata-tmt-bars.jpg" alt="TMT Bars" />
        </div>
        <div className="right">
          <div className="product-info">
            <div className="productname">{pro.name}</div>
            {
              pro.types.length!==0?
              <>
               <div className="subtype">Choose type</div>
            <div className="size-selection">
            {pro.types.map((type, index) => (
              <button key={index} className="size-btn active" data-size={type.typeName}><div className='btntype'></div>{type.typeName}<div className='btnprice'>₹ {type.price.value} / {type.price.unit}</div></button>
           ))}
              </div>
              </>:  <div className="subtype">{categories.find((cat) => cat._id === pro.category)? categories.find((cat) => cat._id === pro.category).name: ''}</div>
            }
           
            <div className='pricebox'>
              <div className='priceleft'>
                <div className="price">₹ {pro.basePrice.value} / {pro.basePrice.unit}</div>
                <div className="taxsubtype">Excluding taxes</div>
              </div>
              <a href="tel:7410743968" className="buy-btn">Call</a>
            </div>
          </div>
        </div>
      </div>


                ))}

     

    </div>
  );
}

export default View;