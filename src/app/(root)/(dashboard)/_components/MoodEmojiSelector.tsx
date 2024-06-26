'use client';

import React, { useState } from 'react';
import Image from 'next/image';

import { TMoodEmojisProps } from '@/helpers/types';
import { cn } from '@/lib/utils';
import apiClient from '@/apiClient/apiClient';
import { toast } from 'sonner';

const MoodEmojiSelector = ({ moodEmojis }: { moodEmojis: TMoodEmojisProps[] }) => {
	const [currentMood, setCurrentMood] = useState('neutral');
	const changeMood = async (mood: string) => {
		try {
      console.log('ji')
			const response = await apiClient.post('/api/user/todaysVibe/save', { todaysVibe: mood });

			toast.success(response.data.message);
			setCurrentMood(mood);
		} catch (error: any) {
			console.log(error, 'hello');
			toast.error('Mood Change Failed', {
				description: error.message,
			});
		}
	};
	return (
		<div className='relative flex items-center justify-between mt-2 max-w-48 w-full mx-auto'>
			<span className='w-[6px] h-[6px] rounded-full bg-primary'></span>
			{moodEmojis.map((emoji) => (
				<Image
					key={emoji.mood_id}
					src={emoji.moodImg}
					alt={emoji.mood}
					width={20}
					height={20}
					onClick={() => changeMood(emoji.mood)}
					className={cn(
						'cursor-pointer transition-all ease-in duration-200',
						currentMood === emoji.mood ? 'grayscale-0' : 'grayscale'
					)}
				/>
			))}
			<span className='w-[6px] h-[6px] rounded-full bg-primary'></span>

			<div className='absolute top-1/2 left-0 -translate-y-1/2 -z-10 bg-primary w-full h-[2px] bg-[#D9D9D9]'></div>
		</div>
	);
};

export default MoodEmojiSelector;
