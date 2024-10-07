"use client";
import { Tag } from "antd";
import { Course } from "./types";
import { useState } from "react";

export default function CourseCard(course: Course) {
  const [currentStep, setCurrentStep] = useState(3);
  return (
    <button
      onClick={() => (location.href = `/challenges/easya/${course.href}`)}
      className="shadow-xl font-bold py-5 px-5 transition w-full ease-in-out delay-150 bg-white-500 hover:-translate-y-1 hover:scale-105 hover:bg-purple-200 duration-300 mx-auto text-left rounded-2xl border mb-3"
    >
      <span style={{ marginRight: 10 }}>{course.icon}</span>
      {course.title}
      <div className="flex gap-3 mt-4">
        <Tag className="font-bold text-white bg-purple-500 border-none text-sm">{course.xp} XP</Tag>
        <div className="font-normal text-sm text-nowrap">{course.challengeSteps.length} challenges</div>
        <div className="w-full bg-gray-200 rounded-full">
          <div
            className="bg-blue-600 h-full py-1 text-xs font-medium text-white text-center p-0.5 leading-none rounded-full"
            style={{ width: `${(currentStep / course.challengeSteps.length) * 100}%` }}
          >
            {parseInt(((currentStep / course.challengeSteps.length) * 100).toFixed(2))}%
          </div>
        </div>
      </div>
    </button>
  );
}
