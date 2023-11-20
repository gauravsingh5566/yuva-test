import React from 'react';
import Winners from './Winners';
//import BreadCrumb from "../../../layout/BreadCrumb";
import GotoTop from 'layout/GotoTop';
import StateGallery from './StateGallery';
import NewsSwiper from 'pages/static/Home/NewsSwiper';
import MediaGallery from './MediaGalley';
import Winner from './PCCASData';
import { Wifi } from '@mui/icons-material';

const PCCAS = () => {
  const Winner = [
    {
      id: 1,
      image: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLsyrIgNUcdE2_KbQSJIszrQaiga2exnfXYA&usqp=CAU`,
      Description:
        'Meetings like G20 are important not only for the leaders but also for the youth because fundamental qualities like freedom and equality are vital and they demand discussions and everyone must work collectively to uphold these qualities as a whole.',
      Author: '   - Sherpa Track delegate from India',
    },
    {
      id: 2,
      image: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpU2RXiXqUYmyM279tu4cuPmDqDcTxd6gwzA&usqp=CAU`,
      Description:
        'If I have to change one thing about this world, it would be people’s corruptive mindset towards the earth, This year’s G20 motto of ‘One Earth, One World, One Future’ should be upheld by the citizens more closely.',
      Author: '- Sherpa Track delegate from Turkey',
    },
    {
      id: 3,
      image: `https://indiafoundation.in/wp-content/uploads/2022/10/3.-Picture-for-article-3-1536x864.jpg`,
      Description:
        'I really like the theme of Global Financial Outlook Post-Covid as the pandemic has affected each country’s economy exponentially and i admire how they’re working tenaciously to overcome those post-pandemic recession effects.',
      Author: ' - Finance track Delegate from Japan',
    },
    {
      id: 4,
      image: `https://thediplomat.com/wp-content/uploads/2023/01/sizes/td-story-s-2/thediplomat_2023-01-30-144746.jpg`,
      Description:
        'It feels good to be a part of such a creative initiative of YMG20. The issue I would like my fellow delegates to take up is peace and diplomacy to tackle global issues.',
      Author: ' - Finance Track leader from Canada',
    },
    {
      id: 5,
      image: `https://indiafoundation.in/wp-content/uploads/2022/10/3.-Picture-for-article-3-1536x864.jpg`,
      Description:
        'In this fast-paced world, I feel people are losing their most basic value of humanity and I would link this with the threat of terrorism where human is against human today and hatred is becoming overpowering.',
      Author: ' - Sherpa Track Delegate from Germany',
    },
  ];
  return (
    <>
      <GotoTop />
      <div
        className="p-4 py-5 text-lexend"
        style={{
          background: `url(https://newsonair.com/wp-content/uploads/2023/02/WhatsApp-Image-2023-02-18-at-5.52.29-PM.jpeg) no-repeat center`,
          backgroundSize: 'cover',
          backgroundPosition: 'bottom',
          boxShadow: 'inset 0 0 0 2000px rgba(23,23,23,0.6)',
        }}>
        <div className="container">
          <div
            className="d-flex flex-column flex-lg-row align-items-center justify-content-center justify-content-lg-between h-100"
            style={{ minHeight: '160px' }}>
            <div>
              <h1 className="text-white text-center text-lg-start">
                <span style={{ textShadow: '2px 2px var(--main-color)' }}>Inaugural YMG20 in PCCAS</span>{' '}
                <p className="text-primary h3" style={{ textShadow: '1px 1px white' }}>
                  {' '}
                  Goa: An Eventful Wrap
                </p>
              </h1>{' '}
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <section className=" section">
          <div className="section-title mb-0">
            <span className="section-title-border"></span>
            <h3 className="fs-2">Brief Description</h3>
          </div>
          <div className="brief-description mb-4">
            <p className="text-dark mb-4 fs-5">
              <span className=" fw-bolder"> Parvatibai Chowgule College of Arts and Science </span>
              held the distinction of organizing the first-ever Yuvamanthan Model G20 Summit in India on the Republic Day, 2023. The action packed
              event saw participation by over 50 students. The summit which was divided into two tracks was a huge success with students discussing
              key issues ailing the world and eventually coming out with a Communique to deal with those issues.
            </p>
          </div>
          <hr />
          <div>
            <div className="section-title mt-4">
              <h3 className="fs-2">About the Institution</h3>
            </div>
            <div className="about-institution mb-4">
              <p className="text-dark mb-4 fs-5">
                Parvatibai Chowgule College of Arts and Science is a premier educational institution in the State of Goa, offering courses at the
                Graduate, Postgraduate and PhD levels
              </p>
              <p className="text-dark mb-4 fs-5">
                Accredited by NAAC with Grade 'A+' (CGPA of 3.27 on a 4-point scale on the 4th cycle), it was adjudged Best Affiliated College by Goa
                University at its Silver Jubilee celebrations in 2009 and was given the Best Educational Institute award by Business Goa in 2014.
                Having been conferred upon the autonomous status by University Grants Commission in June 2014, this is the first Autonomous College in
                the State of Goa.
              </p>
              <p className="text-dark mb-4 fs-5">
                In the National Institutional Ranking Framework conducted by the Ministry of Human Resource Development (MHRD), Govt. of India for
                colleges across the country, our college was ranked in the Rank Band of 101-150 in the year 2018, followed subsequently by being in
                the Rank Band of 151-200 in the years 2019 and 2021.
              </p>
            </div>
          </div>
          <hr />
          <div>
            <div className="section-title mt-4">
              <h3 className="fs-2">Date and Description of YMG20 Summit</h3>
            </div>
            <div className="date-time-description mb-4">
              <p className="text-dark mb-4 fs-5">
                <span className=" fw-bolder"> The inaugural YMG20 summit event took place on the historical date of 26th January 2023 </span>
                in our college because which date could suit better than our very own ‘republic moment,’ a day that celebrates India and its citizens
                in all glory and national morale.
              </p>

              <p className="text-dark mb-4 fs-5">
                <span className=" fw-bolder"> The summit was organised at our Parvatibai Bai Chowgule College of Arts and Science, Goa, </span>
                our institution is the first and only autonomous college with NAAC A+ Grade college based in the South Goa district Headquarters of
                Margao, on the west coast of India.
              </p>
            </div>

            {/* <StateGallery /> */}
          </div>
          <hr />
          <div className="mb-5">
            <div className="section-title mt-4">
              <h3 className="fs-2">Pre-event Description</h3>
            </div>
            <div className="pre-event-description mb-4">
              <p className="text-dark mb-4 fs-5">
                As part of the pre-event preparations, our college
                <span className=" fw-bolder">authorities anointed two faculty coordinators, </span>
                who were experts in international relations and <span className=" fw-bolder">one Campus Sherpa. </span>Over{' '}
                <span className=" fw-bolder">50 student participants registered </span>
                and prepared as an active interest in the summit.
              </p>
              <p className="text-dark mb-4 fs-5">
                There were a series of{' '}
                <span className=" fw-bolder">
                  meetups with experts via virtual conference and basic orientation sessions organised for participants{' '}
                </span>
                to make this a true success story.
              </p>

              <p className="text-dark mb-5 fs-5">
                Apart from this, the college helped in generating and broadcasting the model G20{' '}
                <span className=" fw-bolder">summit hype all across the campus through banners, posters and word of mouth </span>
                through young volunteers.
              </p>

              {/* <StateGallery /> */}
            </div>
            <blockquote className="blockquote">
              <i className="bx bxs-quote-left"></i> Yuvamanthan Model G20 is a great opportunity for the youth to come forward and share their
              innovative ideas and opinions on global issues that shall bring a new perspective in the eyes of the decision-makers for a sustainable,
              smart and inclusive world.
              <i className="bx bxs-quote-right"></i> <br />
              <div className="text-end">
                <span className="ms-auto">-Goa CM Promod Sawant</span>
              </div>
            </blockquote>

            <p className="text-dark mt-5 mb-4 fs-5">
              That’s not all! Before the actual summit day, our college conducted a fun Vox POP on campus to gauge G20 awareness amongst the young
              students.
            </p>

            <p className="text-dark mb-4 fs-5">Check out the video of the event!</p>

            {/* <h1>Add Video here</h1> */}

            {/* <StateGallery /> */}

            <p className="text-dark mt-5 mb-4 fs-5">
              After extensive deliberations, <span className=" fw-bolder">a declaration was drawn up on the basis of the ideas </span>
              that the delegates recommended and put forth and <span className=" fw-bolder">a communique document was drafted </span>
              in the end.
            </p>

            <blockquote className="blockquote">
              <i className="bx bxs-quote-left"></i> Yuvamanthan Model G20 is a great example of engaging the young generation in transforming global
              scenarios through deliberations on the different strategies that should be implemented to solve the problems faced by global citizens.
              <i className="bx bxs-quote-right"></i> <br />
              <div className="text-end">
                <span className="ms-auto fs-6">-Goa -Sh. Shripad Yesso Naik,</span> <br />
                <span className="ms-auto fs-6">-Goa Minister of State for Tourism and Ports, Shipping and Waterways,</span>
                <br />
                <span className="ms-auto fs-6">Government of India</span>
              </div>
            </blockquote>
          </div>
          <hr />
          <div>
            <div className="section-title mt-4">
              <h3 className="fs-2">Highlights of the YMG20 Summit</h3>
            </div>
            <div className="highlights-summit mb-4">
              <p className="text-dark mb-4 fs-5">Take a look at the following highlights of the YMG20 summit in Goa.</p>
            </div>
            <div className="section-title mt-5">
              <h3 className="fs-2">Track Meetings: Taking the centre stage</h3>
            </div>
            <div className="track-meetings mb-4">
              <p className="text-dark mb-4 fs-5">
                After pre-event decisions were made and everything was set in order, our college decided to have two track meetings for the YMG20
                summit. We chose to avoid the leader’s track meeting due to the lesser number of participants, but that did not minimise the
                excitement for the summit amongst the students.
              </p>
              <p className="text-dark mb-4 fs-5">
                The two tracks meetings that are, Sherpa and Finance tracks, had a significant role in the summit as the student delegates spoke on
                global issues like environment and technology, promotion of sustainable development in agriculture, investment sharing, energy sharing
                and digital platforms development, etc. that they feel require the most attention from the leaders.
              </p>
              <p className="text-dark mb-4 fs-5">
                After that, the track teams went their separate ways in different halls to discuss and share their thoughts on the topics allotted by
                their coordinator and spoke on their assigned countries’ voices of reason simultaneously. One by one each delegate went on the stage
                and addressed the other countries. The meeting took approximately 1.5 hours and after finishing their speeches, our delegates added
                two major takeaways in a separate document.
              </p>

              <p className="text-dark mb-4 fs-5">
                After a brief interval of luncheon and mingling with each other and sharing thoughts, the delegates were then asked to rejoin the
                summit proceedings for the second round of discussions.
              </p>

              <StateGallery />
            </div>

            <div className="section-title mt-5">
              <h3 className="fs-2">Declaration Meeting: Going deep into the debate</h3>
            </div>
            <div className="declaration-meeting mb-4">
              <p className="text-dark mb-4 fs-5">
                The declaration meeting was initiated by the host country, India’s opening words and other participating delegations were asked to
                join in and raise their concerns or counterarguments on any laid-out idea.
              </p>
              <p className="text-dark mb-4 fs-5">
                After an extensive session of face-to-face deliberations, idea presentation and argument rebuttals, each team ended the meeting with
                their closing arguments. By the end, a total of eighty ideas were read and debated upon.
              </p>
              <p className="text-dark mb-4 fs-5">
                Followed by this, a joint declaration was drawn up after a democratic method of voting and twenty ideas were jointly selected by the
                majority of teams.
              </p>

              <p className="text-dark mb-4 fs-5">
                These model sessions are instrumental as here the participants from all tracks come together to re-create an actual G20 Leaders Summit
                and form a consensus communique portfolio
              </p>
            </div>

            <div className="section-title mt-5">
              <h3 className="fs-2">Communique Drafting: building a consensus</h3>
            </div>
            <div className="communique-drafting mb-4">
              <p className="text-dark mb-4 fs-5">
                A communique document is a vital segment in the G20 summit wherein all the delegates take an active part by sharing their suggestions
                and policy recommendations.
              </p>
              <p className="text-dark mb-4 fs-5">
                After sharing at length their country’s stand on the most pressing issues and hearing others’ views during the track and declaration
                meetings, the best writers from the teams were huddled together to draft a detailed communique document. It was released at the end of
                the summit.
              </p>
              <p className="text-dark mb-4 fs-5">In the detailed thesis of the document, some major track-wise recommendations received are:</p>

              <h3 className="mb-4 fs-2">Sherpa Track</h3>

              <ul className="list-group border-none  mt-3">
                <li className="list-group-item border-0  ps-0">
                  <span className="p-2 bg-primary clip-cicle text-white mt-2">
                    <i className="bi bi-arrow-right"></i>
                  </span>{' '}
                  <span className="ps-2 fs-5">Technology sharing for pollution and management of sea level rise</span>
                </li>

                <li className="list-group-item border-0  ps-0">
                  <span className="p-2 bg-primary clip-cicle text-white mt-2">
                    <i className="bi bi-arrow-right"></i>
                  </span>{' '}
                  <span className="ps-2 fs-5">
                    As suggested by the Canadian delegation, sharing of technical expertise and platforms for managing forest growth and
                    sustainability
                  </span>
                </li>

                <li className="list-group-item border-0  ps-0">
                  <span className="p-2 bg-primary clip-cicle text-white mt-2">
                    <i className="bi bi-arrow-right"></i>
                  </span>{' '}
                  <span className="ps-2 fs-5">
                    Promoting a sustainable transport plan as a strategy to reduce the environmental impact of transportation while improving mobility
                    and accessibility
                  </span>
                </li>
              </ul>

              <h3 className="mt-5 mb-4 fs-2">Finance Track</h3>

              <ul className="list-group border-none mt-3">
                <li className="list-group-item border-0  ps-0">
                  <span className="p-2 bg-primary clip-cicle text-white mt-2">
                    <i className="bi bi-arrow-right"></i>
                  </span>{' '}
                  <span className="ps-2 fs-5">
                    Creating a free investment climate between the G20 nations that covers both developed as well as developing countries to boost
                    economic bounce from the current waves of recession
                  </span>
                </li>

                <li className="list-group-item border-0 ps-0">
                  <span className="p-2 bg-primary clip-cicle text-white mt-2">
                    <i className="bi bi-arrow-right"></i>
                  </span>{' '}
                  <span className="ps-2 fs-5">
                    Conjoining of existing fossil fuel resources with new technologies to support the development of a broad portfolio of clean energy
                    resources worldwide
                  </span>
                </li>

                <li className="list-group-item border-0 ps-0">
                  <span className="p-2 bg-primary clip-cicle text-white mt-2">
                    <i className="bi bi-arrow-right"></i>
                  </span>{' '}
                  <span className="ps-2 fs-5">
                    To resolve the issues of low investments and high cost of living, the g20 delegates have agreed to urge the governments to provide
                    grants to private sectors to encourage investment activities
                  </span>
                </li>
              </ul>
              <br />
              <h4>Download the complete communique document from here.</h4>

              <h1>Add document Here</h1>
            </div>
          </div>

          <div>
            <div className="section-title mt-4">
              <h3 className="fs-2">Media Coverage</h3>
            </div>
            <div className="media-coverage">
              {/* <StateGallery /> */}
              <MediaGallery />
            </div>
          </div>

          <div>
            <div className="section-title mt-4">
              <h3 className="fs-2">Winners of the Summit</h3>
            </div>
            <div className="winners-summit mb-4">
              <p className="text-dark mb-4 fs-5">
                All the delegates who actively took part in the YMG20 summit were proud recipients of participation certificates, awards and
                mementoes.
              </p>
              <p className="text-dark mb-4 fs-5">Take a look at the top achieving participants of the summit</p>
              <p className="text-dark mt-5 fs-5">Best Team:</p>
              <div className="row row-cols-1 mt-4 row-cols-md-2 row-cols-lg-3 g-2 g-md-3 g-lg-4">
                <Winners positionNo={1} positionType={'st'} winnerName={'Glen Noronha & Sylvia Lewis'} location={'South Africa'} />

                <Winners positionNo={2} positionType={'nd'} winnerName={"Alessia Fernandez & Meurisa Fernande's"} location={' Indonesia'} />

                <Winners positionNo={3} positionType={'rd'} winnerName={'Anush Moghe & Janhavi Dhulapkar'} location={' Saudi Arabia'} />
              </div>

              <br />
              <p className="text-dark mt-5 fs-5">Best Sherpa:</p>
              <div className="row row-cols-1 mt-4 row-cols-md-2 row-cols-lg-3 g-2 g-md-3 g-lg-4">
                <Winners positionNo={1} positionType={'st'} winnerName={"Alessia Fernande's"} />

                <Winners positionNo={2} positionType={'nd'} winnerName={'Sylvia Lewis'} />

                <Winners positionNo={3} positionType={'rd'} winnerName={'Janhavi Dhulapkar'} />
              </div>
              <br />
              <p className="text-dark mt-5 fs-5">Best Finance:</p>
              <div className="row row-cols-1 mt-4 row-cols-md-2 row-cols-lg-3 g-2 g-md-3 g-lg-4">
                <Winners positionNo={1} positionType={'st'} winnerName={'Safa Khan'} />
                <Winners positionNo={2} positionType={'nd'} winnerName={' Glen Noronha'} />
                <Winners positionNo={3} positionType={'rd'} winnerName={' Shrinidhi Karkal'} />
              </div>
            </div>
            {/* <StateGallery /> */}
          </div>
          <div>
            {/* <div className="section-title mt-5">
              <h3 className="fs-2">Winners of the Summit</h3>
            </div> */}
            <div className="winners-summit mb-4">
              {/* <p className="text-dark mb-4 fs-5">
                Many student participants and G20 practitioners have positively
                testified to the accuracy and organisation of model G20 which
                leaves a lasting impression on the youth.
              </p>

              <p className="text-dark mb-4 fs-5">
                Keeping that in mind, check out what our young G20 summit
                delegates have to say about their perceptions, views on G20 and
                its related context.
              </p> */}
            </div>
            <h2 className="mt-5 text-success">Testimonials</h2>
            <div className="py-5 mt-5 container-fluid bg-opacity-75 bg-secondary rounded-4 ">
              <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                  {Winner?.map((data, index) => {
                    return (
                      <>
                        <div className={index === 0 ? 'carousel-item active' : 'carousel-item'} style={{ minHeight: '52vh' }} data-bs-interval="3000">
                          <div className="d-sm-flex align-items-stretch justify-content-center mx-auto" style={{ minHeight: '300px' }}>
                            {/* <div  className="col-6" style={{ maxWidth: " 550px" }}>
                <img
                  src={data?.image}
                  alt="carousel"
                  width="100%"
                  className="rounded-start"
                  style={{ height: "100%", objectFit: "cover" }}
                />
              </div> */}
                            <div className="d-sm-flex justify-content-center align-items-center p-3 rounded-end">
                              <div className="px-3 py-1" style={{ maxWidth: ' 550px', textAlign: ' justify' }}>
                                <h5 className=" text-white fs-4" style={{ textTransform: 'unset' }}>
                                  <i className="bx bxs-quote-left text-white  me-4 fs-1" style={{ fontSize: '10rem !important' }}></i>
                                  {data?.Description}
                                  <i className="bx bxs-quote-right text-end text-white ms-4 fs-1" style={{ fontSize: '10rem !important' }}></i>
                                </h5>

                                {/* <h5 className="fw-bold lh-1 mt-4">Priyank Kanoongo</h5> */}
                                <p className="text-warning">{data?.Author}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
                <button className="carousel-control-prev p-2" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                  <span className="carousel-control-prev-icon bg-warning rounded-circle" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                  <span className="carousel-control-next-icon  bg-warning rounded-circle" aria-hidden="true"></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>

            {/* <div className="py-5 container-fluid">
              <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-inner">
                  {Winner?.map((data) => {
                    let count =0;
                    return (
                      <>
                        <div className={`carousel-item`} data-bs-interval="2000">
                          <div
                            className="d-sm-flex align-items-stretch justify-content-center mx-auto"
                            style={{ minHeight: "600px" }}
                          >
                            <div style={{ maxWidth: " 550px" }}>
                              <img
                                src={data.image}
                                alt="carousel"
                                width="100%"
                                className="rounded-start"
                                style={{ height: "100%", objectFit: "cover" }}
                              />
                            </div>
                            <div className="d-sm-flex justify-content-center align-items-center bg-light p-3 rounded-end">
                              <div
                                className="px-3 py-1"
                                style={{ maxWidth: " 550px", textAlign: " justify" }}
                              >
                                <h5 className="text-start  DMserif">
                                  <i className="bi bi-quote fs-1 text-secondary "></i> {data.Description}
                                </h5>
                                <h5 className="fw-bold lh-1 mt-4">Mr. K. Ravi</h5>
                                <p className="text-secondary">{data.Author}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )
                  })} 
                </div>
              </div>
            </div> */}

            {/* <blockquote className="blockquote mt-5 mb-5">
              <i className="bx bxs-quote-left"></i>Meetings like G20 are
              important not only for the leaders but also for the youth because
              fundamental qualities like freedom and equality are vital and they
              demand discussions and everyone must work collectively to uphold
              these qualities as a whole.<i className="bx bxs-quote-right"></i>{" "}
              <br />
              <div className="text-end">
                <span className="ms-auto">
                  - Sherpa Track delegate from India
                </span>
              </div>
            </blockquote>

            <blockquote className="blockquote mt-5 mb-5">
              <i className="bx bxs-quote-left"></i>If I have to change one thing
              about this world, it would be people’s corruptive mindset towards
              the earth, This year’s G20 motto of ‘One Earth, One World, One
              Future’ should be upheld by the citizens more closely.
              <i className="bx bxs-quote-right"></i> <br />
              <div className="text-end">
                <span className="ms-auto">
                  - Sherpa Track delegate from Turkey
                </span>
              </div>
            </blockquote>

            <blockquote className="blockquote mt-5 mb-5">
              <i className="bx bxs-quote-left"></i>I really like the theme of
              Global Financial Outlook Post-Covid as the pandemic has affected
              each country’s economy exponentially and i admire how they’re
              working tenaciously to overcome those post-pandemic recession
              effects.<i className="bx bxs-quote-right"></i> <br />
              <div className="text-end">
                <span className="ms-auto">
                  - Finance track Delegate from Japan
                </span>
              </div>
            </blockquote>

            <blockquote className="blockquote mt-5 mb-5">
              <i className="bx bxs-quote-left"></i>It feels good to be a part of
              such a creative initiative of YMG20. The issue I would like my
              fellow delegates to take up is peace and diplomacy to tackle
              global issues.<i className="bx bxs-quote-right"></i> <br />
              <div className="text-end">
                <span className="ms-auto">
                  - Finance Track leader from Canada
                </span>
              </div>
            </blockquote>

            <blockquote className="blockquote mt-5 mb-5">
              <i className="bx bxs-quote-left"></i>In this fast-paced world, I
              feel people are losing their most basic value of humanity and I
              would link this with the threat of terrorism where human is
              against human today and hatred is becoming overpowering.
              <i className="bx bxs-quote-right"></i> <br />
              <div className="text-end">
                <span className="ms-auto">
                  - Sherpa Track Delegate from Germany
                </span>
              </div>
            </blockquote> */}
          </div>
        </section>
      </div>
    </>
  );
};
export default PCCAS;
