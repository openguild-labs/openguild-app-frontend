/* abc*/
"use client";

import mergeTW from "@/utils/mergeTW";
import { MouseEvent, ReactNode, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import QuestViewModal from "../QuestViewModal";
import { GithubRepositoryIssue } from "@/utils/github/models";

export default ({
  href,
  className,
  issue,
  children,
}: {
  href: string;
  className?: string;
  issue: GithubRepositoryIssue;
  children?: ReactNode;
}) => {
  const [isQuestViewActive, setQuestViewActive] = useState(false);
  const [repositoryIssue, setRepositoryIssue] = useState(issue);

  const router = useRouter();
  const pathname = usePathname();

  const closeViewModal = () => {
    setQuestViewActive(false);
    document.body.classList.remove("overflow-hidden");
    router.back();
  };

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    setTimeout(() => document.getElementById("nprogress")?.classList.add("hidden"), 200);

    setRepositoryIssue(issue);
    window.history.pushState({ href }, "", href);
    setQuestViewActive(true);
    document.body.classList.add("overflow-hidden");
  };

  useEffect(() => {
    window.addEventListener("popstate", (e) => {
      setQuestViewActive(false);
      document.body.classList.remove("overflow-hidden");
    });
  }, []);

  useEffect(() => {
    setQuestViewActive(false);
    document.body.classList.remove("overflow-hidden");
  }, [pathname]);

  return (
    <>
      <div className="relative group my-2 group/card">
        <div
          onClick={handleClick}
          className={mergeTW(
            `flex items-start py-2 px-4 bg-slate-50 group-hover:bg-slate-300/60 duration-150 relative cursor-pointer ${className}`,
          )}
        >
          {children}
        </div>
        <div className="absolute -z-10 group-hover:bg-slate-700/60 opacity-0 group-hover:opacity-100 duration-150 sm:-inset-2"></div>
      </div>
      {isQuestViewActive ? <QuestViewModal close={closeViewModal} repositoryIssue={repositoryIssue} href={href} /> : ""}
    </>
  );
};
