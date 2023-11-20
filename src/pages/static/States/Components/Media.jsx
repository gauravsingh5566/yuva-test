import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper';

const Media = () => {
  return (
    <React.Fragment>
      <div className="container py-4">
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
            <article className="card border-0 rounded-0 position-relative box-shadow zindex-1 h-100">
              <img
                className="card-img-top rounded-0"
                src={'https://aniportalimages.s3.amazonaws.com/media/details/ANI-20230127082827.jpg'}
                // alt={data.imageAlt}
              />
              <div className="card-body">
                <div className="card-meta mb-2">
                  <strong className="text-dark">{'Aninews'}</strong>
                </div>
                <h4 className="card-title">
                  <a
                    href={'https://www.aninews.in/news/business/business/inaugural-yuvamanthan-model-g20-summit-held-in-goa20230127135850/'}
                    className="text-dark"
                    target={'_blank'}>
                    Inaugural Yuvamanthan Model G20 Summit held in Goa
                  </a>
                </h4>
                <span className="section-title-border"></span>
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
            <article className="card border-0 rounded-0 position-relative box-shadow zindex-1 h-100">
              <img
                className="card-img-top rounded-0"
                src={'https://akm-img-a-in.tosshub.com/aajtak/images/story/202301/yuva-mantha-sixteen_nine.png?size=948:533'}
                // alt={data.imageAlt}
              />
              <div className="card-body">
                <div className="card-meta  mb-2">
                  <strong className="text-dark">Aajtak</strong>
                </div>
                <h4 className="card-title">
                  <a
                    href={'https://www.aajtak.in/india/story/inaugural-yuvamanthan-model-g20-summit-held-in-goa-lclv-1625001-2023-01-28'}
                    className="text-dark"
                    target={'_blank'}>
                    गोवा में 'युवा मंथन मॉडल जी-20' का आगाज, स्कूलों-कॉलेज में होगी वैश्विक मुद्दों पर चर्चा{' '}
                  </a>
                </h4>
                <span className="section-title-border"></span>
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
            <article className="card border-0 rounded-0 position-relative box-shadow zindex-1 h-100">
              <div className="card-type"></div>
              <img
                className="card-img-top rounded-0"
                src={'https://www.jagranimages.com/images/newimg/29012023/goa%20news(1).jpg'}
                // alt={data.imageAlt}
              />
              <div className="card-body">
                <div className="card-meta mb-2">
                  <strong className="text-dark">{'Jagran News'}</strong>
                </div>
                <h4 className="card-title">
                  <a
                    href={'https://www.jagran.com/news/national-yuva-manthan-model-g20-summit-held-in-goa-23312274.html'}
                    className="text-dark"
                    target={'_blank'}>
                    गोवा में 'युवा मंथन मॉडल G-20' का आगाज, युवाओं को मिलेगा वैश्विक मुद्दों पर अपने विचार रखने का अवसर
                  </a>
                </h4>
                <span className="section-title-border"></span>
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
    </React.Fragment>
  );
};

export default Media;
