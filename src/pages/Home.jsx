import React, { useEffect, useState } from 'react'
import Main from '../layout/Main'
import { Col, Row, Form, Button } from 'react-bootstrap'
import NewsCard from '../components/NewsCard'
import SecondaryNewsCard from '../components/SecondaryNewsCard'

const Home = () => {

    const [allNews, setAllNews] = useState([])
    const [secondaryNews, setSecondaryNews] = useState([])
    const [searchNews, setSearchNews] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedResource, setSelectedResource] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [selectedAuthor, setSelectedAuthor] = useState('');

    const fetchAllNews = async () => {
        try {
            let response = await fetch("https://newsapi.org/v2/top-headlines?country=us&apiKey=c0c486c2272242c388f5ca286a2dc15f");
            let data = await response.json();
            setAllNews(data.articles);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const fetchSecondaryNews = async () => {
        try {
            let response = await fetch("https://content.guardianapis.com/search?api-key=858d063a-9115-480a-8e26-084c4ee5cbcb");
            let data = await response.json();
            // Inspect the response structure
            console.log('Guardian API response:', data);

            // Adjust according to the actual structure
            if (data.response && data.response.results) {
                setSecondaryNews(data.response.results);
            } else {
                console.error('Unexpected response structure:', data);
            }
        } catch (error) {
            console.error('Error fetching data from Guardian API:', error);
        }
    }


    // console.log(allNews)
    console.log(secondaryNews)

    useEffect(() => {
        fetchAllNews()
    }, [])

    useEffect(() => {
        fetchSecondaryNews()
    }, [])

    const handleSearchChange = (event) => {
        setSearchNews(event.target.value);
    }

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    }

    const handleResourceChange = (event) => {
        setSelectedResource(event.target.value);
    }

    const handleTypeChange = (event) => {
        setSelectedType(event.target.value);
    }

    const handleAuthorChange = (event) => {
        setSelectedAuthor(event.target.value);
    }

    const filterNews = (newsArray, titleField, dateField, searchNews, selectedDate, selectedResource, selectedAuthor, selectedType) => {
        return newsArray.filter(news => {
            const title = news[titleField] ? news[titleField].toLowerCase() : '';
            const search = searchNews ? searchNews.toLowerCase() : '';

            const matchesSearch = title.includes(search);
            const matchesDate = selectedDate ? (news[dateField] || '').includes(selectedDate) : true;
            const matchesResource = selectedResource ? news.source?.name === selectedResource : true;
            const matchesAuthor = selectedAuthor ? news.author === selectedAuthor : true;
            const matchesType = selectedType ? news.type === selectedType : true; // Ensure 'type' is correct

            return matchesSearch && matchesDate && matchesResource && matchesAuthor && matchesType;
        });
    }



    const [filteredAllNews, setFilteredAllNews] = useState([]);
    const [filteredSecondaryNews, setFilteredSecondaryNews] = useState([]);

    useEffect(() => {
        // Fetch news data
        const fetchNewsData = async () => {
            await fetchAllNews();
            await fetchSecondaryNews();
        }

        fetchNewsData();
    }, []);

    useEffect(() => {
        // Apply filtering whenever the news data or filters change
        setFilteredAllNews(filterNews(allNews, 'title', 'publishedAt', searchNews, selectedDate, selectedResource, selectedAuthor, selectedType));
        setFilteredSecondaryNews(filterNews(secondaryNews, 'webTitle', 'webPublicationDate', searchNews, selectedDate, selectedResource, selectedAuthor, selectedType));
    }, [allNews, secondaryNews, searchNews, selectedDate, selectedResource, selectedAuthor, selectedType]);


    const handleResetFilters = () => {
        setSearchNews('');
        setSelectedDate('');
        setSelectedResource('');
        setSelectedAuthor('');
        setSelectedType('');
    }

    return (
        <Main>
            <Row className='align-items-end'>
                <Col sm={12} md={12} lg={12} className='mb-3'>
                    <Form.Control type="search" placeholder="Search" className="custom_input" value={searchNews} onChange={handleSearchChange} />
                </Col>
                <Col md={9} lg={10} xl={11}>
                    <Row>
                        <Col sm={12} md={4} lg={3} className='mb-3'>
                            <Form.Control type="date" placeholder="Search" className="custom_input" value={selectedDate} onChange={handleDateChange} />
                        </Col>
                        <Col sm={12} md={4} lg={3} className='mb-3'>
                            <Form.Select className="custom_input" onChange={handleResourceChange}>
                                <option hidden>Search by Resource</option>
                                {Array.from(new Set(allNews.map(news => news.source.name))).map((source, index) => (
                                    <option key={index} value={source}>{source}</option>
                                ))}
                            </Form.Select>
                        </Col>
                        <Col sm={12} md={6} lg={3} className='mb-3'>
                            <Form.Select className="custom_input" onChange={handleTypeChange} value={selectedType}>
                                <option hidden>Search Category</option>
                                {Array.from(new Set(secondaryNews.map(news => news.type))).map((type, index) => (
                                    <option key={index} value={type}>{type}</option>
                                ))}
                            </Form.Select>
                        </Col>
                        <Col sm={12} md={4} lg={3} className='mb-3'>
                            <Form.Select className="custom_input" onChange={handleAuthorChange}>
                                <option hidden>Search by Authors</option>
                                {Array.from(new Set(allNews.map(news => news.author))).map((author, index) => (
                                    <option key={index} value={author}>{author}</option>
                                ))}
                            </Form.Select>
                        </Col>
                    </Row>
                </Col>
                <Col md={3} lg={2} xl={1} className='mb-3'>
                    <Button variant="outline-success" onClick={handleResetFilters}>Reset&nbsp;All</Button>
                </Col>
            </Row>
            <Row>

                <Col sm={12} md={7} lg={8}>
                    <Row>
                        {filteredAllNews.map((news) => (
                            <Col sm={12} md={12} lg={6} xl={4} className='mb-3' key={news.id}>
                                <NewsCard
                                    headline={news.title}
                                    newsImage={news.urlToImage}
                                    desc={news.description}
                                    pubTime={news.publishedAt}
                                    source={news.source.name}
                                    detail={news.url}
                                />
                            </Col>
                        ))}
                    </Row>
                </Col>
                <Col sm={12} md={5} lg={4}>
                    {filteredSecondaryNews.map((news, index) => (
                        <SecondaryNewsCard
                            headline={news.webTitle}
                            type={news.type}
                            pubTime={news.webPublicationDate}
                            detail={news.webUrl}
                        />
                    ))}
                </Col>
            </Row>
        </Main>
    )
}

export default Home