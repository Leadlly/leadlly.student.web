'use client'
import React, { useState } from 'react';
import videoCall from './icons/Video Call.png';
import Image from "next/image";
import { Header } from '@/components';
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { toast } from "@/components/ui/use-toast"
import { Textarea } from "@/components/ui/textarea"
import SentIcon from '@/components/icons/SentIcon';
// import manCoding from 'public/assets/images/programmer.png'
 
const FormSchema = z.object({
  dob: z.date({
    required_error: "A date of is required to request meeting.",
  }),
})

const RequestMeetingComponent = () => {

  // const [selectedMeetingTime, setSelectedMeetingTime] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })
  
  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    // Include the selected meeting time in the form submission data
    const formData = { ...data };
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(formData, null, 2)}</code>
        </pre>
      ),
    });
    setSubmitted(true);
  };

  return (
    <div>
      {
      !submitted ?
      <div className="flex flex-col border bg-opacity-10 rounded-xl overflow-hidden" style={{ height: "75dvh" }}>
        {/* Request Meet */}
        <div className='flex mx-auto mt-4 mb-6'>
        <Image className='mx-2 my-auto' src={videoCall} alt="VideoCall" width={30} height={30} />
        <h1 className='font-bold text-2xl'>Request <span className='text-purple-600 font-normal'>Meet</span></h1>
        </div>
        {/* Embarking */}
        <div className='text-center'>
          <h1 className='font-bold text-xl p-2 mt-2'>Embarking on a Journey Request for Mentorship Meeting</h1>
          <p className='mx-6 p-4 text-base'>A meeting request offers students tailored mentorship, guidance, and support, fostering an environment for accessing valuable insights and resources to enhance personal development.</p>
        </div>
        {/* Date & Time pick */}
        <div className='mx-auto my-6 relative'>
          {/* Background image */}
          {/* <div className="absolute top-0 right-0 h-full w-1/3 bg-cover bg-no-repeat" style={{ backgroundImage: manCoding }}></div> */}
          <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='flex'>
            {/* Date Select */}
            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            // !field.value && ""
                          )}
                        >
                          {field.value ? (
                            format(field.value, "dd-MM-yyyy")
                          ) : (
                            format(Date(), "dd-MM-yyyy")
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => {
                          const currentDate = new Date();
                          const endDate = new Date();
                          endDate.setDate(currentDate.getDate() + 7); // Set end date to 7 days from today
                          return date < currentDate || date > endDate;
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Time Select */}
            <p>Time</p>
          </form>
          <div className='my-6'>
            <Textarea placeholder="Type your doubt here..." className="resize-none"/>
          </div>
          <div className="text-center"> {/* Center the button */}
            <Button variant='default' type='submit' onClick={()=> setSubmitted(true)}>Submit Request</Button>
          </div>
          </Form>
        </div>
      </div>
      :
      <div className="flex flex-col border bg-opacity-10 rounded-xl overflow-hidden" style={{ height: "75dvh" }}>
        <div className='m-auto text-center'>
          <SentIcon />
          <h1 className='text-purple-600 text-4xl font-bold'>Sent Successfully</h1>
          <h3 className='text-3xl font-semibold mt-6'>Thank You!</h3>
          <p className='font-medium text-xl m-1'>Your Request has been sent</p>
        </div>
      </div>
      }
    </div>
  )
}

export default RequestMeetingComponent