import React from 'react';
import { useParams } from 'react-router-dom';
import { SHOES } from '../data/ShoesData'; // Importing SHOES data from Home.jsx
import Layout from "../components/Layout";


export default function ShoeDetails() {
  const { id } = useParams();
  const shoe = SHOES.find(shoe => shoe.id === Number(id));

  if (!shoe) {
    return <div>Shoe not found!</div>;
  }

  return (
    <Layout>
        <div>
            <img src={shoe.image} alt={shoe.title} />
            <h2>{shoe.title}</h2>
            <p>{shoe.price}</p>
            <p>{shoe.category}</p>
        </div>
    </Layout>
  );
}
