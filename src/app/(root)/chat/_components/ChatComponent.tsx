import React from 'react';
import Image, { StaticImageData } from 'next/image';
import emoji from './icons/Happy.png';
import attach from './icons/Vector_clip.png';
import mic from './icons/Icon Frame.png';
import send from './icons/Vector 135.png';
import call from './icons/call.png';
import dots from './icons/dots.png';

interface ChatData {
  img: StaticImageData;
  title: string;
  status: string;
  messages: Array<{
    sender: string;
    text: string;
    timestamp: string;
  }>;
}

const ChatComponent: React.FC<{ chatData: ChatData }> = ({ chatData }) => {
    return (
        <div className="flex flex-col my-4 bg-purple-400 bg-opacity-10 rounded-xl overflow-hidden" style={{ height: '75vh' }}>
            <div className="bg-white py-4 px-6 border-b border-gray-200 flex items-center">
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center">
                        <div className="rounded-full bg-blue-500 w-11 h-11 flex items-center justify-center mr-4">
                            <Image src={chatData.img} width={100} height={100} alt="User Avatar" className="rounded-full" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">{chatData.title}</h3>
                            <p className="text-sm text-gray-600">{chatData.status}</p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <button className="text-gray-600 hover:text-gray-800 mx-5">
                          {/* Add onClick */}
                        <Image
                          src={call}
                          alt='Call'
                          width={23}
                          height={23}
                        />
                        </button>
                        <button className="text-gray-600 hover:text-gray-800 ml-5">
                          {/* Add onClick */}
                        <Image
                          src={dots}
                          alt='Menu'
                          width={5}
                          height={5}
                        />
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex-1 overflow-y-auto">
                {/* Chat messages go here */}
                <div className="flex flex-col p-4">
                    {chatData.messages.map((message, index) => (
                        <div className={`flex ${message.sender === 'mentor' ? 'justify-start' : 'justify-end'} mb-2`} key={index}>
                            <div>
                                <div className={`bg-${message.sender === 'mentor' ? 'white' : 'purple-400' } py-2 px-4 rounded-lg max-w-sm`}>
                                    <p>{message.text}</p>
                                </div>
                                <span className="text-xs text-gray-400 mx-1">{message.sender === 'mentor' ? 'Mentor, ' : 'You, '}{message.timestamp}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex items-center border rounded-lg p-2 mx-6 my-4 bg-white ">
      <Image
        src={emoji}
        alt="Emoji"
        className="mr-2"
        width={30}
        height={30}
        // onClick={}
      />
      <input
        type="text"
        placeholder="Type a Message here!..."
        className="flex-1 bg-transparent outline-none mx-3"
      />
      <Image
        src={attach}
        alt="Attachment"
        className="mx-2"
        width={15}
        height={15}
        // onClick={}
      />
      <Image
        src={mic}
        alt="Mic"
        className="mx-2"
        width={25}
        height={25}
        // onClick={}
      />
      <button type="submit" className='mx-3 px-4 py-2 rounded-lg bg-purple-600'>
        <Image
          src={send}
          alt="Send Message"
          width={20}
          height={20}
        />
      </button>
    </div>
        </div>
    );
};

export default ChatComponent;
