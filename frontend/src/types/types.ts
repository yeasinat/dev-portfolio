export type ProjectProps = {
  id: string;
  title: string;
  description: string;
  technologiesUsed: string;
  imgUrl?: string;
  imgFile?: FileList;
  repoLink: string;
  liveLink: string;
  createdAt?: Date | undefined;
};

export type TechnologyProps = {
  id: string;
  name: string;
  imgUrl?: string;
  imgFile?: FileList;
};

export type ExperienceProps = {
  id: string;
  company: string;
  position: string;
  description: string;
  startDate?: string;
  endDate?: string;
};
