/* abc*/
"use client";

import { IconArrowTopRight, IconArrowLongLeft } from "@/components/Icons";
import LinkShiny from "../LinkShiny";
import { Tabs } from "../TabsLink";
import TabLink from "../TabsLink/TabLink";
import { TagsGroup } from "../TagsGroup";
import Modal from "../Modal";
import { useRouter } from "next/navigation";
import GithubAvatarList from "../GithubAvatarList";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import QuestCardLabels from "../QuestCard/QuestCardLabels";
import { GithubRepositoryIssue } from "@/utils/github/models";

export default ({ href, repositoryIssue, close }: { href: string; repositoryIssue: GithubRepositoryIssue; close: () => void }) => {
  const router = useRouter();
  const tabs = [
    {
      name: "About Quest",
      sectionId: "about",
    },
    {
      name: "Comments",
      sectionId: "comments",
    },
  ];

  return (
    <>
      <Modal
        isActive={true}
        onCancel={close}
        variant="custom"
        classNameContainer="px-0 py-0 sm:py-8"
        className="max-w-4xl bg-white px-0 py-8 view-modal"
      >
        <div>
          <div className="container-custom-screen pt-4 pb-10">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-x-2 py-2 px-4 text-gray-800 border border-gray-700 rounded-lg hover:bg-slate-500 duration-150"
            >
              <IconArrowLongLeft />
              Go back
            </button>
          </div>
          <div className="container-custom-screen" id="about">
            <h1 className="mt-3 text-gray-950 font-medium">{repositoryIssue.title}</h1>
            <div className="text-sm mt-3 flex items-center gap-x-3">
              <LinkShiny href={repositoryIssue.html_url} target="_blank" className="flex items-center gap-x-2">
                View on Github
                <IconArrowTopRight />
              </LinkShiny>
            </div>
            <div className="mt-10">
              <GithubAvatarList users={repositoryIssue.assignees} />
            </div>
          </div>
        </div>
        <Tabs ulClassName="container-custom-screen" className="mt-20 sticky pt-2 top-0 z-10 bg-gray-100">
          {tabs.map((item, idx) => (
            <TabLink variant="nonlink" sectionId={item.sectionId} key={idx}>
              {item.name}
            </TabLink>
          ))}
        </Tabs>
        <div className="space-y-20">
          <div>
            <div className="relative overflow-hidden pb-12">
              <div className="absolute top-0 w-full h-[100px] opacity-40 bg-[linear-gradient(180deg,_rgba(124,_58,_237,_0.06)_0%,_rgba(72,_58,_237,_0)_100%)]"></div>
              <div className="relative container-custom-screen mt-12">
                <Markdown
                  remarkPlugins={[[remarkGfm]]}
                  className={"markdown-renderer-container text-gray-900 whitespace-pre-wrap"}
                  children={repositoryIssue.body}
                  rehypePlugins={[rehypeRaw]}
                />
                {repositoryIssue.labels.length > 0 ? (
                  <div className="mt-6 flex flex-wrap gap-3 items-center">
                    <h3 className="text-sm text-gray-400 font-medium">Classified in</h3>
                    <TagsGroup>
                      <QuestCardLabels labels={repositoryIssue.labels} />
                    </TagsGroup>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
