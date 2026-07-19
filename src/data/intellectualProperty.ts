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

const softwareFiles = import.meta.glob('../content/software/*.json', { eager: true });
export const softwareRecords: SoftwareRecord[] = (Object.values(softwareFiles).map((mod: any) => mod.default) as SoftwareRecord[])
  .sort((a, b) => b.year - a.year);

const patentFiles = import.meta.glob('../content/patents/*.json', { eager: true });
export const patentRecords: PatentRecord[] = (Object.values(patentFiles).map((mod: any) => mod.default) as PatentRecord[])
  .sort((a, b) => b.year - a.year);

const standardFiles = import.meta.glob('../content/standards/*.json', { eager: true });
export const standardRecords: StandardRecord[] = (Object.values(standardFiles).map((mod: any) => mod.default) as StandardRecord[])
  .sort((a, b) => b.year - a.year);
