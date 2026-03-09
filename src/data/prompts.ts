export type RelationshipType =
  | "friend"
  | "partner"
  | "parent"
  | "sibling"
  | "coworker"
  | "mentor"
  | "other";

export const RELATIONSHIP_LABELS: Record<RelationshipType, string> = {
  friend: "A Friend",
  partner: "My Partner",
  parent: "A Parent",
  sibling: "A Sibling",
  coworker: "A Coworker",
  mentor: "A Mentor",
  other: "Someone Special",
};

export const RELATIONSHIP_EMOJI: Record<RelationshipType, string> = {
  friend: "\u{1F33C}",
  partner: "\u{1F490}",
  parent: "\u{1F333}",
  sibling: "\u{2B50}",
  coworker: "\u{1F331}",
  mentor: "\u{1F3AF}",
  other: "\u{1F49C}",
};

export const PROMPTS: Record<RelationshipType, string[]> = {
  friend: [
    "What\u2019s a small thing this person does that always makes you smile?",
    "When was the last time they showed up for you in a way that mattered?",
    "What would you miss most if they moved far away?",
    "What\u2019s a memory with them that you never want to forget?",
    "How have they changed the way you see the world?",
    "What\u2019s something they do effortlessly that you admire?",
  ],
  partner: [
    "What\u2019s something they do that makes you feel safe?",
    "What moment together do you replay in your head?",
    "What\u2019s something you\u2019ve never told them you appreciate?",
    "When did you first realize this person was special?",
    "What\u2019s a quiet, ordinary moment with them that you treasure?",
    "How do they make even the hard days a little better?",
  ],
  parent: [
    "What\u2019s a lesson they taught you that you didn\u2019t understand until you were older?",
    "What sacrifice of theirs do you only now appreciate?",
    "What\u2019s a quality of theirs you see in yourself?",
    "What\u2019s a moment from childhood that still makes you feel loved?",
    "How have they shaped the person you\u2019re becoming?",
    "What\u2019s something you wish you could tell them more often?",
  ],
  sibling: [
    "What\u2019s an inside joke only you two understand?",
    "What\u2019s something they\u2019re great at that they don\u2019t give themselves credit for?",
    "When did they have your back when nobody else did?",
    "What\u2019s your favourite childhood memory together?",
    "How have they surprised you as you\u2019ve both grown up?",
    "What do you know about them that nobody else does?",
  ],
  coworker: [
    "What\u2019s something they bring to the team that nobody else could?",
    "When did they help you without being asked?",
    "What do you admire about how they work?",
    "How have they made your work life better just by being there?",
    "What\u2019s a moment where they went above and beyond?",
    "What would the team lose without them?",
  ],
  mentor: [
    "What\u2019s a piece of advice they gave you that changed your trajectory?",
    "How would your life be different without their guidance?",
    "What do they believe in you for that you\u2019re still growing into?",
    "When did they push you in a way that made all the difference?",
    "What\u2019s something they taught you that wasn\u2019t in any textbook?",
    "How do they make you feel seen in a way others don\u2019t?",
  ],
  other: [
    "What\u2019s something this person has done that you\u2019ll never forget?",
    "How has knowing them changed you for the better?",
    "What would you want them to know if you could only say one thing?",
    "What\u2019s a quality of theirs that the world needs more of?",
    "When did they make you feel truly valued?",
    "What\u2019s something about them that deserves to be celebrated?",
  ],
};

export function getRandomPrompts(type: RelationshipType, count = 3): string[] {
  const pool = PROMPTS[type];
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
