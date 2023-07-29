// import { Table } from 'react-bootstrap/Table';
import Table from 'react-bootstrap/Table';
// import { EyeFill, CheckCircleFill, XCircleFill } from 'react-bootstrap-icons';
import { useEffect, useState } from 'react';
import { getOfferMembers } from '../../API/membersData';
import { useAuth } from '../../utils/context/authContext';
import TradeRow from '../../components/TradeRow';

const Trades = () => {
  console.warn('Trades Page');
  const [offers, setOffers] = useState([]);
  // const [reload, setReload] = useState(true);
  // const [allMembers, setAllMembers] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    getOfferMembers(user.uid).then(setOffers);
  }, [user]);
  console.warn(offers);

  return (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>Requestor</th>
          <th>Is Requesting</th>
          <th>Is Offering</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {offers.map((item) => (
          <TradeRow key={item.firebaseKey} offers={item} />
        ))}
      </tbody>
    </Table>
  );

  // return (
  //   <Table striped bordered hover>
  //     <thead>
  //       <tr>
  //         <th>#</th>
  //         <th>First Name</th>
  //         <th>Last Name</th>
  //         <th>Username</th>
  //       </tr>
  //     </thead>
  //     <tbody>
  //       <tr>
  //         <td>1</td>
  //         <td>Mark</td>
  //         <td>Otto</td>
  //         <td>@mdo</td>
  //       </tr>
  //       <tr>
  //         <td>2</td>
  //         <td>Jacob</td>
  //         <td>Thornton</td>
  //         <td>@fat</td>
  //       </tr>
  //       <tr>
  //         <td>3</td>
  //         <td colSpan={2}>Larry the Bird</td>
  //         <td>@twitter</td>
  //       </tr>
  //     </tbody>
  //   </Table>
  // );
};

export default Trades;
