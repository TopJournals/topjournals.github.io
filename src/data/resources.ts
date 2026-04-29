export type Resource = {
  title: string;
  summary: string;
  kind: 'Code' | 'Paper' | 'Dataset' | 'Software';
  image: string;
  titleUrl?: string;
  links: { label: string; url: string }[];
};

export const resources: Resource[] = [
  {
    title: 'Homogenization Code for Lattice-skin Plate Structures',
    summary:
      'A compact computational framework for extracting effective stiffness matrices of finite-thickness lattice-skin plate structures using plate/shell-aware boundary conditions.',
    kind: 'Code',
    image: '/assets/original/site/homogenization-lattice-skin.png',
    titleUrl: '/ThinHomogenization.html',
    links: [
      { label: 'GitHub', url: 'https://github.com/TopJournals/ThinWalledHomogenization' },
      { label: 'DOI', url: 'https://arxiv.org/abs/2604.23181' }
    ]
  }
];
