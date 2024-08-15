'use client';

import React from 'react';

import { GithubRepositoryIssue } from '@/utils/github/models';
import QuestCompleteCard from '../QuestCard/QuestCompleteCard';
import { Col, Row } from 'antd';
import { useBreakpoint } from '@/hooks';

const QuestCardList = ({ issues }: { issues: GithubRepositoryIssue[] }) => {
  const { isTablet } = useBreakpoint();
  return (
    <div>
      <Row style={{ width: '100%' }} className="border-b border-gray-400 px-4 py-2 bg-gray-100">
        <Col span={16}>
          <h3 className="text-gray-400 text-sm font-bold" style={{ fontSize: 10 }}>
            TOPIC
          </h3>
        </Col>
        <Col span={isTablet ? 8 : 4}>
          <h3 className="text-gray-400 text-sm font-bold" style={{ fontSize: 10 }}>
            CONTRIBUTORS
          </h3>
        </Col>
        {!isTablet && (
          <React.Fragment>
            <Col span={2}>
              <h3 className="text-gray-400 text-sm font-bold" style={{ fontSize: 10 }}>
                REACTIONS
              </h3>
            </Col>
            <Col span={2}>
              <h3 className="text-gray-400 text-sm font-bold" style={{ fontSize: 10 }}>
                REPLIES
              </h3>
            </Col>
          </React.Fragment>
        )}
      </Row>
      <div>
        {issues.map(issue => (
          <QuestCompleteCard key={issue.node_id} issue={issue} />
        ))}
      </div>
    </div>
  );
};

export default QuestCardList;
