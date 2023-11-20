import React from 'react';
import BreadCrumb from 'layout/BreadCrumb';
import { Button } from '@mui/material';
import { Download } from '@mui/icons-material';

const HealthWell = () => {
  return (
    <div>
      <BreadCrumb heading={'Health, Well-Being, and Sports: Agenda for Youth'} />
      <div className="container py-5">
        <div>
          <span className="section-title-border"></span>
          <h2 className="section-title">Overview</h2>
        </div>
        <p>
          Young people’s involvement in various sectors and divisions of governance can be immensely useful. Some institutions emphasise more on youth
          participation as a basic right if the intent of their work is towards young people’s welfare.
        </p>
        <p>
          On the other end, youth involvement and engagement are often seen as a means to achieve programme goals for communities as well as nations.
          For instance, many countries engaged young people in Covid-19 recovery efforts through national civic services and youth volunteering
          programmes.
        </p>
        <p>
          This showed how young people were vital in ensuring transparency and continuity of daily activities specifically for Covid-stricken
          vulnerable groups.
        </p>
        <p>
          International forums like the G20 have identified and accepted the youth’s role and responsibilities towards bringing global change.
          Similarly, the platform has created a youth-centric engagement group called Youth20 or Y20.
        </p>
        <p>
          The Y20 group allows young leaders across the globe to discuss and negotiate worldly matters and suggest valuable suggestions for the G20
          leaders to take forward. Under India’s G20 presidency for 2023, the Y20 summit will be hosted by India and the key focus will be on global
          youth leadership and partnership.
        </p>
        <p>
          One of the themes for the Y20 India summit is “Health, Well-Being, and Sports: Agenda for Youth.” Take a look at the forthwith section to
          understand the relevance of young people in the sphere of health infrastructure, complete wellness, and sports development.
        </p>
        {/* -------------------------- */}
        <h4 className="mt-4 fs-3">Promoting Digital Health Infrastructure</h4>
        <p>
          Since the outbreak of Covid-19, healthcare delivery systems and infrastructures have undergone rapid transformation. Many global governments
          have largely focused their efforts on younger populations to address their education, employment and upskilling challenges.
        </p>
        <p>
          According to OECD Covid Recovery Report 2022, the majority of the Covid responses have been towards creating reasonable measures for young
          people in policy-making areas of mental and physical healthcare, digitalisation, leisure and sports, etc. Digital healthcare innovations
          have accelerated even though supporting infrastructure investments are still meagre
        </p>
        <p>
          Taking hints from the global pandemic crisis and continuous economic upheaval, institutions need to create an optimal healthcare platform
          that brings various elements together to build digital infrastructure. This would allow them to embrace newer opportunities, deploy
          well-planned infrastructure in public networks, and engage with the right people who help determine specific digital priorities.
        </p>
        <p>
          For instance, in India, the launch of the Ayushmaan Bharat Digital Health Mission (ABHM) by Prime Minister, Narendra Modi has triggered a
          potential digital transformation in the healthcare industry. The Mission’s USP lies in the new features like electronic medical records
          (EMRs) and unique health IDs for all citizens that would strengthen the backbone of the nation’s healthcare infrastructure. The EMR sharing
          will bring ease in data capturing and data transfer for the patients whereas it would allow data security and confidentiality for the
          doctors if the records are rolled out using blockchain technology
        </p>
        <p>
          According to National Health Authority in India, almost 1,92,764 health facilities are registered, 11,82,790 health records are downloaded,
          and 1195 active integrators are recorded in the new ABHM scheme.
        </p>
        <p>
          Promoting digital transformation in healthcare will help make healthcare more accessible and affordable. Spreading digital literacy and
          significant governance schemes via youth-centric awareness programmes will bridge the gap between doctors and patients. Boosting
          telemedicine and adopting other digital health aspects in delivery systems will help in integrating diagnostic chains, pharmacies, labs,
          etc.
        </p>
        <p>
          The new wave of smart solutions like Covid tracking apps like Aarogya-Setu and vaccination apps like CoWin by the Indian government is a
          good example to show the world that digitising the healthcare infrastructure will standardise the system and enforce interoperability.
        </p>
        {/* ---------------------- */}
        <h4 className="mt-4 fs-3">Complete Well-being - Physical and Mental Health through Traditional Medicine and Yoga</h4>
        <p>
          Many things have changed in the current post-pandemic existence especially when it comes to healthcare and wellness. Physical and mental
          health awareness have gathered much dominance over working opportunities. So, one of the prevalent themes for the youth of today is to take
          the narrative of complete wellness forward with government collaboration and community engagement.
        </p>
        <p>
          One of WHO South-East Asia Region’s eight Flagship Priorities states that Yoga is a powerful tool for individuals, communities and countries
          to improve not only physical but also mental health.
        </p>
        <p>
          Additionally, inculcating yoga in day-to-day lives will help millions of people to stay active, healthy and well, which is important to stay
          on par with the rapidly changing social and economic environment
        </p>
        <p>
          Changing lifestyles is another significant derivative to consider when it comes to wellness. Since the earth has limited resources to
          support the massive needs of 8 billion people, it’s only natural to be smart and choose sustainable options like recycling clothes, avoiding
          water, and electricity wastage, etc. to mitigate further escalation of damaging the planet’s ecosystem.
        </p>
        {/* ---------------------- */}
        <h4 className="mt-4 fs-3">Improving Access to Health Financing for Young Citizens</h4>
        <p>
          According to the State of the Blended Finance Report 2022, the sustainable development goals (SDGs) financial gap was 2.5 trillion USD
          before Covid-19 and surged to 1.7 trillion USD due to Covid-19-related financial requirements. This also exposed the drawbacks in the
          healthcare division and raised the need for proper health financing solutions and increased healthcare capacity infrastructure.
        </p>
        <p>
          In recent times, many global communities have aimed to achieve universal health for their people. Several global institutions and leaders
          have worked tirelessly to strive for a future where ‘all individuals and communities have access to quality healthcare.’
        </p>
        <p>
          However, young people are somehow missed from these conversations. There is a lack of proper healthcare policies and interventions that
          cater to youth’s needs in particular.
        </p>
        <p>
          According to the World Health Organization (WHO), the improved health outcomes seen among younger factions are due to inadequate resources.”
          Achieving universal health and improving health access for young citizens is a task that every nation tries to work upon. So, in order to
          uphold that objective, countries can:
        </p>
        <ul className="list-group border-none  mt-3">
          <li className="list-group-item border-0  ps-0">
            <span className="p-2 bg-primary clip-cicle text-white mt-2">
              <i className="bi bi-arrow-right"></i>
            </span>{' '}
            <span className="ps-2 fs-5">Promoting the welfare of young people and the development of their social skills and experience</span>
          </li>
          <li className="list-group-item border-0  ps-0">
            <span className="p-2 bg-primary clip-cicle text-white mt-2">
              <i className="bi bi-arrow-right"></i>
            </span>{' '}
            <span className="ps-2 fs-5">
              <b> Collaborate with non-private organisations and support groups</b> to trigger conversations and engage youth communities in
              healthcare development
            </span>
          </li>
          <li className="list-group-item border-0  ps-0">
            <span className="p-2 bg-primary clip-cicle text-white mt-2">
              <i className="bi bi-arrow-right"></i>
            </span>{' '}
            <span className="ps-2 fs-5">
              <b> Have more accessibility and inclusivity</b> for younger, non-working groups in medical institutions by providing free-medicine aids,
              health insurance, preventive care advice, etc.
            </span>
          </li>
          <li className="list-group-item border-0  ps-0">
            <span className="p-2 bg-primary clip-cicle text-white mt-2">
              <i className="bi bi-arrow-right"></i>
            </span>{' '}
            <span className="ps-2 fs-5">
              <b> Develop and implement policies and programmes</b> that respect, protect and fulfil young patients’ needs and requirements without
              any bias and discrimination.
            </span>
          </li>
        </ul>
        {/* ------------------------ */}
        <h4 className="mt-4 fs-3">Prevention of Substance Abuse </h4>
        <p>
          Substance abuse may be defined as the overindulgence in a few substances such as alcohol, marijuana, tobacco, prescription drugs, etc. in
          irregular patterns to satisfy abnormal mood swings. This substance abuse issue is a worldly matter of concern as it can aggravate physical
          and mental health fear in young people, promote poor peer relationships, cause accidents and surge the stress levels in the body.
        </p>
        <p>
          Almost 65% of youth in America suffer from substance abuse problems. One of the most prevalent and highly used substances amongst youth in
          America is alcohol. They engage in unnatural drinking patterns that potentially lead to harmful behaviour and risky consequences.
        </p>
        <p>
          There are multiple programs and intervention facilities available for the prevention of substance abuse issues. It can be within families
          and communities that provide inspiring dialogue for youth by focusing on environmental developmental factors
        </p>
        <p>
          For instance, in India, two national-level initiatives are in place to address the substance abuse issue that is the Rashtriya Kishor
          Swasthya Karyakram (National Adolescent Health Policy) and the Scheme of Prevention of Alcoholism and Substance Abuse (SPASA).
        </p>
        {/* ------------------------- */}

        <h4 className="mt-4 fs-3">Promotion of Indigenous Sports</h4>
        <p>
          Today, the sports sector is becoming a significant element in a country’s socioeconomic development as well as a medium of cultural
          diplomacy between nations. Many countries including India regard sports as a delicate power, it is a way to maintain cordial relations among
          the countries. The United Nations also believes that ‘sports’ is one of the greatest diplomatic aspects in the promotion of international
          security as well as peace.
        </p>
        <p>
          With that in mind, sporting events like cricket, football, and tennis have garnered worldwide inter-cultural exchanges and interests that
          people unite in one voice while cheering this so-called, ‘Sports Diplomacy’ tactic by the authorities.
        </p>
        <p>
          For instance, FIFA World Cup 2022 was recorded to be the most streamed sporting world cup event in the past 10 years. From this stream of
          thought, promoting the upkeep and development of sports becomes all the more necessary.
        </p>
        <p>
          For that to continue, every nation must invest in the latest technology-ridden infrastructure that relates to best sports practices,
          training, research and wellness throughout the sporting institutions.
        </p>
        <p>
          Proper policies and the implementation of robust laws to promote sports amongst young citizens will go a long way as well. Take a look at
          some of the following sports initiatives and schemes launched by the Indian government to inspire and carry the ‘Sports for All’ dream for
          young citizens.
        </p>
        <ul className="list-group border-none  mt-3">
          <li className="list-group-item border-0  ps-0">
            <span className="p-2 bg-primary clip-cicle text-white mt-2">
              <i className="bi bi-arrow-right"></i>
            </span>{' '}
            <span className="ps-2 fs-5">
              <b>Khelo India:</b> Introduced by the Indian Ministry of Youth Affairs and Sports, under this programme, athletes and coaches will be
              trained as part of the Khelo India Scheme to improve their performance on the world stage.
            </span>
          </li>
          <li className="list-group-item border-0  ps-0">
            <span className="p-2 bg-primary clip-cicle text-white mt-2">
              <i className="bi bi-arrow-right"></i>
            </span>{' '}
            <span className="ps-2 fs-5">
              <b>Fit India Movement:</b> Introduced by Prime Minister, Narendra Modi in 2019, this movement aims to influence people’s behaviours and
              motivate them to live more physically active lifestyles, to promote fitness as simple, enjoyable, and cost-free
            </span>
          </li>
          <li className="list-group-item border-0  ps-0">
            <span className="p-2 bg-primary clip-cicle text-white mt-2">
              <i className="bi bi-arrow-right"></i>
            </span>{' '}
            <span className="ps-2 fs-5">
              <b>National Centre for Sports Sciences and Research programme (NCSSR):</b> This programme strives to encourage top-notch research,
              education, and innovation in athletes’ high levels of performance.
            </span>
          </li>
          <li className="list-group-item border-0  ps-0">
            <span className="p-2 bg-primary clip-cicle text-white mt-2">
              <i className="bi bi-arrow-right"></i>
            </span>{' '}
            <span className="ps-2 fs-5">
              <b>Mission Olympics 2024:</b> This scheme is developed by NITI Aayog in accordance with the next summer Olympics. Its focus will be on
              priority sports and training athletes under international coaching guidance. It plans to maximise local and indigenous sports potential
              by opting for and implementing a coach grading system.
            </span>
          </li>
        </ul>
        <p className="mt-4">
          Sports being at the centre, the responsibility to promote and develop sports in a country specifically for indigenous groups and tribal
          societies rests with the state and union governments. To enable young players’ talent and inspire them to showcase their capacity in sports
          is a must to bridge sociocultural gaps.
        </p>
        <p>
          For instance, one of the verticals of the Khelo India Scheme, ‘Promotion of rural and indigenous/tribal games’, is designed to promote and
          encourage the rise of traditional sports in India.
        </p>
        <p>
          Moreover, there are various other schemes and initiatives at work to carry the idea of unity in diversity in sports faction as well whilst
          strengthening and globalising indigenous/tribal sports.
        </p>
        <p>
          In India, NYKS is implementing Tribal Youth Exchange Programme in collaboration with the Left Wing Extremism (LWE) Division of the Ministry
          of Home Affairs. The main objective of this programme is to enable tribal youth to appreciate unity in diversity, and expose them to
          development activities and technological/ industrial advancement in other parts of the country.
        </p>
        <p>
          The Ministry of Youth Affairs in India implements various Sports Promotional Schemes across the country through the Sports Authority of
          India (SAI) and other institutions to promote services like expert coaching, sports equipment, sports kit, competition exposure, etc.
        </p>
        <p>
          Additionally, the Ministry has also worked extensively to raise awareness about old traditional sports like Gatka, Roll Ball, Tug of War,
          Kalaripayattu, etc. by means of documentaries on social platforms in order to revive them into mainstream sports and aware today’s youth
          about their history.
        </p>
        <p>
          To conclude, for increasing participation in various sports, the players must be provided with a proper platform, along with adequate
          facilities and to prosper in cordial relations between nations, the world economies must work collectively to use sports as a medium of
          cultural diplomacy.
        </p>
        <div className="text-center">
          <Button
            startIcon={<Download />}
            href="https://y20india.in/wp-content/uploads/2023/03/05_WhitePaper_Health-6.pdf"
            download={true}
            size="large"
            variant="outlined"
            color="error"
            className="rounded py-3">
            Download White Paper
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HealthWell;
