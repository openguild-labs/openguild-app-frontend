type TMissionResponse = {
  id: number;
  title: string;
  status: string;
  bannerURL: string;
};

type TMissionDetailResponse = TMissionModel & {
  bannerURL: string;
  tasks: TTaskModel[];
};
