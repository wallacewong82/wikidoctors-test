import React, { useState } from "react";
import { Button } from "react-bootstrap";

const ShowClinicHours = ({
  hours,
  selectedTime,
  setSelectedTime,
  previousappointments,
  selectedDate,
}) => {
  const [selectedIndex, setSelectedIndex] = useState("");
  var intervals = [];

  const processTimeRange = (range) => {
    const [startTime, endTime] = range.split(" - ");
    let currentTime = new Date(`2000-01-01T${startTime}`);
    const endTimeDate = new Date(`2000-01-01T${endTime}`);
    const intervalMinutes = 15;

    while (currentTime < endTimeDate) {
      const intervalEndTime = new Date(
        currentTime.getTime() + intervalMinutes * 60000
      );
      intervals.push({
        start: currentTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false, // Remove am/pm
        }),
        end: intervalEndTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false, // Remove am/pm
        }),
      });
      currentTime = intervalEndTime;
    }
  };
  // const [startTime, endTime] = hours.split(" - ");

  // let currentTime = new Date(`2000-01-01T${startTime}`);
  // const endTimeDate = new Date(`2000-01-01T${endTime}`);
  // const intervalMinutes = 15;
  // while (currentTime < endTimeDate) {
  //   const intervalEndTime = new Date(
  //     currentTime.getTime() + intervalMinutes * 60000
  //   );
  //   intervals.push({
  //     start: currentTime.toLocaleTimeString([], {
  //       hour: "2-digit",
  //       minute: "2-digit",
  //       hour12: false, // Remove am/pm
  //     }),
  //     end: intervalEndTime.toLocaleTimeString([], {
  //       hour: "2-digit",
  //       minute: "2-digit",
  //       hour12: false, // Remove am/pm
  //     }),
  //   });
  //   currentTime = intervalEndTime;
  // }

  if (hours.includes(",")) {
    // If hours contain commas, split by comma and process each range
    const hourRanges = hours.split(",").map((range) => range.trim());
    hourRanges.forEach(processTimeRange);
  } else {
    // If no commas, process single range
    processTimeRange(hours);
  }

  const isTimeSlotBooked = (time) => {
    if (!previousappointments || !selectedDate) return false;
    // Format selected date to match the date format in previousappointments
    const [day, date, month] = selectedDate.split(" ");
    const formattedSelectedDate = `${day} ${date} ${month}`;
    return previousappointments.some(
      (appointment) =>
        appointment.time === time &&
        appointment.date.includes(formattedSelectedDate)
    );
  };

  const onClickHoursHandler = (myselectedtime, index) => {
    setSelectedTime(myselectedtime);
    setSelectedIndex(index);
  };

  return (
    <div >
      {intervals.map((interval, index) => {
        const isBooked = isTimeSlotBooked(interval.start);
        return (
          !isBooked && (
            <Button
              key={index}
              style={{
                margin: "3px",
                backgroundColor: selectedIndex === index ? "black" : "white",
                borderColor: selectedIndex === index ? "black" : "#40679E",
                color: selectedIndex === index ? "white" : "#40679E",
              }}
              onClick={() => {
                onClickHoursHandler(interval.start, index);
              }}
            >
              {interval.start}
            </Button>
          )
        );
      })}
    </div>
  );
};

export default ShowClinicHours;
