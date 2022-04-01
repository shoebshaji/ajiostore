import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem } from 'react-bootstrap'
import Rating from '../components/Rating'
import axios from 'axios'

function ProductScreen({ match }) {
    const [product, setProduct] = useState({})

    useEffect(() => {
        const fetchProduct = async () => {
            const { data } = await axios.get(`/api/products/${match.params.id}`)

            setProduct(data)
        }
        fetchProduct()
    }, [match])


  return (
    <>
    <Link className='btn btn-light' to='/'>Go Back</Link>
    <Row>
        <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={3}>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Rating value={product.rating} text={`${product.numReviews}`} />
                </ListGroup.Item>
                <ListGroup.Item>
                    price:₹ {product.price}
                </ListGroup.Item>
                <ListGroup.Item>
                    Details: {product.description}
                </ListGroup.Item>
            </ListGroup>
        </Col>
        <Col md={3}>
            <Card>
                <ListGroup>
                    <ListGroupItem>
                        <Row>
                            <Col>Price</Col>
                            <Col>
                                <strong>₹ {product.price}</strong>
                            </Col>
                        </Row>
                    </ListGroupItem>
                    <ListGroupItem>
                        <Row>
                            <Col>Status</Col>
                            <Col>
                                <strong> {product.countInStock > 0 ? 'In Stock' : 'Out of stock'}</strong>
                            </Col>
                        </Row>
                    </ListGroupItem>
                    <ListGroupItem>
                       <Button className="btn-block" type='button' disabled={product.countInStock === 0}>Add To Cart</Button>
                    </ListGroupItem>
                </ListGroup>
            </Card>
        </Col>
    </Row>
        

    </>
  )
}

export default ProductScreen