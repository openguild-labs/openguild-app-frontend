export const enum ContributionLevel {
  Null = 'Null',
  NONE = 'NONE',
  FIRST_QUARTILE = 'FIRST_QUARTILE',
  SECOND_QUARTILE = 'SECOND_QUARTILE',
  THIRD_QUARTILE = 'THIRD_QUARTILE',
  FOURTH_QUARTILE = 'FOURTH_QUARTILE',
}

export const enum ErrorType {
  BadCredentials,
  BadRequest,
}

export const enum GraphSize {
  Small = 's',
  Medium = 'm',
  Large = 'l',
}

export const enum DisplayName {
  Username = '0',
  ProfileName = '1',
}

export type Themes =
  | 'GitHub'
  | 'GitHubDark'
  | 'Winter'
  | 'GitLab'
  | 'GitLabDark'
  | 'Halloween'
  | 'Dracula'
  | 'Slate'
  | 'Rose'
  | 'Indigo'
  | 'Emerald'
  | 'Sky'
  | 'Amber';

export interface Theme {
  name: Themes;
  textColor: string;
  levelColors: [
    level_0: string,
    level_1: string,
    level_2: string,
    level_3: string,
    level_4: string
  ];
  background: string;
  mode?: 'light' | 'dark';
}

export type GitHubUsername = string;
export type ContributionYear = number;

export interface GitHubUser {
  name?: string;
  login: GitHubUsername;
  avatarUrl: string;
  contributionsCollection: {
    years: ContributionYear[];
  };
}

export interface GitHubContributionCalendar {
  contributionsCollection: {
    contributionCalendar: ContributionCalendar;
  };
}

export interface ContributionBasic {
  name?: string;
  login: GitHubUsername;
  avatarUrl: string;
  contributionYears: ContributionYear[];
}

export interface ContributionDay {
  level: `${ContributionLevel}`;
  weekday?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}

export interface ContributionCalendar {
  total: number;
  year: number;
  weeks: {
    days: ContributionDay[];
  }[];
}

export interface GraphData extends ContributionBasic {
  contributionCalendars: ContributionCalendar[];
}

export interface ResponseData {
  errorType?: ErrorType;
  message?: string;
  data?: GraphData;
}

export interface GraphSettings {
  displayName?: DisplayName;
  yearRange?: [start_year: string | undefined, end_year: string | undefined];
  size?: GraphSize;
  theme?: Themes;
}

export interface GitHubApiJson<Data> {
  data?: Data;
  message?: string;
  errors?: { type: string; message: string }[];
}

export enum DataType {
  String = 'STRING',
  Number = 'NUMBER',
  Color = 'COLOR',
  Date = 'DATE',
}

export type ChartData = Record<string, string | number | any[]>;

export interface PieChartData extends ChartData {
  label: string | number;
  color: string | number;
  value: string | number;
}

export interface ContributionChartData extends ChartData {
  calendars: ContributionCalendar[];
}

export type DataColumn<T = DataType> = {
  fieldName: string;
  dataType: T;
};

export interface LineChartData extends ChartData {
  xAxis: string | number;
  yAxis: string | number;
}

export interface BarChartData extends ChartData {
  xAxis: string | number;
  yAxis: string | number;
  label: string | number;
  color: string | number;
}

export type GithubUser = {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
};

export type GitHubRepository = {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  private: boolean;
  owner: GithubUser;
  html_url: string;
  description: string;
  fork: boolean;
  url: string;
  forks_url: string;
  keys_url: string;
  collaborators_url: string;
  teams_url: string;
  hooks_url: string;
  issue_events_url: string;
  events_url: string;
  assignees_url: string;
  branches_url: string;
  tags_url: string;
  blobs_url: string;
  git_tags_url: string;
  git_refs_url: string;
  trees_url: string;
  statuses_url: string;
  languages_url: string;
  stargazers_url: string;
  contributors_url: string;
  subscribers_url: string;
  subscription_url: string;
  commits_url: string;
  git_commits_url: string;
  comments_url: string;
  issue_comment_url: string;
  contents_url: string;
  compare_url: string;
  merges_url: string;
  archive_url: string;
  downloads_url: string;
  issues_url: string;
  pulls_url: string;
  milestones_url: string;
  notifications_url: string;
  labels_url: string;
  releases_url: string;
  deployments_url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  git_url: string;
  ssh_url: string;
  clone_url: string;
  svn_url: string;
  homepage: string;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string;
  has_issues: boolean;
  has_projects: boolean;
  has_downloads: boolean;
  has_wiki: boolean;
  has_pages: boolean;
  has_discussions: boolean;
  forks_count: number;
  mirror_url: null | string;
  archived: boolean;
  disabled: boolean;
  open_issues_count: number;
  license: {
    key: string;
    name: string;
    spdx_id: string;
    url: string;
    node_id: string;
  };
  allow_forking: boolean;
  is_template: boolean;
  web_commit_signoff_required: boolean;
  topics: string[];
  visibility: string;
  forks: number;
  open_issues: number;
  watchers: number;
  default_branch: string;
  temp_clone_token: null | string;
  organization: {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  };
  network_count: number;
  subscribers_count: number;
};

export interface GithubLabel {
  name: string;
  color: string;
  createdAt: string;
  isDefault: boolean;
  id: number;
  url: string;
  default: boolean;
  description: string;
}

export interface GithubReaction {
  viewerHasReacted: boolean;
  totalCount: number;
}

export interface GithubComment {
  reactions: GithubReaction;
  publishedAt: string; // You might want to use a Date type if applicable
}

export type GithubRepositoryIssue = {
  url: string;
  body: string;
  created_at: string;
  repository_url: string;
  labels_url: string;
  comments_url: string;
  events_url: string;
  html_url: string;
  id: number;
  node_id: string;
  number: number;
  title: string;
  user: GithubUser;
  labels: GithubLabel[];
  state: string;
  locked: boolean;
  assignee: GithubUser;
  assignees: GithubUser[];
  comments: number;
  reactions: {
    url: string;
    total_count: number;
    '+1': number;
    '-1': number;
    laugh: number;
    hooray: number;
    confused: number;
    heart: number;
    rocket: number;
    eyes: number;
  };
  timeline_url: string;
};
