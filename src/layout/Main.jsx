import React from 'react'
import Header from './Header'
import Container from 'react-bootstrap/Container';

const Main = (props) => {
    return (
        <>
            <Header />
            <Container style={{paddingTop: "75px"}}>
                {props.children}
            </Container>
        </>
    )
}

export default Main