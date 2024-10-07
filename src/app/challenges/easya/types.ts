export interface ChallengeStep {
  id: number;
  imageUrl?: string;
  title: string;
  details?: string;
  choices?: string[];
  correctChoice?: string;
}

export interface TweetContent {
  tweetReason: string;
  tweetContent: string;
  tweetContentUrl: string;
}

export interface Course {
  title: string;
  href: string;
  index: number;
  icon: string;
  xp: number;
  challengeSteps: (ChallengeStep | TweetContent)[];
}
