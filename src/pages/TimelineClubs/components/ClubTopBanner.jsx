import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'

const ClubTopBanner = ({clubDetail}) => {
  const [gradientBackground, setGradientBackground] = useState('');

  useEffect(() => {
    // Change the background on every render
    const randomColor1 = generateRandomColor();
    const randomColor2 = generateRandomColor();
    setGradientBackground(`linear-gradient(90deg, ${randomColor1}, ${randomColor2})`);
  }, [clubDetail]); 

  const generateRandomColor = () => {
    const color = `rgba(${getRandomValue(0, 255)}, ${getRandomValue(0, 255)}, ${getRandomValue(0, 255)}, 1)`;
    return color;
  };

  const getRandomValue = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  useEffect(()=>{
    console.log("clubDetail", clubDetail)
  },[])
  return (
    <>
      <Card className='d-flex' style={{borderRadius:'20px',border:'none', background:gradientBackground, height:'113px'}}>
        <Card.Body style={{}} className='text-end '>
          <div className='align-item-center'>
            <span style={{color:'white', textAlign:'right', fontSize:'35px', margin:'24px', fontSize:'35px'}} className='text-capitalize  '>{clubDetail.name}</span>
            <div>
            <span style={{color:'white', fontSize:'16px'}} className='mx-4'> 1.2k Members</span>
          </div>
          </div>
         
        </Card.Body>
      </Card>
    </>
  )
}

export default ClubTopBanner
