import React, { useEffect } from 'react';
import BreadCrumb from '../../../layout/BreadCrumb';
import Pointers from './Pointers';

const daysChallenge = [
  {
    day: 1,
    task: 'Carry a non-plastic bottle while steeping out of homes',
  },
  {
    day: 2,
    task: 'Use cloth bags for grocery shopping instead of plastic bags',
  },
  {
    day: 3,
    task: 'Use stairs instead of an elevator',
  },
  {
    day: 4,
    task: 'Donate old clothes and books',
  },
  {
    day: 5,
    task: 'Practice segregation of wet and dry waste at home',
  },
  {
    day: 6,
    task: 'Switch off appliances from plug plants when not in use',
  },
  {
    day: 7,
    task: 'Use of public transport',
  },
  {
    day: 8,
    task: 'Switch off vehicle engine at signals and railroad crossing',
  },
  {
    day: 9,
    task: 'Plant trees to reduce the impact of pollution',
  },
  {
    day: 10,
    task: 'Feed unused and uncooked leftovers to cattle/pets/street animals',
  },
  {
    day: 11,
    task: 'Pre-soak heavy pots and pans before washing them',
  },
  {
    day: 12,
    task: 'Use steel/recyclable plastic lunch boxes and water bottles',
  },
  {
    day: 13,
    task: 'Cut the packaging bags used for plastic items',
  },
  {
    day: 14,
    task: 'Defrost fridge or freezer regularly',
  },
  {
    day: 15,
    task: 'Create kitchen, school, and terrace gardens',
  },
  {
    day: 16,
    task: 'Reuse water for cleaning and watering plants',
  },
  {
    day: 17,
    task: 'Set printer default to double- side printing',
  },
  {
    day: 18,
    task: 'Encourage the use of herbs and indigenous plants',
  },
  {
    day: 19,
    task: 'Initiate or join green clubs',
  },
  {
    day: 20,
    task: 'Participate in and mobilize participation for clean-up drives of cities and water bodies',
  },
  {
    day: 21,
    task: 'Discard gadgets in nearest e-recycling bins',
  },
];

const Life = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <BreadCrumb
        image={'images/backgrounds/environmental-protection-g95c16503a_1920.jpg'}
        heading={'Lifestyle For Environment Initiative: LiFE'}
        link="/registration?eco_club=life"
      />
      <section className="bg-gray section">
        <div className="container">
          <div className="section-title mb-0">
            <span span className="section-title-border"></span>
            <h2>
              <span className="text-initial">LiFE</span> (Lifestyle for Environment) Initiative
            </h2>
            <h4 className="fs-2 mt-4">Overview</h4>
          </div>
          {/* <!-- Overview  --> */}
          <div className="overview">
            <p className="text-dark mb-2 fs-5">
              ‘Lifestyle for Environment’ or LiFE initiative is a campaign envisioned by honourable Prime Minister Narendra Modi with a prime focus on
              environmentally conscious living. It was globally introduced at the 26th United Nations Climate Change Conference of the Parties (COP26)
              in Glasgow in 2021.
            </p>
            <div className="row row-cols-1 row-cols-lg-2 align-items-center mb-3">
              <div className="col col-lg-8 text-center">
                <p className="fs-3 text-center fw-semibold fst-italic w-100 px-5">
                  <i className="bx bxs-quote-alt-left"></i>This LiFE campaign can become as a mass movement towards an environmentally conscious
                  lifestyle.<i className="bx bxs-quote-alt-right"></i>
                </p>
              </div>
              {/* <div className="col col-lg-1"></div> */}
              <div className="col col-lg-4">
                <img src="images/modelg20/modiji.png" className="w-100 mx-auto d-block" style={{ maxHeight: '250px', objectFit: 'contain' }} alt="" />
                <p className="text-center">
                  <span className="text-bolder fs-4">Shri Narendra Modi</span>
                  <br />
                  <span className="fs-6">(Prime Minister of India)</span>
                </p>
              </div>
            </div>
            <p className="text-dark mb-2 fs-5">
              LiFE is a call to action for every citizen to practice sustainability and mindful utilisation of resources over ‘mindless destructive
              consumption.’
            </p>
            <p className="text-dark mb-2 fs-5">
              Through this initiative, Hon’ble PM Modi wishes to tackle the menace that is climate change and distinctively vows to do away with the
              ‘use-and-throw’ economy among the masses by advocating to take deliberate measures to uplift Pro Planet lifestyle.
            </p>
            <div className="row row-cols-1 row-cols-lg-2 align-items-center mb-3">
              <div className="col col-lg-8 text-center">
                {/* <p>
                                India shared a joyous moment of pride with its 1.4 billion citizens after receiving the G20
                                presidency for 2023.
                            </p>
                            <p>
                                In the words of honourable Prime Minister, <span className='fw-bold'>Shri Narendra Modi</span> for the nation’s youth
                            </p> */}
                <p className="fs-4 text-center fw-semibold fst-italic w-100 px-5">
                  <i className="bx bxs-quote-alt-left"></i>India's budget has made key declarations affirming its vision for ‘Lifestyle for
                  Environment (LiFE)’, 'Panchamrit' and net-zero carbon emissions by 2070. The green growth provisions outlined in the budget place
                  the country on a steadfast path to meeting its sustainability goals.<i className="bx bxs-quote-alt-right"></i>
                </p>
              </div>
              {/* <div className="col col-lg-1"></div> */}
              <div className="col col-lg-4">
                <img
                  src="images/modelg20/download.jpg"
                  className="w-100 mx-auto d-block"
                  style={{ maxHeight: '250px', objectFit: 'contain' }}
                  alt=""
                />

                <p className="text-center">
                  <span className="text-bolder fs-4">Shri Bhupender Yadav</span>
                  <br />
                  <span className="fs-6">(Union Cabinet Minister of Labour and Employment, Environment, Forest and Climate Change.)</span>
                </p>
              </div>
            </div>
          </div>
          <hr className="my-4" />
          {/* Throw a way society a challenge  */}
          <div>
            <h4 className="fs-2">Throw-away Society: A Challenge</h4>
            <p>
              In recent times, the throwaway culture has gathered much traction. It stems from the social concept of a throw-away society that is
              strongly affected by consumerism, where people tend to use items of single-use and disposable packaging. It is an overall critical
              viewpoint of overconsumption and excessive usage of limited shelf-life goods and products.
            </p>
            <p>
              It is believed that due to environmental destruction and adverse climatic shifts, the population without proper action will face acute
              scarcity of basic needs like water, food, etc. Moreover, the global economy could lose up to 18% of GDP BY 2050.
            </p>
          </div>
          <hr className="my-4" />
          <div>
            <h4 className="fs-2">Towards a Circular Economy</h4>
            <p>Under the LiFE initiative, the focus shall be to transition from this so-called throw-away society to a more circular economy.</p>
            <p>
              The government authorities have initiated several reforms and policies to mitigate the throw-away influence from the masses and a change
              in the behaviour of the citizens towards economic conservation. Some of the successful campaigns are:
            </p>
            <ul className="list-group border-none bg-gray mt-3">
              <li className="list-group-item border-0 bg-gray ps-0">
                <span className="p-2 bg-primary clip-cicle text-white mt-2">
                  <i className="bi bi-arrow-right"></i>
                </span>{' '}
                <span className="ps-2 fs-5">
                  <b>Swachh Bharat Abhiyan (2014) – </b>This mission had a massive behavioural change in people regarding healthy sanitation
                  practices. Almost 100 million restrooms were created in a span of 7 years.
                </span>
              </li>
              <li className="list-group-item border-0 bg-gray ps-0">
                <span className="p-2 bg-primary clip-cicle text-white mt-2">
                  <i className="bi bi-arrow-right"></i>
                </span>{' '}
                <span className="ps-2 fs-5">
                  <b>Pradhan Mantri Ujjwala Scheme (2016) – </b>With a budget allocation of 80 billion INR, this scheme incremented households with
                  LPG from 62% to 99.8% in 2021.
                </span>
              </li>
              <li className="list-group-item border-0 bg-gray ps-0">
                <span className="p-2 bg-primary clip-cicle text-white mt-2">
                  <i className="bi bi-arrow-right"></i>
                </span>{' '}
                <span className="ps-2 fs-5">
                  <b>Surakshit Sagar Campaign (2022) – </b>This initiative strategized to target transformation and eco-conservation through behaviour
                  change of oceanic bodies. It aimed to remove 15000 tonnes of waste from 75 beaches in 75 days.
                </span>
              </li>
            </ul>

            <p>
              Besides this, the LiFE mission would address this issue as changing the attitude of individuals and communities can have an instrumental
              impact on environmental safety.
            </p>
          </div>
          <hr className="my-4" />
          {/* <!-- Mission  --> */}
          <div>
            <h4 className="fs-2">
              <span className="text-initial">LiFE</span> Mission
            </h4>
            <p className="text-dark mb-2 fs-5">
              PM Modi green-flagged mission LiFE this year for changing citizens’ collective approach towards sustainability. The mission has three
              simple strategies.
            </p>
            <ul className="list-group border-none bg-gray mt-3">
              <li className="list-group-item border-0 bg-gray ps-0">
                <span className="p-2 bg-primary clip-cicle text-white mt-2">
                  <i className="bi bi-arrow-right"></i>
                </span>{' '}
                <span className="ps-2 fs-5">Change in Demand – People undertaking easy and efficient eco-friendly steps in daily lives</span>
              </li>
              <li className="list-group-item border-0 bg-gray ps-0">
                <span className="p-2 bg-primary clip-cicle text-white mt-2">
                  <i className="bi bi-arrow-right"></i>
                </span>{' '}
                <span className="ps-2 fs-5">Change in Supply – Industries and business markets alter supply patterns to changing demand</span>
              </li>
              <li className="list-group-item border-0 bg-gray ps-0">
                <span className="p-2 bg-primary clip-cicle text-white mt-2">
                  <i className="bi bi-arrow-right"></i>
                </span>{' '}
                <span className="ps-2 fs-5">
                  Change in Policy – Government lawmakers set influential norms to support sustainable lifestyle and production
                </span>
              </li>
            </ul>
            <p className="text-dark mt-3 fs-5">
              The mission also empowers the spirit of the P3 model, that is, Pro-Planet-People. In simple terms, it aims to unite those people under
              the initiative who think, act in unity while consuming Earth’s gifted resources
            </p>
            {/* <blockquote className="blockquote">
              <i className="bx bxs-quote-left"></i> It functions on the basic
              principle, a lifestyle of the planet, for the planet and by the
              planet. <i className="bx bxs-quote-right"></i> <br />
              <div className="text-end">
                <span className="ms-auto">- PM Narendra Modi</span>
              </div>
            </blockquote> */}
            <div className="row row-cols-1 row-cols-lg-2 align-items-center mb-3">
              <div className="col col-lg-8 text-center">
                {/* <p>
                                India shared a joyous moment of pride with its 1.4 billion citizens after receiving the G20
                                presidency for 2023.
                            </p>
                            <p>
                                In the words of honourable Prime Minister, <span className='fw-bold'>Shri Narendra Modi</span> for the nation’s youth
                            </p> */}
                <p className="fs-3 text-center fw-semibold fst-italic w-100 px-5">
                  <i className="bx bxs-quote-alt-left"></i>It functions on the basic principle, a lifestyle of the planet, for the planet and by the
                  planet. <i className="bx bxs-quote-alt-right"></i>
                </p>
              </div>
              {/* <div className="col col-lg-1"></div> */}
              <div className="col col-lg-4">
                <img src="images/modelg20/modiji.png" className="w-100 mx-auto d-block" style={{ maxHeight: '250px', objectFit: 'contain' }} alt="" />
                <p className="text-center">
                  <span className="text-bolder fs-4">Shri Narendra Modi</span>
                  <br />
                  <span className="fs-6">(Prime Minister of India)</span>
                </p>
              </div>
            </div>
            <p className="text-dark mt-3 fs-5">
              Mission LiFE makes the fight against climate change historically democratic where every citizen plays a key role. LiFE in itself is a
              circular existence where a person is born, lives and then dies. However, how life is lived in regard to earth’s finite resources is what
              counts.
            </p>
            <p className="text-dark mt-3 fs-5">
              Moreover, it aims to inspire the citizens and communities to lead a lifestyle that is in close synchrony of nature’s limited resources
              and help minimise any exhaustion of those resources. Taking a hint from the above thought comes the idea of the circular economy. A
              model of production and consumption that entails industries and markets adopting the concept of ‘reduce, reuse, recycle.’
            </p>
            <p className="text-dark mt-3 fs-5">
              Furthermore, it majorly involves leasing, sharing, refurbishing, repairing and recycling existing models or products to a realistic end
              rather than scrapping them off in single use.
            </p>
            <p>
              Interestingly, India is the first country across the globe to include LiFE in its list of nationally determined contributions. From
              this, the nation hopes to set and propagate healthy ways of sustainable existence and values of conservation of the ecosystem to combat
              climate change.
            </p>
            <p>Take a look at the following traditional practices that could be part of the LiFE mission:</p>
            <ul className="p-0">
              <li className="text-dark mt-3 fs-5">
                <span className="p-2 bg-primary clip-cicle text-white mt-2">
                  <i className="bi bi-arrow-right"></i>
                </span>{' '}
                Clayware and biodegradable utensils for cooking, serving and storing food items
              </li>
              <li className="text-dark mt-3 fs-5">
                <span className="p-2 bg-primary clip-cicle text-white mt-2">
                  <i className="bi bi-arrow-right"></i>
                </span>{' '}
                Handwashing and sun drying of clothes instead of excessive electronic means of washing
              </li>
              <li className="text-dark mt-3 fs-5">
                <span className="p-2 bg-primary clip-cicle text-white mt-2">
                  <i className="bi bi-arrow-right"></i>
                </span>{' '}
                Traditional rainwater harvesting techniques like underground tankis, check dams, etc.
              </li>
            </ul>
            <p>
              Mission LiFE seeks to implement such foundation techniques into the regular habit to have a more powerful impact. It is designed and
              formulated with the goal to mobilise almost every single citizen of India and the globe eventually for taking collective action towards
              environmental conservation.
            </p>
            <div className="row row-cols-1 row-cols-lg-2 align-items-center mb-3">
              <div className="col col-lg-8 text-center">
                {/* <p>
                                India shared a joyous moment of pride with its 1.4 billion citizens after receiving the G20
                                presidency for 2023.
                            </p>
                            <p>
                                In the words of honourable Prime Minister, <span className='fw-bold'>Shri Narendra Modi</span> for the nation’s youth
                            </p> */}
                <p className="fs-5 text-center fw-semibold fst-italic w-100 px-5">
                  <i className="bx bxs-quote-alt-left"></i>Extolling the Earth as Mother, our scriptures say, 'The Earth is our Mother and we are her
                  children'. The sentiment of universal brotherhood has constantly guided the nation and its people. With such a glorious culture and
                  philosophy of lofty traditions of living in harmony with nature, it is only natural for India to remain at the forefront of global
                  efforts for environment protection.<i className="bx bxs-quote-alt-right"></i>
                </p>
              </div>
              {/* <div className="col col-lg-1"></div> */}
              <div className="col col-lg-4">
                <img src="images/modelg20/modiji.png" className="w-100 mx-auto d-block" style={{ maxHeight: '250px', objectFit: 'contain' }} alt="" />
                <p className="text-center">
                  <span className="text-bolder fs-4">Shri Narendra Modi</span>
                  <br />
                  <span className="fs-6">(Prime Minister of India)</span>
                </p>
              </div>
            </div>
          </div>
          <hr className="my-4" />
          <div>
            <h3>
              Actions Under the <span className="text-initial">LiFE</span> Mission
            </h3>
            <h4 className="fs-2">21 Days Challenge</h4>
            <p className="text-dark mb-2 fs-5">
              Under the LiFE Mission, the government has initiated has a 21-day challenge which lists out activities and measures that one can
              undertake to minimize the wasteful consumption of resources. The aim is to act consciously while undergoing day-to-day activities with
              care and consideration.
            </p>
            <p className="text-dark mb-2 fs-5">
              Each day’s activity is based on a person’s habit of using elevators, and plastic bags or forgetting to switch off electrical appliances
              when not in use. If small steps are taken by each individual to avoid wastage, then it could create a bigger impact.
            </p>
          </div>
          <div className="day-challenges">
            <div className="row g-3 g-lg-4 mt-4">
              {daysChallenge.map((challenge) => {
                return (
                  <div className="col-12 col-sm-6 col-md-4 col-lg-4" key={challenge.day}>
                    <div className="calendar-box p-3 border rounded h-100 border-warning">
                      <div className="d-flex align-items-center h-100">
                        <div className="p-relative">
                          <img src="./images/icons/calendar.png" alt="" className="icon-calendar" />
                          <div className="p-absolute w-100 h-100 d-flex align-items-center justify-content-center" style={{ top: 0, left: 0 }}>
                            <h5 className="text-center lh-1">
                              Day
                              <br />
                              <span className="fs-2">{challenge.day}</span>
                            </h5>
                          </div>
                        </div>
                        <div className="px-3">
                          <span className="section-title-border mb-2"></span>
                          <p className="text-dark lh-sm fs-6 fw-semibold">{challenge.task}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <hr className="my-4" />
          <Pointers />
          <hr className="my-4" />
          {/* <!-- Key Performance Indicators and Targets  --> */}
          <div>
            <h4 className="fs-2">Key Performance Indicators and Targets</h4>
            <p className="text-dark mb-2 fs-5">
              The key performance indicators and corresponding targets of Mission LiFE, from 2022–28, are as follows. These are indicative targets and
              may be subject to change.
            </p>
            <img src="./images/table/table.jpg" className="w-100 d-block" alt="" />
          </div>
          <hr className="my-4" />
          {/* <!-- Impact  --> */}
          <div className="py-4">
            <h4 className="fs-2 text-center">
              <span className="text-initial">LiFE</span> Mission Impact
            </h4>
            <p className="text-dark mb-2 fs-5 text-center col-12 col-lg-10 mx-auto">
              Any national or international campaign that is initiated for global welfare can only be assimilated with the constructive influence it
              can generate for the environment.
            </p>
            <p className="text-center col-12 col-lg-10 mx-auto">
              Similarly, LiFE mission, its proactive measures are expected to bring about a significant impact on the lives of people as well as the
              ecosystem if laid out perfectly.
            </p>
            <p className="text-center col-12 col-lg-10 mx-auto">
              Take a look below to get the gist of estimated changes that LiFE actions will bring for 1 billion Indians in 2027-28.
            </p>
            <div className="row g-2 g-lg-3 justify-content-center">
              <div className="col-12 col-md-6 col-lg-2">
                <div className="box text-center bg-light  border p-3 rounded-4 h-100">
                  <div className="p-4 d-inline-block rounded-circle border border-warning">
                    <img src="https://cdn-icons-png.flaticon.com/512/3176/3176298.png" alt="" className="icon-pointer" />
                  </div>
                  <h6 className="mt-4">
                    Switching off the car / scooter engines at traffic lights / railway crossings can save up to 22.5 billion kWh of energy.
                  </h6>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-2">
                <div className="box text-center bg-light  border p-3 rounded-4 h-100">
                  <div className="p-4 d-inline-block rounded-circle border border-warning">
                    <img src="https://cdn-icons-png.flaticon.com/512/4497/4497450.png" alt="" className="icon-pointer" />
                  </div>
                  <h6 className="mt-4">Turning off running taps when not in active use can save upto 9 trillion litres of water.</h6>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-2">
                <div className="box text-center bg-light  border p-3 rounded-4 h-100">
                  <div className="p-4 d-inline-block rounded-circle border border-warning">
                    <img src="https://cdn-icons-png.flaticon.com/512/4478/4478384.png" alt="" className="icon-pointer" />
                  </div>
                  <h6 className="mt-4">
                    Using a cloth bag instead of a plastic bag while shopping can save up to 375 million tonnes of solid waste from entering the
                    landfill.
                  </h6>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-2">
                <div className="box text-center bg-light  border p-3 rounded-4 h-100">
                  <div className="p-4 d-inline-block rounded-circle border border-warning">
                    <img src="https://cdn-icons-png.flaticon.com/512/3427/3427844.png" alt="" className="icon-pointer" />
                  </div>
                  <h6 className="mt-4">
                    Discarding non-functioning gadgets in the nearest e-recycling unit can recycle upto 0.75 million tonnes of e-waste.
                  </h6>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-2">
                <div className="box text-center bg-light  border p-3 rounded-4 h-100">
                  <div className="p-4 d-inline-block rounded-circle border border-warning">
                    <img src="https://cdn-icons-png.flaticon.com/512/6905/6905282.png" alt="" className="icon-pointer" />
                  </div>
                  <h6 className="mt-4">Composting waste food at home can save up to 15 billion tonnes of food from going to landfills.</h6>
                </div>
              </div>
            </div>
          </div>
          <hr className="my-4" />
          {/* <!-- Youth’s Role in LiFE  --> */}
          <div>
            <h4 className="fs-2">
              Youth’s Role in <span className="text-initial">LiFE</span>
            </h4>
            <p className="text-dark mb-2 fs-5">
              As India comprises more than 65% in the youth majority, they can actively contribute to the Lifestyle for Environment (LiFE) initiative.
            </p>{' '}
            <p className="text-dark mb-2 fs-5">
              The digital transformation of India under PM Modi’s leadership has given rise to multiple social platforms, and viral culture in India
              where youngsters can take part and spread the LiFE message to remote corners of the country all with a touch on their smartphones and
              screens.
            </p>{' '}
            <p className="text-dark mb-2 fs-5">
              There are many initiatives and programmes that the youth can organise in groups or individual levels in schools/colleges/universities
              that would get better traction for the LiFE initiative.
            </p>
            <ul className="list-group border-none bg-gray mt-3">
              <li className="list-group-item border-0 bg-gray ps-0">
                <span className="p-2 bg-primary clip-cicle text-white mt-2">
                  <i className="bi bi-arrow-right"></i>
                </span>{' '}
                <span className="ps-2 fs-5">
                  <b>Organise workshops, seminars,</b> and speech sessions in association with government bodies to start awareness drives in
                  institutions and localised communities.
                </span>
              </li>
              <li className="list-group-item border-0 bg-gray ps-0">
                <span className="p-2 bg-primary clip-cicle text-white mt-2">
                  <i className="bi bi-arrow-right"></i>
                </span>{' '}
                <span className="ps-2 fs-5">
                  <b> Planning and organising campaigns</b> online like – making posters, drawings, handicrafts etc. to receive creative results for
                  the mission.
                </span>
              </li>
              <li className="list-group-item border-0 bg-gray ps-0">
                <span className="p-2 bg-primary clip-cicle text-white mt-2">
                  <i className="bi bi-arrow-right"></i>
                </span>{' '}
                <span className="ps-2 fs-5">
                  <b> Taking part in Youth centric corps like NCC, NSS,</b> and youth congress events in universities/colleges to stay updated on
                  latest news
                </span>
              </li>
              <li className="list-group-item border-0 bg-gray ps-0">
                <span className="p-2 bg-primary clip-cicle text-white mt-2">
                  <i className="bi bi-arrow-right"></i>
                </span>{' '}
                <span className="ps-2 fs-5">
                  <b> Organising environmental friendly events</b> in localities, and institutions like <b> green drives, peace march,</b>
                  planting trees, waste collection drive to get community participation.
                </span>
              </li>
              <li className="list-group-item border-0 bg-gray ps-0">
                <span className="p-2 bg-primary clip-cicle text-white mt-2">
                  <i className="bi bi-arrow-right"></i>
                </span>{' '}
                <span className="ps-2 fs-5">
                  <b> Inviting famous social personalities for talks,</b> and panel discussions and getting good inputs from their experience to
                  further initiate the mission’s message
                </span>
              </li>
              <li className="list-group-item border-0 bg-gray ps-0">
                <span className="p-2 bg-primary clip-cicle text-white mt-2">
                  <i className="bi bi-arrow-right"></i>
                </span>{' '}
                <span className="ps-2 fs-5">
                  <b> Observing an eco-friendly hour around the clock</b> like Gadget Free hour, Green Hour or Earth Hour to save resources.
                </span>
              </li>
              <li className="list-group-item border-0 bg-gray ps-0">
                <span className="p-2 bg-primary clip-cicle text-white mt-2">
                  <i className="bi bi-arrow-right"></i>
                </span>{' '}
                <span className="ps-2 fs-5">
                  <b> Engaging students, teachers in various contests</b> like quizzes, debates, article writing, skits, theatre, dramas set on LiFE’s
                  message or strategized 75 pointers
                </span>
              </li>
              <li className="list-group-item border-0 bg-gray ps-0">
                <span className="p-2 bg-primary clip-cicle text-white mt-2">
                  <i className="bi bi-arrow-right"></i>
                </span>{' '}
                <span className="ps-2 fs-5">
                  <b> Taking part in 21-day challenge to make it a habit.</b>
                </span>
              </li>
              <li className="list-group-item border-0 bg-gray ps-0">
                <span className="p-2 bg-primary clip-cicle text-white mt-2">
                  <i className="bi bi-arrow-right"></i>
                </span>{' '}
                <span className="ps-2 fs-5">
                  <b>Posting on social media</b> with trendy and viral content related to LiFE initiative
                </span>
              </li>
            </ul>
          </div>
          <hr className="my-4" />
        </div>
      </section>
    </div>
  );
};

export default Life;
