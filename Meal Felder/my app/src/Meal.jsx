import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, Form, Alert } from "react-bootstrap";
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

const Meals = () => {
  const [query, setQuery] = useState("");
  const [meals, setMeals] = useState([]);  
  const [error, setError] = useState(""); 

  
  const handleInputChange = (data) => {
    setQuery(data.target.value);
  };

  
  const handleFormSubmit = (data) => {
    data.preventDefault(); 
    if (query.trim() === "") {
      setError("Enter a food name to search"); 
      setMeals([]);
    } else {
      setError(""); 
      fetchMeals(query); 
    }
  };

  const fetchMeals = async (food) => {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${food}`
      ); 
      const data = response.data; 
      if (data.meals) {  
        setMeals(data.meals); 
      } else {   
        setError("No food found"); 
        setMeals([]); 
      }
    } catch (error) {  
      console.error(error); 
      setError("Something went wrong"); 
      setMeals([]); 
    }
  };

  return (
    <div className="container">
      <Form onSubmit={handleFormSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Enter an ingredient</Form.Label>
          <Form.Control
            type="text"
            placeholder="e.g. chicken"
            value={query}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Search
        </Button>
      </Form>
      {error && <Alert variant="danger">{error}</Alert>}

      <div className="grid">
      <div className='row gx-4 gx-lg-4 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center'>

        {meals.map((meal) => (
            <Card style={{ width: '18rem' }} key={meal.idMeal}className='box'>
              <Card.Img variant="top" src={meal.strMealThumb} className="img" />
              <Card.Body>
                <Card.Title>{meal.strMeal}</Card.Title>
                <Button variant="success" href={meal.strYoutube}>
                  Watch Video
                </Button>
              </Card.Body>
            </Card>

        ))}
        </div>
      </div>
    </div>
  );
};

export default Meals;
