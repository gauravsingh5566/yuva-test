import React from 'react';

const faqs = [
  {
    id: 1,
    q: 'What is Yuvamanthan?',
    a: 'Yuvamanthan community is an open platform that celebrates Indian youth and allows open discussions, participation and collaboration from all youngsters across India on trending subjects.',
  },
  {
    id: 2,
    q: 'What is the significance of having this community? ',
    a: 'Just like any community, youngistaan thrives on friendliness and openness and freedom. However, we take a step further by aligning those morals with the discourse of change. Our members take part in forum activities with the intent to leave an impact that could drive change in society.',
  },
  {
    id: 3,
    q: 'What kind of activities does the Yuvamanthan community associate with?',
    a: 'Our platform invites youth from all corners of the nation to engage and discuss matters of global relevance like digital transformation, women empowerment, etc. Apart from this, we organise mock summit simulations for G20 and social media activities like selfie contests, marketing campaigns, short story competitions and more.',
  },
  {
    id: 4,
    q: 'Who can join this forum?',
    a: 'As a new community that celebrates youth as its significant audience, we invite youth fromall casts, creeds, cultures and backgrounds to be a part of this diverse community. They can be students, graduates, post-graduates, working professionals or non-working individuals or groups.',
  },
  {
    id: 5,
    q: 'How can I join the Yuvamanthan community?',
    a: 'If you like to be a part of our diverse community, all you need to do is register on our youth portal or mail us at www.yuvamanthan.org and you’ll receive further instructions thereupon. For more queries, please contact us here.',
  },
];

const FaqItem = ({ faq, index }) => {
  return (
    <div className="accordion-item border-0">
      <h2 className="accordion-header">
        <button
          className={`accordion-button fs-4 ${index === 0 ? '' : 'collapsed'} fs-3`}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#accord${index}`}>
          {faq.q}
        </button>
      </h2>
      <div id={`accord${index}`} className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`} data-bs-parent="#accordionFAQ">
        <div className="accordion-body">
          <p className="text-dark fs-5">{faq.a}</p>
        </div>
      </div>
    </div>
  );
};

const Faq = () => {
  return (
    <section id="scrollspyFaq" className="faq section">
      <div className="container" style={{ maxWidth: '1000px' }}>
        <div className=" text-center">
          <span className="section-title-border mx-auto"></span>
          <h2 className="section-title mb-2 fs-1">Frequently Asked Questions</h2>
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
        {/* <div className="text-center mt-4">
          <button className="btn btn-primary">View More FAQs</button>
        </div> */}
      </div>
    </section>
  );
};

export default Faq;
