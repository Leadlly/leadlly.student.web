// pages/report.tsx
import { FC } from 'react';
import TopicsCovered from './components/TopicCovered';
import Score from './components/Score';
import AttemptAnalysis from './components/AttemptAnalysis';
import TopicsEfficiency from './components/TopicEfficiency';
import Header from './components/Header';
import SolutionAnalysis from './components/SolutionAnalysis';

const Report: FC = () => {
	return (
		<div>
			<Header />
			<div className='flex w-full gap-5'>
				<TopicsCovered />
				<TopicsEfficiency />
			</div>
			<div className='flex w-full gap-5'>
				<AttemptAnalysis />
				<Score />
			</div>
			<SolutionAnalysis />
		</div>
	);
};

export default Report;
