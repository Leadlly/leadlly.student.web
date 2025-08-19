"use client";

import { useState } from "react";

const AboutMentor = () => {
  const [showMore, setShowMore] = useState(false);
  const text =
    "Leslie Alexander is a passionate educator dedicated to empowering your minds through Young one mentorship. With over 8 years of experience in teaching and mentoring, Sarah has honed her skills in guiding intermediate and 10th-grade students towards academic success and personal growth.";
  return (
    <p className="text-base md:text-lg">
      {showMore ? text : text.slice(0, 200)}
      <span
        className="font-medium text-primary cursor-pointer whitespace-nowrap"
        onClick={() => setShowMore(!showMore)}>
        {showMore ? "...show less" : "...show more"}
      </span>
    </p>
  );
};

export default AboutMentor;
