import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import RemoveModeratorIcon from '@mui/icons-material/RemoveModerator';
import { red } from '@mui/material/colors';
import {
  Add,
  AddTask,
  CalendarMonth,
  Call,
  Email,
  Expand,
  ExpandSharp,
  Explore,
  Facebook,
  Instagram,
  LinkedIn,
  LocationOn,
  More,
  Person,
  Twitter,
  PersonAddTwoTone,
  YouTube,
  Translate,
  RemoveCircleOutline,
  CardMembershipTwoTone,
  EmojiEventsTwoTone,
} from '@mui/icons-material';
import { Button, Tooltip } from '@mui/material';
import { useGlobalContext } from 'global/context';
import StudentProfileModal from './StudentProfileModal';
import moment from 'moment';

export default function StudentCoordinatorCard({ student, removeFromCoordeinator, position }) {
  const [expanded, setExpanded] = React.useState(false);
  const { userData } = useGlobalContext();
  //   Handle Delete
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // console.log();
  return (
    <div className="col">
      <Card className="rounded-4 h-100 certified-wrapper position-relative bg-white border position-relative text-dark">
        {position && (
          <div class="badge-promo  text-capitalize" style={{ zIndex: '500' }}>
            <span class="badge-promo-content fw-semibold ">
              <i className="bi bi-bookmark-star"></i> {position?.position}
            </span>
          </div>
        )}
        <span
          color="error"
          className="position-absolute top-0 end-0 m-2 zindex-1"
          style={{ zIndex: '599' }}
          onClick={() => removeFromCoordeinator(student?.id)}>
          <Tooltip title="Remove from Winners">
            <RemoveCircleOutline
              sx={{
                fontSize: 20,
                cursor: 'pointer',
                '&:hover': {
                  color: 'red',
                },
              }}
            />
          </Tooltip>
        </span>
        <CardHeader
          avatar={<Avatar alt={student?.first_name} src={student?.profile} sx={{ width: 46, height: 46, bgcolor: red[500] }} />}
          title={
            <>
              <h6 className="font-ubd fw-semibold m-0">
                {student?.first_name} {student?.last_name}
              </h6>{' '}
              {position ? (
                <small className="d-inline-block text-center text-dark border me-1 mt-1 p-1 px-2 rounded-2 ">
                  <EmojiEventsTwoTone sx={{ color: 'tomato', fontSize: 20 }} /> {position?.event}
                </small>
              ) : (
                <small className="d-inline-block text-center text-dark border me-1 mt-1 p-1 px-2 rounded-2 ">
                  <CardMembershipTwoTone sx={{ color: 'tomato', fontSize: 20 }} /> coordinator
                </small>
              )}
            </>
          }
        />
        <CardContent className="py-0">
          <div className="row">
            <div className="col-12">
              {student?.dob && (
                <>
                  <CalendarMonth
                    sx={{
                      fontSize: 16,
                      color: 'grey',
                      borderRadius: 1,
                      mr: 1,
                    }}
                  />
                  <small>DOB : {student?.dob && moment(student?.dob).format('DD-MM-YYYY')}</small>
                </>
              )}{' '}
            </div>
            <div className="col-12">
              {student?.father_name && (
                <>
                  <Person
                    sx={{
                      fontSize: 16,
                      color: 'grey',
                      mr: 1,
                    }}
                  />{' '}
                  <small>Guardian : {student?.father_name}</small>
                </>
              )}
            </div>
            <div className="col-12">
              <a href={`mailto:${student?.email}`} className="text-dark">
                <Email
                  sx={{
                    fontSize: 16,
                    color: 'grey',
                    mr: 1,
                  }}
                />{' '}
                <small>{student?.email}</small>
              </a>
            </div>
            <div className="col-12">
              <a href={`tel:${student?.contact}`} className="text-dark">
                <Call
                  sx={{
                    fontSize: 16,
                    color: 'grey',
                    mr: 1,
                  }}
                />{' '}
                <small>{student?.contact}</small>
              </a>
            </div>
          </div>
        </CardContent>
        <CardActions disableSpacing>
          <div className="w-100">
            <Button
              variant="outlined"
              color="primary"
              data-bs-toggle="modal"
              data-bs-target={'#ProfileModal' + student?.id}
              fullWidth
              className="text-capitalize rounded-3 mt-2"
              size="large">
              <i className="bi bi-arrows-angle-expand me-2"></i>
              View Details
            </Button>
            {/* <Button
              variant="outlined"
              color="error"
              fullWidth
              className="text-capitalize rounded-3 mt-2"
              size="large"
              onClick={() => removeFromCoordeinator(student?.id)}
            >
              <DeleteForever
                sx={{
                  fontSize: 16,
                }}
              />
              Remove Student
            </Button> */}
          </div>
        </CardActions>
      </Card>
      <StudentProfileModal student={student} />
    </div>
  );
}
