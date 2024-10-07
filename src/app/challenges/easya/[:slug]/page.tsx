interface Props {
  params: {
    slug: string;
  };
}
export default function ChallengesPage({ params: { slug } }: Props) {
  return <div>{slug}</div>;
}
