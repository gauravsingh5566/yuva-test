import React from 'react';
import BreadCrumb from 'layout/BreadCrumb';
import BlogsSwiper from '../Home/BlogsSwiper';
import Faq from './Faq';
import YouthSwiper from './YouthSwiper';
import { Link } from 'react-router-dom';

const Youth = () => {
  return (
    <div>
      {' '}
      {/* <!-- page title --> */}
      <BreadCrumb heading={'Yuvamanthan (The Discussion Platform for the Indian Youth)'} />
      {/* <!-- /page title --> */}
      {/* <!-- about us --> */}
      <section className="section position-relative">
        <div className="container">
          <div className="row align-items-center justify-content-between mb-80">
            <div className="col-md-6 order-2 order-lg-1">
              <span className="section-title-border"></span>
              <h2 className="section-title fs-1 mb-0">Who we are?</h2>
              <p>
                A dedicated to the young, ambitious and action-loving youth of India.
                <br />
                We at Yuvamanthan believe that India is a land of tradition and innovation that mixes well with the impressionable minds of today’s
                youth.
                <br />
                Did you know that India has the largest youth concentration in the world with almost 430 million citizens in the age group of 16-35
                years. Talk about national pride, right?
              </p>

              <p className="mb-5">
                As youngsters today are more inclined towards Social Awareness, Freedom of Change and Digital Transformation, we are here to provide a
                platform that gives them the voice to make a credible impact in society.
              </p>
            </div>
            <div className="col-md-6  order-1 order-lg-2">
              <img src="images/youth-img1.jpg" className="w-100 rounded-4" alt="" />
            </div>
          </div>

          <div className="row align-items-center justify-content-between mb-80">
            <div className="col-md-6">
              <img src="images/youth-girl.jpg" className="w-100 rounded-4" alt="" />
            </div>
            <div className=" col-md-6 mb-5 mb-md-0">
              <div className="d-flex align-items-start justify-content-start">
                <div>
                  <span className="section-title-border"></span>
                  <h2 className="section-title fs-1 mb-0">What we do?</h2>
                </div>
              </div>
              <p>
                The team of Yuvamanthan has planned to create an open platform for youth to start discussions and open communications via multiple
                channels to connect, contribute and change.
              </p>
              <p>
                According to recent findings, it is inferred that youngsters who possess diverse qualities like creativity, and logical intellect can
                have a more positive influence over the masses.
              </p>
              <p>
                Moreover, these findings have further encouraged in growth and development of certain proactive interventions and initiatives to
                strengthen youth’s capacity to aspire and inspire.
              </p>

              <p className="mb-5 fw-bold">With that in mind, take a look at what we have to offer the youth of today:</p>
            </div>
          </div>

          <div className="row g-3 g-lg-4 g-xl-4">
            {/* <!-- Confidence Building --> */}
            <div className="col-md-6 col-lg-6">
              <h3 className="fs-2">
                {/* <span className="text-primary">01.</span> */}
                Confidence Building
              </h3>
              <p className=" fs-6">
                By actively participating in forum discussions, social media events and collaborative workshops, you will certainly take a giant leap
                forward in building and developing your confidence.
              </p>
            </div>
            {/* <!-- Personality Development --> */}
            <div className="col-md-6 col-lg-6">
              <h3 className="fs-2">
                {/* <span className="text-primary">02.</span> */}
                Personality Development
              </h3>
              <p className="fs-6">
                Who doesn't like a person who reflects calibre with a strong personality? By being present and active in our daily challenges on
                youth-centric activities, you are sure to polish your potential towards a better version of yourself.
              </p>
            </div>
            {/* <!-- Awareness in your Pocket – --> */}
            <div className="col-md-6 col-lg-6">
              <h3 className="fs-2">
                {/* <span className="text-primary">03.</span> */}
                Awareness in your Pocket
              </h3>
              <p className="fs-6">
                Thanks to the ongoing digital revolution, becoming more alert about the current happenings is no more a task. Youngistaan tribe too
                will have access to all the latest updates around the nation on various headlines to maintain a sense of awareness.
              </p>
            </div>
            {/* <!-- Speakers of Tomorrow – --> */}
            <div className="col-md-6 col-lg-6">
              <h3 className="fs-2">
                {/* <span className="text-primary">04.</span> */}
                Speakers of Tomorrow
              </h3>
              <p className="fs-6 mb-0">
                As a youth of today it is important to voice your opinion on matters that have national relevance. With our association, you will
                experience live debates, mock summit sessions and more to inspire the speaker within to start the dialogue.
              </p>
            </div>

            {/* <!-- Social Storytelling – --> */}
            <div className="col-md-6 col-lg-6">
              <h3 className="fs-2">
                {/* <span className="text-primary">04.</span> */}
                Social Storytelling
              </h3>
              <p className="fs-6 mb-0">
                We believe there’s a story in every bit of thought you think, a word you speak. With us, you get to choose and showcase your story via
                multiple social media platforms like IG, FB, Twitter, Snapchat, etc
              </p>
            </div>
          </div>
          <blockquote className="mt-4">
            <p className="text-center">
              All in all, we at Yuvamanthan are just mere engines but with you as our drivers,{' '}
              <span className="fw-bold">together we can create a global community</span> that creates and shares a{' '}
              <span className="fw-bold">voice that matters</span>.
            </p>
          </blockquote>
        </div>
        {/* <!-- background shape --> */}
        <img className="img-fluid about-bg-shape" src="./images/backgrounds/about-us-3-bg.png" alt="shape" />
      </section>
      {/* <!-- /about us --> */}
      {/* topics */}
      <section className="section position-relative">
        <div className="container">
          <div className="row justify-content-between mb-80">
            <div className=" col-md-6 mb-5 mb-md-0">
              <span className="section-title-border"></span>
              <h2 className="section-title fs-1">Trending Topics</h2>
              <p>
                This space will be dedicated to exceptional talking topics that cater to youth’s interests. If the idea of the community is to provide
                a forum, then here we will have topics and explanations that would allow members to participate and engage freely and actively.
              </p>
              <p className="fw-bold">Some of the mock topics with few starting points to break the ice for forum discussion that is as follows.</p>
            </div>
            <div className="col-md-6">
              <img src="images/modelg20/main.jpg" className="w-100 rounded-4" alt="" />
            </div>
          </div>
          {/* <div className="row justify-content-between mb-80">
                <div className="col"> */}
          {/* Cyber Safety */}
          {/* <div className="card mb-3" style={{ maxWidth: '540px' }}>
                        <div className="row g-0">
                            <div className="col-md-4">
                                <img src={
                                    process.env.REACT_APP_MAIN_URL + "images/topics/cybersafety.jpg"
                                }
                                    className="img-fluid rounded-start"
                                    alt="..." />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">Cyber Safety</h5>
                                    <p className="card-text">
                                        1 out of 5 young people has experienced cyber trolling or abuse online
                                    </p>
                                    <p className="card-text">
                                        Almost 95% of young people say they feel safe online while around 4.2 million users have
                                        experienced hateful speech and bullying online.

                                    </p>
                                </div>
                            </div>
                        </div>
                    </div> */}

          {/* Post-Pandemic Culture */}

          {/* </div> */}
          {/* </div> */}
          <div className="row g-3 g-lg-4 g-xl-5">
            {/* <!-- Cyber Safety --> */}
            <div className="col-md-6 col-lg-6 mb-4 mb-md-0">
              <h3 className="fs-2">
                {/* <span className="text-primary">01.</span> */}
                Cyber Safety
              </h3>
              <ul className="mb-3">
                <li>
                  <i className="bi bi-arrow-right text-primary me-2"></i>1 out of 5 young people has experienced cyber trolling or abuse online
                </li>
                <li>
                  <i className="bi bi-arrow-right text-primary me-2"></i>
                  Almost 95% of young people say they feel safe online while around 4.2 million users have experienced hateful speech and bullying
                  online.
                </li>
              </ul>
              <p className=" fs-6">
                If these facts are to be believed, then how far is the narrative of having great cyber security measures justified?
              </p>
            </div>
            {/* <!-- Post-Pandemic Culture --> */}
            <div className="col-md-6 col-lg-6 mb-4 mb-md-0">
              <h3 className="fs-2">
                {/* <span className="text-primary">01.</span> */}
                Post-Pandemic Culture
              </h3>
              <ul className="mb-3">
                <li>
                  <i className="bi bi-arrow-right text-primary me-2"></i>
                  Almost 1/3 of the Indians faced joblessness or remote working due to Covid19
                </li>
                <li>
                  <i className="bi bi-arrow-right text-primary me-2"></i>
                  Entire corporate structure suffered massive financial and labour loss in only 3 months under Covid lockdowns
                </li>
                <li>
                  <i className="bi bi-arrow-right text-primary me-2"></i>
                  Post-Pandemic, remote working set-up, mental stress and lifestyle challenges have received some traction
                </li>
              </ul>
            </div>
            {/* <!-- G20 in India --> */}
            <div className="col-md-6 col-lg-6 mb-4 mb-md-0">
              <h3 className="fs-2">
                {/* <span className="text-primary">01.</span> */}
                G20 in India
              </h3>
              <p className=" fs-6">
                As India bags the 2023 G20 presidency, there are a wide array of socio-political, financial and economic agendas that will take centre
                stage.
              </p>
              <ul className="mb-3">
                <li>
                  <i className="bi bi-arrow-right text-primary me-2"></i>
                  Digital Transformation
                </li>
                <li>
                  <i className="bi bi-arrow-right text-primary me-2"></i>
                  Sustainable transformation
                </li>
                <li>
                  <i className="bi bi-arrow-right text-primary me-2"></i>
                  Startup India
                </li>
                <li>
                  <i className="bi bi-arrow-right text-primary me-2"></i>
                  One Earth, One Family, One Future – the theme of G20
                </li>
              </ul>
              <p className=" fs-6">
                Youth can take up various G20-related issues as debate topics or mock summit simulations to address these matters and form creative
                solutions for the Leader’s meet.
              </p>
            </div>
            {/* <!-- Education For All --> */}
            {/* <div className="col-md-6 col-lg-6 mb-4 mb-md-0">
              <h3>
                
                Education For All
              </h3>
              <p className=" fs-6">
                As education is the foremost necessity for every individual,
                there are about 1.5 million illiterates in the country. With the
                government having initiated new schemes and laws in the scope of
                educational enrichment, why is illiteracy still looming over the
                country?
              </p>
            </div> */}
            {/* <!-- Women's Empowerment --> */}
            <div className="col-md-6 col-lg-6 mb-4 mb-md-0">
              <h3 className="fs-2">
                {/* <span className="text-primary">01.</span> */}
                Women's Empowerment
              </h3>
              <p className=" fs-6">
                There’s nothing a woman can’t do or be, that is the time old reiterated quote. However, even today, they are prohibited from growing
                and having a flourishing life for themselves.
              </p>
              <p className=" fs-6">
                Names like Falguni Nayar (Nykka), Priyanka Chopra Jonas, and Indra Nooyi (PepsiCo) have laid a formidable example for young females
                across the country to empower their lives and become more than a household existence. So, how are we doing to strengthen the narrative
                of women’s empowerment?
              </p>
            </div>
            {/* <!-- Future of Work --> */}
            <div className="col-md-6 col-lg-6 mb-4 mb-md-0">
              <h3 className="fs-2">
                {/* <span className="text-primary">01.</span> */}
                Future of Work
              </h3>
              <p className=" fs-6">
                The Indian economy is one of the fastest-growing in the world and is on a high growth trajectory. India made a huge leap last year,
                climbing 30 spots to land at position 100 in the World Bank's ease of doing business assessment. These are important developments that
                bode well for the prognosis of overall development. However, as we discuss India's growth story, there are a number of obstacles to
                overcome
              </p>
            </div>
            {/* <!-- Peacebuilding and Reconciliation --> */}
            <div className="col-md-6 col-lg-6 mb-4 mb-md-0">
              <h3 className="fs-2">
                {/* <span className="text-primary">01.</span> */}
                Peacebuilding and Reconciliation
              </h3>
              <p className=" fs-6">
                India has been a prominent T/PCC (Troop/Police Contributing Country) to UN peacekeeping efforts and an active PBC member. Indian
                peacebuilding initiatives are fundamentally based on respect for member states' national goals and sense of ownership. Through its
                enormous development partnerships with nations of the Global South, India has always played a positive and vital role in the framework
                of peacebuilding. In post-conflict scenarios, India continues to support nations through bilateral and multilateral fora by giving
                sizable grants and lenient loans.
              </p>
            </div>
            {/* <!--Climate change --> */}
            <div className="col-md-6 col-lg-6 mb-4 mb-md-0">
              <h3 className="fs-2">
                {/* <span className="text-primary">01.</span> */}
                Climate change
              </h3>
              <p className=" fs-6">
                The three primary components of India's 2022 National Development Council are: A target of achieving 45% of installed electric power
                capacity from non-fossil fuel sources by 2030; a target of achieving 50% of installed electric power capacity from non-fossil fuel
                sources by 2030; and a target of creating a carbon sink of 2.5 to 3 GtCO2e through increased forest and tree cover by 2030. India
                stated in its revised NDC that it will need international assistance to reach its goal of 50% non-fossil capacity, yet under its
                existing policies, it is already on course to reach 60–67% by 2030.
              </p>
            </div>
            {/* <!-- Health, Well-Being and Sports --> */}
            <div className="col-md-6 col-lg-6 mb-4 mb-md-0">
              <h3 className="fs-2">
                {/* <span className="text-primary">01.</span> */}
                Health, Well-Being and Sports
              </h3>
              <p className=" fs-6">
                The revolutionary changes in Indian health policy show how committed the government is to the welfare and health of its people, as
                well as how well-versed it is in political economy. By promptly identifying and acknowledging the problems, significant progress has
                been accomplished during the past seven years. To find workable policy solutions and policies, an analytical and problem-solving
                methodology is applied. Once produced, these solutions and policies are accompanied by an enabling environment to ensure
                sustainability. Thereafter, a political opportunity is identified to introduce the policy, providing a platform with defined
                trajectories for political attention. Achievements of recent interventions such as the Free Drugs and Diagnostics Service Initiative
                (FDDSI), Swachh Bharat Mission (SBM), Pradhan Mantri Bhartiya Janaushadhi Pariyojana (PMBJP), the four pillars of Ayushman Bharat-
                i.e., Ayushman Bharat- Health and Wellness Centre (AB-HWC), Ayushman Bharat- Jan Arogya Yojana (AB PM-JAY), Ayushman Bharat- Digital
                Mission (ABDM) and Pradhan Mantri Ayushman BharatHealth Infrastructure Mission (PM-ABHIM) and tied grants under the Fifteenth Finance
                Commission (FC-XV) depict India’s progress towards achieving the National Health Policy (NHP) 2017 targets, Sustainable Development
                Goals (SDGs) and Universal Health Coverage (UHC).
              </p>
            </div>
            {/* <!-- Shared Future --> */}
            <div className="col-md-6 col-lg-6 mb-4 mb-md-0">
              <h3 className="fs-2">
                {/* <span className="text-primary">01.</span> */}
                Shared Future
              </h3>
              <p className=" fs-6">
                With one of the youngest populations among the ancient civilizations and possibly the most lively and diversified democracy is India.
                India's present population is made up of more than 50% people under 25 and more than 65% people under 35. Even if the world's
                population is ageing, our younger demographic profile can be useful both domestically and in a broader global perspective. India's G20
                Presidency provides India's youngsters with the highly sought-after opportunity to serve as ambassadors for international causes. The
                G20's Y20 or Youth 20 engagement group will harness the power of young people to forge a worldwide consensus on pressing issues facing
                humanity.
              </p>
            </div>
            {/* <!-- LiFE --> */}
            <div className="col-md-6 col-lg-6 mb-4 mb-md-0">
              <h3 className="fs-2">
                {/* <span className="text-primary">01.</span> */}
                LiFE
              </h3>
              <p className=" fs-6">
                The honourable Prime Minister Narendra Modi created the "Lifestyle for Environment" or LiFE project, a campaign with a primary focus
                on living sustainably. At the 26th Conference of the Parties on Climate Change (COP26), which took place in Glasgow in 2021, it was
                officially launched worldwide.
              </p>
              <p>
                LiFE intends to use the power of social networks to change societal attitudes around climate. The Mission intends to establish and
                support a worldwide community of people known as "Pro-Planet People" (P3) who will all be dedicated to embracing and promoting
                environmentally sustainable lives. The Mission aims to establish an ecosystem through the P3 community that will support and enable
                environmentally responsible behaviour to become self-sustaining.
              </p>
            </div>
            {/* <!-- NEW EDUCATION POLICY (NEP) 2020 --> */}
            <div className="col-md-6 col-lg-6 mb-4 mb-md-0">
              <h3 className="fs-2">
                {/* <span className="text-primary">01.</span> */}
                NEW EDUCATION POLICY (NEP) 2020
              </h3>
              <p className=" fs-6">
                In order to become a worldwide force, India is poised to make significant reforms to its educational system. The most recent
                modifications were implemented to end 34 years of educational policies. The new approach, which is currently being implemented, places
                a focus on online learning, extends the school day, and discourages rote memorization.
              </p>
              <p>
                With an emphasis on marginalized communities, the new National Education Policy (NEP 2020) aims to increase education's inclusivity,
                equity, and accessibility for all. Additionally, it places a strong emphasis on the acquisition of 21st-century abilities including
                creativity, critical analysis, and problem-solving. The policy also permits the creation of new organizations like digital
                universities and the use of technology to enhance education.
              </p>
            </div>
            {/* <!-- Education for All --> */}
            <div className="col-md-6 col-lg-6 mb-4 mb-md-0">
              <h3 className="fs-2">
                {/* <span className="text-primary">01.</span> */}
                Education for All
              </h3>
              <p className=" fs-6">
                Over the years, the federal and state governments have diligently worked to implement a number of programmes and laws to increase
                access to education for all citizens.
              </p>
              <p>
                It became a fundamental right for every child between the ages of 6 and 14 to attend 8 years of obligatory elementary education thanks
                to the passage of the Right of Children to Free and Compulsory Education (RTE) statute in 2009. The Indian educational system has made
                significant strides over the past few decades and is still expanding.
              </p>
            </div>
            {/* <!-- Start ups --> */}
            <div className="col-md-6 col-lg-6 mb-4 mb-md-0">
              <h3 className="fs-2">
                {/* <span className="text-primary">01.</span> */}
                Start ups
              </h3>
              <p className=" fs-6">
                Since the "Startup India" initiative started in 2016–17, startups in India have experienced tremendous growth owing to the assistance
                and direction of the Indian government.
              </p>
              <p>
                The government has made sure that PM Modi's aim for "Digital revolution in India" is being successfully carried out, from offering
                students up to 79 courses to supporting new startup initiatives with financial aid.
              </p>
              <p>Today, India boasts more than 80,000 active businesses, 109 unicorns, and a global economy worth about $274 billion.</p>
            </div>
            {/* <!-- Digital Transformation --> */}
            <div className="col-md-6 col-lg-6 mb-4 mb-md-0">
              <h3 className="fs-2">
                {/* <span className="text-primary">01.</span> */}
                Digital Transformation
              </h3>
              <p className=" fs-6">
                There is verifiable proof of this digital transition after eight years of digital government. India currently has more than 80 crore
                internet users, 133 crore Aadhaar cards, more than 75 crore cell phones, 4G, and is rapidly moving toward 5G. Most importantly, it has
                among the lowest data rates in the entire world. India's advancement is the consequence of PM Modi's vision, which he presented during
                the July 1, 2015, inauguration of Digital India. He said, " In this digital era, we have the chance to improve people's lives in ways
                that were difficult to envision only a few decades ago. Technology, in my opinion, can empower people and act as a link among
                opportunity and hope."
              </p>
            </div>
            {/* <!-- CDRI --> */}
            <div className="col-md-6 col-lg-6 mb-4 mb-md-0">
              <h3 className="fs-2">
                {/* <span className="text-primary">01.</span> */}
                CDRI
              </h3>
              <p className=" fs-6">
                In its initial proposal, India described CDRI as controlling governance that takes diligent action to reduce infrastructure damages
                caused by disasters. The goal was to create a multi-level, globally integrated platform that encourages smart catastrophe resilience
                and improves resources for infrastructure sectors to prevent them. India will now carry on the CDRI mandate to promote the broader
                terms of sustainable development goals for the world as the G20's rotating president in 2023.
              </p>
            </div>

            {/* *There can be other topics in this section added after revisions */}
          </div>
        </div>
      </section>
      {/* topics */}
      {/* Youth Gallery */}
      <section className=" py-5 position-relative layer-bg">
        <div className="container">
          <h3 className="text-white fs-2">Youth Gallery</h3>
          <p className="col-lg-7 text-white">
            Showcase your talent, culture or fashion. Post us your pics, videos and reels on <br />{' '}
            <a href="mailto:YouthGallery@yuvamanthan.org">
              <i className="bi bi-envelope"></i> YouthGallery@yuvamanthan.org
            </a>{' '}
            and we will feature them in this section.
          </p>
          <YouthSwiper />
        </div>
      </section>
      {/* Youth Gallery */}
      {/* Social Wall of Fame */}
      <section className="section position-relative pb-0">
        <div className="container">
          <h2 className="fs-2">Social Wall of Fame</h2>
          <p>
            {/* In this space, we will put up 2-3 social media interface banners
            like IG, FB, and Twitter. Here we will post the latest and trending
            carousel posts or tweets with a comment section to allow youth
            engagement and interest. */}
          </p>
          <p>
            {/* Also, a separate section will be made under this space in a graphic
            design creative to allow youth to post pictures, selfies or videos
            on trending topics or any contest-related result images. */}
          </p>

          <h3 className="text-warning fs-6">COMING SOON.....</h3>
        </div>
      </section>
      {/* Social Wall of Fame */}
      {/* Youth Gallery */}
      <section className="section position-relative">
        <div className="container">
          <h3 className="fs-2">Youth Star of the Week</h3>
          <h3 className="text-warning fs-6">COMING SOON.....</h3>

          {/* Showcase your talent, culture or fashion. Post us your pics, videos and reels on
                YouthGallery@yuvamanthan.org and we will feature them in this section. */}
        </div>
      </section>
      {/* Youth Gallery */}
      <BlogsSwiper />
      {/* Upcoming Events and Initiatives
       */}
      <section className="section position-relative">
        <div className="container">
          <div className="row">
            <div>
              <span className="section-title-border mx-auto"></span>
              <h2 className="section-title text-center fs-2">Upcoming Events and Initiatives</h2>
            </div>
          </div>
          <div className="row justify-content-center g-4">
            <div className="col-12 col-md-6 col-lg-4">
              <div className="calendar-box p-3 border rounded h-100 border-warning">
                <div className="d-flex align-items-center h-100">
                  <div className="p-relative">
                    <img src="./images/icons/calendar.png" alt="" className="icon-calendar" />
                    <div className="p-absolute w-100 h-100 d-flex align-items-center justify-content-center" style={{ top: 0, left: 0 }}>
                      <h5 className="text-center lh-1">
                        Jan
                        <br />
                        <span className="fs-2">10</span>
                      </h5>
                    </div>
                  </div>
                  <div className="px-3">
                    <span className="section-title-border mb-2"></span>
                    <p className="text-dark lh-sm fs-6 fw-semibold">Youth Participation events line up in G20 summit 2023</p>
                    <span>Last updated 23 mins ago</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <div className="calendar-box p-3 border rounded h-100 border-warning">
                <div className="d-flex align-items-center h-100">
                  <div className="p-relative">
                    <img src="./images/icons/calendar.png" alt="" className="icon-calendar" />
                    <div className="p-absolute w-100 h-100 d-flex align-items-center justify-content-center" style={{ top: 0, left: 0 }}>
                      <h5 className="text-center lh-1">
                        Jan
                        <br />
                        <span className="fs-2">15</span>
                      </h5>
                    </div>
                  </div>
                  <div className="px-3">
                    <span className="section-title-border mb-2"></span>
                    <p className="text-dark lh-sm fs-6 fw-semibold">21-day challenge under LiFE initiative</p>
                    <span>Last updated 28 mins ago</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <div className="calendar-box p-3 border rounded h-100 border-warning">
                <div className="d-flex align-items-center h-100">
                  <div className="p-relative">
                    <img src="./images/icons/calendar.png" alt="" className="icon-calendar" />
                    <div className="p-absolute w-100 h-100 d-flex align-items-center justify-content-center" style={{ top: 0, left: 0 }}>
                      <h5 className="text-center lh-1">
                        FEB
                        <br />
                        <span className="fs-2">25</span>
                      </h5>
                    </div>
                  </div>
                  <div className="px-3">
                    <span className="section-title-border mb-2"></span>
                    <p className="text-dark lh-sm fs-6 fw-semibold">
                      Workshops, seminars on issues like women empowerment, startup India, Jan Bhagidaari
                    </p>
                    <span>Last updated 10 mins ago</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <div className="calendar-box p-3 border rounded h-100 border-warning">
                <div className="d-flex align-items-center h-100">
                  <div className="p-relative">
                    <img src="./images/icons/calendar.png" alt="" className="icon-calendar" />
                    <div className="p-absolute w-100 h-100 d-flex align-items-center justify-content-center" style={{ top: 0, left: 0 }}>
                      <h5 className="text-center lh-1">
                        MAR
                        <br />
                        <span className="fs-2">22</span>
                      </h5>
                    </div>
                  </div>
                  <div className="px-3">
                    <span className="section-title-border mb-2"></span>
                    <p className="text-dark lh-sm fs-6 fw-semibold">Post a Selfie with a Plant as part of Earth Day celebration contest and more</p>
                    <span>Last updated 3 mins ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Upcoming Events and Initiatives*/}
      {/* How to Join the Community? */}
      <section id="scrollspyTestimonial" className="section py-0 bg-light">
        <div className="container-fluid p-0">
          <div className="row">
            <div className="col-12 col-lg-6">
              <img src="/images/banner/teacher-with-student.webp" alt="" className="d-block w-100" />
            </div>
            <div className="col-12 col-lg-6 text-center">
              <div className="p-3 p-md-4 h-100">
                <div className="d-flex flex-column justify-content-center h-100 align-items-center text-center">
                  <div>
                    <span className="section-title-border border-center"></span>
                    <h2 className="text-dark fs-2" style={{ color: 'white' }}>
                      How to Join the Community?
                    </h2>
                    <p className="fs-4">
                      Hi Youngistaan groupie, if you’re looking for a platform that listens to you and respects your voice, then you are at the right
                      spot.
                    </p>
                    <a href="/registration" className="btn btn-primary">
                      <span className="text-white fs-6">Sign up or register with us here!</span>
                    </a>
                    <p>See you on the other side!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* How to Join the Community? */}
      <Faq />
    </div>
  );
};

export default Youth;
