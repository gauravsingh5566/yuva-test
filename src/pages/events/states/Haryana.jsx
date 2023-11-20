import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FormatQuote } from '@mui/icons-material';
import GotoTop from 'layout/GotoTop';
const Haryana = () => {
  const navigate = useNavigate();
  return (
    <>
      <GotoTop />
      <div>
        {/* Upper Section  */}
        <div className="row row-cols-1 row-cols-lg-2 g-0 bg-light">
          <div className="col">
            <img src="/images/events/haryana/img3.jpg" alt="" className="d-block w-100" style={{ height: 350, objectFit: 'cover' }} />
          </div>
          <div className="col">
            <div className="container h-100 py-5">
              <div className="d-flex align-items-center justify-content-center h-100">
                <div className="text-center">
                  <h1 className="text-dark text-lg-start">
                    <span>About YMG20</span> <span className="text-primary"> Haryana</span>
                  </h1>{' '}
                  <Button
                    variant="outlined"
                    sx={{ p: 2 }}
                    color="warning"
                    className="text-initial fs-6 rounded-4"
                    onClick={() => navigate('/haryana/registration')}>
                    Register as an Institute
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Forth Section  */}
        <div className="py-0 bg-dark p-0">
          <div className="row row-cols-1 row-cols-lg-2 g-0">
            <div className="col">
              <div className="container h-100 py-5">
                <div className="d-flex h-100 align-items-center">
                  <div>
                    <span className="section-title-border "></span>
                    <h3 className="fs-1 text-white">
                      <span className="text-primary">Haryana</span> CM’s Message
                    </h3>
                    <p className="fs-5 text-white">
                      <FormatQuote
                        sx={{
                          rotate: '180deg',
                          translate: '0px -10px',
                          color: 'var(--main-color)',
                        }}
                      />{' '}
                      It is a matter of pride for Haryana as some meetings of the G20 are proposed to be held in Gurugram.
                      <FormatQuote
                        sx={{
                          fontSize: 18,
                          translate: '0px -10px',
                          color: 'var(--main-color)',
                        }}
                      />
                    </p>
                    <p className="fs-5 text-white">
                      <FormatQuote
                        sx={{
                          rotate: '180deg',
                          translate: '0px -10px',
                          color: 'var(--main-color)',
                        }}
                      />
                      Haryana has emerged as an economic and sporting powerhouse, a hub of manufacturing activity and a cynosure of all investing eyes
                      -- both domestic and foreign.'' The theme of India's G20 presidency -- ''Vasudhaiva Kutumbakam (One Earth, One Family, One
                      Future)'' -- outlined by Prime Minister Narendra Modi aims to induce inclusive collaboration among developed and emerging
                      nations and recognise the significance of collective and united action.
                      <FormatQuote
                        sx={{
                          fontSize: 18,
                          translate: '0px -10px',
                          color: 'var(--main-color)',
                        }}
                      />
                    </p>
                    <span className="fs-6 text-dark d-block text-white">-Shri Manohar Lal Khattar</span>
                    <span className="fs-6 text-secondary d-block  text-white">(Chief Minister, Haryana) </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <img src="/images/events/haryana/manohar_lal.jpg" alt="" className="d-block h-100 w-100" />
            </div>
          </div>
        </div>
        {/* Third Section  */}
        <div className="container py-4">
          <h3 className="text-center">
            <span className="text-primary">Haryana</span> An Overview
          </h3>

          <p>
            Between the 27°39' to 30°35' N latitude and between 74°28' and 77°36' E longitude lies the landlocked northern state of India, Haryana. It
            is situated over the fertile Punjab Plain, a subsection of the Indo-Gangetic Plain. The smart city of Chandigarh within the Chandigarh
            union territory serves as the capital of the states of Haryana and Punjab.
          </p>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
            <div className="col">
              <img src="/images/events/haryana/img1.jpg" alt="" className="w-100 h-100" style={{ objectFit: 'cover' }} />
            </div>
            <div className="col">
              <img src="/images/events/haryana/img2.jpg" alt="" className="w-100 h-100" style={{ objectFit: 'cover' }} />
            </div>
            <div className="col">
              <img src="/images/events/haryana/img3.jpg" alt="" className="w-100 h-100" style={{ objectFit: 'cover' }} />
            </div>
          </div>

          <p className="mt-4">
            Haryana is agriculturally prosperous as well as at par with the most developed IT hubs in the country. The state’s largest cities include
            Gurugram, Faridabad, Rohtak, Panipat, Hisar, Sonipat, and Karnal. Besides, Haryana’s cultural landscape resonates with its agricultural
            economy's seasonal touch and the traditional richness of ancient Indian folklore.
          </p>
        </div>
        <div className="container py-4">
          <h3 className="fs-2 text-center">Things to Explore</h3>
          <p>
            The state offers various outlets of culture, diversity, and tourist destinations as well. Take a look as follows to know what one can
            expect to find in the state of Haryana:
          </p>
          <h4 className="text-bolder mt-5 mb-3">Culture</h4>
          <p>
            Haryana encompasses various ethnic groups and castes in an all-inclusive society. People from Hindu, Muslim, Sikh communities live
            together and engage in communal festivities such as celebrating the colourful festival of Holi, and dancing on the Dhol beats of Bhangra
            dance form.
          </p>
          <p>
            Besides, the art forms of Phulkari and Shisha embroidery are popular among tourists. Then, there is Haryanvi folk music and dance that has
            three types: Rasalila, Ragini and Saang.
          </p>
          <h4 className="text-bolder mt-5 mb-3">History</h4>
          <p>
            Right from the Vedic period to medieval times, Haryana has experienced historic moments. The villages of
            <span className="fst-italic"> Rakhigarhi</span> and <span className="fst-italic"> Bhirrana</span> are home to ancient sites of the Indus
            Valley Civilization. The city of Kurukshetra is an ancient site of the greatest epic in India, Mahabharata. Some places to visit here are
            Sheikh Chili’s Tomb, Shri Krishna Museum, Farruk Nagar Fort, Panipat, Brahma Sarovar, Sultan Bird Sanctuary etc.
          </p>
          <h4 className="text-bolder mt-5 mb-3">History</h4>
          <p>
            Though Haryana comprises of 70% of agrarian society, over the years it has made significant strides in the manufacturing, research &
            technology, services and industrial sectors. Many big conglomerates have their HQs based in the state like DLF, Larson & Turbo, Ranbaxy,
            Microsoft, Lenskart, etc.
          </p>
          <p>
            As Haryana comes under National Capital Region (NCR), Delhi Metro connects to the cities of Gurugram, Faridabad, and Bahadurgarh. Tourists
            can easily board trains, buses, and metros to explore the growing technological sites across the state.
          </p>
        </div>
      </div>
    </>
  );
};

export default Haryana;
