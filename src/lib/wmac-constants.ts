export const SITE = {
  name: "Weatherford Martial Arts Center",
  shortName: "WMAC",
  tagline: "Traditional Arts. Timeless Discipline.",
  description:
    "A martial arts and wellness center in Weatherford, Texas specializing in Aikido, Judo, and Daito Ryu Aikijujutsu.",
  phone: "(682) 294-0470",
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
    facebook: "", // TODO: e.g. "https://www.facebook.com/weatherfordmartialarts"
    instagram: "", // TODO
    youtube: "", // TODO
  },
  basePath: "",
};

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Disciplines", href: "/#disciplines" },
  { label: "Programs", href: "/#programs" },
  { label: "Schedule", href: "/schedule" },
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
    name: "Daito Ryu Aikijujutsu",
    slug: "daito-ryu",
    japanese: "\u5927\u6771\u6D41\u5408\u6C17\u67D4\u8853",
    subtitle: "The Ancient Art of Aiki",
    shortDescription:
      "A classical Japanese martial art and the root of modern Aikido. Emphasizes precise technique, internal power, and centuries of samurai tradition.",
    description:
      "Daito Ryu Aikijujutsu is one of Japan's most revered classical martial traditions, with roots stretching back centuries. As the parent art of Aikido, it encompasses a vast curriculum of joint locks, throws, strikes, and weapons techniques. Training emphasizes the development of aiki \u2014 the subtle skill of disrupting an opponent's balance and power through internal body mechanics.",
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
  accent: "red" | "teal";
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
    accent: "red",
  },
  {
    name: "Just Move Fitness",
    slug: "just-move",
    leader: "Autumn Nelson",
    logo: "/logos/Just_Move_Fitness.svg",
    externalUrl: "https://autumnjustmovefitn.wixsite.com/just-move-fitness-wi",
    shortDescription:
      "Movement-based wellness classes with Autumn Nelson. Functional fitness, flexibility, and holistic health for every body.",
    description:
      "Just Move Fitness with Autumn Nelson offers movement-based wellness classes designed to improve functional fitness, flexibility, and overall well-being. Classes focus on accessible, body-positive movement that meets you where you are. Whether you're recovering from injury, starting your fitness journey, or looking to complement your martial arts training.",
    accent: "teal",
  },
];

export const SCHEDULE = [
  { day: "Monday", classes: [
    { time: "5:30 - 6:00 PM", name: "Beginner Karate", group: "karate-university" },
  ]},
  { day: "Tuesday", classes: [
    { time: "5:30 - 6:15 PM", name: "Beginner Karate", group: "karate-university" },
    { time: "6:20 - 7:00 PM", name: "Kata Class", group: "karate-university" },
    { time: "7:00 - 8:30 PM", name: "Aikido/Judo/Aikijujutsu", group: "aikido" },
  ]},
  { day: "Thursday", classes: [
    { time: "5:30 - 6:15 PM", name: "Beginner Karate", group: "karate-university" },
    { time: "6:20 - 7:00 PM", name: "Kata Class", group: "karate-university" },
    { time: "7:00 - 8:30 PM", name: "Aikido/Judo/Aikijujutsu", group: "aikido" },
  ]},
  { day: "Saturday", classes: [
    { time: "10:00 AM", name: "Kata Class", group: "karate-university" },
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
      "Nathan has been teaching martial arts in Weatherford for over 17 years and is the founder of Weatherford Martial Arts Center. He began his Aikido practice as a young man and has continued deep study in the traditional Japanese arts ever since. He currently holds the rank of Rokudan (6th dan) in Tomiki Aikido and Shodan in Kodokan Judo, both from Kaze Uta Budokai, and Shodan in Daito Ryu Aikijujutsu Kiyamakai. His ongoing study focuses on the internal principles of aiki, the subtle body mechanics that unify movement across all three arts, and on the preservation of classical Tomiki kata.",
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
  {
    q: "What are the Just Move Fitness classes like?",
    a: "Just Move Fitness with Autumn Nelson offers accessible, movement-based fitness classes. Whether you're looking for morning energy, strength training, flexibility work, or weekend motivation, there's a class for you.",
  },
];
