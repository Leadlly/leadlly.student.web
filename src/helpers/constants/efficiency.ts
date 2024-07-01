import { EfficiencyOption } from ".";
export const efficiencyOptions: EfficiencyOption[] = [
	{
		max: 30,
		label: '0-30%',
		progressBarColor: 'bg-red-500',
		textColor: 'text-red-500',
	},
	{
		min: 30,
		max: 50,
		label: '30-50%',
		progressBarColor: 'bg-orange-500',
		textColor: 'text-orange-500',
	},
	{
		min: 50,
		max: 70,
		label: '50-70%',
		progressBarColor: 'bg-yellow-500',
		textColor: 'text-yellow-500',
	},
	{
		min: 70,
		max: 90,
		label: '70-90%',
		progressBarColor: 'bg-orange-300',
		textColor: 'text-orange-300',
	},
	{
		min: 90,
		label: '90-100%',
		progressBarColor: 'bg-green-400',
		textColor: 'text-green-400',
	},
];


function findEfficiencyOption(
  efficiency: number
): EfficiencyOption | undefined {
  if (isNaN(efficiency)) {
    throw new Error("Efficiency must be a number.");
  }

  return efficiencyOptions.find((opt) => {
    if (opt.min !== undefined && opt.max !== undefined) {
      return efficiency >= opt.min && efficiency < opt.max;
    } else if (opt.min !== undefined) {
      return efficiency >= opt.min;
    } else if (opt.max !== undefined) {
      return efficiency < opt.max;
    }
    return false;
  });
}

export function getProgressBarColor(efficiency: number): string {
	const option = findEfficiencyOption(efficiency);
	if (!option) {
		return 'bg-[#ffffff]';
	}

	return option.progressBarColor;
}
export function getTextColor(efficiency: number): string {
  const option = findEfficiencyOption(efficiency);
  if (!option) {
    return 'text-red-500'
  }

  return option.textColor;
}
