// import { Table } from 'react-bootstrap/Table';
import Table from 'react-bootstrap/Table';
import { EyeFill, CheckCircleFill, XCircleFill } from 'react-bootstrap-icons';

const Trades = () => {
  console.warn('Trades Page');

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
        <tr>
          <td>Thomas Rice</td>
          <td>Urdnot Wrex</td>
          <td>Cloud Strife</td>
          <td><EyeFill type="button" /> <CheckCircleFill type="button" /> <XCircleFill type="button" /></td>
        </tr>
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
