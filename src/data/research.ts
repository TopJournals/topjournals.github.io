export type ResearchProject = {
  title: string;
  summary: string;
  image: string;
  tags: string[];
  paperUrl?: string;
  paperLabel?: string;
  featured?: boolean;
};

export const researchProjects: ResearchProject[] = [
  {
    title: 'Rigid-Flexible Interlocked Metastructures',
    summary:
      'We present a chain mail-inspired stealth skin using topologically interlocking units, merging mechanical robustness with 2–40 GHz broadband absorption. This lightweight, conformable surface withstands damage and bending. Demonstrated on drones, it reduces radar cross-section by over 98%, establishing a versatile strategy for advanced aerospace applications.',
    image: '/assets/original/research/01-rigid-flexible-interlocked.png',
    tags: ['Stealth', 'Metastructure', 'Broadband absorption'],
    paperUrl: 'https://www.science.org/doi/10.1126/sciadv.aeb7870',
    paperLabel: '10.1126/sciadv.aeb7870',
    featured: true
  },
  {
    title: 'Tunable Electromagnetic Absorber',
    summary:
      'A bioinspired reconfigurable metamaterial is proposed to achieve broadband absorption and frequency agility for stealth. Inspired by moth-eye morphology, it employs a mechanical system to reconfigure petal-shaped structures. The design enables ≥90% absorption over 2–40 GHz and tunable ≥99% peaks with >3 GHz bandwidth. Structural reconfiguration reshapes impedance, ensuring broadband RCS reduction and adaptive suppression. With coded driving, 2D control of frequency and amplitude is realized, advancing next-generation intelligent stealth systems.',
    image: '/assets/original/research/02-tunable-electromagnetic-absorber.png',
    tags: ['Reconfigurable', 'Electromagnetic', 'Adaptive stealth'],
    paperUrl: 'https://doi.org/10.1002/adma.202511070',
    paperLabel: '10.1002/adma.202511070',
    featured: true
  },
  {
    title: 'TPMS Absorption Mechanism',
    summary:
      'This study investigates 3D metastructure absorbers, highlighting the influence of unit geometry, volume fraction, and lattice orientation on electromagnetic behavior. Sheet-based TPMS metastructures exhibit higher reflectivity than strut-based ones, while multilayer structures show the opposite. Geometric symmetry enhances polarization insensitivity, offering design principles for next-generation broadband, wide-angle, and polarization-insensitive devices.',
    image: '/assets/original/research/03-tpms-absorption-mechanism.png',
    tags: ['TPMS', 'Mechanism', 'Advanced Functional Materials'],
    paperUrl: 'https://doi.org/10.1002/adfm.202414629',
    paperLabel: '10.1002/adfm.202414629',
    featured: true
  },
  {
    title: 'Mechanics Cloaking Metastructure',
    summary:
      'Lightweight structures with tailored properties are crucial in engineering. Mechanical metastructures enable mechanics cloaking, controlling deformation while preserving stiffness. This study presents a TPMS-based optimization strategy, achieving up to 42.51% displacement reduction and 70% in a satellite frame case study, demonstrating the potential of mechanics cloaking for protecting sensitive components in engineering applications.',
    image: '/assets/original/research/04-mechanics-cloaking-metastructure.png',
    tags: ['Mechanical metamaterials', 'Optimization', 'TPMS'],
    paperUrl: 'https://doi.org/10.1016/j.tws.2024.112784',
    paperLabel: '10.1016/j.tws.2024.112784'
  },
  {
    title: 'Coding Metamaterials',
    summary:
      'Microwave absorption is vital for stealth and electromagnetic compatibility. A novel design using tortuosity and connectivity enhances wave absorption in multi-layer coding metamaterials (MCMs). Carbon ink composite and a genetic algorithm are used to meet engineering specifications, with reflectivity tests confirming effectiveness. Temperature alternation experiments simulate environmental changes, ensuring MCMs maintain stable performance under varying thermal conditions, offering a robust solution for advanced applications.',
    image: '/assets/original/research/05-coding-metamaterials.png',
    tags: ['Coding', 'Microwave absorption', 'Composites Part B'],
    paperUrl: 'https://doi.org/10.1016/j.compositesb.2024.111880',
    paperLabel: '10.1016/j.compositesb.2024.111880'
  },
  {
    title: 'Reconfigurable Metamaterial',
    summary:
      'This paper introduces a novel metamaterial with reconfigurable electromagnetic (EM) scattering properties, using a bistable curved beam. It achieves over 90% EM absorption across 2.17-17.31 GHz with a relative thickness of just 0.09λL. The bistable design allows state-switching, and with digital coding, it can adjust absorption bandwidth and enhance EM absorption. Applied to satellites, it reduces radar cross-section and enables active control of EM scattering for stealth and electronic countermeasures.',
    image: '/assets/original/research/06-reconfigurable-metamaterial.png',
    tags: ['Reconfigurable', 'Digital coding', 'Stealth'],
    paperUrl: 'https://doi.org/10.1002/adma.202408216',
    paperLabel: '10.1002/adma.202408216'
  },
  {
    title: 'Controllable Anisotropy',
    summary:
      'This study introduces an AI-aided method to design anisotropic mechanical metamaterials for additive manufacturing. By adjusting the central node and rod diameter of cubic-BCC microstructures, a database of elastic tensors is created. A 3D convolutional neural network (3D-CNN) maps geometry to properties, while an inverse design model identifies target structures. Finally, a novel optimization approach applies this method to large-scale designs, achieving precise anisotropy control and truss-like material distribution for improved performance.',
    image: '/assets/original/research/07-controllable-anisotropy.png',
    tags: ['AI-aided design', 'Anisotropy', 'Multi-scale'],
    paperUrl: 'https://doi.org/10.1016/j.engstruct.2024.118134',
    paperLabel: '10.1016/j.engstruct.2024.118134'
  },
  {
    title: 'Lattice-based Electromagnetic Metastructures',
    summary:
      'This work explores ultra-broadband metastructure absorbers (MMAs) using gradient-tailored Octet truss lattices for efficient EM wave mitigation. The 15 mm thick 3D-printed design consists of three stacked sub-layers with varying densities. Unit cell analysis links geometric parameters to broadband absorption and minimal mass. Absorption below -10 dB spans 2.84–40.0 GHz, with attenuation below -15 dB from 8.51–40.0 GHz. The design maintains absorption up to 60° for both TE and TM polarizations, offering a customizable, versatile broadband absorption solution.',
    image: '/assets/original/research/08-lattice-electromagnetic-metastructures.png',
    tags: ['Lattice', 'Additive manufacturing', 'EM absorption'],
    paperUrl: 'https://doi.org/10.1016/j.compositesb.2024.111484',
    paperLabel: '10.1016/j.compositesb.2024.111484'
  },
  {
    title: 'Bionic Electromagnetic Metastructures',
    summary:
      'The work presented here proposes a novel EM-wave-absorbing metastructure with an isotropic morphology inspired by the gyroid microstructures seen in Parides sesostris butterfly wings. A matching redesign methodology between the material and subwavelength scale properties of the gyroid microstructure is proposed, inspired by the interaction mechanism between the microstructure and the material properties on the EM-wave-absorption performance of the prepared metastructure.',
    image: '/assets/original/research/09-bionic-electromagnetic-metastructures.png',
    tags: ['Bionic design', 'Gyroid', 'EM absorption'],
    paperUrl: 'https://doi.org/10.1002/adma.202300659',
    paperLabel: '10.1002/adma.202300659'
  },
  {
    title: 'AI-aided Design for Metastructures',
    summary:
      'Controllable anisotropy of the microscale lattice metastructures is the key to achieving designable mechanical properties of the macrostructures. However, a current computational challenge is precisely controlling the anisotropy of the design domain containing an ultra-large number of lattice structural units. In this work, we decompose the large-scale design domain into several mesoscale subregions and propose an artificial intelligence-aided design method that can automatically control the anisotropic properties of the mesoscale design domain.',
    image: '/assets/original/research/10-ai-aided-design-metastructures.png',
    tags: ['AI-aided design', 'Anisotropy', 'Metastructure'],
    paperUrl: 'https://doi.org/10.1016/j.matdes.2022.111254',
    paperLabel: '10.1016/j.matdes.2022.111254'
  },
  {
    title: 'Bionic Metastructure Design and Optimization',
    summary:
      'Inspired by the strengthening mechanism of crystal twinning boundary, this work proposes a novel strategy for lattice metamaterial design to improve stiffness, strength, and toughness. At the microscale, the inclination variable of unit-cell is introduced into the analytical formula of modulus in the compression direction. At the scale of periodic macro-array, to achieve the best mechanical properties in the compression direction without sacrificing the mechanical properties in the horizontal direction, twinning boundaries are introduced into both horizontal and vertical directions of the structure.',
    image: '/assets/original/research/11-bionic-metastructure-design.png',
    tags: ['Bionic design', 'Lattice', 'Mechanical properties'],
    paperUrl: 'https://doi.org/10.1016/j.matdes.2022.110916',
    paperLabel: '10.1016/j.matdes.2022.110916'
  },
  {
    title: 'Lattice Structure Multi-scale Design and Optimization',
    summary:
      'In this work, we present a novel anisotropic lattice structure design and multi-scale optimization method that can generate conformal gradient lattice structures (CGLS). The goal of optimization is to achieve gradient density, adaptive orientation and variable scale (or periodic) lattice structures with the highest mechanical stiffness. The asymptotic homogenization method is employed for the calculation of the mechanical properties of various lattice structures.',
    image: '/assets/original/research/12-lattice-structure-multiscale-design.png',
    tags: ['Multi-scale', 'Conformal gradient', 'Lattice'],
    paperUrl: 'https://doi.org/10.1016/j.cad.2019.102787',
    paperLabel: '10.1016/j.cad.2019.102787'
  }
];
