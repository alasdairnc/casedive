// src/lib/statutes.js
// Registry for the explorer's statute switcher. Light: data files load lazily
// through `load()` so opening the explorer never pulls in all three Acts.
import { TOPICS, TOPIC_GROUPS, topicForSection, groupLabelFor } from "./criminalCodeTopics.js";
import { STATUTE_TOPIC_CONFIGS, statuteTopicFor, statuteGroupLabel } from "./statuteTopics.js";

export const DEFAULT_STATUTE_ID = "criminal-code";

export const STATUTES = {
  "criminal-code": {
    id: "criminal-code",
    tab: "Criminal Code",
    title: "Criminal Code of Canada",
    placeholder: "Search section number, title or keyword (e.g. theft, assault)",
    hasSeverity: true,
    topics: TOPICS,
    topicGroups: TOPIC_GROUPS,
    topicFor: topicForSection,
    groupLabel: groupLabelFor,
    load: () =>
      import("./criminalCodeData.js").then(async (m) => ({
        sections: m.CRIMINAL_CODE_SECTIONS,
        parts: (await import("./criminalCodeParts.js")).CRIMINAL_CODE_PARTS,
      })),
  },
  cdsa: {
    id: "cdsa",
    tab: "CDSA",
    title: "Controlled Drugs and Substances Act",
    placeholder: "Search section number, title or keyword (e.g. trafficking, possession)",
    hasSeverity: true,
    topics: STATUTE_TOPIC_CONFIGS.cdsa.topics,
    topicGroups: STATUTE_TOPIC_CONFIGS.cdsa.groups,
    topicFor: (_num, entry) => statuteTopicFor("cdsa", entry),
    groupLabel: (_num, entry) => statuteGroupLabel(entry),
    load: () => import("./cdsaData.js").then((m) => ({ sections: m.CDSA_SECTIONS, parts: m.CDSA_PARTS })),
  },
  ycja: {
    id: "ycja",
    tab: "YCJA",
    title: "Youth Criminal Justice Act",
    placeholder: "Search section number, title or keyword (e.g. extrajudicial, sentence)",
    hasSeverity: false,
    topics: STATUTE_TOPIC_CONFIGS.ycja.topics,
    topicGroups: STATUTE_TOPIC_CONFIGS.ycja.groups,
    topicFor: (_num, entry) => statuteTopicFor("ycja", entry),
    groupLabel: (_num, entry) => statuteGroupLabel(entry),
    load: () => import("./ycjaData.js").then((m) => ({ sections: m.YCJA_SECTIONS, parts: m.YCJA_PARTS })),
  },
};

export const STATUTE_LIST = Object.values(STATUTES);
