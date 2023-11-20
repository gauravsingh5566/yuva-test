import React, { useEffect, useState } from 'react';
import AlbumCard from './components/AlbumCard';
import BreadCrumb from 'layout/BreadCrumb';
import { Link } from 'react-router-dom';
import { Pagination, TextField } from '@mui/material';
import { apiAuth } from 'api';
import { toast } from 'react-toastify';
import { Input } from '@mui/joy';
import { SearchRounded } from '@mui/icons-material';
function Gallery() {
  const [totalCount, setTotalCount] = useState(0);
  const [count, setCount] = useState(1);
  const [offset, setoffset] = useState(0);
  const [limit, setlimit] = useState(25);
  const [eventDetails, setEventDetails] = useState([]);
  const [search, setSearch] = useState('');
  async function fetch() {
    try {
      const res = await apiAuth.get(`/admin/gallery_event?offset=${offset}&limit=${limit}&search=${search}`);
      setEventDetails(res?.data?.result);
      setTotalCount(res?.data?.count);
      // console.log(res?.data?.result);
    } catch (err) {
      toast.error('Something went wrong!');
    }
  }
  useEffect(() => {
    fetch();
  }, []);

  useEffect(() => {
    if (totalCount > limit) {
      setCount(Math.ceil(totalCount / limit));
    }
    return () => {
      setCount(1);
    };
  }, [totalCount]);
  useEffect(() => {
    fetch();
  }, [offset]);
  return (
    <>
      <BreadCrumb bread={false} heading={'Gallery'} />
      <div className="container py-4">
        <div className="search col-12 col-lg-8">
          <TextField
            type="text"
            placeholder="Search Institute Name"
            value={search}
            size="lg"
            className=" rounded-2 shadow-sm"
            onKeyDown={(e) => {
              if (e.code === 'Enter') fetch();
            }}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            InputProps={{
              endAdornment: <SearchRounded className="pointer-event" onClick={fetch} sx={{ cursor: 'pointer' }} />,
            }}
            fullWidth
            variant="outlined"
          />
        </div>
        <div className="mt-2">
          <p>Showing {eventDetails.length} Events </p>
        </div>
        <div className="row row-cols-1 row-cols-md-2 row-cols-sm-1 row-cols-lg-3 g-3">
          {eventDetails.length ? (
            eventDetails?.map((album) => {
              // console.log(album);
              return (
                <>
                  <div className="col " key={album?.id}>
                    <div className="w-100">
                      <Link to={`/gallery/${album?.id}`} state={album}>
                        <AlbumCard album={album} />
                      </Link>
                    </div>
                  </div>
                </>
              );
            })
          ) : (
            <div className="container position-relative d-flex justify-content-center">
              <h4 className=" font-monospace position-absolute top-0 mt-5 mx-auto">No Event Available!!</h4>
              <img className="mx-auto w-100" src="/images/gif/notfound1.gif" />
            </div>
          )}
        </div>
        <div className="container d-flex justify-content-center mt-3">
          <Pagination
            count={count}
            onChange={(e, page) => {
              setoffset(page * limit - limit);
            }}
            className="card bg-light p-2 shadow-sm"
            variant="outlined"
            color="secondary"
          />
        </div>
      </div>
    </>
  );
}

export default Gallery;
