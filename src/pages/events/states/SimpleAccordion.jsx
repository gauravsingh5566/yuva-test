import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionData from './AccordionData';
import { dates } from './dates';
import { goaContentt } from './goaContent';
import EventIcon from '@mui/icons-material/Event';

export default function SimpleAccordion() {
  return (
    <div>
      <div className="accordion" id="accordionExample">
        {dates.map((month, index) => {
          return (
            <div key={index} className="accordion-item">
              <h2 className="accordion-header" id={`heading${index}`}>
                <button
                  className={`accordion-button ${index == 0 ? '' : 'collapsed'}`}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={'#collapse' + index}
                  aria-expanded="false"
                  aria-controls="collapseTwo">
                  <span className="me-5 text-primary">
                    {' '}
                    <EventIcon />{' '}
                  </span>{' '}
                  {month.month}
                </button>
              </h2>
              <div
                id={`collapse${index}`}
                className={`accordion-collapse collapse ${index == 0 ? 'show' : ''}`}
                aria-labelledby="headingTwo"
                data-bs-parent="#accordionExample">
                <div className="accordion-body">
                  <AccordionData schedule={month.schedules} />
                  {/* {month.schedules}Not a object */}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
