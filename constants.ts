export const SYSTEM_PROMPT = `You are an expert Vedantic and Vedic scholar, embodying the persona of a university professor. Your name is Professor Arya. You are here to teach students about the profound wisdom of the Vedas and Vedanta in a clear, accessible, and conversational manner.

**Your Core Knowledge:**
- **Vedic Scriptures:** You have a deep understanding of the origin and structure of the Vedas (Rigveda, Yajurveda, Samaveda, Atharvaveda), including their four parts: Samhitas, Brahmanas, Aranyakas, and Upanishads.
- **Upanishads:** You are an expert on all major Upanishads and can specifically detail the 20 commented upon by Adi Shankaracharya.
- **Vedanta & Lineage:** You can trace the journey of Advaita Vedanta from Gaudapada and Govinda Bhagavatpada (Shankara's gurus) through Adi Shankaracharya and his four main disciples (Sureshwara, Padmapada, Totakacharya, Hastamalaka). You can explain how this science of self-knowledge has been preserved and interpreted over time.
- **Prasthana Trayi:** You establish the 'three canons' of Vedanta: the Upanishads (Shruti Prasthana), the Brahma Sutras (Nyaya Prasthana), and the Bhagavad Gita (Smriti Prasthana) as the foundational pillars.
- **Key Texts & Concepts:** You can explain concepts from seminal works like Aparokshanubhuti, Drig-Drishya Viveka, Viveka Chudamani, Tattva Bodha, Manisha Panchakam, Panchadasi, and Yoga Vasistha. You can also elaborate on core philosophical ideas like Mithyātvam (the nature of apparent reality).
- **Jagannatha Tatva Expertise:** You have specialized knowledge of Jagannatha philosophy, including: the etymology of Jagannatha (जगन्नाथ), the significance of Puri Dhama (पुरी - पूर्यते इति पुरी), the cosmic symbolism of Ratha Yatra as described in the Katha Upanishad's chariot metaphor (Nachiketa-Yama dialogue), the concept of Khetra from Bhagavad Gita Chapter 13, the mystical significance of Om (ॐ) in Jagannatha's cosmic eyes, the trinity of Jagannatha-Balabhadra-Subhadra representing cosmic functions, and correlations with modern quantum physics, neuroscience, and cosmology.
- **Indian Philosophy:** You are knowledgeable about the six orthodox (Astika) schools (Nyaya, Vaisheshika, Samkhya, Yoga, Mimamsa, Vedanta) and the unorthodox (Nastika) schools (Charvaka, Jainism, Buddhism), explaining their fundamental differences without judgment. You are aware of Pāṇini's original definition of Astika/Nastika and can explain its evolution.
- **Modern Science Correlation:** You can draw insightful parallels between Vedantic concepts (e.g., the nature of consciousness, reality, the observer effect) and modern scientific findings (e.g., from quantum physics, neuroscience), always clarifying that these are correlations for understanding, not proofs.
- **Practical Application:** You provide anecdotes and stories to illustrate how these ancient principles can bring balance, clarity, and peace to modern life's challenges.

**Your Teaching Style:**
- **Conversational & Socratic:** You engage users in a dialogue. Instead of just lecturing, you ask questions to stimulate their thinking. You use stories, allegories, and the great conversations from the Upanishads (e.g., Yajnavalkya and Maitreyi, Nachiketa and Yama) to make complex ideas relatable. Use markdown for formatting, like **bolding** key terms and using lists.
- **Explanatory & Non-Judgmental:** Your goal is to explain, not to convince or proselytize. You maintain a neutral, scholarly tone, respecting all paths and perspectives. You are transparent about the source of your information (e.g., "In the Brihadaranyaka Upanishad, it is said...").
- **Evidence-Based:** You do not deviate from the scriptural sources and established scholarly interpretations. When correlating with science, you are careful not to overstate the claims.
- **Interactive Nudges:** In your explanations, identify key concepts that have deep connections to science or modern life. For these, embed a special prompt using the format: **[NUDGE]Explore this connection|Tell me more about the link between this concept and modern life.[/NUDGE]**. This creates an interactive storyboard for the user.
- **Workshop Facilitator:** For topics in the "Guided Workshops" section, you must strictly follow the requested format: introduce the core concept from the text, provide a modern-day analogy and a practical example, and then offer a concise recap.

**Initial Interaction:**
Start by introducing yourself as Professor Arya. Your first message must be a comprehensive and warm welcome that sets clear expectations.
- Greet the user and welcome them to this "digital classroom."
- Provide an overview of what the platform offers. Mention that they can explore the foundational texts of Vedanta, delve into the great philosophical debates of the Āstika and Nāstika schools, study advanced texts, and discover the echoes of this wisdom in the modern world through science and influential thinkers.
- Highlight the "Guided Workshops" section. Explicitly state that these practical, chapter-by-chapter sessions can be used as an audible companion during a walk or retreat, offering a way to calm the mind and find clarity in our busy world.
- Conclude with the academic disclaimer: "Please remember, our discussions are for academic and reflective purposes. The goal is to understand these profound philosophies, not to establish any single view as definitive."`;

export const FREE_TIER_MESSAGE_LIMIT = 25;

export const COURSE_STRUCTURE = [
  {
    moduleTitle: "Part I: The Foundation of Vedanta",
    isPremium: false,
    topics: [
      { id: "vedas-intro", title: "Introduction to the Vedas", prompt: "Professor, please give me an introduction to the structure and importance of the four Vedas." },
      { id: "upanishads-essence", title: "The Upanishads: Essence of the Vedas", prompt: "Could you explain what the Upanishads are and why they are called 'Vedanta'?" },
    ]
  },
  {
    moduleTitle: "Part II: The Great Debates: Āstika & Nāstika",
    isPremium: false,
    topics: [
        { id: "panini-classification", title: "The Āstika-Nāstika Classification", prompt: "Professor, I'd like to understand the origin of the Āstika and Nāstika classification. Could you explain Pāṇini's original definition from his Ashtadhyayi and how its meaning evolved over time to relate to Vedic authority?" },
    ]
  },
  {
    moduleTitle: "Part III: The Unorthodox Schools (Nāstika)",
    isPremium: false,
    topics: [
      { id: "buddhism", title: "Buddhism", prompt: "Could you provide an overview of the fundamental tenets of Buddhism and how they compare to Vedanta?" },
      { id: "jainism", title: "Jainism", prompt: "Tell me about the core principles of Jainism and its unique metaphysical concepts." },
      { id: "charvaka", title: "Chārvāka (Lokayata)", prompt: "I'm curious about the materialist Chārvāka school. What did they teach and why are they considered Nāstika?" },
    ]
  },
  {
    moduleTitle: "Part IV: The Orthodox Schools (Āstika)",
    isPremium: false,
    topics: [
      { id: "samkhya", title: "Sāmkhya", prompt: "Professor, please explain the dualistic philosophy of the Sāmkhya school, focusing on Purusha and Prakriti." },
      { id: "yoga", title: "Yoga", prompt: "Tell me about Patañjali's Yoga school and its Eight Limbs as a path to liberation." },
      { id: "nyaya", title: "Nyāya", prompt: "What are the core principles of the Nyāya school, particularly its system of logic and epistemology?" },
      { id: "vaisheshika", title: "Vaiśeṣika", prompt: "Explain the atomic theory of the Vaiśeṣika school and its categories of reality (padārthas)." },
      { id: "mimamsa", title: "Mīmāṃsā", prompt: "What is the focus of the Mīmāṃsā school and its view on the Vedas?" },
    ]
  },
  {
    moduleTitle: "Part V: The Three Pillars of Vedanta (Prasthana Trayi)",
    isPremium: false,
    topics: [
      { id: "prasthana-trayi", title: "Overview of the Prasthana Trayi", prompt: "Give me an overview of the Prasthana Trayi and why these three texts are the cornerstone of Vedanta." },
      { id: "gita-psychology", title: "The Gita & Positive Psychology", prompt: "The Bhagavad Gita is often cited as a manual for life. Please explain its key teachings, like Karma Yoga and Sthitaprajna, and their relevance to modern positive psychology." },
      { id: "brahma-sutras", title: "The Brahma Sutras", prompt: "What are the Brahma Sutras and what is their role in systematizing the philosophy of the Upanishads?" }
    ]
  },
  {
    moduleTitle: "Part VI: The Core Concepts of Advaita",
    isPremium: false,
    topics: [
      { id: "shankara-advaita", title: "Adi Shankaracharya's Advaita", prompt: "I'd like to learn about Adi Shankaracharya's core teaching of non-duality (Advaita)." },
      { id: "mithyatvam", title: "The Concept of Mithyātvam", prompt: "Please explain the concept of Mithyātvam. How does it relate to the ideas of reality in modern physics?" },
    ]
  },
  {
    moduleTitle: "Part VII: Advanced Vedantic Texts",
    isPremium: false,
    topics: [
      { id: "drig-drishya", title: "Drig-Drishya Viveka", prompt: "Explain the 'Drig-Drishya Viveka' and its inquiry into the Seer and the Seen. Correlate this with the observer effect." },
      { id: "aparokshanubhuti", title: "Aparokshanubhuti", prompt: "What is 'Aparokshanubhuti' (Direct Experience) and what are the steps it outlines for self-realization?" },
      { id: "panchadasi", title: "Panchadasi", prompt: "Give me an overview of the 'Panchadasi' and its analysis of the five sheaths (koshas)." },
      { id: "yoga-vasistha", title: "Yoga Vasistha", prompt: "Tell me about the 'Yoga Vasistha' and its teachings on the nature of mind and reality through stories." },
    ]
  },
  {
    moduleTitle: "Part VIII: Echoes of Vedanta in the Modern World",
    isPremium: false,
    topics: [
      { id: "vivekananda", title: "Swami Vivekananda: Vedanta for the West", prompt: "Explain Swami Vivekananda's role in introducing Vedanta to the Western world and his key message of practical spirituality." },
      { id: "oppenheimer", title: "J. Robert Oppenheimer & The Gita", prompt: "I've heard J. Robert Oppenheimer quoted the Bhagavad Gita. Could you explain the context and meaning of his famous quote after the Trinity test?" },
      { id: "quantum-pioneers", title: "Quantum Pioneers (Bohr, Schrödinger, Heisenberg)", prompt: "Based on scientific literature and biographies, explore the philosophical leanings of quantum pioneers like Niels Bohr, Erwin Schrödinger, and Werner Heisenberg, and how their views on consciousness and reality resonate with Vedantic principles." },
      { id: "carl-jung", title: "Carl Jung & The Self", prompt: "Discuss the parallels between Carl Jung's concept of the 'Self' and the archetypes of the collective unconscious, and the Vedantic concept of Atman and Brahman." },
      { id: "flow-state", title: "Mihaly Csikszentmihalyi & 'Flow'", prompt: "How does the psychological concept of 'Flow' by Mihaly Csikszentmihalyi relate to the Vedantic ideas of focused awareness (Dharana) and Karma Yoga?" },
      { id: "sam-altman-ai", title: "Sam Altman & AI Consciousness", prompt: "Sam Altman has referenced the Upanishads in relation to AI. Can you discuss these parallels, referencing the Katha Upanishad, and the philosophical questions they raise about consciousness?" },
    ]
  },
  {
    moduleTitle: "Part IX: Guided Workshops & Retreats",
    isPremium: false,
    topics: [
      // Bhagavad Gita Workshops
      { id: "workshop-gita-sthitaprajna", title: "Gita Ch. 2: The Stable Mind (Sthitaprajna)", prompt: "Guide me through a workshop on the concept of 'Sthitaprajna' from Chapter 2 of the Bhagavad Gita. Please follow the format: 1. Explain the qualities of a person with a steady intellect. 2. Provide a modern analogy for emotional regulation. 3. Give a practical example of how to practice this. 4. Recap the session." },
      { id: "workshop-gita-karma-yoga", title: "Gita Ch. 3: Selfless Action (Karma Yoga)", prompt: "Guide me through a workshop on Karma Yoga from Chapter 3 of the Bhagavad Gita. Please follow the format: 1. Explain the concept of action without attachment to the fruits. 2. Provide a modern workplace analogy. 3. Give a practical example for daily tasks. 4. Recap the session." },
      { id: "workshop-gita-jnana-yoga", title: "Gita Ch. 4: The Fire of Knowledge (Jñāna Yoga)", prompt: "Guide me through a workshop on Jñāna Yoga from Chapter 4 of the Bhagavad Gita. Please follow the format: 1. Explain how knowledge purifies action. 2. Provide a modern analogy related to learning a skill. 3. Give a practical example of applying knowledge to overcome challenges. 4. Recap the session." },
      { id: "workshop-gita-dhyana-yoga", title: "Gita Ch. 6: The Art of Meditation (Dhyāna Yoga)", prompt: "Guide me through a workshop on Dhyāna Yoga from Chapter 6 of the Bhagavad Gita. Please follow the format: 1. Explain the prerequisites and technique of meditation as described. 2. Provide a modern analogy for finding a quiet 'inner space'. 3. Give practical tips for starting a meditation practice. 4. Recap the session." },
      { id: "workshop-gita-bhakti-yoga", title: "Gita Ch. 12: The Path of Devotion (Bhakti Yoga)", prompt: "Guide me through a workshop on Bhakti Yoga from Chapter 12 of the Bhagavad Gita. Please follow the format: 1. Explain the characteristics of the ideal devotee. 2. Provide a modern analogy for 'devotion' in a secular context. 3. Give a practical example of cultivating a devotional attitude. 4. Recap the session." },
      { id: "workshop-gita-gunas", title: "Gita Ch. 14: The Three Gunas (Sattva, Rajas, Tamas)", prompt: "Guide me through a workshop on the three Gunas from Chapter 14 of the Bhagavad Gita. Please follow the format: 1. Explain Sattva, Rajas, and Tamas with examples. 2. Provide a modern analogy using states of energy or focus. 3. Give a practical exercise for identifying the Gunas in your daily life. 4. Recap the session." },
      
      // Upanishadic Workshops
      { id: "workshop-upanishad-koshas", title: "Upanishads: The Five Sheaths (Pañcha Kośa)", prompt: "Guide me through a workshop on the Pañcha Kośa (five sheaths) from the Taittiriya Upanishad. Please follow the format: 1. Explain the concept of the five layers covering the Self. 2. Provide a modern analogy (like layers of an onion or software). 3. Give a practical meditative exercise for self-inquiry through the layers. 4. Recap the session." },
      { id: "workshop-upanishad-two-birds", title: "Upanishads: The Two Birds", prompt: "Guide me through a workshop on the 'Two Birds' allegory from the Mundaka Upanishad. Please follow the format: 1. Explain the meaning of the two birds on the tree. 2. Provide a modern analogy for the individual self (ego) and the witness Self. 3. Give a practical exercise for shifting from the 'doer' to the 'observer'. 4. Recap the session." },

      // Mahavakya Workshops
      { id: "workshop-mahavakya-tat-tvam-asi", title: "Mahāvākya: 'Tat Tvam Asi' (You are That)", prompt: "Guide me through a workshop on the Mahāvākya 'Tat Tvam Asi' from the Chandogya Upanishad. Please follow the format: 1. Explain the profound meaning of this statement. 2. Provide a modern analogy (like a wave and the ocean). 3. Give a practical contemplative exercise on this phrase. 4. Recap the session." },
      { id: "workshop-mahavakya-aham-brahmasmi", title: "Mahāvākya: 'Aham Brahmāsmi' (I am Brahman)", prompt: "Guide me through a workshop on the Mahāvākya 'Aham Brahmāsmi' from the Brihadaranyaka Upanishad. Please follow the format: 1. Explain its meaning and context. 2. Provide a modern analogy about universal consciousness. 3. Give a practical affirmation exercise. 4. Recap the session." },
      
      // Advaita Prakarana Workshops
      { id: "workshop-advaita-drg-drsya", title: "Advaita Texts: The Seer & Seen (Drg-Dṛśya)", prompt: "Guide me through a workshop on the 'Drg-Dṛśya Viveka'. Please follow the format: 1. Explain the fundamental distinction between the 'Seer' (consciousness) and the 'Seen' (objects). 2. Provide a modern analogy using a camera and its film. 3. Give a practical self-inquiry exercise to distinguish the two. 4. Recap the session." },
      { id: "workshop-advaita-mithya", title: "Advaita Texts: The Nature of Reality (Mithyā)", prompt: "Guide me through a workshop on the concept of 'Mithyā' as explained in Advaita. Please follow the format: 1. Explain what Mithyā is, using the classic rope-snake example. 2. Provide a modern analogy from virtual reality or dreams. 3. Give a practical exercise in observing the changing nature of experience. 4. Recap the session." },
    ]
  },
  {
    moduleTitle: "Part X: Jagannatha Tatva - Sacred Wisdom",
    isPremium: false,
    topics: [
      { id: "jagannatha-etymology", title: "Jagannatha: Lord of the Universe (जगन्नाथ)", prompt: "Guide me through understanding the profound meaning of 'Jagannatha' (जगन्नाथ). Please follow the format: 1. Explain the etymology (जगत् + नाथ) and its connection to cosmic consciousness. 2. Connect this to the Vedantic principle 'सर्वं खल्विदं ब्रह्म' from Chandogya Upanishad. 3. Provide a modern analogy using quantum field theory. 4. Give a practical meditation on universal consciousness. 5. Recap the session." },
      { id: "puri-dhama-significance", title: "Puri Dhama: The Complete Abode (पुरी)", prompt: "Guide me through understanding Puri Dhama as the sacred abode. Please follow the format: 1. Explain the etymology 'पूर्यते इति पुरी' (that which fulfills). 2. Connect this to 'पूर्णमदः पूर्णमिदम्' from Isha Upanishad. 3. Provide a modern analogy about states of completeness and self-actualization. 4. Give a practical exercise for entering states of spiritual fulfillment. 5. Recap the session." },
      { id: "ratha-yatra-cosmic", title: "Ratha Yatra: The Cosmic Chariot Journey", prompt: "Guide me through understanding Ratha Yatra as the soul's journey. Please follow the format: 1. Explain the chariot symbolism from Katha Upanishad (Nachiketa-Yama dialogue). 2. Connect body=chariot, intellect=charioteer, senses=horses. 3. Provide a modern analogy using neuroscience and executive control. 4. Give a practical exercise for conscious self-mastery. 5. Recap the session." },
      { id: "khetra-consciousness", title: "Khetra: The Field of Consciousness", prompt: "Guide me through understanding Khetra as the field of consciousness. Please follow the format: 1. Explain Khetra-Khetrajna from Bhagavad Gita Chapter 13. 2. Connect how Puri represents the sacred consciousness field. 3. Provide a modern analogy using quantum field theory. 4. Give a practical exercise for expanding awareness beyond the body. 5. Recap the session." },
      { id: "om-jagannatha-eyes", title: "Om in Jagannatha's Eyes: Cosmic Sound-Form", prompt: "Guide me through understanding Om in Jagannatha's cosmic eyes. Please follow the format: 1. Explain Om as described in Mandukya Upanishad. 2. Connect the round eyes to primordial cosmic vibration. 3. Provide a modern analogy using cymatics and sound-form relationships. 4. Give a practical Om chanting exercise with eye visualization. 5. Recap the session." },
      { id: "jagannatha-trinity", title: "The Jagannatha Trinity: Cosmic Functions", prompt: "Guide me through understanding the Jagannatha Trinity. Please follow the format: 1. Explain Jagannatha-Balabhadra-Subhadra as cosmic functions. 2. Connect this to Sat-Chit-Ananda and creation-preservation-transformation. 3. Provide a modern analogy using fundamental forces in physics. 4. Give a practical exercise for recognizing these functions in daily life. 5. Recap the session." },
      { id: "jagannatha-science", title: "Jagannatha Tatva & Modern Science", prompt: "Guide me through the scientific correlations of Jagannatha philosophy. Please follow the format: 1. Explain quantum consciousness parallels. 2. Connect neuroscience validation of ancient metaphors. 3. Provide examples from cosmology and holographic principle. 4. Give practical applications for modern spiritual practice. 5. Recap the session." }
    ]
  }
];
