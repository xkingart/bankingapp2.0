import { useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Row, Col, Card, CardTitle, Button, Form, FormGroup, Label, Input, CardText } from 'reactstrap'
import { useSession } from '../utils/Session';

export default function SignupScreen() {

    const { signup } = useSession()
    const navigate = useNavigate()

    const submit = useCallback(async (e) => {
        e.preventDefault(); 
        const data = new FormData(e.target);
        const entries = [...data.entries()]
        const body = entries.reduce((prev, ele) => ({ ...prev, [ele[0]]: ele[1] }) , {})
        await signup(body)
        navigate('/dashboard', { replace: true })

    }, [signup, navigate])

    return (
        <Row>
            <Col className='pt-5' xs={12} sm={{ size:6, offset:3 }} md={{ size: 4, offset: 4 }}>
            <Card
                body
                className="text-center"
            >
                <CardTitle tag="h5">
                    Login to your Bank Account
                </CardTitle>
                <Form onSubmit={submit}>
                    <FormGroup>
                        <Label for="username">
                            Username
                        </Label>
                        <Input
                            id="username"
                            name="username"
                            placeholder="Choose a username"
                            type="text"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">
                            Password
                        </Label>
                        <Input
                            id="password"
                            name="password"
                            placeholder="Choose a password"
                            type="password"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="firstname">
                            Firstname
                        </Label>
                        <Input
                            id="firstname"
                            name="firstname"
                            placeholder="Your firstname"
                            type="text"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="lastname">
                            Lastname
                        </Label>
                        <Input
                            id="lastname"
                            name="lastname"
                            placeholder="Your lastname"
                            type="text"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">
                            Email
                        </Label>
                        <Input
                            id="email"
                            name="email"
                            placeholder="Your email"
                            type="email"
                        />
                    </FormGroup>
                    <Button block color="primary">
                        Signup
                    </Button>
                </Form>
                <CardText>
                    <Link to="/login">Login</Link>
                </CardText>
            </Card>
            </Col>
        </Row>
    )
}