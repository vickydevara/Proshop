import React, { useEffect } from "react"
import {
  Button,
  Card,
  Col,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"
import { createOrder, getOrderDetails } from "../actions/orderActions"
import { listProducts } from "../actions/productActions"
import CheckoutSteps from "../components/CheckoutSteps"
import Message from "../components/Message"
import Loader from "../components/Loader"
const OrderScreen = () => {
  const params = useParams()
  const user = useSelector((state) => state.userLogin)
  const { userInfo } = user

  useEffect(() => {
    dispatch(getOrderDetails(params.id))
  }, [])

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const orderDetails = useSelector((state) => state.order)

  const { orderData, error, loading } = orderDetails

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Row>
      <h1>Order Details</h1>
      <Col md={8}>
        <ListGroup variant='flush'>
          <ListGroupItem>
            <h2>Shipping</h2>
            <p>
              <strong>Name: </strong> {userInfo.name}
            </p>
            <p>
              <strong>Email: </strong>{" "}
              <a href={`mailto:${userInfo.email}`}>{userInfo.email}</a>
            </p>
            <p>
              <strong>Address:</strong>
              {orderData.shippingAddress.address},
              {orderData.shippingAddress.city},
              {orderData.shippingAddress.postalCode},
              {orderData.shippingAddress.country},
            </p>
            {orderData.isDelivered ? (
              <Message variant='success'>
                Delivered on {orderData.deliveredAt}
              </Message>
            ) : (
              <Message variant='danger'>Not Delivered</Message>
            )}
          </ListGroupItem>
          <ListGroupItem>
            <h2>Payment Method:</h2>
            <strong>Method:</strong>
            {orderData.paymentMethod}
            {orderData.isPaid ? (
              <Message variant='success'>Paid on {orderData.paidAt}</Message>
            ) : (
              <Message variant='danger'>Not Paid</Message>
            )}
          </ListGroupItem>
          <ListGroupItem>
            <h2>Order Items</h2>
            {orderData.orderItems.length === 0 ? (
              <Message>Your order is empty</Message>
            ) : (
              <ListGroup variant='flush'>
                {orderData.orderItems.map((item, index) => (
                  <ListGroupItem key={index}>
                    <Row>
                      <Col md={1}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col>
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </Col>
                      <Col md={4}>
                        {item.qty} x {item.price} = ${item.qty * item.price}
                      </Col>
                    </Row>
                  </ListGroupItem>
                ))}
              </ListGroup>
            )}
          </ListGroupItem>
        </ListGroup>
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroupItem>
              <h2>Order Summary</h2>
            </ListGroupItem>

            <ListGroupItem>
              <Row>
                <Col>Items Price</Col>
                <Col>
                  $
                  {orderData.totalPrice -
                    orderData.shippingPrice -
                    orderData.taxPrice}
                </Col>
              </Row>
            </ListGroupItem>

            <ListGroupItem>
              <Row>
                <Col>Shipping Price</Col>
                <Col>${orderData.shippingPrice}</Col>
              </Row>
            </ListGroupItem>

            <ListGroupItem>
              <Row>
                <Col>Tax Price</Col>
                <Col>${orderData.taxPrice}</Col>
              </Row>
            </ListGroupItem>

            <ListGroupItem>
              <Row>
                <Col>Total Price</Col>
                <Col>${orderData.totalPrice}</Col>
              </Row>
            </ListGroupItem>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default OrderScreen
