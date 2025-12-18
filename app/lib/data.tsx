// --- TYPES ---
export type Verse = {
  verse: number;
  speaker: string;
  text: string;
};

export type VisualScene = {
  startVerse: number; // The visual appears before this verse
  title: string;
  description: string;
  imageSrc: string;
  alt: string;
};

export type ChapterData = {
  book: string;
  chapter: number;
  visuals: VisualScene[];
  verses: Verse[];
};

// --- DATA STORE ---
export const isaiahChapters: Record<string, ChapterData> = {
  "1": {
    book: "Isaiah",
    chapter: 1,
    // These match your 4 Outline points
    visuals: [
      {
        startVerse: 1,
        title: "A Father and His Rebellious Sons",
        description: "Verses 1-9",
        imageSrc: "/pictures/Isaiah1-1.jpeg",
        alt: "Visual of a broken crown and a sick body",
      },
      {
        startVerse: 10,
        title: "Jehovah Hates Formalistic Worship",
        description: "Verses 10-17",
        imageSrc: "/visuals/temple-smoke.jpg",
        alt: "Temple altar with rejected smoke",
      },
      {
        startVerse: 18,
        title: "“Let Us Set Matters Straight”",
        description: "Verses 18-20",
        imageSrc: "/visuals/scarlet-snow.jpg",
        alt: "Red scarlet cloth transforming into white snow",
      },
      {
        startVerse: 21,
        title: "Zion to be Restored",
        description: "Verses 21-31",
        imageSrc: "/visuals/refining-fire.jpg",
        alt: "Gold smelting fire with a glowing city",
      },
    ],
    verses: [
      {
        verse: 1,
        speaker: "Narrator",
        text: "The vision that Isaiah the son of Aʹmoz saw concerning Judah and Jerusalem in the days of Uz·ziʹah, Joʹtham, Aʹhaz, and Hez·e·kiʹah, kings of Judah:",
      },
      {
        verse: 2,
        speaker: "Isaiah",
        text: "Hear, O heavens, and pay attention, O earth, For Jehovah has spoken:",
      },
      {
        verse: 3,
        speaker: "Jehovah",
        text: "“Sons I have brought up and raised, But they have revolted against me. A bull well knows its buyer, And a donkey the manger of its owner; But Israel does not know me, My own people do not behave with understanding.”",
      },
      {
        verse: 4,
        speaker: "Isaiah",
        text: "Woe to the sinful nation, The people weighed down with error, A brood of wicked men, corrupt children! They have abandoned Jehovah; They have treated the Holy One of Israel with disrespect; They have turned their backs on him.",
      },
      {
        verse: 5,
        speaker: "Isaiah",
        text: "Where will you be struck next as you add to your rebellion? The whole head is sick, And the whole heart is diseased.",
      },
      {
        verse: 6,
        speaker: "Isaiah",
        text: "From the sole of the foot to the head, nothing is healthy. There are wounds and bruises and open sores —They have not been treated or bound up or softened with oil.",
      },
      {
        verse: 7,
        speaker: "Isaiah",
        text: "Your land is desolate. Your cities are burned with fire. Foreigners devour your land right in front of you. It is like a wasteland overthrown by foreigners.",
      },
      {
        verse: 8,
        speaker: "Isaiah",
        text: "The daughter of Zion has been left like a shelter in a vineyard, Like a hut in a cucumber field, Like a city under siege.",
      },
      {
        verse: 9,
        speaker: "Isaiah",
        text: "Unless Jehovah of armies had left us a few survivors, We should have become just like Sodʹom, And we should have resembled Go·morʹrah.",
      },
      {
        verse: 10,
        speaker: "Isaiah",
        text: "Hear the word of Jehovah, you dictators of Sodʹom. Pay attention to the law of our God, you people of Go·morʹrah.",
      },
      {
        verse: 11,
        speaker: "Jehovah",
        text: "“Of what benefit to me are your many sacrifices?” says Jehovah. “I have had enough of your burnt offerings of rams and the fat of well-fed animals, And I have no delight in the blood of young bulls and lambs and goats.",
      },
      {
        verse: 12,
        speaker: "Jehovah",
        text: "When you come to appear before me, Who has required this from you, This trampling of my courtyards?",
      },
      {
        verse: 13,
        speaker: "Jehovah",
        text: "Stop bringing in any more worthless grain offerings. Your incense is detestable to me. New moons, sabbaths, the calling of conventions —I cannot put up with the use of magical power along with your solemn assembly.",
      },
      {
        verse: 14,
        speaker: "Jehovah",
        text: "I have hated your new moons and your festivals. They have become a burden to me; I am tired of bearing them.",
      },
      {
        verse: 15,
        speaker: "Jehovah",
        text: "And when you spread out your palms, I hide my eyes from you. Although you offer many prayers, I am not listening; Your hands are filled with blood.",
      },
      {
        verse: 16,
        speaker: "Jehovah",
        text: "Wash yourselves, make yourselves clean; Remove your evil deeds from my sight; Stop doing bad.",
      },
      {
        verse: 17,
        speaker: "Jehovah",
        text: "Learn to do good, seek justice, Correct the oppressor, Defend the rights of the fatherless child, And plead the cause of the widow.”",
      },
      {
        verse: 18,
        speaker: "Jehovah",
        text: "“Come, now, and let us set matters straight between us,” says Jehovah. “Though your sins are like scarlet, They will be made as white as snow; Though they are as red as crimson cloth, They will become like wool.",
      },
      {
        verse: 19,
        speaker: "Jehovah",
        text: "If you show willingness and listen, You will eat the good things of the land.",
      },
      {
        verse: 20,
        speaker: "Jehovah",
        text: "But if you refuse and rebel, You will be devoured by the sword, For the mouth of Jehovah has spoken it.”",
      },
      {
        verse: 21,
        speaker: "Isaiah",
        text: "How the faithful city has become a prostitute! She was full of justice; Righteousness used to lodge in her, But now murderers.",
      },
      {
        verse: 22,
        speaker: "Isaiah",
        text: "Your silver has become dross, And your beer is diluted with water.",
      },
      {
        verse: 23,
        speaker: "Isaiah",
        text: "Your princes are stubborn and partners with thieves. Every one of them loves a bribe and chases after gifts. They do not grant justice to the fatherless, And the legal case of the widow never reaches them.",
      },
      {
        verse: 24,
        speaker: "Isaiah",
        text: "Therefore the true Lord, Jehovah of armies, The Powerful One of Israel, declares:",
      },
      {
        verse: 25,
        speaker: "Jehovah",
        text: "“Ah! I will rid myself of my adversaries, And I will take revenge on my enemies. I will turn my hand against you, I will smelt away your dross as with lye, And I will remove all your impurities.",
      },
      {
        verse: 26,
        speaker: "Jehovah",
        text: "I will restore your judges as in the beginning And your advisers as at the start. After this you will be called City of Righteousness, Faithful Town.",
      },
      {
        verse: 27,
        speaker: "Jehovah",
        text: "With justice Zion will be redeemed, And her people who return, with righteousness.",
      },
      {
        verse: 28,
        speaker: "Jehovah",
        text: "The rebels and the sinners will be broken together, And those leaving Jehovah will come to their finish.",
      },
      {
        verse: 29,
        speaker: "Jehovah",
        text: "For they will be ashamed of the mighty trees that you desired, And you will be disgraced because of the gardens that you chose.",
      },
      {
        verse: 30,
        speaker: "Jehovah",
        text: "For you will become like a big tree with withering leaves, And like a garden without water.",
      },
      {
        verse: 31,
        speaker: "Jehovah",
        text: "The strong man will become tow, And his work a spark; Both of them will go up in flames together, With no one to extinguish them.”",
      },
    ],
  },
};
