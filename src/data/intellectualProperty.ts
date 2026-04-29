import patentData from './content/patents.json';
import softwareData from './content/software.json';
import standardsData from './content/standards.json';

export type SoftwareRecord = {
  year: number;
  holders: string;
  title: string;
  authority: string;
};

export type PatentRecord = {
  year: number;
  inventors: string;
  title: string;
  type: string;
};

export type StandardRecord = {
  year: number;
  title: string;
  authority: string;
  code: string;
};

export const softwareRecords: SoftwareRecord[] = softwareData as SoftwareRecord[];
export const patentRecords: PatentRecord[] = patentData as PatentRecord[];
export const standardRecords: StandardRecord[] = standardsData as StandardRecord[];
