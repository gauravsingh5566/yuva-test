import React from 'react';

const G20Simulation = () => {
  return (
    <React.Fragment>
      <section id="scrollSpyG20Simulation" className="mb-5 section bg-gray">
        <div className="container">
          <h3 className="mb-3 text-center">G20 SIMULATION</h3>
          <div className="row row-cols-1 mb-5">
            <div className="col">
              <h4 className="fs-3">Overview</h4>
              <p>
                Model G20 simulation for institutions is designed to replicate the actual G20 summit or Group Twenty summit of leaders from developed
                to emerging economies. It is aimed and designed for young learners, and professionals who wish to ace the art of public speaking and
                diplomacy. A minimum of 1-7 representatives or delegates are needed in each of the 20 teams to represent each participating country.
              </p>
            </div>
            {/* <div className="col">
                            <img src="images/modelg20/flags.jpg" className='w-100 rounded-4' alt="" />
                        </div> */}
          </div>

          <div className="row row-cols-1">
            <h4 className="text-center mb-3 fs-3">THREE TRACKS OF NEGOTIATIONS</h4>
            <p>
              Typically, the G20 summit consists of two parallel tracks - The Finance track and the Sherpa track. Each track's meeting is held
              separately wherein they discuss and negotiate matters of economic and political importance. Since G20 has become a crucial platform for
              world leaders to engage in a dialogue a third track is added in the form of a Leaders Track.
            </p>
            <p className="mb-5">Therefore participants are clubbed into 3 majors groups or Tracks, namely:</p>
          </div>

          <div className="row row-cols-1  align-items-center mb-5">
            <div className="col ">
              <h4>Finance Track</h4>
              <p>
                The Finance Track team for each country is typically represented by a Finance Minister, A Central Bank Governor and Senior Advisors.
                They discuss the macroeconomic issues facing the world and are responsible to come up with reforms to mitigate global economic
                threats.
              </p>
            </div>
          </div>
          <div className="row row-cols-1  align-items-center mb-5">
            <div className="col">
              <h4>Sherpa Track</h4>
              <p>
                This track is led by the sherpas or emissaries of G20 leaders. It focuses on the developmental and socio-political agendas of the
                summit. The team for each country can be represented by a Sherpa, a Sous-Sherpa (deputy to the Sherpa) and Senior Advisors. This group
                focuses on the developmental and socio-political challenges faced by the member countries and the world.
              </p>
            </div>
          </div>
          <div className="row row-cols-1  mb-5">
            <div className="col">
              <h4>Foreign Ministers Track</h4>
              <p>
                The team for each country is typically represented by a Foreign Minister. A total of 20 Foreign Ministers from each country comprise
                this track. They are diplomats who advise the head of state in international relations and negotiations. Another 20 Senior Advisors
                can be added to this track.
              </p>
            </div>
          </div>
          <div className="row row-cols-1  mb-5">
            <div className="col">
              <h4>Leaders Track</h4>
              <p>
                Another Track, that works parallel to these tracks is the Leaders Track - Which is a group which typically comprises of the Head of
                States, but G20 essentially is a meeting of economics and socio-political experts and the Leaders track is only responsible for
                setting the agenda and negotiating terms at the end of the Finance and Sherpa track meetings.
              </p>
            </div>
          </div>

          <div className="row row-cols-1  mb-5">
            <div className="col">
              <h3 className="mb-3 fs-3">Duration of the event</h3>
              <p className="mb-3">Each delegate should have at least:</p>
              <ul className="mb-3">
                <li>3 mins for opening remarks</li>
                <li>2 mins for rebuttal</li>
                <li>2 mins for drawing consensus </li>
              </ul>
              <p className="mb-3">
                Based on the above the duration of the event can be decided. The event may be a 1 day event or a 4 day event based on the number of
                delegates, programmes etc.
              </p>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default G20Simulation;
