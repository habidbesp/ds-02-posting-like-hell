import React, { useState, useContext, useEffect } from 'react'
import { Form, Button, Container, Alert } from 'react-bootstrap'
import { UserContext } from '../context/UserContext';


export default function SignUp() {

    const { userStatus, setUserStatus } = useContext(UserContext)

    const [getData, setGetData] = useState({
        username: "",
        password: ""
    })

    const [alert, setAlert] = useState({})

    const handleChange = (e) => {
        setGetData({
            ...getData, [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const signup = async () => {
            const settings = {
              method: 'POST',
              body: JSON.stringify(getData),
              headers: {
                "Content-Type": "application/json",
              }
            }
            try{
                const response = await fetch("/signup", settings);
                const data = await response.json();
                // console.log(data);
                setUserStatus(data)
                if(data.error){
                    setAlert(data)
                    setGetData({
                        ...getData, password:""
                    })
                }
                else {
                    setGetData({
                        username: "",
                        password: ""
                    })   
                }
            }
            catch(err){
                console.log(err);
            }
        }
        signup()
    }

    useEffect(()=> {
        const abortControler = new AbortController()
        return function cleanup (){
            abortControler.abort()
        }
    })
   
    return (
        <>
        <Form className="mt-5" onSubmit={handleSubmit}>
            <Container>
                <Form.Group className="mb-3">
                    <Form.Label>Provide a Username</Form.Label>
                    <Form.Control
                        type="text" 
                        placeholder="Username" 
                        name="username"
                        onChange={handleChange}
                        value={getData.username}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Provide a Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Password" 
                        name="password"
                        onChange={handleChange}
                        value={getData.password}
                    />
                </Form.Group>
                <Button variant="dark" type="submit">
                    Sign Up
                </Button>
            </Container>
        </Form>
        <Container>
            {
                !alert.error ? 
                    "" 
                    :
                    <Alert variant="danger" className="mt-5">
                        { alert.error }
                    </Alert>
            }
        </Container>
        </>
    )
}
