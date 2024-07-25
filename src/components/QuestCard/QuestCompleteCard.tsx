import React from "react";
import Name from "../ToolCard/Tool.Name";
import QuestCardContributorAvatar from "../QuestCard/QuestCardContributorAvatar";
import QuestCard from "../QuestCard";
import { GithubRepositoryIssue } from "@/utils/github/models";
import { TagsGroup } from "../TagsGroup";
import QuestCardLabels from "../QuestCard/QuestCardLabels";
import { shortenString } from "@/utils/stringUtils";
import moment from "moment";
import { CommentOutlined, LikeFilled, LikeOutlined } from "@ant-design/icons";
import { Col, Row, Space } from "antd";
import { useBreakpoint } from "@/hooks";
const MIDDLE_STYLE = {
  justifyContent: "center",
  display: "flex",
  alignItems: "center",
};

type Props = {
  issue: GithubRepositoryIssue;
};

const QuestCompleteCard = ({ issue }: Props) => {
  const { isTablet } = useBreakpoint();
  return (
    <QuestCard href={""} issue={issue}>
      <Row style={{ width: "100%", paddingBottom: isTablet ? 20 : 0 }}>
        <Col span={isTablet ? 24 : 16}>
          <Space direction="vertical">
            <Name href={issue.html_url}>{shortenString(issue.title, 100)}</Name>
            <p className="text-gray-500" style={{ fontSize: "12px" }}>
              Created at {moment.utc(issue.created_at).format("DD-MM-YYYY HH:mm")}
            </p>
            <TagsGroup>
              <QuestCardLabels labels={issue.labels} />
            </TagsGroup>
          </Space>
        </Col>
        <Col span={isTablet ? 8 : 4} style={{ ...MIDDLE_STYLE, marginTop: isTablet ? 20 : 0 }}>
          <div className="flex-1 self-center flex justify-start items-center">
            <QuestCardContributorAvatar assignees={issue.assignees} />
          </div>
        </Col>
        <Col span={isTablet ? 8 : 2} style={{ ...MIDDLE_STYLE, marginTop: isTablet ? 20 : 0 }}>
          <div className="flex-1 justify-start">
            <span className="text-sm text-orange-400 flex items-center" style={{ fontWeight: 800 }}>
              <LikeFilled style={{ marginRight: 10 }} />
              {issue.reactions.total_count}
            </span>
          </div>
        </Col>
        <Col span={isTablet ? 8 : 2} style={{ ...MIDDLE_STYLE, marginTop: isTablet ? 20 : 0 }}>
          <div className="flex-1 justify-start">
            <span className="text-sm text-gray-400 flex items-center">
              <CommentOutlined style={{ marginRight: 10 }} />
              {issue.comments}
            </span>
          </div>
        </Col>
      </Row>
    </QuestCard>
  );
};

export default QuestCompleteCard;
