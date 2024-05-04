"use client"
import React, { useState } from 'react';
import ChatComponent from './_components/ChatComponent';
import MeetingsComponent from './_components/MeetingsComponent';
import RequestMeetingComponent from './_components/RequestMeetingComponent';
import mentorImage from './_components/icons/Frame 476.png';

const Page = () => {
    const [activeTab, setActiveTab] = useState<String>('chat');

    const handleTabChange = (tabName: string) => {
        setActiveTab(tabName);
    };

    return (
        <div>
            <h2 className='text-3xl mt-6 font-semibold'>Connect with mentor</h2>
            <div className="mt-4">
                <div className="flex bg-purple-400 bg-opacity-10 rounded-2xl overflow-hidden shadow-md">
                    <span
                        className={`tab-btn flex-1 text-xl p-3 text-center relative cursor-pointer font-semibold ${activeTab === 'chat' ? 'text-purple-600' : 'text-gray-700'}`}
                        onClick={() => handleTabChange('chat')}
                    >
                        Chats
                        {activeTab === 'chat' && <span className="absolute bottom-0 left-0 w-full h-1 bg-purple-600"></span>}
                    </span>
                    <span
                        className={`tab-btn flex-1 p-3 text-xl text-center relative cursor-pointer font-semibold ${activeTab === 'meetings' ? 'text-purple-600' : 'text-gray-700'}`}
                        onClick={() => handleTabChange('meetings')}
                    >
                        Meetings
                        {activeTab === 'meetings' && <span className="absolute bottom-0 left-0 w-full h-1 bg-purple-600"></span>}
                    </span>
                    <span
                        className={`tab-btn flex-1 p-3 text-xl text-center relative cursor-pointer font-semibold ${activeTab === 'requestMeeting' ? 'text-purple-600' : 'text-gray-700'}`}
                        onClick={() => handleTabChange('requestMeeting')}
                    >
                        Request Meeting
                        {activeTab === 'requestMeeting' && <span className="absolute bottom-0 left-0 w-full h-1 bg-purple-600"></span>}
                    </span>
                </div>
                <div>
                    {activeTab === 'chat' &&
                    <ChatComponent
                        chatData={{
                            img: mentorImage,
                            title: 'Dhruvi Rawal',
                            status: 'Last seen today at 11:50 PM',
                            messages: [
                                { sender: 'user', text: 'Hello there!', timestamp: '9:00 AM' },
                                { sender: 'mentor', text: 'Hi! How can I help you today?', timestamp: '9:05 AM' },
                                { sender: 'user', text: 'I need some assistance with my project.', timestamp: '9:10 AM' },
                                { sender: 'mentor', text: 'Sure, I`d be happy to help. What specifically do you need assistance with?', timestamp: '9:15 AM' },
                                { sender: 'user', text: 'I`m having trouble with the implementation of a feature.', timestamp: '9:20 AM' },
                                { sender: 'mentor', text: 'Okay, let`s take a look at your code and debug it together.', timestamp: '9:25 AM' },
                                // Add more messages
                            ]
                        }}
                    />}
                    {activeTab === 'meetings' && <MeetingsComponent />}
                    {activeTab === 'requestMeeting' && <RequestMeetingComponent />}
                </div>
            </div>
        </div>
    );
};

export default Page;
