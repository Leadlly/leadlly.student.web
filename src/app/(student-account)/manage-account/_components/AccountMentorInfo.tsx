import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Facebook,
  Linkedin,
  MessageCircleMore,
  Phone,
  Twitter,
} from "lucide-react";
import Link from "next/link";
import AboutMentor from "./AboutMentor";
import React from "react";
import Image from "next/image";
import MentorExperienceBox from "./MentorExperienceBox";

const mentorSocialLinks = [
  {
    url: "#",
    icon: Linkedin,
  },
  {
    url: "##",
    icon: Facebook,
  },
  {
    url: "###",
    icon: Twitter,
  },
];

const AccountMentorInfo = () => {
  return (
    <section>
      <div className="flex flex-col items-center justify-center">
        <Avatar className="w-20 h-20 md:w-28 md:h-28">
          <AvatarImage
            src="/assets/images/teacher.jpg"
            className="object-cover"
          />
          <AvatarFallback>LA</AvatarFallback>
        </Avatar>

        <h3 className="text-xl md:text-2xl font-semibold mt-2">
          <span className="text-primary">Hi, </span>
          I&apos;m Leslie Alexander
        </h3>

        <Link
          href="mailto:[lesliealexander@gmail.com]"
          className="text-sm lg:text-base text-[#717171]">
          lesliealexander@gmail.com
        </Link>

        <div className="flex items-center gap-5 lg:gap-10 mt-3">
          <Link
            href="tel:0123456789"
            className="bg-primary/25 flex items-center justify-center h-10 px-4 gap-5 rounded-md text-sm font-medium">
            <Phone className="w-4 h-4" />
            0123456789
          </Link>
          <Link
            href="/chat"
            className="border-2 flex items-center justify-center h-10 px-4 gap-5 rounded-md text-sm font-medium">
            <MessageCircleMore className="w-4 h-4" />
            Chat with Mentor
          </Link>
        </div>
      </div>

      <Separator className="my-7" />

      <div className="flex flex-col md:flex-row gap-5 md:gap-8 px-2">
        <div className="flex flex-col gap-4">
          <AboutMentor />

          <div className="flex items-center gap-3">
            {mentorSocialLinks.map((link) => (
              <Link
                key={link.url}
                href={link.url}
                className="w-9 h-9 border rounded flex items-center justify-center">
                <link.icon className="w-5 h-5" />
              </Link>
            ))}
          </div>

          <div>
            <p className="text-lg md:text-xl font-medium">
              Qualification:{" "}
              <span className="font-semibold text-sm md:text-base">
                Bachelor of Education (B.Ed)
              </span>
            </p>
            <p className="text-lg md:text-xl font-medium">
              College Name:{" "}
              <span className="font-semibold text-sm md:text-base">
                Harvard&apos;s Graduate School of Education
              </span>
            </p>
          </div>
        </div>

        <div className="md:min-w-96 space-y-4">
          <div className="space-y-3">
            <h4 className="text-base font-medium">Experience:</h4>
            <div className="grid grid-cols-2 gap-3">
              <MentorExperienceBox
                image1="/assets/images/student_1.png"
                image2="/assets/images/student_2.png"
                image3="/assets/images/student_3.png"
                text="1300+ Students"
                width={18}
                height={18}
              />
              <MentorExperienceBox
                image1="/assets/images/student_on_laptop.png"
                text="300+ Sessions"
                width={33}
                height={33}
              />
              <MentorExperienceBox
                image1="/assets/images/fire_reviews.png"
                text="100+ Reviews"
                width={20}
                height={20}
              />
              <MentorExperienceBox
                image1="/assets/images/student_thinking.png"
                text="5 Year Experience"
                width={22}
                height={26.5}
              />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
            <div className="space-y-3">
              <h4 className="text-base font-medium">Fluent In:</h4>
              <div className="flex items-start">
                <MentorExperienceBox text="English" />
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-base font-medium">Expertise In:</h4>
              <div className="flex items-center gap-2">
                <MentorExperienceBox text="Teaching" />
                <MentorExperienceBox text="Good Explanation" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccountMentorInfo;
