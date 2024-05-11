import React, { useState } from 'react';
import videocall from './icons/Video Call.png';
import search from './icons/Search Property.png';
import manager from './icons/Project Manager.png';
import Image from 'next/image';
import collegues from './icons/collegues.png';
import oneToOne from './icons/oneToone.png';
import conference from './icons/conference.png';
import clock from './icons/clock.png';

const MeetingsComponent = () => {
  // Example data for upcoming and done meetings
  const [upcomingMeetings, setUpcomingMeetings] = useState([
    { id: 1, title: 'Meeting on Vector Algebra', description: 'Vector algebra meetings deepen understanding through fundamentals.', date: '2024-05-10', startTime: '11:00pm', endTime: '12:30am', meetingType: 'One-One Meeting'},
    { id: 2, title: 'Meeting on Thermodynamics', description:'Thermodynamics Meeting: Principles, Apps, Diverse Fields.', date: '2024-05-15', startTime: '10:30am', endTime:'12:00pm', meetingType: 'Conference Meeting'}
  ]);

  const [doneMeetings, setDoneMeetings] = useState([
    { id: 3, title: 'Done Meeting 1', date: '2024-04-25' },
    { id: 4, title: 'Done Meeting 2', date: '2024-04-30' }
  ]);

  const [activeTab, setActiveTab] = useState('upcoming');

  type DateString = string;
  // Function to format date
  function formatDate(dateString: DateString): string {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    return `${day} ${month}`;
  }

  // Function to calculate days left until the meeting
  function calculateDaysLeft(meetingDate: Date): number {
    // Get the current date
    const currentDate = new Date();
    
    // Calculate the difference in milliseconds
    const differenceInMs = meetingDate.getTime() - currentDate.getTime();
    
    // Convert milliseconds to days
    const daysLeft = Math.ceil(differenceInMs / (1000 * 60 * 60 * 24));
    
    return daysLeft-1;
  }

  return (
    <div className='flex my-4'>
      {/* Upcoming meetings */}
      <div className="mx-auto py-3 border-2 rounded-xl w-3/4 mb-5">
        <div className="flex mx-4 justify-between">
          <button
            className={`px-5 py-2 mx-12 rounded-3xl text-lg ${
              activeTab === 'upcoming' ? 'bg-purple-300 text-black font-semibold' : 'text-black font-semibold'
            }`}
            onClick={() => setActiveTab('upcoming')}
          >
            Upcoming
          </button>
          <button
            className={`px-5 py-2 mx-12 rounded-3xl text-lg ${
              activeTab === 'done' ? 'bg-purple-300 text-black font-semibold' : 'text-black font-semibold'
            } ml-4`}
            onClick={() => setActiveTab('done')}
          >
            Done
          </button>
        </div>
        <hr className="border-gray-300 my-3" />
        <div>
        {/* Upcoming Meetings Tab */}
        <div style={{ display: activeTab === 'upcoming' ? 'block' : 'none' }}>
          {upcomingMeetings.map(meeting => (
            <div key={meeting.id} className="flex mb-4 mx-4 p-2 rounded-xl border-2 shadow-lg">
              <div className='bg-purple-200 rounded-lg mr-6 p-4 m-0 min-w-max'>
                <h2 className='text-lg font-semibold'>{formatDate(meeting.date)}</h2>
                <p className='text-gray-600 text-sm'>{meeting.startTime}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">{meeting.title}</h3>
                <p className='text-sm text-black font-semibold'>{meeting.description}</p>
                <p className='text-gray-600 text-sm my-1'>From {meeting.startTime} to {meeting.endTime}</p>
                <div className='flex justify-between'>
                  <div className='flex'>
                    <Image
                      src={meeting.meetingType.includes('One') ? oneToOne : conference}
                      alt='clock'
                      width={15}
                      height={15}
                    />
                    <p className='ml-2 text-sm text-purple-600'>{meeting.meetingType}</p>
                  </div>
                  <div className='flex text-right'>
                    <Image
                      src={clock}
                      alt='clock'
                      width={15}
                      height={15}
                    />
                    <p className='text-sm ml-1'>More {calculateDaysLeft(new Date(meeting.date))} days to go</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {upcomingMeetings.length === 0 && <p>No upcoming meetings</p>}
        </div>

        {/* Done Meetings Tab */}
        <div style={{ display: activeTab === 'done' ? 'block' : 'none' }}>
          {doneMeetings.map(meeting => (
            <div key={meeting.id} className="mb-4 mx-4">
              <h3 className="text-lg font-semibold">{meeting.title}</h3>
              <p className="text-gray-600">Date: {meeting.date}</p>
            </div>
          ))}
          {doneMeetings.length === 0 && <p>No done meetings</p>}
        </div>
        </div>
      </div>
      {/* About meetings */}
      <div>
      <div className='bg-purple-400 bg-opacity-10 rounded-xl px-3 py-2 text-center mx-4'>
        <h3 className='font-semibold'>About Meetings</h3>
        <div className='flex items-center justify-start my-2 mb-4 bg-white px-4 py-2 rounded-lg shadow-lg max-w-xs'>
          <div className='bg-purple-100 rounded-full mr-2 p-3 shadow-inner'>
            <Image
              src={videocall}
              alt='VideoCall'
              width={25}
              height={25}
            />
          </div>
          <p className='font-semibold text-left ml-3'>Meetings align, foster, and strategize.</p>
        </div>
        <div className='flex items-center justify-start my-2 mb-4 bg-white px-4 py-2 rounded-lg shadow-lg max-w-xs'>
          <div className='bg-purple-100 rounded-full mr-2 p-3 shadow-inner'>
            <Image
              src={search}
              alt='Property Search'
              width={30}
              height={30}
            />
          </div>
          <p className='font-semibold text-left ml-3'>Meetings enable problem-solving and exploration</p>
        </div>
        <div className='flex items-center justify-start my-2 mb-4 bg-white px-4 py-2 rounded-lg shadow-lg max-w-xs'>
          <div className='bg-purple-100 rounded-full mr-2 p-3 shadow-inner'>
            <Image
              src={manager}
              alt='Manage'
              width={30}
              height={30}
            />
          </div>
          <p className='font-semibold text-left ml-3'>Meetings enhance professional growth significantly.</p>
        </div>
      </div>
        {/* Image of office */}
        <div className='my-6 mx-2'>
          <Image
            src={collegues}
            alt='Collegues at office'
            width={280}
            height={280}
          />
        </div>
      </div>
    </div>
  );
};

export default MeetingsComponent;