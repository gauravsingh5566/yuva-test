import React from 'react';
import { Autoplay, Navigation } from 'swiper';
import { SwiperSlide, Swiper } from 'swiper/react';
import GotoTop from 'layout/GotoTop';

const IndiaAchivements = () => {
  return (
    <>
      <GotoTop />
      <div className="">
        <div className="container">
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            modules={[Autoplay, Navigation]}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            navigation={true}
            loop={true}>
            <SwiperSlide>
              <img src="./images/achivements/banner-1.png" alt="" className="w-100" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="./images/achivements/banner-2.png" alt="" className="w-100" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="./images/achivements/banner-3.png" alt="" className="w-100" />
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="container py-5">
          <div className="text-center container" style={{ maxWidth: '1150px' }}>
            <h3 className="bg-primary fs-2 text-white d-inline-block px-5 py-2 rounded-pill">Achievements of India</h3>
            <p>
              From being termed as the ‘IT Capital’ to launching ‘Mangalyaan’ into space. From having the busiest railway networks to the
              longest-written constitution, India surely has made a remarkable impact on the world.
            </p>
            <p>
              Now in its 76th year of independence, India has progressed exponentially in the fields of education, science and technology, human
              development, world trade and more. Not just this, the most impressive feat for India is becoming the G20 president to 20 global nations
              in 2022 and taking the theme of ‘Vasudhaiva Kutumbakam’ or the ‘World is One Family’ to glorious heights.
            </p>
            <p>Take a look at some of the fascinating facts and figures that reflect India’s pivotal achievements in various sectors and fields.</p>
          </div>
          <div className="text-center">
            <h4 className="fs-3 text-white bg-primary mx-auto d-inline-block px-5 py-2 rounded-pill">Sectors</h4>
          </div>
          <div className="row gy-4 py-5">
            {/* Education  */}
            <div className="col-12 col-lg-4">
              <div
                className="p-3 p-lg-4 py-5 rounded-4 text-center h-100  bg-covered bg-inset"
                style={{
                  backgroundImage: 'url(./images/achivements/education.jpg)',
                }}>
                <h4 className="fs-2 text-white">Education</h4>
                <Swiper
                  spaceBetween={0}
                  slidesPerView={1}
                  className="py-4"
                  modules={[Autoplay, Navigation]}
                  autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                  }}
                  navigation={false}
                  loop={true}>
                  <SwiperSlide>
                    <li className="list-group-item d-flex p-0 border-0">
                      <p className="text-white text-center fnt-small">
                        India has changed the shape of its modern educational infrastructure with{' '}
                        <b>23 All India Institute of Medical Sciences (AIIMS)</b> for the modern healthcare system and <b>596 medical colleges</b>
                        to make one college per district available.
                      </p>
                    </li>
                  </SwiperSlide>
                  <SwiperSlide>
                    <li className="list-group-item d-flex p-0 border-0">
                      <p className="text-white text-center fnt-small">
                        <b> 20 Indian Institute of Management (IIMs)</b> for making business leaders of tomorrow and{' '}
                        <b>23 Indian Institute of Technology (IITs)</b>
                        for leading advancements in science, innovation and engineering.
                      </p>
                    </li>
                  </SwiperSlide>
                  <SwiperSlide>
                    <li className="list-group-item d-flex p-0 border-0">
                      <p className="text-white text-center fnt-small">
                        India has <b>8902 AICTE-recognised institutions</b> that have over <b>3 million intake capacity</b> with{' '}
                        <b>1057 government-approved</b> and deemed universities.
                      </p>
                    </li>
                  </SwiperSlide>
                  <SwiperSlide>
                    <li className="list-group-item d-flex p-0 border-0">
                      <p className="text-white text-center fnt-small">
                        The New <b>National Education Policy NEP 2020</b> facilitates more inclusivity and diversity in the educational domain.
                      </p>
                    </li>
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
            {/* Agriculture  */}
            <div className="col-12 col-lg-8">
              <div
                className="p-3 p-lg-4 py-5 rounded-4 text-center h-100  bg-covered bg-inset"
                style={{
                  backgroundImage: 'url(./images/achivements/agri.png)',
                }}>
                <h4 className="fs-2 text-white">Agriculture</h4>
                <Swiper
                  spaceBetween={0}
                  slidesPerView={1}
                  className="py-4"
                  modules={[Autoplay, Navigation]}
                  autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                  }}
                  navigation={false}
                  loop={true}>
                  <SwiperSlide>
                    <li className="list-group-item text-center p-0 border-0">
                      <p className="text-white text-center">
                        India intends to focus on more sustainable methods of agriculture and with this it has <b>1 million farmers</b> adopt
                        zero-budget natural farming.
                      </p>
                    </li>
                  </SwiperSlide>
                  <SwiperSlide>
                    <li className="list-group-item text-center p-0 border-0">
                      <p className="text-white text-center">
                        Almost <b>230 million soil health cards</b> have been issued for soil integrity monitoring purposes.
                      </p>
                    </li>
                  </SwiperSlide>
                  <SwiperSlide>
                    <li className="list-group-item text-center p-0 border-0">
                      <p className="text-white text-center">
                        <b>5.9 million hectares of agricultural land</b> are under organic farming in India.
                      </p>
                    </li>
                  </SwiperSlide>
                  <SwiperSlide>
                    <li className="list-group-item text-center p-0 border-0">
                      <p className="text-white text-center">
                        Holistic development schemes: <b>Kisan Mandhaan Yojna</b> with social security benefits for 1.9 million farmers;{' '}
                        <b>PM Kisan</b> with 110 million farmers receiving government cash support; <b>Per Drop More Crop</b> with 6.1 million
                        hectares of land under micro-irrigation.
                      </p>
                    </li>
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
            {/* Health  */}
            <div className="col-12 col-lg-4">
              <div
                className="p-3 p-lg-4 py-5 rounded-4 text-center h-100  bg-covered bg-inset"
                style={{
                  backgroundImage: 'url(./images/achivements/health.webp)',
                }}>
                <h4 className="fs-2 text-white">Health</h4>
                <Swiper
                  spaceBetween={0}
                  slidesPerView={1}
                  className="py-4"
                  modules={[Autoplay, Navigation]}
                  autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                  }}
                  navigation={false}
                  loop={true}>
                  <SwiperSlide>
                    <li className="list-group-item d-flex p-0 border-0">
                      <p className="text-white text-center fnt-small">
                        India hopes to make the healthcare system more accessible and affordable for its citizens, for that it has{' '}
                        <b>established 6 AIIMS hospitals with 16 more in the making.</b>
                      </p>
                    </li>
                  </SwiperSlide>
                  <SwiperSlide>
                    <li className="list-group-item d-flex p-0 border-0">
                      <p className="text-white text-center fnt-small">
                        Schemes like <b>PM Jan Aushadi</b> provides quality and affordable medicines and <b> e-Sanjeevani</b> allows patients and
                        medical practitioners with remote consultations
                      </p>
                    </li>
                  </SwiperSlide>
                  <SwiperSlide>
                    <li className="list-group-item d-flex p-0 border-0">
                      <p className="text-white text-center fnt-small">
                        <b>International Yoga Day concept proposed by PM Narendra Modi</b> is celebrated annually on 21st June every year after the UN
                        declaration.
                      </p>
                    </li>
                  </SwiperSlide>
                  <SwiperSlide>
                    <li className="list-group-item d-flex p-0 border-0">
                      <p className="text-white text-center fnt-small">
                        <b>Ayushman Bharat: Pradhan Mantri Jan Aarogya Yojana (AB-PMJAY)</b>
                        offers one of the world’s largest healthcare schemes with health insurance covering upto 5 lakhs per family per year and 35.5
                        million people treated for free so far.
                      </p>
                    </li>
                  </SwiperSlide>
                  <SwiperSlide>
                    <li className="list-group-item d-flex p-0 border-0">
                      <p className="text-white text-center fnt-small">
                        Under <b>National Ayush Mission,</b> 300+ hospitals and 4900+ dispensaries have been upgraded.
                      </p>
                    </li>
                  </SwiperSlide>
                  <SwiperSlide>
                    <li className="list-group-item d-flex p-0 border-0">
                      <p className="text-white text-center fnt-small">
                        With the Covid-19 vaccination drive launched on January 2021, the
                        <b>world’s largest and fastest vaccination drive took place with 2.15 billion vaccine</b> doses administered.
                      </p>
                    </li>
                  </SwiperSlide>
                  <SwiperSlide>
                    <li className="list-group-item d-flex p-0 border-0">
                      <p className="text-white text-center fnt-small">
                        <b>Successful ‘Make-in-India’ vaccines-</b> Covishield, Covaxin, ZyCov-D and iNCOVACC rolled out and{' '}
                        <b>exported to 100 countries</b> around the globe.
                      </p>
                    </li>
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
            {/* Tourism */}
            <div className="col-12 col-lg-4">
              <div
                className="p-3 p-lg-4 py-5 rounded-4 text-center h-100  bg-covered bg-inset"
                style={{
                  backgroundImage: 'url(./images/achivements/tourism.jpg)',
                }}>
                <h4 className="fs-2 text-white">Tourism</h4>
                <Swiper
                  spaceBetween={0}
                  slidesPerView={1}
                  className="py-4"
                  modules={[Autoplay, Navigation]}
                  autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                  }}
                  navigation={false}
                  loop={true}>
                  <SwiperSlide>
                    <li className="list-group-item d-flex p-0 border-0">
                      <p className="text-white text-center fnt-small">
                        India has over <b>40 UNESCO world heritage sites</b> and countless unexplored architectural beauties around the nation.
                      </p>
                    </li>
                  </SwiperSlide>
                  <SwiperSlide>
                    <li className="list-group-item d-flex p-0 border-0">
                      <p className="text-white text-center fnt-small">
                        The <b>Statue of Unity is the world's tallest statue,</b> with a height of 182 metres (597 ft), that is located in Gujarat.
                      </p>
                    </li>
                  </SwiperSlide>
                  <SwiperSlide>
                    <li className="list-group-item d-flex p-0 border-0">
                      <p className="text-white text-center fnt-small">
                        India offers <b>500+ destinations, 31 states and 15 theme-based circuits</b> for travellers like wildlife, coastal, desert,
                        tribal, heritage, Himalayan, eco circuit and more.
                      </p>
                    </li>
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
            {/* Startups */}
            <div className="col-12 col-lg-4">
              <div
                className="p-3 p-lg-4 py-5 rounded-4 text-center h-100  bg-covered bg-inset"
                style={{
                  backgroundImage: 'url(./images/achivements/startup.jpg)',
                }}>
                <h4 className="fs-2 text-white">Startups</h4>
                <Swiper
                  spaceBetween={0}
                  slidesPerView={1}
                  className="py-4"
                  modules={[Autoplay, Navigation]}
                  autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                  }}
                  navigation={false}
                  loop={true}>
                  <SwiperSlide>
                    <li className="list-group-item d-flex p-0 border-0">
                      <p className="text-white text-center fnt-small">
                        As part of the world’s unicorn revolution, Indian startups have gained progressive momentum with 107 unicorns from the nation.
                      </p>
                    </li>
                  </SwiperSlide>
                  <SwiperSlide>
                    <li className="list-group-item d-flex p-0 border-0">
                      <p className="text-white text-center fnt-small">
                        The <b>Statue of Unity is the world's tallest statue,</b> with a height of 182 metres (597 ft), that is located in Gujarat.
                      </p>
                    </li>
                  </SwiperSlide>
                  <SwiperSlide>
                    <li className="list-group-item d-flex p-0 border-0">
                      <p className="text-white text-center fnt-small">
                        India offers <b>500+ destinations, 31 states and 15 theme-based circuits</b> for travellers like wildlife, coastal, desert,
                        tribal, heritage, Himalayan, eco circuit and more.
                      </p>
                    </li>
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
            {/* Digital Transformation */}
            <div className="col-12 col-lg-4">
              <div
                className="p-3 p-lg-4 py-5 rounded-4 text-center h-100  bg-covered bg-inset"
                style={{
                  backgroundImage: 'url(./images/achivements/digtrans.webp)',
                }}>
                <h4 className="fs-2 text-white">Digital Transformation</h4>
                <Swiper
                  spaceBetween={0}
                  slidesPerView={1}
                  className="py-4"
                  modules={[Autoplay, Navigation]}
                  autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                  }}
                  navigation={false}
                  loop={true}>
                  <SwiperSlide>
                    <li className="list-group-item d-flex p-0 border-0">
                      <p className="text-white text-center fnt-small">
                        <b>BharatNet,</b> India’s largest rural broadband connectivity scheme launched by the government as a result,
                        <b>584,700 km of optical fibre cable lines are laid</b> and more than <b>100,000 gram panchayats are connected with WiFi</b>{' '}
                        facilities.
                      </p>
                    </li>
                  </SwiperSlide>
                  <SwiperSlide>
                    <li className="list-group-item d-flex p-0 border-0">
                      <p className="text-white text-center fnt-small">
                        As India leads the world in digital transformation,
                        <b>UPI transactions in the country have crossed $1 trillion</b> mark in 2022 and{' '}
                        <b>India ranks number one in digital payment transactions</b>
                        globally.
                      </p>
                    </li>
                  </SwiperSlide>
                  <SwiperSlide>
                    <li className="list-group-item d-flex p-0 border-0">
                      <p className="text-white text-center fnt-small">
                        India’s created UPI,
                        <b>BHIM-UPI is now operational in Singapore, UAE, Bhutan, France, Nepal and the UK</b>. Almost{' '}
                        <b>40% of global digital payments are made</b> from the Indian subcontinent in 2021.
                      </p>
                    </li>
                  </SwiperSlide>
                  <SwiperSlide>
                    <li className="list-group-item d-flex p-0 border-0">
                      <p className="text-white text-center fnt-small">
                        In the financial year 2021-22,
                        <b>88.4 billion digital transactions</b>
                        were made in India with <b>280 million transactions</b> and <b>9 million direct benefit transfer (DFT) payments</b> per day.
                      </p>
                    </li>
                  </SwiperSlide>
                  <SwiperSlide>
                    <li className="list-group-item d-flex p-0 border-0">
                      <p className="text-white text-center fnt-small">
                        In the <b>Direct Benefit Transfer scheme, almost 2480 billion USD was transferred</b> directly into beneficiaries’ bank
                        accounts and it
                        <b>covers 300+ schemes across 52 ministries.</b>
                      </p>
                    </li>
                  </SwiperSlide>
                  <SwiperSlide>
                    <li className="list-group-item d-flex p-0 border-0">
                      <p className="text-white text-center fnt-small">
                        Leveraging technology into governance,
                        <b>63 million candidates registered under PMGDISHA,</b> the world’s largest digital literacy programme,
                        <b>1.35 billion residents issues AADHAR</b> digital identity.
                      </p>
                    </li>
                  </SwiperSlide>
                  <SwiperSlide>
                    <li className="list-group-item d-flex p-0 border-0">
                      <p className="text-white text-center fnt-small">
                        During Covid-19, India used tech-powered solutions like the <b>Aarogya Setu</b>, a Covid contact tracing app{' '}
                        <b> with 218 million users. Initiated CoWin, the world’s largest digital vaccination drive.</b>
                      </p>
                    </li>
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
            {/* Financial Inclusion */}
            <div className="col-12 col-lg-4">
              <div
                className="p-3 p-lg-4 py-5 rounded-4 text-center h-100  bg-covered bg-inset"
                style={{
                  backgroundImage: 'url(./images/achivements/fininflu.webp)',
                }}>
                <h4 className="fs-2 text-white">Financial Inclusion</h4>
                <Swiper
                  spaceBetween={0}
                  slidesPerView={1}
                  className="py-4"
                  modules={[Autoplay, Navigation]}
                  autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                  }}
                  navigation={false}
                  loop={true}>
                  <SwiperSlide>
                    <li className="list-group-item d-flex p-0 border-0">
                      <p className="text-white text-center fnt-small">
                        Under <b> PM Jan Dhan Yojana,</b> banking is becoming easier and more accessible for citizens. Opening bank accounts with zero
                        balance and zero charges along with debit cards with free accident insurance coverage is up to 2 lakh.
                      </p>
                    </li>
                  </SwiperSlide>
                  <SwiperSlide>
                    <li className="list-group-item d-flex p-0 border-0">
                      <p className="text-white text-center fnt-small">
                        Almost <b>466+ million unbanked citizens are now banking</b> and have a<b>net deposit of 1732 INR billion.</b>
                      </p>
                    </li>
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
            {/* Energy */}
            <div className="col-12 col-lg-4">
              <div
                className="p-3 p-lg-4 py-5 rounded-4 text-center h-100  bg-covered bg-inset"
                style={{
                  backgroundImage: 'url(./images/achivements/energy.jpg)',
                }}>
                <h4 className="fs-2 text-white">Energy</h4>
                <Swiper
                  spaceBetween={0}
                  slidesPerView={1}
                  className="py-4"
                  modules={[Autoplay, Navigation]}
                  autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                  }}
                  navigation={false}
                  loop={true}>
                  <SwiperSlide>
                    <li className="list-group-item d-flex p-0 border-0">
                      <p className="text-white text-center fnt-small">
                        India is the <b> third largest renewable energy producer</b> with the
                        <b>fourth largest wind energy capacity</b> in the world.
                      </p>
                    </li>
                  </SwiperSlide>
                  <SwiperSlide>
                    <li className="list-group-item d-flex p-0 border-0">
                      <p className="text-white text-center fnt-small">
                        India bagged the
                        <b> third rank on the 2021 renewable energy country attractive index. </b>
                        Also, it has the <b>fifth largest solar installed capacity</b> in the world.
                      </p>
                    </li>
                  </SwiperSlide>
                  <SwiperSlide>
                    <li className="list-group-item d-flex p-0 border-0">
                      <p className="text-white text-center fnt-small">
                        In the quest for a sustainable planet, India collaborated with the
                        <b> International Solar Alliance</b> and made <b> climate justice a central cause</b> to global climate change discourse.
                      </p>
                    </li>
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
            {/* sustainable Development Goals  */}
            <div className="col-12 col-lg-8">
              <div
                className="p-3 p-lg-4 py-5 rounded-4 text-center h-100  bg-covered bg-inset"
                style={{
                  backgroundImage: 'url(./images/achivements/sustainable.jpg)',
                }}>
                <h4 className="fs-2 text-white">Sustainable Development Goals</h4>
                <Swiper
                  spaceBetween={0}
                  slidesPerView={1}
                  className="py-4"
                  modules={[Autoplay, Navigation]}
                  autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                  }}
                  navigation={false}
                  loop={true}>
                  <SwiperSlide>
                    <li className="list-group-item d-flex p-0 border-0">
                      <p className="text-white text-center fnt-small">
                        India’s resolve towards sustainable development goals (SDGs) remains unwavering with a solid{' '}
                        <b> commitment to reach net zero emissions</b> by 2070.
                      </p>
                    </li>
                  </SwiperSlide>
                  <SwiperSlide>
                    <li className="list-group-item d-flex p-0 border-0">
                      <p className="text-white text-center fnt-small">
                        On track with climate action, India has <b>achieved COP21 targets 9 years ahead</b> of schedule. Also, there is{' '}
                        <b> 40% share of renewables in India’s energy mix.</b>
                      </p>
                    </li>
                  </SwiperSlide>
                  <SwiperSlide>
                    <li className="list-group-item d-flex p-0 border-0">
                      <p className="text-white text-center fnt-small">
                        India has seen <b> 2400% growth in solar-installed energy</b> within 8 years.
                      </p>
                    </li>
                  </SwiperSlide>
                  <SwiperSlide>
                    <li className="list-group-item d-flex p-0 border-0">
                      <p className="text-white text-center fnt-small">
                        India’s commitment to reaching SDGs has <b>zero hunger, no poverty, food security and upliftment of living standards</b> on
                        its agenda.
                      </p>
                    </li>
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
            {/* Trade and Investment */}
            <div className="col-12 col-lg-4">
              <div
                className="p-3 p-lg-4 py-5 rounded-4 text-center h-100 bg-covered bg-inset"
                style={{
                  backgroundImage: 'url(./images/achivements/trade.jpg)',
                }}>
                <h4 className="fs-2 text-white">Trade and Investment</h4>
                <Swiper
                  spaceBetween={0}
                  slidesPerView={1}
                  className="py-4"
                  modules={[Autoplay, Navigation]}
                  autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                  }}
                  navigation={false}
                  loop={true}>
                  <SwiperSlide>
                    <li className="list-group-item d-flex p-0 border-0">
                      <p className="text-white text-center fnt-small">
                        For the first time, India’s <b> total export value has reached to 650 billion+ USD</b> with the{' '}
                        <b> highest merchandise export</b> on the rise with a <b> value of 400 billion USD</b> and the{' '}
                        <b> highest services export at 250 billion USD.</b>
                      </p>
                    </li>
                  </SwiperSlide>
                  <SwiperSlide>
                    <li className="list-group-item d-flex p-0 border-0">
                      <p className="text-white text-center fnt-small">
                        India is emerging as the <b>leading global investment hot-spot</b> with the{' '}
                        <b>highest FDI inflows ever about 83 billion USD.</b>
                      </p>
                    </li>
                  </SwiperSlide>
                  <SwiperSlide>
                    <li className="list-group-item d-flex p-0 border-0">
                      <p className="text-white text-center fnt-small">
                        There are <b>13 trade agreements</b> that are enriching India’s global reach with the
                        <b> ‘Make in India’ campaign creating multiple manufacturing opportunities</b>
                      </p>
                    </li>
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
            {/*LiFe */}
            <div className="col-12 col-lg-4">
              <div
                className="p-3 p-lg-4 py-5 rounded-4 text-center h-100 bg-covered bg-inset"
                style={{
                  backgroundImage: 'url(./images/achivements/trade.jpg)',
                }}>
                <h4 className="fs-2 text-white">LiFe</h4>
                <Swiper
                  spaceBetween={0}
                  slidesPerView={1}
                  className="py-4"
                  modules={[Autoplay, Navigation]}
                  autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                  }}
                  navigation={false}
                  loop={true}>
                  <SwiperSlide>
                    <li className="list-group-item d-flex p-0 border-0">
                      <p className="text-white text-center fnt-small">
                        Lifestyle for Environment’ or <b>LiFE initiative pitched for ‘one-world movement’</b> launched by PM Narendra Modi.
                      </p>
                    </li>
                  </SwiperSlide>
                  <SwiperSlide>
                    <li className="list-group-item d-flex p-0 border-0">
                      <p className="text-white text-center fnt-small">
                        <b>Aligns with P3 or the ‘Pro Planet People’ movement</b> that offers a shift from throw culture to a more circular economy.
                      </p>
                    </li>
                  </SwiperSlide>
                  <SwiperSlide>
                    <li className="list-group-item d-flex p-0 border-0">
                      <p className="text-white text-center fnt-small">
                        <b>21-Day challenge</b> successfully launched to reach a more mindful and deliberate consumption of resources.
                      </p>
                    </li>
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
            {/*Skill Development and Employment */}
            <div className="col-12 col-lg-4">
              <div
                className="p-3 p-lg-4 py-5 rounded-4 text-center h-100 bg-covered bg-inset"
                style={{
                  backgroundImage: 'url(./images/achivements/trade.jpg)',
                }}>
                <h4 className="fs-2 text-white">Skill Development and Employment</h4>
                <Swiper
                  spaceBetween={0}
                  slidesPerView={1}
                  className="py-4"
                  modules={[Autoplay, Navigation]}
                  autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                  }}
                  navigation={false}
                  loop={true}>
                  <SwiperSlide>
                    <li className="list-group-item d-flex p-0 border-0">
                      <p className="text-white text-center fnt-small">
                        To make India the skill capital of the world, more than <b> 40 skill development schemes are implemented</b> around the nation
                        and <b> more than 10 million youth are being trained</b> in skill development each year.
                      </p>
                    </li>
                  </SwiperSlide>
                  <SwiperSlide>
                    <li className="list-group-item d-flex p-0 border-0">
                      <p className="text-white text-center fnt-small">
                        <b>700+ PM Kaushal Kendras are set up</b> to for skill training in all the districts across the country
                      </p>
                    </li>
                  </SwiperSlide>
                  <SwiperSlide>
                    <li className="list-group-item d-flex p-0 border-0">
                      <p className="text-white text-center fnt-small">
                        Under <b>PM Kaushal Vikas Yojana, 14 million youth are getting skill development training,</b> of which{' '}
                        <b>4.6 million are women.</b>
                      </p>
                    </li>
                  </SwiperSlide>
                  <SwiperSlide>
                    <li className="list-group-item d-flex p-0 border-0">
                      <p className="text-white text-center fnt-small">
                        Almost <b>5 million people from unorganised sectors are re-skilled </b>
                        and up-skilled.
                      </p>
                    </li>
                  </SwiperSlide>
                  <SwiperSlide>
                    <li className="list-group-item d-flex p-0 border-0">
                      <p className="text-white text-center fnt-small">
                        <b> 14700+ Industrial training centres are established </b>
                        in every state and union territory.
                      </p>
                    </li>
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
            {/* Women-led Development */}
            <div className="col-12 col-lg-4">
              <div
                className="p-3 p-lg-4 py-5 rounded-4 text-center h-100 bg-covered bg-inset"
                style={{
                  backgroundImage: 'url(./images/achivements/trade.jpg)',
                }}>
                <h4 className="fs-2 text-white">Women-led Development</h4>
                <Swiper
                  spaceBetween={0}
                  slidesPerView={1}
                  className="py-4"
                  modules={[Autoplay, Navigation]}
                  autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                  }}
                  navigation={false}
                  loop={true}>
                  <SwiperSlide>
                    <li className="list-group-item d-flex p-0 border-0">
                      <p className="text-white text-center fnt-small">
                        Swachh Bharat Abhiyan recognised <b> the sanitation revolution in rural India</b> that ensures proper dignity for women. Under
                        this scheme,
                        <b> 110 million household restrooms built in villages.</b>
                      </p>
                    </li>
                  </SwiperSlide>
                  <SwiperSlide>
                    <li className="list-group-item d-flex p-0 border-0">
                      <p className="text-white text-center fnt-small">
                        Under <b> PM Ujjwala Yojana, 95 million free LPG connections were provided to women</b> living below the poverty line. Also,{' '}
                        <b>140 million free LPG refills were provided</b> to beneficiaries during the pandemic.
                      </p>
                    </li>
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="container text-center">
            <div className="contrib-discription-roadmap fs-4">
              <h2 className="pa_title_it">
                <span>
                  Roadmap for Greener India <strong style={{ color: '#000' }}>'Panchamrit'</strong>
                </span>
              </h2>
              <div className="roadmap-line">
                <ul className="roadmap_list d-flex flex-column align-items-center">
                  <li className=" border p-2 mt-2 rounded-3 d-flex align-items-center px-2 ">
                    <i class="bi bi-arrow-right-square-fill text-primary fs-2 px-2"></i>
                    <span>
                      <strong>Reach non-fossil energy </strong>capacity of <strong>500GW by 2030</strong>
                    </span>
                  </li>
                  <li className=" border p-2 mt-2 rounded-3 d-flex align-items-center px-2 ">
                    <i class="bi bi-arrow-right-square-fill text-primary fs-2 px-2"></i>
                    <span>
                      Fulfil <strong>50% energy</strong> requirements <strong>via Renewable Energy by 2030</strong>
                    </span>
                  </li>
                  <li className=" border p-2 mt-2 rounded-3 d-flex align-items-center px-2 ">
                    <i class="bi bi-arrow-right-square-fill text-primary fs-2 px-2"></i>
                    <span>
                      <strong>Reduce 1 billion carbon emissions</strong> by 2030
                    </span>{' '}
                  </li>
                  <li className=" border p-2 mt-2 rounded-3 d-flex align-items-center px-2 ">
                    <i class="bi bi-arrow-right-square-fill text-primary fs-2 px-2"></i>
                    <span>
                      <strong>Reduce carbon</strong> intensity below <strong>45% by 2030</strong>
                    </span>{' '}
                  </li>
                  <li className=" border p-2 mt-2 rounded-3 d-flex align-items-center px-2 ">
                    <i class="bi bi-arrow-right-square-fill text-primary fs-2 px-2"></i>
                    <span>
                      <strong>India will achieve </strong>the target of <strong>Net-Zero by 2070</strong>
                    </span>{' '}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="roadmap-img">
            <img src="./images/achivements/roadmap.png" alt="" className="w-100" />
          </div>
        </div>
        <div className="container-fluid bg-blue-grad py-5">
          <div className="text-center">
            <h4 className="fs-3 text-white bg-primary mx-auto d-inline-block px-5 py-2 rounded-pill">Gallery</h4>
          </div>
          <div className="container mt-5">
            <Swiper
              spaceBetween={0}
              slidesPerView={1}
              modules={[Autoplay, Navigation]}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              navigation={true}
              loop={true}>
              <SwiperSlide>
                <img src="https://g20.mygov.in/images/gallery-7.jpg" alt="" className="w-100" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="https://g20.mygov.in/images/gallery-5.jpg" alt="" className="w-100" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="https://g20.mygov.in/images/gallery-6.jpg" alt="" className="w-100" />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
};

export default IndiaAchivements;
