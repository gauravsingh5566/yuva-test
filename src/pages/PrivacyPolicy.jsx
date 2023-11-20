import React from 'react';
import BreadCrumb from 'layout/BreadCrumb';
import GotoTop from 'layout/GotoTop';

const PrivacyPolicy = () => {
  return (
    <>
      <GotoTop />
      {/* <!-- page title --> */}
      <BreadCrumb heading={'PrivacyPolicy'} />
      {/* <!-- /page title --> */}

      <section className="section position-relative">
        <div className="container mt-2">
          <h1 className="mb-4 fs-1">Privacy Policy</h1>
          {/* <p>Effective Date: [Insert Date]</p> */}
          <p>
            Thank you for visiting our website. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information
            when you visit our website <a href="https://www.yuvamanthan.org">https://www.yuvamanthan.org</a> . Please read this Privacy Policy
            carefully. By using our website, you consent to the practices described in this Privacy Policy.
          </p>
          <h4 className="fs-2 mt-3">Information We Collect</h4>
          <div className="container ms-2">
            {' '}
            <h4 className="fs-4 mt-3">1. Personal Information</h4>
            <p>
              We may collect personal information that you provide directly to us, such as your name, email address, phone number, or any other
              information you choose to provide when filling out forms or contacting us through our website.
            </p>
            <h4 className="fs-4 mt-3">2. Usage Information</h4>
            <p>
              When you visit our website, we may collect certain information automatically, including your IP address, browser type, operating system,
              referring URLs, and pages viewed. This information helps us analyze trends, administer the site, track user movements, and gather
              demographic information for aggregate use.
            </p>
          </div>
          <h4 className="fs-2 mt-3">Use of Information</h4>
          <p>We may use the information we collect from you to:</p>
          <ul className="list-group border-none  mt-3">
            <li className="list-group-item border-0  ps-0">
              <span className="p-2 bg-primary clip-cicle text-white mt-2">
                <i className="bi bi-arrow-right"></i>
              </span>{' '}
              <span className="ps-2 fs-5">Provide, maintain, and improve our website's functionality and user experience.</span>
            </li>
            <li className="list-group-item border-0  ps-0">
              <span className="p-2 bg-primary clip-cicle text-white mt-2">
                <i className="bi bi-arrow-right"></i>
              </span>{' '}
              <span className="ps-2 fs-5">Respond to your inquiries, comments, or requests.</span>
            </li>
            <li className="list-group-item border-0  ps-0">
              <span className="p-2 bg-primary clip-cicle text-white mt-2">
                <i className="bi bi-arrow-right"></i>
              </span>{' '}
              <span className="ps-2 fs-5">
                Send you newsletters, marketing communications, and other information about our products and services that may be of interest to you.
              </span>
            </li>
            <li className="list-group-item border-0  ps-0">
              <span className="p-2 bg-primary clip-cicle text-white mt-2">
                <i className="bi bi-arrow-right"></i>
              </span>{' '}
              <span className="ps-2 fs-5">Monitor and analyze trends, usage, and activities in connection with our website.</span>
            </li>
            <li className="list-group-item border-0  ps-0">
              <span className="p-2 bg-primary clip-cicle text-white mt-2">
                <i className="bi bi-arrow-right"></i>
              </span>{' '}
              <span className="ps-2 fs-5">Detect, investigate, and prevent fraudulent transactions and other illegal activities.</span>
            </li>
            <li className="list-group-item border-0  ps-0">
              <span className="p-2 bg-primary clip-cicle text-white mt-2">
                <i className="bi bi-arrow-right"></i>
              </span>{' '}
              <span className="ps-2 fs-5">Comply with legal obligations and enforce our policies.</span>
            </li>
          </ul>
          <h4 className="fs-2 mt-3">Disclosure of Information</h4>
          <p>We may disclose your information to third parties in the following circumstances:</p>
          <ul className="list-group border-none  mt-3">
            <li className="list-group-item border-0  ps-0">
              <span className="p-2 bg-primary clip-cicle text-white mt-2">
                <i className="bi bi-arrow-right"></i>
              </span>{' '}
              <span className="ps-2 fs-5">With your consent or at your direction.</span>
            </li>
            <li className="list-group-item border-0  ps-0">
              <span className="p-2 bg-primary clip-cicle text-white mt-2">
                <i className="bi bi-arrow-right"></i>
              </span>{' '}
              <span className="ps-2 fs-5">
                To our subsidiaries, affiliates, and service providers who assist us in operating our website and providing services to you.
              </span>
            </li>
            <li className="list-group-item border-0  ps-0">
              <span className="p-2 bg-primary clip-cicle text-white mt-2">
                <i className="bi bi-arrow-right"></i>
              </span>{' '}
              <span className="ps-2 fs-5">
                To comply with legal obligations, enforce our policies, or protect our rights, property, or safety, or those of others.
              </span>
            </li>
            <li className="list-group-item border-0  ps-0">
              <span className="p-2 bg-primary clip-cicle text-white mt-2">
                <i className="bi bi-arrow-right"></i>
              </span>{' '}
              <span className="ps-2 fs-5">
                In connection with a business transaction, such as a merger, sale of assets, or acquisition, where your personal information may be
                transferred to the acquiring entity.
              </span>
            </li>
          </ul>
          <h4 className="fs-2 mt-3">Third-Party Links</h4>
          <p>
            Our website may contain links to third-party websites or services that are not owned or controlled by us. We have no control over and
            assume no responsibility for the content, privacy policies, or practices of any third-party websites or services. We encourage you to
            review the privacy policies of those third-party websites or services before providing any personal information.
          </p>
          <h4 className="fs-2 mt-3">Security</h4>
          <p>
            We take reasonable measures to protect the information we collect from you against unauthorized access, disclosure, alteration, or
            destruction. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute
            security.
          </p>
          <h4 className="fs-2 mt-3">Children's Privacy</h4>
          <p>
            Our website is not intended for individuals under the age of 16. We do not knowingly collect personal information from individuals under
            16. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us, and we will
            take steps to delete such information.
          </p>
          <h4 className="fs-2 mt-3">Updates to this Privacy Policy</h4>
          <p>
            We reserve the right to update this Privacy Policy at any time, and any changes will be effective upon posting. We will notify you of any
            material changes by updating the "Effective Date" at the top of this Privacy Policy. We encourage you to review this Privacy Policy
            periodically to stay informed of any updates.
          </p>
          <h4 className="fs-2 mt-3">Contact Us</h4>
          <p>
            If you have any questions, comments, or concerns about this Privacy Policy or our practices, please contact us at{' '}
            <a href="mailto:modelG20@yuvamanthan.org"> modelG20@yuvamanthan.org</a>.
          </p>
          <p>By using our website, you acknowledge that you have read and understood this Privacy Policy and agree to its terms.</p>
        </div>
      </section>
    </>
  );
};

export default PrivacyPolicy;
