import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FormatQuote } from '@mui/icons-material';
import StateGallery from './StateGallery';
import SimpleAccordion from './SimpleAccordion';
import GotoTop from 'layout/GotoTop';
import Col2Grid from './components/Col2Grid';
import SimpleGallery from 'layout/Gallery';

const pccasArray = [
  [
    [
      'https://glcloud.in/images/static/events/goa/goa3.webp',
      'https://glcloud.in/images/static/events/goa/goa4.webp',
      'https://glcloud.in/images/static/events/goa/goa5.webp',
    ],
    [
      'https://glcloud.in/images/static/events/goa/gallery/gallery.webp',
      'https://glcloud.in/images/static/events/goa/gallery/gallery4.webp',
      'https://glcloud.in/images/static/events/goa/gallery/gallery5.webp',
    ],
    [
      'https://glcloud.in/images/static/events/goa/gallery/gallery2.webp',
      'https://glcloud.in/images/static/events/hansraj/img9.webp',
      'https://glcloud.in/images/static/events/goa/gallery/gallery3.webp',
    ],
  ],
];
const EventData = [
  {
    date: '17-19th',
    fullDate: 'April 2023',
    name: '2nd Health Working Group Meeting',
    organiser: 'Ministry of Health and Family Welfare',
  },
  {
    date: '12-14th',
    fullDate: 'June 2023',
    name: 'SAI 20 Summit',
    organiser: 'CAG',
  },
  {
    date: '5-7th',
    fullDate: 'June 2023',
    name: '3rd International Financial Architecture Working Group Meeting',
    organiser: 'Ministry of Finance',
  },
  {
    date: 'June',
    fullDate: '2023',
    name: '3rd Development Working Group Meeting',
    organiser: 'External affairs',
  },
  {
    date: '19-20th',
    fullDate: 'June 2023',
    name: '4th Tourism Working Group Meeting',
    organiser: 'Ministry of Tourism',
  },
  {
    date: '21-22th',
    fullDate: 'June 2023',
    name: 'Tourism Working Group Meeting',
    organiser: 'Ministry of Tourism',
  },
  {
    date: '19-20th',
    fullDate: 'July 2023',
    name: '4th Energy Working Group Meeting',
    organiser: 'Ministry of Energy',
  },
  {
    date: '22th',
    fullDate: 'July 2023',
    name: 'Energy Working Group Meeting',
    organiser: 'Ministry of Power',
  },
];
const EventCol = ({ data }) => {
  return (
    <div className="col">
      <div className="border shadow-sm rounded-4 h-100">
        <div className="p-2">
          <div className="text-center">
            <h3 className="fw-bold text-primary me-1 m-0">{data?.date}</h3>
            <span className="ms-1 fs-6 text-dark">( {data?.fullDate} )</span>
          </div>
          <div>
            <p className="fs-4 fw-semibold">{data?.name}</p>
          </div>
        </div>
        <div className="border-top p-2">
          <span className="text-dark fw-semibold"> Organised by</span>
          <br />
          {data?.organiser}
          <span></span>
        </div>
      </div>
    </div>
  );
};
const Goa = () => {
  const navigate = useNavigate();
  return (
    <div>
      <GotoTop />
      {/* Upper Section  */}
      <div className="row row-cols-1 row-cols-lg-2 g-0 bg-light">
        <div className="col">
          <img src="/images/events/goa/goabg.jpg" alt="" className="d-block w-100" style={{ height: 350, objectFit: 'cover' }} />
        </div>
        <div className="col">
          <div className="container h-100 py-5">
            <div className="d-flex align-items-center justify-content-center h-100">
              <div className="text-center">
                <h1 className="text-dark text-lg-start">
                  <span>About YMG20</span> <span className="text-primary"> Goa</span>
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
      {/* <div className="container-fluid p-0">
        <div className="row row-cols-1 row-cols-lg-2 g-0">
          <div className="col order-2 order-lg-1 bg-light">
            <div className="container p-3 p-lg-4 p-xl-5">
              <h2 className="text-start fs-1"><span className="text-primary">PM</span> Speaks on G20</h2>
              <div className="card p-3 p-lg-4 rounded-4 shadow bg-white border-light mt-3">
                <p className="fs-6">
                  <FormatQuote
                    sx={{
                      rotate: "180deg",
                      translate: "0px -10px",
                      color: "var(--main-color)",
                    }}
                  />{" "}
                  India has assumed the G20 presidency from December 2022. India’s
                  presidency would be a watershed moment in India’s history as it
                  seeks to play an essential role by arriving at pragmatic global
                  solutions for the wellbeing of all, manifesting the true spirit
                  of 'Vasudhaiva Kutumbakam' or G20’s theme “One Earth One Family-
                  One Future'. <br /><br />
                  Our G20 priorities will focus on healing our “One Earth”,
                  creating harmony within our “One Family” and giving hope for our
                  “One Future".
                  <FormatQuote
                    sx={{
                      fontSize: 18,
                      translate: "0px -10px",
                      color: "var(--main-color)",
                    }}
                  />
                </p>
                <span className="fs-6 text-dark d-block">
                  -Shri Narendra Modi
                </span>
                <span className="fs-6 text-secondary d-block">
                  ( Prime Minister, India ){" "}
                </span>
              </div>
            </div>
          </div>
          <div className="col order-1 order-lg-2">
            <iframe
              height={"100%"}
              className="d-block"
              style={{ width: "100%", height: "100% !important", minHeight: 400 }}
              src="https://www.youtube.com/embed/43GKcp900fY"
              title="PM Modi's remarks at closing ceremony of G20 Summit in Indonesia"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </div> */}
      <Col2Grid
        direction={'left'}
        highlight={'PM'}
        title={'Speaks on G20'}
        quote={`India has assumed the G20 presidency from December 2022. India’s presidency would be a watershed moment in India’s history as it seeks to play an essential role by arriving at pragmatic global solutions for the wellbeing of all, manifesting the true spirit of 'Vasudhaiva Kutumbakam' or G20’s theme “One Earth One Family- One Future'. <br /><br /> Our G20 priorities will focus on healing our “One Earth”, creating harmony within our “One Family” and giving hope for our “One Future".`}
        name={'Shri Narendra Modi'}
        position={'Prime Minister, India'}
        link={'https://www.youtube.com/embed/43GKcp900fY'}
      />
      <Col2Grid
        direction={'rihgh'}
        highlight={'Goa CM’s'}
        title={'Message'}
        quote={`Yuvamanthan Model G20 is a great opportunity for the youth to come forward and share their innovative ideas and opinions on global issues that shall bring a new perspective in the eyes of the decision-makers for a sustainable, smart and inclusive world. Participating in Model G20 will help the student to develop multiple soft skills like team building, international diplomacy, multilateral negotiation, strategic building, public speaking, and gain insights for the research purpose. <br /> <br /> The platform will engage with the youth on real-world matters and leverage their talent skills and encourage strategic thinking in order to shape the thoughts of our upcoming leaders in the future.`}
        name={'Shri Pramod Sawant'}
        position={'Chief Minister, Goa'}
        link={'https://www.youtube.com/embed/DIxr7CrdGxA'}
      />
      {/* Third Section  */}
      <div className="container py-5">
        <h3 className="text-center fs-2">Model G20 Summit in Goa</h3>
        <h4 className="fs-4 text-center">Parvatibai Bai Chowgule College of Arts and Science, Goa</h4>
        <p>
          The first inaugural YMG20 summit was hosted in Parvatibai Bai Chowgule College of Arts and Science, Goa in association with Yuvamanthan to
          initiate one of the many all-India model G20 summits. This model G20 summit was organised on the historic ‘republic day’ that is 26th
          January 2023 to unite the students in the themes of national brotherhood and inclusivity.
        </p>
        <div className="row row-cols-1 row-cols-lg-2 mb-2">
          <div className="col">
            <img
              src="https://yuvamanthan.s3.ap-south-1.amazonaws.com/static/events/goa1.jpeg"
              alt=""
              className="w-100"
              style={{ height: 450, objectFit: 'cover' }}
            />
          </div>
          <div className="col">
            <img
              src="https://yuvamanthan.s3.ap-south-1.amazonaws.com/static/events/goa/goa2.jpeg"
              alt=""
              className="w-100"
              style={{ height: 450, objectFit: 'cover' }}
            />
          </div>
        </div>
        <p className="mt-4">
          The one-day summit was a full activities-filled affair where the college undertook a series of meetups with experts for participants to make
          this a true success story. They also promoted the model G20 summit hype all across the campus through banners, posters and word of mouth
          through young volunteers. The young participants played the roles of Head of State and finance ministers from various G20 nations and
          debated on multiple global issues to build a common consensus. Overall, the event received grand praises from social personalities and
          honourable members of the Goa cabinet.
        </p>
      </div>
      <Col2Grid
        direction={'left'}
        highlight={"Shripad Naik Ji's"}
        title={'Message'}
        quote={`Yuvamanthan Model G20 is a great example of engaging the young generation in transforming global scenarios through deliberations on the different strategies that should be implemented to solve the problems faced by global citizens.`}
        name={'Sh. Shripad Yesso Naik'}
        position={'Minister of State for Tourism and Ports, Shipping and Waterways, Government of India'}
        link={'https://www.youtube.com/embed/Wl2tW2VYKqM'}
      />
      {/* 6th Section  */}
      <div className="container py-5">
        <h3 className="fs-2 text-center">YMG20 in Media</h3>
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          loop={false}
          modules={[Navigation]}
          navigation={true}
          breakpoints={{
            740: {
              slidesPerView: 2,
            },
            1240: {
              slidesPerView: 3,
            },
          }}>
          <SwiperSlide className="py-4">
            <article className="card p-2 p-lg-3 border rounded-3 position-relative shadow zindex-1 h-100">
              <img
                className="card-img-top rounded-0"
                src={'https://aniportalimages.s3.amazonaws.com/media/details/ANI-20230127082827.jpg'}
                // alt={data.imageAlt}
              />
              <div className="card-body px-0 pb-0">
                <div className="card-meta mb-2">
                  <strong className="text-dark">{'Aninews'}</strong>
                </div>
                <h5 className="card-title">
                  <a
                    href={'https://www.aninews.in/news/business/business/inaugural-yuvamanthan-model-g20-summit-held-in-goa20230127135850/'}
                    className="text-dark "
                    target={'_blank'}>
                    Inaugural Yuvamanthan Model G20 Summit held in Goa
                  </a>
                </h5>
                <p className="card-text fs-6">
                  Yuvamanthan Model G20, a unique initiative for youth who wish to ace the art of public speaking,diplomacy and strategy commenced
                  today with its first-ever summit on January 26, 2023, as India celebrated its 74th Republic Day...{' '}
                  <a
                    href={'https://www.aninews.in/news/business/business/inaugural-yuvamanthan-model-g20-summit-held-in-goa20230127135850/'}
                    target={'_blank'}>
                    Read More
                  </a>
                </p>
              </div>
            </article>
          </SwiperSlide>
          <SwiperSlide className="py-4">
            <article className="card p-2 p-lg-3 border rounded-3 position-relative shadow zindex-1 h-100">
              {' '}
              <img
                className="card-img-top rounded-0"
                src={'https://akm-img-a-in.tosshub.com/aajtak/images/story/202301/yuva-mantha-sixteen_nine.png?size=948:533'}
                // alt={data.imageAlt}
              />
              <div className="card-body px-0 pb-0">
                <div className="card-meta  mb-2">
                  <strong className="text-dark">Aajtak</strong>
                </div>
                <h5 className="card-title">
                  <a
                    href={'https://www.aajtak.in/india/story/inaugural-yuvamanthan-model-g20-summit-held-in-goa-lclv-1625001-2023-01-28'}
                    className="text-dark"
                    target={'_blank'}>
                    गोवा में 'युवा मंथन मॉडल जी-20' का आगाज, स्कूलों-कॉलेज में होगी वैश्विक मुद्दों पर चर्चा{' '}
                  </a>
                </h5>
                <p className="card-text fs-6">
                  गोवा में 'युवा मंथन जी-20' के लॉन्च इवेंट में 50 से अधिक छात्र मौजूद रहे, जिन्हें G20 देशों के वित्त मंत्री और शेरपा के रूप में
                  नामित किया गया था. शिख...{' '}
                  <a
                    href={'https://www.aajtak.in/india/story/inaugural-yuvamanthan-model-g20-summit-held-in-goa-lclv-1625001-2023-01-28'}
                    target={'_blank'}>
                    Read More
                  </a>
                </p>
              </div>
            </article>
          </SwiperSlide>
          <SwiperSlide className="py-4">
            <article className="card p-2 p-lg-3 border rounded-3 position-relative shadow zindex-1 h-100">
              <div className="card-type"></div>
              <img
                className="card-img-top rounded-0"
                src={'https://www.jagranimages.com/images/newimg/29012023/goa%20news(1).jpg'}
                // alt={data.imageAlt}
              />
              <div className="card-body px-0 pb-0">
                <div className="card-meta mb-2">
                  <strong className="text-dark">{'Jagran News'}</strong>
                </div>
                <h5 className="card-title">
                  <a
                    href={'https://www.jagran.com/news/national-yuva-manthan-model-g20-summit-held-in-goa-23312274.html'}
                    className="text-dark"
                    target={'_blank'}>
                    गोवा में 'युवा मंथन मॉडल G-20' का आगाज, युवाओं को मिलेगा वैश्विक मुद्दों पर अपने विचार रखने का अवसर
                  </a>
                </h5>
                <p className="card-text fs-6">
                  गणतंत्र दिवस के अवसर पर गोवा में 'युवा मंथन मॉडल जी-20' का आगाज किया गया। इसके जरिये युवाओं को वैश्विक मुद्दों को लेकर अपने व्यक्तिव
                  को निखारने और अपने अभिव्यक्ति कौशल को बेहतर करने का अवसर मिलेगा।...{' '}
                  <a href={'https://www.jagran.com/news/national-yuva-manthan-model-g20-summit-held-in-goa-23312274.html'} target={'_blank'}>
                    Read More
                  </a>
                </p>
              </div>
            </article>
          </SwiperSlide>
        </Swiper>
      </div>
      {/* Fifth Section  */}
      <div className="container py-4 text-center">
        <h3 className="fs-2 text-center">G20 events in Goa</h3>
        <p>
          As the excitement for G20 gains momentum, every state and union territory across India is leaving no stone unturned to set the stage for the
          biggest confluence of global leaders this year at the G20 summit. Having said that, the state of Goa has announced hosting eight G20 summits
          across the mainland. The themes for these summits will be ranging from global sustainability goals and zero carbon emissions, tourism,
          health, and education. Moreover, the main highlights will also include showcasing Goan culture and handicrafts to delegates while serving
          them delectable Goan cuisines.
        </p>
        <p>
          The Chief Minister of Goa asserted, “Because G20 countries contribute 80% of the world’s GDP, we will make efforts to get benefits of the
          summit to boost tourism in the state.”
        </p>
        <p>Take a look at the upcoming G20 events in the state of Goa as follows:</p>
        <div className="row row-cols-1 mt-4 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-2 g-md-3 g-lg-4">
          {EventData?.map((data, index) => {
            return <EventCol data={data} key={index} />;
          })}
        </div>
      </div>
      <SimpleGallery imgArray={pccasArray} heading={'Event Organised at Parvati Bai Chougule College'} className={'bg-warning text-white bg-event'} />
      {/* Second Section  */}
      <div className="container py-4">
        <h3>Goa: An Overview</h3>
        <p>
          Often termed the ‘island paradise’ of India, Goa is a state that enjoys natural panoramic views and sunlit beach shores. It is the smallest
          state situated on the southwestern coast of the country, bounded by states of Maharashtra on the northern end, Karnataka on the eastern side
          and the great Arabian sea on its west. Gorgeous sand beaches, estuaries, and a series of wild flora vividly describe the 65-mile (105 km)
          coastline of mainland Goa.
        </p>
        <div className="row row-cols-1 row-cols-lg-2">
          <div className="col">
            <img src="/images/events/goa/goaculture1.jpg" alt="" style={{ width: '100%', height: 450, objectFit: 'cover' }} />
          </div>
          <div className="col">
            <img src="/images/events/goa/goaculture2.jpg" alt="" style={{ width: '100%', height: 450, objectFit: 'cover' }} />
          </div>
        </div>
        <p className="mt-4">
          Apart from agriculture, mineral resources and manufacturing, the state has established is world-renowned reputation as the greatest tourism
          hotspot in the Indian subcontinent. Travellers of every age, race and ethnicity come to Goa to explore its rich diversity, ethereal beaches
          and glamorous evening recreations.
        </p>
        <br />
        <h3 className="fs-3">Things to Explore</h3>
        <p>
          {' '}
          The fact that Goa is the smallest state does not negate its relevance in being the most diversified mainland district in providing views of
          the wonderful architecture of various faiths, cuisines from multiple ethnicities and of course, more than fifty beaches to enamour any
          wonder-seeking individual. Some of the places to explore in the Goan territory are:
        </p>
        <h5> ● Panaji</h5>
        <p>
          {' '}
          The capital of Goa, Panaji is a land of amazing views and picturesque meadows. It harbours decent historical importance with a touch of
          serenity. Some of the best places to view in Panaji are the Panjim Heritage Walk, Goa State Museum, Reis Magos Fort, Fort Aguada, Dr Salim
          Ali Bird Sanctuary, The Church of Our Lady of the Immaculate Conception, etc.
        </p>
        <h5> ● Calangute</h5>
        <p>
          Located in the North of Goa, Calangute is a wonderful destination to be to refresh the spirits and weariness. Its beauty lies in the great
          Calangute beach and lush gardens that greets travellers with joy and cheer. Some of the exotic places to view here are Baga Beach, Se
          Cathedral, St. Alex Church, Medicinal Springs, etc.
        </p>
        <h5> ● Margao</h5>
        <p>
          {' '}
          The second largest city in Goa, Margao is a commercial centre. It was once known as Madgaon before the Portuguese colonisation. Today it
          operates as a significant centre of inter-religious diversity and ideal scenic destinations. Some places to explore in Margao are Jorge
          Barreto Park, Colonial Style Villas, Colva Beach, Town Hall, Caves of Aquem, etc.
        </p>
      </div>
      {/* 8th Section  */}
      <div className="container py-4">
        <h3 className="fs-4">About Yuvamanthan</h3>
        <p>
          Yuvamanthan is an initiative by Govardhan Learning Cloud to engage the youth in a global dialogue on international diplomacy, leadership,
          and collective duty. The vision of the company is to move the narratives on social impact agenda and issues of national importance focused
          on students & teachers. It is a partner organization of the National Commission for Women on Women Empowerment, National Commission for
          Protection of Child Rights on Child Safety, All India Council for Technical Education on Artificial Intelligence and Punjab National Bank
          issues on Financial Literacy.
        </p>
        <h3 className="fs-4">Yuvamanthan Model G20 (YMG20)</h3>
        <p>
          Yuvamanthan Model Youth G20 or YMG2 is a simulation programme initiative that provides a unique platform for a real learning experience for
          young citizens of tomorrow of how an actual G20 summit works. It intends to stimulate discussions on national issues on a larger level in a
          systematic forum and in front of professional and experienced moderators. As we enter the ‘Amrit Kaal’ which is futuristic and inclusive,
          initiatives like the YMG20 will build the skills of public speaking, opinion sharing, and diplomacy in the youth and position themselves for
          success.
        </p>
      </div>
      <div className="container py-5">
        <h3 className="fs-3 text-capitalize text-center">TENTATIVE CALENDER OF G20 MEETINGS</h3>
        <div className="container mt-3" style={{ maxWidth: '1000px' }}>
          <SimpleAccordion />
        </div>
      </div>
    </div>
  );
};

export default Goa;
