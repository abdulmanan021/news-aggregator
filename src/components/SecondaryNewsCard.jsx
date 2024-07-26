import React from 'react'
import { Card, Nav, Badge } from 'react-bootstrap';
import { FaArrowCircleRight } from "react-icons/fa";

const SecondaryNewsCard = ({ headline, type, pubTime, detail }) => {

    const dateObj = new Date(pubTime);

    // Format the date to display only the date part (YYYY-MM-DD)
    const formattedDate = dateObj.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });

    return (
        <Card className='secondary_news_card mb-4'>
            <Badge bg="info" text="dark" className="news_type py-2 rounded-0">
                {type}
            </Badge>
            <Card.Body className='p-2 px-3 h-100'>
                <div className='d-flex flex-column justify-content-between h-100'>
                    <div>
                        <Nav.Link href={detail} target='_blank'>
                            <Card.Title className='text_limit_3 fs-6 mt-2'>{headline}</Card.Title>
                        </Nav.Link>
                    </div>
                    <div>
                        <hr className='my-1' />
                        <div className='d-flex justify-content-between'>
                            <div className='d-flex align-items-center'>
                                {formattedDate}
                            </div>
                            <Nav.Link href={detail} className='text-primary' target='_blank'>Read More <FaArrowCircleRight /></Nav.Link>
                        </div>
                    </div>
                </div>
            </Card.Body>
        </Card>
    )
}

export default SecondaryNewsCard