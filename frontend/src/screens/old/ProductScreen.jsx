// import React, { useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import {
//   Row,
//   Col,
//   Image,
//   ListGroup,
//   Container,
//   Card,
//   Button,
// } from "react-bootstrap";
// import { useGetProductDetailsQuery } from "../../slices/old/productsApiSlice";
// import Loader from "../../components/Loader";
// import Message from "../../components/Message";

// const ProductScreen = () => {
//   const [showModal, setShowModal] = useState(false);

//   const { id: productId } = useParams();
//   const {
//     data: product,
//     isLoading,
//     error,
//   } = useGetProductDetailsQuery(productId);
//   const [selectedPackage, setSelectedPackage] = useState(null);

//   return (
//     <>
//       <Container style={{ height: 100 }}></Container>
//       <Link className="btn btn-dark my-3" to="/">
//         Back
//       </Link>
//       {isLoading ? (
//         <Loader />
//       ) : error ? (
//         <Message variant="danger">
//           {error?.data?.message || error.error}
//         </Message>
//       ) : (
//         <>
//           <Row>
//             <Col md={5}>
//               <Image src={product.image} alt={product.name} fluid />
//             </Col>
//             <Col md={4}>
//               <ListGroup variant="flush">
//                 <ListGroup.Item>
//                   <h3>{product.name}</h3>
//                 </ListGroup.Item>
//                 <ListGroup.Item>
//                   Description: {product.description}
//                 </ListGroup.Item>
//                 <ListGroup.Item>
//                   Duration: {product.estimatedTime} min
//                 </ListGroup.Item>
//               </ListGroup>
//             </Col>
//             <Col md={3}>
//               <Card>
//                 <ListGroup variant="flush">
//                   <ListGroup.Item>
//                     <Row>
//                       <Col>Price:</Col>
//                       <Col>
//                         <strong>S${product.price}</strong>
//                       </Col>
//                     </Row>
//                   </ListGroup.Item>
//                   <ListGroup.Item>
//                     <Button
//                       className="btn-block"
//                       type="button"
//                       onClick={() => {
//                         setShowModal(true);
//                         setSelectedPackage(product);
//                       }}
//                     >
//                       Book now
//                     </Button>
//                   </ListGroup.Item>
//                 </ListGroup>
//               </Card>
//             </Col>
//           </Row>
//         </>
//       )}
//     </>
//   );
// };

// export default ProductScreen;
