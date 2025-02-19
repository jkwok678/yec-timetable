import { useEffect, useState } from 'react'
import './App.css'
import { FRIDAY_EVENTS, SATURDAY_EVENTS, SUNDAY_EVENTS, MONDAY_EVENTS } from './timetable'

const DAYS = {
  FRIDAY: FRIDAY_EVENTS,
  SATURDAY: SATURDAY_EVENTS,
  SUNDAY: SUNDAY_EVENTS,
  MONDAY: MONDAY_EVENTS
};
function App() {
  console.log(window.location.pathname)
  const date = window.location.pathname.replace("/", "").toUpperCase();
  const events = DAYS[date as keyof typeof DAYS];
  const chunkedEvents = [];
  for (let i = 0; i < events.length; i += 10) {
    chunkedEvents.push(events.slice(i, i + 10));
  }
  const pages = chunkedEvents.length;
  const [currentPage, setCurrentPage] = useState(0);
  useEffect(() => {
    if (pages > 1) {
      const paginationTimer = setInterval(() => {
        setCurrentPage((t) => (t < pages - 1 ? t + 1 : 0));
      }, 5000); // Change interval to 15000 ms (15 seconds)
      return () => {
        clearInterval(paginationTimer);
      };
    }
  }, [pages]);
  return (
    <>
      <div className="frame">
        <div className='departure-row'>
          <div className='departure-text'>Departures</div>
          <div className='pages-text'>Pages {currentPage + 1} of {pages}</div>
        </div>
        <div className='trains-grid'>
          {chunkedEvents[currentPage].map((event, index) => (
            <div className='train-row' key={index}>
              <div className='time'>{event.time}</div>
              <div className='event'>{event.event}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default App
