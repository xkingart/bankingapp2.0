import { Link } from 'react-router-dom';
import { Row, Col, Card, CardTitle, Button, Form, FormGroup, Label, Input, CardText } from 'reactstrap'
import { useSession } from '../utils/Session';

export default function LoginScreen() {

    const { login } = useSession()

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
                <Form onSubmit={(e) => { 
                    e.preventDefault(); 
                    const data = new FormData(e.target);
                    const [username, password] = [...data.entries()]
                    login({ username: username[1], password: password[1] })

                }}>
                    <FormGroup>
                        <Label for="exampleEmail">
                        Username
                        </Label>
                        <Input
                        id="exampleEmail"
                        name="username"
                        placeholder="with a placeholder"
                        type="text"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePassword">
                        Password
                        </Label>
                        <Input
                        id="examplePassword"
                        name="password"
                        placeholder="password placeholder"
                        type="password"
                        />
                    </FormGroup>
                    <Button block color="primary">
                        Login
                    </Button>
                </Form>
                <CardText>
                    <Link to="/signup">Sign up</Link>
                </CardText>
            </Card>
            </Col>
        </Row>
    )
}