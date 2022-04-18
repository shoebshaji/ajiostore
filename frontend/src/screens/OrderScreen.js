import React, { useState, useEffect } from 'react'
 import axios from 'axios'
 import { PayPalButton } from 'react-paypal-button-v2'
 import { Link } from 'react-router-dom'
 import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
 import { useDispatch, useSelector } from 'react-redux'
 import Message from '../components/Message'
 import Loader from '../components/Loader'
 import { getOrderDetails, payOrder, deliverOrder } from '../actions/orderActions'


 function OrderScreen({ match, history }) {
     const orderId = match.params.id

     const [sdkReady, setSdkReady] = useState(false)

     const dispatch = useDispatch()
     // getting order details
     const orderDetails = useSelector((state) => state.orderDetails)
     const {order, loading, error } = orderDetails

     // update order pay
     const orderPay = useSelector((state) => state.orderPay)
     const { loading: loadingPay, success: successPay, error: errorPay } = orderPay

     // order delivery updates



     // login status
     const userLogin = useSelector((state) => state.userLogin)
     const { userInfo } = userLogin

     if(!loading) {
         const addDecimals = (num) => {
             return (Math.round(num * 100) / 100).toFixed(2)
         }

         order.itemsPrice = addDecimals(
             order.itemsPrice.reduce((acc, item) => acc + item.price * item.qty, 0)
         )
     }

     useEffect(() => {
         if(!userInfo) {
             history.push('/login')
         }

         const addPayPalScript = async () => {
             const { data: clientId } = await axios.get('/api/config/paypal')
             const script = document.createElement('script')
             script.type = 'text/javascript'
             script.src=`https://www.paypal.com/sdk/js?client-id=${clientId}`
             script.async = true
             script.onload = () => {
                 setSdkReady(true)
             }
             document.body.appendChild(script)
         }

         if(!order || successPay || successDeliver || order._id !== orderId) {
             dispatch({ type: ORDER_PAY_RESET })
             // dispatch({ type: ORDER_DELIVER_RESET })
             dispatch(getOrderDetails(orderId))
         } else if (!order.isPaid) {
             if (!window.paypal) {
                 addPayPalScript()
             } else {
                 setSdkReady(true)
             }
         }

     }, [dispatch, orderId, successPay, successDeliver, order, history, userInfo])

     const successPaymentHandler = (paymentResult) => {
         console.log(paymentResult)
         dispatch(payOrder(orderId, paymentResult))
     }

     // const deliverHandler = () => {
     //     dispatch(deliverOrder(order))
     // }

   return loading ? (
     <Loader />
   ) : error ? (
     <Message variant='danger'>{error}</Message>
   ) : (
       <>
         <h1>Order {order._id}</h1>
         <Row>
             <Col md={8}>
                 <ListGroup variant='flush'>
                     <ListGroup.Item>
                         <h2>Shipping</h2>
                         <p>
                             <strong>Name: </strong> {order.user.name}
                         </p>
                         <p>
                             <strong>Email: </strong> {order.user.email}
                             <a href={`mailto:{order.user.email}`}>{order.user.email}</a>
                         </p>
                         <p>
                             <strong>Address: </strong>
                             {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                             {order.shippingAddress.postalCode}, {' '}
                             {order.shippingAddress.country}
                         </p>
                         {/* {order.isDelivered ? (
                             <Message variant='success'>Delivered on {order.deliveredAt}</Message>
                         ) : (
                             <Message variant='danger'>Not Delivered</Message>
                         )} */}
                     </ListGroup.Item>

                     {/* ---------- */}

                     <ListGroup.Item>
                         <h2>Payment Method</h2>
                         <p>
                             <strong>Method: </strong> {order.paymentMethod}
                         </p>

                         {order.isPaid ? (
                             <Message variant='success'>Paid on {order.paidAt}</Message>
                         ) : (
                             <Message variant='danger'>Not Paid</Message>
                         ) }
                     </ListGroup.Item>

                 </ListGroup>
             </Col>
             <Col md={4}></Col>
         </Row>

       </>
   )
 }

 export default OrderScreen 