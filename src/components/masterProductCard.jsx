// import React, { useState } from 'react';
// import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';

// const MasterProdukCard = ({ data }) => {
//  const [quantity, setQuantity] = useState(0);

//  const incrementQuantity = () => {
//     setQuantity(quantity + 1);
//  };

//  const decrementQuantity = () => {
//     if (quantity > 0) {
//       setQuantity(quantity - 1);
//     }
//  };

//  return (
//     <Card>
//       <CardImg top width="100%" src={data.gambar} alt={data.namaProduk} />
//       <CardBody>
//         <CardTitle tag="h5">{data.namaProduk}</CardTitle>
//         <CardSubtitle tag="h6" className="mb-2 text-muted">{data.kategoriProduk}</CardSubtitle>
//         <CardText>Harga: Rp {data.harga}</CardText>
//         <CardText>Lokasi: {data.lokasi}</CardText>
//         <CardText>Terjual: {data.terjual}</CardText>
//         <CardText>
//           <div className="input-group mb-3">
//             <Button color="secondary" onClick={decrementQuantity}>-</Button>
//             <input type="text" className="form-control" value={quantity} readOnly />
//             <Button color="secondary" onClick={incrementQuantity}>+</Button>
//           </div>
//         </CardText>
//         <Button color="primary">Beli</Button>
//       </CardBody>
//     </Card>
//  );
// };

// export default MasterProdukCard;