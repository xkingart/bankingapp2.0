import React from 'react';
import {
  Row,
  Col,
  Card,
  CardTitle,
} from 'reactstrap';
import { useData } from '../utils/Data';
import AccountCard from './AccountCard';

function AccountsContainer() {
  const { accounts } = useData()


  return (
    <div className='p-4'>
        {accounts && accounts.length ?
            <Row>
                {accounts.map((acc) => 
                    <Col key={acc._id} xs={12} sm={6} lg={4}>
                        <AccountCard account={acc} />
                    </Col>
                )}
            </Row>

            :

            <Row>
                <Col className='py-5' xs={12} sm={{ size:6, offset:3 }} md={{ size: 4, offset: 4 }}>
                    <Card
                        body
                        className="text-center"
                    >
                        <CardTitle tag="h5">
                            Seems like you don't have accounts yet. Try adding a new account
                        </CardTitle>
                    </Card>
                </Col>
            </Row>
        }
    </div>
  );
}

export default AccountsContainer;