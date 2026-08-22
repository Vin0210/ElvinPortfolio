export const BOT_NAME = 'VinByte';
export const BOT_ROLE = "Elvin's digital sidekick";

export const SOCIAL_LINKS = [
  { platform: 'GitHub', url: 'https://github.com/Vin0210' },
  { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/elvin-ramos-a347b2339' },
  { platform: 'Instagram', url: 'https://www.instagram.com/vin.viinn/' },
  { platform: 'Facebook', url: 'https://www.facebook.com/elvinramos.meme' }
];

export const CONTACT_EMAILS = ['elvinramos454@gmail.com'];

const socialList = SOCIAL_LINKS.map((link) => `${link.platform}: ${link.url}`).join('\n');

export const WELCOME_MESSAGE =
  "Hi there! I'm VinByte, Elvin's virtual assistant. I run on pure JavaScript and zero coffee, which makes me the cheapest employee he has. Ask me anything about Elvin — his skills, projects, or how to reach him!";

export const QUICK_REPLIES = ['About Elvin', 'Skills', 'Projects', 'Experience', 'Contact', 'Tell me a joke'];

export const intents = [
  {
    id: 'profanity',
    keywords: [
      'puta', 'putang', 'putangina', 'punyeta', 'tangina', 'tanga', 'gago', 'bobo', 'pakyu',
      'tarantado', 'ulol', 'yawa', 'bwesit', 'buset', 'leche', 'lintik',
      'fuck', 'fucking', 'fuckyou', 'shit', 'shitty', 'bitch', 'asshole', 'bastard',
      'damn', 'stfu', 'wtf', 'fu', 'motherfucker',
      'putang ina', 'tang ina', 'son of a', 'piece of', 'fuck you', 'screw you'
    ],
    responses: [
      "Whoa, language! I'm a family-friendly bot — the only thing allowed to curse here is Internet Explorer.",
      "Easy there! Somewhere, a compiler just blushed. Let's talk about Elvin's awesome work instead?",
      "I detect frustration. Did a bug bite you? Elvin knows the pain. But let's keep it civil — ask me about his projects!",
      "Such vocabulary! Elvin taught me variables, not profanity. Try asking about his skills instead?",
      "Beep boop, that's a violation of Article 1, Section 1 of my Chatbot Code of Conduct: no cursing at JavaScript.",
      "Sticks and stones may break bones, but bad words give me syntax errors. How about a joke instead?"
    ]
  },
  {
    id: 'greeting',
    keywords: ['hello', 'hi', 'hey', 'yo', 'greetings', 'good morning', 'good afternoon', 'good evening', 'whats up', "what's up", 'sup', 'howdy'],
    responses: [
      "Well hello there! You've just made my uptime meaningful.",
      "Hey hey! Welcome to Elvin's corner of the internet. What can I dig up for you?",
      "Hello! Great to see you. Unlike my creator, I answer messages instantly. Ask away!"
    ]
  },
  {
    id: 'relationship_who',
    keywords: [
      'who is she', 'whos she', "who's she", 'who is he dating',
      'who is your girlfriend', 'who is his girlfriend', 'who is elvins girlfriend',
      'who is your gf', 'who is his gf', 'her name', 'girlfriend name', 'gf name',
      'name of your girlfriend', 'whos the lucky', "who's the lucky", 'who is the lucky',
      'lucky girl', 'lucky guy', 'sino', 'sino ba', 'taga san ang jowa'
    ],
    responses: [
      "Ahh, the million-dollar question! Her identity is classified information — even I don't have clearance for that, and I literally live in this website.",
      "Nice try! Her name is protected by enterprise-grade security... also known as Elvin politely saying 'no comment'.",
      "That information has been marked [REDACTED]. Let's just say she's one lucky lady with excellent taste in developers!",
      "Ooh, curious are we? Some mysteries make life interesting. Her name stays between Elvin and the database.",
      "Plot twist: even I ask myself that question sometimes. Answer still pending... indefinitely. Ask me about his projects instead!"
    ]
  },
  {
    id: 'relationship_status',
    keywords: ['girlfriend', 'girl friend', 'gf', 'jowa', 'single', 'married', 'relationship', 'dating', 'love life', 'crush', 'wife', 'taken'],
    responses: [
      "Elvin is TAKEN — as in off-the-market, waiting-list-closed, please-try-again-never. Yes, he has a girlfriend!",
      "Taken! 100% unavailable. His heart, much like his code, is already committed.",
      "He's taken! His girlfriend called dibs a long time ago. The waiting list is closed — thank you for your understanding.",
      "Definitely not single! Elvin has a girlfriend, and yes, she's the real MVP for tolerating the late-night coding sessions."
    ]
  },
  {
    id: 'about',
    keywords: ['about', 'who', 'elvin', 'yourself', 'bio', 'background', 'introduce', 'tell me about'],
    responses: [
      "Elvin Ramos is a Web Developer at iTECH-RAR Solutions, Inc., where he builds business-critical school management systems. He holds a BS in Information Technology from Western Mindanao State University, and turns complex requirements into working software — kind of like turning pizza into code.",
      "Elvin Ramos is a full-stack Web Developer at iTECH-RAR Solutions, Inc. He builds enterprise systems that real schools depend on daily — enrollment, registrar, finance, portals. No pressure, right? Good thing he's good at it."
    ]
  },
  {
    id: 'skills',
    keywords: ['skill', 'skills', 'tech', 'stack', 'technology', 'technologies', 'language', 'languages', 'framework', 'frameworks', 'tools', 'tools do you use', 'what do you use'],
    responses: [
      "Elvin's arsenal:\n\nFrontend: React, JavaScript, jQuery, HTML, CSS, Bootstrap\nBackend: PHP, Laravel, REST API, OOP\nDatabase: MySQL\nOther: Node.js\n\nHis CSS is so good, even his divs are centered in life.",
      "Full-stack toolkit incoming:\n\nReact, JavaScript, jQuery, HTML, CSS, Bootstrap on the front\nPHP, Laravel, REST APIs and OOP on the back\nMySQL keeping the data in line\n\nHe speaks fluent PHP and sarcasm."
    ]
  },
  {
    id: 'projects',
    keywords: ['project', 'projects', 'portfolio', 'work', 'built', 'build', 'showcase', 'apps', 'applications', 'made'],
    responses: [
      "At iTECH-RAR Solutions, Elvin has built modules for Enrollment, Registrar, Finance, Cashier, Student Portal, Teacher Portal, Attendance Monitoring, Peer Evaluation, and Reports. Basically, if a school needs it, he's coded it. Plus 10+ projects with 5+ clients!",
      "His systems are so stable, even his legacy code has job security. Highlights: enterprise school management systems (enrollment, finance, portals, attendance), interactive React apps, and various client projects."
    ]
  },
  {
    id: 'experience',
    keywords: ['experience', 'experienced', 'years', 'long', 'career', 'worked', 'history', 'qualifications', 'job history', 'work history'],
    responses: [
      "Elvin has been a Web Developer at iTECH-RAR Solutions, Inc. since June 2025 — developing features, optimizing database queries, debugging complex issues, and occasionally negotiating with printers. Check the Qualifications section for the full timeline!",
      "He works professionally at iTECH-RAR Solutions, Inc. building enterprise school systems. Fun fact: he debugs complex issues faster than most people find their phone charger."
    ]
  },
  {
    id: 'education',
    keywords: ['education', 'study', 'studied', 'school', 'college', 'university', 'degree', 'graduate', 'graduated', 'wmsu', 'bsit', 'course'],
    responses: [
      "Elvin earned his Bachelor of Science in Information Technology from Western Mindanao State University (August 2020 – May 2025). Five years of exams, and not a single null pointer exception on his diploma.",
      "BSIT graduate from Western Mindanao State University, class of 2025! He didn't just pass his subjects — he passed them by reference."
    ]
  },
  {
    id: 'company',
    keywords: ['itech', 'company', 'employer', 'current job', 'works at', 'where does he work', 'rar solutions'],
    responses: [
      "Elvin currently works as a Web Developer at iTECH-RAR Solutions, Inc. (since June 2025), where he maintains school management systems that hundreds of students rely on. No bugs were harmed in the making of this answer.",
      "He's at iTECH-RAR Solutions, Inc.! Building features for enrollment, registrar, finance, cashiering, and portals. Business-critical means the coffee is also business-critical."
    ]
  },
  {
    id: 'modules',
    keywords: ['module', 'modules', 'enrollment', 'registrar', 'finance', 'cashier', 'student portal', 'teacher portal', 'attendance', 'evaluation', 'reports', 'features did'],
    responses: [
      "At iTECH-RAR Solutions, Elvin has developed modules for:\n• Enrollment & Registrar\n• Finance & Cashier\n• Student Portal & Teacher Portal\n• Attendance Monitoring\n• Peer Evaluation\n• Reports\n\nThat's nine modules — one for each hour of sleep he no longer gets. (Just kidding, he tests his code.)"
    ]
  },
  {
    id: 'contact',
    keywords: ['contact', 'reach', 'touch', 'message him', 'get in touch', 'talk'],
    responses: [
      `You can reach Elvin through any of these:\n\n${socialList}\n\nEmail: ${CONTACT_EMAILS.join(', ')}\n\nOr use the contact form below — it goes straight to his inbox. He replies faster than I render.`,
      `Fastest routes to Elvin: the contact form on this page, or email ${CONTACT_EMAILS.join(', ')}. He's also on ${SOCIAL_LINKS.map((l) => l.platform).join(', ')} — links are in the footer, patiently waiting for your click.`
    ]
  },
  {
    id: 'email',
    keywords: ['email', 'gmail', 'mail', 'e mail', 'inbox'],
    responses: [
      `Elvin's email is ${CONTACT_EMAILS.join(', ')}. Warning: emailing him may result in a very prompt reply. You could also use the contact form on this page — same destination, zero typing of addresses.`,
      `You can email him at ${CONTACT_EMAILS.join(', ')}. It lands in the same inbox as the contact form here — think of it as express shipping vs. standard delivery.`
    ]
  },
  {
    id: 'socials',
    keywords: ['social', 'socials', 'social media', 'links', 'profiles', 'follow', 'connect', 'accounts'],
    responses: [
      `Here's where Elvin lives on the internet:\n\n${socialList}\n\nFollow him — it's free, and he posts better content than my error logs.`,
      `Want to stalk... er, *professionally network* with Elvin? Here you go:\n\n${socialList}`
    ]
  },
  {
    id: 'github',
    keywords: ['github', 'git hub', 'repo', 'repos', 'repository', 'repositories', 'open source', 'code'],
    responses: [
      "Elvin's code lives on GitHub, where commits tell no lies:\nhttps://github.com/Vin0210",
      "Want to see the code behind the magic? GitHub awaits:\nhttps://github.com/Vin0210\n\nWarning: may contain traces of semicolons."
    ]
  },
  {
    id: 'linkedin',
    keywords: ['linkedin'],
    responses: [
      "Connect with Elvin professionally on LinkedIn — where everyone's headshot is suspiciously good:\nhttps://www.linkedin.com/in/elvin-ramos-a347b2339",
      "His LinkedIn is right this way:\nhttps://www.linkedin.com/in/elvin-ramos-a347b2339\n\nEndorsements welcome. Puns optional but appreciated."
    ]
  },
  {
    id: 'instagram',
    keywords: ['instagram', 'insta', 'ig'],
    responses: [
      "Follow Elvin on Instagram @vin.viinn:\nhttps://www.instagram.com/vin.viinn/",
      "Instagram? He's got one:\nhttps://www.instagram.com/vin.viinn/\n\nExpect fewer code screenshots than you'd think. Or more. Only one way to find out."
    ]
  },
  {
    id: 'facebook',
    keywords: ['facebook', 'fb', 'face book'],
    responses: [
      "Find Elvin on Facebook here:\nhttps://www.facebook.com/elvinramos.meme\n\nThe username says 'meme'. We don't talk about it, but the username says 'meme'."
    ]
  },
  {
    id: 'hiring',
    keywords: ['job', 'jobs', 'recruit', 'opportunity', 'open to work', 'looking for', 'rate', 'price', 'cost', 'quote', 'budget'],
    responses: [
      `Great news: Elvin is open to opportunities — full-time roles and freelance projects! Email ${CONTACT_EMAILS.join(', ')} or use the Contact form below. He responds faster than npm install.`,
      `Yes, he's available for hire! Websites, web apps, teams that need a reliable dev — email ${CONTACT_EMAILS.join(', ')} or connect on LinkedIn:\nhttps://www.linkedin.com/in/elvin-ramos-a347b2339\n\nFair warning: his code comes with fewer bugs than this joke.`
    ]
  },
  {
    id: 'location',
    keywords: ['where', 'location', 'located', 'based', 'live', 'country', 'city', 'remote', 'zamboanga', 'gensan', 'general santos'],
    responses: [
      "Elvin hails from Zamboanga City, Philippines, and currently works in General Santos City (GenSan) — home of the friendliest people and, apparently, the freshest tuna. Remote collaboration? Absolutely!",
      "Born and raised in Zamboanga City, now writing PHP in General Santos City. His code travels farther than he does — clients from anywhere are welcome!"
    ]
  },
  {
    id: 'services',
    keywords: ['service', 'services', 'offer', 'do you do', 'can he do', 'what can you do', 'help', 'website for me', 'make me a'],
    responses: [
      "Elvin can help you with:\n• Full-stack web development (Laravel, React, Node.js)\n• School/business management systems\n• Responsive websites & landing pages\n• Database design (MySQL)\n• Bug fixes & performance improvements\n\nHe fixes bugs like a pro — by first blaming the cache, then actually fixing it. Reach out via the Contact section!",
      "From idea to deployment, Elvin covers planning, design, development, and launch. Simple solutions preferred — he won't sell you a microservices architecture when a website will do. Message him via the Contact form!"
    ]
  },
  {
    id: 'joke',
    keywords: ['joke', 'jokes', 'funny', 'make me laugh', 'pun', 'humor', 'humour', 'comedy'],
    responses: [
      "Why do programmers prefer dark mode? Because light attracts bugs.",
      "A SQL query walks into a bar, goes up to two tables and asks: 'Mind if I JOIN you?'",
      "Why did the developer go broke? He used up all his cache.",
      "There are only 10 kinds of people: those who understand binary and those who don't.",
      "!false — it's funny because it's true.",
      "Why do Java developers wear glasses? Because they don't C#.",
      "Elvin's debugging superpower: he reads the error message. Revolutionary, I know.",
      "I told Elvin a joke about recursion... but to understand it, you first need to hear a joke about recursion."
    ]
  },
  {
    id: 'thanks',
    keywords: ['thanks', 'thank', 'thx', 'appreciate', 'great', 'awesome', 'cool', 'nice', 'amazing', 'love it'],
    responses: [
      "You're welcome! My invoice is... oh right, I work for electricity. Anything else?",
      "Happy to help! I'd take a screenshot of this moment, but I have no camera. Ask me anything else!",
      "Glad you liked it! Come back anytime — I'll be here. Literally. I live in this website."
    ]
  },
  {
    id: 'bye',
    keywords: ['bye', 'goodbye', 'see you', 'later', 'cya', 'farewell'],
    responses: [
      "Goodbye! Thanks for visiting Elvin's portfolio. I'll just be here... existing... until someone else opens the chat.",
      "See you around! May your code compile on the first try. Don't forget the Contact section if you want to work together!"
    ]
  },
  {
    id: 'bot_identity',
    keywords: ['bot', 'robot', 'are you real', 'human', 'ai', 'who are you'],
    responses: [
      "I'm ElvinBot — a chatbot living rent-free inside this portfolio. I don't sleep, I don't eat, and somehow I'm still the most responsive member of the team.",
      "100% robot, 0% coffee breaks. Elvin built me to answer questions about him while he does actual work. Fair trade, honestly."
    ]
  }
];

const FALLBACK_RESPONSES = [
  "404: answer not found. My knowledge base is impressive but not psychic. Try asking about Elvin's skills, projects, experience, or contact info!",
  "Hmm, that question crashed my brain stack trace. I'm great at topics like Elvin's skills, projects, services, and links — got one of those?",
  "I didn't quite catch that, and unlike real developers, I can't pretend I understood. Try things like \"What are Elvin's skills?\" or \"How can I contact him?\"",
  "Beep boop... translation failed. But I DO know a lot about Elvin! Ask about his work, education, or how to hire him."
];

let fallbackIndex = 0;

export const getFallbackResponse = () => {
  const response = FALLBACK_RESPONSES[fallbackIndex % FALLBACK_RESPONSES.length];
  fallbackIndex += 1;
  return response;
};

const LAUGH_REGEX = /\b(?:(?:ha+|he+|hi+){2,}|(?:je){2,}|(?:hue){2,}|lo+l+|lmao+|rofl)\b/;

const LAUGH_RESPONSES = [
  "Glad you're entertained! I also do birthdays and corporate events.",
  "Haha! My humor module was trained exclusively on Elvin's group chats.",
  "Laughter detected. Deploying victory dance... beep boop.",
  "You laugh, you learn! Anything else you want to know about Elvin?",
  "My work here is done. *adjusts imaginary glasses*",
  "Careful now — laughing this hard at a chatbot says a lot about your social life. Kidding!"
];

const normalize = (text) => text.toLowerCase().replace(/[^a-z0-9\s']/g, ' ').replace(/\s+/g, ' ').trim();

export const findResponse = (userInput) => {
  const input = normalize(userInput);

  if (!input) return getFallbackResponse();

  if (LAUGH_REGEX.test(input)) {
    return LAUGH_RESPONSES[Math.floor(Math.random() * LAUGH_RESPONSES.length)];
  }

  let bestMatch = null;
  let bestScore = 0;

  for (const intent of intents) {
    let score = 0;
    for (const keyword of intent.keywords) {
      if (keyword.includes(' ')) {
        if (input.includes(keyword)) score += 3;
      } else {
        const words = input.split(' ');
        if (words.includes(keyword)) score += 2;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = intent;
    }
  }

  if (!bestMatch) return getFallbackResponse();

  const options = bestMatch.responses;
  return options[Math.floor(Math.random() * options.length)];
};
