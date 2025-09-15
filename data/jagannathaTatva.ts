// Jagannatha Tatva - Complete Vedantic Knowledge Base
// Integrating ancient wisdom with modern scientific understanding

export interface JagannathaTopic {
  id: string;
  title: string;
  sanskrit: string;
  category: 'philosophy' | 'history' | 'science' | 'practice' | 'symbolism';
  level: 'beginner' | 'intermediate' | 'advanced';
  content: {
    introduction: string;
    vedanticSource: string;
    modernCorrelation: string;
    practicalApplication: string;
    scientificInsight?: string;
  };
  relatedConcepts: string[];
  keywords: string[];
}

export const JAGANNATHA_TATVA_CURRICULUM: JagannathaTopic[] = [
  {
    id: 'jagannatha-etymology',
    title: 'Jagannatha: The Lord of the Universe',
    sanskrit: 'जगन्नाथ - जगत् + नाथ',
    category: 'philosophy',
    level: 'beginner',
    content: {
      introduction: `Jagannatha, literally meaning "Lord of the Universe" (Jagat + Natha), represents the cosmic consciousness that pervades all existence. This divine form embodies the Vedantic principle of Sarvam khalvidam brahma - "All this is indeed Brahman."`,
      vedanticSource: `From the Upanishads: "सर्वं खल्विदं ब्रह्म" (Chandogya Upanishad 3.14.1). The Jagannatha form represents the all-pervading Brahman in a tangible, accessible form for devotees. The Skanda Purana describes Jagannatha as "पुरुषोत्तम" - the Supreme Being beyond all manifestations.`,
      modernCorrelation: `Modern quantum physics speaks of a unified field underlying all matter and energy. Just as Jagannatha represents the cosmic consciousness pervading all existence, quantum field theory suggests an underlying quantum vacuum that gives rise to all particles and forces. The holographic principle in physics mirrors the Vedantic teaching that the whole (Brahman) is present in every part.`,
      practicalApplication: `Meditation on Jagannatha as the cosmic consciousness helps practitioners develop universal compassion and overcome the illusion of separateness. Daily contemplation: "I am not separate from the cosmic consciousness that Jagannatha represents."`
    },
    relatedConcepts: ['brahman', 'cosmic-consciousness', 'advaita', 'purusha'],
    keywords: ['jagannatha', 'cosmic-lord', 'universal-consciousness', 'brahman']
  },

  {
    id: 'puri-dhama-significance',
    title: 'Puri Dhama: The Complete Abode',
    sanskrit: 'पुरी - पूर्यते इति पुरी',
    category: 'philosophy',
    level: 'intermediate',
    content: {
      introduction: `Puri derives from the Sanskrit root "पूर्" meaning "to fill" or "to complete." Hence, Puri means "that which fulfills" or "the complete abode." It represents the state of consciousness where all desires are fulfilled through divine realization.`,
      vedanticSource: `The Brahma Purana states: "पुरी पूर्णा सदा देवी सर्वकामफलप्रदा" - "Puri is ever complete, the divine goddess who grants all desires." The Skanda Purana describes it as "मोक्षदा पुरी" - the city that grants liberation. This aligns with the Vedantic teaching of "पूर्णमदः पूर्णमिदम्" (Isha Upanishad) - "That is complete, this is complete."`,
      modernCorrelation: `Modern psychology recognizes the concept of self-actualization and peak experiences. Puri represents the ultimate peak experience - a state of consciousness where one feels complete and fulfilled. Neuroscience shows that meditation and spiritual practices can induce states of expanded awareness and bliss, similar to the transformative experience described in Puri Dhama.`,
      practicalApplication: `Visiting Puri (physically or mentally) should be approached as entering a state of completeness. Practice: Before any spiritual activity, affirm "I am entering the complete abode where all my spiritual needs are fulfilled."`
    },
    relatedConcepts: ['moksha', 'purna', 'dhama', 'spiritual-fulfillment'],
    keywords: ['puri', 'completeness', 'fulfillment', 'sacred-space']
  },

  {
    id: 'ratha-yatra-cosmic-journey',
    title: 'Ratha Yatra: The Cosmic Chariot Journey',
    sanskrit: 'रथयात्रा - आत्मा का ब्रह्म की ओर यात्रा',
    category: 'symbolism',
    level: 'intermediate',
    content: {
      introduction: `The Ratha Yatra represents the soul's journey toward cosmic consciousness. The chariot symbolizes the human body, the horses represent the senses, and the charioteer is the discriminating intellect guiding the soul toward divine realization.`,
      vedanticSource: `This concept is beautifully explained in the Katha Upanishad's dialogue between Nachiketa and Yama: "आत्मानं रथिनं विद्धि शरीरं रथमेव तु। बुद्धिं तु सारथिं विद्धि मनः प्रग्रहमेव च॥" (Katha Upanishad 1.3.3-4) - "Know the Self as the rider of the chariot, the body as the chariot, the intellect as the charioteer, and the mind as the reins."`,
      modernCorrelation: `Modern neuroscience validates this ancient metaphor. The prefrontal cortex (charioteer/intellect) regulates the limbic system (horses/emotions and senses). Neuroplasticity research shows that conscious direction of attention can literally rewire the brain, supporting the Upanishadic teaching of the intellect guiding the mind and senses.`,
      practicalApplication: `During daily activities, practice being the conscious charioteer. Before making decisions, pause and ask: "Is my intellect (charioteer) in control, or are my senses (horses) running wild?" Use this awareness to make more conscious choices.`,
      scientificInsight: `The Default Mode Network (DMN) in the brain, discovered through fMRI studies, correlates with the wandering mind described in Vedanta. Meditation practices, like those inspired by Ratha Yatra symbolism, can reduce DMN activity and increase present-moment awareness.`
    },
    relatedConcepts: ['katha-upanishad', 'nachiketa', 'chariot-metaphor', 'self-control'],
    keywords: ['ratha-yatra', 'chariot', 'spiritual-journey', 'self-mastery']
  },

  {
    id: 'khetra-consciousness-field',
    title: 'Khetra: The Field of Consciousness',
    sanskrit: 'क्षेत्र - चेतना का क्षेत्र',
    category: 'philosophy',
    level: 'advanced',
    content: {
      introduction: `In the Bhagavad Gita, Krishna describes the body as Khetra (field) and the soul as Khetrajna (knower of the field). Puri, as the sacred Khetra, represents the purified field of consciousness where divine realization occurs.`,
      vedanticSource: `Bhagavad Gita 13.1-2: "इदं शरीरं कौन्तेय क्षेत्रमित्यभिधीयते। एतद्यो वेत्ति तं प्राहुः क्षेत्रज्ञ इति तद्विदः॥" - "This body, O Kaunteya, is called the field (khetra), and one who knows it is called the knower of the field (khetrajna)." The Puri Khetra is described in the Skanda Purana as "सर्वक्षेत्रेषु पुण्यतमम्" - the most sacred among all fields.`,
      modernCorrelation: `Quantum field theory describes reality as fields of energy and information. Consciousness research suggests that awareness itself might be a fundamental field, similar to electromagnetic fields. The concept of morphic fields in biology parallels the Vedantic understanding of consciousness fields that can influence matter and experience.`,
      practicalApplication: `Practice seeing your body and environment as a field of consciousness. During meditation, expand your awareness to include the entire space around you as your "field." This helps transcend the limited identification with the physical body.`,
      scientificInsight: `Research on the Global Consciousness Project suggests that collective human consciousness might create measurable effects in random number generators, supporting the idea of consciousness as a field that can influence physical reality.`
    },
    relatedConcepts: ['bhagavad-gita', 'khetrajna', 'consciousness-field', 'sacred-geography'],
    keywords: ['khetra', 'field-consciousness', 'sacred-space', 'awareness']
  },

  {
    id: 'om-jagannatha-eyes',
    title: 'Om in Jagannatha\'s Eyes: The Cosmic Sound-Form',
    sanskrit: 'ॐ - प्रणव में जगन्नाथ के नेत्र',
    category: 'symbolism',
    level: 'advanced',
    content: {
      introduction: `The distinctive large, round eyes of Jagannatha are said to represent the cosmic sound Om (ॐ). These eyes symbolize the all-seeing cosmic consciousness and the primordial vibration from which all creation emerges.`,
      vedanticSource: `Mandukya Upanishad describes Om as "ॐ इत्येतदक्षरमिदं सर्वं" - "Om, this syllable is all this (universe)." The Prasna Upanishad states: "एतद्वै सत्यकाम परं चापरं च ब्रह्म यदोंकारः" - "This Om is indeed the higher and lower Brahman." Jagannatha's eyes, shaped like Om, represent this cosmic principle made visible.`,
      modernCorrelation: `Modern physics recognizes that all matter is essentially vibration - from subatomic particles to cosmic waves. The cosmic microwave background radiation, discovered in 1965, represents the "echo" of the Big Bang - a primordial vibration that fills the universe. This parallels the Vedantic teaching of Om as the primordial sound from which all creation emerges.`,
      practicalApplication: `During Om chanting, visualize Jagannatha's eyes as the source and destination of the sound. Practice: Chant Om while gazing at an image of Jagannatha, feeling the vibration emanating from and returning to those cosmic eyes.`,
      scientificInsight: `Cymatics (the study of visible sound) shows how sound vibrations create geometric patterns in matter. The circular, mandala-like patterns created by certain frequencies mirror the round, cosmic eyes of Jagannatha, suggesting a deep connection between sound, form, and consciousness.`
    },
    relatedConcepts: ['om-pranava', 'cosmic-sound', 'mandukya-upanishad', 'divine-vision'],
    keywords: ['om', 'cosmic-eyes', 'primordial-sound', 'divine-vision']
  },

  {
    id: 'jagannatha-trinity',
    title: 'The Jagannatha Trinity: Cosmic Functions',
    sanskrit: 'जगन्नाथ त्रिमूर्ति - सृष्टि, स्थिति, संहार',
    category: 'philosophy',
    level: 'intermediate',
    content: {
      introduction: `Jagannatha, along with Balabhadra and Subhadra, represents the cosmic trinity of creation, preservation, and transformation. This trinity embodies the three fundamental forces that govern the universe.`,
      vedanticSource: `The Skanda Purana describes: "बलभद्रो महाविष्णुः सुभद्रा शक्तिरुच्यते। जगन्नाथो जगत्स्रष्टा त्रयो वै परमेश्वराः॥" - "Balabhadra is Maha Vishnu, Subhadra is called Shakti, and Jagannatha is the creator of the world - these three are the Supreme Lords." This reflects the Vedantic principle of Sat-Chit-Ananda (Existence-Consciousness-Bliss).`,
      modernCorrelation: `Modern cosmology recognizes three fundamental forces in the universe: the strong nuclear force (creation/binding), electromagnetic force (preservation/stability), and weak nuclear force (transformation/decay). Additionally, the three states of matter (solid, liquid, gas) and the three dimensions of space mirror this cosmic trinity principle.`,
      practicalApplication: `In daily life, recognize these three forces: creative moments (new ideas, projects), preserving moments (maintaining relationships, health), and transformative moments (letting go, change). Honor all three as sacred cosmic functions.`,
      scientificInsight: `The three generations of fundamental particles in the Standard Model of physics (electron-muon-tau, up-down quarks, etc.) suggest a trinitarian structure at the most basic level of reality, echoing the cosmic trinity represented by the Jagannatha deities.`
    },
    relatedConcepts: ['trinity', 'cosmic-functions', 'sat-chit-ananda', 'balabhadra-subhadra'],
    keywords: ['trinity', 'cosmic-forces', 'creation-preservation-transformation']
  }
];

// Additional supporting data structures
export const JAGANNATHA_PRACTICES = {
  daily: [
    'Morning darshan meditation with Jagannatha visualization',
    'Om chanting while contemplating cosmic eyes',
    'Chariot meditation for self-mastery',
    'Evening gratitude to the cosmic consciousness'
  ],
  weekly: [
    'Study one Jagannatha Tatva topic deeply',
    'Practice seeing all beings as manifestations of Jagannatha',
    'Reflect on the trinity principles in personal life'
  ],
  special: [
    'Ratha Yatra contemplation and celebration',
    'Pilgrimage meditation to Puri Dhama',
    'Advanced Om-Jagannatha eye meditation'
  ]
};

export const SCIENTIFIC_CORRELATIONS = {
  quantumConsciousness: 'Jagannatha as cosmic consciousness parallels quantum field theory',
  neuroscience: 'Chariot metaphor validated by brain research on executive control',
  cosmology: 'Trinity principles reflected in fundamental forces and cosmic evolution',
  acoustics: 'Om-eye symbolism supported by cymatics and sound-form relationships',
  psychology: 'Puri as completeness aligns with self-actualization research'
};

export const MODERN_APPLICATIONS = {
  meditation: 'Jagannatha-based mindfulness and cosmic consciousness practices',
  psychology: 'Trinity principles for balanced personality development',
  leadership: 'Chariot metaphor for conscious decision-making and self-management',
  healing: 'Om-based sound therapy and vibrational healing',
  education: 'Holistic learning approaches based on Vedantic field theory'
};
