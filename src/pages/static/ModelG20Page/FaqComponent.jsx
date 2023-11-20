import React from 'react';

const faqs = [
  {
    id: 1,
    q: 'What does G20 stand for?',
    a: 'The Group of Twenty (G20) is one of the premier forums for international economic cooperation. It holds meetings to discuss the most pressing global matters and formulate reforms to strengthen global architecture.',
  },
  {
    id: 2,
    q: 'What is the purpose of the Model G20 Summit?',
    a: 'Model G20 summit is a creative stimulation that mirrors the actual G20 summit gatherings. It is designed by actual G20 experts for the youth to give a phenomenal overview of G20 discussions.',
  },
  {
    id: 3,
    q: 'Why is India in the news for G20 this time?',
    a: 'In December 2022, India bagged the presidency of the G20 summit for 2023. This means that India will steer the G20 agenda for one year with a series of events and host the actual G20 summit of Leaders in October 2023.',
  },
  {
    id: 4,
    q: 'What is the significance of India’s presidency for G20?',
    a: 'India’s G20 Presidency comes at a time when the world is facing social and economic disruptions. The effects of the pandemic gave rise to poverty, unemployment, and inflation. So, world peace, and geopolitical stability are at high stakes. India as a G20 leader can be a bridge for East to West by being a strong diplomatic nation and fast emerging economy.',
  },
  {
    id: 5,
    q: 'Who can participate in the Model G20?',
    a: 'Model G20 summit programme is majorly open for youth who are undergraduates and graduates from any institution or school. Also, young professionals are welcome to participate in the summit as well.',
  },
  {
    id: 6,
    q: 'Can you please explain two tracks of Model G20?',
    a: 'Similar to the real G20 summit, Model G20 has two vital tracks namely, ‘Sherpa Track’ and ‘Finance Track.’ The Sherpa track focuses on socio-political issues like agriculture, climate change, education, etc. whereas the finance track supervises the finance and economic issues like taxation, debts. Delegations are formed to cover both tracks so that a final communique document can be curated.',
  },
  {
    id: 7,
    q: 'How many members need to register to form a Model G20 delegation?',
    a: 'Typically, a delegation needs to have 1-7 members. The main role members are a Sherpa, Sous Sherpa(deputy), Finance Minister, Central Bank Governor, and senior advisors (yaks).',
  },
  {
    id: 8,
    q: 'What are the benefits or perks of participating in the Model G20 summit?',
    a: 'As a delegate in the Model G20 summit you will learn the art of diplomacy, multilateral negotiations, team strategy and collaborations, public speaking. Moreover, you will be entitled to share your views and opinions on issues like education policy, the digital economy, etc. As a participant, you will receive certificates with your team and even more accolades if you’re adjudged as the best delegation in the summit.',
  },
  {
    id: 9,
    q: 'Are there any extra events apart from Model G20 summit meetings for participants?',
    a: 'Of course, the organising team has worked sincerely hard to come up with networking meet-ups for delegates with G20 experts and diplomats. Moreover, there will be a series of cultural events and delectable cuisines from all across the country for you to have a global experience.',
  },
];

const FaqItem = ({ faq, index }) => {
  return (
    <div className="accordion-item border-0">
      <h4 className="accordion-header">
        <button
          className={`accordion-button ${index == 0 ? '' : 'collapsed'} fs-5`}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#accord${index}`}>
          {faq.q}
        </button>
      </h4>
      <div id={`accord${index}`} className={`accordion-collapse collapse ${index == 0 ? 'show' : ''}`} data-bs-parent="#accordionFAQ">
        <div className="accordion-body">
          <p className="text-dark fs-5">{faq.a}</p>
        </div>
      </div>
    </div>
  );
};

const FaqComponent = () => {
  return (
    <section id="scrollspyFaq" className="faq section">
      <div className="container" style={{ maxWidth: '1000px' }}>
        <div className=" text-center">
          <span className="section-title-border mx-auto"></span>
          <h2 className="section-title mb-2">Frequently Asked Questions</h2>
          <p className="mb-5 fs-5">
            Take a look at some of the most asked queries related to model G20 by aspiring participants in this section. If you still have more
            unanswered questions, please <a href="#">contact us</a> here.
          </p>
        </div>
        <div className="accordion" id="accordionFAQ">
          {faqs.map((faq, index) => {
            return <FaqItem key={index} index={index} faq={faq} />;
          })}
        </div>
        <div className="text-center mt-4">
          <button className="btn btn-primary">View More FAQs</button>
        </div>
      </div>
    </section>
  );
};

export default FaqComponent;
