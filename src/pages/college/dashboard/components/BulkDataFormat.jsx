/*
    ==== Student Bulk Register Data Editer ====
    - Edit and upload data. 
 */
import {
  Backspace,
  Check,
  CloseOutlined,
  Delete,
  DoneAll,
  Download,
  Edit,
  RefreshRounded,
  RemoveCircle,
  RemoveDone,
  RestartAlt,
  Upload,
} from '@mui/icons-material';
import { Button, TextField, Tooltip } from '@mui/material';
import { apiAuth, apiJsonAuth } from 'api';
import { Popup, pop2 } from 'layout/Popup';
import React, { Suspense, useEffect, useState } from 'react';
import * as xlsx from 'xlsx';
import { toast } from 'react-toastify';
import EditIcon from '@mui/icons-material/Edit';
import Swal from 'sweetalert2';
import moment from 'moment';
// !json[0]?.First_Name && !json[0]?.Last_Name && !json[0]?.Contact && !json[0]?.Email
function BulkDataFormat({ data, setFileData, setFile, upload }) {
  const [dataList, setDataList] = useState(data);
  const [update, setUpdate] = useState();
  const [checkEmails, setCheckEmails] = useState([]);
  const [edit, setEdit] = useState(false);
  const [isChecked, setChecked] = useState(true);
  const [editData, setEditData] = useState({ First_Name: '', Last_Name: '', Email: '', Contact: '', DOB: '' });

  /*
   return already exists Emails.
   */
  useEffect(() => {
    pop2.loading();
    const emails = [];
    dataList?.map(({ Email }) => {
      emails.push(Email);
    }); // List of uploaded Emails
    apiJsonAuth
      .post('institute/allEmails', emails)
      .then(({ data }) => {
        setCheckEmails(data?.emails); // use in (validateRow) for Emails Validation.
      })
      .catch((err) => {
        pop2.error('Something Went Wrong!!');
      });

    // Update File Object On Date Update
    generateAsExcel(dataList);
  }, [dataList, update]);

  /*
   ====checkDuplicateEmai====
   - count the each email count in the data.
   - return count of an email which is passed. 
   */
  function checkDuplicateEmai(email, data) {
    var count = -1;
    data?.map(({ Email }) => {
      if (email === Email) {
        count += 1;
      }
    });
    return count;
  }

  /*
 ====checkDuplicateContact====
 - count the each contact count in the data.
 - return count of an contact which is passed. 
 */
  function checkDuplicateContact(contact, data) {
    var count = -1;
    data?.map(({ Contact }) => {
      if (contact === Contact) {
        count += 1;
      }
    });
    return count;
  }

  /* 
  =========deleteData=====
  -- delete singe item (row) from the data
   */
  function deleteData(i) {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!',
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        let tempdata = dataList;
        delete tempdata[i];
        setDataList(tempdata);
        setUpdate(!update);
        toast.success('Deleted Successfully.');
      }
    });
  }

  /*
   ===generateAsExcel===
   - conver json date to file object. 
   */
  function generateAsExcel(data) {
    try {
      const worksheet = xlsx.utils.json_to_sheet(data);
      const workbook = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(workbook, worksheet, 'sheet1');
      var xlsblob = new Blob([new Uint8Array(xlsx.write(workbook, { bookType: 'xlsx', type: 'array' }))], { type: 'application/octet-stream' });
      const file = new File([xlsblob], 'demo.xlsx', { type: 'xlsx' });
      setFile(file); // update file
      // }
    } catch (err) {}
  }

  /* 
  =====validateRow====
  - validate fields for each row
   */
  function validateRow(item) {
    if (checkEmails?.includes(item?.Email)) {
      return { message: 'Emails Already Exists' };
    } else if (checkDuplicateEmai(item?.Email, dataList)) {
      return { message: 'Duplicate Emails' };
    } else if (checkDuplicateContact(item?.Contact, dataList)) {
      return { message: 'Duplicate Contact' };
    } else if (!item?.First_Name || !item?.Contact || !item?.Email) {
      return { message: 'Data Missing' };
    } else if (String(item?.Contact).length != 10 || !Number(item?.Contact)) {
      return { message: 'Incorrect Contact' };
    }
    return false;
  }

  /* 
  ====validateAndUpload====
  - upload data when add the is validated.
   */
  function validateAndUpload() {
    var check = true;
    if (dataList.length) {
      dataList?.map((item) => {
        if (validateRow(item)) {
          check = false;
        }
      }); /// validate each item before Upload.
      if (check) {
        upload();
      } else {
        toast.warning('Error In Data');
      }
    } else {
      toast.error('No Data Found!');
    }
  }

  return (
    <div>
      <div className="card px-2 m-2 shadow-lg overflow-auto" style={{ maxHeight: '85vh' }}>
        <table className="table position-relative" style={{ fontSize: '15px' }}>
          <thead className=" position-sticky top-0 bg-white">
            <tr>
              <th scope="col">#</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Email</th>
              <th scope="col">Contact</th>
              <th scope="col">DOB</th>
              <th scope="col">Error(If Any) </th>
              <th scope="col">Edit</th>
            </tr>
          </thead>
          <tbody>
            {dataList?.map((item, i) => {
              return (
                <tr
                  key={i + 1}
                  title={validateRow(item)?.message}
                  className={validateRow(item) ? 'table-danger' : ''}
                  onDoubleClick={() => {
                    setEdit(i);
                    setEditData(item);
                  }}>
                  <th scope="row">{i + 1}</th>
                  {edit === i ? (
                    <>
                      <td>
                        <TextField
                          defaultValue={editData.First_Name}
                          onChange={(e) => {
                            setEditData((prv) => ({ ...prv, First_Name: e.target.value }));
                          }}
                          size="small"
                        />
                      </td>
                      <td>
                        <TextField
                          defaultValue={item?.Last_Name}
                          onChange={(e) => {
                            setEditData((prv) => ({ ...prv, Last_Name: e.target.value }));
                          }}
                          size="small"
                        />
                      </td>
                      <td>
                        <TextField
                          type="email"
                          defaultValue={editData.Email}
                          onChange={(e) => {
                            setEditData((prv) => ({ ...prv, Email: e.target.value }));
                          }}
                          size="small"
                        />
                      </td>
                      <td>
                        <TextField
                          defaultValue={editData.Contact}
                          onChange={(e) => {
                            setEditData((prv) => ({ ...prv, Contact: e.target.value }));
                          }}
                          size="small"
                        />
                      </td>
                      <td>
                        <TextField
                          defaultValue={moment(editData?.DOB, 'DD-MM-YYYY').format('DD-MM-YYYY')}
                          onChange={(e) => {
                            setEditData((prv) => ({ ...prv, DOB: e.target.value }));
                          }}
                          size="small"
                        />
                      </td>
                      <td>
                        <small>
                          <Tooltip title="Update">
                            <DoneAll
                              sx={{ color: 'blue' }}
                              onClick={() => {
                                let tempdata = dataList;
                                tempdata[i] = editData;
                                setDataList(tempdata);
                                setEdit(false);
                                setEdit();
                                setUpdate(!update);
                              }}
                            />
                          </Tooltip>
                        </small>
                      </td>
                      <td>
                        <small>
                          <Tooltip title="Back">
                            <RestartAlt
                              sx={{ color: 'black' }}
                              onClick={() => {
                                setEdit(false);
                              }}
                            />
                          </Tooltip>
                        </small>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{item?.First_Name}</td>
                      <td>{item?.Last_Name}</td>
                      <td>{item?.Email}</td>
                      <td>{item?.Contact}</td>
                      <td>{moment(item?.DOB, 'DD-MM-YYYY').format('DD-MM-YYYY')}</td>
                      <td>{validateRow(item)?.message}</td>
                      <td>
                        <Tooltip title="Edit">
                          <small>
                            <EditIcon
                              onClick={() => {
                                setEdit(i);
                                setEditData(item);
                              }}
                            />
                          </small>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <small>
                            <CloseOutlined
                              onClick={() => {
                                deleteData(i);
                              }}
                            />
                          </small>
                        </Tooltip>
                      </td>
                    </>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <center>
        <div className="m-2 mt-3 w-50 text-center d-flex justify-content-center">
          <Button
            className="mx-2 p-2"
            variant="contained"
            size="large"
            onClick={() => {
              setFileData();
              setFile();
            }}>
            Cancel
          </Button>
          <Button
            className="mx-2 p-2"
            variant="contained"
            color="success"
            size="large"
            onClick={() => {
              validateAndUpload();
            }}>
            Upload
          </Button>
        </div>
      </center>
    </div>
  );
}

export default BulkDataFormat;
