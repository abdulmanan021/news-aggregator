import React from 'react'
import { Card, Nav, Badge } from 'react-bootstrap';
import { FaArrowCircleRight } from "react-icons/fa";

const NewsCard = ({ headline, newsImage, desc, pubTime, source, detail }) => {

    const dateObj = new Date(pubTime);

    // Format the date to display only the date part (YYYY-MM-DD)
    const formattedDate = dateObj.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });

    return (
        <Card className='news_card'>
            <div className='news_img'>
                <Badge bg="warning" text="dark" className="news_source py-2 rounded-0">
                    {source}
                </Badge>
                <Card.Img src={newsImage ? newsImage : "assets/images/noimage.jpg"} className='rounded-0' />
            </div>
            <Card.Body className='p-2 px-3 h-100'  style={{backgroundColor:"rgb(13, 202, 240, 0.1)"}}>
                <div className='d-flex flex-column justify-content-between h-100'>
                    <div>
                        <Nav.Link href={detail} target='_blank'>
                            <Card.Title className='text_limit_2'>{headline}</Card.Title>
                        </Nav.Link>
                        <Card.Text className='text_limit_3 fw-light'>
                            {desc ? desc : "Please visit the detail page to explore more about this news as there is no description available to show here"}
                        </Card.Text>
                    </div>
                    <div>
                        <hr className='my-2' />
                        <div className='d-flex justify-content-between'>
                            <div className='d-flex align-items-center mb-2'>
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

export default NewsCard