import { useCallback, useState } from "react";
import { Button, Card, Col, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";
import { useData } from "../utils/Data";
import { moneyFormatter } from "../utils/utils";

export default function AccountCard(props) {
    const { account } = props
    const { patchAccount } = useData()
    const [deposit, setDeposit] = useState()
    const [open, setModalOpen] = useState()

    const toggle = useCallback(() => { setModalOpen(!open) }, [open])
    const changeDeposit = useCallback((e) => setDeposit(Number(e.target.value) || 0), [])
    const commitDeposit = useCallback(async() => {
        await patchAccount(account._id, { balance: (account.balance || 0) + deposit })
        toggle()
    }, [patchAccount, account, deposit, toggle])

    return (
        <Card
            body
        >
            <Row>
                <Col xs={12} md={6}>
                    <h4>{account.nickname}</h4>
                    <p>{account.type}</p>
                </Col> 
                <Col className="d-flex flex-column " xs={12} md={6}>
                    <h3>{moneyFormatter.format(account.balance)}</h3>
                    <Button onClick={toggle} color="success">Deposit</Button>
                </Col> 
            </Row>
            <Modal isOpen={open} toggle={toggle}>
                <ModalHeader toggle={toggle}>Deposit to {account.nickname}</ModalHeader>
                <ModalBody>
                    <p>Current Balance</p>
                    <h5>{moneyFormatter.format(account.balance)}</h5>
                    <FormGroup>
                        <Label for="deposit">
                            Amount to deposit
                        </Label>
                        <Input
                            id="deposit"
                            name="deposit"
                            placeholder="with a placeholder"
                            type="number"
                            onChange={changeDeposit}
                        />
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                <Button color="success" onClick={commitDeposit}>
                    Deposit
                </Button>{' '}
                <Button color="secondary" onClick={toggle}>
                    Cancel
                </Button>
                </ModalFooter>
            </Modal>
        </Card>
    )
}