import React from 'react';

const listOfActions = {
  energysaved: [
    {
      id: 1,
      action: 'Use LED bulbs/tubelights',
    },
    {
      id: 2,
      action: 'Use public transport wherever is possible',
    },
    {
      id: 3,
      action: 'Take the stairs instead of elevator wherever possible',
    },
    {
      id: 4,
      action: 'Switch off vehicle engines at red lights and railway crossings',
    },
    {
      id: 5,
      action: 'Use bicycle for local or short commute',
    },
    {
      id: 6,
      action: 'Switch off irrigation pumps after use',
    },
    {
      id: 7,
      action: 'Prefer CNG/EV vehicle over petrol / diesel vehicles',
    },
    {
      id: 8,
      action: 'Use carpooling with friends and colleagues',
    },
    {
      id: 9,
      action: 'Drive in the correct gear. Keep your foot off the clutch when not changing grears',
    },
    {
      id: 10,
      action: 'Install a solar water or solar cooker heater on rooftops',
    },
    {
      id: 11,
      action: 'Switch off appliances from plug points when not in use',
    },
    {
      id: 12,
      action: 'Use biogas for cooking and electricity needs',
    },
    {
      id: 13,
      action: 'Keep temperature of Air Conditioners to 24 degrees',
    },
    {
      id: 14,
      action: 'Prefer pressure cookers over other cookware',
    },
    {
      id: 15,
      action: 'Keep your electronic devices in energy-saving mode',
    },
    {
      id: 16,
      action: 'Use smart switches for appliances which are used frequently',
    },
    {
      id: 17,
      action: 'Install community earthen pots for cooling water',
    },
    {
      id: 18,
      action: 'Defrost fridge or freezer regularly',
    },
    {
      id: 19,
      action: 'Run outdoors instead of on a treadmill',
    },
  ],
  watersaved: [
    {
      id: 20,
      action: 'Adopt cultivation of less water intensive crops like millets',
    },
    {
      id: 21,
      action: 'Participate in recharge of rural water bodies through Amrit Sarovar Scheme',
    },
    {
      id: 22,
      action: 'Practice crop diversification. Move from rice & wheat cultivation to pulse & oil seed cropping system.',
    },
    {
      id: 23,
      action:
        'Use efficient water saving technologies (like micro-irrigation, bunding, farm ponds, zero tillage, direct seeded rice, alternate wetting and drying and others)',
    },
    {
      id: 24,
      action: 'Create rainwater harvesting infrastructure in home/ schools/ offices',
    },
    {
      id: 25,
      action: 'Use drip irrigation systems created with waste materials, wherever possible',
    },
    {
      id: 26,
      action: 'Reuse water from washed vegetables to water plants and other purpose',
    },
    {
      id: 27,
      action: 'Pre-soak heavy pots and pans before washing them',
    },
    {
      id: 28,
      action: 'Do not discard unused stored water every time there is fresh water coming in taps',
    },
    {
      id: 29,
      action: 'Use buckets instead of hose pipes to water plants/ floors/ vehicles',
    },
    {
      id: 30,
      action: 'Fix leaks in flushes, taps and waterpipes',
    },
    {
      id: 31,
      action: 'Use water-efficient fixtures for taps, and showerheads, and toilet flush units',
    },
    {
      id: 32,
      action: 'Invest in a water meter for your house to measure water consumption regularly',
    },
    {
      id: 33,
      action: 'Reuse water drained out from AC/RO for cleaning utensils, watering plants and others',
    },
    {
      id: 34,
      action: 'Prefer a water purification system that wastes less water',
    },
  ],
  plasticReduced: [
    {
      id: 35,
      action: 'Use cloth bag for shopping instead of plastic bags ',
    },
    {
      id: 36,
      action: 'Carry your own water bottle wherever possible',
    },
    {
      id: 37,
      action: 'Reuse glass containers/ packaging plastic items as storage boxes',
    },
    {
      id: 38,
      action: 'Participate in and mobilize participation for clean-up drives of cities and water bodies',
    },
    {
      id: 39,
      action: 'Prefer using non-plastic eco-friendly cutlery during gatherings and events',
    },
    {
      id: 40,
      action: 'Turn off running taps when not in active use',
    },
    {
      id: 41,
      action: 'Use menstrual cups instead of sanitary napkins',
    },
    {
      id: 42,
      action: 'Use recycled plastic over virgin plastic, wherever possible',
    },
    {
      id: 43,
      action: 'Use steel/ recyclable plastic lunch boxes and water bottles',
    },
    {
      id: 44,
      action: 'Cut the packaging bags used for milk, buttermilk, etc. only partially to avoid plastic bits from mixing into biodegradable waste',
    },
    {
      id: 45,
      action: 'Opt for bamboo toothbrushes and neem combs',
    },
  ],
  foodSystemAdopted: [
    {
      id: 46,
      action: 'Include millets in diets through Anganwadi, Mid-Day meal and PD scheme',
    },
    {
      id: 47,
      action: 'Compost food waste at home',
    },
    {
      id: 48,
      action: 'Create kitchen gardens/ terrace gardens at homes/ schools/ offices',
    },
    {
      id: 49,
      action: 'Prepare organic manure from cow dungs and apply to farms',
    },
    {
      id: 50,
      action: 'Prefer locally available and seasonal foods',
    },
    {
      id: 51,
      action: 'Use smaller plates for daily meals to save food wastage',
    },
  ],
  wasteReduced: [
    {
      id: 52,
      action: 'Contribute cattle waste, food waste, and agricultural waste to biogas plant (provided under GOBARDHAN)',
    },
    {
      id: 53,
      action: 'Practice segregation of dry and wet waste at homes',
    },
    {
      id: 54,
      action: 'Use agricultural residue, animal waste for composting, manuring and mulching',
    },
    {
      id: 55,
      action: 'Recycle and reuse old newspapers, magazines',
    },
    {
      id: 56,
      action: 'Feed unused and uncooked vegetables leftovers to cattle',
    },
    {
      id: 57,
      action: 'Set printer default to double-side printing',
    },
    {
      id: 58,
      action: 'Repair, reuse and recycle old furniture',
    },
    {
      id: 59,
      action: 'Buy paper products made from recycled paper',
    },
    {
      id: 60,
      action: 'Donate old clothes and books',
    },
    {
      id: 61,
      action: 'Do not discard waste in water bodies and in public spaces',
    },
    {
      id: 62,
      action: 'Do not let pets defecate in the public places',
    },
  ],
  healthyLifestylesAdopted: [
    {
      id: 63,
      action: 'Encourage use of millets in food and indigenous herbs and medicinal plants for nutrition and well being',
    },
    {
      id: 64,
      action: 'Prefer consuming natural or organic products',
    },
    {
      id: 65,
      action: 'Start biodiversity conservation at community level',
    },
    {
      id: 66,
      action: 'Plant medicinal plants such as neem, tulsi, giloy, mint, curry leaves, ashwagandha, curry leaves etc. within household premises',
    },
    {
      id: 67,
      action: 'Practice natural or organic farming',
    },
    {
      id: 68,
      action: 'Plant trees to reduce the impact of pollution',
    },
    {
      id: 69,
      action: 'Avoid purchasing products/souvenirs made from skin, tuskers and fur of wild animals',
    },
    {
      id: 70,
      action: 'Create and volunteer at community food and cloth banks, and at animal shelters',
    },
    {
      id: 71,
      action: 'Initiate and/or join green clubs in your residential area/ school/ office',
    },
  ],
  eWasteReduced: [
    {
      id: 72,
      action: 'Repair and use electronic devices over discarding the devices',
    },
    {
      id: 73,
      action: 'Discard gadgets in nearest e-recycling units',
    },
    {
      id: 74,
      action: 'Use rechargeable lithium cells',
    },
    {
      id: 75,
      action: 'Prefer cloud storage over a pen drive / hard drive',
    },
  ],
};

const Pointers = () => {
  return (
    <div>
      {/* <!- 75 Pointers under LiFE Mission --> */}
      <div className="pointer">
        <h4 className="fs-2">
          75 Steps towards <span className="text-intial">LiFE</span>
        </h4>
        <p>
          To mark India’s 75th independent year from British colonialism, the authorities released a comprehensive list of 75 personal actions across
          7 categories.
        </p>
        <p>
          These unique categories are thematically aligned to global sustainability, namely - water saving, single-use plastic, sustainable food
          systems, waste reduction, energy, e-waste, and healthy lifestyle.
        </p>
        <p>
          These active steps as a part of LiFE mission will be easy to practice by all – groups, individuals, and organisations with lesser
          co-dependence on resources. They are specific and measurable and are highly non-disruptive to day-to-day economic activities.
        </p>
        <p>The motive is to aware people across the nation to adopt these steps collectively in order to join the climate change fight.</p>
        <p>The list of actions are as follows:</p>
      </div>
      <div>
        <ul
          className="nav row g-2 g-lg-4 pointer-navs nav-pills g-3 mb-3 justify-content-center rounded-5 border shadow p-2 mt-4 pb-4"
          id="pills-tab-pointers"
          role="tablist">
          <li className="nav-item col-12 col-md-4 col-lg-3" role="presentation">
            <button
              className=" btn btn-primary-outline active rounded-pill px-5 py-3"
              id="pointers-pills-tab-0"
              data-bs-toggle="pill"
              data-bs-target="#pointer-pills-0"
              type="button"
              role="tab">
              <img src="https://cdn-icons-png.flaticon.com/512/2990/2990815.png" alt="" className="icon-pointer" />{' '}
              <span className="ms-2">Energy Saved</span>
            </button>
          </li>
          <li className="nav-item col-12 col-md-4 col-lg-3" role="presentation">
            <button
              className=" btn btn-primary-outline rounded-pill px-5 py-3"
              id="pointer-pills-tab-1"
              data-bs-toggle="pill"
              data-bs-target="#pointer-pills-1"
              type="button"
              role="tab">
              <img src="https://cdn-icons-png.flaticon.com/512/932/932532.png" alt="" className="icon-pointer" />{' '}
              <span className="ms-2">Water Saved </span>
            </button>
          </li>
          <li className="nav-item col-12 col-md-4 col-lg-3" role="presentation">
            <button
              className=" btn btn-primary-outline rounded-pill px-5 py-3"
              id="pointer-pills-tab-2"
              data-bs-toggle="pill"
              data-bs-target="#pointer-pills-2"
              type="button"
              role="tab">
              <img src="https://cdn-icons-png.flaticon.com/512/8044/8044414.png" alt="" className="icon-pointer" />{' '}
              <span className="ms-2">
                {' '}
                Single Use <br /> Plastic Reduced
              </span>
            </button>
          </li>
          <li className="nav-item col-12 col-md-4 col-lg-3" role="presentation">
            <button
              className=" btn btn-primary-outline rounded-pill px-5 py-3"
              id="pointer-pills-tab-3"
              data-bs-toggle="pill"
              data-bs-target="#pointer-pills-3"
              type="button"
              role="tab">
              <img src="https://cdn-icons-png.flaticon.com/512/4558/4558307.png" alt="" className="icon-pointer" />{' '}
              <span className="ms-2">
                Sustainable Food
                <br /> Systems Adopted
              </span>
            </button>
          </li>
          <li className="nav-item col-12 col-md-4 col-lg-3" role="presentation">
            <button
              className=" btn btn-primary-outline rounded-pill px-5 py-3"
              id="pointer-pills-tab-4"
              data-bs-toggle="pill"
              data-bs-target="#pointer-pills-4"
              type="button"
              role="tab">
              <img src="https://cdn-icons-png.flaticon.com/512/3273/3273920.png" alt="" className="icon-pointer" />{' '}
              <span className="ms-2">
                Waste Reduced
                <br /> (Swachhata Actions)
              </span>
            </button>
          </li>
          <li className="nav-item col-12 col-md-4 col-lg-3" role="presentation">
            <button
              className=" btn btn-primary-outline rounded-pill px-5 py-3"
              id="pointer-pills-tab-5"
              data-bs-toggle="pill"
              data-bs-target="#pointer-pills-5"
              type="button"
              role="tab">
              <img src="https://cdn-icons-png.flaticon.com/512/4807/4807765.png" alt="" className="icon-pointer" />{' '}
              <span className="ms-2">
                Healthy Lifestyles
                <br /> Adopted{' '}
              </span>
            </button>
          </li>
          <li className="nav-item col-12 col-md-4 col-lg-3" role="presentation">
            <button
              className=" btn btn-primary-outline rounded-pill px-5 py-3"
              id="pointer-pills-tab-6"
              data-bs-toggle="pill"
              data-bs-target="#pointer-pills-6"
              type="button"
              role="tab">
              <img src="https://cdn-icons-png.flaticon.com/512/3273/3273678.png" alt="" className="icon-pointer" />{' '}
              <span className="ms-2">E-Waste reduced</span>
            </button>
          </li>
        </ul>
        <div className="tab-content" id="pills-tabContent">
          <div className="tab-pane fade show active" id="pointer-pills-0" role="tabpanel" tabIndex="0">
            <div className="container py-4">
              <div className="row">
                {/* Map This Area 
                    data.map((item,index)=>{
                      return <item key={index}>
                      </item>
                    }) */}

                {listOfActions.energysaved.map((item, index) => {
                  return (
                    <div className="col-12 col-md-6 col-lg-4 mb-3" key={index}>
                      <div className="p-3 border rounded-3 shadow-sm">
                        <h4 className="fs-3">
                          <span className="text-primary fs-2">{item.id}.</span> <span className="fw-semibold fs-4">{item.action}</span>
                        </h4>
                      </div>
                    </div>
                  );
                })}
                {/* End Map Area  */}
              </div>
            </div>
          </div>
          <div className="tab-pane fade" id="pointer-pills-1" role="tabpanel" tabIndex="0">
            <div className="container py-4">
              <div className="row">
                {listOfActions.watersaved.map((item, index) => {
                  return (
                    <div key={index} className="col-12 col-md-6 col-lg-4 mb-3">
                      <div className="p-3 border rounded-3 shadow-sm">
                        <h4 className="fs-3">
                          <span className="text-primary fs-2">{item.id}.</span> <span className="fw-semibold fs-4">{item.action}</span>
                        </h4>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="tab-pane fade" id="pointer-pills-2" role="tabpanel" tabIndex="0">
            <div className="container py-4">
              <div className="row">
                {listOfActions.plasticReduced.map((item, index) => {
                  return (
                    <div className="col-12 col-md-6 col-lg-4 mb-3">
                      <div className="p-3 border rounded-3 shadow-sm">
                        <h4 className="fs-3">
                          <span className="text-primary fs-2">{item.id}.</span> <span className="fw-semibold fs-4">{item.action}</span>
                        </h4>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="tab-pane fade" id="pointer-pills-3" role="tabpanel" tabIndex="0">
            <div className="container py-4">
              <div className="row">
                {listOfActions.foodSystemAdopted.map((item, index) => {
                  return (
                    <div className="col-12 col-md-6 col-lg-4 mb-3">
                      <div className="p-3 border rounded-3 shadow-sm">
                        <h4 className="fs-3">
                          <span className="text-primary fs-2">{item.id}.</span> <span className="fw-semibold fs-4">{item.action}</span>{' '}
                        </h4>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="tab-pane fade" id="pointer-pills-4" role="tabpanel" tabIndex="0">
            <div className="container py-4">
              <div className="row">
                {listOfActions.wasteReduced.map((item, index) => {
                  return (
                    <div className="col-12 col-md-6 col-lg-4 mb-3">
                      <div className="p-3 border rounded-3 shadow-sm">
                        <h4 className="fs-3">
                          <span className="text-primary fs-2">{item.id}.</span> <span className="fw-semibold fs-4">{item.action}</span>
                        </h4>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="tab-pane fade" id="pointer-pills-5" role="tabpanel" tabIndex="0">
            <div className="container py-4">
              <div className="row">
                {listOfActions.healthyLifestylesAdopted.map((item, index) => {
                  return (
                    <div className="col-12 col-md-6 col-lg-4 mb-3">
                      <div className="p-3 border rounded-3 shadow-sm">
                        <h4 className="fs-3">
                          <span className="text-primary fs-2">{item.id}.</span> <span className="fw-semibold fs-4">{item.action}</span>{' '}
                        </h4>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="tab-pane fade" id="pointer-pills-6" role="tabpanel" tabIndex="0">
            <div className="container py-4">
              <div className="row">
                {listOfActions.eWasteReduced.map((item, index) => {
                  return (
                    <div className="col-12 col-md-6 col-lg-4 mb-3">
                      <div className="p-3 border rounded-3 shadow-sm">
                        <h4 className="fs-3">
                          <span className="text-primary fs-2">{item.id}.</span> <span className="fw-semibold fs-4">{item.action}</span>
                        </h4>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pointers;
