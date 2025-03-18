export type ProjectProps = {
  id: string;
  title: string;
  description: string;
  technologiesUsed: string;
  imgUrl?: string;
  imgFile?: FileList;
  repoLink: string;
  liveLink: string;
};

export type TechnologyProps = {
  id: string;
  name: string;
  imgUrl?: string;
  imgFile?: FileList;
};
