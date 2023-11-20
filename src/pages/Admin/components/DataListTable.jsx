import React from 'react';
import { Table } from 'react-bootstrap';

const DataListTable = ({ data, dataType }) => {
  return (
    <div className="w-50">
      <Table striped bordered hover>
        <tbody>
          {dataType !== 'institutes'
            ? data.map((item, index) => (
                <tr key={item.id}>
                  <td>{item.first_name + ' ' + item.last_name}</td>
                  <td>{item.email}</td>
                  <td>{item.status}</td>
                </tr>
              ))
            : data.map((item, index) => (
                <tr key={item.id}>
                  <td>{item.institution_name}</td>
                  <td>{item.institution_address}</td>
                  <td>{item.email}</td>
                  <td>{item.status}</td>
                </tr>
              ))}
        </tbody>
      </Table>
    </div>
  );
};

export default DataListTable;
