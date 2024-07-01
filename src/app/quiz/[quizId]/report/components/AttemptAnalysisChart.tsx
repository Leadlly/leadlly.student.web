'use client';

import dynamic from 'next/dynamic';
import { FC } from 'react';

const Charts = dynamic(() => import('react-apexcharts'), { ssr: false });

interface AttemptAnalysisChartProps {
	correctAnswers: number;
	incorrectAnswers: number;
	notAttempted: number;
	efficiency: number;
}

const AttemptAnalysisChart: FC<AttemptAnalysisChartProps> = ({
	correctAnswers,
	incorrectAnswers,
	notAttempted,
	efficiency,
}) => {
	const series = [correctAnswers, incorrectAnswers, notAttempted];

	return (
		<Charts
			type='donut'
			width={'100%'}
			height={'100%'}
			series={series}
			options={{
				chart: {
					height: '100%',
					type: 'donut',
				},
				labels: ['correct Answers', 'incorrect Answers', 'not Attempted'],

				responsive: [
					{
						breakpoint: 763,
						options: {
							chart: {
								width: 150,
							},
							plotOptions: {
								pie: {
									donut: {size:'80',
										labels: {
											show: true,
											value: {
												fontWeight: 700,
												fontFamily: 'Mada, sans-serif',
												fontSize: '20px',
												color: '#000000',
												offsetY: 0,
											},
										},
									},
								},
							},
						},
					},
				],
				legend: {
					show: false,
				},
				dataLabels: {
					enabled: false,
				},
				colors: ['#0FD679', '#E62308', '#9654F41A'],
				stroke: {
					width: 3,
				},
				plotOptions: {
					pie: {
						customScale: 0.9,
						donut: {size:'80',
							labels: {
								show: true,
								value: {
									fontWeight: 700,
									fontFamily: 'Mada, sans-serif',
									fontSize: '24px',
									color: '#000000',
									offsetY: 0,
								},
								total: {
									show: true,
									color: '#939393',
									fontFamily: 'Mada, sans-serif',
									fontSize: '13px',
									label: 'Efficiency',
									formatter: () => `${efficiency}%`,
								},
							},
						},
					},
				},
			}}
		/>
	);
};

export default AttemptAnalysisChart;
