import React, { useState, useEffect, useContext } from 'react';
import './SingleProductPage.css';
import QuantityInput from './QuantityInput';
import { useParams } from 'react-router-dom';
import useData from '../../hooks/useData';
import Loader from "../Common/Loader";
import CartContext from '../../contexts/CartContext';
const BASE_IMAGE_URL = 'http://localhost:5000/uploads';
 
const PLACEHOLDER_IMAGE = '/placeholder.png'; 

const SingleProductPage = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const {addToCart} = useContext(CartContext)
  const { id } = useParams();

  const { data: product, error, isLoading } = useData(`/products/${id}`);

  useEffect(() => {
    if (product) {
      console.log('Product images:', product.images);
    }
  }, [product]);

  
  const buildImageSrc = (img) => {
    if (!img) return PLACEHOLDER_IMAGE;

    if (typeof img === 'string') {
      
      if (img.startsWith('http://') || img.startsWith('https://')) {
        return img;
      }
      
      return `${BASE_IMAGE_URL}/${img}`;
    }

    if (typeof img === 'object' && img.url) {
      
      if (img.url.startsWith('http://') || img.url.startsWith('https://')) {
        return img.url;
      }
      
      return `${BASE_IMAGE_URL}/${img.url}`;
    }

    return PLACEHOLDER_IMAGE;
  };

  return (
    <section className="align_center single_product">
      {error && <em className="form_error">{error}</em>}
      {isLoading && <Loader />}
      {product && (
        <>
          <div className="align_center">
            <div className="single_product_thumbnails">
              {product.images?.map((img, index) => (
                <img
                  key={typeof img === 'string' ? img : img.id ?? index}
                  src={buildImageSrc(img)}
                  alt={`${product.title} thumbnail ${index + 1}`}
                  onClick={() => setSelectedImage(index)}
               className={index === selectedImage ? 'selected_image' : ''}
                  onError={(e) => (e.currentTarget.src = PLACEHOLDER_IMAGE)}
                />
              ))}
            </div>

            <img
              src={buildImageSrc(product.images?.[selectedImage])}
              alt={product.title}
              className="single_product_display"
              onError={(e) => (e.currentTarget.src = PLACEHOLDER_IMAGE)}
            />
          </div>

          <div className="single_product_details">
            <h1 className="singleProduct_tile">{product.title}</h1>
            <p className="single_product_description">{product.description}</p>
            <p className="single_product_price">
              ${product.price?.toFixed(2)}
            </p>

            <h2 className="quantity_title">Quantity:</h2>
            <div className="align_center quantity_input">
              <QuantityInput
                quantity={quantity}
                setQuantity={setQuantity}
                stock={product.stock}
              />
            </div>

            <button className="search_button add_cart" onClick={() => addToCart(product, quantity)
            }>Add to Cart</button>
          </div>
        </>
      )}
    </section>
  );
};

export default SingleProductPage;
