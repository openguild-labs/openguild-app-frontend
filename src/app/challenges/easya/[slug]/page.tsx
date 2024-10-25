"use client";
import React, { useMemo, useState } from "react";
import Courses from "../polkadot.json";
import { Divider } from "antd";
import { CheckIcon } from "@mantine/core";

interface Props {
  params: {
    slug: string;
  };
}
export default function ChallengesPage({ params: { slug } }: Props) {
  const course = useMemo(() => Courses.find((course) => course.href === slug), [slug]);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<string | undefined>(undefined);
  const checkCorrectChoice = (course: any) =>
    course.challengeSteps[currentStep].correctChoice ===
    course.challengeSteps[currentStep].choices?.find((choice: any) => choice === selectedChoice);

  return !course ? (
    <div>Not found</div>
  ) : (
    <div>
      <div className="pt-5">
        <div className="shadow-lg py-10 mx-auto px-10 border" style={{ maxWidth: 700, borderRadius: 20 }}>
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-2xl font-bold">
              {course.icon}
              <span className="text-primary-color ml-4">{course.title}</span>
            </h1>
            <p className="mt-3 bg-blue-500 py-1 px-5 font-bold text-white rounded">
              {course.xp} XP ( {parseInt(((currentStep / (course.challengeSteps.length - 1)) * 100).toFixed(2))}%)
            </p>
          </div>
          <br />
          <Divider />
          {currentStep === course.challengeSteps.length - 1 ? (
            <div className="text-center">Congratulations! You've finished the challenge.</div>
          ) : (
            <React.Fragment>
              {course.challengeSteps.map((challenge, index) =>
                currentStep === index ? (
                  <div key={challenge.id}>
                    <div className="border-b border-slate-200">
                      <h1 className="font-bold">{challenge.title}</h1>
                      {challenge.imageUrl && (
                        <img
                          src={challenge.imageUrl}
                          width={"100%"}
                          height={"200px"}
                          style={{ borderRadius: 10, marginBottom: 20, marginTop: 20 }}
                        />
                      )}
                      <div className="overflow-hidden pb-6 flex flex-col gap-4 transition-all duration-300 ease-in-out">
                        <div className="pb-5 text-sm text-slate-500">{challenge.details || ""}</div>
                        {challenge.choices?.map((choice, index) => (
                          <div className="inline-flex items-center">
                            <label className="relative flex items-center cursor-pointer" htmlFor={`choice-${challenge.id}-${index}`}>
                              <input
                                onChange={() => setSelectedChoice(choice)}
                                name="framework"
                                type="radio"
                                className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 checked:border-slate-400 transition-all"
                                id={`choice-${challenge.id}-${index}`}
                              />
                              <span className="absolute bg-slate-800 w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
                            </label>
                            <label className="ml-2 text-slate-600 cursor-pointer text-sm" htmlFor={`choice-${challenge.id}-${index}`}>
                              {choice}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div></div>
                )
              )}
            </React.Fragment>
          )}

          <div className="flex gap-2 justify-center">
            {currentStep > 0 && (
              <button
                className="mt-5 rounded-full bg-green-500 text-white text-sm py-2 px-5"
                onClick={() => setCurrentStep((step) => (step -= 1))}
              >
                Previous challenge
              </button>
            )}
            {currentStep < course.challengeSteps.length - 1 && (
              <button
                className={`mt-5 rounded-full ${checkCorrectChoice(course) ? "bg-green-500" : "bg-gray-500"} text-white text-sm py-2 px-5`}
                onClick={() =>
                  (course.challengeSteps[currentStep].choices ? selectedChoice && checkCorrectChoice(course) : true) &&
                  setCurrentStep((step) => (step += 1))
                }
              >
                Next challenge
              </button>
            )}
            {currentStep === course.challengeSteps.length - 1 && (
              <button
                className="mt-5 flex items-center rounded-full bg-green-500 text-white text-sm py-2 px-5"
                onClick={() => setCurrentStep((step) => (step -= 1))}
              >
                <CheckIcon style={{ width: 15, marginRight: 10 }} />
                Finish & Claim {course.xp} XP
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
