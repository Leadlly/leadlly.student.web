'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import EnterPhoneno from "../../../../../public/assets/images/EnterPhoneno.png";
// import Lock from "../../../../../public/assets/images/lock.png"
import gender from "../../../../../public/assets/images/gender.png"
import classselection from "../../../../../public/assets/images/class.png"
import Examselection from "../../../../../public/assets/images/exam selection.png"
import Scheduleselection from "../../../../../public/assets/images/scheduleSelecton.png"
import Female from "../../../../../public/assets/images/femalegender.png"
import Male from "../../../../../public/assets/images/malegender.png"
import Othergender from "../../../../../public/assets/images/othergender (1).png"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft } from 'lucide-react'
import OtpInput from '@/components/shared/OtpInput';
import Elevenclass from "../../../../../public/assets/images/11thclass.png"
import twelveclass from "../../../../../public/assets/images/12thclass.png"
import Dropperlass from "../../../../../public/assets/images/Dropper.png"
import jeeone from "../../../../../public/assets/images/jeeone.png"
import jeetwo from "../../../../../public/assets/images/jeetwo.png"
import neetone from "../../../../../public/assets/images/neetone.png"
import neettwo from "../../../../../public/assets/images/neettwo.png"
import neetthree from "../../../../../public/assets/images/neetthree.png"
import { ChevronLeft } from 'lucide-react';
import { StaticImageData } from 'next/image';
import { studentPersonalInfo } from '@/actions/user_actions';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { getFreeTrialActive } from '@/actions/subscription_actions';

type StepImage = {
  src: StaticImageData;
  width: number;
  height: number;
};

type GenderImages = {
  Female: StaticImageData;
  Male: StaticImageData;
  Other: StaticImageData;
}

type ClassImage = {
  Eleven: StaticImageData;
  Twelve: StaticImageData;
  Dropper: StaticImageData;
}
type ExamImages = {
  jee: {
    topRight: StaticImageData;
    bottomLeft: StaticImageData;
  };
  neet: {
    topRight: StaticImageData;
    bottomLeft: StaticImageData;
    middleRight: StaticImageData;
  };
}

const stepImages: Record<number, StepImage> = {
  1: { src: EnterPhoneno, width: 400, height: 400 }, // Image for step 1
  // 2: { src: Lock, width: 350, height: 350 },        // Image for step 2
  2: { src: gender, width: 435, height: 435 }, // Image for step 3
  3: { src: classselection, width: 435, height: 435 },  // Image for step 4
  4: { src: Examselection, width: 435, height: 435 },   // Image for step 5
  5: { src: Scheduleselection, width: 652, height: 435 } // Image for step 6
}

const genderImages: GenderImages = {
  Female,
  Male,
  Other: Othergender
};

const classImage: ClassImage = {
  Eleven: Elevenclass,
  Twelve: twelveclass,
  Dropper: Dropperlass
};

const examImages: ExamImages = {
  jee: {
    topRight: jeeone,
    bottomLeft: jeetwo,
  },
  neet: {
    topRight: neetthree,
    bottomLeft: neettwo,
    middleRight: neetone,
  },
};

export default function StudentInitialInfoForm() {
  const router = useRouter();
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    phone: '',
    gender: '',
    standard: '',
    competitiveExam: '',
    studentSchedule: ''
  })

  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleNext = () => {
    setStep(prev => Math.min(prev + 1, 6))
  }

  const handlePrevious = () => {
    setStep(prev => Math.max(prev - 1, 1))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (step < 5) {
      handleNext();
      return;
    }
  
    const submissionData = { 
      ...formData, 
      standard: Number(formData.standard),  // This should already have the correct standard
      phone: Number(formData.phone)
    };
  
    try {
      const responseData = await studentPersonalInfo(submissionData);
      toast.success(responseData.message);
  
      const trialData = await getFreeTrialActive();
      toast.success(trialData.message);
      router.push('/');
    } catch (error) {
      toast.error("Unable to save information! " + (error as Error).message);
    }
  };
  







  const { src, width, height } = stepImages[step] || { src: '', width: 400, height: 400 }

  return (
    <>
      <div className="flex items-center mb-2 mt-4">
        <Button variant="ghost" size="icon" onClick={handlePrevious} className="mr-4" disabled={step === 0}>
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <div className="w-full flex justify-center items-center gap-[51px]">
          {/* Full width wrapper for responsive layout */}
          <div className="flex items-center rounded-[5px] gap-[31px] w-full">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="flex-1 flex items-center">
                <div
                  className={`h-[8px] ${index < step ? 'bg-purple-500' : 'bg-gray-200'} rounded-[5px] transition-colors duration-300`}
                  style={{ width: '100%' }}
                ></div>
                {index < 5 - 1 && <div className="w-[10px]"></div>}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className=" flex relative top-[10%] justify-between px-4 pb-4">
        <div className="bg-white rounded-lg w-full">
          <div className="mx-8 my-4 lg:flex justify-around">
            <div className="lg:w-1/2 mb-8 lg:mb-0">
              <Image src={src} alt="Step Image" width={width} height={height} className="mx-auto" />
            </div>

            <div className="lg:w-1/2 lg:pl-8 justify-center flex items-center">
              <form onSubmit={handleSubmit} className="space-y-6">
                {step === 1 && (
                  <div className="mx-8 my-4 flex flex-col justify-center items-center">
                    <h2 className="text-4xl text-center font-bold mb-4">Enter Your Phone number?</h2>
                    <p className="text-gray-600 text-center mb-6">
                      We need to register your phone number before getting started!
                    </p>
                    <div className="flex gap-4">
                      <Select
                        value="+91"
                        onValueChange={(value) => handleSelectChange('countryCode', value)}
                      >
                        <SelectTrigger className="w-[120px]">
                          <SelectValue placeholder="Code" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="+91">+91</SelectItem>
                          <SelectItem value="+1">+1</SelectItem>
                          <SelectItem value="+44">+44</SelectItem>
                        </SelectContent>
                      </Select>

                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="flex items-center gap-x-2 px-4 py-2 border border-input rounded-md h-12 bg-background w-full ml-2 mb-4"
                      />
                    </div>
                    <Button
                      onClick={step < 5 ? handleNext : handleSubmit}
                      className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3"
                    >
                      {step < 5 ? 'Next' : 'Finish'}
                    </Button>
                  </div>
                )}

               

{step === 2 && (
  <div className="space-y-4 flex flex-col items-center justify-center">
    <h2 className="text-2xl font-bold mb-2">What is your Gender?</h2>
    <p className="text-gray-600 text-center mb-4">
      Select your gender from the given below options
    </p>
    <RadioGroup
      onValueChange={(value) => handleSelectChange('gender', value)}
      value={formData.gender}
      className="flex flex-col items-center space-y-4"
    >
      <div className="flex gap-[50px] space-x-4">
        {['Female', 'Male'].map((gender) => (
          <button
            onClick={() => handleSelectChange('gender', gender)}
            key={gender}
            className="flex flex-col items-center"
          >
            <RadioGroupItem value={gender} id={gender} className="sr-only" />
            <Label
              htmlFor={gender}
              className={`cursor-pointer flex flex-col justify-center items-center p-4 border-2 rounded-lg ${formData.gender === gender ? 'border-purple-500' : 'border-gray-200'
                }`}
              style={{ width: '143px', height: '140px' }} // Set the width and height here
            >
              <Image
                src={genderImages[gender as keyof GenderImages]}
                alt={gender}
                width={80} // Adjust width as necessary
                height={80} // Adjust height as necessary
                className="mb-2"
              />
              <span className="capitalize text-center">{gender}</span>
            </Label>
          </button>
        ))}
      </div>
      <div className="flex justify-center">
        <button
          onClick={() => handleSelectChange('gender', 'Other')}
          className="flex flex-col items-center"
        >
          <RadioGroupItem value="Other" id="Other" className="sr-only" />
          <Label
            htmlFor="Other"
            className={`cursor-pointer flex flex-col justify-center items-center p-4 border-2 rounded-lg ${formData.gender === 'Other' ? 'border-purple-500' : 'border-gray-200'
              }`}
            style={{ width: '143px', height: '140px' }} // Set the width and height here
          >
            <Image
              src={genderImages['Other']}
              alt="Other"
              width={80} // Adjust width as necessary
              height={80} // Adjust height as necessary
              className="mb-2"
            />
            <span className="capitalize text-center">Other</span>
          </Label>
        </button>
      </div>
    </RadioGroup>
  </div>
)}

{step === 3 && (
  <div className="space-y-4 flex flex-col items-center justify-center">
    <h2 className="text-2xl font-bold mb-2">Which class are you studying?</h2>
    <p className="text-gray-600 text-center mb-4">
      Focus on core topics with hands-on practice and real-world examples for deeper understanding.
    </p>
    <div className="flex flex-col items-center">
      <div className="flex gap-[50px] space-x-4 mb-4">
      {['Eleven', 'Twelve'].map((classOption) => (
  <button
    key={classOption}
    type="button"
    onClick={() => {
      handleSelectChange('standard', classOption);
      handleNext();
    }}
    className={`flex flex-col justify-center items-center p-4 border-2 rounded-lg ${formData.standard === classOption ? 'border-purple-500' : 'border-gray-200'
    }`}
    style={{ width: '140px', height: '140px' }}
  >
    <Image
      src={classImage[classOption as keyof ClassImage]}
      alt={classOption}
      width={113}
      height={113}
      className="mb-2"
    />
    <span className="capitalize">{classOption}</span>
  </button>
))}

      </div>
      <div className="flex justify-center">
        <button
          key="Dropper"
          type="button"
          onClick={() => {
            handleSelectChange('standard', 'Dropper');
            handleNext();
          }}
          className={`flex flex-col justify-center items-center p-4 border-2 rounded-lg ${formData.standard === 'Dropper' ? 'border-purple-500' : 'border-gray-200'
            }`}
          style={{ width: '140px', height: '140px' }} // Set the width and height here
        >
          <Image
            src={classImage['Dropper']} // Use dynamic image for 'Dropper'
            alt="Dropper"
            width={64} // Adjust width as necessary
            height={64} // Adjust height as necessary
            className="mb-2"
          />
          <span className="capitalize">Dropper</span>
        </button>
      </div>
    </div>
  </div>
)}

                {step === 4 && (
                  <div className="space-y-4 flex flex-col items-center justify-center">
                    <h2 className="text-2xl font-bold mb-2">Are your Studying for?</h2>
                    <p className="text-gray-600 text-center mb-4">
                      Focus on core topics with hands-on practice and real-world examples for deeper understanding.
                    </p>
                    <div className="flex justify-center" style={{ gap: '102px' }}>
                      {['jee', 'neet'].map((exam) => (
                        <button
                          key={exam}
                          type="button"
                          onClick={() => {
                            handleSelectChange('competitiveExam', exam);
                            handleNext();
                          }}
                          className={`relative flex flex-col justify-center items-center p-4 border-2 rounded-lg shadow-md ${formData.competitiveExam === exam ? 'border-purple-500' : 'border-gray-200'
                            }`}
                          style={{
                            width: '140px',
                            height: '180px',
                            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', // Added shadow
                          }}
                        >
                          {/* Main text with dynamic color */}
                          <div
                            className="flex items-center justify-center"
                            style={{
                              width: '100%',
                              height: '70%',
                              color: exam === 'jee' ? '#2D61FD' : '#06E480', // JEE and NEET color
                              fontSize: '24px',
                              fontWeight: 'bold',
                            }}
                          >
                            {exam.toUpperCase()}
                          </div>

                          {/* Top-right image */}
                          <Image
                            src={examImages[exam as keyof ExamImages].topRight}
                            alt={`${exam}-top-right`}
                            width={77}
                            height={77}
                            className="absolute top-[-0.5rem] right-[-0.5rem] overflow-hidden"
                          />

                          {/* Bottom-left image */}
                          <Image
                            src={examImages[exam as keyof ExamImages].bottomLeft}
                            alt={`${exam}-bottom-left`}
                            width={70}
                            height={50}
                            className="absolute bottom-2 left-[-0.5rem]"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

               {step === 5 && (
  <div className="space-y-4">
    <h1 className="text-2xl text-center font-bold mb-4">Schedule you follow?</h1>
    <p className="text-gray-600 text-center mb-4">Focus on core topics with hands-on practice and real-world examples for deeper understanding.</p>
    <div className="flex flex-col w-full space-y-4">
      {['School + Coaching + Self-study', 'Coaching + Self-study', 'School + Self-study', 'Only Self-study'].map((schedule, index) => (
        <Button
          key={index}
          type="button"
          onClick={() => handleSelectChange('studentSchedule', schedule)}
          variant={formData.studentSchedule === schedule ? 'default' : 'outline'}
          className="w-full h-16 shadow-none flex items-center justify-start pl-4 text-[16px] font-semibold"
        >
          {schedule}
        </Button>
      ))}
    </div>
    <div className="flex justify-center"> {/* Centering the button */}
      <Button
        type="submit"
        className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 mt-6"
      >
        Finish
      </Button>
    </div>
  </div>
)}
              </form>

            </div>
          </div>

        </div>
      </div>
    </>

  )
}