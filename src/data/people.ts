

export type Person = {
  name: string;
  role: string;
  start: string;
  avatar: string;
  scholarUrl?: string;
  researchGateUrl?: string;
  status?: 'current' | 'graduated';
  graduationDate?: string;
  destination?: string;
};

const files = import.meta.glob('../content/people/*.json', { eager: true });

const roleOrder = ['Ph.D. Candidate', 'Ph.D. Student', 'Postgraduate', 'Ph.D.', 'Master'];

export const people: Person[] = (Object.values(files).map((mod: any) => mod.default) as Person[])
  .sort((a, b) => {
    // Sort by role first
    const roleA = roleOrder.indexOf(a.role);
    const roleB = roleOrder.indexOf(b.role);
    if (roleA !== roleB) {
      // If role not found, put it at the end
      if (roleA === -1) return 1;
      if (roleB === -1) return -1;
      return roleA - roleB;
    }
    // Then sort by start date
    const startA = parseFloat(a.start) || 0;
    const startB = parseFloat(b.start) || 0;
    return startA - startB;
  });
