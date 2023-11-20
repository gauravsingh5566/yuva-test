import React, { useEffect } from 'react';
import BreadCrumb from './BreadCrumb';

function TermsConditions() {
  useEffect(() => {
    window.scroll(0, 0);
  });
  return (
    <>
      <BreadCrumb heading={'Terms & Conditions'} />

      <div className="container">
        {/* <span className="section-title-border"></span> */}
        <h2 className="text-center p-4">Terms & Conditions</h2>
        <span className="section-title-border"></span>
        <h4 className="mt-4">THE EVENT</h4>
        <p>
          Model G20 or (the “Event”) is a voluntary exercise designed for young learners and professionals who wish to ace the art of public speaking
          and diplomacy.
        </p>
        <p>
          GLC holds no patents or copyrights for (the “Event”) and is merely a coordinator/agency to help organize (the “Event”) in educational
          institutions and venues decided by their authorities.
        </p>

        <h4 className="mt-4">APPLICATION TERMS</h4>
        <p>
          The institution is an educational institute that is duly registered and has appointed the (the “Applicant”) to act on behalf of it to
          organize (the “Event”).
        </p>
        <p>
          GLC or its associates do not know (the “Applicant”) personally and expect all information shared by the applicant to be true and fair. Any
          liability arising out of the falsification of information will be the sole responsibility of the applicant.
        </p>
        <p>
          GLC and its associates will not be responsible to pay any amount of remuneration or money to (the “Applicant”) or their associates to
          organize (the “Event”). The applicant understands that (the “Applicant”) is “Volunteering” to organize the event on their campus and all
          responsibility for the same lies with the (the “Applicant”). (the “Applicant”) will be free to arrange sponsorships for the (the “Event”)
          from sources they deem fit for the same. GLC or its associates will have no role in this, nor will they be responsible for any financial or
          physical loss due to the same. This is just an application and not a confirmation from GLC for the appointment of “Campus Sherpa”.
        </p>
        <h4 className="mt-4">PARTICIPATION</h4>
        <p>
          Unless otherwise defined in the special terms of the event as outlined on the event webpage or as communicated at or in connection with the
          event itself (the “Special Terms”): Everyone who is of legal age (i.e. 18 years old) is eligible to participate in the event (the “Event”).
          Participation in the Event is free of charge and does not require the purchase of a product or service. By participating, you agree to the
          Special Terms and to these general terms of participation (the “GTP”; Special Terms and GTP equal the “Terms”) fully and unconditionally. On
          reserves the right to exclude any participant from partaking in the Event without providing any reasons.
        </p>

        <h4 className="mt-4">LIABILITY</h4>
        <p>
          GLC accepts no responsibility for any damage, loss, liabilities, injury, or disappointment incurred or suffered by any participant as a
          result of entering and participating in the Event. Nothing in these Terms shall exclude the liability of GLC for fraud or fraudulent
          misrepresentation or for death or personal injury resulting from GLC’s negligence. You agree to indemnify, defend, and hold harmless GLCS
          from and against any loss, expense, liability, damage, or claim (including reasonable attorneys’ fees) which may be asserted by a third
          party arising from your negligence or willful misconduct and omission. GLC or its affiliates will not be responsible for any loss (as
          mentioned above).
        </p>
        <h4 className="mt-4">DATA PROTECTION</h4>
        <p>
          By registering for or participating in the Event, you acknowledge and consent to the processing of your personal data in accordance with
          GLC’s Privacy Notice.
        </p>
        <h4 className="mt-4">MISCELLANEOUS</h4>
        <p>
          There shall be no correspondence relating to this Event or the Terms. GLC has the right to cancel or terminate the relationship at any time
          without prior notice and without providing any reasons. On reserves the right to change or amend the Terms at any time. The laws of India
          will govern the Event and the Terms without regard to its conflict of laws provisions.
        </p>

        <p className="mt-4 mb-5">The exclusive place of jurisdiction for all controversies and claims is Faridabad, Haryana INDIA.</p>
      </div>
    </>
  );
}

export default TermsConditions;
