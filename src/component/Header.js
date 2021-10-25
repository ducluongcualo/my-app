import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav, NavItem, NavbarBrand, Container } from 'reactstrap'
import productApi from '../api/productApi';

export default function Header() {


    const [productList, setProductList] = useState([]);
    useEffect(() => {
        const fetchProductList = async () => {
            try {
                const response = await productApi.getAll();
                console.log('Fetch products successfully: ', response);
                // setProductList(response.data);
            } catch (error) {
                console.log('Failed to fetch product list: ', error);
            }
        }
        fetchProductList();
    }, [])
    return (
        <div>
            <Navbar color="dark">
                <Container>
                    <NavbarBrand>My team</NavbarBrand>
                    <Nav>
                        <NavItem>
                            <Link to='/add' className="btn btn-primary" >Add User</Link>
                        </NavItem>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    )
}
