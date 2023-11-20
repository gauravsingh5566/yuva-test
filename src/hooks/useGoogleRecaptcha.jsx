import { apiJson } from "api";
import React, { useEffect, useState } from "react";

export const useGoogleRecaptcha = () => {
  const SITE_KEY = process.env.REACT_APP_GOOGLE_RECAPTCHA_SITE_KEY;
  const [ReCaptchaLoading, setReCaptchaLoading] = useState(false);
  const [ReCaptchaResult, setReCaptchaResult] = useState(null);
  // load script
  useEffect(() => {
    const loadScriptByURL = (id, url, callback) => {
      const isScriptExist = document.getElementById(id);
      if (!isScriptExist) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = url;
        script.id = id;
        script.onload = function () {
          if (callback) callback();
        };
        document.body.appendChild(script);
      }
      if (isScriptExist && callback) callback();
    };
    // load the script by passing the URL
    loadScriptByURL("recaptcha-key", `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`, function () {
    });
  }, []);

  // handle CLick
  const ReCaptchaHandler = async () => {
    setReCaptchaLoading(true);
    return new Promise(async (resolve, reject) => {
      try {
        await window.grecaptcha.ready(async () => {
          const token = await window.grecaptcha.execute(SITE_KEY, { action: "submit" });
          let response = await apiJson.get("/auth/recaptcha-v3", {
            headers: {
              recaptchavalue: token,
            },
          });
          let score = response?.data?.data?.score ?? 0;
          let status = score > 0.5 ? true : false;
          setReCaptchaLoading(false);
          resolve(status);
        });
      } catch (error) {
        setReCaptchaLoading(false);
        reject(error);
      }
    });
  };

  return { ReCaptchaHandler, ReCaptchaLoading };
};
