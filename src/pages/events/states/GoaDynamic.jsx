import React from 'react';
import { goaContent } from './goaContent';
const GoaDynamic = () => {
  return (
    <>
      <div className="Goa-dynamic">
        <div className="container fw-bold">
          {goaContent.map((state) => {
            return (
              <div className="box" key={state.id}>
                {state?.title}
              </div>
            );
          })}
        </div>
        <div className="container">
          {goaContent.map((state) => {
            {
              state?.quotes?.map((q) => {
                return (
                  <div className="key" key={q.id}>
                    {q?.quote}
                  </div>
                );
              });
            }
          })}
        </div>

        {goaContent.map((state) => {
          return (
            <div className="box">
              {state?.author}
              <br />
            </div>
          );
        })}
        {goaContent.map((state) => {
          return <div className="box">{state?.subauthor}</div>;
        })}
        {goaContent.map((state) => {
          return <div className="box">{state?.subheading}</div>;
        })}
        {goaContent.map((state) => {
          return <div className="box">{state?.paragraph}</div>;
        })}

        <div className="conatiner">
          {goaContent.map((state) => {
            {
              state?.content?.map((p) => {
                return <div className="key">{p?.paragraph}</div>;
              });
            }
          })}
        </div>
        <div className="container">
          {goaContent.map((state) => {
            {
              state?.carousel?.map((c) => {
                return (
                  <div className="carousel">
                    {c?.smallHead}
                    {c?.title}
                    {c?.para}
                  </div>
                );
              });
            }
          })}
        </div>
        <div className="container">
          {goaContent.map((state) => {
            {
              state?.cards?.map((s) => {
                return (
                  <div className="cards">
                    {s?.date}
                    {s?.day}
                    {s?.subheading}
                    {s?.organisedBy}
                  </div>
                );
              });
            }
          })}
        </div>

        <div className="container">
          {goaContent.map((state) => {
            {
              state?.images?.map((i) => {
                return (
                  <div className="images">
                    <img src={i.image} alt="" />
                  </div>
                );
              });
            }
          })}
        </div>

        <div className="container">
          {goaContent.map((state) => {
            {
              state?.ulpoints?.map((u) => {
                return (
                  <div className="points">
                    {u?.title}
                    {u?.para}
                  </div>
                );
              });
            }
          })}
        </div>

        {goaContent.map((state) => {
          return <div className="box">{state?.month}</div>;
        })}
        <div className="container">
          {goaContent.map((state) => {
            {
              state?.schedules?.map((s) => {
                return (
                  <div className="schedule">
                    {s?.agency}
                    {s?.meeting}
                    {s?.dates}
                    {s?.city}
                  </div>
                );
              });
            }
          })}
        </div>
      </div>
    </>
  );
};

export default GoaDynamic;
