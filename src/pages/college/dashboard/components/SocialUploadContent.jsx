import React from "react";
import { useOutletContext } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { CopyAllTwoTone } from "@mui/icons-material";
import moment from "moment";
import { SimpleAccordion } from "components";
import { Button } from "@radix-ui/themes";
function SocialUploadContent() {
  const { details, countStudent } = useOutletContext();
  const accordianData = [
    {
      active: true,
      btnText: "Pre-summit announcement",
      body: [
        {
          title: "Tweet this",
          body: "📢 Exciting News! 🎉 We are thrilled to announce our participation in the Yuvamanthan Model G20! 🌍🏛 Our brilliant young minds are contributing to our Prime Minister @narendramodi 's vision of making G20 a Jan Bhagidari event! 🤝 #Yuvamanthan #Y20 #G20 #YMG20 #PMO",
        },
        {
          title: "Post it on Instagram, Facebook and LinkedIn",
          body: "📢 Exciting News! 🎉 We are thrilled to announce our participation in the Yuvamanthan Model G20! 🌍🏛 Our brilliant young minds are contributing to our Prime Minister @narendramodi 's vision of making G20 a Jan Bhagidari event! 🤝 We're proud to empower our students as they engage in meaningful discussions, shaping the world's future leaders. 🌟💡 Through Yuvamanthan Model G20, they'll explore global challenges, propose innovative solutions on exciting @Y20india themes. 🌎🤝🗣🔊 Together, we will leave an indelible mark on the global stage! 🌟💪 Stay tuned as our YMG20 teams dive deep into pressing issues, collaborates and contributes towards a brighter and more inclusive world. 🌍✨ Let's make a difference together! 💫💙 #Yuvamanthan #Y20 #G20 #YMG20 #PMO",
        },
      ],
    },
    {
      btnText: "Post-summit",
      body: [
        {
          title: "Press Release",
          body: `📢 Thrilled to announce that we successfully organised the Yuvamanthan Model G20! 🎉🌍 Over ${countStudent && countStudent.length ? countStudent.filter((std) => std.role === "student").length : 0} students participated on ${moment(details?.appointment_date).format("Do MMM YYYY")} to tackle global challenges. 🏛 Together, we're making waves towards a brighter future! 🌟💙 #Yuvamanthan #Y20 #G20 #YMG20 #PMO`,
        },
        {
          title: "Post it on Instagram, Facebook and LinkedIn",
          body: `📢 Thrilled to announce that we successfully organised the Yuvamanthan Model G20! 🎉🌍 Over ${countStudent && countStudent.length ? countStudent.filter((std) => std.role === "student").length : 0} students participated on ${moment(details?.appointment_date).format("Do MMM YYYY")} to tackle global challenges. 🏛 The theme chosen was {details?.theme} Together, we're making waves towards a brighter future! 🌟💙 Our students displayed passion, intellect, and a drive for positive change. 🌍🤝 🙏 Through Yuvamanthan Model G20, we've empowered our students to become future leaders, amplifying their voices on the international stage. 💡🔊 .Together, we can create a brighter future for all. ✨🌟 #Yuvamanthan #Y20 #G20 #YMG20 #PMO`,
        },
      ],
    },
    {
      btnText: "Press release format",
      body: [
        {
          title: "Tweet this",
          body: `
            ${details?.institution_name}
          organised the Yuvamanthan Model G20, a unique initiative for youth to excel in public speaking, diplomacy, and strategy, today on ${moment(details?.appointment_date).format("Do MMM YYYY")}
          . The summit witnessed the participation of over
          ${countStudent && countStudent.length ? countStudent.filter((std) => std.role === "student").length : 0} 
          students acting as leaders of G20 nations.
          India's assumption of the G20 presidency from December 2022 is a defining moment in its history, aiming to foster pragmatic global solutions and embody the spirit of 'Vasudhaiva Kutumbakam' (One Earth - One Family - One Future), the theme of G20. Acknowledging the crucial role of India's youth in an interconnected world, Yuvamanthan Model G20 (YMG20) provides a platform for their inclusion, amplifying their voices on socio-political issues.
          Key outcomes of the discussion included consensus on
       ${details?.theme}. The participants also emphasized the importance of knowledge sharing among G20 nations.
          Addressing the students, the Chief Guest on the occasion [Name of the Chief Guest] highlighted the opportunity for innovative ideas to shape a sustainable and inclusive world by saying [add context]
          On this occasion, the [Designation] [School/College Name] [Name of the person] emphasized the college's commitment to fostering practical discussions and nurturing essential skills in youth. Yuvamanthan Model G20 provides a significant learning opportunity for students to develop skills like public speaking, strategy building, team building and multilateral negotiations among others and contribute to a better world.
`,
        },
      ],
    },
  ];
  return (
    <div>
      <div>
        <h4>GET SOCIAL</h4>
        <p>Start your YMG20 social campaign now!</p>
      </div>
      <SimpleAccordion data={accordianData} />
    </div>
  );
}

export default SocialUploadContent;
