export interface Prefecture {
  prefCode: number;
  prefName: string;
};

export interface TotalPopulation extends Prefecture {
  data: {value: number; year: number}[];
};
