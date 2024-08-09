
import { MoveLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
type Props = {};
const BackButton = (props: Props) => {
  return (
		<Link href={'/quizzes'}>
			<button className='border-[1px] p-2 border-[#D3D3D3] bg-white rounded-[8px] shadow-custom-back'>
				<MoveLeft
					size={24}
					color='#5D5D5D'
					strokeWidth={3}
				/>
			</button>
		</Link>
	);
};
export default BackButton;
