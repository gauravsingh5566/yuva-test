import React from 'react';
import BreadCrumb from 'layout/BreadCrumb';
import { Link } from 'react-router-dom';

const CampusAmbass = () => {
  return (
    <div>
      {/* <!-- page title --> */}
      <BreadCrumb heading={'G20 Campus Sherpa Programme'} />
      {/* <!-- /page title --> */}
      <section className="section container">
        <h3>G20 Campus Sherpa Programme</h3>
        <p className="text-dark fs-5 mb-3">
          In line with the Model G20 Programme, we want to engage enthusiastic youth from schools, colleges and universities to become 'Campus
          Sherpas'. Each institution will have one campus sherpa who will volunteer to undertake a set of activities to promote, manage and execute
          Model G20 Programmes within their campus.
        </p>
        <h4>How do you become a Sherpa?</h4>
        <p className="text-dark fs-5">
          Anyone who has the will to lead the herd is capable of becoming a Campus Sherpa! We need enthusiastic students who are experienced in
          managing and organizing events inside their campus or outside their campus. Anyone who is eager to gain practical knowledge and implement it
          to create a simulation of the Group of Twenty can opt for this Programme.
        </p>
        <p className="text-dark fs-5">
          In order to register as a Sherpa, one has to go through an application process. The process comprises a comprehensive registration form
          pertaining to the applicant’s details. An applicant is also required to acquire a minimum of 5 students from the same institution who will
          act as volunteers for the Programme.
        </p>
        <p className="text-dark fs-5 fw-semibold">Before one signs up for being a Sherpa, one needs to have the G20 Genius Certificate.</p>
        <div className="row p-2">
          <div
            className="col col-lg-5 card p-lg-5 p-3 mb-5 rounded-4"
            style={{
              backgroundImage: 'linear-gradient(90deg,#198cd3,#37c2fd)',
            }}>
            <div className="card-backicons">
              <img
                src="images/icons/reward.png"
                className="w-25 position-absolute z-0"
                alt=""
                style={{
                  top: '5px',
                  right: '5px',
                  opacity: '90%',
                }}
              />
            </div>
            <div className="content" style={{ zIndex: 1 }}>
              <div>
                <h2 className="card-title" style={{ color: '#fff' }}>
                  Get Certified!
                </h2>
                <p className="fs-5 fw-lighter text-white">As a G20 Genius. Your first step towards knowing everything about G20 India. </p>
              </div>
              <div className="d-flex align-items-center">
                <Link to="/course/detail/g20-genius-certificartion-course" className="btn btn-light-outline hover-ripple me-5">
                  Get Certified
                </Link>
              </div>
            </div>
          </div>
        </div>
        <p className="text-dark fs-5">
          The G20 Genius Certificate is a unique educational tool that treats the background, role, activities, goals, and challenges of the G20 as
          pedagogical knowledge. The interactive learning orientation lasts 45 minutes and covers all the important information about the G20. It is
          designed specifically for young people, making it easy for them to grasp and discover the information they need without growing tired. It
          engages the user with amusing animations, audio-visuals, quizzes, Q&As, and DIY exercises. By placing an emphasis on presenting India's
          initiatives and culture to the rest of the world, it seeks to produce societal influencers and torch bearers of the G20 Programme known as
          "Vasudhaiva Kutumbakam" and subtly affect the collective conscience.
        </p>
        <h4>What does a Sherpa do?</h4>
        <ul className="list-group border-none  mt-3">
          <li className="list-group-item border-0  ps-0">
            <span className="p-2 bg-primary clip-cicle text-white mt-2">
              <i className="bi bi-arrow-right"></i>
            </span>{' '}
            <span className="ps-2 fs-5">A sherpa has to orchestrate and organize a simulation of the G20 on their campus.</span>
          </li>
          <li className="list-group-item border-0  ps-0">
            <span className="p-2 bg-primary clip-cicle text-white mt-2">
              <i className="bi bi-arrow-right"></i>
            </span>{' '}
            <span className="ps-2 fs-5">Along with the simulation, they are required to organize youth inspired events all year round.</span>
          </li>

          <li className="list-group-item border-0  ps-0">
            <span className="p-2 bg-primary clip-cicle text-white mt-2">
              <i className="bi bi-arrow-right"></i>
            </span>{' '}
            <span className="ps-2 fs-5">
              Moreover, all permissions and interactions are communicated via the campus sherpa to us and to the college management.
            </span>
          </li>
          <li className="list-group-item border-0  ps-0">
            <span className="p-2 bg-primary clip-cicle text-white mt-2">
              <i className="bi bi-arrow-right"></i>
            </span>{' '}
            <span className="ps-2 fs-5">
              One will also gain knowledge on business relations and marketing, while organizing for funds, sponsorship, and volunteers for the events
              on campus.
            </span>
          </li>
          <li className="list-group-item border-0  ps-0">
            <span className="p-2 bg-primary clip-cicle text-white mt-2">
              <i className="bi bi-arrow-right"></i>
            </span>{' '}
            <span className="ps-2 fs-5">
              One will also work as the outreach incharge for the campus. For instance, a sherpa will spread awareness about the upcoming events to
              attain maximum participation.
            </span>
          </li>
          <li className="list-group-item border-0  ps-0">
            <span className="p-2 bg-primary clip-cicle text-white mt-2">
              <i className="bi bi-arrow-right"></i>
            </span>{' '}
            <span className="ps-2 fs-5">It goes without saying that the Sherpas will assist in conducting the National Model G20.</span>
          </li>
          <li className="list-group-item border-0  ps-0">
            <span className="p-2 bg-primary clip-cicle text-white mt-2">
              <i className="bi bi-arrow-right"></i>
            </span>{' '}
            <span className="ps-2 fs-5">They will help the staff in planning and executing the yearly summit.</span>
          </li>
          <li className="list-group-item border-0  ps-0">
            <span className="p-2 bg-primary clip-cicle text-white mt-2">
              <i className="bi bi-arrow-right"></i>
            </span>{' '}
            <span className="ps-2 fs-5">
              In conclusion, they will participate as volunteers, speakers, and student delegates in the various events and the annual summit
            </span>
          </li>
        </ul>
        <h4 className="fs-1 mt-4">Why become a Sherpa?</h4>
        <h4>● International Relations</h4>
        <p className="fs-5 text-dark">
          An understanding of the international ties between the constituent members is necessary for everyone partaking in the Model G20 summit,
          especially a Campus Sherpa. International relations refer to the study of the relations of states with each other and with international
          organizations and sub-national entities. Delegating as a member state helps one in learning and understanding such ties and being able to
          find solutions towards grievances. A campus sherpa learns the ties to create awareness strategies for their students.
        </p>
        <h4>● Foreign Affairs</h4>
        <p className="fs-5 text-dark">
          A Campus Sherpa in the G20 summit is required to have a good grasp on Foreign Affairs pertaining to the member state they are representing.
          Foreign affairs refer to issues concerning the member state's interactions with other countries overseas. It is vital for a delegate to be
          aware of the member state’s foreign affairs.
        </p>
        <p className="fs-5 text-dark">
          With over 50% of India’s population being below the age of 25, the government has initiated multiple Know India Programmes (KIPs) to educate
          the youth about its external affairs. Moreover, the Model G20 convention offers a unique forum for learning about international affairs and
          its consequences.
        </p>
        <h4>● National Affairs</h4>
        <p className="fs-5 text-dark">
          It is well known that in order to effectively represent a member state, a delegate should be conversant about its internal issues. Being a
          delegate one gets to learn an enormous amount about the member state’s policies, issues, and socio-economic stature.
        </p>
        <p className="fs-5 text-dark">
          A good understanding of current affairs is imperative to succeed in any competitive exam. Over 11.5 lakh students applied for UPSC 2022
          exam. Model G20 is a great opportunity to strengthen one’s internal current affairs and prepare for these competitive exams in a jubilant
          manner.
        </p>
        <h4>● Macroeconomics</h4>
        <p className="fs-5 text-dark">
          The G20 brings together the world's major and systemically important economies. India is on its way to becoming the fifth largest economy in
          the world. Over time, a delegate develops a thorough awareness of the macroeconomic ties involving many countries, not only India. This will
          enlighten one’s comprehension of economic relationships and what determines the economic stature of a country.
        </p>
        <p className="fs-5 text-dark">
          With countries such as Sri Lanka, Lebanon, Russia, and Zambia drowning in economic crises, the delegates have an opportunity to present
          their opinions and find world class solutions.
        </p>
        <h4>● Youth Awareness and Networking</h4>
        <p className="fs-5 text-dark">
          The Model G20 acts as an awareness Programme for the youth of India. It enables the youth to dive deep into socio-political matters and
          fetch for solutions. This process creates a sense of responsibility as an individual and boosts awareness about what is happening around
          them.
        </p>
        <p className="fs-5 text-dark">
          This conference collects thousands of people from various walks to come together and deliberate. It acts as a pivot to enlarge one's
          network. It is a stepping stone for those who wish to expand their social circuit and leave a mark.
        </p>
        <h4>● Diplomacy</h4>
        <p className="fs-5 text-dark">
          War is a failure of diplomacy and thus, it is extremely crucial for all member states to be diplomatic in their stance while looking out for
          themselves. While representing a member state, one learns the art of diplomacy- a trait useful for a lifetime.
        </p>
        <p className="fs-5 text-dark">
          Diplomats try to help their own country, encourage cooperation between nations, and maintain peace. This opportunity enables one to have
          confidence, patience, the ability to listen, the openness of mind and heart to compromise, and the drive to complete the work demanded.
        </p>
        <h4>● Public Speaking</h4>
        <p className="fs-5 text-dark">
          The act of speaking face to face to a live audience often brings shivers to most. It is an art not inherited to all, but an art to be
          acquired. Being a Campus Sherpa in the Model G20 will give you plenty of opportunity to burst your bubble and face your fears.
        </p>
        <p className="fs-5 text-dark">
          Individuals with experience in speaking in front of groups are said to be better at interviews in the future. In the summit each participant
          has to put forth their stance and diplomatically approach the issues presented to them. One has to debate, dialogue, and deliberate, in
          order to make the events successful..
        </p>
        <h4>● Research Analysis</h4>
        <p className="text-dark fs-5">
          It is important to be aware of what one is hosting. Being a campus sherpa, one has to have a rough idea about trends, political and modern,
          in order to attract large numbers. Thus a thorough understanding of it is required.
        </p>
        <p className="fs-5 text-dark">
          Research and Development is a part of every industry. At the end of the conference, not only will you have gained immense knowledge, you
          will have improved your research and analytical skills, which will definitely help you in the future.
        </p>
        <h4>● Communication Skills</h4>
        <p className="fs-5 text-dark">
          Speaking publicly is one thing, but communicating your viewpoints to people is another. The process of voicing your opinions to safeguard
          your plans of action and then guiding the volunteers towards your idea creates great opportunities to work on your communicating skills.
        </p>
        <p className="fs-5 text-dark">
          Most HR employers have stressed over the importance of good communication skills during an interview. Good communication and interpersonal
          skills improve the way one operates through their life. Lobbying during and after a committee session is vital for your victory and prepares
          you for proper communication after..
        </p>
        <h4>● Leadership Skills</h4>
        <p className="fs-5 text-dark">
          Hosting a summit of such stature requires leadership skills. One needs to manage a team and work with a diverse group of people. This
          sharpens your skills to lead a community of individuals.
        </p>
        <p className="fs-5 text-dark">
          As a Sherpa, convincing people to be on your team also instills leadership qualities within you. Assuring other members that their concerns
          will be raised while being the author of one’s own resolution requires a sense of leadership. All these experiences prepare you for the
          future in a complete manner.
        </p>
        <h4>● Event Management</h4>
        <p className="fs-5 text-dark">
          The process of conducting the conference on campus is not a small task but is of first nature to our Campus Sherpas. It is a series of
          decisions that lead up to the summit. It covers multiple aspects of managing an event of such scale and helps you in problem solving
          abilities. At the end of the conference as a Sherpa, you will be confident in managing individuals and events that will always come handy in
          the future.
        </p>
        <h4>● Certifications</h4>
        <p className="fs-5 text-dark">
          Most importantly, all Sherpas will get certifications that will attest for the above mentioned skill set. They also reflect the hardwork and
          knowledge incorporated in this tenure. With such legitimate certifications, anybody’s resume will stand out.
        </p>
        <Link to={'/campussherpa-registration'} className="btn btn-primary hover-ripple">
          Apply here to become a Campus Sherpa
        </Link>
      </section>
    </div>
  );
};

export default CampusAmbass;
