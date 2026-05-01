export type ElectionType = 'General' | 'State' | 'Local';
export type Language = 'en' | 'hi';

export interface TranslatedContent {
  title: string;
  shortDescription: string;
  detailedDescription: string;
  keyTakeaways: string[];
}

export interface ProcessStep {
  id: string;
  icon: string;
  phases: {
    [key in Language]: string[];
  };
  content: {
    [key in Language]: TranslatedContent;
  };
  typeSpecificPhases?: {
    [key in ElectionType]?: {
      [key in Language]: string[];
    };
  };
  typeSpecificContent?: {
    [key in ElectionType]?: {
      [key in Language]: Partial<TranslatedContent>;
    };
  };
  nuances?: {
    [key in ElectionType]?: {
      [key in Language]: string;
    };
  };
}

export interface ElectionKPI {
  label: { [key in Language]: string };
  value: string;
  subLabel: { [key in Language]: string };
}

export const electionKPIs: { [key in ElectionType]: ElectionKPI[] } = {
  General: [
    { label: { en: 'Representatives', hi: 'प्रतिनिधि' }, value: 'MPs', subLabel: { en: 'Members of Parliament', hi: 'संसद सदस्य' } },
    { label: { en: 'Total Seats', hi: 'कुल सीटें' }, value: '543', subLabel: { en: 'In Lok Sabha', hi: 'लोकसभा में' } },
    { label: { en: 'Electoral Scope', hi: 'चुनावी दायरा' }, value: 'National', subLabel: { en: 'Entire Country', hi: 'पूरा देश' } },
    { label: { en: 'Primary Body', hi: 'प्राथमिक निकाय' }, value: 'Lok Sabha', subLabel: { en: 'Lower House', hi: 'निचला सदन' } }
  ],
  State: [
    { label: { en: 'Representatives', hi: 'प्रतिनिधि' }, value: 'MLAs', subLabel: { en: 'Members of Legislative Assembly', hi: 'विधानसभा सदस्य' } },
    { label: { en: 'Total Seats', hi: 'कुल सीटें' }, value: '~4,123', subLabel: { en: 'Across all States/UTs', hi: 'सभी राज्यों/केंद्र शासित प्रदेशों में' } },
    { label: { en: 'Electoral Scope', hi: 'चुनावी दायरा' }, value: 'State', subLabel: { en: 'Specific State/UT', hi: 'विशिष्ट राज्य/केन्द्र शासित प्रदेश' } },
    { label: { en: 'Primary Body', hi: 'प्राथमिक निकाय' }, value: 'Vidhan Sabha', subLabel: { en: 'Legislative Assembly', hi: 'विधानसभा' } }
  ],
  Local: [
    { label: { en: 'Representatives', hi: 'प्रतिनिधि' }, value: '3.1M+', subLabel: { en: 'Panchayat & Urban Bodies', hi: 'पंचायत और शहरी निकाय' } },
    { label: { en: 'Governance', hi: 'शासन' }, value: 'Grassroot', subLabel: { en: 'Villages & Wards', hi: 'गाँव और वार्ड' } },
    { label: { en: 'Key Positions', hi: 'प्रमुख पद' }, value: 'Sarpanch', subLabel: { en: 'Mayor / Corporator', hi: 'मेयर / कॉर्पोरेटर' } },
    { label: { en: 'Manage Body', hi: 'प्रबंध निकाय' }, value: 'SEC', subLabel: { en: 'State Election Commission', hi: 'राज्य चुनाव आयोग' } }
  ]
};

export const electionProcess: ProcessStep[] = [
  {
    id: 'registration',
    icon: 'UserPlus',
    phases: {
      en: ['Draft Roll Publication', 'Claims & Objections', 'Final Roll Publication'],
      hi: ['प्रारूप मतदाता सूची प्रकाशन', 'दावे और आपत्तियाँ', 'अंतिम मतदाता सूची प्रकाशन']
    },
    content: {
      en: {
        title: 'Voter Registration',
        shortDescription: 'The foundation of democracy: getting your name on the electoral roll.',
        detailedDescription: 'Registration is an ongoing process where eligible citizens apply to be included in the electoral roll. In India, this is managed by the Election Commission of India (ECI) through the National Voters\' Service Portal (NVSP). One Voter ID (EPIC) is issued for use at all levels of government.',
        keyTakeaways: [
          'Minimum age: 18 years on qualifying dates.',
          'Form 6 for new registration via ECI portal.',
          'Your EPIC card is the primary document for identity.'
        ]
      },
      hi: {
        title: 'मतदाता पंजीकरण',
        shortDescription: 'लोकतंत्र की नींव: मतदाता सूची में अपना नाम दर्ज कराना।',
        detailedDescription: 'पंजीकरण एक निरंतर चलने वाली प्रक्रिया है जहाँ पात्र नागरिक मतदाता सूची में शामिल होने के लिए आवेदन करते हैं। भारत में, इसे भारत निर्वाचन आयोग (ECI) द्वारा राष्ट्रीय मतदाता सेवा पोर्टल (NVSP) के माध्यम से प्रबंधित किया जाता है। सभी स्तरों के चुनाव के लिए एक ही EPIC कार्ड मान्य होता है।',
        keyTakeaways: [
          'पात्रता तिथियों पर न्यूनतम आयु: 18 वर्ष।',
          'ECI पोर्टल के माध्यम से नए पंजीकरण के लिए फॉर्म 6।',
          'आपका EPIC कार्ड पहचान का प्राथमिक दस्तावेज़ है।'
        ]
      }
    },
    typeSpecificContent: {
      Local: {
        en: {
          shortDescription: 'Managed locally by State Election Commissions (SEC).',
          detailedDescription: 'While the ECI manages national and state rolls, Local Body elections are managed by the State Election Commission (SEC). In some states, the SEC uses the ECI roll, while in others, they maintain a separate list for Panchayat and Municipal elections.',
          keyTakeaways: [
            'Managed by State Election Commission (SEC).',
            'May require verification against local ward boundaries.',
            'Check both ECI and SEC websites for local roll inclusion.'
          ]
        },
        hi: {
          shortDescription: 'राज्य चुनाव आयोगों (SEC) द्वारा स्थानीय स्तर पर प्रबंधित।',
          detailedDescription: 'जबकि ECI राष्ट्रीय और राज्य सूचियों का प्रबंधन करता है, स्थानीय निकाय चुनाव राज्य चुनाव आयोग (SEC) द्वारा प्रबंधित किए जाते हैं। कुछ राज्यों में, SEC मतदाता सूची ECI से लेता है, जबकि अन्य में, वे पंचायत और नगर निगम चुनावों के लिए एक अलग सूची बनाए रखते हैं।',
          keyTakeaways: [
            'राज्य चुनाव आयोग (SEC) द्वारा प्रबंधित।',
            'स्थानीय वार्ड सीमाओं के विरुद्ध सत्यापन की आवश्यकता हो सकती है।',
            'स्थानीय सूची में शामिल होने के लिए ECI और SEC दोनों की वेबसाइटों की जांच करें।'
          ]
        }
      }
    }
  },
  {
    id: 'notification',
    icon: 'FileText',
    phases: {
      en: ['Gazette Notification', 'Nomination Filing', 'Scrutiny', 'Withdrawal Window'],
      hi: ['राजपत्र अधिसूचना', 'नामांकन दाखिल करना', 'जांच', 'वापसी विंडो']
    },
    typeSpecificPhases: {
      General: {
        en: ['Presidential Notification', 'ECI Schedule Announcement', 'Candidate Nominations'],
        hi: ['राष्ट्रपति अधिसूचना', 'ECI कार्यक्रम घोषणा', 'उम्मीदवार नामांकन']
      },
      State: {
        en: ['Gubernatorial Notification', 'CEO Schedule Announcement', 'Constituency Nominations'],
        hi: ['राज्यपाल अधिसूचना', 'CEO कार्यक्रम घोषणा', 'निर्वाचन क्षेत्र नामांकन']
      }
    },
    content: {
      en: {
        title: 'Notification & Nomination',
        shortDescription: 'The official start: when the dates are set and candidates step forward.',
        detailedDescription: 'The President (for General) or Governor (for State) issues a notification. Candidates then file nomination papers with the Returning Officer (RO). This includes an affidavit (Form 26) disclosing assets, liabilities, and criminal background.',
        keyTakeaways: [
          'Model Code of Conduct starts immediately.',
          'Candidates must be 25+ years old for MP/MLA.',
          'Security deposit required (Rs. 25k for Gen, 10k for SC/ST).'
        ]
      },
      hi: {
        title: 'अधिसूचना और नामांकन',
        shortDescription: 'आधिकारिक शुरुआत: जब तारीखें तय होती हैं और उम्मीदवार आगे बढ़ते हैं।',
        detailedDescription: 'राष्ट्रपति (आम चुनाव के लिए) या राज्यपाल (राज्य चुनाव के लिए) एक अधिसूचना जारी करते हैं। उम्मीदवार रिटर्निंग ऑफिसर (RO) के पास नामांकन पत्र दाखिल करते हैं। इसमें संपत्ति और आपराधिक पृष्ठभूमि का खुलासा करने वाला हलफनामा शामिल है।',
        keyTakeaways: [
          'आदर्श आचार संहिता तुरंत शुरू हो जाती है।',
          'MP/MLA के लिए उम्मीदवारों की आयु 25+ वर्ष होनी चाहिए।',
          'सुरक्षा जमा की आवश्यकता (सामान्य के लिए 25 हजार, SC/ST के लिए 10 हजार)।'
        ]
      }
    },
    typeSpecificContent: {
      General: {
        en: {
          shortDescription: 'National schedule announced by ECI. President issues the notification.',
          detailedDescription: 'For Lok Sabha elections, the Election Commission of India (ECI) recommends the dates to the President of India. Once notified, the entire country enters the Model Code of Conduct phase. Candidates contest for 543 Parliamentary seats.',
          keyTakeaways: [
            'ECI manages the national schedule in multiple phases.',
            'President of India issues the official notification.',
            'National issues usually dominate the campaign.'
          ]
        },
        hi: {
          shortDescription: 'ECI द्वारा घोषित राष्ट्रीय कार्यक्रम। राष्ट्रपति अधिसूचना जारी करते हैं।',
          detailedDescription: 'लोकसभा चुनावों के लिए, भारत निर्वाचन आयोग (ECI) भारत के राष्ट्रपति को तारीखों की सिफारिश करता है। एक बार अधिसूचित होने के बाद, पूरा देश आदर्श आचार संहिता चरण में प्रवेश करता है। उम्मीदवार 543 संसदीय सीटों के लिए चुनाव लड़ते हैं।',
          keyTakeaways: [
            'ECI कई चरणों में राष्ट्रीय कार्यक्रम का प्रबंधन करता है।',
            'भारत के राष्ट्रपति आधिकारिक अधिसूचना जारी करते हैं।',
            'राष्ट्रीय मुद्दे आमतौर पर अभियान पर हावी होते हैं।'
          ]
        }
      },
      State: {
        en: {
          shortDescription: 'State schedule announced by Governor. Managed at state level.',
          detailedDescription: 'For Vidhan Sabha elections, the Governor of the state issues the notification. The process is managed by the Chief Electoral Officer (CEO) of that specific state. Candidates contest to become MLAs of their respective assembly segments.',
          keyTakeaways: [
            'Governor of the State issues the notification.',
            'Managed by the state Chief Electoral Officer (CEO).',
            'Focus is on state-level governance and local issues.'
          ]
        },
        hi: {
          shortDescription: 'राज्यपाल द्वारा घोषित राज्य कार्यक्रम। राज्य स्तर पर प्रबंधित।',
          detailedDescription: 'विधानसभा चुनावों के लिए, राज्य के राज्यपाल अधिसूचना जारी करते हैं। इस प्रक्रिया का प्रबंधन उस विशिष्ट राज्य के मुख्य निर्वाचन अधिकारी (CEO) द्वारा किया जाता है। उम्मीदवार अपने संबंधित विधानसभा क्षेत्रों के विधायक (MLA) बनने के लिए चुनाव लड़ते हैं।',
          keyTakeaways: [
            'राज्य के राज्यपाल अधिसूचना जारी करते हैं।',
            'राज्य के मुख्य निर्वाचन अधिकारी (CEO) द्वारा प्रबंधित।',
            'ध्यान राज्य स्तर के शासन और स्थानीय मुद्दों पर होता है।'
          ]
        }
      },
      Local: {
        en: {
          shortDescription: 'Local Body Notification by SEC. Grassroots democracy.',
          detailedDescription: 'Local Body elections (Panchayats and Municipalities) are notified by the State Election Commission (SEC). This process is highly localized, often involving thousands of wards. Candidates contest for positions like Sarpanch, Ward Member, or Mayor.',
          keyTakeaways: [
            'SEC issues the notification, not the President/Governor.',
            'Nominations are filed with local Block Development Officers.',
            'Direct focus on village or ward-level infrastructure.'
          ]
        },
        hi: {
          shortDescription: 'SEC द्वारा स्थानीय निकाय अधिसूचना। जमीनी लोकतंत्र।',
          detailedDescription: 'स्थानीय निकाय चुनावों (पंचायतों और नगर पालिकाओं) को राज्य चुनाव आयोग (SEC) द्वारा अधिसूचित किया जाता है। यह प्रक्रिया अत्यधिक स्थानीयकृत है। उम्मीदवार सरपंच, वार्ड सदस्य या मेयर जैसे पदों के लिए चुनाव लड़ते हैं।',
          keyTakeaways: [
            'SEC अधिसूचना जारी करता है, राष्ट्रपति/राज्यपाल नहीं।',
            'नामांकन स्थानीय ब्लॉक विकास अधिकारियों के पास दाखिल किए जाते हैं।',
            'सीधा ध्यान गाँव या वार्ड स्तर के बुनियादी ढांचे पर।'
          ]
        }
      }
    }
  },
  {
    id: 'campaigning',
    icon: 'Megaphone',
    phases: {
      en: ['Manifesto Release', 'Public Meetings', 'Door-to-Door', 'Silence Period (48 hrs)'],
      hi: ['घोषणापत्र जारी करना', 'जनसभाएं', 'घर-घर जाकर प्रचार', 'मौन अवधि (48 घंटे)']
    },
    content: {
      en: {
        title: 'Campaigning Period',
        shortDescription: 'Persuading the public: rallies, manifestos, and the silence period.',
        detailedDescription: 'Parties and candidates present their manifestos. Public meetings, door-to-door visits, and digital campaigns are common. This period ends 48 hours before the close of polling (Silence Period).',
        keyTakeaways: [
          'No use of religious or caste sentiments.',
          'Expenditure limits apply to candidates.',
          'Silence period forbids all public campaigning.'
        ]
      },
      hi: {
        title: 'प्रचार अवधि',
        shortDescription: 'जनता को समझाना: रैलियां, घोषणापत्र और मौन अवधि।',
        detailedDescription: 'दल और उम्मीदवार अपना घोषणापत्र पेश करते हैं। जनसभाएं और घर-घर जाकर प्रचार करना आम है। यह अवधि मतदान समाप्त होने से 48 घंटे पहले (मौन अवधि) समाप्त होती है।',
        keyTakeaways: [
          'धार्मिक या जातिगत भावनाओं का उपयोग नहीं।',
          'उम्मीदवारों पर खर्च की सीमा लागू होती है।',
          'मौन अवधि सभी सार्वजनिक प्रचार को रोकती है।'
        ]
      }
    },
    typeSpecificContent: {
      Local: {
        en: {
          detailedDescription: 'Campaigning in local elections is often highly personal and community-focused. Candidates often use wall paintings, small street corner meetings, and local group discussions rather than massive national rallies.',
          keyTakeaways: [
            'Highly localized manifestos for specific wards.',
            'Lower expenditure limits compared to MP/MLA.',
            'Greater focus on personal reputation and service.'
          ]
        },
        hi: {
          detailedDescription: 'स्थानीय चुनावों में प्रचार अक्सर व्यक्तिगत और समुदाय-केंद्रित होता है। उम्मीदवार विशाल राष्ट्रीय रैलियों के बजाय दीवार पेंटिंग और स्थानीय समूह चर्चाओं का उपयोग करते हैं।',
          keyTakeaways: [
            'विशिष्ट वार्डों के लिए स्थानीय घोषणापत्र।',
            'MP/MLA की तुलना में कम खर्च सीमा।',
            'व्यक्तिगत प्रतिष्ठा और सेवा पर अधिक ध्यान।'
          ]
        }
      }
    }
  },
  {
    id: 'polling',
    icon: 'Vote',
    phases: {
      en: ['Mock Poll', 'Verification', 'Indelible Inking', 'Casting Vote'],
      hi: ['मॉक पोल', 'सत्यापन', 'अमिट स्याही', 'मतदान']
    },
    content: {
      en: {
        title: 'Polling Day',
        shortDescription: 'The big day: casting your vote using EVMs and VVPATs.',
        detailedDescription: 'Voting takes place through Electronic Voting Machines (EVMs). A Voter Verifiable Paper Audit Trail (VVPAT) printer shows you a slip for 7 seconds confirming your choice. Indelible ink is applied to the left index finger.',
        keyTakeaways: [
          'Mock polls are conducted before actual voting.',
          'Your vote is a secret ballot.',
          'The VVPAT slip is the physical proof of your choice.'
        ]
      },
      hi: {
        title: 'मतदान का दिन',
        shortDescription: 'बड़ा दिन: EVM और VVPAT का उपयोग करके अपना वोट डालना।',
        detailedDescription: 'मतदान इलेक्ट्रॉनिक वोटिंग मशीन (EVM) के माध्यम से होता है। एक VVPAT प्रिंटर आपको 7 सेकंड के लिए एक पर्ची दिखाता है जो आपकी पसंद की पुष्टि करती है। बाएं हाथ की तर्जनी पर अमिट स्याही लगाई जाती है।',
        keyTakeaways: [
          'वास्तविक मतदान से पहले मॉक पोल आयोजित किए जाते हैं।',
          'आपका वोट एक गुप्त मतदान है।',
          'VVPAT पर्ची आपकी पसंद का भौतिक प्रमाण है।'
        ]
      }
    },
    typeSpecificContent: {
      Local: {
        en: {
          shortDescription: 'Voting in local booths. Ballot papers may be used in some areas.',
          detailedDescription: 'While EVMs are common in urban local bodies, many rural Panchayat elections still use traditional paper ballots. Voters might have to cast multiple votes at once (e.g., for Ward Member and Sarpanch).',
          keyTakeaways: [
            'Multiple votes might be required in one go.',
            'Traditional paper ballots used in many rural blocks.',
            'Local police manage the security of the booths.'
          ]
        },
        hi: {
          shortDescription: 'स्थानीय बूथों में मतदान। कुछ क्षेत्रों में मतपत्रों का उपयोग किया जा सकता है।',
          detailedDescription: 'जबकि शहरी निकायों में EVM आम हैं, कई ग्रामीण पंचायत चुनावों में अभी भी पारंपरिक मतपत्रों का उपयोग किया जाता है। मतदाताओं को एक साथ कई वोट डालने पड़ सकते हैं।',
          keyTakeaways: [
            'एक बार में कई वोटों की आवश्यकता हो सकती है।',
            'कई ग्रामीण ब्लॉकों में पारंपरिक मतपत्रों का उपयोग किया जाता है।',
            'स्थानीय पुलिस बूथों की सुरक्षा का प्रबंधन करती है।'
          ]
        }
      }
    }
  },
  {
    id: 'counting',
    icon: 'TrendingUp',
    phases: {
      en: ['EVM Retrieval', 'Table-wise Counting', 'VVPAT Verification', 'Declaration'],
      hi: ['EVM पुनर्प्राप्ति', 'टेबल-वार गिनती', 'VVPAT सत्यापन', 'घोषणा']
    },
    content: {
      en: {
        title: 'Counting & Results',
        shortDescription: 'The final tally: counting the votes and declaring winners.',
        detailedDescription: 'EVMs are brought to secure counting centers. Counting is done under strict supervision of the Returning Officer (RO). Random VVPAT slips from five booths are cross-checked with EVM counts.',
        keyTakeaways: [
          'First Past The Post (FPTP) system determines winner.',
          'Candidates can appoint agents to monitor counting.',
          'Results are certified by the Returning Officer.'
        ]
      },
      hi: {
        title: 'गिनती और परिणाम',
        shortDescription: 'अंतिम मिलान: वोटों की गिनती और विजेताओं की घोषणा।',
        detailedDescription: 'EVM को सुरक्षित गणना केंद्रों पर लाया जाता है। रिटर्निंग ऑफिसर (RO) की कड़ी निगरानी में गिनती की जाती है। पांच बूथों की यादृच्छिक VVPAT पर्चियों की EVM गणना के साथ क्रॉस-चेकिंग की जाती है।',
        keyTakeaways: [
          'विजेता का निर्धारण FPTP प्रणाली द्वारा किया जाता है।',
          'उम्मीदवार गिनती की निगरानी के लिए एजेंट नियुक्त कर सकते हैं।',
          'परिणाम रिटर्निंग ऑफिसर द्वारा प्रमाणित किए जाते हैं।'
        ]
      }
    },
    typeSpecificContent: {
      Local: {
        en: {
          detailedDescription: 'Counting for local elections usually happens at the local block or district headquarters immediately after polling. Since the volume of voters per ward is smaller, results for local bodies are often declared much faster than national elections.',
          keyTakeaways: [
            'Counting often happens locally within the block.',
            'Declaration of results usually on the same or next day.',
            'Voters get direct access to their elected local heads.'
          ]
        },
        hi: {
          detailedDescription: 'स्थानीय चुनावों की गिनती आमतौर पर मतदान के तुरंत बाद स्थानीय ब्लॉक या जिला मुख्यालय में होती है। चूंकि प्रति वार्ड मतदाताओं की संख्या कम होती है, इसलिए परिणाम जल्दी घोषित किए जाते हैं।',
          keyTakeaways: [
            'ब्लॉक के भीतर स्थानीय स्तर पर गिनती होती है।',
            'आमतौर पर उसी या अगले दिन परिणामों की घोषणा।',
            'मतदाताओं को अपने चुने हुए स्थानीय प्रमुखों तक सीधी पहुंच मिलती है।'
          ]
        }
      }
    }
  }
];
