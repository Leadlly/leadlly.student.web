import React from 'react';
import MoodEmojiSelector from './MoodEmojiSelector';

const moodEmojis = [
	{
		moodImg: '/assets/icons/sad_emoji.png',
		mood_id: 'sad-emoji',
		mood: 'sad',
	},
	{
		moodImg: '/assets/icons/unhappy_emoji.png',
		mood_id: 'unhappy-emoji',
		mood: 'unhappy',
	},
	{
		moodImg: '/assets/icons/neutral_emoji.png',
		mood_id: 'neutral-emoji',
		mood: 'neutral',
	},
	{
		moodImg: '/assets/icons/smiling_emoji.png',
		mood: 'smiling',
		mood_id: 'smiling-emoji',
	},
	{
		moodImg: '/assets/icons/laughing_emoji.png',
		mood_id: 'laughing-emoji',
		mood: 'laughing',
	},
];

const TodaysVibe = () => {
	return (
		<div className='border rounded-xl px-3 py-[10px]'>
			<h4 className='text-sm text-black font-semibold'>Today&apos;s Vibes</h4>
			<p className='text-[10px] text-black font-normal'>
				Sessions and quizzes were insightful and engaging ?
			</p>

			<MoodEmojiSelector moodEmojis={moodEmojis} />
		</div>
	);
};

export default TodaysVibe;
