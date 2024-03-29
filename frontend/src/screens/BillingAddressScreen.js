import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async'
import  Form from 'react-bootstrap/Form'
import { useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import CheckoutSteps from '../components/CheckoutSteps';

export default function BillingAddressScreen() {
    const navigate = useNavigate();
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const {
        userInfo,
        cart: { billingAddress },
    } = state;

    const [fullName, setFullName] = useState(billingAddress.fullName || '');
    const [address, setAddress] = useState(billingAddress.address || '');
    const [city, setCity] = useState(billingAddress.city || '');
    const [postalCode, setPostalCode] = useState(billingAddress.postalCode || '');

    useEffect(() => {
        if (!userInfo) {
            navigate('/signin?redirect=/billing');
        }
    }, [userInfo, navigate])

    const [country, setCountry] = useState(billingAddress.country || '');

    const submitHandler = (e) => {
        e.preventDefault();
        ctxDispatch({
            type: 'SAVE_BILLING_ADDRESS',
            payload: {
                fullName,
                address,
                city,
                postalCode,
                country
            }
        });
        localStorage.setItem(
            'billingAddress',
            JSON.stringify({
                fullName,
                address,
                city,
                postalCode,
                country,
            })
        );
        navigate('/payment')
    };
  return (
    <div>
        <Helmet>
            <title>Billing Address</title>
        </Helmet>

        <CheckoutSteps step1 step2></CheckoutSteps>
        <div className="container small-container">
        <h1 className="my-3">Billing Address</h1>
        <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="fullName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            />
        </Form.Group>
        <Form.Group className="mb-3" controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            />
        </Form.Group>
        <Form.Group className="mb-3" controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            />
        </Form.Group>
        <Form.Group className="mb-3" controlId="postalCode">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
            />
        </Form.Group>
        <Form.Group className="mb-3" controlId="country">
            <Form.Label>Country</Form.Label>
            <Form.Control
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
            />
        </Form.Group>
        <div className="mb-3">
            <Button variant="primary" type="submit">
                Continue
            </Button>
        </div>
        </Form>
        </div>
    </div> 
  )
}
