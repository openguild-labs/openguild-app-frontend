"use client";
import { GithubLabel } from "@/utils/github/models";
import { Space } from "antd";
import React, { useState } from "react";
const MIDDLE_STYLE = {
  justifyContent: "center",
  display: "flex",
  alignItems: "center",
};

type Props = {
  categories: GithubLabel[];
  children?: (selectedCategories: Record<string, boolean>) => React.ReactNode | React.ReactNode[];
};

const QuestCategoriesSection = ({ categories, children }: Props) => {
  const [selectedCategories, setSelectedCategories] = useState<Record<string, boolean>>({});

  const handleCategoryClicked = (label: GithubLabel) => {
    setSelectedCategories({
      ...selectedCategories,
      [label.id]: !selectedCategories[label.id],
    });
  };
  return (
    <React.Fragment>
      <div>
        <Space size={40} className="mt-5" style={{ ...MIDDLE_STYLE, justifyContent: "space-between" }}>
          <div>
            <h3 className="text-black text-sm font-bold">Categories</h3>
          </div>
          <div className="flex flex-wrap items-center text-sm text-gray-400 overflow-hidden mt-5">
            {categories.map((label) => (
              <div
                onClick={() => handleCategoryClicked(label)}
                style={{
                  border: selectedCategories[label.id] ? `1px solid green` : "unset",
                  cursor: "pointer",
                }}
                className="px-2 bg-gray-100 border border-gray-500 text-black rounded m-1 flex justify-center items-center"
              >
                <div style={{ backgroundColor: `#${label.color}` }} className="w-2 h-2 mr-2"></div>
                <span style={{ fontSize: 11 }} className="flex-none">
                  {label.name}
                </span>
              </div>
            ))}
          </div>
        </Space>
      </div>
      {children && children(selectedCategories)}
    </React.Fragment>
  );
};

export default QuestCategoriesSection;
