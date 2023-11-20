import React, { useEffect, useState } from 'react';



const DatePickerOwn = ({ setDate}) => {
  const [ currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [isYearDropdownVisible, setIsYearDropdownVisible] = useState(false);
  const [isMonthDropdownVisible, setIsMonthDropdownVisible] = useState(false);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

   const getTodayDate = (date)=>{
    const todayDate = date.getDate();
    return todayDate;
   }
  const handleDateClick = (day) => {
    setSelectedDate(day);
    setDate(`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`)
    console.log("this is day",day)
  };

  const handleYearChange = (event) => {
    const newYear = parseInt(event.target.value, 10);
    setCurrentDate(new Date(newYear, currentDate.getMonth()));
    setIsYearDropdownVisible(false);
  };

  const handleMonthChange = (event) => {
    const newMonth = parseInt(event.target.value, 10);
    setCurrentDate(new Date(currentDate.getFullYear(), newMonth));
    setIsMonthDropdownVisible(false);
  };
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };
  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };
  

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDayOfMonth = getFirstDayOfMonth(currentDate);
    const todaydate= getTodayDate(currentDate);
    const daysArray = [];
    const totalDays = daysInMonth + firstDayOfMonth;
    
    // Calculate the number of empty cells required to maintain a 7-day grid
    const numEmptyCells = Math.ceil(totalDays / 7) * 7 - totalDays;

    for (let i = 0; i < firstDayOfMonth; i++) {
      daysArray.push(<div key={`empty-${i}`} className="empty-cell"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      daysArray.push(
        <div
          key={`day-${day}`}
          className={`calendar-day ${day === selectedDate ? 'selected-date' : ''}`}
          onClick={() => handleDateClick(day)}
        >
          {day}
        </div>
      );
    }

    for (let i = 0; i < numEmptyCells; i++) {
      daysArray.push(<div key={`empty-next-${i}`} className="empty-cell"></div>);
    }

    return daysArray;
  };

  const toggleYearDropdown = () => {
    setIsYearDropdownVisible(true);
    // setIsMonthDropdownVisible(false); // Close the month dropdown if open
  };

  const toggleMonthDropdown = () => {
    setIsMonthDropdownVisible(true);
    // setIsYearDropdownVisible(false); // Close the year dropdown if open
  };
  useEffect(()=>{
  setSelectedDate(getTodayDate(currentDate))
  },[])

  return (
    <div className="calendar rounded-4">
      <div className="calendar-header rounded-4">
        <button onClick={goToPreviousMonth}><span className='fs-19px fw-500 color-black'>{"<"}</span></button>
        <span className='color-black fw-600 fs-22px' onClick={toggleMonthDropdown}>
          {currentDate.toLocaleString('default', { month: 'long' })}
          {isMonthDropdownVisible && (
            <select onChange={handleMonthChange} value={currentDate.getMonth()}>
              {Array.from({ length: 12 }, (_, month) => (
                <option key={month} value={month}>
                  {new Date(0, month).toLocaleString('default', { month: 'long' })}
                </option>
              ))}
            </select>
          )}
        </span>
        <span className='color-black fw-600 fs-22px' onClick={toggleYearDropdown}>
          {currentDate.getFullYear()}
          {isYearDropdownVisible && (
            <select onChange={handleYearChange} value={currentDate.getFullYear()}>
              {Array.from({ length: 100 }, (_, index) => {
                const year = new Date().getFullYear() - 50 + index;
                return (
                  <option key={year} value={year}>
                    {year}
                  </option>
                );
              })}
            </select>
          )}
        </span>
        <button onClick={goToNextMonth}><span className='fs-19px color-black fw-500'>{">"}</span></button>
      </div>
      <div className="calendar-body cursor-pointer">
        <div className="calendar-weekdays">
          <div className="weekday">Sun</div>
          <div className="weekday">Mon</div>
          <div className="weekday">Tue</div>
          <div className="weekday">Wed</div>
          <div className="weekday">Thu</div>
          <div className="weekday">Fri</div>
          <div className="weekday">Sat</div>
        </div>
        <div className="calendar-days cursor-pointer">{renderCalendar()}</div>
      </div>
      {selectedDate && (
        <div className="">
          Selected Date: {currentDate.toLocaleString('default', { month: 'long' })} {selectedDate}, {currentDate.getFullYear()}
        </div>
      )}
    </div>
  );
};

export default DatePickerOwn;
