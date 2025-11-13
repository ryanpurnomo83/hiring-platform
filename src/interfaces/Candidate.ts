// types.ts
export interface CandidateAttribute {
  key: string;
  label: string;
  value: string;
  order: number;
}

export interface CandidateData {
  id: string;
  attributes: CandidateAttribute[];
}

export interface CandidatesInterface {
  data: CandidateData[];
}