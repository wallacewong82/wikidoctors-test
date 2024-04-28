// import React from 'react'
// import { Row, Col, Container } from "react-bootstrap";
// import {  Link } from "react-router-dom";
// import Loader from "../../components/Loader";
// import Message from "../../components/Message";
// import { useGetCoverageDetailsQuery } from "../../slices/old/coverageApiSlice";

// const CheckCoverageScreen = () => {

//     //const { data: coverageId, isLoading, error } = useGetCoverageDetailsQuery();
//     return (
//         <>
//           <Container style={{ height: 100 }}></Container>
//           <Link className="btn btn-dark my-3" to="/">
//             Back
//           </Link>
//           <h1>Check your health insurance coverage</h1>
//           {/* {isLoading ? (
//             <Loader />
//           ) : error ? (
//             <Message variant="danger">
//               {error?.data?.message || error.error}
//             </Message>
//           ) : (
//             <Row>
//               <Col>
//                 <h1>Find coverage</h1>
//               </Col>
//             </Row>
//           )} */}
//         </>
//       );
// }

// export default CheckCoverageScreen