import styles from "./Content.module.scss";
import TOP_CONTENT from "../assets/images/Top_Content_Img.png";
import Recipe from "./Recipe";

function Content() {
  return (
    <div className="flex-fill container p-20">
      <div className={`my-40 flex-fill ${styles.mainImageContainer}`}>
        <img
          className={`${styles.mainImage}`}
          src={TOP_CONTENT}
          alt="Top Content"
        />
        <span className={styles.imgTitle}>Chez vous, partout et ailleurs</span>
      </div>
      <div className={`card p-20 ${styles.contentCard}`}>
        <div className={styles.grid}>
          <Recipe />
          <Recipe />
          <Recipe />
          <Recipe />
          <Recipe />
          <Recipe />
          <Recipe />
          <Recipe />
          <Recipe />
        </div>
      </div>
    </div>
  );
}

export default Content;

// import styles from "./Content.module.scss";
// import React, { useState, useEffect } from "react";

// function Content() {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     async function fetchData() {
//       const response = await fetch("http://localhost:3000/api/products/");
//       const data = await response.json();
//       setProducts(data);
//     }
//     fetchData();
//   }, []);

//   return (
//     <div className="flex-fill container p-20">
//       {products.map((product) => (
//         <div key={product.id}>
//           <h2>{product.title}</h2>
//           <img src={product.cover} alt={product.title} />
//           <p>{product.description}</p>
//           <ul>
//             {product.equipments.map((equipment) => (
//               <li key={equipment}>{equipment}</li>
//             ))}
//           </ul>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Content;
