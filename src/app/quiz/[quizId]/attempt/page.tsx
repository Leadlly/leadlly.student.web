import Quiz from './components/Quiz';

type Props = { params: { quizId: string } };
const page = ({params:{quizId}}: Props) => {
	return <Quiz quizId={quizId}/>;
};
export default page;
