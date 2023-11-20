import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { emphasize, styled } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor = theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});

const SimpleBreadCrumb = ({ page, height }) => {
  const route = useLocation().pathname;
  const routeArr = route.split('/');
  const Navigate = useNavigate();
  let backroute = '/';
  return (
    <div className="bg-primary py-2 py-lg-4 ">
      <div className="container">
        {/* <nav aria-label="breadcrumb">
          <ol className="breadcrumb bg-transparent p-0 text-lowercase">
            {routeArr.map((rout, index) => {
              return index === 0 ? (
                <li key={index} className="breadcrumb-item">
                  <Link className="text-white" to="/">
                    <small className="text-capitalize">
                      Home
                    </small>
                  </Link>
                </li>
              ) : (
                <li key={index} className="breadcrumb-item">
                  <Link className="text-white" to={`/ ${rout}`}>
                    <small className="text-capitalize">
                      {rout}
                    </small>
                  </Link>
                </li>
              );
            })}
          </ol>
        </nav> */}
        <h4 className="text-white text-capitalize fs-3">{page}</h4>
      </div>
    </div>
  );
};

export default SimpleBreadCrumb;
