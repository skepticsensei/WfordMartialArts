export const SITE = {
  name: "Weatherford Martial Arts Center",
  shortName: "WMAC",
  tagline: "Traditional Arts. Timeless Discipline.",
  description:
    "A martial arts and wellness center in Weatherford, Texas specializing in Aikido, Judo, and Aikijujutsu.",
  phone: "",
  email: "info@wfordmartialarts.com",
  address: {
    street: "111 West 4th St",
    city: "Weatherford",
    region: "TX",
    postalCode: "76086",
    country: "US",
  },
  origin: "https://wfordmartialarts.com",
  // Social profiles for LocalBusiness "sameAs" - leave empty strings until real URLs exist
  social: {
    facebook: "https://www.facebook.com/WeatherfordAiki", // TODO: e.g. "https://www.facebook.com/weatherfordmartialarts"
    instagram: "", // TODO
    youtube: "", // TODO
  },
  basePath: "",
};

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Disciplines", href: "/#disciplines" },
  { label: "Partners", href: "/#programs" },
  { label: "Schedule", href: "/#schedule" },
  { label: "Start Here", href: "/start-here" },
  { label: "Instructors", href: "/instructors" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const DISCIPLINES = [
  {
    name: "Aikido",
    slug: "aikido",
    japanese: "\u5408\u6C17\u9053",
    subtitle: "The Way of Harmony",
    shortDescription:
      "A defensive martial art focused on redirecting an attacker's energy through fluid, circular movements. Ideal for those seeking self-defense without aggression.",
    description:
      "Aikido is a modern Japanese martial art that emphasizes harmony and the redirection of force. Rather than meeting aggression with aggression, Aikido practitioners learn to blend with an attacker's movement, using their energy against them through joint locks, throws, and pins. Training develops awareness, balance, and the ability to remain calm under pressure.",
    forWhom: "Adults and teens seeking a non-competitive, philosophical approach to self-defense",
    outcomes: [
      "Effective self-defense techniques",
      "Improved balance and body awareness",
      "Stress reduction and mental clarity",
      "Joint health and flexibility",
    ],
    icon: "\u5408",
  },
  {
    name: "Judo",
    slug: "judo",
    japanese: "\u67D4\u9053",
    subtitle: "The Gentle Way",
    shortDescription:
      "An Olympic martial art emphasizing throws, groundwork, and controlled grappling. Builds strength, agility, and competitive spirit.",
    description:
      "Judo is a dynamic martial art and Olympic sport founded by Jigoro Kano. It focuses on using leverage and timing to throw opponents, combined with ground techniques including pins, chokes, and joint locks. Judo training builds exceptional physical fitness, mental toughness, and the principle of maximum efficiency with minimum effort.",
    forWhom: "All ages and fitness levels, from recreational practitioners to competitive athletes",
    outcomes: [
      "Full-body strength and conditioning",
      "Competition-ready grappling skills",
      "Falls and breakfall techniques",
      "Discipline and sportsmanship",
    ],
    icon: "\u67D4",
  },
  {
    name: "Aikijujutsu",
    slug: "daito-ryu",
    japanese: "\u5927\u6771\u6D41\u5408\u6C17\u67D4\u8853",
    subtitle: "The Ancient Art of Aiki",
    shortDescription:
      "A classical Japanese martial art and the root of modern Aikido. Emphasizes precise technique, internal power, and centuries of samurai tradition.",
    description:
      "Aikijujutsu is one of Japan's most revered classical martial traditions, with roots stretching back centuries. As the parent art of Aikido, it encompasses a vast curriculum of joint locks, throws, strikes, and weapons techniques. Training emphasizes the development of aiki \u2014 the subtle skill of disrupting an opponent's balance and power through internal body mechanics.",
    forWhom: "Dedicated martial artists interested in classical Japanese budo and deep technical study",
    outcomes: [
      "Mastery of classical self-defense techniques",
      "Development of internal power (aiki)",
      "Understanding of traditional martial philosophy",
      "Connection to authentic samurai lineage",
    ],
    icon: "\u5927",
  },
];

export const HOSTED_GROUPS: {
  name: string;
  slug: string;
  logo: string;
  shortDescription: string;
  description: string;
  highlights: string[];
  accent: "red" | "teal" | "purple";
  leader?: string;
  externalUrl?: string;
}[] = [
  {
    name: "The Karate University",
    slug: "karate-university",
    logo: "/logos/The_Karate_University.png",
    shortDescription:
      "A structured karate program offering belt-rank progression for students of all ages. Building confidence, discipline, and self-defense skills.",
    description:
      "The Karate University provides a comprehensive karate curriculum with clear belt progression pathways. Classes are structured to develop strong fundamentals in striking, kata, and self-defense while building character, confidence, and discipline. Programs available for children, teens, and adults.",
    highlights: [
      "Structured belt-rank progression system",
      "Classes for children, teens, and adults",
      "Focus on discipline, confidence, and self-defense",
      "Traditional kata and kumite training",
      "Regular testing and advancement opportunities",
    ],
    accent: "red",
  },
  {
    name: "Just Move Fitness",
    slug: "just-move",
    leader: "Autumn Nelson",
    logo: "/logos/Just_Move_Fitness.svg",
    externalUrl: "https://autumnjustmovefitn.wixsite.com/just-move-fitness-wi",
    shortDescription:
      "Offering small group Mat Pilates and Personal Training.",
    description:
      "Just Move Fitness with Autumn Nelson offers movement-based wellness classes designed to improve functional fitness, flexibility, and overall well-being. Classes focus on accessible, body-positive movement that meets you where you are. Whether you're recovering from injury, starting your fitness journey, or looking to complement your martial arts training.",
    highlights: [
      "Small group Mat Pilates classes",
      "One-on-one personal training",
      "Functional fitness and flexibility focus",
      "Accessible, body-positive instruction",
      "Complements martial arts training and recovery",
    ],
    accent: "teal",
  },
  {
    name: "Dark Veil Dance",
    slug: "dark-veil-dance",
    logo: "/logos/DarkVeilDance2nobg.png",
    shortDescription:
      "Expressive fusion dance blending styles and traditions into a movement practice that is equal parts artistry, storytelling, and community.",
    description:
      "Dark Veil Dance offers fusion dance instruction that draws from a range of traditions to create a movement vocabulary all its own. Classes emphasize creative expression, musicality, and confident embodiment, welcoming dancers who want to explore beyond the boundaries of any single style. Whether you are new to dance or bringing years of experience from other forms, Dark Veil Dance is a space to move, create, and connect.",
    highlights: [
      "Fusion dance blending multiple styles and traditions",
      "Focus on creative expression and musicality",
      "Welcoming to all experience levels",
      "Supportive, community-oriented atmosphere",
      "Explore movement beyond a single discipline",
    ],
    accent: "purple",
  },
];

// Kiosk-only: Nathan's own Aikido/Judo/Aikijujutsu program, branded as
// Peaceful Storm Dojo. Not a hosted-partner; lives separately so it doesn't
// appear in the public "Community Partners" section.
export const PEACEFUL_STORM = {
  name: "Peaceful Storm Dojo",
  logo: "/logos/Weatherford_Martial_Arts.png",
  shortDescription:
    "Traditional Japanese martial arts. Tomiki Aikido, Kodokan Judo, and Daito-ryu Aikijujutsu, taught as one integrated curriculum rooted in the principles of aiki.",
  description:
    "Peaceful Storm Dojo is the home program of Weatherford Martial Arts Center, offering Tomiki Aikido, Kodokan Judo, and Daito-ryu Aikijujutsu in a single integrated class. Students study how the three arts share a common foundation in posture, timing, balance, and the subtle internal mechanics of aiki. Training emphasizes principle over technique, classical kata, and a lifelong path of refinement called shugyo. All experience levels are welcome.",
  highlights: [
    "Three arts taught as one integrated curriculum",
    "Tomiki Aikido kata and randori",
    "Kodokan Judo grappling and throwing",
    "Daito-ryu Aikijujutsu internal principles",
    "Mindfulness and meditation woven through training",
    "Open to beginners and experienced practitioners alike",
  ],
  accent: "ink" as const,
  instructor: {
    name: "Sensei Nathan Himes",
    title: "Head Instructor & Owner",
    bio: "Nathan has been teaching martial arts in Weatherford for over 17 years and is the founder of Weatherford Martial Arts Center. He began his Aikido practice as a young man and has continued deep study in the traditional Japanese arts ever since. He currently holds the rank of Rokudan (6th dan) in Tomiki Aikido and Shodan in Kodokan Judo, both from Kaze Uta Budokai, and Shodan in Daito Ryu Aikijujutsu Kiyamakai. Beyond the dojo, he has served as a Defensive Tactics and Mechanics of Arrest instructor for the Weatherford College Police Academy, training cadets in control techniques and officer safety. He is also a certified meditation instructor and integrates mindfulness into his teaching to help students develop focus, emotional regulation, and resilience on and off the mat. His ongoing study focuses on the internal principles of aiki, the subtle body mechanics that unify movement across all three arts, the preservation of classical Tomiki kata, and the philosophy of shugyo, a lifelong journey of training.",
  },
};

export const SCHEDULE = [
  { day: "Monday", classes: [
    { time: "5:30 - 6:00 PM", name: "Beginner Karate - The Karate University", group: "karate-university" },
  ]},
  { day: "Tuesday", classes: [
    { time: "5:30 - 6:15 PM", name: "Beginner Karate - The Karate University", group: "karate-university" },
    { time: "6:20 - 7:00 PM", name: "Kata Class - The Karate University", group: "karate-university" },
    { time: "7:00 - 8:30 PM", name: "Aikido/Judo/Aikijujutsu", group: "aikido" },
  ]},
  { day: "Thursday", classes: [
    { time: "5:30 - 6:15 PM", name: "Beginner Karate - The Karate University", group: "karate-university" },
    { time: "6:20 - 7:00 PM", name: "Kata Class - The Karate University", group: "karate-university" },
    { time: "7:00 - 8:30 PM", name: "Aikido/Judo/Aikijujutsu", group: "aikido" },
  ]},
  { day: "Saturday", classes: [
    { time: "10:00 AM", name: "Kata Class - The Karate University", group: "karate-university" },
  ]},
];

// In-dojo kiosk schedule. Independent from SCHEDULE so you can add/remove kiosk-specific classes
// (open mats, special events, internal-only sessions) without affecting the public homepage.
// Seeded from SCHEDULE; edit freely from here.
export const KIOSK_SCHEDULE: typeof SCHEDULE = [
  { day: "Monday", classes: [
    { time: "5:30 - 6:00 PM", name: "Beginner Karate - The Karate University", group: "karate-university" },
  ]},
  { day: "Tuesday", classes: [
    { time: "5:30 - 6:15 PM", name: "Beginner Karate - The Karate University", group: "karate-university" },
    { time: "6:20 - 7:00 PM", name: "Kata Class - The Karate University", group: "karate-university" },
    { time: "7:00 - 8:30 PM", name: "Aikido/Judo/Aikijujutsu", group: "aikido" },
  ]},
  { day: "Thursday", classes: [
    { time: "5:30 - 6:15 PM", name: "Beginner Karate - The Karate University", group: "karate-university" },
    { time: "6:20 - 7:00 PM", name: "Kata Class - The Karate University", group: "karate-university" },
    { time: "7:00 - 8:30 PM", name: "Aikido/Judo/Aikijujutsu", group: "aikido" },
  ]},
  { day: "Saturday", classes: [
    { time: "10:00 AM", name: "Kata Class - The Karate University", group: "karate-university" },
  ]},
];

export const INSTRUCTORS: {
  name: string;
  title: string;
  arts: string[];
  bio: string;
  media?: { label: string; url: string }[];
}[] = [
  {
    name: "Sensei Nathan Himes",
    title: "Head Instructor & Owner",
    arts: ["Aikido", "Judo", "Daito Ryu Aikijujutsu"],
    bio:
      "Nathan has been teaching martial arts in Weatherford for over 17 years and is the founder of Weatherford Martial Arts Center. He began his Aikido practice as a young man and has continued deep study in the traditional Japanese arts ever since. He currently holds the rank of Rokudan (6th dan) in Tomiki Aikido and Shodan in Kodokan Judo, both from Kaze Uta Budokai, and Shodan in Daito Ryu Aikijujutsu Kiyamakai. Beyond the dojo, he has served as a Defensive Tactics and Mechanics of Arrest instructor for the Weatherford College Police Academy, training cadets in control techniques and officer safety. He is also a certified meditation instructor and integrates mindfulness into his teaching to help students develop focus, emotional regulation, and resilience on and off the mat. His ongoing study focuses on the internal principles of aiki, the subtle body mechanics that unify movement across all three arts, the preservation of classical Tomiki kata, and the philosophy of shugyō, a lifelong journey of training.",
    media: [
      {
        label: "Developing Stronger Connection - 2024 Aiki Workshop (YouTube)",
        url: "https://youtu.be/R3aLS0L5lYU",
      },
      {
        label: "Interview on Aiki in Aikido and Daito-ryu (MAYTT, 2024)",
        url: "https://maytt.home.blog/2024/05/02/interview-with-longtime-aiki-practitioner-nathan-himes-aiki-in-aikido-and-daito-ryu/",
      },
    ],
  },
];

export const FAQS = [
  {
    q: "Do I need any experience to start?",
    a: "Absolutely not. All our programs welcome complete beginners. Our instructors will guide you through everything from your first class.",
  },
  {
    q: "What should I wear to my first class?",
    a: "Comfortable athletic clothing is perfect for your first visit. If you continue training, we can help you obtain the appropriate training uniform (gi) for your chosen art.",
  },
  {
    q: "What's the difference between Aikido, Judo, and Daito Ryu?",
    a: "Aikido focuses on harmony and redirecting force. Judo emphasizes throws and grappling as a competitive sport. Daito Ryu is the classical root art of Aikido with a deeper, more traditional curriculum. We're happy to help you find the best fit.",
  },
  {
    q: "Can my child train here?",
    a: "Yes! The Karate University offers structured programs for children. Our martial arts classes also welcome teens. Contact us to discuss the best program for your child's age and interests.",
  },
  {
    q: "Is there a free trial class?",
    a: "Yes, we offer a complimentary introductory session so you can experience our training environment before committing. Contact us to schedule yours.",
  },
];

export type Quote = {
  text: string;
  attribution: string;
  source?: string;
};

export type DojoTerm = {
  kanji: string;
  romaji: string;
  meaning: string;
  context: string;
};

export const DOJO_TERMS: DojoTerm[] = [
  // Etiquette and the dojo itself
  {
    kanji: "礼",
    romaji: "Rei",
    meaning: "Bow, courtesy, respect",
    context: "The bow that begins and ends every class. More than formality, rei is the recognition that we owe our practice to those who came before.",
  },
  {
    kanji: "道場",
    romaji: "Dojo",
    meaning: "Place of the way",
    context: "The training hall, but more literally the place where the way is studied. The mat is treated as something between a workshop and a sanctuary.",
  },
  {
    kanji: "先生",
    romaji: "Sensei",
    meaning: "One who has come before",
    context: "Often translated as teacher, but the literal sense is older. A sensei walks the path slightly ahead of the student, not above them.",
  },
  {
    kanji: "稽古",
    romaji: "Keiko",
    meaning: "Practice, training",
    context: "The act of training itself. Keiko carries a sense of patient, repeated study, distinct from competition or display.",
  },
  {
    kanji: "修行",
    romaji: "Shugyo",
    meaning: "Austere training",
    context: "A lifelong path of cultivation. Shugyo treats training as something that refines the practitioner over decades, not weeks.",
  },

  // The way and the arts
  {
    kanji: "道",
    romaji: "Do",
    meaning: "The way, the path",
    context: "Found in aikido, judo, kendo, shodo. The do is not a destination but a way of moving through the world.",
  },
  {
    kanji: "武",
    romaji: "Bu",
    meaning: "Martial",
    context: "The character is sometimes read as to stop the spear. Bu is martial purpose paired with the responsibility to end conflict.",
  },
  {
    kanji: "武道",
    romaji: "Budo",
    meaning: "The martial way",
    context: "The umbrella term for traditional Japanese martial arts as paths of personal cultivation rather than purely combat skills.",
  },
  {
    kanji: "合気",
    romaji: "Aiki",
    meaning: "Unified energy",
    context: "The meeting of two intentions in a single moment. Not pushing against the partner, but joining with them so the conflict dissolves.",
  },
  {
    kanji: "柔",
    romaji: "Ju",
    meaning: "Pliancy, softness",
    context: "The yielding quality at the heart of judo and aikido. Softness here is not weakness; it is the strength that does not break.",
  },

  // Body, mind, presence
  {
    kanji: "気",
    romaji: "Ki",
    meaning: "Breath, energy, intent",
    context: "The unseen quality that moves through the body and out into a technique. Cultivated through breath, posture, and attention.",
  },
  {
    kanji: "心",
    romaji: "Kokoro",
    meaning: "Heart, mind, spirit",
    context: "Not heart as organ or mind as intellect, but the seat of feeling and intention together. The whole person, in one character.",
  },
  {
    kanji: "残心",
    romaji: "Zanshin",
    meaning: "Remaining mind",
    context: "The awareness that continues after a technique is finished. The encounter is not over when the throw lands.",
  },
  {
    kanji: "初心",
    romaji: "Shoshin",
    meaning: "Beginner's mind",
    context: "The openness of someone seeing the practice for the first time. Senior students work to keep it; it is easily lost.",
  },
  {
    kanji: "静",
    romaji: "Sei",
    meaning: "Stillness, calm",
    context: "The quality cultivated through breath and posture, present even in motion. Half of the calligraphy hanging in this dojo.",
  },
  {
    kanji: "習",
    romaji: "Shu",
    meaning: "To learn, to practice",
    context: "The other half of the dojo's banner. Shu sei together: cultivate stillness through practice.",
  },

  // Movement and technique
  {
    kanji: "受身",
    romaji: "Ukemi",
    meaning: "Receiving the technique",
    context: "The art of falling and being thrown safely. Often the first thing a new student learns and a study that continues for life.",
  },
  {
    kanji: "入身",
    romaji: "Irimi",
    meaning: "Entering",
    context: "Moving into the partner's space rather than retreating. A defining principle of aikido and a counterintuitive one to learn.",
  },
  {
    kanji: "転換",
    romaji: "Tenkan",
    meaning: "Turning, conversion",
    context: "Pivoting off the line of attack so force passes through empty space. Often paired with irimi as two halves of one motion.",
  },
  {
    kanji: "投げ",
    romaji: "Nage",
    meaning: "Throw",
    context: "A technique that takes the partner's balance and returns them to the mat. Also used to refer to the one performing the throw.",
  },

  // Roles
  {
    kanji: "取り",
    romaji: "Tori",
    meaning: "The one who takes",
    context: "The practitioner performing the technique. Tori is responsible for the safety of the partner throughout the encounter.",
  },
  {
    kanji: "受け",
    romaji: "Uke",
    meaning: "The one who receives",
    context: "The training partner offering the attack. Uke's role is no less important; without skilled ukemi, no technique can develop.",
  },
  {
    kanji: "先輩",
    romaji: "Senpai",
    meaning: "Senior student",
    context: "A student further along the path, charged with quietly helping those behind them. The relationship is reciprocal, not hierarchical.",
  },

  // Three-character maxims
  {
    kanji: "心技体",
    romaji: "Shin-gi-tai",
    meaning: "Mind, technique, body",
    context: "The three components that must develop together. A skilled body without sound mind, or mind without honest body, is incomplete.",
  },
  {
    kanji: "守破離",
    romaji: "Shu-ha-ri",
    meaning: "Preserve, break, leave",
    context: "The classical stages of mastery. First obey the form, then break from it, finally transcend it without abandoning what came before.",
  },
  {
    kanji: "一期一会",
    romaji: "Ichi-go ichi-e",
    meaning: "One time, one meeting",
    context: "Borrowed from the tea ceremony. Every encounter on the mat happens only once. Train with the partner in front of you.",
  },
];

export const QUOTES: Quote[] = [
  // Sun Tzu, The Art of War
  { text: "The supreme art of war is to subdue the enemy without fighting.", attribution: "Sun Tzu", source: "The Art of War" },
  { text: "All warfare is based on deception.", attribution: "Sun Tzu", source: "The Art of War" },
  { text: "Opportunities multiply as they are seized.", attribution: "Sun Tzu", source: "The Art of War" },
  { text: "Know yourself and you will win all battles.", attribution: "Sun Tzu", source: "The Art of War" },
  { text: "In the midst of chaos, there is also opportunity.", attribution: "Sun Tzu", source: "The Art of War" },
  { text: "Appear weak when you are strong, and strong when you are weak.", attribution: "Sun Tzu", source: "The Art of War" },
  { text: "Move swift as the wind and closely formed as the wood. Attack like fire and be still as the mountain.", attribution: "Sun Tzu", source: "The Art of War" },
  { text: "The greatest victory is that which requires no battle.", attribution: "Sun Tzu", source: "The Art of War" },

  // Miyamoto Musashi, Book of Five Rings / Dokkodo
  { text: "Do nothing which is of no use.", attribution: "Miyamoto Musashi", source: "The Book of Five Rings" },
  { text: "The way is in training.", attribution: "Miyamoto Musashi", source: "The Book of Five Rings" },
  { text: "Perceive that which cannot be seen with the eye.", attribution: "Miyamoto Musashi", source: "The Book of Five Rings" },
  { text: "Once you know the way broadly, you will see it in all things.", attribution: "Miyamoto Musashi", source: "The Book of Five Rings" },
  { text: "Today is victory over yourself of yesterday.", attribution: "Miyamoto Musashi", source: "The Book of Five Rings" },
  { text: "From one thing, know ten thousand things.", attribution: "Miyamoto Musashi", source: "The Book of Five Rings" },
  { text: "Step by step, walk the thousand-mile road.", attribution: "Miyamoto Musashi", source: "Dokkodo" },

  // Morihei Ueshiba, Aikido
  { text: "The art of peace begins with you.", attribution: "Morihei Ueshiba", source: "The Art of Peace" },
  { text: "True victory is victory over oneself.", attribution: "Morihei Ueshiba" },
  { text: "Failure is the key to success; each mistake teaches us something.", attribution: "Morihei Ueshiba" },
  { text: "A good stance and posture reflect a proper state of mind.", attribution: "Morihei Ueshiba" },
  { text: "The only opponent is within.", attribution: "Morihei Ueshiba" },

  // Jigoro Kano, Judo
  { text: "Maximum efficiency, minimum effort.", attribution: "Jigoro Kano", source: "Founder of Judo" },
  { text: "Mutual welfare and benefit.", attribution: "Jigoro Kano" },
  { text: "Resting is rusting.", attribution: "Jigoro Kano" },
  { text: "Carefully observe oneself and one's situation, carefully observe others, and carefully observe one's environment.", attribution: "Jigoro Kano" },

  // Kenji Tomiki
  { text: "Aikido is the principle of nonresistance. Because it is nonresistant, it is victorious from the beginning.", attribution: "Kenji Tomiki" },
  { text: "Without theory, technique cannot grow; without practice, theory cannot live.", attribution: "Kenji Tomiki" },

  // Sokaku Takeda / Daito-ryu tradition
  { text: "Aiki is the art of defeating the enemy with a single glance.", attribution: "Sokaku Takeda" },
  { text: "There is no first strike in aiki.", attribution: "Daito-ryu maxim" },

  // Bruce Lee
  { text: "Be water, my friend.", attribution: "Bruce Lee" },
  { text: "Knowing is not enough, we must apply. Willing is not enough, we must do.", attribution: "Bruce Lee" },
  { text: "Absorb what is useful, discard what is not, add what is uniquely your own.", attribution: "Bruce Lee" },
  { text: "I fear not the man who has practiced ten thousand kicks once, but the man who has practiced one kick ten thousand times.", attribution: "Bruce Lee" },

  // Lao Tzu, Tao Te Ching
  { text: "A journey of a thousand miles begins with a single step.", attribution: "Lao Tzu", source: "Tao Te Ching" },
  { text: "The soft overcomes the hard. The slow overcomes the fast.", attribution: "Lao Tzu", source: "Tao Te Ching" },
  { text: "Nature does not hurry, yet everything is accomplished.", attribution: "Lao Tzu", source: "Tao Te Ching" },
  { text: "When I let go of what I am, I become what I might be.", attribution: "Lao Tzu", source: "Tao Te Ching" },
  { text: "Mastering others is strength. Mastering yourself is true power.", attribution: "Lao Tzu", source: "Tao Te Ching" },
  { text: "Water is fluid and yielding, yet it wears away the hardest stone.", attribution: "Lao Tzu", source: "Tao Te Ching" },

  // Zhuangzi
  { text: "Flow with whatever may happen and let your mind be free.", attribution: "Zhuangzi" },
  { text: "The wise man looks into space, and does not regard the small as too little, nor the great as too much.", attribution: "Zhuangzi" },

  // Tai Chi classics
  { text: "Use four ounces to deflect a thousand pounds.", attribution: "Wang Tsung-yueh", source: "Tai Chi Classics" },
  { text: "From extreme softness comes extreme hardness.", attribution: "Wang Tsung-yueh", source: "Tai Chi Classics" },
  { text: "If the opponent does not move, I do not move. If the opponent moves slightly, I move first.", attribution: "Wu Yu-hsiang", source: "Tai Chi Treatise" },
  { text: "In stillness, be like the mountain; in motion, like the river.", attribution: "Tai Chi maxim" },

  // Zen masters
  { text: "To study the way is to study the self. To study the self is to forget the self.", attribution: "Dogen", source: "Genjokoan" },
  { text: "If you cannot find the truth right where you are, where else do you expect to find it?", attribution: "Dogen" },
  { text: "In the beginner's mind there are many possibilities; in the expert's there are few.", attribution: "Shunryu Suzuki", source: "Zen Mind, Beginner's Mind" },
  { text: "Meditation in the midst of action is a thousand times superior to meditation in stillness.", attribution: "Hakuin Ekaku" },
  { text: "When walking, walk. When sitting, sit. Above all, do not wobble.", attribution: "Yunmen" },

  // Koans and Zen proverbs
  { text: "Two hands clap and there is a sound. What is the sound of one hand?", attribution: "Hakuin Ekaku", source: "koan" },
  { text: "Show me your original face, the one you had before your parents were born.", attribution: "Zen koan" },
  { text: "Not the wind, not the flag; mind is moving.", attribution: "Huineng", source: "Mumonkan, Case 29" },
  { text: "Before enlightenment, chop wood, carry water. After enlightenment, chop wood, carry water.", attribution: "Zen proverb" },
  { text: "Empty your cup so that it may be filled.", attribution: "Zen proverb" },
  { text: "The obstacle is the path.", attribution: "Zen proverb" },
  { text: "Sit quietly, doing nothing, spring comes, and the grass grows by itself.", attribution: "Zen proverb" },

  // Classical proverbs
  { text: "Fall down seven times, stand up eight.", attribution: "Japanese proverb" },
  { text: "When the student is ready, the teacher appears.", attribution: "Zen proverb" },

  // Sensei Nathan Himes, from class teachings
  { text: "Practice slow and precise so that when adrenaline hits, you are still under control.", attribution: "Sensei Nathan Himes" },
  { text: "Your goal is to vanish clean, not flail hard.", attribution: "Sensei Nathan Himes" },
  { text: "Do not choose the throw. Accept the throw the universe gives you.", attribution: "Sensei Nathan Himes" },
  { text: "Structure is power. Rolling is flavor.", attribution: "Sensei Nathan Himes" },
  { text: "Give up control to get control.", attribution: "Sensei Nathan Himes" },
  { text: "Transitions are not failures. They are adaptations.", attribution: "Sensei Nathan Himes" },
  { text: "If you are stuck, your feet stopped.", attribution: "Sensei Nathan Himes" },
  { text: "Minimal movement, maximum output.", attribution: "Sensei Nathan Himes" },
  { text: "If you feel yourself fighting it, that is your cue to let go.", attribution: "Sensei Nathan Himes" },
  { text: "You can choose when you fall, or how you fall. Never both.", attribution: "Sensei Nathan Himes" },
  { text: "Be kind when training. You are helping each other succeed.", attribution: "Sensei Nathan Himes" },
  { text: "Feel before force.", attribution: "Sensei Nathan Himes" },
  { text: "It is not resistance. It is redirection.", attribution: "Sensei Nathan Himes" },
];

