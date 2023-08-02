import React from 'react'
import './Cart.css'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import CartRow from './CartRow'

const Cart = () => {
  const { cartItems } = useSelector(state => state.cart)
  return (
    <>
        <Container className='cart-container'>
            <Row className='mx-4'>
              <Col className='my-4'>
                <h1><AiOutlineShoppingCart /> Cart</h1>
              </Col>
            </Row>
            <Row className='mx-4 ' style={{ marginBottom: "16rem"}}>
              {cartItems.length > 0 ? <>
                <table>
                  <thead>
                    <tr className='text-center'>
                      <th>Product</th>
                      <th>Name</th>
                      <th>Quantity</th>
                      <th>Subtotal</th>
                      <th>Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => {
                        return <CartRow item={item} key={item.product} />
                    })}
                  </tbody>
                </table>
                <Row>
                  <Col >
                    <div style={{ float: "right" }}>
                      <p >
                        {cartItems.length > 0 && <>
                          Total: {`₹${cartItems.reduce(
                          (acc, item) => acc + item.price * item.quantity, 0
                        )}`}
                        </>}
                      </p>
                      <Button>Check Out</Button>
                    </div>
                  </Col>
                </Row>

              </> : <>
                  <h2 className='text-center'><AiOutlineShoppingCart /> &nbsp;Cart is empty </h2>
              </>}                
            </Row>
        </Container>
    </>
  )
}

export default Cart