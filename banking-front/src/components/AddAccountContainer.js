import { useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Row, Col, Card, CardTitle, Button, Form, FormGroup, Label, Input, CardText } from 'reactstrap'
import { useData } from '../utils/Data';

export default function AddAccountContainer() {

    const { postAccount } = useData()
    const navigate = useNavigate()

    const submit = useCallback(async (e) => {
        e.preventDefault(); 
        const data = new FormData(e.target);
        const entries = [...data.entries()]
        const body = entries.reduce((prev, ele) => ({ ...prev, [ele[0]]: ele[1] }) , {})
        await postAccount(body)
        navigate('/dashboard', { replace: true })

    }, [navigate, postAccount])

    return (
        <Row>
            <Col className='pt-5' xs={12} sm={{ size:6, offset:3 }} md={{ size: 4, offset: 4 }}>
            <Card
                body
                className="text-center"
            >
                <CardTitle tag="h5">
                    Create a bank account
                </CardTitle>
                <Form onSubmit={submit}>
                    <FormGroup>
                        <Label for="nickname">
                            Nickname
                        </Label>
                        <Input
                            id="nickname"
                            name="nickname"
                            placeholder="Account nickname"
                            type="text"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="type">
                            Type
                        </Label>
                        <Input
                            id="type"
                            name="type"
                            type="select"
                        >
                            <option value="savings">Savings</option>
                            <option value="checkings">Checkings</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="balance">
                            Initial Balance
                        </Label>
                        <Input
                            id="balance"
                            name="balance"
                            placeholder="Account balance"
                            type="number"
                        />
                    </FormGroup>
                    <Button block color="primary">
                        Create account
                    </Button>
                </Form>
                <CardText>
                    <Link to="/dashboard">Cancel</Link>
                </CardText>
            </Card>
            </Col>
        </Row>
    )
}