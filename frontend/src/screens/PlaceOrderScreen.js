import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'

import { createOrder } from '../actions/orderActions'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'
import { ORDER_DETAILS_RESET } from '../constants/orderConstants'


function PlaceOrderScreen() {
  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  return (
    <>


    </>
  )
}

export default PlaceOrderScreen