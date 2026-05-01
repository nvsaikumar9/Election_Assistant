export interface UpcomingElection {
  id: string;
  year: number;
  type: 'General' | 'Assembly' | 'Local';
  title: {
    en: string;
    hi: string;
  };
  date: {
    en: string;
    hi: string;
  };
  isOngoing: boolean;
  coordinates?: { x: number; y: number }; 
  timeline?: {
    start: string;
    end: string;
  };
  externalLinks?: {
    label: { en: string; hi: string };
    url: string;
  }[];
}

export const electionWatchData: UpcomingElection[] = [
  {
    id: 'ongoing-wb',
    year: 2026,
    type: 'Assembly',
    title: { en: 'West Bengal Assembly', hi: 'पश्चिम बंगाल विधानसभा' },
    date: { en: 'Ongoing (Phase 3)', hi: 'जारी है (चरण 3)' },
    isOngoing: true,
    coordinates: { x: 78, y: 55 },
    timeline: {
      start: '2026-04-10',
      end: '2026-05-15'
    },
    externalLinks: [
      { label: { en: 'Official Schedule', hi: 'आधिकारिक कार्यक्रम' }, url: 'https://eci.gov.in' },
      { label: { en: 'Voter List Search', hi: 'मतदाता सूची खोज' }, url: 'https://electoralsearch.eci.gov.in' }
    ]
  },
  {
    id: 'ongoing-kl',
    year: 2026,
    type: 'Assembly',
    title: { en: 'Kerala Assembly', hi: 'केरल विधानसभा' },
    date: { en: 'Ongoing (Phase 2)', hi: 'जारी है (चरण 2)' },
    isOngoing: true,
    coordinates: { x: 35, y: 88 },
    timeline: {
      start: '2026-04-15',
      end: '2026-05-10'
    },
    externalLinks: [
      { label: { en: 'CEO Kerala Portal', hi: 'सीईओ केरल पोर्टल' }, url: 'https://ceo.kerala.gov.in' }
    ]
  },
  {
    id: 'upcoming-tn',
    year: 2026,
    type: 'Assembly',
    title: { en: 'Tamil Nadu Assembly', hi: 'तमिलनाडु विधानसभा' },
    date: { en: 'Tentative: June 2026', hi: 'संभावित: जून 2026' },
    isOngoing: false,
    coordinates: { x: 45, y: 85 }
  },
  {
    id: 'upcoming-pb',
    year: 2027,
    type: 'Assembly',
    title: { en: 'Punjab Assembly', hi: 'पंजाब विधानसभा' },
    date: { en: 'Tentative: Feb 2027', hi: 'संभावित: फरवरी 2027' },
    isOngoing: false
  },
  {
    id: 'upcoming-up',
    year: 2027,
    type: 'Assembly',
    title: { en: 'Uttar Pradesh Assembly', hi: 'उत्तर प्रदेश विधानसभा' },
    date: { en: 'Tentative: March 2027', hi: 'संभावित: मार्च 2027' },
    isOngoing: false
  },
  {
    id: 'upcoming-gen',
    year: 2029,
    type: 'General',
    title: { en: 'Lok Sabha General Election', hi: 'लोकसभा आम चुनाव' },
    date: { en: 'Tentative: May 2029', hi: 'संभावित: मई 2029' },
    isOngoing: false
  }
];
