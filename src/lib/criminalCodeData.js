// src/lib/criminalCodeData.js
// Complete Criminal Code (RSC 1985, c C-46) section lookup.
// Auto-generated from Justice Laws XML (laws-lois.justice.gc.ca/eng/XML/C-46.xml)
// Source current as of: 2026-07-21 (Justice Laws lims:current-date) | Sections: 1568
// Includes all numbered sections from the Criminal Code.
// 46 high-priority sections are enriched with hand-curated definitions,
// defences, and related sections. Other sections may carry a `summary` field:
// an independently-verified, plain-language summary generated from statute
// text only (see scripts/prepareEnrichmentBatch.mjs) — distinct from `definition`,
// which is only ever hand-curated.
//
// This file is used by api/verify.js to confirm AI-suggested Criminal Code
// sections are real and by CriminalCodeExplorer for browsing/searching.

const JUSTICE_LAWS_BASE = "https://laws-lois.justice.gc.ca/eng/acts/c-46";

export const CRIMINAL_CODE_SECTIONS = new Map([
  [
    "1",
    {
      title: "Short title",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-1.html`,
      summary:
        "States that the Act may be cited as the Criminal Code.",
    },
  ],

  // ── Part I — General ──
  [
    "2",
    {
      title: "Definitions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-2.html`,
      summary:
        "Defines the meaning of numerous terms and expressions used throughout the Act, such as Attorney General, peace officer, dwelling-house, firearm, organization, victim, and property.",
      partOf: "Part I — General",
    },
  ],
  [
    "2.1",
    {
      title: "Further definitions — firearms",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-2.1.html`,
      summary:
        "States that a list of firearms-related terms, including ammunition, prohibited firearm, and replica firearm, have the same meaning given to them in subsection 84(1).",
      relatedSections: ["84"],
      partOf: "Part I — General",
    },
  ],
  [
    "2.2",
    {
      title: "Acting on victim’s behalf",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-2.2.html`,
      summary:
        "Lists which individuals (such as a spouse, common-law partner, relative, or caregiver) may act on a victim's behalf for specified sections if the victim is dead or unable to act for themselves, and excludes the accused or a person found guilty of the offence from doing so.",
      relatedSections: ["606", "672.5", "715.37", "722", "737.1", "745.63"],
      partOf: "Part I — General",
    },
  ],
  [
    "2.3",
    {
      title: "Concurrent jurisdiction",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-2.3.html`,
      summary:
        "Lists the categories of proceedings for which the Attorney General of Canada or the Director of Public Prosecutions shares jurisdiction with the provincial Attorney General, and confirms the scope of powers the federal Attorney General or Director may exercise over related proceedings such as conspiracy, breach of court orders, and ancillary matters.",
      partOf: "Part I — General",
    },
  ],
  [
    "3",
    {
      title: "Descriptive cross-references",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-3.html`,
      summary:
        "States that descriptive words in parentheses following a cross-reference to another provision are inserted only for convenience and are not part of the provision itself.",
      partOf: "Part I — General",
    },
  ],
  [
    "3.01",
    {
      title: "Violence in commission of offence, including against intimate partner",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-3.01.html`,
      summary:
        "Provides that, for a specified list of provisions, a reference to an offence involving violence against a person also includes sexual offences, criminal harassment, and trafficking in persons offences, and lists the sections to which this applies.",
      relatedSections: ["264", "279.01", "279.011", "109", "110", "515"],
      partOf: "Part I — General",
    },
  ],
  [
    "3.1",
    {
      title: "Effect of judicial acts",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-3.1.html`,
      summary:
        "States that anything done by a court, justice or judge takes effect from the moment it is done even if not yet written down, and that the clerk of the court may sign the writing if it is later reduced to writing.",
      partOf: "Part I — General",
    },
  ],
  [
    "4",
    {
      title: "Postcard a chattel, value",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-4.html`,
      summary:
        "Sets out rules for determining value in various circumstances (postal cards/stamps, valuable securities), defines what it means for a person to have something in possession, provides that terms drawn from other Acts keep their meaning from those Acts, defines when sexual intercourse is complete, and sets out how service of documents and notices may be proved, including by telecommunication.",
      relatedSections: ["2"],
      partOf: "Part I — General",
    },
  ],
  [
    "5",
    {
      title: "Canadian Forces not affected",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-5.html`,
      summary:
        "States that nothing in the Act affects any law relating to the government of the Canadian Forces.",
      partOf: "Part I — General",
    },
  ],
  [
    "6",
    {
      title: "Presumption of innocence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-6.html`,
      summary:
        "States that a person is deemed not guilty of an offence until convicted or discharged, limits punishment to what is prescribed by law, provides that no person may be convicted of an offence committed outside Canada except as otherwise provided, and defines \"enactment\" for the purposes of this section.",
      relatedSections: ["730"],
      partOf: "Part I — General",
    },
  ],
  [
    "7",
    {
      title: "Offences committed on aircraft",
      severity: "Indictable",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-7.html`,
      summary:
        "Extends Canadian criminal jurisdiction extraterritorially by deeming certain acts or omissions to have been committed in Canada, including acts on or affecting aircraft in flight (or flights terminating in Canada) that would be indictable offences here, and specified offences against aircraft, air navigation facilities, airports, cultural property, fixed platforms, ships, space stations, the Lunar Gateway, internationally protected persons, UN personnel, hostage-taking, explosives, terrorism, and sexual offences or trafficking against persons under 18, when connected to Canada by citizenship, residence, or presence. Also sets out related procedural rules, including where proceedings may be commenced, consent requirements for prosecuting certain cases, and definitions of \"in flight\" and \"in service\" for aircraft.",
      relatedSections: ["76", "77", "78.1", "269.1", "83.02", "279.1"],
      partOf: "Part I — General",
    },
  ],
  [
    "8",
    {
      title: "Application to territories",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-8.html`,
      summary:
        "States that the Code applies throughout Canada except where inconsistent with the Yukon Act, Northwest Territories Act, or Nunavut Act, continues pre-1955 English criminal law in a province except as altered by federal law, and preserves common law justifications, excuses, and defences except where altered by or inconsistent with federal law.",
      partOf: "Part I — General",
    },
  ],
  [
    "9",
    {
      title: "Criminal offences to be under law of Canada",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-9.html`,
      summary:
        "Provides that no person may be convicted or discharged under section 730 of an offence at common law, under an Act of the Parliament of England, Great Britain, or the United Kingdom, or under an Act or ordinance in force in a province, territory, or place before it became a province of Canada, without affecting the power courts had before April 1, 1955 to punish contempt of court.",
      relatedSections: ["730"],
      partOf: "Part I — General",
    },
  ],
  [
    "10",
    {
      title: "Appeal",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-10.html`,
      summary:
        "Allows a person summarily convicted of contempt of court, whether committed in the face of the court or not, to appeal the conviction or the punishment imposed, with the appeal going to the provincial court of appeal under Part XXI procedures.",
      partOf: "Part I — General",
    },
  ],
  [
    "11",
    {
      title: "Civil remedy not suspended",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-11.html`,
      summary:
        "States that a civil remedy for an act or omission is not suspended or affected merely because that act or omission is also a criminal offence.",
      partOf: "Part I — General",
    },
  ],
  [
    "11.1",
    {
      title: "Non-disclosure agreement — no effect",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-11.1.html`,
      summary:
        "Clarifies that no agreement can prevent or restrict a person from disclosing to a police officer information relating to the commission of an offence.",
      partOf: "Part I — General",
    },
  ],
  [
    "12",
    {
      title: "Offence punishable under more than one Act",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-12.html`,
      summary:
        "Provides that where an act or omission is an offence under more than one federal Act, a person may be proceeded against under any of those Acts unless a contrary intention appears, but cannot be punished more than once for the same offence.",
      partOf: "Part I — General",
    },
  ],
  [
    "13",
    {
      title: "Child under twelve",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-13.html`,
      summary:
        "Provides that no person can be convicted of an offence for an act or omission committed while under the age of twelve.",
      partOf: "Part I — General",
    },
  ],
  [
    "14",
    {
      title: "Consent to death",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-14.html`,
      summary:
        "States that no person can consent to having death inflicted on them, and such consent does not affect the criminal responsibility of the person who inflicts the death.",
      partOf: "Part I — General",
    },
  ],
  [
    "15",
    {
      title: "Obedience to de facto law",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-15.html`,
      summary:
        "Provides that no person can be convicted of an offence for an act or omission done in obedience to laws made and enforced by those in de facto possession of sovereign power over the place where the act occurred.",
      partOf: "Part I — General",
    },
  ],
  [
    "16",
    {
      title: "Defence of mental disorder",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-16.html`,
      summary:
        "Provides that a person is not criminally responsible for an act or omission committed while suffering from a mental disorder that made them incapable of appreciating its nature and quality or of knowing it was wrong, sets a presumption against mental disorder, and places the burden of proving the defence on the party raising it.",
      partOf: "Part I — General",
    },
  ],
  [
    "17",
    {
      title: "Compulsion by threats",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-17.html`,
      summary:
        "Excuses a person from an offence committed under compulsion by threats of immediate death or bodily harm from someone present at the time, provided the person believed the threats would be carried out and was not party to a conspiracy subjecting them to compulsion, but this excuse does not apply to a specified list of serious offences including murder, treason, and sexual assault.",
      relatedSections: ["280", "281", "282", "283"],
      partOf: "Part I — General",
    },
  ],
  [
    "18",
    {
      title: "Compulsion of spouse",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-18.html`,
      summary:
        "States that no presumption of compulsion arises against a married person who commits an offence merely because it was committed in the presence of their spouse.",
      partOf: "Part I — General",
    },
  ],
  [
    "19",
    {
      title: "Ignorance of the law",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-19.html`,
      summary:
        "States that ignorance of the law is not an excuse for committing an offence.",
      partOf: "Part I — General",
    },
  ],
  [
    "20",
    {
      title: "Certain acts on holidays valid",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-20.html`,
      summary:
        "Provides that a warrant, summons, appearance notice, undertaking, release order, or recognizance authorized by the Code may be executed, issued, given, or entered into on a holiday.",
      partOf: "Part I — General",
    },
  ],
  [
    "21",
    {
      title: "Parties to offence",
      severity: "",
      maxPenalty: "Same as principal offence",
      url: `${JUSTICE_LAWS_BASE}/section-21.html`,
      summary:
        "Defines who is a party to an offence: the person who actually commits it, aids another to commit it, or abets in its commission, and extends party liability to anyone who forms a common intention with others to carry out an unlawful purpose where an offence results that they knew or ought to have known was a probable consequence.",
      partOf: "Part I — General",
    },
  ],
  [
    "22",
    {
      title: "Person counselling offence",
      severity: "",
      maxPenalty: "Same as principal offence",
      url: `${JUSTICE_LAWS_BASE}/section-22.html`,
      summary:
        "Makes a person who counsels another to be a party to an offence a party to that offence even if it is committed differently than counselled, and a party to any other offence the counselled person commits that the counsellor knew or ought to have known was likely; defines counsel to include procure, solicit, or incite.",
      partOf: "Part I — General",
    },
  ],
  [
    "22.1",
    {
      title: "Offences of negligence — organizations",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-22.1.html`,
      summary:
        "Makes an organization a party to a negligence-based offence where a representative acting within their authority is a party to it (or multiple representatives together would meet that standard), and a responsible senior officer markedly departed from the standard of care expected to prevent it.",
      partOf: "Part I — General",
    },
  ],
  [
    "22.2",
    {
      title: "Other offences — organizations",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-22.2.html`,
      summary:
        "Makes an organization a party to a fault-based offence (other than negligence) where a senior officer, intending at least in part to benefit the organization, is a party to it, directs other representatives to commit it, or knowingly fails to take reasonable measures to stop a representative from committing it.",
      partOf: "Part I — General",
    },
  ],
  [
    "23",
    {
      title: "Accessory after the fact",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-23.html`,
      summary:
        "Defines an accessory after the fact as someone who, knowing a person was party to an offence, receives, comforts, or assists that person for the purpose of helping them escape.",
      partOf: "Part I — General",
    },
  ],
  [
    "23.1",
    {
      title: "Where one party cannot be convicted",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-23.1.html`,
      summary:
        "Clarifies that the party-liability and accessory provisions apply to an accused even though the person they aided, abetted, counselled, or assisted cannot themselves be convicted of the offence.",
      relatedSections: ["21", "22", "23"],
      partOf: "Part I — General",
    },
  ],
  [
    "24",
    {
      title: "Attempts",
      severity: "",
      maxPenalty: "See s. 463",
      url: `${JUSTICE_LAWS_BASE}/section-24.html`,
      summary:
        "Makes a person guilty of attempt where, intending to commit an offence, they do or omit something to carry out that intent, regardless of whether committing the offence was actually possible; states that whether conduct is mere preparation or an attempt is a question of law.",
      partOf: "Part I — General",
    },
  ],
  [
    "25",
    {
      title: "Protection of persons acting under authority",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-25.html`,
      summary:
        "Justifies a person required or authorized by law to act in law enforcement in doing what is required and using necessary force if acting on reasonable grounds, and extends protection to those executing a defective or improperly issued process or sentence in good faith. Generally limits force likely to cause death or grievous bodily harm to situations of reasonably believed necessity for self-preservation or protecting another, but permits a peace officer to use such force to arrest a fleeing suspect or to stop an escaping inmate reasonably believed to pose a threat of death or grievous bodily harm, subject to specified conditions.",
      partOf: "Part I — General",
    },
  ],
  [
    "25.1",
    {
      title: "Definitions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-25.1.html`,
      summary:
        "Defines terms such as competent authority, public officer, and senior official, and creates a scheme under which a competent authority may designate public officers who are then justified in committing acts or omissions that would otherwise be offences while investigating crime, provided they believe on reasonable grounds the conduct is reasonable and proportional, with written authorization generally required for acts likely to cause loss or serious property damage. This justification never extends to intentionally or negligently causing death or bodily harm, obstructing justice, or violating sexual integrity, and does not apply to certain drug and cannabis offences.",
      relatedSections: ["25.2", "25.3", "25.4"],
      partOf: "Part I — General",
    },
  ],
  [
    "25.2",
    {
      title: "Public officer to file report",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-25.2.html`,
      summary:
        "Requires a public officer who commits or directs an authorized act or omission under paragraph 25.1(9)(a) or (b) to file a written report describing it with the appropriate senior official as soon as feasible.",
      relatedSections: ["25.1"],
      partOf: "Part I — General",
    },
  ],
  [
    "25.3",
    {
      title: "Annual report",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-25.3.html`,
      summary:
        "Requires each competent authority to publish an annual report on designations, authorizations, and acts or omissions committed by public officers under this scheme, the nature of the conduct involved, and limits what information the report may disclose where doing so would compromise investigations, identities, safety, proceedings, or the public interest.",
      relatedSections: ["25.1"],
      partOf: "Part I — General",
    },
  ],
  [
    "25.4",
    {
      title: "Written notification to be given",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-25.4.html`,
      summary:
        "Requires the senior official to notify in writing any person whose property was lost or seriously damaged by an authorized act or omission, within a set time after the report filed under section 25.2, and allows the competent authority to delay that notification where it would cause specified harms.",
      relatedSections: ["25.1", "25.2"],
      partOf: "Part I — General",
    },
  ],
  [
    "26",
    {
      title: "Excessive force",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-26.html`,
      summary:
        "Makes a person authorized by law to use force criminally responsible for any excess force used, judged according to the nature and quality of the act constituting the excess.",
      partOf: "Part I — General",
    },
  ],
  [
    "27",
    {
      title: "Use of force to prevent commission of offence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-27.html`,
      summary:
        "Justifies using as much force as reasonably necessary to prevent the commission of an offence for which the offender could be arrested without warrant and that would likely cause immediate and serious injury to person or property, or to prevent something reasonably believed would constitute such an offence.",
      partOf: "Part I — General",
    },
  ],
  [
    "27.1",
    {
      title: "Use of force on board an aircraft",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-27.1.html`,
      summary:
        "Justifies a person on an aircraft in flight in using as much force as reasonably necessary to prevent an offence they believe on reasonable grounds would cause immediate and serious injury to the aircraft or persons or property in it, and specifies this applies to aircraft in Canadian airspace and Canadian-registered aircraft in flight outside it.",
      partOf: "Part I — General",
    },
  ],
  [
    "28",
    {
      title: "Arrest of wrong person",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-28.html`,
      summary:
        "Protects a person executing an arrest warrant, and those assisting or a prison keeper receiving the arrested person, from criminal responsibility if they believed in good faith and on reasonable grounds that the person arrested was the one named in the warrant.",
      partOf: "Part I — General",
    },
  ],
  [
    "29",
    {
      title: "Duty of person arresting",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-29.html`,
      summary:
        "Requires a person executing a process or warrant to have it with them when feasible and produce it on request, and requires anyone making an arrest to give notice of the warrant or reason for arrest when feasible, while stating that failure to comply does not itself remove protection from criminal responsibility.",
      partOf: "Part I — General",
    },
  ],
  [
    "30",
    {
      title: "Preventing breach of peace",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-30.html`,
      summary:
        "Justifies a person who witnesses a breach of the peace in interfering to prevent its continuance or renewal and in detaining a person committing or about to join or renew it, for handover to a peace officer, using no more force than reasonably necessary or proportioned to the danger.",
      partOf: "Part I — General",
    },
  ],
  [
    "31",
    {
      title: "Arrest for breach of peace",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-31.html`,
      summary:
        "Justifies a peace officer and those lawfully assisting in arresting a person found committing a breach of the peace or reasonably believed about to join or renew one, and justifies a peace officer in taking custody of a person given into their charge as having been party to such a breach.",
      partOf: "Part I — General",
    },
  ],
  [
    "32",
    {
      title: "Use of force to suppress riot",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-32.html`,
      summary:
        "Justifies a peace officer in using or ordering force believed in good faith and on reasonable grounds to be necessary and not excessive to suppress a riot, justifies those bound by military law or ordered by a peace officer in obeying non-manifestly-unlawful commands to suppress a riot, and justifies a person acting in good faith who believes serious mischief will occur before a peace officer can attend; states whether an order is manifestly unlawful is a question of law.",
      partOf: "Part I — General",
    },
  ],
  [
    "33",
    {
      title: "Duty of officers if rioters do not disperse",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-33.html`,
      summary:
        "Imposes a duty on a peace officer and those lawfully required to assist to disperse or arrest persons who fail to comply with the proclamation referred to in section 67 or commit an offence under paragraph 68(a) or (b), protects such officers and assistants from civil or criminal proceedings for death or injury resulting from resistance during that duty, and states the section does not limit other powers or duties regarding riot suppression.",
      relatedSections: ["67", "68"],
      partOf: "Part I — General",
    },
  ],
  [
    "33.1",
    {
      title: "Offences of violence by negligence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-33.1.html`,
      summary:
        "A person who lacks intent or voluntariness due to self-induced extreme intoxication still commits an offence involving assault or interference with another's bodily integrity if they departed markedly from the standard of care expected around consuming intoxicating substances. It sets out factors courts must consider for that marked departure and defines extreme intoxication.",
      partOf: "Part I — General",
    },
  ],
  [
    "34",
    {
      title: "Defence — use or threat of force",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-34.html`,
      definition:
        "A person is not guilty of an offence if (a) they believe on reasonable grounds that force is being used against them or another person or that a threat of force is being made against them or another person; (b) the act that constitutes the offence is committed for the purpose of defending or protecting themselves or the other person from that use or threat of force; and (c) the act committed is reasonable in the circumstances.",
      relatedSections: ["35", "265"],
      defences: [],
      topicsTagged: ["self-defence", "force", "reasonable"],
      partOf: "Part I — General",
    },
  ],
  [
    "35",
    {
      title: "Defence — property",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-35.html`,
      definition:
        "A person is not guilty of an offence if (a) they believe on reasonable grounds that they are in peaceable possession of property or are acting under the authority of, or lawfully assisting, a person whom they believe on reasonable grounds is in peaceable possession of property; (b) they believe on reasonable grounds that another person is about to enter, is entering or has entered the property without being entitled by law to do so, is about to take the property, is doing so or has just done so, or is about to damage or destroy the property, or is doing so; (c) the act that constitutes the offence is committed for the purpose of preventing the other person from entering the property, or removing that person from the property, or preventing the other person from taking, damaging or destroying the property or from making it inoperative, or retaking the property from that person; and (d) the act committed is reasonable in the circumstances.",
      relatedSections: ["34", "494"],
      defences: [],
      topicsTagged: ["property", "defence", "trespass"],
      partOf: "Part I — General",
    },
  ],
  [
    "43",
    {
      title: "Correction of child by force",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-43.html`,
      summary:
        "Allows a schoolteacher, parent, or person standing in place of a parent to use force to correct a pupil or child under their care, provided the force does not exceed what is reasonable in the circumstances.",
      partOf: "Part I — General",
    },
  ],
  [
    "45",
    {
      title: "Surgical operations",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-45.html`,
      summary:
        "Protects a person from criminal responsibility for performing a surgical operation on another for that person's benefit, if the operation is done with reasonable care and skill and is reasonable given the patient's health and the circumstances.",
      partOf: "Part I — General",
    },
  ],

  // ── Part II — Offences Against Public Order ──
  [
    "46",
    {
      title: "High treason",
      severity: "Indictable",
      maxPenalty: "See s. 47.",
      url: `${JUSTICE_LAWS_BASE}/section-46.html`,
      summary:
        "Defines the conduct that constitutes high treason (such as killing or harming the Sovereign, levying war against Canada, or assisting an enemy) and treason (such as using force to overthrow government or communicating military/scientific information to a state other than Canada), including conspiracy and forming an intention manifested by an overt act. Also states these provisions apply to Canadian citizens whether the conduct occurs in or out of Canada.",
      partOf: "Part II — Offences Against Public Order",
    },
  ],
  [
    "47",
    {
      title: "Punishment for high treason",
      severity: "Indictable",
      maxPenalty: "Life imprisonment (mandatory minimum under s. 47(4)) for high treason; treason is liable to life imprisonment for paragraphs 46(2)(a), (c) or (d), or (b)/(e) committed during a state of war; or to 14 years indictable for paragraph 46(2)(b) or (e) committed when no state of war exists.",
      url: `${JUSTICE_LAWS_BASE}/section-47.html`,
      summary:
        "Sets the conviction consequences for high treason and treason described in section 46, requires corroborating evidence beyond a single witness for conviction, and states the mandatory imprisonment is a minimum punishment.",
      relatedSections: ["46"],
      partOf: "Part II — Offences Against Public Order",
    },
  ],
  [
    "48",
    {
      title: "Limitation",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-48.html`,
      summary:
        "Sets time limits for starting proceedings for treason involving overthrowing the government, and requires that proceedings for treasonable speech be based on an information laid under oath within six days and an arrest warrant issued within ten days.",
      relatedSections: ["46", "47"],
      partOf: "Part II — Offences Against Public Order",
    },
  ],
  [
    "50",
    {
      title: "Assisting alien enemy to leave Canada, or omitting to prevent treason",
      severity: "Indictable",
      maxPenalty: "14 years",
      url: `${JUSTICE_LAWS_BASE}/section-50.html`,
      summary:
        "Describes the offence of inciting or assisting a subject of an enemy state to leave Canada without Crown consent, or knowing of impending treason and failing to report or try to prevent it.",
      partOf: "Part II — Offences Against Public Order",
    },
  ],
  [
    "51",
    {
      title: "Intimidating Parliament or legislature",
      severity: "Indictable",
      maxPenalty: "14 years",
      url: `${JUSTICE_LAWS_BASE}/section-51.html`,
      summary:
        "Describes the offence of committing an act of violence to intimidate Parliament or a provincial legislature.",
      partOf: "Part II — Offences Against Public Order",
    },
  ],
  [
    "52",
    {
      title: "Sabotage",
      severity: "Hybrid",
      maxPenalty: "10 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-52.html`,
      summary:
        "Describes the offence of sabotage, meaning doing a prohibited act (impairing equipment or destroying/damaging property) with intent to endanger Canada's safety or the safety of allied forces in Canada, defines the prohibited act, and excludes labour-related work stoppages and mere information-gathering or advocacy, protest or dissent activity from the offence.",
      partOf: "Part II — Offences Against Public Order",
    },
  ],
  [
    "52.1",
    {
      title: "Sabotage — essential infrastructure",
      severity: "Hybrid",
      maxPenalty: "10 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-52.1.html`,
      summary:
        "Describes the offence of interfering with or damaging essential infrastructure with intent to endanger Canada's or allied forces' safety or public health/safety, defines essential infrastructure broadly, and excludes labour-related work stoppages, information-gathering, and advocacy, protest or dissent from the offence.",
      partOf: "Part II — Offences Against Public Order",
    },
  ],
  [
    "52.2",
    {
      title: "Sabotage — device",
      severity: "Hybrid",
      maxPenalty: "10 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-52.2.html`,
      summary:
        "Describes the offence of making, possessing, selling, or distributing a device intended or known to be used to carry out sabotage under sections 52 or 52.1, and defines device to include a computer program.",
      relatedSections: ["52", "52.1", "342.1"],
      partOf: "Part II — Offences Against Public Order",
    },
  ],
  [
    "52.3",
    {
      title: "Attorney General’s consent",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-52.3.html`,
      summary:
        "Requires the Attorney General's consent before any proceeding can be instituted for offences under sections 52, 52.1, or 52.2.",
      relatedSections: ["52", "52.1", "52.2"],
      partOf: "Part II — Offences Against Public Order",
    },
  ],
  [
    "53",
    {
      title: "Inciting to mutiny",
      severity: "Indictable",
      maxPenalty: "14 years",
      url: `${JUSTICE_LAWS_BASE}/section-53.html`,
      summary:
        "Describes the offence of attempting to seduce a member of the Canadian Forces from duty and allegiance, or inciting a member to commit a traitorous or mutinous act, for a traitorous or mutinous purpose.",
      partOf: "Part II — Offences Against Public Order",
    },
  ],
  [
    "54",
    {
      title: "Assisting deserter",
      severity: "Summary",
      maxPenalty: "summary conviction (s. 787 default penalty applies unless otherwise stated)",
      url: `${JUSTICE_LAWS_BASE}/section-54.html`,
      summary:
        "Describes the offence of aiding, assisting, harbouring or concealing a person known to be a deserter or absentee without leave from the Canadian Forces, and requires the Attorney General's consent to institute proceedings.",
      partOf: "Part II — Offences Against Public Order",
    },
  ],
  [
    "55",
    {
      title: "Evidence of overt acts",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-55.html`,
      summary:
        "Provides that evidence of an overt act in treason-related proceedings is inadmissible unless the act is set out in the indictment or the evidence otherwise tends to prove an act that is set out in the indictment.",
      relatedSections: ["47", "50", "51", "52", "53"],
      partOf: "Part II — Offences Against Public Order",
    },
  ],
  [
    "56",
    {
      title: "Offences in relation to members of R.C.M.P.",
      severity: "Summary",
      maxPenalty: "summary conviction (s. 787 default penalty applies unless otherwise stated)",
      url: `${JUSTICE_LAWS_BASE}/section-56.html`,
      summary:
        "Describes the offence of wilfully persuading, aiding, or assisting a member of the Royal Canadian Mounted Police to desert or absent themselves without leave, or harbouring such a deserter or absentee.",
      partOf: "Part II — Offences Against Public Order",
    },
  ],
  [
    "56.1",
    {
      title: "Identity documents",
      severity: "Hybrid",
      maxPenalty: "5 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-56.1.html`,
      summary:
        "Describes the offence of procuring, possessing, transferring, selling, or offering for sale another person's identity document without lawful excuse, while excepting acts done in good faith in the ordinary course of business, for genealogical purposes, with consent, or for a legitimate administration-of-justice purpose, and defines identity document.",
      relatedSections: ["57"],
      partOf: "Part II — Offences Against Public Order",
    },
  ],
  [
    "57",
    {
      title: "Forgery of or uttering forged passport",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-57.html`,
      summary:
        "Describes offences relating to forging a passport, using or dealing with a passport known to be forged, making false statements to procure a passport or its alteration, and possessing a forged passport, and sets out jurisdictional rules for offences committed outside Canada.",
      relatedSections: ["321", "366"],
      partOf: "Part II — Offences Against Public Order",
    },
  ],
  [
    "58",
    {
      title: "Fraudulent use of certificate of citizenship",
      severity: "Hybrid",
      maxPenalty: "2 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-58.html`,
      summary:
        "Describes the offence of using a certificate of citizenship or naturalization for a fraudulent purpose, or knowingly parting with possession of one's own certificate intending it be used fraudulently, and defines the relevant certificates by reference to the Citizenship Act.",
      partOf: "Part II — Offences Against Public Order",
    },
  ],
  [
    "59",
    {
      title: "Seditious words",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-59.html`,
      summary:
        "Defines seditious words, seditious libel, and seditious conspiracy, and sets out a presumption that teaching, advocating, publishing, or circulating writing advocating unlawful force to accomplish governmental change in Canada demonstrates a seditious intention.",
      partOf: "Part II — Offences Against Public Order",
    },
  ],
  [
    "60",
    {
      title: "Exception",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-60.html`,
      summary:
        "Provides that a person is not deemed to have a seditious intention if they act in good faith to point out government errors, seek lawful change, or highlight sources of hostility between classes of persons for the purpose of removing them.",
      relatedSections: ["59"],
      partOf: "Part II — Offences Against Public Order",
    },
  ],
  [
    "61",
    {
      title: "Punishment of seditious offences",
      severity: "Indictable",
      maxPenalty: "14 years",
      url: `${JUSTICE_LAWS_BASE}/section-61.html`,
      summary:
        "Describes the offence of speaking seditious words, publishing a seditious libel, or being party to a seditious conspiracy.",
      partOf: "Part II — Offences Against Public Order",
    },
  ],
  [
    "62",
    {
      title: "Offences in relation to military forces",
      severity: "Hybrid",
      maxPenalty: "5 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-62.html`,
      summary:
        "Describes the offence of intentionally interfering with the loyalty or discipline of a member of the Canadian Forces or allied forces in Canada, or publishing, distributing, or otherwise causing insubordination, disloyalty, mutiny, or refusal of duty, and defines member of a force.",
      partOf: "Part II — Offences Against Public Order",
    },
  ],
  [
    "63",
    {
      title: "Unlawful assembly",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-63.html`,
      summary:
        "Defines unlawful assembly as three or more persons assembling with a common purpose in a manner that causes others to reasonably fear a tumultuous disturbance of the peace, addresses a lawful assembly becoming unlawful, and excepts persons assembled only to protect a dwelling-house from threatened break-in.",
      partOf: "Part II — Offences Against Public Order",
    },
  ],
  [
    "64",
    {
      title: "Riot",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-64.html`,
      summary:
        "Defines a riot as an unlawful assembly that has begun to disturb the peace tumultuously.",
      partOf: "Part II — Offences Against Public Order",
    },
  ],
  [
    "65",
    {
      title: "Punishment of rioter",
      severity: "Hybrid",
      maxPenalty: "10 years",
      url: `${JUSTICE_LAWS_BASE}/section-65.html`,
      summary:
        "Describes the offence of taking part in a riot, and a more serious version of that offence for doing so while wearing a mask or disguise without lawful excuse to conceal one's identity.",
      partOf: "Part II — Offences Against Public Order",
    },
  ],
  [
    "66",
    {
      title: "Punishment for unlawful assembly",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-66.html`,
      summary:
        "Describes the offence of being a member of an unlawful assembly, and a more serious version for doing so while wearing a mask or disguise without lawful excuse to conceal one's identity.",
      partOf: "Part II — Offences Against Public Order",
    },
  ],
  [
    "67",
    {
      title: "Reading proclamation",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-67.html`,
      summary:
        "Requires specified officials (such as a justice, mayor, sheriff, or prison warden) who learn that twelve or more persons are unlawfully and riotously assembled to go to the scene and, if satisfied a riot is occurring, command silence and read a proclamation in specified words ordering dispersal.",
      partOf: "Part II — Offences Against Public Order",
    },
  ],
  [
    "68",
    {
      title: "Offences related to proclamation",
      severity: "Indictable",
      maxPenalty: "Life imprisonment",
      url: `${JUSTICE_LAWS_BASE}/section-68.html`,
      summary:
        "Describes the offence of wilfully and forcefully opposing, hindering, or assaulting a person making the proclamation under section 67, or of failing to disperse within thirty minutes after the proclamation is made or would have been made but for such interference.",
      relatedSections: ["67"],
      partOf: "Part II — Offences Against Public Order",
    },
  ],
  [
    "69",
    {
      title: "Neglect by peace officer",
      severity: "Hybrid",
      maxPenalty: "2 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-69.html`,
      summary:
        "Describes the offence of a peace officer, without reasonable excuse, failing to take reasonable steps to suppress a riot within their jurisdiction after receiving notice of it.",
      partOf: "Part II — Offences Against Public Order",
    },
  ],
  [
    "70",
    {
      title: "Orders by Governor in Council",
      severity: "Hybrid",
      maxPenalty: "5 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-70.html`,
      summary:
        "Authorizes the Governor in Council to make orders prohibiting unauthorized assemblies for military training, drilling, or exercises, allows such orders to be general or specific to places or groups, and describes the offence of contravening such an order.",
      partOf: "Part II — Offences Against Public Order",
    },
  ],
  [
    "72",
    {
      title: "Forcible entry",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-72.html`,
      summary:
        "Defines forcible entry as entering real property in another's actual peaceable possession in a manner likely to cause or threaten a breach of the peace, regardless of entitlement or intent to take possession, and defines forcible detainer as detaining property without colour of right in a manner likely to cause or threaten a breach of the peace against a person entitled to possession; states that possession and colour of right are questions of law.",
      partOf: "Part II — Offences Against Public Order",
    },
  ],
  [
    "73",
    {
      title: "Punishment",
      severity: "Hybrid",
      maxPenalty: "2 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-73.html`,
      summary:
        "Describes the offence of committing forcible entry or forcible detainer, punishable either as an indictable offence or on summary conviction.",
      partOf: "Part II — Offences Against Public Order",
    },
  ],
  [
    "74",
    {
      title: "Piracy by law of nations",
      severity: "Indictable",
      maxPenalty: "Life imprisonment",
      url: `${JUSTICE_LAWS_BASE}/section-74.html`,
      summary:
        "Defines piracy as any act that constitutes piracy under the law of nations, and describes the offence of committing piracy whether in or out of Canada.",
      partOf: "Part II — Offences Against Public Order",
    },
  ],
  [
    "75",
    {
      title: "Piratical acts",
      severity: "Indictable",
      maxPenalty: "14 years",
      url: `${JUSTICE_LAWS_BASE}/section-75.html`,
      summary:
        "Describes the offence of stealing a Canadian ship, stealing or destroying its cargo, supplies or fittings, committing or attempting a mutinous act on a Canadian ship, or counselling any of these acts, whether in or out of Canada.",
      partOf: "Part II — Offences Against Public Order",
    },
  ],
  [
    "76",
    {
      title: "Hijacking",
      severity: "Indictable",
      maxPenalty: "Life imprisonment",
      url: `${JUSTICE_LAWS_BASE}/section-76.html`,
      summary:
        "Describes the offence of hijacking, meaning unlawfully seizing or exercising control of an aircraft by force, threat, or intimidation, with intent to confine a person aboard, transport them against their will, hold them for ransom or service, or divert the aircraft from its flight plan.",
      partOf: "Part II — Offences Against Public Order",
    },
  ],
  [
    "77",
    {
      title: "Endangering safety of aircraft or airport",
      severity: "Indictable",
      maxPenalty: "Life imprisonment",
      url: `${JUSTICE_LAWS_BASE}/section-77.html`,
      summary:
        "Describes offences endangering the safety of an aircraft or airport, including committing violence on board or at an international airport, damaging an aircraft or interfering with air navigation facilities, placing dangerous items on an aircraft, or communicating information known to be false that endangers aircraft safety.",
      partOf: "Part II — Offences Against Public Order",
    },
  ],
  [
    "78",
    {
      title: "Offensive weapons and explosive substances",
      severity: "Indictable",
      maxPenalty: "14 years",
      url: `${JUSTICE_LAWS_BASE}/section-78.html`,
      summary:
        "Describes the offence of taking an offensive weapon or explosive substance aboard a civil aircraft without the owner's or operator's consent, or in breach of the terms of that consent, and defines civil aircraft to exclude aircraft operated by the Canadian Forces, police, or customs/excise enforcement.",
      partOf: "Part II — Offences Against Public Order",
    },
  ],
  [
    "78.1",
    {
      title: "Seizing control of ship or fixed platform",
      severity: "Indictable",
      maxPenalty: "Life imprisonment",
      url: `${JUSTICE_LAWS_BASE}/section-78.1.html`,
      summary:
        "Describes offences of seizing or controlling a ship or fixed platform by force, threat, or intimidation; committing violence, damage, or interference likely to endanger a ship's safe navigation or a fixed platform's safety; communicating false information endangering safe navigation; and threatening to commit such acts to compel a person to act; and defines fixed platform and ship.",
      partOf: "Part II — Offences Against Public Order",
    },
  ],
  [
    "79",
    {
      title: "Duty of care re explosive",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-79.html`,
      summary:
        "Places anyone possessing or having care or control of an explosive substance under a legal duty to use reasonable care to prevent bodily harm, death, or property damage from it.",
      partOf: "Part II — Offences Against Public Order",
    },
  ],
  [
    "80",
    {
      title: "Breach of duty",
      severity: "Indictable",
      maxPenalty: "Life imprisonment",
      url: `${JUSTICE_LAWS_BASE}/section-80.html`,
      summary:
        "Describes the offence of failing without lawful excuse to perform the duty of care under section 79, where that failure results in an explosion causing or likely to cause death, or causing or likely to cause bodily harm or property damage.",
      relatedSections: ["79"],
      partOf: "Part II — Offences Against Public Order",
    },
  ],
  [
    "81",
    {
      title: "Using explosives",
      severity: "Indictable",
      maxPenalty: "Life imprisonment",
      url: `${JUSTICE_LAWS_BASE}/section-81.html`,
      summary:
        "Describes offences of intentionally causing or attempting to cause an explosion likely to cause serious harm or property damage, causing an explosive or dangerous substance to be delivered or thrown with intent to harm, placing or throwing an explosive substance intending to damage property, or making or possessing an explosive substance intending to endanger life or property or to enable another to do so.",
      partOf: "Part II — Offences Against Public Order",
    },
  ],
  [
    "82",
    {
      title: "Possession of explosive",
      severity: "Hybrid",
      maxPenalty: "14 years",
      url: `${JUSTICE_LAWS_BASE}/section-82.html`,
      summary:
        "Describes the offence of making or possessing or having care or control of an explosive substance without lawful excuse, and a more serious version of that offence where done for the benefit of, at the direction of, or in association with a criminal organization.",
      partOf: "Part II — Offences Against Public Order",
    },
  ],
  [
    "82.1",
    {
      title: "Sentences to be served consecutively",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-82.1.html`,
      summary:
        "Requires that a sentence for an offence under subsection 82(2) be served consecutively to any other punishment for an offence arising from the same events and to any other sentence the person is already subject to.",
      relatedSections: ["82"],
      partOf: "Part II — Offences Against Public Order",
    },
  ],
  [
    "82.2",
    {
      title: "Definition of device",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-82.2.html`,
      summary:
        "Defines device, for the purposes of sections 82.3 to 82.5, as a nuclear explosive device, a device that disperses radioactive material, or a device emitting ionizing radiation capable of causing death, serious bodily harm, or substantial damage.",
      relatedSections: ["82.3", "82.4", "82.5"],
      partOf: "Part II — Offences Against Public Order",
    },
  ],
  [
    "82.3",
    {
      title: "Possession, etc., of nuclear material, radioactive material or device",
      severity: "Indictable",
      maxPenalty: "Life imprisonment",
      url: `${JUSTICE_LAWS_BASE}/section-82.3.html`,
      summary:
        "Describes the offence of, with intent to cause death, serious bodily harm, or substantial damage to property or the environment, making, possessing, using, transferring, exporting, importing, altering, or disposing of nuclear or radioactive material or a device, or committing an act against a nuclear facility that seriously interferes with or disrupts its operations.",
      partOf: "Part II — Offences Against Public Order",
    },
  ],
  [
    "82.4",
    {
      title: "Use or alteration of nuclear material, radioactive material or device",
      severity: "Indictable",
      maxPenalty: "Life imprisonment",
      url: `${JUSTICE_LAWS_BASE}/section-82.4.html`,
      summary:
        "Describes the offence of, with intent to compel a person, government, or international organization to act or refrain from acting, using or altering nuclear or radioactive material or a device, or committing an act against a nuclear facility that seriously interferes with or disrupts its operations.",
      partOf: "Part II — Offences Against Public Order",
    },
  ],
  [
    "82.5",
    {
      title: "Commission of indictable offence to obtain nuclear material, etc.",
      severity: "Indictable",
      maxPenalty: "Life imprisonment",
      url: `${JUSTICE_LAWS_BASE}/section-82.5.html`,
      summary:
        "Describes the offence of committing any indictable offence with intent to obtain nuclear material, radioactive material, a device, or access to a nuclear facility.",
      partOf: "Part II — Offences Against Public Order",
    },
  ],
  [
    "82.6",
    {
      title: "Threats",
      severity: "Indictable",
      maxPenalty: "14 years",
      url: `${JUSTICE_LAWS_BASE}/section-82.6.html`,
      summary:
        "Describes the offence of threatening to commit an offence under sections 82.3 to 82.5.",
      relatedSections: ["82.3", "82.4", "82.5"],
      partOf: "Part II — Offences Against Public Order",
    },
  ],
  [
    "82.7",
    {
      title: "Armed forces",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-82.7.html`,
      summary:
        "States that sections 82.3 to 82.6 do not apply to acts committed during an armed conflict that comply with applicable international law, or to activities of a state's military forces in official duties governed by other international law rules.",
      relatedSections: ["82.3", "82.4", "82.5", "82.6"],
      partOf: "Part II — Offences Against Public Order",
    },
  ],
  [
    "83",
    {
      title: "Engaging in prize fight",
      severity: "Summary",
      maxPenalty: "summary conviction (s. 787 default penalty applies unless otherwise stated)",
      url: `${JUSTICE_LAWS_BASE}/section-83.html`,
      summary:
        "Describes the offence of engaging as a principal in, advising or promoting, or being present at a prize fight in specified roles, and defines prize fight while excluding various sanctioned amateur and professional combative sport contests held under provincial authority.",
      partOf: "Part II — Offences Against Public Order",
    },
  ],

  // ── Part II.1 — Terrorism ──
  [
    "83.01",
    {
      title: "Definitions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-83.01.html`,
      summary:
        "Defines terms used in this Part, including Canadian, entity, listed entity, terrorist activity (covering specified international convention offences and acts intended to intimidate the public or compel a government/organization through violence, endangerment, property damage, or disruption of essential services), and terrorist group, and clarifies that mere expression of belief or opinion, and suicide bombings, are addressed under the terrorist activity definition's criteria.",
      relatedSections: ["7", "83.05", "83.19"],
      partOf: "Part II.1 — Terrorism",
    },
  ],
  [
    "83.02",
    {
      title: "Providing or collecting property for certain activities",
      severity: "Indictable",
      maxPenalty: "10 years",
      url: `${JUSTICE_LAWS_BASE}/section-83.02.html`,
      summary:
        "Describes the offence of directly or indirectly, wilfully and without lawful justification, providing or collecting property intending or knowing it will be used to carry out specified terrorism-related offences or acts intended to cause death or serious bodily harm to civilians for purposes of intimidation or compulsion.",
      relatedSections: ["83.01"],
      partOf: "Part II.1 — Terrorism",
    },
  ],
  [
    "83.03",
    {
      title: "Providing, making available, etc., property or services for terrorist purposes",
      severity: "Indictable",
      maxPenalty: "10 years",
      url: `${JUSTICE_LAWS_BASE}/section-83.03.html`,
      summary:
        "Describes offences of providing, inviting provision of, or making available property or financial/related services intending or knowing they will be used to facilitate or carry out terrorist activity or benefit someone doing so, or knowing they will be used by or benefit a terrorist group, with exceptions for authorized activities and for humanitarian assistance carried out with reasonable efforts to minimize benefit to terrorist groups.",
      relatedSections: ["83.032"],
      partOf: "Part II.1 — Terrorism",
    },
  ],
  [
    "83.031",
    {
      title: "Definition of Public Safety Minister",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-83.031.html`,
      summary:
        "Defines Public Safety Minister for the purposes of sections 83.032 to 83.0392 and allows any Minister referred to in those sections to designate a person to exercise their powers or duties.",
      relatedSections: ["83.032", "83.0392"],
      partOf: "Part II.1 — Terrorism",
    },
  ],
  [
    "83.032",
    {
      title: "Authorization",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-83.032.html`,
      summary:
        "Sets out the process by which the Public Safety Minister may authorize an eligible person to carry out specified activities (such as health, education, livelihood, human rights, or immigration-related services) in a geographic area controlled by a terrorist group, including eligibility, referral by other Ministers, conditions for granting, security review factors, and validity period.",
      relatedSections: ["83.03"],
      partOf: "Part II.1 — Terrorism",
    },
  ],
  [
    "83.033",
    {
      title: "Notice of refusal",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-83.033.html`,
      summary:
        "Requires notice of a refused application under section 83.032 to be given to the applicant, restricts new applications for the same activity for 30 days absent a material change in circumstances, and allows the Public Safety Minister to consider such a new application without referral in certain cases.",
      relatedSections: ["83.032"],
      partOf: "Part II.1 — Terrorism",
    },
  ],
  [
    "83.034",
    {
      title: "Additional security reviews",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-83.034.html`,
      summary:
        "Allows the Public Safety Minister to conduct additional security reviews of a person subject to an authorization granted under section 83.032 or renewed under section 83.035, at any time during its validity period, and to request additional information relating only to that authorization or its renewal.",
      relatedSections: ["83.032", "83.035"],
      partOf: "Part II.1 — Terrorism",
    },
  ],
  [
    "83.035",
    {
      title: "Renewal of authorization",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-83.035.html`,
      summary:
        "Allows the Public Safety Minister to renew a section 83.032 authorization for up to five years at a time on timely application, and permits renewal of a late application if exceptional circumstances justify the delay.",
      relatedSections: ["83.032"],
      partOf: "Part II.1 — Terrorism",
    },
  ],
  [
    "83.036",
    {
      title: "Amendment to authorization",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-83.036.html`,
      summary:
        "Allows the Public Safety Minister to amend an authorization (or its terms and conditions) granted or renewed under sections 83.032/83.035, but not so as to change its essential nature or replace/add a purpose, and requires the authorization holder to supply information requested in support of the amendment.",
      relatedSections: ["83.032", "83.035"],
      partOf: "Part II.1 — Terrorism",
    },
  ],
  [
    "83.037",
    {
      title: "Authorization — suspension and revocation",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-83.037.html`,
      summary:
        "Allows the Public Safety Minister to suspend, revoke, or restrict the scope of an authorization if the holder fails to comply with it or its conditions, fails without reasonable excuse to meet reporting or information requests, or if the Minister is no longer satisfied a specified condition is met.",
      relatedSections: ["83.032", "83.034"],
      partOf: "Part II.1 — Terrorism",
    },
  ],
  [
    "83.038",
    {
      title: "Assistance to Public Safety Minister",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-83.038.html`,
      summary:
        "Lists government entities (including CSIS, RCMP, CSE, and others) that may assist the Public Safety Minister in administering and enforcing the surrounding sections by collecting and sharing information, restricts use of that information to that purpose, and requires the Minister to take reasonable steps to ensure compliance.",
      relatedSections: ["83.031", "83.0392"],
      partOf: "Part II.1 — Terrorism",
    },
  ],
  [
    "83.039",
    {
      title: "Judicial review",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-83.039.html`,
      summary:
        "Sets out procedural rules for judicial review of decisions made by the Public Safety Minister or other named Ministers under sections 83.032 to 83.038, including a right to be heard, treatment of withdrawn or irrelevant evidence, and confidentiality obligations, and applies the same rules to appeals.",
      relatedSections: ["83.032", "83.038"],
      partOf: "Part II.1 — Terrorism",
    },
  ],
  [
    "83.0391",
    {
      title: "Regulations",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-83.0391.html`,
      summary:
        "Authorizes the Governor in Council to make regulations governing applications for authorizations, requests for information, the granting/renewal/amendment/suspension/revocation of authorizations, reporting by authorization holders, and prescribing additional assisting entities.",
      relatedSections: ["83.032", "83.035", "83.036", "83.037", "83.038"],
      partOf: "Part II.1 — Terrorism",
    },
  ],
  [
    "83.0392",
    {
      title: "Annual report",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-83.0392.html`,
      summary:
        "Requires the Public Safety Minister to prepare an annual report to Parliament on the operation of the surrounding sections, including application statistics and handling of redactions, and to conduct a periodic comprehensive review with a plan to remedy any identified deficiencies.",
      relatedSections: ["83.031", "83.0391"],
      partOf: "Part II.1 — Terrorism",
    },
  ],
  [
    "83.04",
    {
      title: "Using or possessing property for terrorist purposes",
      severity: "Indictable",
      maxPenalty: "10 years",
      url: `${JUSTICE_LAWS_BASE}/section-83.04.html`,
      summary:
        "Makes it an offence to use property, in whole or in part, to facilitate or carry out a terrorist activity, or to possess property intending or knowing it will be used for that purpose.",
      partOf: "Part II.1 — Terrorism",
    },
  ],
  [
    "83.05",
    {
      title: "Establishment of list",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-83.05.html`,
      summary:
        "Sets out the process by which the Governor in Council may establish and maintain a list of entities believed to have knowingly carried out or facilitated terrorist activity or acted in association with such an entity, including procedures for a listed entity to apply for removal, judicial review of the Minister's decision, periodic government review of listings, and publication requirements.",
      partOf: "Part II.1 — Terrorism",
    },
  ],
  [
    "83.06",
    {
      title: "Return of information",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-83.06.html`,
      summary:
        "Sets out how a judge handles foreign-source information given in confidence during a listing-related proceeding under section 83.05 -- returning it if found not relevant, or summarizing it if found relevant but suitable for a summary -- and confirms that the Canada Evidence Act's sensitive-information provisions apply to related applications.",
      relatedSections: ["83.05"],
      partOf: "Part II.1 — Terrorism",
    },
  ],
  [
    "83.07",
    {
      title: "Mistaken identity",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-83.07.html`,
      summary:
        "Allows an entity with a name the same as or similar to a listed entity's name to apply to the Minister for a certificate confirming it is not that listed entity, and requires the Minister to issue the certificate within 30 days if satisfied this is the case.",
      partOf: "Part II.1 — Terrorism",
    },
  ],
  [
    "83.08",
    {
      title: "Freezing of property",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-83.08.html`,
      summary:
        "Prohibits any person in Canada or Canadian abroad from knowingly dealing in, facilitating transactions involving, or providing services related to property owned or controlled by a terrorist group, while shielding a person who acts reasonably and takes all reasonable steps to comply from civil liability.",
      partOf: "Part II.1 — Terrorism",
    },
  ],
  [
    "83.09",
    {
      title: "Exemptions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-83.09.html`,
      summary:
        "Allows the Minister of Public Safety (or a designate) to authorize specific activities or transactions that would otherwise be prohibited under section 83.08, subject to conditions the Minister may set, amend, suspend, revoke, or reinstate, while preserving other parties' existing property rights and extending the authorization's protection to others involved in the authorized activity.",
      relatedSections: ["83.08", "83.1", "83.11"],
      partOf: "Part II.1 — Terrorism",
    },
  ],
  [
    "83.1",
    {
      title: "Disclosure",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-83.1.html`,
      summary:
        "Requires every person in or connected to Canada to promptly disclose to the RCMP Commissioner or CSIS Director any property they know is controlled by a terrorist group and any related transaction information, and grants immunity from criminal or civil proceedings for good-faith disclosures.",
      partOf: "Part II.1 — Terrorism",
    },
  ],
  [
    "83.11",
    {
      title: "Audit",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-83.11.html`,
      summary:
        "Requires specified financial institutions (banks, credit unions, insurers, trust and loan companies, and securities dealers) to continuously check whether they hold property controlled by a listed entity and to report their findings periodically to their regulator, with immunity for good-faith reports and regulation-making power to set reporting periods and exemptions.",
      partOf: "Part II.1 — Terrorism",
    },
  ],
  [
    "83.12",
    {
      title: "Offences — freezing of property, disclosure or audit",
      severity: "Hybrid",
      maxPenalty: "10 years indictable; or summary conviction, liable to a fine of up to $100,000 or imprisonment of up to 2 years less a day, or both.",
      url: `${JUSTICE_LAWS_BASE}/section-83.12.html`,
      summary:
        "Makes it an offence to contravene the freezing-of-property, disclosure, or audit obligations in sections 83.08, 83.1, and 83.11.",
      relatedSections: ["83.08", "83.1", "83.11"],
      partOf: "Part II.1 — Terrorism",
    },
  ],
  [
    "83.13",
    {
      title: "Seizure and restraint of assets",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-83.13.html`,
      summary:
        "Allows a Federal Court judge, on an ex parte application by the Attorney General, to issue a warrant to search for and seize, or a restraint order to freeze, property that may later be subject to forfeiture, and sets out related procedures including appointing a manager for the property, destroying property of little value, and varying or cancelling such orders.",
      relatedSections: ["83.14", "462.32", "462.33", "462.34", "462.35", "462.4"],
      partOf: "Part II.1 — Terrorism",
    },
  ],
  [
    "83.14",
    {
      title: "Application for order of forfeiture",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-83.14.html`,
      summary:
        "Sets out the process by which the Attorney General may apply to a Federal Court judge for forfeiture of property owned or controlled by a terrorist group or used to facilitate terrorist activity, including notice to respondents, protection of innocent third-party interests and family members' residences, and a procedure to challenge a forfeiture order after the fact.",
      partOf: "Part II.1 — Terrorism",
    },
  ],
  [
    "83.15",
    {
      title: "Disposition of property",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-83.15.html`,
      summary:
        "Applies certain existing property-disposal provisions from elsewhere in the Code, with necessary modifications, to property restrained, seized, or forfeited under sections 83.13 or 83.14.",
      relatedSections: ["462.42", "462.43", "462.46", "83.13", "83.14"],
      partOf: "Part II.1 — Terrorism",
    },
  ],
  [
    "83.16",
    {
      title: "Interim preservation rights",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-83.16.html`,
      summary:
        "Provides that property restrained, seized, or under management pending an appeal of a forfeiture order remains subject to those measures until the appeal concludes, and applies an existing appeal provision to an appeal of a refusal to grant a forfeiture order.",
      relatedSections: ["83.14", "83.13", "462.34"],
      partOf: "Part II.1 — Terrorism",
    },
  ],
  [
    "83.17",
    {
      title: "Other forfeiture provisions unaffected",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-83.17.html`,
      summary:
        "States that this Part does not affect the operation of other forfeiture provisions in this or any other federal statute, and that property is only forfeitable under section 83.14 to the extent it is not needed to satisfy restitution or compensation obligations to crime victims.",
      relatedSections: ["83.14"],
      partOf: "Part II.1 — Terrorism",
    },
  ],
  [
    "83.18",
    {
      title: "Participation in activity of terrorist group",
      severity: "Indictable",
      maxPenalty: "10 years",
      url: `${JUSTICE_LAWS_BASE}/section-83.18.html`,
      summary:
        "Makes it an offence to knowingly participate in or contribute to an activity of a terrorist group for the purpose of enhancing its ability to facilitate or carry out terrorist activity, and specifies that the offence can be made out even if no terrorist activity actually results, listing examples of what counts as participating or contributing.",
      partOf: "Part II.1 — Terrorism",
    },
  ],
  [
    "83.181",
    {
      title: "Leaving Canada to participate in activity of terrorist group",
      severity: "Indictable",
      maxPenalty: "10 years",
      url: `${JUSTICE_LAWS_BASE}/section-83.181.html`,
      summary:
        "Makes it an offence to leave or attempt to leave Canada, or board or attempt to board a conveyance intending to leave Canada, for the purpose of doing outside Canada something that would constitute the section 83.18(1) offence if done in Canada.",
      relatedSections: ["83.18"],
      partOf: "Part II.1 — Terrorism",
    },
  ],
  [
    "83.19",
    {
      title: "Facilitating terrorist activity",
      severity: "Indictable",
      maxPenalty: "14 years",
      url: `${JUSTICE_LAWS_BASE}/section-83.19.html`,
      summary:
        "Makes it an offence to knowingly facilitate a terrorist activity, and specifies the offence applies regardless of whether the facilitator knew the specific activity, whether it was foreseen or planned, or whether it was actually carried out.",
      partOf: "Part II.1 — Terrorism",
    },
  ],
  [
    "83.191",
    {
      title: "Leaving Canada to facilitate terrorist activity",
      severity: "Indictable",
      maxPenalty: "14 years",
      url: `${JUSTICE_LAWS_BASE}/section-83.191.html`,
      summary:
        "Makes it an offence to leave or attempt to leave Canada, or board or attempt to board a conveyance intending to leave Canada, for the purpose of doing outside Canada something that would constitute the section 83.19(1) offence if done in Canada.",
      relatedSections: ["83.19"],
      partOf: "Part II.1 — Terrorism",
    },
  ],
  [
    "83.2",
    {
      title: "Commission of offence for terrorist group",
      severity: "Indictable",
      maxPenalty: "Life imprisonment",
      url: `${JUSTICE_LAWS_BASE}/section-83.2.html`,
      summary:
        "Makes it an offence to commit any indictable offence under this or another federal Act for the benefit of, at the direction of, or in association with a terrorist group.",
      partOf: "Part II.1 — Terrorism",
    },
  ],
  [
    "83.201",
    {
      title: "Leaving Canada to commit offence for terrorist group",
      severity: "Indictable",
      maxPenalty: "14 years",
      url: `${JUSTICE_LAWS_BASE}/section-83.201.html`,
      summary:
        "Makes it an offence to leave or attempt to leave Canada, or board or attempt to board a conveyance intending to leave Canada, for the purpose of committing outside Canada an act that would be an indictable offence for the benefit of, at the direction of, or in association with a terrorist group if committed in Canada.",
      partOf: "Part II.1 — Terrorism",
    },
  ],
  [
    "83.202",
    {
      title: "Leaving Canada to commit offence that is terrorist activity",
      severity: "Indictable",
      maxPenalty: "14 years",
      url: `${JUSTICE_LAWS_BASE}/section-83.202.html`,
      summary:
        "Makes it an offence to leave or attempt to leave Canada, or board or attempt to board a conveyance intending to leave Canada, for the purpose of committing outside Canada an act that would be an indictable offence in Canada and would also constitute a terrorist activity.",
      partOf: "Part II.1 — Terrorism",
    },
  ],
  [
    "83.21",
    {
      title: "Instructing to carry out activity for terrorist group",
      severity: "Indictable",
      maxPenalty: "Life imprisonment",
      url: `${JUSTICE_LAWS_BASE}/section-83.21.html`,
      summary:
        "Makes it an offence to knowingly instruct any person, directly or indirectly, to carry out an activity for a terrorist group's benefit for the purpose of enhancing the group's ability to facilitate or carry out terrorist activity, and specifies the offence applies regardless of whether the activity is actually carried out, whether a specific person is instructed, or various other circumstances.",
      partOf: "Part II.1 — Terrorism",
    },
  ],
  [
    "83.22",
    {
      title: "Instructing to carry out terrorist activity",
      severity: "Indictable",
      maxPenalty: "Life imprisonment",
      url: `${JUSTICE_LAWS_BASE}/section-83.22.html`,
      summary:
        "Makes it an offence to knowingly instruct any person, directly or indirectly, to carry out a terrorist activity, and specifies the offence applies regardless of whether the activity is actually carried out or the instructed person's knowledge.",
      partOf: "Part II.1 — Terrorism",
    },
  ],
  [
    "83.221",
    {
      title: "Counselling commission of terrorism offence",
      severity: "Indictable",
      maxPenalty: "5 years",
      url: `${JUSTICE_LAWS_BASE}/section-83.221.html`,
      summary:
        "Makes it an offence to counsel another person to commit a terrorism offence without identifying a specific offence, applicable whether or not the counselled person actually commits a terrorism offence.",
      partOf: "Part II.1 — Terrorism",
    },
  ],
  [
    "83.222",
    {
      title: "Warrant of seizure",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-83.222.html`,
      summary:
        "Allows a judge to issue a warrant to seize publications believed to be terrorist propaganda kept for sale or distribution, sets out a process for the occupier, owner, and author to contest forfeiture before the court, provides for return of the material if the court is not satisfied, and allows appeal, subject to the Attorney General's consent to any proceeding.",
      relatedSections: ["320", "673", "696"],
      partOf: "Part II.1 — Terrorism",
    },
  ],
  [
    "83.223",
    {
      title: "Order to computer system’s custodian",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-83.223.html`,
      summary:
        "Allows a judge to order a computer system's custodian to copy, remove, and identify the source of material that is or makes available terrorist propaganda, sets out notice and hearing procedures for the person who posted it, and allows the court to order deletion or return of the material, subject to appeal and the Attorney General's consent.",
      relatedSections: ["342.1", "320", "83.222", "673", "696"],
      partOf: "Part II.1 — Terrorism",
    },
  ],
  [
    "83.23",
    {
      title: "Concealing person who carried out terrorist activity",
      severity: "Indictable",
      maxPenalty: "14 years indictable if the person harboured or concealed carried out a terrorist activity punishable by life imprisonment; 10 years indictable in any other case, including where the person is only likely to carry out a terrorist activity.",
      url: `${JUSTICE_LAWS_BASE}/section-83.23.html`,
      summary:
        "Makes it an offence to knowingly harbour or conceal a person known to have carried out, or to be likely to carry out, terrorist activity for the purpose of enabling further terrorist activity, with the penalty for concealing someone who already carried out terrorist activity varying based on the punishment that person themselves would face.",
      partOf: "Part II.1 — Terrorism",
    },
  ],
  [
    "83.231",
    {
      title: "Hoax — terrorist activity",
      severity: "Hybrid",
      maxPenalty: "Life imprisonment",
      url: `${JUSTICE_LAWS_BASE}/section-83.231.html`,
      summary:
        "Makes it an offence to convey false information or commit an act, without lawful excuse and intending to cause fear of death, bodily harm, property damage, or interference with property, that is likely to cause a reasonable apprehension that terrorist activity is occurring or will occur, with escalated classification where the act causes bodily harm or death.",
      partOf: "Part II.1 — Terrorism",
    },
  ],
  [
    "83.24",
    {
      title: "Attorney General’s consent",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-83.24.html`,
      summary:
        "Requires the Attorney General's consent before proceedings for a terrorism offence or an offence under section 83.12 can be commenced.",
      relatedSections: ["83.12"],
      partOf: "Part II.1 — Terrorism",
    },
  ],
  [
    "83.25",
    {
      title: "Jurisdiction",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-83.25.html`,
      summary:
        "Allows proceedings for a terrorism offence or a section 83.12 offence to be commenced and conducted by the federal Attorney General in any Canadian territorial division regardless of where the person is or where the offence occurred, and allows trial and punishment there as if the offence occurred in that division.",
      relatedSections: ["83.12"],
      partOf: "Part II.1 — Terrorism",
    },
  ],
  [
    "83.26",
    {
      title: "Sentences to be served consecutively",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-83.26.html`,
      summary:
        "Requires that a sentence (other than life imprisonment) for an offence under specified terrorism-related sections be served consecutively to other sentences arising from the same events or already being served.",
      relatedSections: ["83.02", "83.04", "83.18", "83.23"],
      partOf: "Part II.1 — Terrorism",
    },
  ],
  [
    "83.27",
    {
      title: "Punishment for terrorist activity",
      severity: "Indictable",
      maxPenalty: "Life imprisonment",
      url: `${JUSTICE_LAWS_BASE}/section-83.27.html`,
      summary:
        "Provides that a person convicted of an indictable offence whose underlying act also constitutes a terrorist activity is liable to life imprisonment (unless a minimum life sentence already applies), but only if the prosecutor gave notice before the plea that this provision would be sought.",
      partOf: "Part II.1 — Terrorism",
    },
  ],
  [
    "83.3",
    {
      title: "Attorney General’s consent",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-83.3.html`,
      summary:
        "Sets out a detailed process, requiring the Attorney General's consent, allowing a peace officer to lay an information seeking a recognizance with conditions (or make an arrest without warrant in urgent circumstances) to prevent an anticipated terrorist activity, including timelines for appearance before a judge, grounds for detention, and the conditions a judge may impose in the resulting recognizance, such as firearms, passport, or geographic restrictions.",
      relatedSections: ["810"],
      partOf: "Part II.1 — Terrorism",
    },
  ],
  [
    "83.31",
    {
      title: "Annual report (section 83.3)",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-83.31.html`,
      summary:
        "Requires the federal Attorney General and Minister of Public Safety to prepare and publish annual reports on the use of section 83.3, including statistics on consents, arrests, detentions, recognizances, and their opinion on whether the section should be extended, while excluding information whose disclosure would be harmful to investigations, safety, proceedings, or the public interest.",
      relatedSections: ["83.3"],
      partOf: "Part II.1 — Terrorism",
    },
  ],
  [
    "83.32",
    {
      title: "Sunset provision",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-83.32.html`,
      summary:
        "Sets out when the powers in section 83.3 expire (five years after the National Security Act, 2017 receives royal assent) unless Parliament extends them by resolution, and requires a parliamentary committee review and report before that anniversary.",
      relatedSections: ["83.3"],
      partOf: "Part II.1 — Terrorism",
    },
  ],
  [
    "83.33",
    {
      title: "Transitional provision — section 83.3",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-83.33.html`,
      summary:
        "Subsection (1) is repealed. Provides that if section 83.3 ceases to have effect under section 83.32, a person detained under it must be released, except that subsections 83.3(7) to (14) continue to apply to a person already taken before a judge under subsection 83.3(6).",
      relatedSections: ["83.3", "83.32"],
      partOf: "Part II.1 — Terrorism",
    },
  ],

  // ── Part III — Firearms and Other Weapons ──
  [
    "84",
    {
      title: "Definitions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-84.html`,
      summary:
        "Defines terms used in the Part dealing with firearms and weapons, such as ammunition, antique firearm, authorization, automatic firearm, cartridge magazine, chief firearms officer, cross-bow, and related expressions.",
      relatedSections: ["91", "95", "99", "103", "107", "117.03"],
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "85",
    {
      title: "Using firearm in commission of offence",
      severity: "Indictable",
      maxPenalty: "14 years indictable; no mandatory minimum; served consecutively to sentences for an offence arising from the same event or series of events and to any sentence the person is already subject to.",
      url: `${JUSTICE_LAWS_BASE}/section-85.html`,
      definition:
        "Every person commits an offence who uses a firearm, whether or not the person causes or means to cause bodily harm to any person as a result, while committing an indictable offence (other than an offence under section 220 (criminal negligence causing death), 236 (manslaughter), 239 (attempted murder), 244 (discharging firearm with intent), 244.2 (discharging firearm — recklessness), 272 (sexual assault with a weapon), 273 (aggravated sexual assault), subsection 279(1) (kidnapping), section 279.1 (hostage taking), 344 (robbery) or 346 (extortion)), while attempting to commit an indictable offence, or during flight after committing or attempting to commit an indictable offence. It is also an offence to use an imitation firearm while committing or attempting to commit any indictable offence, or during flight after doing so, whether or not the person causes or means to cause bodily harm to any person as a result. A sentence imposed for an offence under this section must be served consecutively to any other sentence arising from the same event or series of events and to any sentence the person is already subject to.",
      relatedSections: ["86", "87", "88", "91", "92", "95"],
      defences: ["no knowledge item was a firearm"],
      topicsTagged: ["firearm", "weapon", "indictable offence"],
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "86",
    {
      title: "Careless use of firearm, etc.",
      severity: "Hybrid",
      maxPenalty: "Indictable: 2 years (first offence) or 5 years (second or subsequent offence), with no minimum stated; summary conviction also available.",
      url: `${JUSTICE_LAWS_BASE}/section-86.html`,
      definition:
        "Every person commits an offence who, without lawful excuse, uses, carries, handles, ships, transports or stores a firearm, a prohibited weapon, a restricted weapon, a prohibited device or any ammunition or prohibited ammunition in a careless manner or without reasonable precautions for the safety of other persons. It is also an offence to contravene a regulation made under paragraph 117(h) of the Firearms Act respecting the storage, handling, transportation, shipping, display, advertising and mail-order sales of firearms and restricted weapons.",
      relatedSections: ["85", "87", "88"],
      defences: ["lawful excuse", "reasonable precautions taken"],
      topicsTagged: ["firearm", "careless use", "safety"],
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "87",
    {
      title: "Pointing a firearm",
      severity: "Hybrid",
      maxPenalty: "5 years indictable / 2 years less a day summary",
      url: `${JUSTICE_LAWS_BASE}/section-87.html`,
      definition:
        "Every person commits an offence who, without lawful excuse, points a firearm at another person, whether the firearm is loaded or unloaded.",
      relatedSections: ["85", "86", "88", "265"],
      defences: ["lawful excuse"],
      topicsTagged: ["firearm", "threatening", "pointing"],
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "88",
    {
      title: "Possession of weapon for dangerous purpose",
      severity: "Hybrid",
      maxPenalty: "10 years indictable / 2 years less a day summary",
      url: `${JUSTICE_LAWS_BASE}/section-88.html`,
      definition:
        "Every person commits an offence who carries or possesses a weapon, an imitation of a weapon, a prohibited device or any ammunition or prohibited ammunition for a purpose dangerous to the public peace or for the purpose of committing an offence.",
      relatedSections: ["85", "86", "87", "91", "92"],
      defences: ["no intent for dangerous purpose", "lawful possession"],
      topicsTagged: ["weapon", "dangerous purpose", "possession"],
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "89",
    {
      title: "Carrying weapon while attending public meeting",
      severity: "Summary",
      maxPenalty: "Summary conviction (no penalty amount specified in this section)",
      url: `${JUSTICE_LAWS_BASE}/section-89.html`,
      summary:
        "Makes it an offence to carry a weapon, prohibited device, ammunition, or prohibited ammunition without lawful excuse while attending or on the way to attend a public meeting.",
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "90",
    {
      title: "Carrying concealed weapon",
      severity: "Hybrid",
      maxPenalty: "5 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-90.html`,
      summary:
        "Makes it an offence to carry a weapon, prohibited device, or prohibited ammunition concealed, unless authorized under the Firearms Act to carry it concealed.",
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "91",
    {
      title: "Unauthorized possession of firearm",
      severity: "Hybrid",
      maxPenalty: "5 years indictable / 2 years less a day summary",
      url: `${JUSTICE_LAWS_BASE}/section-91.html`,
      definition:
        "Subject to subsection (4), every person commits an offence who possesses a prohibited firearm, a restricted firearm or a non-restricted firearm without being the holder of a licence under which the person may possess it and, in the case of a prohibited firearm or a restricted firearm, a registration certificate for it.",
      relatedSections: ["92", "95", "86"],
      defences: ["valid licence and registration", "inherited firearm (grace period)"],
      topicsTagged: ["firearm", "unauthorized possession", "licence"],
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "92",
    {
      title: "Possession of firearm knowing its possession is unauthorized",
      severity: "Indictable",
      maxPenalty: "10 years indictable; no mandatory minimum.",
      url: `${JUSTICE_LAWS_BASE}/section-92.html`,
      definition:
        "Subject to the exceptions in subsection (4), every person commits an offence who possesses a prohibited firearm, a restricted firearm or a non-restricted firearm knowing that they are not the holder of a licence under which they may possess it and, in the case of a prohibited firearm or a restricted firearm, a registration certificate for it. It is also an offence, subject to the same exceptions, to possess a prohibited weapon, a restricted weapon, a prohibited device (other than a replica firearm) or any prohibited ammunition knowing that the person is not the holder of a licence under which they may possess it.",
      relatedSections: ["91", "95", "86"],
      defences: ["honest belief in lawful possession"],
      topicsTagged: ["firearm", "knowing possession", "unauthorized"],
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "93",
    {
      title: "Possession at unauthorized place",
      severity: "Hybrid",
      maxPenalty: "5 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-93.html`,
      summary:
        "Makes it an offence for a holder of an authorization or licence to possess a firearm, weapon, device, or prohibited ammunition at a place other than where the authorization or licence permits, with an exception for replica firearms.",
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "94",
    {
      title: "Unauthorized possession in motor vehicle",
      severity: "Hybrid",
      maxPenalty: "10 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-94.html`,
      summary:
        "Makes it an offence to be an occupant of a motor vehicle knowing it contains a firearm, a prohibited or restricted weapon, a prohibited device (other than a replica firearm), or prohibited ammunition, subject to exceptions where the occupant or another occupant holds the required licence, authorization, or registration.",
      relatedSections: ["117.07", "117.1"],
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "95",
    {
      title: "Possession of prohibited or restricted firearm with ammunition",
      severity: "Hybrid",
      maxPenalty: "14 years indictable; summary conviction also available; no mandatory minimum.",
      url: `${JUSTICE_LAWS_BASE}/section-95.html`,
      definition:
        "Subject to subsection (3), every person commits an offence who, in any place, possesses a loaded prohibited firearm or restricted firearm, or an unloaded prohibited firearm or restricted firearm together with readily accessible ammunition that is capable of being discharged in the firearm, without being the holder of an authorization or a licence under which the person may possess the firearm in that place and the registration certificate for the firearm.",
      relatedSections: ["91", "92", "86", "85"],
      defences: ["valid authorization and registration"],
      topicsTagged: ["firearm", "prohibited", "restricted", "loaded"],
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "96",
    {
      title: "Possession of weapon obtained by commission of offence",
      severity: "Hybrid",
      maxPenalty: "14 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-96.html`,
      summary:
        "Makes it an offence to possess a firearm, weapon, device, or prohibited ammunition known to have been obtained through the commission of an offence, with an exception for someone who acquires it by operation of law and disposes of it promptly.",
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "98",
    {
      title: "Breaking and entering to steal firearm",
      severity: "Indictable",
      maxPenalty: "Life imprisonment",
      url: `${JUSTICE_LAWS_BASE}/section-98.html`,
      summary:
        "Makes it an offence to break and enter, or break out of, a place with intent to steal a firearm located there, or to steal a firearm during such a break-in, and defines 'break' and 'place' for this purpose.",
      relatedSections: ["321"],
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "98.1",
    {
      title: "Robbery to steal firearm",
      severity: "Indictable",
      maxPenalty: "Life imprisonment",
      url: `${JUSTICE_LAWS_BASE}/section-98.1.html`,
      summary:
        "Makes it an offence to commit a robbery with intent to steal a firearm or in the course of which a firearm is stolen.",
      relatedSections: ["343"],
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "99",
    {
      title: "Weapons trafficking",
      severity: "Indictable",
      maxPenalty: "14 years indictable, with a minimum of 3 years for a first offence or 5 years for a subsequent offence when the object is a prohibited firearm, restricted firearm, non-restricted firearm, prohibited device, firearm part, ammunition or prohibited ammunition; 14 years indictable with no minimum in any other case.",
      url: `${JUSTICE_LAWS_BASE}/section-99.html`,
      summary:
        "Makes it an offence to manufacture, transfer, or offer to do so in respect of any firearm, prohibited or restricted weapon, prohibited device, firearm part, or ammunition, while knowing one is not authorized under the Firearms Act or other federal law or regulations.",
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "100",
    {
      title: "Possession for purpose of weapons trafficking",
      severity: "Indictable",
      maxPenalty: "14 years indictable (3-year minimum for a first offence / 5-year minimum for a subsequent offence when the object is a prohibited firearm, restricted firearm, non-restricted firearm, prohibited device, firearm part, ammunition or prohibited ammunition; no minimum in any other case).",
      url: `${JUSTICE_LAWS_BASE}/section-100.html`,
      definition:
        "Every person commits an offence who possesses a prohibited firearm, a restricted firearm, a non-restricted firearm, a prohibited weapon, a restricted weapon, a prohibited device, a firearm part, any ammunition or any prohibited ammunition for the purpose of transferring it, whether or not for consideration, or offering to transfer it, knowing that the person is not authorized to transfer it under the Firearms Act or any other Act of Parliament or any regulations made under any Act of Parliament.",
      relatedSections: ["91", "92", "95", "101"],
      defences: ["authorized transfer under Firearms Act"],
      topicsTagged: ["weapons trafficking", "firearm", "transfer"],
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "101",
    {
      title: "Transfer without authority",
      severity: "Hybrid",
      maxPenalty: "5 years indictable; summary conviction also available.",
      url: `${JUSTICE_LAWS_BASE}/section-101.html`,
      definition:
        "Every person commits an offence who transfers a prohibited firearm, a restricted firearm, a non-restricted firearm, a prohibited weapon, a restricted weapon, a prohibited device, a firearm part, any ammunition or any prohibited ammunition to any person otherwise than under the authority of the Firearms Act or any other Act of Parliament or any regulations made under an Act of Parliament.",
      relatedSections: ["100", "91", "92"],
      defences: ["authorized transfer under Firearms Act"],
      topicsTagged: ["weapons", "transfer", "unauthorized"],
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "102",
    {
      title: "Making automatic firearm",
      severity: "Hybrid",
      maxPenalty: "10 years indictable with a 1-year mandatory minimum; summary conviction also available.",
      url: `${JUSTICE_LAWS_BASE}/section-102.html`,
      definition:
        "Every person commits an offence who, without lawful excuse, alters a firearm so that it is capable of, or manufactures or assembles any firearm that is capable of, discharging projectiles in rapid succession during one pressure of the trigger.",
      relatedSections: ["84", "91", "95"],
      defences: ["lawful excuse (e.g., licensed manufacturer)"],
      topicsTagged: ["automatic firearm", "prohibited", "manufacturing"],
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "102.1",
    {
      title: "Possession of computer data",
      severity: "Hybrid",
      maxPenalty: "10 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-102.1.html`,
      summary:
        "Makes it an offence to possess or access, or to distribute or publish, computer data usable with a 3D printer or similar system to manufacture or traffic a firearm or prohibited device, where done without authority under the Firearms Act or knowing it is intended for that unauthorized purpose.",
      relatedSections: ["84", "342.1"],
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "103",
    {
      title: "Importing or exporting knowing it is unauthorized",
      severity: "Indictable",
      maxPenalty: "14 years indictable, with a minimum of 3 years for a first offence or 5 years for a subsequent offence when the object is a prohibited firearm, restricted firearm, non-restricted firearm, prohibited device, firearm part, or prohibited ammunition; 14 years indictable with no minimum in any other case.",
      url: `${JUSTICE_LAWS_BASE}/section-103.html`,
      summary:
        "Makes it an offence to import or export a firearm, prohibited or restricted weapon, prohibited device, firearm part, or prohibited ammunition, or certain components for assembling an automatic firearm, knowing one is not authorized to do so under the Firearms Act or other federal law.",
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "104",
    {
      title: "Unauthorized importing or exporting",
      severity: "Hybrid",
      maxPenalty: "5 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-104.html`,
      summary:
        "Makes it an offence to import or export a firearm, prohibited or restricted weapon, prohibited device, firearm part, or prohibited ammunition, or certain components for assembling an automatic firearm, without authority under the Firearms Act or other federal law.",
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "104.1",
    {
      title: "Altering cartridge magazine",
      severity: "Hybrid",
      maxPenalty: "5 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-104.1.html`,
      summary:
        "Makes it an offence, without lawful excuse, to alter a cartridge magazine that is not a prohibited device so that it becomes a prohibited device.",
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "105",
    {
      title: "Losing or finding",
      severity: "Hybrid",
      maxPenalty: "5 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-105.html`,
      summary:
        "Makes it an offence to fail to promptly report the loss or theft of a firearm, weapon, device, prohibited ammunition, authorization, licence, or registration certificate to a peace or firearms officer, or to fail to promptly report or deliver such an item that one finds and reasonably believes was lost or abandoned.",
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "106",
    {
      title: "Destroying",
      severity: "Hybrid",
      maxPenalty: "5 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-106.html`,
      summary:
        "Makes it an offence to fail to promptly report the destruction of a prohibited or restricted firearm, a prohibited or restricted weapon, a prohibited device, or prohibited ammunition, whether one destroyed it oneself or becomes aware that an item formerly in one's possession was destroyed.",
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "107",
    {
      title: "False statements",
      severity: "Hybrid",
      maxPenalty: "5 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-107.html`,
      summary:
        "Makes it an offence to knowingly make a false report or statement to a peace, firearms, or chief firearms officer about the loss, theft, or destruction of a firearm, weapon, device, prohibited ammunition, authorization, licence, or registration certificate, and defines 'report or statement.'",
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "108",
    {
      title: "Tampering with serial number",
      severity: "Hybrid",
      maxPenalty: "5 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-108.html`,
      summary:
        "Makes it an offence, without lawful excuse, to alter, deface, or remove a firearm's serial number, or to possess a firearm knowing its serial number has been altered, defaced, or removed, subject to an exception and an evidentiary presumption regarding obliterated serial numbers.",
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "109",
    {
      title: "Mandatory prohibition order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-109.html`,
      summary:
        "Requires a court to impose a mandatory weapons prohibition order when a person is convicted or discharged of specified offences, including certain violent indictable offences, offences against an intimate partner or household member, and various firearms and drug offences.",
      relatedSections: ["730", "85", "95", "99", "264", "113"],
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "110",
    {
      title: "Discretionary prohibition order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-110.html`,
      summary:
        "Requires a sentencing court to consider whether a discretionary weapons prohibition order is desirable for safety reasons when a person is convicted or discharged of an offence involving violence or involving a firearm or similar item, and sets the order's duration.",
      relatedSections: ["730", "109", "113", "117"],
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "110.1",
    {
      title: "Application for emergency prohibition order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-110.1.html`,
      summary:
        "Allows a person to apply ex parte to a provincial court judge for an emergency order prohibiting another person from possessing firearms or similar items on safety grounds, permits the hearing to be held in private, and lets the judge make an emergency order lasting up to 30 days.",
      relatedSections: ["113", "114", "116", "110.4", "111", "112"],
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "110.2",
    {
      title: "Order denying access to information",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-110.2.html`,
      summary:
        "Allows a provincial court judge to make an order restricting access to and disclosure of information relating to an emergency prohibition order or related warrant or search, and sets when that order expires.",
      relatedSections: ["110.1", "110.4", "111"],
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "110.3",
    {
      title: "Order to delete identifying information",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-110.3.html`,
      summary:
        "Allows a provincial court judge to order that identifying information about the applicant for an emergency prohibition order be deleted from copies of related documents made available to the public, and sets the duration and procedure for such an order.",
      relatedSections: ["110.1", "110.2", "110.4", "111"],
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "110.4",
    {
      title: "Order under subsection 111(5)",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-110.4.html`,
      summary:
        "Lets a provincial court judge who makes an emergency prohibition order fix a hearing date for the related prohibition application and direct that notice be given, and sets related procedural rules including who becomes the applicant in certain cases.",
      relatedSections: ["110.1", "111"],
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "111",
    {
      title: "Application for prohibition order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-111.html`,
      summary:
        "Allows a peace, firearms, or chief firearms officer to apply to a provincial court judge for an order prohibiting a person from possessing firearms or similar items on safety grounds, and sets out the hearing process, including when it may proceed ex parte.",
      relatedSections: ["113", "114", "115", "116", "117"],
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "112",
    {
      title: "Revocation of prohibition order under subsection 110.1(3) or 111(5)",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-112.html`,
      summary:
        "Allows a provincial court judge to revoke a prohibition order made under subsection 110.1(3) or 111(5), on application by the person against whom it was made, if satisfied the circumstances that led to the order no longer exist.",
      relatedSections: ["110.1", "111"],
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "113",
    {
      title: "Lifting of prohibition order for sustenance or employment",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-113.html`,
      summary:
        "Allows a competent authority to order that a person subject to a prohibition order still be issued an authorization, licence, or registration certificate for sustenance hunting/trapping or employment purposes, after considering the person's criminal record, the offence, and safety.",
      relatedSections: ["109", "110", "110.1", "111", "117.05", "515"],
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "114",
    {
      title: "Requirement to surrender",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-114.html`,
      summary:
        "Allows a competent authority making a prohibition order to require the person to surrender prohibited items and related documents to a peace, firearms, or chief firearms officer within a specified period.",
      relatedSections: ["117.01"],
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "115",
    {
      title: "Forfeiture",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-115.html`,
      summary:
        "Provides that items whose possession is prohibited by a prohibition order are forfeited to the Crown if in the person's possession or seized/surrendered when the order begins, subject to an exception for certain order types, and that the Attorney General directs disposal of forfeited items.",
      relatedSections: ["110.1", "515"],
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "116",
    {
      title: "Authorizations revoked or amended",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-116.html`,
      summary:
        "Provides that an authorization, licence, or registration certificate relating to a prohibited item is revoked or amended when a prohibition order takes effect, with the revocation or amendment lasting only as long as certain types of orders remain in force.",
      relatedSections: ["110.1", "515"],
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "117",
    {
      title: "Return to owner",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-117.html`,
      summary:
        "Allows a competent authority to order that an item be returned to its rightful owner, or its value paid, where someone other than the person subject to the prohibition order owns the item and is lawfully entitled to possess it, subject to conditions about the owner's knowledge in certain cases.",
      relatedSections: ["115", "109", "110"],
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "117.01",
    {
      title: "Possession contrary to order",
      severity: "Hybrid",
      maxPenalty: "10 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-117.01.html`,
      summary:
        "Makes it an offence to possess a firearm, cross-bow, prohibited or restricted weapon, prohibited device, firearm part, ammunition, prohibited ammunition, or explosive substance while prohibited from doing so by an order made under this Act or any other Act of Parliament, and an offence to wilfully fail to surrender an authorization, licence, or registration certificate when required to do so by such an order. An exception applies to possession authorized under a licence issued following an order under subsection 113(1).",
      relatedSections: ["113"],
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "117.0101",
    {
      title: "Application for emergency limitations on access order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-117.0101.html`,
      summary:
        "Sets out the process for a person to apply ex parte to a provincial court judge for an emergency order limiting another person's access to firearms or related items, where the applicant believes that other person cohabits with or associates with someone already prohibited from possessing them. The judge may hear the application in private and, if satisfied of the circumstances, make a short-term order (up to 30 days) for any person's immediate protection.",
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "117.0102",
    {
      title: "Order denying access to information",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-117.0102.html`,
      summary:
        "Allows a provincial court judge, after an emergency limitations on access order is made, to order that information about that order, related warrants, or related searches and seizures be kept from disclosure to protect a person's security. Sets out when such a non-disclosure order expires.",
      relatedSections: ["117.0101", "117.0104", "117.011"],
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "117.0103",
    {
      title: "Order to delete identifying information",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-117.0103.html`,
      summary:
        "Allows a provincial court judge to order that identifying information about the person who applied for an emergency limitations on access order be deleted from copies of related documents before they are disclosed or made public, to protect that person's or others' security. The order's duration and procedure for handling the original and edited documents are set out.",
      relatedSections: ["117.0101", "117.0102", "117.0104", "117.011"],
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "117.0104",
    {
      title: "Order under subsection 117.011(5)",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-117.0104.html`,
      summary:
        "Sets out the procedure once a provincial court judge makes an emergency limitations on access order, including fixing a hearing date for a related application and giving notice to the person against whom the order is sought. Also clarifies how the application is treated and who becomes the applicant in certain cases.",
      relatedSections: ["117.0101", "117.011"],
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "117.011",
    {
      title: "Application for order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-117.011.html`,
      summary:
        "Allows a peace officer, firearms officer, or chief firearms officer to apply to a provincial court judge for an order limiting a person's access to firearms and related items, on the belief that the person cohabits with or associates with someone already prohibited from possessing them. Sets out the hearing process, including notice requirements and circumstances allowing the hearing to proceed ex parte.",
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "117.012",
    {
      title: "Revocation of order under subsection 117.0101(3) or 117.011(5)",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-117.012.html`,
      summary:
        "Allows a provincial court judge to revoke an emergency limitations on access order made under section 117.0101(3) or a limitations on access order made under section 117.011(5), on application by the person subject to it, if satisfied the circumstances that led to the order no longer exist.",
      relatedSections: ["117.0101", "117.011"],
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "117.02",
    {
      title: "Search and seizure without warrant where offence committed",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-117.02.html`,
      summary:
        "Allows a peace officer to search a person, vehicle, or place other than a dwelling-house without a warrant, and to seize weapons or related items, where there are reasonable grounds to believe a weapons offence is or was being committed and exigent circumstances make getting a warrant impracticable. Seized items are to be dealt with under sections 490 and 491.",
      relatedSections: ["490", "491"],
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "117.03",
    {
      title: "Seizure on failure to produce authorization",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-117.03.html`,
      summary:
        "Allows a peace officer to seize a firearm, prohibited weapon, restricted weapon, prohibited device, or prohibited ammunition from a person who fails to produce a required authorization, licence, or registration certificate on demand, unless possession is otherwise authorized or the person is under lawful supervision. Allows the seized item to be returned if the person produces the required documents within 14 days.",
      relatedSections: ["117.02"],
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "117.04",
    {
      title: "Application for warrant to search and seize",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-117.04.html`,
      summary:
        "Allows a justice to issue a warrant authorizing a peace officer to search a building, receptacle, or place and seize a weapon or related item and any related authorization or licence, where satisfied there are reasonable grounds that possession is not desirable for the safety of the person or others. Also allows a warrantless search and seizure by a peace officer in the same circumstances where danger to safety makes obtaining a warrant impracticable.",
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "117.05",
    {
      title: "Application for disposition",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-117.05.html`,
      summary:
        "Sets out the process for a justice to hold a hearing, on a peace officer's application, to decide the disposition of a thing or document seized under section 117.04, including notice requirements and when the hearing may proceed without the person present. Where the justice finds possession undesirable for safety reasons, the section provides for forfeiture and a prohibition order.",
      relatedSections: ["117.04", "113", "114", "115", "116", "117"],
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "117.06",
    {
      title: "Where no finding or application",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-117.06.html`,
      summary:
        "Requires a thing or document seized under section 117.04 to be returned to the person it was seized from if no disposition application is made within 30 days, or if an application is made but the justice does not make the relevant safety finding. Also allows the justice to order restoration of a revoked authorization, licence, or registration certificate when the seized item is returned.",
      relatedSections: ["117.04", "117.05"],
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "117.07",
    {
      title: "Public officers",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-117.07.html`,
      summary:
        "Exempts a public officer from being guilty of certain firearms and weapons offences where the listed conduct — such as possessing, manufacturing, transferring, exporting, importing, or altering a firearm, or failing to report loss or theft — occurs in the course of their duties or employment, subject to section 117.1.",
      relatedSections: ["117.1"],
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "117.071",
    {
      title: "Preclearance officers",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-117.071.html`,
      summary:
        "Exempts a preclearance officer, as defined in the Preclearance Act, 2016, from being guilty of certain firearms and weapons offences where the listed conduct — possessing, transferring, exporting, importing, or failing to report loss, theft, or destruction — occurs in the course of their duties or employment, subject to section 117.1.",
      relatedSections: ["117.1"],
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "117.08",
    {
      title: "Individuals acting for police force, Canadian Forces and visiting forces",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-117.08.html`,
      summary:
        "Exempts an individual from being guilty of certain firearms and weapons offences — including possession, manufacture, transfer, export, import, alteration, failure to report, or altering a serial number — when done on behalf of, and under the authority of, a police force, the Canadian Forces, a visiting force, or a department of the Government of Canada or of a province, subject to section 117.1.",
      relatedSections: ["117.1"],
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "117.09",
    {
      title: "Employees of business with licence",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-117.09.html`,
      summary:
        "Exempts a licensed individual employed by a licensed business from certain firearms and weapons offences — such as possessing, manufacturing, or transferring prohibited items, or altering a firearm for rapid fire or altering its serial number — when acting in the course of their duties in relation to the business's authorized activities, subject to section 117.1.",
      relatedSections: ["117.1"],
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "117.1",
    {
      title: "Restriction",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-117.1.html`,
      summary:
        "States that the exemptions in sections 117.07 to 117.09 do not apply if the public officer or individual is subject to a prohibition order and acts contrary to that order or to an authorization or licence issued under an order made under subsection 113(1).",
      relatedSections: ["117.07", "117.08", "117.09", "113"],
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "117.11",
    {
      title: "Onus on the accused",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-117.11.html`,
      summary:
        "Places the onus on the accused, in proceedings for certain listed offences, to prove that a person is the holder of an authorization, licence, or registration certificate when that question arises.",
      relatedSections: ["89", "90", "91", "93", "101"],
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "117.12",
    {
      title: "Authorizations, etc., as evidence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-117.12.html`,
      summary:
        "Provides that a document purporting to be an authorization, licence, or registration certificate is evidence of its contents in proceedings under the Act or other federal law, and that a certified true copy of such a document is admissible with the same evidentiary weight as the original.",
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "117.13",
    {
      title: "Certificate of analyst",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-117.13.html`,
      summary:
        "Allows a certificate signed by an analyst stating the results of analyzing a weapon, prohibited device, ammunition, or explosive substance to be used as evidence in proceedings without proof of the analyst's signature, subject to advance notice being given and the opposing party's right to require the analyst's attendance for cross-examination with leave of the court.",
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "117.14",
    {
      title: "Amnesty period",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-117.14.html`,
      summary:
        "Allows the Governor in Council to declare an amnesty period during which a person in possession of certain weapons or related items may deliver, register, destroy, dispose of, or alter them as specified in the order without committing an offence under this Part. Proceedings taken against a person for anything done in accordance with such an order are a nullity.",
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "117.15",
    {
      title: "Regulations",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-117.15.html`,
      summary:
        "Allows the Governor in Council to make regulations prescribing anything that this Part permits or requires to be prescribed, but bars prescribing something as a prohibited or restricted firearm, weapon, device, or ammunition if it is reasonable for hunting or sporting use in Canada.",
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],

  // ── Part IV — Offences Against the Administration of Law and Justice ──
  [
    "118",
    {
      title: "Definitions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-118.html`,
      summary:
        "Defines terms used in this Part, including evidence or statement, government, judicial proceeding, office, official, and witness.",
      partOf: "Part IV — Offences Against the Administration of Law and Justice",
    },
  ],
  [
    "119",
    {
      title: "Bribery of judicial officers, etc.",
      severity: "Indictable",
      maxPenalty: "14 years indictable",
      url: `${JUSTICE_LAWS_BASE}/section-119.html`,
      summary:
        "Makes it an offence for a holder of judicial office or a member of Parliament or a provincial legislature to corruptly accept or seek a benefit in relation to their official duties, and an offence to corruptly give or offer such a benefit to such a person. Proceedings against a judicial officeholder require the written consent of the Attorney General of Canada.",
      partOf: "Part IV — Offences Against the Administration of Law and Justice",
    },
  ],
  [
    "120",
    {
      title: "Bribery of officers",
      severity: "Indictable",
      maxPenalty: "14 years indictable",
      url: `${JUSTICE_LAWS_BASE}/section-120.html`,
      summary:
        "Makes it an offence for a justice, police commissioner, peace officer, public officer, or person employed in criminal law administration to corruptly accept or seek a benefit with intent to interfere with justice, facilitate an offence, or protect someone from detection or punishment, and an offence to corruptly give or offer such a benefit for those purposes.",
      partOf: "Part IV — Offences Against the Administration of Law and Justice",
    },
  ],
  [
    "121",
    {
      title: "Frauds on the government",
      severity: "Hybrid",
      maxPenalty: "5 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-121.html`,
      summary:
        "Makes it an offence to give, offer, demand, or accept a loan, reward, advantage, or benefit connected to dealings or business with the government, or a claim against Her Majesty, including paying a commission or benefit to a government employee or official in connection with those dealings without the written consent of the head of the relevant branch of government, or that employee or official demanding or accepting such a benefit without that consent.",
      partOf: "Part IV — Offences Against the Administration of Law and Justice",
    },
  ],
  [
    "121.1",
    {
      title: "Selling, etc., of tobacco products and raw leaf tobacco",
      severity: "Hybrid",
      maxPenalty: "5 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-121.1.html`,
      summary:
        "Prohibits selling, offering for sale, transporting, delivering, distributing, or possessing for sale a tobacco product or unpackaged raw leaf tobacco unless it is stamped, subject to listed exceptions including for tobacco growers holding certain raw leaf tobacco.",
      partOf: "Part IV — Offences Against the Administration of Law and Justice",
    },
  ],
  [
    "122",
    {
      title: "Breach of trust by public officer",
      severity: "Hybrid",
      maxPenalty: "5 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-122.html`,
      summary:
        "Makes it an offence for an official to commit fraud or breach of trust in connection with the duties of their office, whether or not the same conduct would be an offence if done by a private person.",
      partOf: "Part IV — Offences Against the Administration of Law and Justice",
    },
  ],
  [
    "123",
    {
      title: "Municipal corruption",
      severity: "Hybrid",
      maxPenalty: "5 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-123.html`,
      summary:
        "Makes it an offence to give, offer, or agree to give a loan, reward, advantage, or benefit to a municipal official — or for a municipal official to demand, accept, or agree to accept one — in exchange for the official abstaining or voting a certain way, aiding or preventing a council decision, or performing or failing to perform an official act. Also makes it an offence to influence or attempt to influence a municipal official to do those things through suppression of the truth, threats, deceit, or other unlawful means, and defines municipal official.",
      partOf: "Part IV — Offences Against the Administration of Law and Justice",
    },
  ],
  [
    "124",
    {
      title: "Selling or purchasing office",
      severity: "Hybrid",
      maxPenalty: "5 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-124.html`,
      summary:
        "Makes it an offence to purport to sell or agree to sell an appointment to or resignation from an office, or a consent to such an appointment or resignation, or to receive a reward for the purported sale, and an offence to purport to purchase or pay a reward for such a purchase.",
      partOf: "Part IV — Offences Against the Administration of Law and Justice",
    },
  ],
  [
    "125",
    {
      title: "Influencing or negotiating appointments or dealing in offices",
      severity: "Hybrid",
      maxPenalty: "5 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-125.html`,
      summary:
        "Makes it an offence to give, receive, or procure a reward, advantage, or benefit as consideration for helping secure someone's appointment to an office, to solicit, recommend, or negotiate an appointment or resignation in expectation of such a benefit, or to keep a place for transacting business relating to filling, buying, or selling offices without lawful authority.",
      partOf: "Part IV — Offences Against the Administration of Law and Justice",
    },
  ],
  [
    "126",
    {
      title: "Disobeying a statute",
      severity: "Hybrid",
      maxPenalty: "2 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-126.html`,
      summary:
        "Makes it an offence, without lawful excuse, to intentionally contravene an Act of Parliament by doing something it forbids or omitting something it requires, unless another punishment is expressly provided by law. Proceedings for contravening an Act other than this one may be instituted and conducted by or on behalf of the Government of Canada.",
      partOf: "Part IV — Offences Against the Administration of Law and Justice",
    },
  ],
  [
    "127",
    {
      title: "Disobeying order of court",
      severity: "Hybrid",
      maxPenalty: "2 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-127.html`,
      summary:
        "Makes it an offence, without lawful excuse, to disobey a lawful order made by a court or an authorized person or body, other than an order to pay money, unless another punishment or procedure is expressly provided by law. Where the order arose from proceedings brought by the Government of Canada, related contravention proceedings may also be brought by or on behalf of that Government.",
      partOf: "Part IV — Offences Against the Administration of Law and Justice",
    },
  ],
  [
    "128",
    {
      title: "Misconduct of officers executing process",
      severity: "Hybrid",
      maxPenalty: "2 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-128.html`,
      summary:
        "Makes it an offence for a peace officer or coroner entrusted with executing a legal process to intentionally misconduct themselves in executing it or to make a false return to the process.",
      partOf: "Part IV — Offences Against the Administration of Law and Justice",
    },
  ],
  [
    "129",
    {
      title: "Offences relating to public or peace officer",
      severity: "Hybrid",
      maxPenalty: "2 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-129.html`,
      summary:
        "Makes it an offence to resist or wilfully obstruct a public officer or peace officer in the execution of their duty, or anyone lawfully assisting them, to fail without reasonable excuse to assist an officer when properly called on to help arrest a person or preserve the peace, or to resist or wilfully obstruct a person lawfully executing a process against land or goods or making a lawful seizure.",
      partOf: "Part IV — Offences Against the Administration of Law and Justice",
    },
  ],
  [
    "130",
    {
      title: "Personating peace officer",
      severity: "Hybrid",
      maxPenalty: "5 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-130.html`,
      summary:
        "Makes it an offence to falsely claim to be a peace officer or public officer, or to use a badge or uniform item in a way likely to make people believe one is a peace officer or public officer.",
      partOf: "Part IV — Offences Against the Administration of Law and Justice",
    },
  ],
  [
    "130.1",
    {
      title: "Aggravating circumstance",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-130.1.html`,
      summary:
        "Directs a sentencing court to treat it as an aggravating circumstance if a person convicted under section 130 personated a peace officer or public officer for the purpose of facilitating the commission of another offence.",
      relatedSections: ["130"],
      partOf: "Part IV — Offences Against the Administration of Law and Justice",
    },
  ],
  [
    "131",
    {
      title: "Perjury",
      severity: "Indictable",
      maxPenalty: "14 years",
      url: `${JUSTICE_LAWS_BASE}/section-131.html`,
      summary:
        "Defines perjury as intentionally making a false statement, knowing it is false, under oath, solemn affirmation, affidavit, declaration or deposition before someone authorized to take it, including certain statements given by video link or under specified mutual legal assistance provisions; it applies whether or not the statement was made in a judicial proceeding, but not to statements by a person not authorized or required by law to make them.",
      partOf: "Part IV — Offences Against the Administration of Law and Justice",
    },
  ],
  [
    "132",
    {
      title: "Punishment",
      severity: "Indictable",
      maxPenalty: "14 years indictable",
      url: `${JUSTICE_LAWS_BASE}/section-132.html`,
      summary:
        "States that committing perjury is an indictable offence punishable by imprisonment for up to fourteen years.",
      partOf: "Part IV — Offences Against the Administration of Law and Justice",
    },
  ],
  [
    "133",
    {
      title: "Corroboration",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-133.html`,
      summary:
        "Provides that a person cannot be convicted of an offence under section 132 (perjury) on the evidence of only one witness unless that witness's evidence is corroborated in a material way by other evidence implicating the accused.",
      relatedSections: ["132"],
      partOf: "Part IV — Offences Against the Administration of Law and Justice",
    },
  ],
  [
    "134",
    {
      title: "Idem",
      severity: "Summary",
      maxPenalty: "Summary conviction (s. 787 default penalty applies unless otherwise stated)",
      url: `${JUSTICE_LAWS_BASE}/section-134.html`,
      summary:
        "Makes it an offence to knowingly make a false statement under oath or solemn affirmation before an authorized person when not specially permitted, authorized or required by law to make such a statement, except where the statement is made during a criminal investigation.",
      partOf: "Part IV — Offences Against the Administration of Law and Justice",
    },
  ],
  [
    "136",
    {
      title: "Witness giving contradictory evidence",
      severity: "Indictable",
      maxPenalty: "14 years indictable",
      url: `${JUSTICE_LAWS_BASE}/section-136.html`,
      summary:
        "Makes it an offence for a witness to give evidence in a judicial proceeding that contradicts evidence the person previously gave in another judicial proceeding, where the court is satisfied beyond a reasonable doubt the person intended to mislead; certain evidence is deemed given in a judicial proceeding for this purpose, non-material evidence is excluded, a certificate can prove the earlier proceeding occurred, and prosecution requires the Attorney General's consent.",
      relatedSections: ["714.1", "714.2", "714.3", "118"],
      partOf: "Part IV — Offences Against the Administration of Law and Justice",
    },
  ],
  [
    "137",
    {
      title: "Fabricating evidence",
      severity: "Indictable",
      maxPenalty: "14 years indictable",
      url: `${JUSTICE_LAWS_BASE}/section-137.html`,
      summary:
        "Makes it an offence to fabricate something with intent that it be used as evidence in an existing or proposed judicial proceeding, with intent to mislead, by means other than perjury or incitement to perjury.",
      partOf: "Part IV — Offences Against the Administration of Law and Justice",
    },
  ],
  [
    "138",
    {
      title: "Offences relating to affidavits",
      severity: "Hybrid",
      maxPenalty: "2 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-138.html`,
      summary:
        "Makes it an offence to sign a document as if it were a properly sworn or declared affidavit or statutory declaration when it was not (including when the signer knows they lack authority to administer the oath), to knowingly use or offer such a falsely-purporting document, or to sign as the affiant or declarant a document falsely purporting to have been sworn or declared.",
      partOf: "Part IV — Offences Against the Administration of Law and Justice",
    },
  ],
  [
    "139",
    {
      title: "Obstructing justice",
      severity: "Hybrid",
      maxPenalty: "10 years indictable, or summary conviction available, for the general obstruction offence (s. 139(2)); 2 years indictable, or summary conviction available, for the surety-related obstruction offence in s. 139(1).",
      url: `${JUSTICE_LAWS_BASE}/section-139.html`,
      summary:
        "Makes it an offence to wilfully attempt to obstruct, pervert or defeat the course of justice in a judicial proceeding, including by indemnifying a surety or, as a surety, accepting payment for release from custody, and separately makes it an offence to intentionally attempt to obstruct, pervert or defeat justice in any other manner; it also deems certain conduct, such as dissuading a witness or influencing a juror through threats or bribes, to constitute wilfully obstructing justice.",
      partOf: "Part IV — Offences Against the Administration of Law and Justice",
    },
  ],
  [
    "140",
    {
      title: "Public mischief",
      severity: "Hybrid",
      maxPenalty: "5 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-140.html`,
      summary:
        "Makes it an offence to intentionally mislead a peace officer into starting or continuing an investigation by falsely accusing someone of an offence, diverting suspicion, falsely reporting that an offence occurred, or falsely reporting that a person has died.",
      partOf: "Part IV — Offences Against the Administration of Law and Justice",
    },
  ],
  [
    "141",
    {
      title: "Compounding indictable offence",
      severity: "Hybrid",
      maxPenalty: "2 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-141.html`,
      summary:
        "Makes it an offence to ask for, obtain, or agree to receive payment for agreeing to compound or conceal an indictable offence, except where the payment is for compensation, restitution or services under an agreement made with the Attorney General's consent or as part of an approved diversion program.",
      partOf: "Part IV — Offences Against the Administration of Law and Justice",
    },
  ],
  [
    "142",
    {
      title: "Corruptly taking reward for recovery of goods",
      severity: "Hybrid",
      maxPenalty: "5 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-142.html`,
      summary:
        "Makes it an offence to corruptly accept payment, directly or indirectly, under the pretence of helping someone recover property obtained through an indictable offence.",
      partOf: "Part IV — Offences Against the Administration of Law and Justice",
    },
  ],
  [
    "144",
    {
      title: "Prison breach",
      severity: "Hybrid",
      maxPenalty: "10 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-144.html`,
      summary:
        "Makes it an offence to break out of a prison by force or violence with intent to free oneself or another confined person, or to forcibly break out of or breach a cell or other part of a prison with intent to escape.",
      partOf: "Part IV — Offences Against the Administration of Law and Justice",
    },
  ],
  [
    "145",
    {
      title: "Escape and being at large without excuse",
      severity: "Hybrid",
      maxPenalty: "2 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-145.html`,
      summary:
        "Makes it an offence to escape from lawful custody or to be unlawfully at large before a sentence expires, and separately makes it an offence to fail without lawful excuse to attend court, surrender, or comply with a release order, undertaking or related court order, or to fail to appear under an appearance notice or summons; it also sets out what is not a lawful excuse, an exception where the Crown elects under the Contraventions Act, and rules on proving these facts by certificate, including a right to cross-examine the certifier.",
      relatedSections: ["515.01", "515", "516.1", "522", "508"],
      partOf: "Part IV — Offences Against the Administration of Law and Justice",
    },
  ],
  [
    "146",
    {
      title: "Permitting or assisting escape",
      severity: "Hybrid",
      maxPenalty: "2 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-146.html`,
      summary:
        "Makes it an offence to permit a person in one's lawful custody to escape by failing a legal duty, to convey anything into a prison intending to facilitate an escape, or to direct or procure a prisoner's discharge under pretended authority when the prisoner is not entitled to be discharged.",
      partOf: "Part IV — Offences Against the Administration of Law and Justice",
    },
  ],
  [
    "147",
    {
      title: "Rescue or permitting escape",
      severity: "Hybrid",
      maxPenalty: "5 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-147.html`,
      summary:
        "Makes it an offence to rescue a person from lawful custody or help someone escape or attempt to escape, or for a peace officer or prison official to wilfully permit a person in their custody to escape.",
      partOf: "Part IV — Offences Against the Administration of Law and Justice",
    },
  ],
  [
    "148",
    {
      title: "Assisting prisoner of war to escape",
      severity: "Hybrid",
      maxPenalty: "5 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-148.html`,
      summary:
        "Makes it an offence to knowingly assist a prisoner of war to escape from detention in Canada or from being at large on parole.",
      partOf: "Part IV — Offences Against the Administration of Law and Justice",
    },
  ],
  [
    "149",
    {
      title: "Service of term for escape",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-149.html`,
      summary:
        "Allows a court, when convicting a person of escaping while imprisoned, to order that the sentence be served in a penitentiary even if it is less than two years, and defines escape for this purpose as breaking prison, escaping lawful custody, or being unlawfully at large before a sentence ends.",
      relatedSections: ["743.1"],
      partOf: "Part IV — Offences Against the Administration of Law and Justice",
    },
  ],

  // ── Part V — Sexual Offences, Public Morals and Disorderly Conduct ──
  [
    "150",
    {
      title: "Definitions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-150.html`,
      summary:
        "Defines terms used in this Part of the Act, including guardian, public place, sexual organs, and theatre.",
      partOf: "Part V — Sexual Offences, Public Morals and Disorderly Conduct",
    },
  ],
  [
    "150.1",
    {
      title: "Consent no defence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-150.1.html`,
      summary:
        "Sets out rules on when a complainant's consent is not a defence to certain sexual offences involving young complainants, including limited close-in-age exceptions for complainants aged 12-13 and 14-15, transitional exceptions, an exemption from trial for accused aged 12 or 13 in specified circumstances, and rules that mistaken belief in a complainant's age is not a defence unless the accused took all reasonable steps to ascertain age.",
      relatedSections: ["151", "152", "153", "160", "173", "271"],
      partOf: "Part V — Sexual Offences, Public Morals and Disorderly Conduct",
    },
  ],
  [
    "151",
    {
      title: "Sexual interference",
      severity: "Hybrid",
      maxPenalty: "14 years indictable; mandatory minimum 1 year (indictable) / 90 days (summary)",
      url: `${JUSTICE_LAWS_BASE}/section-151.html`,
      definition:
        "Every person who, for a sexual purpose, touches, directly or indirectly, with a part of the body or with an object, any part of the body of a person under the age of 16 years is guilty of an offence.",
      relatedSections: ["152", "153", "271"],
      defences: ["mistaken belief in age (s. 150.1)"],
      topicsTagged: ["sexual offence", "child", "minor"],
      partOf: "Part V — Sexual Offences, Public Morals and Disorderly Conduct",
    },
  ],
  [
    "152",
    {
      title: "Invitation to sexual touching or exposure",
      severity: "Hybrid",
      maxPenalty: "14 years indictable, minimum 1 year; 2 years less a day summary, minimum 90 days.",
      url: `${JUSTICE_LAWS_BASE}/section-152.html`,
      definition:
        "Every person commits an offence who, for a sexual purpose, invites, counsels or incites a person under the age of 16 years to touch, directly or indirectly, with a part of the body or with an object, their own body, the body of the person who so invites, counsels or incites, or the body of any other person, or to expose their own sexual organs.",
      relatedSections: ["151", "153", "271"],
      defences: ["mistaken belief in age (s. 150.1)"],
      topicsTagged: ["sexual offence", "child", "minor"],
      partOf: "Part V — Sexual Offences, Public Morals and Disorderly Conduct",
    },
  ],
  [
    "153",
    {
      title: "Sexual exploitation",
      severity: "Hybrid",
      maxPenalty: "14 years indictable, minimum 1 year; 2 years less a day summary, minimum 90 days.",
      url: `${JUSTICE_LAWS_BASE}/section-153.html`,
      definition:
        "Every person commits an offence who is in a position of trust or authority towards a young person, who is a person with whom the young person is in a relationship of dependency, or who is in a relationship with the young person that is exploitative of the young person, and who, for a sexual purpose, touches, directly or indirectly, with a part of the body or with an object, any part of the body of the young person; invites, counsels or incites the young person to touch, directly or indirectly, with a part of the body or with an object, their own body, the body of the person who so invites, counsels or incites, or the body of any other person; or invites, counsels or incites the young person to expose their own sexual organs. A judge may infer that a relationship is exploitative from factors including the young person's age, the age difference between the parties, how the relationship developed, and the degree of control or influence the person has over the young person. For the purposes of this section, a young person is a person 16 years of age or more but under the age of eighteen years.",
      relatedSections: ["151", "152", "153.1"],
      defences: [],
      topicsTagged: ["sexual offence", "exploitation", "trust", "young person"],
      partOf: "Part V — Sexual Offences, Public Morals and Disorderly Conduct",
    },
  ],
  [
    "153.1",
    {
      title: "Sexual exploitation of person with disability",
      severity: "Hybrid",
      maxPenalty: "10 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-153.1.html`,
      summary:
        "Makes it an offence for a person in a position of trust or authority toward, or in a relationship of dependency with, a person with a mental or physical disability to counsel or incite that person, for a sexual purpose and without consent, to touch a body or expose sexual organs; it defines consent, lists circumstances in which no consent is obtained, and sets out when a belief in consent is not available as a defence.",
      relatedSections: ["265"],
      partOf: "Part V — Sexual Offences, Public Morals and Disorderly Conduct",
    },
  ],
  [
    "155",
    {
      title: "Incest",
      severity: "Indictable",
      maxPenalty: "14 years indictable; minimum 5 years if the other person is under 16 years of age",
      url: `${JUSTICE_LAWS_BASE}/section-155.html`,
      summary:
        "Makes it an offence to have sexual intercourse with a person one knows by blood relationship to be a parent, child, sibling, grandparent or grandchild, provides a defence where the accused acted under restraint, duress or fear, and defines brother and sister to include half-siblings.",
      partOf: "Part V — Sexual Offences, Public Morals and Disorderly Conduct",
    },
  ],
  [
    "156",
    {
      title: "Historical offences",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-156.html`,
      summary:
        "Provides that a person cannot be convicted of a historical sexual offence under an earlier version of the Act unless the alleged conduct would still be an offence under the Act as it reads at the time the charge is laid.",
      partOf: "Part V — Sexual Offences, Public Morals and Disorderly Conduct",
    },
  ],
  [
    "160",
    {
      title: "Bestiality",
      severity: "Hybrid",
      maxPenalty: "10 years indictable, or summary conviction available, for the base bestiality or compelling-bestiality offence; 14 years indictable with a 1-year minimum, or 2 years less a day summary with a 6-month minimum, if committed in the presence of or incited in a person under 16 (s. 160(3)); 5 years indictable, or summary conviction available, for the separate representation-of-bestiality offence (s. 160(3.1), (3.4)).",
      url: `${JUSTICE_LAWS_BASE}/section-160.html`,
      summary:
        "Makes it an offence to commit bestiality, to compel another person to commit bestiality, to commit bestiality in the presence of a person under 16, or to incite a person under 16 to commit bestiality, and separately makes it an offence to publish or distribute a visual representation likely to be mistaken for a recording of bestiality, subject to a public good defence; it also allows a court to order prohibition from owning or being near animals and restitution of care costs, and defines bestiality.",
      partOf: "Part V — Sexual Offences, Public Morals and Disorderly Conduct",
    },
  ],
  [
    "161",
    {
      title: "Order of prohibition",
      severity: "Hybrid",
      maxPenalty: "4 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-161.html`,
      summary:
        "Allows a court sentencing or discharging an offender convicted of a listed sexual offence against a person under 18 to make an order prohibiting the offender from being near places where children are likely present, seeking positions of trust or authority over children, contacting a person under 18, or using the Internet, sets the duration and variation of such orders, and makes breach of the order an offence.",
      relatedSections: ["151", "152", "153", "155", "160", "163.1"],
      partOf: "Part V — Sexual Offences, Public Morals and Disorderly Conduct",
    },
  ],
  [
    "162",
    {
      title: "Voyeurism",
      severity: "Hybrid",
      maxPenalty: "10 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-162.html`,
      summary:
        "Makes it an offence to surreptitiously observe or visually record a person in circumstances giving rise to a reasonable expectation of privacy in specified situations, such as where the person is nude or engaged in explicit sexual activity or the observation is for a sexual purpose, exempts peace officers acting under a warrant, and separately makes it an offence to print, publish or distribute a recording known to have been obtained through such an offence, subject to a public good defence.",
      relatedSections: ["487.01"],
      partOf: "Part V — Sexual Offences, Public Morals and Disorderly Conduct",
    },
  ],
  [
    "162.1",
    {
      title: "Publication, etc., of an intimate image without consent",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-162.1.html`,
      summary:
        "Makes it an offence to knowingly or recklessly publish, distribute or make available an intimate image of a person without that person's consent, and separately makes it an offence to threaten to do so, defines intimate image to include certain AI-generated depictions, and provides a public good defence.",
      partOf: "Part V — Sexual Offences, Public Morals and Disorderly Conduct",
    },
  ],
  [
    "162.2",
    {
      title: "Prohibition order",
      severity: "Hybrid",
      maxPenalty: "4 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-162.2.html`,
      summary:
        "Allows a court sentencing or discharging an offender convicted under section 160(3.1) or 162.1 to order a prohibition on using the Internet or other digital network, sets the duration and variation of such an order, and makes breach of the order an offence.",
      relatedSections: ["160", "162.1"],
      partOf: "Part V — Sexual Offences, Public Morals and Disorderly Conduct",
    },
  ],
  [
    "163",
    {
      title: "Obscene materials",
      severity: "Hybrid",
      maxPenalty: "2 years indictable, or summary conviction available (s. 169).",
      url: `${JUSTICE_LAWS_BASE}/section-163.html`,
      summary:
        "Makes it an offence to make, print, publish, distribute or possess for distribution any obscene matter, and separately makes it an offence to knowingly sell, expose to public view or publicly exhibit obscene material or a disgusting object or indecent show without lawful justification, subject to a public good defence, and deems a publication obscene if its dominant characteristic is undue exploitation of sex combined with crime, horror, cruelty or violence.",
      partOf: "Part V — Sexual Offences, Public Morals and Disorderly Conduct",
    },
  ],
  [
    "163.1",
    {
      title: "Definition of child sexual abuse and exploitation material",
      severity: "Hybrid",
      maxPenalty: "14 years, indictable only, minimum 1 year (making/distributing, s. 163.1(2)-(3)); 10 years indictable minimum 1 year / 2 years less a day summary minimum 6 months (possession/accessing/threat to publish, s. 163.1(4)-(4.21))",
      url: `${JUSTICE_LAWS_BASE}/section-163.1.html`,
      summary:
        "Defines child sexual abuse and exploitation material and makes it separate offences to make or possess for publication such material, to distribute or possess it for distribution, to simply possess it, to access it, and to threaten to publish or distribute it, while setting out limited defences relating to reasonable steps to verify age or legitimate purposes that pose no undue risk of harm.",
      partOf: "Part V — Sexual Offences, Public Morals and Disorderly Conduct",
    },
  ],
  [
    "164",
    {
      title: "Warrant of seizure",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-164.html`,
      summary:
        "Allows a judge to issue a warrant to seize copies of material believed to be illicit material kept for sale or distribution, sets out a process for summoning the occupier, hearing the owner or maker, and ordering forfeiture or restoration of the material, provides an appeal right, and defines terms including court and illicit material.",
      relatedSections: ["160", "162", "162.1", "163", "163.1", "286.4"],
      partOf: "Part V — Sexual Offences, Public Morals and Disorderly Conduct",
    },
  ],
  [
    "164.1",
    {
      title: "Warrant of seizure — material on computer system",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-164.1.html`,
      summary:
        "Allows a judge to order the custodian of a computer system to provide a copy of, remove access to, and identify the poster of material believed to be illicit material online, sets out notice and hearing procedures for the person who posted it, and allows the court to order deletion of the material, including within 48 hours for a non-consensual intimate image.",
      relatedSections: ["162.1", "342.1", "164"],
      partOf: "Part V — Sexual Offences, Public Morals and Disorderly Conduct",
    },
  ],
  [
    "164.2",
    {
      title: "Forfeiture after conviction",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-164.2.html`,
      summary:
        "Allows a court, on application of the Attorney General, to order forfeiture of property used in committing certain sexual offences involving images, sets out third-party notice and interest rights, and provides appeal rights to third parties and the Attorney General.",
      relatedSections: ["162.1", "163.1", "172.1", "172.2"],
      partOf: "Part V — Sexual Offences, Public Morals and Disorderly Conduct",
    },
  ],
  [
    "164.3",
    {
      title: "Relief from forfeiture",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-164.3.html`,
      summary:
        "Sets out the process by which a person who claims an interest in property forfeited under s.164.2 can apply to a judge, within thirty days, for a declaration that their interest is unaffected by the forfeiture, including notice, hearing, appeal, and return-of-property procedures.",
      relatedSections: ["164.2"],
      partOf: "Part V — Sexual Offences, Public Morals and Disorderly Conduct",
    },
  ],
  [
    "167",
    {
      title: "Immoral theatrical performance",
      severity: "Summary",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-167.html`,
      summary:
        "Makes it an offence for a theatre's lessee, manager, agent, or person in charge to present or allow an immoral, indecent, or obscene performance, and separately makes it an offence to take part in such a performance.",
      partOf: "Part V — Sexual Offences, Public Morals and Disorderly Conduct",
    },
  ],
  [
    "168",
    {
      title: "Mailing obscene matter",
      severity: "Hybrid",
      maxPenalty: "2 years indictable, or summary conviction available (s. 169).",
      url: `${JUSTICE_LAWS_BASE}/section-168.html`,
      summary:
        "Makes it an offence to use the mails to transmit or deliver obscene, indecent, immoral, or scurrilous matter, subject to exceptions for materials connected to judicial proceedings, court-directed notices, law reports, and technical legal or medical publications.",
      partOf: "Part V — Sexual Offences, Public Morals and Disorderly Conduct",
    },
  ],
  [
    "169",
    {
      title: "Punishment",
      severity: "Hybrid",
      maxPenalty: "2 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-169.html`,
      summary:
        "Sets out that a person who commits an offence under section 163, 165, 167, or 168 is guilty of either an indictable offence or an offence punishable on summary conviction.",
      relatedSections: ["163", "167", "168"],
      partOf: "Part V — Sexual Offences, Public Morals and Disorderly Conduct",
    },
  ],
  [
    "169.1",
    {
      title: "Recruitment — young person",
      severity: "Hybrid",
      maxPenalty: "5 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-169.1.html`,
      summary:
        "Makes it an offence for a person in a position of trust, power, or authority over a young person under 18 to recruit, counsel, encourage, or invite that young person to become a party to certain offences, if the young person later does so; belief the person was 18 or older is not a defence unless reasonable steps were taken to verify age.",
      partOf: "Part V — Sexual Offences, Public Morals and Disorderly Conduct",
    },
  ],
  [
    "170",
    {
      title: "Parent or guardian procuring sexual activity",
      severity: "Indictable",
      maxPenalty: "14 years indictable; minimum one year",
      url: `${JUSTICE_LAWS_BASE}/section-170.html`,
      summary:
        "Makes it an offence for a parent or guardian of a person under 18 to procure that person for the purpose of engaging in prohibited sexual activity with someone other than the parent or guardian.",
      partOf: "Part V — Sexual Offences, Public Morals and Disorderly Conduct",
    },
  ],
  [
    "171",
    {
      title: "Householder permitting prohibited sexual activity",
      severity: "Indictable",
      maxPenalty: "14 years indictable; minimum one year",
      url: `${JUSTICE_LAWS_BASE}/section-171.html`,
      summary:
        "Makes it an offence for an owner, occupier, manager, or other person with control of premises to knowingly permit a person under 18 to be on the premises for the purpose of engaging in prohibited sexual activity.",
      partOf: "Part V — Sexual Offences, Public Morals and Disorderly Conduct",
    },
  ],
  [
    "171.1",
    {
      title: "Making sexually explicit material available to child",
      severity: "Hybrid",
      maxPenalty: "14 years, minimum 6 months indictable; 2 years less a day, minimum 90 days summary",
      url: `${JUSTICE_LAWS_BASE}/section-171.1.html`,
      summary:
        "Makes it an offence to transmit, make available, distribute, or sell sexually explicit material to a person believed to be under 18, 16, or 14 years old for the purpose of facilitating specified sexual or exploitation offences against them, and defines what counts as sexually explicit material for this purpose.",
      relatedSections: ["153", "155", "163.1", "170", "171", "279.011"],
      partOf: "Part V — Sexual Offences, Public Morals and Disorderly Conduct",
    },
  ],
  [
    "172",
    {
      title: "Corrupting children",
      severity: "Hybrid",
      maxPenalty: "2 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-172.html`,
      summary:
        "Makes it an offence for a person to participate in adultery, sexual immorality, or habitual drunkenness or other vice in a child's home in a way that endangers the child's morals or makes the home unfit, and requires Attorney General consent (or referral by a child-protection society or juvenile court officer) to prosecute.",
      partOf: "Part V — Sexual Offences, Public Morals and Disorderly Conduct",
    },
  ],
  [
    "172.1",
    {
      title: "Luring a child",
      severity: "Hybrid",
      maxPenalty: "14 years indictable, minimum one year; 2 years less a day summary, minimum six months",
      url: `${JUSTICE_LAWS_BASE}/section-172.1.html`,
      summary:
        "Makes it an offence to communicate by telecommunication with a person believed to be under 18, 16, or 14 for the purpose of facilitating specified sexual offences against them, and states that a mistaken belief about the person's age is not a defence unless reasonable steps were taken to verify it.",
      relatedSections: ["153", "155", "163.1", "170", "171", "279.011"],
      partOf: "Part V — Sexual Offences, Public Morals and Disorderly Conduct",
    },
  ],
  [
    "172.2",
    {
      title: "Agreement or arrangement — sexual offence against child",
      severity: "Hybrid",
      maxPenalty: "14 years indictable, minimum one year; 2 years less a day summary, minimum six months",
      url: `${JUSTICE_LAWS_BASE}/section-172.2.html`,
      summary:
        "Makes it an offence to agree or arrange by telecommunication with another person to commit specified sexual offences against a person believed to be under 18, 16, or 14, and states that mistaken age belief or the other party being an undercover peace officer (or a non-existent person) is not a defence.",
      relatedSections: ["153", "155", "163.1", "170", "171", "279.011"],
      partOf: "Part V — Sexual Offences, Public Morals and Disorderly Conduct",
    },
  ],
  [
    "173",
    {
      title: "Indecent acts",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-173.html`,
      summary:
        "Makes it an offence to wilfully do an indecent act in public in the presence of others, or in any place with intent to insult or offend someone, and separately makes it an offence to expose one's sexual organs for a sexual purpose to a person under 16.",
      partOf: "Part V — Sexual Offences, Public Morals and Disorderly Conduct",
    },
  ],
  [
    "174",
    {
      title: "Nudity",
      severity: "Summary",
      maxPenalty: "summary conviction (s. 787 default penalty applies unless otherwise stated)",
      url: `${JUSTICE_LAWS_BASE}/section-174.html`,
      summary:
        "Makes it an offence to be nude without lawful excuse in a public place or exposed to public view on private property, defines nudity for this purpose as dress that offends public decency, and requires Attorney General consent to prosecute.",
      partOf: "Part V — Sexual Offences, Public Morals and Disorderly Conduct",
    },
  ],
  [
    "175",
    {
      title: "Causing disturbance, indecent exhibition, loitering, etc.",
      severity: "Summary",
      maxPenalty: "summary conviction (s. 787 default penalty applies unless otherwise stated)",
      url: `${JUSTICE_LAWS_BASE}/section-175.html`,
      summary:
        "Makes it an offence to cause a disturbance near a public place through fighting, shouting, drunkenness, or obstructing others, to openly exhibit indecent material in public, to loiter and obstruct people in a public place, or to disturb dwelling occupants by discharging firearms or other disorderly conduct, and allows a court to infer a disturbance occurred from a peace officer's evidence.",
      partOf: "Part V — Sexual Offences, Public Morals and Disorderly Conduct",
    },
  ],
  [
    "176",
    {
      title: "Obstructing or violence to or arrest of officiating clergyman",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-176.html`,
      summary:
        "Makes it an offence to obstruct or prevent an officiant from performing a religious or spiritual service by threats or force, or to assault or arrest an officiant travelling to or from such duties, and separately makes it an offence to wilfully disturb a religious, moral, social, or benevolent gathering.",
      partOf: "Part V — Sexual Offences, Public Morals and Disorderly Conduct",
    },
  ],
  [
    "177",
    {
      title: "Trespassing at night",
      severity: "Summary",
      maxPenalty: "summary conviction (s. 787 default penalty applies unless otherwise stated)",
      url: `${JUSTICE_LAWS_BASE}/section-177.html`,
      summary:
        "Makes it an offence to loiter or prowl at night, without lawful excuse, on another person's property near a dwelling-house situated on it.",
      partOf: "Part V — Sexual Offences, Public Morals and Disorderly Conduct",
    },
  ],
  [
    "180",
    {
      title: "Common nuisance",
      severity: "Hybrid",
      maxPenalty: "2 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-180.html`,
      summary:
        "Makes it an offence to commit a common nuisance that endangers the public's lives, safety, or health, or that causes physical injury, and defines a common nuisance as an unlawful act or omission that endangers the public or obstructs a right common to all Her Majesty's subjects in Canada.",
      partOf: "Part V — Sexual Offences, Public Morals and Disorderly Conduct",
    },
  ],
  [
    "182",
    {
      title: "Dead body",
      severity: "Hybrid",
      maxPenalty: "5 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-182.html`,
      summary:
        "Makes it an offence to neglect, without lawful excuse, a legal or undertaken duty relating to burial of a dead body or human remains, or to improperly or indecently interfere with or offer indignity to a dead body or remains, whether buried or not.",
      partOf: "Part V — Sexual Offences, Public Morals and Disorderly Conduct",
    },
  ],

  // ── Part VI — Invasion of Privacy ──
  [
    "183",
    {
      title: "Definitions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-183.html`,
      summary:
        "Defines terms used throughout this Part, including authorization, electro-magnetic/acoustic/mechanical or other device, intercept, offence, police officer, private communication, public switched telephone network, radio-based telephone communication, sell, and solicitor.",
      relatedSections: ["184.2", "186", "188", "47", "51", "52"],
      partOf: "Part VI — Invasion of Privacy",
    },
  ],
  [
    "183.1",
    {
      title: "Consent to interception",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-183.1.html`,
      summary:
        "Provides that where a private communication has more than one originator or intended recipient, consent to its interception from any one of those persons is sufficient consent under this Part.",
      partOf: "Part VI — Invasion of Privacy",
    },
  ],
  [
    "184",
    {
      title: "Interception",
      severity: "Hybrid",
      maxPenalty: "5 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-184.html`,
      summary:
        "Makes it an offence to knowingly intercept a private communication using an electro-magnetic, acoustic, mechanical, or other device, subject to exceptions for consenting parties, authorized interceptions, service providers doing quality control or protecting their rights, spectrum management officers, and computer system operators managing or protecting their systems, with limits on how such computer-system interceptions may be used or retained.",
      relatedSections: ["184.4", "342.1", "430", "193"],
      partOf: "Part VI — Invasion of Privacy",
    },
  ],
  [
    "184.1",
    {
      title: "Interception to prevent bodily harm",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-184.1.html`,
      summary:
        "Allows a state agent to intercept a private communication where one party has consented and there are reasonable grounds to believe there is a risk of bodily harm to that person, for the purpose of preventing the harm, restricts admissibility of the intercepted contents to bodily-harm-related proceedings, and requires destruction of recordings, transcripts, and notes if nothing suggests bodily harm occurred or is likely.",
      partOf: "Part VI — Invasion of Privacy",
    },
  ],
  [
    "184.2",
    {
      title: "Interception with consent",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-184.2.html`,
      summary:
        "Sets out the process for a peace or public officer to apply, with a supporting affidavit, for judicial authorization to intercept a private communication where one party has consented, the grounds a judge must be satisfied of before granting it, and the required content and 60-day limit of such an authorization.",
      relatedSections: ["552", "186", "487", "487.01", "487.014", "487.018"],
      partOf: "Part VI — Invasion of Privacy",
    },
  ],
  [
    "184.3",
    {
      title: "Application — telecommunication producing writing",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-184.3.html`,
      summary:
        "Allows certain interception-related applications, extensions, and renewals to be submitted by telecommunication that produces a writing, and in limited circumstances by telecommunication that does not, sets requirements for recording, sealing, oaths, and the judge's method of granting the authorization by telecommunication.",
      relatedSections: ["184.2", "185", "186", "188", "196", "196.1"],
      partOf: "Part VI — Invasion of Privacy",
    },
  ],
  [
    "184.4",
    {
      title: "Immediate interception — imminent harm",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-184.4.html`,
      summary:
        "Allows a police officer to intercept a private communication without prior authorization if there are reasonable grounds to believe the situation is too urgent to obtain authorization, the interception is immediately necessary to prevent an offence causing serious harm, and one of the communicating parties is the likely offender or the victim.",
      partOf: "Part VI — Invasion of Privacy",
    },
  ],
  [
    "184.5",
    {
      title: "Interception of radio-based telephone communications",
      severity: "Hybrid",
      maxPenalty: "5 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-184.5.html`,
      summary:
        "Makes it an offence to maliciously or for gain intercept a radio-based telephone communication where one party is in Canada, and applies several other sections of this Part, with modifications as needed, to such interceptions.",
      relatedSections: ["183.1", "184", "184.1", "190", "194", "196"],
      partOf: "Part VI — Invasion of Privacy",
    },
  ],
  [
    "184.6",
    {
      title: "One application for authorization sufficient",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-184.6.html`,
      summary:
        "Confirms that a single application for authorization under this Part may cover both private communications and radio-based telephone communications at the same time.",
      partOf: "Part VI — Invasion of Privacy",
    },
  ],
  [
    "185",
    {
      title: "Application for authorization",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-185.html`,
      summary:
        "Sets out the process for the Attorney General, Minister of Public Safety, or a specially designated agent to apply ex parte, with a supporting affidavit, for a wiretap authorization under section 186, including required affidavit content, an exception removing the need to show other investigative procedures failed for certain organized crime, foreign interference, or terrorism offences, and a procedure for requesting an extended notification period.",
      relatedSections: ["186", "52", "52.1", "52.2", "467.11", "467.111"],
      partOf: "Part VI — Invasion of Privacy",
    },
  ],
  [
    "186",
    {
      title: "Judge to be satisfied",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-186.html`,
      summary:
        "Sets out the grounds a judge must be satisfied of to give or renew a wiretap authorization, an exception to the investigative-necessity requirement for organized crime, foreign interference, and terrorism offences, restrictions and required conditions for intercepting communications at a solicitor's office, the required content and 60-day limit of an authorization, designation of persons who may intercept, authority to covertly install and remove devices, and the renewal process.",
      relatedSections: ["52", "52.1", "52.2", "467.11", "467.111", "467.12"],
      partOf: "Part VI — Invasion of Privacy",
    },
  ],
  [
    "186.1",
    {
      title: "Time limitation in relation to criminal organizations and terrorism offences",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-186.1.html`,
      summary:
        "Allows a wiretap authorization or its renewal to be valid for one or more periods exceeding sixty days, up to one year each, where it relates to organized crime, foreign interference, or terrorism offences.",
      relatedSections: ["184.2", "186", "52", "52.1", "52.2", "467.11"],
      partOf: "Part VI — Invasion of Privacy",
    },
  ],
  [
    "187",
    {
      title: "Manner in which application to be kept secret",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-187.html`,
      summary:
        "Requires that all documents relating to an application under this Part be kept confidential in a sealed packet held by the court, and sets out the limited circumstances and procedures under which the packet may be opened, copied, or resealed.",
      relatedSections: ["185", "186", "196", "552", "184.2", "188"],
      partOf: "Part VI — Invasion of Privacy",
    },
  ],
  [
    "188",
    {
      title: "Applications to specially appointed judges",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-188.html`,
      summary:
        "Allows a peace officer specially designated by the federal Minister of Public Safety and Emergency Preparedness, or by a provincial Attorney General, to apply ex parte to a specially designated judge for authorization to intercept private communications when the urgency of the situation means the normal process under section 186 could not be used with reasonable diligence, and lets that judge grant a written authorization for up to 36 hours.",
      relatedSections: ["185", "186", "552", "487", "492.1", "492.2"],
      partOf: "Part VI — Invasion of Privacy",
    },
  ],
  [
    "188.1",
    {
      title: "Execution in Canada",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-188.1.html`,
      summary:
        "States that an authorization given under sections 184.2, 186 or 188 may be executed anywhere in Canada, provided the executing peace officer has authority to act as a peace officer in the place of execution.",
      relatedSections: ["184.2", "186", "188"],
      partOf: "Part VI — Invasion of Privacy",
    },
  ],
  [
    "188.2",
    {
      title: "No civil or criminal liability",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-188.2.html`,
      summary:
        "Shields from civil or criminal liability anyone who acts in accordance with an authorization or under section 184.1 or 184.4, or who in good faith helps someone they reasonably believe is acting under such an authorization or those sections.",
      relatedSections: ["184.1", "184.4"],
      partOf: "Part VI — Invasion of Privacy",
    },
  ],
  [
    "189",
    {
      title: "Notice of intention to produce evidence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-189.html`,
      summary:
        "Sets conditions for admitting the contents of an intercepted private communication into evidence, including advance notice and particulars to the accused, and preserves any privilege that would otherwise attach to the communication.",
      partOf: "Part VI — Invasion of Privacy",
    },
  ],
  [
    "190",
    {
      title: "Further particulars",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-190.html`,
      summary:
        "Allows a judge of the trial court, after notice has been given under subsection 189(5), to order that further particulars be provided about the private communication intended to be used as evidence.",
      relatedSections: ["189"],
      partOf: "Part VI — Invasion of Privacy",
    },
  ],
  [
    "191",
    {
      title: "Possession, etc.",
      severity: "Hybrid",
      maxPenalty: "Not more than 2 years imprisonment on indictment, or punishable on summary conviction",
      url: `${JUSTICE_LAWS_BASE}/section-191.html`,
      summary:
        "Makes it an offence to possess, sell or purchase a device or component known to be designed primarily for secretly intercepting private communications, subject to exemptions for police, authorized interceptions, government/military duties, and licensed possession.",
      partOf: "Part VI — Invasion of Privacy",
    },
  ],
  [
    "192",
    {
      title: "Forfeiture",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-192.html`,
      summary:
        "Allows a court to order forfeiture to the Crown of a device used to commit an offence under section 184 or 191, but bars forfeiture of communication facilities or equipment owned by a public telephone/telegraph service provider who was not a party to the offence.",
      relatedSections: ["184", "191"],
      partOf: "Part VI — Invasion of Privacy",
    },
  ],
  [
    "193",
    {
      title: "Disclosure of information",
      severity: "Hybrid",
      maxPenalty: "Not more than 2 years imprisonment on indictment, or punishable on summary conviction",
      url: `${JUSTICE_LAWS_BASE}/section-193.html`,
      summary:
        "Makes it an offence to knowingly use or disclose an unlawfully intercepted private communication, or disclose its existence, without the consent of the originator or intended recipient, subject to listed exemptions such as giving evidence or conducting a lawful investigation.",
      relatedSections: ["189", "190", "184", "342.1"],
      partOf: "Part VI — Invasion of Privacy",
    },
  ],
  [
    "193.1",
    {
      title: "Disclosure of information received from interception of radio-based telephone communications",
      severity: "Hybrid",
      maxPenalty: "Not more than 2 years imprisonment on indictment, or punishable on summary conviction",
      url: `${JUSTICE_LAWS_BASE}/section-193.1.html`,
      summary:
        "Makes it an offence to knowingly use or disclose a radio-based telephone communication, or disclose its existence, where the originator or intended recipient was in Canada, the communication was intercepted without consent, and the discloser lacks consent, applying the same exemptions as section 193.",
      relatedSections: ["193"],
      partOf: "Part VI — Invasion of Privacy",
    },
  ],
  [
    "194",
    {
      title: "Damages",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-194.html`,
      summary:
        "Allows a court that convicts a person of specified interception-related offences to order the accused to pay an aggrieved person up to $5,000 in punitive damages, bars this where the person has already commenced a civil action, and allows the order to be registered and enforced as a civil judgment or taken from money seized from the accused.",
      relatedSections: ["184", "184.5", "193", "193.1"],
      partOf: "Part VI — Invasion of Privacy",
    },
  ],
  [
    "195",
    {
      title: "Annual report",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-195.html`,
      summary:
        "Requires the Minister of Public Safety and Emergency Preparedness to prepare an annual report on interception authorizations applied for and interceptions made in the preceding year, and sets out the statistical information the report must include.",
      relatedSections: ["185", "188", "184.4", "196", "196.1", "184"],
      partOf: "Part VI — Invasion of Privacy",
    },
  ],
  [
    "196",
    {
      title: "Written notification to be given",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-196.html`,
      summary:
        "Requires the Attorney General or federal Minister to notify, within 90 days, the person who was the subject of an interception under an authorization, and sets out how that period can be extended by court order and the process for seeking such an extension.",
      relatedSections: ["185", "552", "183", "52", "52.1", "52.2"],
      partOf: "Part VI — Invasion of Privacy",
    },
  ],
  [
    "196.1",
    {
      title: "Written notice — interception in accordance with section 184.4",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-196.1.html`,
      summary:
        "Requires written notice within 90 days to a person who was the subject of an interception carried out under section 184.4, and sets out the process, grounds, and conditions for extending that notification period by court order.",
      relatedSections: ["184.4", "552", "52", "52.1", "52.2", "467.11"],
      partOf: "Part VI — Invasion of Privacy",
    },
  ],

  // ── Part VII — Disorderly Houses, Gaming and Betting ──
  [
    "197",
    {
      title: "Definitions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-197.html`,
      summary:
        "Defines terms used in this Part, including bet, common betting house, common gaming house, disorderly house, game, gaming equipment and keeper, and sets out an exception for incorporated social clubs, an onus provision, and rules on when a place still counts as a common gaming house.",
      partOf: "Part VII — Disorderly Houses, Gaming and Betting",
    },
  ],
  [
    "199",
    {
      title: "Warrant to search",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-199.html`,
      summary:
        "Authorizes a justice to issue a warrant to search a place believed to be used for specified gaming or betting offences, seize evidence and take persons found there into custody, and sets out rules for search without warrant and for disposing of or forfeiting seized property.",
      relatedSections: ["201", "202", "203", "206", "207", "489"],
      partOf: "Part VII — Disorderly Houses, Gaming and Betting",
    },
  ],
  [
    "201",
    {
      title: "Keeping gaming or betting house",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-201.html`,
      summary:
        "Makes it an offence to keep a common gaming house or common betting house, and separately makes it an offence to be found without lawful excuse in such a house or to knowingly permit a place to be used for that purpose.",
      partOf: "Part VII — Disorderly Houses, Gaming and Betting",
    },
  ],
  [
    "202",
    {
      title: "Betting, pool-selling, book-making, etc.",
      severity: "Indictable",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-202.html`,
      summary:
        "Makes it an offence to engage in a wide range of activities connected to unlawful betting, book-making and pool-selling — including using premises, equipment, records, information or advertising for these purposes — and sets escalating penalties for first, second and subsequent offences.",
      partOf: "Part VII — Disorderly Houses, Gaming and Betting",
    },
  ],
  [
    "203",
    {
      title: "Placing bets on behalf of others",
      severity: "Indictable",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-203.html`,
      summary:
        "Makes it an offence to place a bet on behalf of another person for consideration, to engage in the business of placing bets for others, or to hold oneself out as doing so, with escalating penalties for repeat offences.",
      partOf: "Part VII — Disorderly Houses, Gaming and Betting",
    },
  ],
  [
    "204",
    {
      title: "Exemption",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-204.html`,
      summary:
        "Exempts certain activities from sections 201 and 202, including acting as custodian of staked property, private bets between individuals, and pari-mutuel betting on horse races conducted under specified conditions and regulatory approval.",
      relatedSections: ["201", "202"],
      partOf: "Part VII — Disorderly Houses, Gaming and Betting",
    },
  ],
  [
    "206",
    {
      title: "Offence in relation to lotteries and games of chance",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-206.html`,
      summary:
        "Makes it an offence to create, advertise, sell, transport or manage lottery schemes or other property-disposal-by-chance arrangements, makes buying such a ticket an offence, voids related property transactions (with a bona fide purchaser exception), extends the section to foreign lotteries, and exempts certain lot-based divisions of jointly held property and specified recallable securities.",
      partOf: "Part VII — Disorderly Houses, Gaming and Betting",
    },
  ],
  [
    "207",
    {
      title: "Permitted lotteries",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-207.html`,
      summary:
        "Lists the circumstances in which provincial governments, charities, fairs, and licensed operators may lawfully conduct or manage lottery schemes, sets out what licence terms may cover, and defines what counts as a lottery scheme, a slot machine, and related exceptions.",
      relatedSections: ["206", "204"],
      partOf: "Part VII — Disorderly Houses, Gaming and Betting",
    },
  ],
  [
    "207.1",
    {
      title: "Exemption — lottery scheme on an international cruise ship",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-207.1.html`,
      summary:
        "Permits a lottery scheme to be conducted on an international cruise ship during a voyage if all participants are on the ship, it is not linked to any off-ship gambling, it stays outside a five-nautical-mile zone of Canadian ports, and the ship's registration and voyage meet specified conditions; conducting or participating in a lottery scheme outside these terms is an offence.",
      relatedSections: ["207", "206"],
      partOf: "Part VII — Disorderly Houses, Gaming and Betting",
    },
  ],
  [
    "209",
    {
      title: "Cheating at play",
      severity: "Hybrid",
      maxPenalty: "2 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-209.html`,
      summary:
        "Makes it an offence to cheat while playing a game, holding stakes for a game, or betting, with intent to defraud.",
      partOf: "Part VII — Disorderly Houses, Gaming and Betting",
    },
  ],
  [
    "213",
    {
      title: "Stopping or impeding traffic",
      severity: "Summary",
      maxPenalty: "summary conviction",
      url: `${JUSTICE_LAWS_BASE}/section-213.html`,
      summary:
        "Makes it an offence to stop or attempt to stop a vehicle, or to impede pedestrian or vehicular traffic or access to nearby premises, in a public place, for the purpose of offering, providing, or obtaining sexual services for consideration; separately makes it an offence to communicate, for the purpose of offering or providing sexual services for consideration, in a public place next to a school, playground, or daycare centre; also defines \"public place\" for this section.",
      partOf: "Part VII — Disorderly Houses, Gaming and Betting",
    },
  ],

  // ── Part VIII — Offences Against the Person and Reputation ──
  [
    "214",
    {
      title: "Definitions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-214.html`,
      summary:
        "Defines terms used in this Part, including 'abandon or expose', 'form of marriage', and 'guardian'; several other defined terms in this section have been repealed.",
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "215",
    {
      title: "Duty of persons to provide necessaries",
      severity: "Hybrid",
      maxPenalty: "5 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-215.html`,
      summary:
        "Imposes a legal duty on parents, guardians, and others to provide necessaries of life to children under 16, to a spouse or common-law partner, and to a dependant who cannot care for themselves. Makes it an offence to fail without lawful excuse to perform that duty where it leaves the person in destitute or necessitous circumstances, endangers their life, or permanently endangers or injures their health, and sets out evidentiary presumptions, including about parentage and failure to provide maintenance.",
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "216",
    {
      title: "Duty of persons undertaking acts dangerous to life",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-216.html`,
      summary:
        "Imposes a legal duty on anyone who undertakes surgical or medical treatment, or any other lawful act that may endanger life, to use reasonable knowledge, skill, and care in doing it, except in cases of necessity.",
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "217",
    {
      title: "Duty of persons undertaking acts",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-217.html`,
      summary:
        "Imposes a legal duty on anyone who undertakes to do an act to actually do it, where failing to do so is or may be dangerous to life.",
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "217.1",
    {
      title: "Duty of persons directing work",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-217.1.html`,
      summary:
        "Imposes a legal duty on anyone who undertakes, or has authority, to direct how another person does work or performs a task, to take reasonable steps to prevent bodily harm to that person or others arising from it.",
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "218",
    {
      title: "Abandoning child",
      severity: "Hybrid",
      maxPenalty: "5 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-218.html`,
      summary:
        "Makes it an offence to unlawfully abandon or expose a child under 10 years old in a way that endangers, or is likely to endanger, the child's life, or is likely to permanently injure the child's health.",
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "219",
    {
      title: "Criminal negligence",
      severity: "",
      maxPenalty: "See s. 220-221",
      url: `${JUSTICE_LAWS_BASE}/section-219.html`,
      summary:
        "Defines a person as criminally negligent when, in doing something or in omitting to do something they have a legal duty to do, they show wanton or reckless disregard for the lives or safety of others, and defines 'duty' for this purpose as one imposed by law.",
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "220",
    {
      title: "Causing death by criminal negligence",
      severity: "Indictable",
      maxPenalty: "Life imprisonment; minimum 4 years where a firearm is used in the commission of the offence (s. 220(a)); no minimum in any other case (s. 220(b))",
      url: `${JUSTICE_LAWS_BASE}/section-220.html`,
      summary:
        "Makes it an offence to cause the death of another person by criminal negligence.",
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "221",
    {
      title: "Causing bodily harm by criminal negligence",
      severity: "Hybrid",
      maxPenalty: "10 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-221.html`,
      summary:
        "Makes it an offence to cause bodily harm to another person by criminal negligence.",
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "222",
    {
      title: "Homicide",
      severity: "",
      maxPenalty: "See s. 229-240",
      url: `${JUSTICE_LAWS_BASE}/section-222.html`,
      definition:
        "A person commits homicide when, directly or indirectly, by any means, they cause the death of a human being. Homicide is culpable or not culpable; non-culpable homicide is not an offence. Culpable homicide is murder, manslaughter, or infanticide. A person commits culpable homicide when they cause a human being's death by means of an unlawful act, by criminal negligence, by causing that person, through threats or fear of violence or deception, to do anything that causes their death, or by wilfully frightening a child or sick person. As an exception, a person does not commit homicide by reason only of procuring, through false evidence, the conviction and death by sentence of the law of another human being.",
      relatedSections: ["229", "231", "234", "235", "236"],
      defences: ["self-defence (s. 34)", "provocation (s. 232)", "not criminally responsible (s. 16)"],
      topicsTagged: ["homicide", "death", "culpable"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "223",
    {
      title: "When child becomes human being",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-223.html`,
      summary:
        "Defines when a child becomes a human being for purposes of this Act: when it has completely proceeded, in a living state, from its mother's body, whether or not it has breathed, has independent circulation, or the umbilical cord is severed. States that a person commits homicide if they cause injury to a child before or during birth that results in the child's death after it becomes a human being.",
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "224",
    {
      title: "Death that might have been prevented",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-224.html`,
      summary:
        "Provides that causing a person's death by an act or omission constitutes causing that death, even if the death might have been prevented by resorting to proper means.",
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "225",
    {
      title: "Death from treatment of injury",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-225.html`,
      summary:
        "Provides that causing a human being a bodily injury that is dangerous in itself and results in death constitutes causing that person's death, even if the immediate cause of death was proper or improper treatment applied in good faith.",
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "226",
    {
      title: "Acceleration of death",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-226.html`,
      summary:
        "Provides that causing a bodily injury to a human being that results in death is causing that person's death, even if the injury's effect was only to accelerate death from a disease or disorder that arose from some other cause.",
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "227",
    {
      title: "Exemption for medical assistance in dying",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-227.html`,
      summary:
        "Provides that a medical or nurse practitioner does not commit culpable homicide by providing medical assistance in dying in accordance with section 241.2, and that a person assisting such a practitioner is likewise not a party to culpable homicide. The exemption applies even where there is a reasonable but mistaken belief about a fact underlying it, is not barred by section 14, and its key terms take the same meaning as in section 241.1.",
      relatedSections: ["241.2", "14", "241.1"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "228",
    {
      title: "Killing by influence on the mind",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-228.html`,
      summary:
        "Provides that no one commits culpable homicide by causing a person's death solely through influence on the mind, or through a disorder or disease resulting from such influence, except where the death of a child or sick person is caused by wilfully frightening them.",
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "229",
    {
      title: "Murder",
      severity: "Indictable",
      maxPenalty: "Life imprisonment",
      url: `${JUSTICE_LAWS_BASE}/section-229.html`,
      definition:
        "Culpable homicide is murder (a) where the person who causes the death of a human being means to cause death, or means to cause bodily harm that they know is likely to cause death, and is reckless whether death ensues or not; (b) where a person, meaning to cause death or bodily harm they know is likely to cause death, and being reckless whether death ensues, by accident or mistake causes the death of another human being, notwithstanding that they did not mean to cause death or bodily harm to that human being; or (c) where a person, for an unlawful object, does anything that they know is likely to cause death, and by doing so causes the death of a human being, even if they desire to effect their object without causing death or bodily harm to any human being.",
      relatedSections: ["222", "231", "232", "235"],
      defences: ["provocation (s. 232)", "self-defence (s. 34)", "intoxication", "not criminally responsible (s. 16)"],
      topicsTagged: ["murder", "intent", "death"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "231",
    {
      title: "Classification of murder",
      severity: "Indictable",
      maxPenalty: "Life imprisonment (minimum 25 years parole ineligibility for 1st degree)",
      url: `${JUSTICE_LAWS_BASE}/section-231.html`,
      definition:
        "Murder is first degree murder or second degree murder. It is first degree murder when planned and deliberate, including when committed pursuant to a contract for payment. Irrespective of planning, murder is also first degree when the victim is a peace officer or prison employee acting in the course of duty; when death is caused while committing or attempting hijacking, sexual assault, kidnapping, forcible confinement, or hostage taking; when death is caused while engaging in, or after having engaged in, a pattern of coercive or controlling conduct against an intimate partner with intent to cause the victim to believe their safety is threatened; while exercising control, direction, or influence over the victim's movements with intent to exploit them; while committing or attempting an offence of a sexual nature; or when motivated by hate based on colour, race, religion, national or ethnic origin, age, sex, sexual orientation, gender identity or expression, or disability; when caused during criminal harassment intended to make the victim fear for their safety; when the underlying offence also constitutes terrorist activity; when committed for the benefit of, at the direction of, or in association with a criminal organization; or when caused during an intimidation offence under section 423.1. All other murder is second degree murder.",
      relatedSections: ["229", "232", "235", "279.04", "423.1", "745"],
      defences: ["provocation reduces to manslaughter (s. 232)", "intoxication (negating planning/deliberation)"],
      topicsTagged: ["murder", "first degree", "second degree", "planned", "femicide", "criminal organization"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "232",
    {
      title: "Murder reduced to manslaughter",
      severity: "Indictable",
      maxPenalty: "Life imprisonment",
      url: `${JUSTICE_LAWS_BASE}/section-232.html`,
      definition:
        "Culpable homicide that otherwise would be murder may be reduced to manslaughter if the person who committed it did so in the heat of passion caused by sudden provocation. Provocation means conduct of the victim that would itself constitute an indictable offence under this Act punishable by five or more years of imprisonment and that is of such a nature as to be sufficient to deprive an ordinary person of the power of self-control, if the accused acted on it on the sudden and before there was time for their passion to cool. Whether the victim's conduct amounted to provocation, and whether the accused was actually deprived of self-control by it, are questions of fact; no one is deemed to have provoked another by doing something they had a legal right to do, or something the accused incited in order to provide an excuse for causing death or bodily harm. Culpable homicide that would otherwise be murder is not necessarily manslaughter merely because it was committed during an illegal arrest, though the accused's knowledge that the arrest was illegal may itself be evidence of provocation.",
      relatedSections: ["229", "231", "234", "236"],
      defences: [],
      topicsTagged: ["provocation", "manslaughter", "heat of passion"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "233",
    {
      title: "Infanticide",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-233.html`,
      summary:
        "A female person commits infanticide when, by a wilful act or omission, she causes the death of her newly-born child, at a time when she has not fully recovered from giving birth and her mind is disturbed as a result of that or of lactation following the birth.",
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "234",
    {
      title: "Manslaughter",
      severity: "Indictable",
      maxPenalty: "Life imprisonment",
      url: `${JUSTICE_LAWS_BASE}/section-234.html`,
      definition:
        "Culpable homicide that is not murder or infanticide is manslaughter.",
      relatedSections: ["222", "229", "232", "236"],
      defences: ["self-defence (s. 34)", "not criminally responsible (s. 16)"],
      topicsTagged: ["manslaughter", "homicide"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "235",
    {
      title: "Punishment for murder",
      severity: "Indictable",
      maxPenalty: "Life imprisonment",
      url: `${JUSTICE_LAWS_BASE}/section-235.html`,
      definition:
        "Every one who commits first degree murder or second degree murder is guilty of an indictable offence and shall be sentenced to imprisonment for life.",
      relatedSections: ["229", "231", "745", "745.4"],
      defences: [],
      topicsTagged: ["murder", "sentencing", "life imprisonment"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "236",
    {
      title: "Manslaughter",
      severity: "Indictable",
      maxPenalty: "Life imprisonment; minimum 4 years if firearm used",
      url: `${JUSTICE_LAWS_BASE}/section-236.html`,
      definition:
        "Every person who commits manslaughter is guilty of an indictable offence and liable to imprisonment for life, with a minimum punishment of imprisonment for a term of four years if a firearm was used in the commission of the offence. In sentencing, the court shall consider imposing life imprisonment if the manslaughter was committed while engaging in, or after having engaged in, a pattern of coercive or controlling conduct against an intimate partner with intent to cause the victim to believe their safety was threatened; while exercising control, direction, or influence over the victim's movements with intent to exploit them; while committing or attempting an offence of a sexual nature; or if motivated by hate based on colour, race, religion, national or ethnic origin, age, sex, sexual orientation, gender identity or expression, or disability.",
      relatedSections: ["234", "232", "222", "279.04"],
      defences: [],
      topicsTagged: ["manslaughter", "sentencing", "firearm", "femicide"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "237",
    {
      title: "Punishment for infanticide",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-237.html`,
      summary:
        "Provides that infanticide may be prosecuted either as an indictable offence or as an offence punishable on summary conviction.",
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "238",
    {
      title: "Killing unborn child in act of birth",
      severity: "Indictable",
      maxPenalty: "Life imprisonment",
      url: `${JUSTICE_LAWS_BASE}/section-238.html`,
      summary:
        "Makes it an offence to cause the death of a child during the act of birth, before the child has become a human being, in a manner that would constitute murder if the child were already a human being. Does not apply to a person who causes such a death using means they consider, in good faith, necessary to preserve the life of the child's mother.",
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "239",
    {
      title: "Attempt to commit murder",
      severity: "Indictable",
      maxPenalty: "Life imprisonment; minimum 5 years (first offence, restricted/prohibited firearm or criminal-organization-related firearm use, s.239(1)(a)(i)); minimum 7 years (second or subsequent such offence, s.239(1)(a)(ii)); minimum 4 years (any other firearm use, s.239(1)(a.1)); no minimum in any other case (s.239(1)(b))",
      url: `${JUSTICE_LAWS_BASE}/section-239.html`,
      summary:
        "Makes it an offence to attempt, by any means, to commit murder. Provides that for determining whether a person has committed a repeat offence under this section, certain firearms-related, robbery, or violence offences involving a firearm count as an earlier offence based only on the sequence of convictions — not the sequence in which the offences were actually committed — and that sufficiently old prior convictions are not counted.",
      relatedSections: ["85", "244", "244.2", "220", "236", "272"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "240",
    {
      title: "Accessory after fact to murder",
      severity: "Indictable",
      maxPenalty: "Life imprisonment",
      url: `${JUSTICE_LAWS_BASE}/section-240.html`,
      summary:
        "Makes it an offence to be an accessory after the fact to murder.",
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "240.1",
    {
      title: "Removal without informed consent",
      severity: "Indictable",
      maxPenalty: "14 years",
      url: `${JUSTICE_LAWS_BASE}/section-240.1.html`,
      summary:
        "Makes it an offence to obtain, or to carry out, participate in, or facilitate the removal of, a human organ for transplant knowing — or being reckless as to whether — the person it came from (or someone lawfully authorized to consent on their behalf) did not give informed consent to its removal, including doing so on behalf of or in association with the person removing the organ. Also makes it an offence to obtain, participate in, or facilitate obtaining an organ for transplant knowing, or being reckless as to whether, it was obtained in exchange for payment or other consideration.",
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "241",
    {
      title: "Counselling or aiding suicide",
      severity: "Indictable",
      maxPenalty: "14 years",
      url: `${JUSTICE_LAWS_BASE}/section-241.html`,
      summary:
        "Makes it an offence to counsel, abet, or aid a person to die by suicide, whether or not suicide occurs. Exempts medical and nurse practitioners, people who help them, pharmacists dispensing a prescribed substance, and people aiding a patient at that patient's explicit request, when acting in accordance with the medical assistance in dying provisions in section 241.2 — an exemption that applies even with a reasonable but mistaken belief about a fact underlying it — and clarifies that health care professionals who merely provide information about lawful medical assistance in dying commit no offence.",
      relatedSections: ["241.2", "241.1"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "241.1",
    {
      title: "Definitions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-241.1.html`,
      summary:
        "Defines terms used in this section and in sections 241.2 to 241.4, including 'medical assistance in dying,' 'medical practitioner,' 'nurse practitioner,' and 'pharmacist.'",
      relatedSections: ["241.2", "241.3", "241.4"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "241.2",
    {
      title: "Eligibility for medical assistance in dying",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-241.2.html`,
      summary:
        "Sets out the eligibility criteria a person must meet to receive medical assistance in dying — including age, decision-making capacity, having a grievous and irremediable medical condition, and giving informed, voluntary consent — and the safeguards a medical or nurse practitioner must follow before providing it, which differ depending on whether the person's natural death is reasonably foreseeable. Also addresses who may sign a request on a person's behalf, who may act as an independent witness, and how advance consent and waiver of final consent operate in specified circumstances.",
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "241.3",
    {
      title: "Failure to comply with safeguards",
      severity: "Hybrid",
      maxPenalty: "5 years imprisonment (indictable); or summary conviction",
      url: `${JUSTICE_LAWS_BASE}/section-241.3.html`,
      summary:
        "Makes it an offence for a medical practitioner or nurse practitioner providing medical assistance in dying to knowingly fail to comply with the safeguards in section 241.2 or the requirement to inform the pharmacist.",
      relatedSections: ["241.2"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "241.31",
    {
      title: "Filing information — practitioners",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-241.31.html`,
      summary:
        "Requires medical practitioners, nurse practitioners, persons responsible for preliminary assessments, and pharmacists or pharmacy technicians to report specified information about medical assistance in dying requests to a recipient designated by regulations, and directs the Minister of Health to make those regulations governing what information is collected, used, and disclosed. Knowingly failing to file the required information, or knowingly contravening the regulations, is an offence.",
      relatedSections: ["241.2"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "241.4",
    {
      title: "Forgery",
      severity: "Hybrid",
      maxPenalty: "5 years imprisonment (indictable); or summary conviction",
      url: `${JUSTICE_LAWS_BASE}/section-241.4.html`,
      summary:
        "Makes it an offence to commit forgery in relation to a request for medical assistance in dying, or to destroy a document relating to such a request with intent to interfere with another person's access to medical assistance in dying, the assessment of the request, a related exemption, or the filing of information under section 241.31.",
      relatedSections: ["227", "241", "245", "241.31", "321"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "242",
    {
      title: "Neglect to obtain assistance in childbirth",
      severity: "Hybrid",
      maxPenalty: "5 years imprisonment (indictable); or summary conviction",
      url: `${JUSTICE_LAWS_BASE}/section-242.html`,
      summary:
        "Makes it an offence for a pregnant person who intends that the child not live, or intends to conceal the birth, to fail to arrange reasonable assistance for her delivery, where that failure results in the child being permanently injured, or dying immediately before, during, or shortly after birth.",
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "243",
    {
      title: "Concealing body of child",
      severity: "Hybrid",
      maxPenalty: "2 years imprisonment (indictable); or summary conviction",
      url: `${JUSTICE_LAWS_BASE}/section-243.html`,
      summary:
        "Makes it an offence to dispose of a dead child's body in any manner with intent to conceal that its mother gave birth to it, regardless of whether the child died before, during, or after birth.",
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "244",
    {
      title: "Discharging firearm with intent",
      severity: "Indictable",
      maxPenalty: "14 years; minimum of 5 years (first offence) or 7 years (subsequent offence) only where a restricted or prohibited firearm is used or the offence is for a criminal organization — no minimum otherwise",
      url: `${JUSTICE_LAWS_BASE}/section-244.html`,
      summary:
        "Makes it an offence to discharge a firearm at a person with intent to wound, maim, disfigure, endanger life, or prevent arrest or detention, whether or not that person is the one actually shot at. Also sets out how earlier convictions under this or related firearm offences are counted toward treating a conviction as a repeat offence, based on the order in which convictions occurred.",
      relatedSections: ["85", "244.2", "220", "236", "239", "272"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "244.1",
    {
      title: "Causing bodily harm with intent — air gun or pistol",
      severity: "Indictable",
      maxPenalty: "14 years imprisonment",
      url: `${JUSTICE_LAWS_BASE}/section-244.1.html`,
      summary:
        "Makes it an offence to discharge an air or compressed-gas gun or pistol at a person with intent to wound, maim, disfigure, endanger life, or prevent arrest or detention, whether or not that person is the one actually shot at.",
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "244.2",
    {
      title: "Discharging firearm — recklessness",
      severity: "Indictable",
      maxPenalty: "14 years; minimum of 5 years (first offence) or 7 years (subsequent offence) only where a restricted or prohibited firearm is used or the offence is for a criminal organization — no minimum otherwise",
      url: `${JUSTICE_LAWS_BASE}/section-244.2.html`,
      summary:
        "Makes it an offence to intentionally discharge a firearm into or at a place while knowing or being reckless as to whether another person is present there, or to intentionally discharge a firearm while reckless as to another person's life or safety. The section also defines \"place\" for this purpose and sets out how an earlier related conviction is counted when determining whether a later offence is a second or subsequent one.",
      relatedSections: ["85", "244", "220", "236", "239", "272"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "245",
    {
      title: "Administering noxious thing",
      severity: "Hybrid",
      maxPenalty: "14 years, indictable only, if committed with intent to endanger life or cause bodily harm (s.245(1)(a)); 2 years indictable or summary conviction if committed with intent to aggrieve or annoy (s.245(1)(b))",
      url: `${JUSTICE_LAWS_BASE}/section-245.html`,
      summary:
        "Makes it an offence to administer, or cause to be administered or taken, poison or another destructive or noxious thing to another person, either with intent to endanger life or cause bodily harm, or with intent to aggrieve or annoy that person. It exempts a medical practitioner or nurse practitioner providing medical assistance in dying under section 241.2, and anyone who helps them do so.",
      relatedSections: ["241.2", "241.1"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "246",
    {
      title: "Overcoming resistance to commission of offence",
      severity: "Indictable",
      maxPenalty: "Life imprisonment",
      url: `${JUSTICE_LAWS_BASE}/section-246.html`,
      summary:
        "Makes it an offence, when done with intent to help oneself or another person commit an indictable offence, to attempt to choke, suffocate, or strangle a person, or by any means try to render a person insensible, unconscious, or unable to resist. It is likewise an offence, for that same purpose, to administer or attempt to administer, or cause or attempt to cause a person to take, a stupefying or overpowering drug, matter, or thing.",
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "247",
    {
      title: "Traps likely to cause bodily harm",
      severity: "Hybrid",
      maxPenalty: "Life imprisonment, indictable only, if death results (s.247(5)); 14 years, indictable only, if bodily harm results in an offence-related place (s.247(4)); 10 years indictable or summary conviction for bodily harm (s.247(2)) or for the offence committed in an offence-related place (s.247(3)); 5 years indictable or summary conviction for the base offence (s.247(1))",
      url: `${JUSTICE_LAWS_BASE}/section-247.html`,
      summary:
        "Makes it an offence, with intent to cause death or bodily harm to a person, to set or place a trap, device, or other thing likely to cause death or bodily harm, or to knowingly allow such a trap to remain in a place one occupies or possesses. It also addresses the same conduct where it actually causes bodily harm or death, or takes place in a location kept or used for committing another indictable offence.",
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "248",
    {
      title: "Interfering with transportation facilities",
      severity: "Indictable",
      maxPenalty: "Life imprisonment",
      url: `${JUSTICE_LAWS_BASE}/section-248.html`,
      summary:
        "Makes it an offence to place anything on, or do anything to, property used for transporting people or goods by land, water, or air, when done with intent to endanger a person's safety and the act is likely to cause death or bodily harm to people.",
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "262",
    {
      title: "Impeding attempt to save life",
      severity: "Hybrid",
      maxPenalty: "10 years",
      url: `${JUSTICE_LAWS_BASE}/section-262.html`,
      summary:
        "Makes it an offence to prevent or impede, or attempt to prevent or impede, a person attempting to save their own life, or to do so without reasonable cause to a person attempting to save another person's life.",
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "263",
    {
      title: "Duty to safeguard opening in ice",
      severity: "Summary",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-263.html`,
      summary:
        "Imposes a legal duty on anyone who makes an opening in ice open to or frequented by the public, or who leaves an excavation on land they own or control, to guard it adequately against accidental falls and to warn of its existence; failing this duty is an offence, with the specific offence depending on whether death or bodily harm results.",
      relatedSections: ["269"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "263.1",
    {
      title: "Violence against intimate partner",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-263.1.html`,
      summary:
        "Makes it an offence to commit any offence involving violence used, threatened, or attempted against one's intimate partner, sets limits on how such charges may be prosecuted based on how the underlying offence could be prosecuted, and sets punishment tiers and applicable procedures tied to the maximum sentence for the underlying offence.",
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "264",
    {
      title: "Criminal harassment",
      severity: "Hybrid",
      maxPenalty: "10 years indictable",
      url: `${JUSTICE_LAWS_BASE}/section-264.html`,
      summary:
        "Makes it an offence to engage, without lawful authority and with intent to harass or reckless as to whether it would harass, in specified conduct (such as repeated following, monitoring, communicating, watching a residence or workplace, or threatening conduct) toward another person or someone known to them, where this could reasonably be expected to make that person fear for their safety, including psychological safety; also directs courts to treat breach of certain existing orders as an aggravating factor at sentencing.",
      relatedSections: ["161", "810", "810.03", "810.1", "810.2"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "264.1",
    {
      title: "Uttering threats",
      severity: "Hybrid",
      maxPenalty: "5 years indictable, or summary conviction available, for threats to cause death or bodily harm; 2 years indictable, or summary conviction available, for threats to property or to an animal.",
      url: `${JUSTICE_LAWS_BASE}/section-264.1.html`,
      summary:
        "Makes it an offence to knowingly utter, convey, or cause a person to receive a threat to cause death or bodily harm, to damage property, or to kill, poison, or injure an animal or bird belonging to someone.",
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "265",
    {
      title: "Assault",
      severity: "Hybrid",
      maxPenalty: "See s. 266-268",
      url: `${JUSTICE_LAWS_BASE}/section-265.html`,
      definition:
        "A person commits an assault when, without the other person's consent, they intentionally apply force to that person directly or indirectly; attempt or threaten, by an act or gesture, to apply force to another person while having, or causing that person to reasonably believe they have, the present ability to do so; or, while openly carrying a weapon or an imitation of one, accost or impede another person or beg. This section applies to all forms of assault, including sexual assault and its aggravated forms. No consent is obtained where the complainant submits or fails to resist because of force or threats of force against them or another person, fraud, or the exercise of authority. Where an accused claims an honest belief that the complainant consented, a judge satisfied there is sufficient evidence to support that defence must instruct the jury to consider whether there were reasonable grounds for that belief.",
      relatedSections: ["266", "267", "268", "269"],
      defences: ["consent (s. 265(3))", "self-defence (s. 34)"],
      topicsTagged: ["violence", "person", "force", "consent"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "266",
    {
      title: "Assault",
      severity: "Hybrid",
      maxPenalty: "5 years indictable / 2 years less a day summary",
      url: `${JUSTICE_LAWS_BASE}/section-266.html`,
      definition:
        "Every one who commits an assault is guilty of (a) an indictable offence and is liable to imprisonment for a term not exceeding five years; or (b) an offence punishable on summary conviction.",
      relatedSections: ["265", "267", "268"],
      defences: ["consent", "self-defence (s. 34)", "defence of property (s. 35)"],
      topicsTagged: ["violence", "person"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "267",
    {
      title: "Assault with a weapon or causing bodily harm",
      severity: "Hybrid",
      maxPenalty: "10 years indictable; summary conviction also available.",
      url: `${JUSTICE_LAWS_BASE}/section-267.html`,
      definition:
        "Every person is guilty of an indictable offence and liable to imprisonment for a term of not more than 10 years, or is guilty of an offence punishable on summary conviction, who, in committing an assault, carries, uses or threatens to use a weapon or an imitation of a weapon, causes bodily harm to the complainant, or chokes, suffocates or strangles the complainant.",
      relatedSections: ["265", "266", "268"],
      defences: ["consent", "self-defence (s. 34)"],
      topicsTagged: ["violence", "weapon", "bodily harm"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "268",
    {
      title: "Aggravated assault",
      severity: "Indictable",
      maxPenalty: "14 years",
      url: `${JUSTICE_LAWS_BASE}/section-268.html`,
      definition:
        "Every one commits an aggravated assault who wounds, maims, disfigures or endangers the life of the complainant. For this section and section 265, 'wounds' or 'maims' includes excising, infibulating or mutilating, in whole or in part, a person's labia majora, labia minora or clitoris, except where a person duly qualified to practise medicine performs a surgical procedure for the person's physical health or normal reproductive or sexual function, or where the person is at least 18 years old and no bodily harm results. No consent to such excision, infibulation or mutilation is valid outside those two exceptions.",
      relatedSections: ["265", "267", "269"],
      defences: ["self-defence (s. 34)"],
      topicsTagged: ["violence", "serious injury", "wounding", "female genital mutilation"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "268.1",
    {
      title: "Sterilization",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-268.1.html`,
      summary:
        "Confirms that a sterilization procedure is an act that wounds or maims a person for purposes of the aggravated assault provision, and defines \"sterilization procedure\" as severing, clipping, tying, or cauterizing reproductive organs or any other procedure that permanently prevents reproduction.",
      relatedSections: ["268"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "269",
    {
      title: "Unlawfully causing bodily harm",
      severity: "Hybrid",
      maxPenalty: "10 years",
      url: `${JUSTICE_LAWS_BASE}/section-269.html`,
      summary:
        "Makes it an offence to unlawfully cause bodily harm to any person.",
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "269.01",
    {
      title: "Aggravating circumstance — assault against a public transit employee",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-269.01.html`,
      summary:
        "Requires a court sentencing for uttering a threat of death or bodily harm, or for certain assault offences, to treat it as an aggravating factor that the victim was a public transit employee performing their duty, and defines \"public transit employee\" and \"vehicle\" for this purpose.",
      relatedSections: ["264.1", "266", "267", "268", "269"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "269.1",
    {
      title: "Torture",
      severity: "Indictable",
      maxPenalty: "14 years",
      url: `${JUSTICE_LAWS_BASE}/section-269.1.html`,
      summary:
        "Makes it an offence for an official, or someone acting with an official's consent or at their instigation, to inflict torture on another person, defines \"official\" and \"torture,\" states that superior orders or exceptional circumstances are no defence, and makes statements obtained through such torture inadmissible except to prove the torture occurred.",
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "270",
    {
      title: "Assaulting a peace officer",
      severity: "Hybrid",
      maxPenalty: "5 years indictable",
      url: `${JUSTICE_LAWS_BASE}/section-270.html`,
      summary:
        "Makes it an offence to assault a public officer or peace officer performing their duty (or someone assisting them), to assault someone with intent to resist or prevent a lawful arrest or detention, or to assault someone carrying out a lawful seizure or distress or to rescue property taken under lawful process.",
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "270.01",
    {
      title: "Assaulting peace officer with weapon or causing bodily harm",
      severity: "Hybrid",
      maxPenalty: "10 years",
      url: `${JUSTICE_LAWS_BASE}/section-270.01.html`,
      summary:
        "Makes it an offence to carry, use, or threaten to use a weapon, or to cause bodily harm to the complainant, while committing an assault described in section 270.",
      relatedSections: ["270"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "270.02",
    {
      title: "Aggravated assault of peace officer",
      severity: "Indictable",
      maxPenalty: "14 years",
      url: `${JUSTICE_LAWS_BASE}/section-270.02.html`,
      summary:
        "Makes it an offence to wound, maim, disfigure, or endanger the life of the complainant while committing an assault described in section 270.",
      relatedSections: ["270"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "270.03",
    {
      title: "Sentences to be served consecutively",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-270.03.html`,
      summary:
        "Requires that a sentence for certain assault offences against a law enforcement officer be served consecutively to any other sentence imposed for an offence arising from the same event or series of events.",
      relatedSections: ["270", "270.01", "270.02", "445.01"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "270.1",
    {
      title: "Disarming a peace officer",
      severity: "Hybrid",
      maxPenalty: "5 years indictable",
      url: `${JUSTICE_LAWS_BASE}/section-270.1.html`,
      summary:
        "Makes it an offence to take or attempt to take a weapon from a peace officer's possession without consent while the officer is performing their duty, and defines \"weapon\" for this purpose.",
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "271",
    {
      title: "Sexual assault",
      severity: "Hybrid",
      maxPenalty: "10 years indictable / 2 years less a day summary (general); if complainant under 16: 14 years indictable minimum 1 year / 2 years less a day summary minimum 6 months",
      url: `${JUSTICE_LAWS_BASE}/section-271.html`,
      definition:
        "Every person who commits a sexual assault is guilty of an indictable offence and liable to imprisonment for a term of not more than 10 years, or, if the complainant is under the age of 16 years, to imprisonment for a term of not more than 14 years and to a minimum punishment of imprisonment for a term of one year; or is guilty of an offence punishable on summary conviction and liable to imprisonment for a term of not more than two years less a day, or, if the complainant is under the age of 16 years, to imprisonment for a term of not more than two years less a day and to a minimum punishment of imprisonment for a term of six months.",
      relatedSections: ["265", "272", "273", "273.1"],
      defences: ["consent (s. 273.1)", "mistaken belief in consent (s. 273.2)"],
      topicsTagged: ["sexual offence", "assault", "consent"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "272",
    {
      title: "Sexual assault with a weapon, threats to a third party or causing bodily harm",
      severity: "Indictable",
      maxPenalty: "14 years indictable generally (no minimum), rising to a 4-year minimum if any firearm is used, a 5-year minimum (7 years for a subsequent offence) if a restricted or prohibited firearm is used, or if any firearm is used for the benefit of, at the direction of, or in association with a criminal organization, and to life imprisonment with a 5-year minimum if the complainant is under 16.",
      url: `${JUSTICE_LAWS_BASE}/section-272.html`,
      definition:
        "Every person commits an offence who, in committing a sexual assault, carries, uses or threatens to use a weapon or an imitation of a weapon; threatens to cause bodily harm to a person other than the complainant; causes bodily harm to the complainant; chokes, suffocates or strangles the complainant; or is a party to the offence with any other person.",
      relatedSections: ["271", "273", "265"],
      defences: ["consent (s. 273.1)", "mistaken belief in consent (s. 273.2)"],
      topicsTagged: ["sexual offence", "weapon", "bodily harm"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "273",
    {
      title: "Aggravated sexual assault",
      severity: "Indictable",
      maxPenalty: "Life imprisonment; no minimum in the general case, rising to a 4-year minimum if any firearm is used, a 5-year minimum (7 years for a subsequent offence) if a restricted or prohibited firearm is used, or if any firearm is used for the benefit of, at the direction of, or in association with a criminal organization, and a 5-year minimum if the complainant is under 16.",
      url: `${JUSTICE_LAWS_BASE}/section-273.html`,
      definition:
        "Every person commits an aggravated sexual assault who, in committing a sexual assault, wounds, maims, disfigures or endangers the life of the complainant.",
      relatedSections: ["271", "272", "268"],
      defences: [],
      topicsTagged: ["sexual offence", "aggravated", "serious injury"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "273.1",
    {
      title: "Meaning of consent",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-273.1.html`,
      summary:
        "Defines \"consent\" for certain sexual offences as the voluntary agreement to engage in the sexual activity at the time it occurs, and sets out circumstances in which no consent is obtained, such as when agreement is expressed by someone other than the complainant, the complainant is unconscious or otherwise incapable, agreement was induced by abuse of a position of trust or authority, or the complainant expresses a lack of agreement.",
      relatedSections: ["271", "272", "273", "265"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "273.2",
    {
      title: "Where belief in consent not a defence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-273.2.html`,
      summary:
        "Provides that an accused's belief that the complainant consented is not a defence to certain sexual offences where the belief arose from self-induced intoxication, recklessness, or wilful blindness, where certain no-consent circumstances applied, where the accused failed to take reasonable steps to ascertain consent, or where there is no evidence the complainant affirmatively expressed agreement.",
      relatedSections: ["271", "272", "273", "265", "273.1"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "273.3",
    {
      title: "Removal of child from Canada",
      severity: "Hybrid",
      maxPenalty: "5 years indictable",
      url: `${JUSTICE_LAWS_BASE}/section-273.3.html`,
      summary:
        "Prohibits doing anything to remove a Canadian resident under 18 from Canada with the intention that specified sexual or related offences be committed against them outside Canada, with the applicable offences varying by the person's age, and makes contravention an offence.",
      relatedSections: ["151", "152", "160", "173", "153", "155"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "274",
    {
      title: "Corroboration not required",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-274.html`,
      summary:
        "States that no corroboration is required to convict an accused charged with specified sexual and related offences, and that a judge must not instruct a jury that a conviction is unsafe without corroboration.",
      relatedSections: ["151", "152", "153", "153.1", "155", "160"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "275",
    {
      title: "Rules respecting recent complaint abrogated",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-275.html`,
      summary:
        "Abolishes the common law rules relating to evidence of recent complaint for specified sexual offences.",
      relatedSections: ["151", "152", "153", "153.1", "155", "160"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "276",
    {
      title: "Evidence of complainant’s sexual activity",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-276.html`,
      summary:
        "Prohibits using evidence that a complainant engaged in sexual activity to support an inference that they were more likely to have consented or are less credible, and sets out the procedure and factors a judge must consider before admitting evidence of a complainant's other sexual activity in proceedings for specified sexual offences.",
      relatedSections: ["151", "152", "153", "153.1", "155", "160"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "276.01",
    {
      title: "Application for hearing",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-276.01.html`,
      summary:
        "Sets out the procedure for an accused to apply, in writing with a supporting affidavit, for a hearing to determine whether evidence of a complainant's sexual activity is admissible, including timing, service on the prosecutor and complainant, and exclusion of the jury and public from considering the application.",
      relatedSections: ["276.02", "276"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "276.02",
    {
      title: "Hearing — jury and public excluded",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-276.02.html`,
      summary:
        "Requires that a hearing to determine admissibility of a complainant's sexual activity evidence exclude the jury and public, provides that the complainant is not compellable but may appear and make submissions with a right to counsel, and requires the judge to determine admissibility and give recorded reasons.",
      relatedSections: ["276"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "276.03",
    {
      title: "Publication prohibited",
      severity: "Summary",
      maxPenalty: "summary conviction",
      url: `${JUSTICE_LAWS_BASE}/section-276.03.html`,
      summary:
        "Prohibits publishing, broadcasting, or transmitting the contents of an application, evidence, submissions, or decisions related to a section 276.01/276.02 hearing, subject to listed exceptions such as disclosures made in the administration of justice or by the complainant or a witness themselves; contravention is an offence.",
      relatedSections: ["276.01", "276.02"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "276.04",
    {
      title: "Instruction to jury — use of evidence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-276.04.html`,
      summary:
        "Requires the judge to instruct the jury on the permitted and prohibited uses of sexual activity evidence admitted at trial following a section 276.02 determination.",
      relatedSections: ["276.02"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "276.05",
    {
      title: "Appeal",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-276.05.html`,
      summary:
        "Deems a determination made under subsection 276.02(4) to be a question of law for purposes of the appeal provisions in sections 675 and 676.",
      relatedSections: ["276.02", "675", "676"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "276.06",
    {
      title: "Application",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-276.06.html`,
      summary:
        "Sets out the procedure for the prosecutor to apply, in writing, for a determination of whether a complainant's sexual activity evidence is admissible, including that no affidavit or complainant testimony is required, timing of service on the accused, and exclusion of the jury, public, and complainant compellability at the hearing.",
      relatedSections: ["276"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "276.07",
    {
      title: "Publication prohibited",
      severity: "Summary",
      maxPenalty: "summary conviction",
      url: `${JUSTICE_LAWS_BASE}/section-276.07.html`,
      summary:
        "Prohibits publishing, broadcasting, or transmitting the contents of an application or hearing under section 276.06 or its determination and reasons, subject to listed exceptions; contravention is an offence.",
      relatedSections: ["276.06"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "276.08",
    {
      title: "Instruction to jury — use of evidence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-276.08.html`,
      summary:
        "Requires the judge to instruct the jury on the permitted and prohibited uses of sexual activity evidence admitted at trial following a section 276.06 determination.",
      relatedSections: ["276.06"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "276.09",
    {
      title: "Appeal",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-276.09.html`,
      summary:
        "Deems a determination made under subsection 276.06(7) to be a question of law for purposes of the appeal provisions in sections 675 and 676.",
      relatedSections: ["276.06", "675", "676"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "276.1",
    {
      title: "Admissibility of sexual activity evidence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-276.1.html`,
      summary:
        "Allows the prosecutor, accused, and complainant to jointly apply in writing for a judge to determine, without a hearing, whether a complainant's sexual activity evidence is admissible, sets out the application's required content and timing, and provides that the judge either grants the application or holds a hearing if not satisfied of admissibility.",
      relatedSections: ["276", "276.02"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "276.11",
    {
      title: "Publication prohibited",
      severity: "Summary",
      maxPenalty: "summary conviction",
      url: `${JUSTICE_LAWS_BASE}/section-276.11.html`,
      summary:
        "Prohibits publishing, broadcasting, or transmitting the contents of an application under section 276.1 or its determination and reasons, subject to listed exceptions; contravention is an offence.",
      relatedSections: ["276.1"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "276.12",
    {
      title: "Instruction to jury — use of evidence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-276.12.html`,
      summary:
        "Requires the judge to instruct the jury on the permitted and prohibited uses of sexual activity evidence admitted at trial following a determination under subsection 276.1(4).",
      relatedSections: ["276.1"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "276.13",
    {
      title: "Appeal",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-276.13.html`,
      summary:
        "Deems a determination made under subsection 276.1(4) or (5) to be a question of law for purposes of the appeal provisions in sections 675 and 676.",
      relatedSections: ["276.1", "675", "676"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "277",
    {
      title: "Reputation evidence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-277.html`,
      summary:
        "Prohibits admitting evidence of a complainant's sexual reputation, general or specific, to challenge or support the complainant's credibility in proceedings for specified sexual offences.",
      relatedSections: ["151", "152", "153", "153.1", "155", "160"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "278",
    {
      title: "Spouse may be charged",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-278.html`,
      summary:
        "Confirms that a spouse may be charged with certain sexual offences committed against their spouse, regardless of whether the spouses were living together at the time.",
      relatedSections: ["271", "272", "273"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "278.1",
    {
      title: "Definitions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-278.1.html`,
      summary:
        "Defines \"record\" and \"therapeutic record\" for the purposes of sections 278.11 to 278.36.",
      relatedSections: ["278.11", "278.36"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "278.11",
    {
      title: "Records and therapeutic records possessed by third party",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-278.11.html`,
      summary:
        "Prohibits producing to an accused a record or therapeutic record relating to a complainant or witness that is held by a third party, in proceedings for specified sexual or sexual-purpose offences, except in accordance with sections 278.12 to 278.19, and defines \"third party.\"",
      relatedSections: ["278.12", "278.19", "151", "152", "153", "153.1"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "278.12",
    {
      title: "Application for production",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-278.12.html`,
      summary:
        "Sets out the procedure for an accused to apply to the trial judge for production of a record or therapeutic record held by a third party, including required content, the grounds needed, a list of assertions that alone are insufficient to establish relevance, and requirements for serving the application and a subpoena on the prosecutor, record holder, complainant, and other affected persons.",
      relatedSections: ["278.11", "278.13"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "278.13",
    {
      title: "Hearing in camera",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-278.13.html`,
      summary:
        "Requires the judge to hold an in-camera hearing to decide whether to order production of a record or therapeutic record to the court, allows the record holder, complainant or witness, and other affected persons to appear and make submissions without being compellable, requires the judge to inform them of their right to counsel, and bars costs orders against them for participating.",
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "278.14",
    {
      title: "Order — production to judge",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-278.14.html`,
      summary:
        "Sets out when a judge may order a record or therapeutic record produced to the court for review, and lists factors the judge must weigh, balancing the accused's right to make full answer and defence against the privacy, security, and equality interests of the complainant, witness, or others connected to the record.",
      relatedSections: ["278.13", "278.12"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "278.15",
    {
      title: "Review of record by judge",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-278.15.html`,
      summary:
        "Requires the judge to review, in the parties' absence, a record or therapeutic record produced to the court to decide whether it should be produced to the accused, and allows an in-camera hearing on the same terms as under section 278.13 if the judge considers it would help.",
      relatedSections: ["278.13"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "278.16",
    {
      title: "Order — Production of record to accused",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-278.16.html`,
      summary:
        "Sets out when a judge may order a record or therapeutic record produced to the accused, the factors the judge must weigh, the conditions the judge may impose on production, and requirements to provide a copy to the prosecutor, restrict its use to the proceedings, and keep it sealed by the court if production is refused.",
      relatedSections: ["278.14"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "278.17",
    {
      title: "Reasons for decision",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-278.17.html`,
      summary:
        "Requires the judge to give reasons for ordering or refusing to order production of a record or therapeutic record, and requires those reasons to be recorded or, if proceedings are not recorded, provided in writing.",
      relatedSections: ["278.14", "278.16"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "278.18",
    {
      title: "Publication prohibited",
      severity: "Summary",
      maxPenalty: "Summary conviction (no specific penalty amount stated in this section)",
      url: `${JUSTICE_LAWS_BASE}/section-278.18.html`,
      summary:
        "Prohibits publishing, broadcasting, or transmitting the contents of an application, evidence given, or the judge's determination and reasons regarding production of a complainant's or witness's record, subject to listed exceptions and a judge's order allowing publication. Contravening the publication ban is an offence punishable on summary conviction.",
      relatedSections: ["278.12", "278.13", "278.14", "278.15", "278.16", "278.17"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "278.19",
    {
      title: "Appeal",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-278.19.html`,
      summary:
        "Deems a judge's determination to make or refuse to make a production order under the specified sections to be a question of law for appeal purposes.",
      relatedSections: ["675", "676", "278.14", "278.16"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "278.2",
    {
      title: "Records and therapeutic records possessed by prosecutor",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-278.2.html`,
      summary:
        "Bars a prosecutor from producing to an accused a complainant's or witness's record or therapeutic record in proceedings for listed sexual or sexual-purpose offences, except as permitted, and requires the prosecutor to notify the accused (without disclosing contents) that such a record exists.",
      relatedSections: ["278.21", "278.28", "278.29", "278.38", "271", "272"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "278.21",
    {
      title: "Application for production",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-278.21.html`,
      summary:
        "Sets out the procedure for an accused to apply for production of a complainant's or witness's record, including what the written application must contain, what grounds are insufficient on their own, and service requirements on the prosecutor and other affected persons.",
      relatedSections: ["278.2", "278.22"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "278.22",
    {
      title: "Hearing in camera",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-278.22.html`,
      summary:
        "Requires the judge to hold an in-camera hearing to decide whether to order production of the record for judicial review, and sets out who may appear and make submissions, the right to counsel, and a bar on costs orders against participants.",
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "278.23",
    {
      title: "Order — production to judge",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-278.23.html`,
      summary:
        "Sets out the conditions under which a judge may order the prosecutor to produce a record to the court for review, and lists the factors the judge must weigh in balancing the accused's right to a defence against the complainant's or witness's privacy and other interests.",
      relatedSections: ["278.21", "278.22"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "278.24",
    {
      title: "Review by judge",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-278.24.html`,
      summary:
        "Requires the judge to review a produced record privately to decide whether it should go to the accused, and allows an in-camera hearing to assist that determination.",
      relatedSections: ["278.22"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "278.25",
    {
      title: "Order — production of record to accused",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-278.25.html`,
      summary:
        "Sets out when a judge may order that a record or therapeutic record be produced to the accused, the factors to consider, conditions that may be imposed on production, a restriction on using it in other proceedings, and the requirement to keep an unproduced record sealed pending appeal.",
      relatedSections: ["278.23"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "278.26",
    {
      title: "Reasons for decision",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-278.26.html`,
      summary:
        "Requires the judge to give reasons for ordering or refusing to order production of a record, and requires those reasons to be recorded or, if proceedings are unrecorded, put in writing.",
      relatedSections: ["278.23", "278.25"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "278.27",
    {
      title: "Publication prohibited",
      severity: "Summary",
      maxPenalty: "Summary conviction (no specific penalty amount stated in this section)",
      url: `${JUSTICE_LAWS_BASE}/section-278.27.html`,
      summary:
        "Prohibits publishing, broadcasting, or transmitting the contents of a production application, evidence or submissions at the hearing, or the judge's determination and reasons, subject to listed exceptions and a judge's order allowing publication. Contravening the ban is a summary conviction offence.",
      relatedSections: ["278.21", "278.22", "278.23", "278.24", "278.25", "278.26"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "278.28",
    {
      title: "Appeal",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-278.28.html`,
      summary:
        "Deems a judge's determination to make or refuse to make a production order under the specified sections to be a question of law for appeal purposes.",
      relatedSections: ["675", "676", "278.23", "278.25"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "278.29",
    {
      title: "Admissibility — possession by accused",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-278.29.html`,
      summary:
        "Makes a complainant's record or therapeutic record in the accused's possession inadmissible in proceedings for listed sexual or sexual-purpose offences unless admissibility requirements are met, and lists the factors a judge must consider in determining admissibility.",
      relatedSections: ["278.3", "278.31", "278.35", "276", "271", "279.01"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "278.3",
    {
      title: "Application for hearing",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-278.3.html`,
      summary:
        "Sets out the procedure for an accused to apply for a hearing to determine whether a record is admissible, including the required written application and affidavit, filing requirements, exclusion of the jury and public, and when the judge must grant the application and hold a hearing.",
      relatedSections: ["278.29", "278.31"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "278.31",
    {
      title: "Hearing — jury and public excluded",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-278.31.html`,
      summary:
        "Requires the jury and public to be excluded from a hearing on the admissibility of a record, allows the complainant to appear without being compellable, and requires the judge to determine admissibility and give reasons covering specified factors.",
      relatedSections: ["278.29"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "278.32",
    {
      title: "Publication prohibited",
      severity: "Summary",
      maxPenalty: "Summary conviction (no specific penalty amount stated in this section)",
      url: `${JUSTICE_LAWS_BASE}/section-278.32.html`,
      summary:
        "Prohibits publishing, broadcasting, or transmitting the contents of an admissibility application, evidence or submissions, or the resulting decision and reasons, subject to listed exceptions and a judge's order allowing publication. Contravening the ban is a summary conviction offence.",
      relatedSections: ["278.3", "278.31"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "278.33",
    {
      title: "Instruction to jury — use of evidence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-278.33.html`,
      summary:
        "Requires the judge to instruct the jury on the permitted and prohibited uses of evidence admitted following a determination under the referenced section.",
      relatedSections: ["278.31"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "278.34",
    {
      title: "Appeal",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-278.34.html`,
      summary:
        "Deems a determination made under the referenced subsection to be a question of law for appeal purposes.",
      relatedSections: ["675", "676", "278.31"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "278.35",
    {
      title: "Admissibility of record",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-278.35.html`,
      summary:
        "Sets out a joint-application procedure by which the prosecutor, accused, and complainant or witness may ask a judge to determine a record's admissibility without a hearing, including required contents, filing deadlines, the judge's determination and reasons, and when a hearing must instead be held; it does not apply to therapeutic records.",
      relatedSections: ["278.29", "278.31", "276"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "278.36",
    {
      title: "Publication prohibited",
      severity: "Summary",
      maxPenalty: "Summary conviction (no specific penalty amount stated in this section)",
      url: `${JUSTICE_LAWS_BASE}/section-278.36.html`,
      summary:
        "Prohibits publishing, broadcasting, or transmitting the contents of a joint application, evidence or submissions, or the resulting determination and reasons, subject to listed exceptions and a judge's order allowing publication. Contravening the ban is a summary conviction offence.",
      relatedSections: ["278.35"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "278.37",
    {
      title: "Instruction to jury — use of evidence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-278.37.html`,
      summary:
        "Requires the judge to instruct the jury on the permitted and prohibited uses of evidence admitted following a determination under the referenced section.",
      relatedSections: ["278.35"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "278.38",
    {
      title: "Appeal",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-278.38.html`,
      summary:
        "Deems a determination made under the referenced subsections to be a question of law for appeal purposes.",
      relatedSections: ["675", "676", "278.35"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "278.98",
    {
      title: "Reasons",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-278.98.html`,
      summary:
        "Requires a judge, in proceedings for listed sexual offences, to give reasons for a decision to acquit, convict, discharge, find not criminally responsible, or find unfit to stand trial, and requires those reasons to be recorded or put in writing; applies only in trials without a jury.",
      relatedSections: ["151", "152", "153", "153.1", "155", "160"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "279",
    {
      title: "Kidnapping",
      severity: "Hybrid",
      maxPenalty: "Life imprisonment for kidnapping. Mandatory minimum of 5 years (7 years for a second or subsequent offence) if a restricted or prohibited firearm is used, or any firearm is used for the benefit of, at the direction of, or in association with a criminal organization; 4 years if any other firearm is used; 5 years if the victim is under 16, unless the offender is the victim's parent, guardian, or a person having lawful care or charge of the victim (in which case this 5-year minimum does not apply); otherwise life imprisonment with no minimum. Forcible confinement under subsection (2) is separately punishable by up to 10 years' imprisonment on indictment, or by summary conviction.",
      url: `${JUSTICE_LAWS_BASE}/section-279.html`,
      definition:
        "Every person commits an offence who kidnaps a person with intent to cause the person to be confined or imprisoned against the person's will, to cause the person to be unlawfully sent or transported out of Canada against the person's will, or to hold the person for ransom or to service against the person's will; the offence is indictable and liable to imprisonment for life, subject to mandatory minimum sentences that vary depending on firearm use and the age of the victim. Every person who, without lawful authority, confines, imprisons or forcibly seizes another person is separately guilty of an indictable offence and liable to imprisonment for a term not exceeding ten years, or of an offence punishable on summary conviction.",
      relatedSections: ["279.01", "279.011", "280", "281"],
      defences: ["consent"],
      topicsTagged: ["kidnapping", "confinement", "liberty"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "279.01",
    {
      title: "Trafficking in persons",
      severity: "Indictable",
      maxPenalty: "Life imprisonment with a 5-year minimum if the offence involved kidnapping, aggravated assault, aggravated sexual assault, or death; 14 years indictable with a 4-year minimum in any other case.",
      url: `${JUSTICE_LAWS_BASE}/section-279.01.html`,
      summary:
        "Makes it an offence to recruit, transport, transfer, receive, hold, conceal, harbour, or exercise control over the movements of a person for the purpose of exploiting them or facilitating their exploitation. Consent to the conduct is not a valid defence, and living with or habitually associating with an exploited person is presumed evidence of exercising control for exploitation absent contrary evidence.",
      relatedSections: ["279.011"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "279.011",
    {
      title: "Trafficking of a person under the age of eighteen years",
      severity: "Indictable",
      maxPenalty: "Life imprisonment with a 6-year minimum if the offence involved kidnapping, aggravated assault, aggravated sexual assault, or death; 14 years indictable with a 5-year minimum in any other case.",
      url: `${JUSTICE_LAWS_BASE}/section-279.011.html`,
      summary:
        "Makes it an offence to recruit, transport, transfer, receive, hold, conceal, harbour, or exercise control over the movements of a person under 18 for the purpose of exploiting them or facilitating their exploitation. Consent to the conduct is not a valid defence.",
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "279.02",
    {
      title: "Material benefit — trafficking",
      severity: "Hybrid",
      maxPenalty: "10 years indictable, or summary conviction available, for receiving a benefit from trafficking an adult (s. 279.02(1)); 14 years indictable with a 2-year minimum for receiving a benefit from trafficking a person under 18 (s. 279.02(2)).",
      url: `${JUSTICE_LAWS_BASE}/section-279.02.html`,
      summary:
        "Makes it an offence to knowingly receive a financial or other material benefit derived from human trafficking under the referenced sections, with a separate, more serious version of the offence where the trafficking victim is under 18.",
      relatedSections: ["279.01", "279.011"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "279.03",
    {
      title: "Withholding or destroying documents — trafficking",
      severity: "Hybrid",
      maxPenalty: "5 years indictable, or summary conviction available, for concealing or destroying documents to facilitate trafficking an adult (s. 279.03(1)); 10 years indictable with a 1-year minimum for doing so to facilitate trafficking a person under 18 (s. 279.03(2)).",
      url: `${JUSTICE_LAWS_BASE}/section-279.03.html`,
      summary:
        "Makes it an offence to conceal, remove, withhold, or destroy another person's travel or identity/immigration document in order to commit or facilitate human trafficking, with a separate, more serious version of the offence where the trafficking victim is under 18.",
      relatedSections: ["279.01", "279.011"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "279.04",
    {
      title: "Exploitation",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-279.04.html`,
      summary:
        "Defines what it means to exploit another person for the purposes of the trafficking offences, describing the coercive conduct that could reasonably be expected to make a person believe their safety is threatened if they do not provide labour or a service, and lists factors and circumstances a court must consider in assessing exploitation, including organ or tissue removal by deception, force, or coercion.",
      relatedSections: ["279.01", "279.03"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "279.1",
    {
      title: "Hostage taking",
      severity: "Indictable",
      maxPenalty: "Life imprisonment, with a minimum of 5 years (first offence) or 7 years (subsequent offence) if a restricted or prohibited firearm is used, or any firearm is used for a criminal organization; a minimum of 4 years if any other firearm is used; no minimum in any other case.",
      url: `${JUSTICE_LAWS_BASE}/section-279.1.html`,
      summary:
        "Defines hostage taking as confining, imprisoning, seizing, or detaining a person while threatening death, bodily harm, or continued detention in order to compel a third party or organization to act, and makes hostage taking an indictable offence with escalating minimum penalties depending on whether a firearm was used, whether the offence involved a criminal organization, and whether it is a repeat offence.",
      relatedSections: ["85", "244", "244.2", "220", "236", "239"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "280",
    {
      title: "Abduction of person under age of 16",
      severity: "Hybrid",
      maxPenalty: "5 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-280.html`,
      summary:
        "Makes it an offence to take a person under 16 out of the possession of and against the will of their parent, guardian, or lawful caregiver without lawful authority, and defines guardian for this and related sections as including anyone with actual or legal custody or control of another person.",
      relatedSections: ["281", "283"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "281",
    {
      title: "Abduction of person under age of 14",
      severity: "Hybrid",
      maxPenalty: "10 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-281.html`,
      summary:
        "Makes it an offence for someone who is not the parent, guardian, or lawful caregiver of a person under 14 to unlawfully take, entice away, conceal, detain, receive, or harbour that person with intent to deprive the parent, guardian, or caregiver of possession of them.",
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "282",
    {
      title: "Abduction in contravention of custody or parenting order",
      severity: "Hybrid",
      maxPenalty: "10 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-282.html`,
      summary:
        "Makes it an offence for a parent, guardian, or lawful caregiver of a child under 14 to take, entice away, conceal, detain, receive, or harbour the child in contravention of a custody or parenting order, with intent to deprive another entitled person of possession of the child; also allows conviction under section 283 where the accused's lack of belief in the order's validity is the only reason the offence is not proven.",
      relatedSections: ["283"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "283",
    {
      title: "Abduction",
      severity: "Hybrid",
      maxPenalty: "10 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-283.html`,
      summary:
        "Makes it an offence for a parent, guardian, or lawful caregiver of a child under 14 to take, entice away, conceal, detain, receive, or harbour the child with intent to deprive another entitled person of possession, regardless of whether a custody or parenting order exists, and requires Attorney General consent before proceedings can begin.",
      relatedSections: ["282"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "284",
    {
      title: "Defence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-284.html`,
      summary:
        "Provides that no one is guilty of an offence under the abduction sections if they establish that the taking, enticing away, concealing, detaining, receiving, or harbouring of the young person was done with the consent of the parent, guardian, or other person with lawful care of that young person.",
      relatedSections: ["281", "283"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "285",
    {
      title: "Defence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-285.html`,
      summary:
        "Provides a defence to the abduction offences where the court is satisfied the taking, enticing away, concealing, detaining, receiving, or harbouring was necessary to protect the young person from imminent harm, or the accused was themselves escaping imminent harm.",
      relatedSections: ["280", "283"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "286",
    {
      title: "No defence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-286.html`,
      summary:
        "Provides that in proceedings for the abduction offences, it is not a defence that the young person consented to or suggested the accused's conduct.",
      relatedSections: ["280", "283"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "286.1",
    {
      title: "Obtaining sexual services for consideration",
      severity: "Hybrid",
      maxPenalty: "5 years indictable + minimum fine / summary fine or 2 years less a day (general, s. 286.1(1)); 14 years, minimum 6 months (first offence) / 1 year (subsequent), if the person is under 18 (s. 286.1(2))",
      url: `${JUSTICE_LAWS_BASE}/section-286.1.html`,
      summary:
        "Makes it an offence to obtain, or communicate to obtain, sexual services for consideration, with minimum fines that increase for offences occurring near places where minors may reasonably be present or for repeat offences, and creates a separate, more serious offence with mandatory minimum imprisonment where the person providing the sexual services is under 18.",
      relatedSections: ["197"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "286.2",
    {
      title: "Material benefit from sexual services",
      severity: "Hybrid",
      maxPenalty: "10 years indictable, or summary conviction available, for receiving a benefit from an adult's sexual services (s. 286.2(1)); 14 years indictable with a 2-year minimum for receiving a benefit from a person under 18's sexual services (s. 286.2(2)).",
      url: `${JUSTICE_LAWS_BASE}/section-286.2.html`,
      summary:
        "Makes it an offence to knowingly receive a financial or other material benefit derived from obtaining sexual services for consideration, with a more serious minimum-sentence version where the services were provided by a person under 18, subject to listed exceptions for legitimate living or business arrangements that do not apply where coercion, abuse of trust, intoxicants, exploitation-related conduct, or a commercial sexual-services enterprise are involved.",
      relatedSections: ["286.3"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "286.3",
    {
      title: "Procuring",
      severity: "Indictable",
      maxPenalty: "14 years indictable for procuring (s. 286.3(1)); 14 years indictable with a 5-year minimum for procuring a person under 18 (s. 286.3(2)).",
      url: `${JUSTICE_LAWS_BASE}/section-286.3.html`,
      summary:
        "Makes it an offence to procure a person to offer or provide sexual services for consideration, or to recruit, hold, conceal, harbour, or control the movements of such a person to facilitate that offence, with a more serious mandatory-minimum version where the person procured is under 18.",
      relatedSections: ["286.1"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "286.4",
    {
      title: "Advertising sexual services",
      severity: "Hybrid",
      maxPenalty: "5 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-286.4.html`,
      summary:
        "Makes it an offence to knowingly advertise an offer to provide sexual services for consideration.",
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "286.5",
    {
      title: "Immunity — material benefit and advertising",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-286.5.html`,
      summary:
        "Provides immunity from prosecution for material-benefit or advertising offences, or for aiding, abetting, conspiring, or being an accessory to such offences, where the conduct relates only to the offering or provision of the person's own sexual services.",
      relatedSections: ["286.2", "286.4", "286.1"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "290",
    {
      title: "Bigamy",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-290.html`,
      summary:
        "Defines bigamy as going through a form of marriage while already married, or knowing the other party is already married, or marrying more than one person on the same day, and sets out defences including a good-faith belief the spouse is dead, seven years' continuous absence of the spouse, prior divorce, or a prior marriage declared void; it also addresses presumed validity of marriages and related evidentiary matters.",
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "291",
    {
      title: "Punishment",
      severity: "Hybrid",
      maxPenalty: "5 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-291.html`,
      summary:
        "Makes committing bigamy an offence, and provides that a certificate of marriage is evidence of the marriage or form of marriage without needing to prove the signature or authority of the person who signed it.",
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "292",
    {
      title: "Procuring feigned marriage",
      severity: "Hybrid",
      maxPenalty: "5 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-292.html`,
      summary:
        "Makes it an offence to procure or knowingly aid in procuring a feigned marriage between oneself and another person, and requires that a conviction not rest on the evidence of a single uncorroborated witness.",
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "293",
    {
      title: "Polygamy",
      severity: "Hybrid",
      maxPenalty: "5 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-293.html`,
      summary:
        "Makes it an offence to practise, enter into, or consent to any form of polygamy or simultaneous conjugal union with more than one person, or to celebrate, assist, or be party to a rite or ceremony purporting to sanction such a relationship, and provides that proof of the method of entry or of sexual intercourse is not required.",
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "293.1",
    {
      title: "Forced marriage",
      severity: "Hybrid",
      maxPenalty: "5 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-293.1.html`,
      summary:
        "Makes it an offence to celebrate, aid, or participate in a marriage rite or ceremony knowing that one of the persons being married is marrying against their will.",
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "293.2",
    {
      title: "Marriage under age of 16 years",
      severity: "Hybrid",
      maxPenalty: "5 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-293.2.html`,
      summary:
        "Makes it an offence to celebrate, aid, or participate in a marriage rite or ceremony knowing that one of the persons being married is under the age of 16 years.",
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "294",
    {
      title: "Pretending to solemnize marriage",
      severity: "Hybrid",
      maxPenalty: "2 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-294.html`,
      summary:
        "Makes it an offence to solemnize or pretend to solemnize a marriage without lawful authority, or to procure a person to solemnize a marriage knowing that they are not lawfully authorized to do so.",
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "295",
    {
      title: "Marriage contrary to law",
      severity: "Hybrid",
      maxPenalty: "2 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-295.html`,
      summary:
        "Makes it an offence for a person lawfully authorized to solemnize marriage to knowingly do so in contravention of federal or provincial law.",
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "297",
    {
      title: "Definition of newspaper",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-297.html`,
      summary:
        "Defines newspaper for the purposes of the specified sections as certain periodically published papers, magazines, or periodicals containing news or advertisements.",
      relatedSections: ["303", "304", "308"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "298",
    {
      title: "Definition",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-298.html`,
      summary:
        "Defines defamatory libel as unjustified published matter likely to injure a person's reputation by exposing them to hatred, contempt, or ridicule, or that is designed to insult them, and states that it may be expressed directly, by insinuation or irony, in words, or by another object.",
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "299",
    {
      title: "Publishing",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-299.html`,
      summary:
        "Defines when a person publishes a libel: by exhibiting it in public, causing it to be read or seen, or showing or delivering it, or causing it to be shown or delivered, with intent that it should be read or seen by any person other than the person whom it defames.",
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "300",
    {
      title: "Punishment of libel known to be false",
      severity: "Hybrid",
      maxPenalty: "5 years indictable",
      url: `${JUSTICE_LAWS_BASE}/section-300.html`,
      summary:
        "Makes it an offence to publish a defamatory libel while knowing it is false.",
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "301",
    {
      title: "Punishment for defamatory libel",
      severity: "Hybrid",
      maxPenalty: "2 years indictable",
      url: `${JUSTICE_LAWS_BASE}/section-301.html`,
      summary:
        "Makes it an offence to publish a defamatory libel.",
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "302",
    {
      title: "Extortion by libel",
      severity: "Hybrid",
      maxPenalty: "5 years indictable",
      url: `${JUSTICE_LAWS_BASE}/section-302.html`,
      summary:
        "Makes it an offence to publish, threaten to publish, or offer to withhold publication of a defamatory libel in order to extort money or induce someone to confer an appointment or office, and also makes it an offence to publish or threaten to publish a defamatory libel after such a demand is refused.",
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "303",
    {
      title: "Proprietor of newspaper presumed responsible",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-303.html`,
      summary:
        "Deems a newspaper's proprietor to have published defamatory matter appearing in it unless they prove it was inserted without their knowledge or negligence, sets out when authority given to a manager or editor does not count as negligence, and provides that merely selling a newspaper containing defamatory matter is not publishing it unless the seller knew of the defamatory content.",
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "304",
    {
      title: "Selling book containing defamatory libel",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-304.html`,
      summary:
        "Provides that selling a book, magazine, pamphlet or similar item containing defamatory matter is not publishing it unless the seller knew of the content, and sets out when an employer is not deemed to publish defamatory matter sold by an employee.",
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "305",
    {
      title: "Publishing proceedings of courts of justice",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-305.html`,
      summary:
        "Provides that publishing defamatory matter that occurs only in a court proceeding or in an inquiry under an Act or governmental authority is not publishing a defamatory libel.",
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "306",
    {
      title: "Parliamentary papers",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-306.html`,
      summary:
        "Provides that publishing defamatory matter contained in a petition to Parliament or a provincial legislature, or in a paper published by their order or authority, or a good-faith extract or abstract of such material, is not publishing a defamatory libel.",
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "307",
    {
      title: "Fair reports of parliamentary or judicial proceedings",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-307.html`,
      summary:
        "Provides that a good-faith, fair report of parliamentary or judicial proceedings, or fair comment on such proceedings, is not publishing a defamatory libel, except that this protection does not extend to certain unauthorized reports of divorce-related evidence before Parliament.",
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "308",
    {
      title: "Fair report of public meeting",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-308.html`,
      summary:
        "Provides that a good-faith, fair and accurate newspaper report of a lawfully convened public meeting is not publishing a defamatory libel, provided the publication is for public benefit and the newspaper allows the defamed person a reasonable right of reply.",
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "309",
    {
      title: "Public benefit",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-309.html`,
      summary:
        "Provides that publishing defamatory matter reasonably believed to be true and relevant to a matter of public interest whose discussion serves the public benefit is not publishing a defamatory libel.",
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "310",
    {
      title: "Fair comment on public person or work of art",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-310.html`,
      summary:
        "Provides that publishing fair comments on the public conduct of a person involved in public affairs, or on a published work or public performance, is not publishing a defamatory libel where the comments are confined to criticism.",
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "311",
    {
      title: "When truth a defence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-311.html`,
      summary:
        "Provides that publishing defamatory matter is not a defamatory libel where the person proves the publication was for the public benefit and that the matter was true.",
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "312",
    {
      title: "Publication invited or necessary",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-312.html`,
      summary:
        "Provides that publishing defamatory matter invited or challenged by the person defamed, or necessary to refute defamatory matter published by another about that person, is not a defamatory libel if believed true, relevant, and not excessive.",
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "313",
    {
      title: "Answer to inquiries",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-313.html`,
      summary:
        "Provides that publishing defamatory matter in good-faith answer to an inquiry from someone with a genuine interest in knowing the truth is not a defamatory libel if it is believed true, relevant, and not excessive.",
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "314",
    {
      title: "Giving information to person interested",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-314.html`,
      summary:
        "Provides that publishing defamatory matter to inform another person with a genuine interest in the subject is not a defamatory libel if the conduct is reasonable, the matter relevant, and the matter true or made without ill-will and reasonably believed true.",
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "315",
    {
      title: "Publication in good faith for redress of wrong",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-315.html`,
      summary:
        "Provides that publishing defamatory matter in good faith to seek a remedy or redress for a wrong or grievance is not a defamatory libel if believed true, relevant to the remedy sought, and not excessive.",
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "316",
    {
      title: "Proving publication by order of legislature",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-316.html`,
      summary:
        "Allows an accused charged with publishing a defamatory libel to prove the matter was contained in a paper published by order or authority of Parliament or a provincial legislature, in which case the court must direct a not-guilty verdict and discharge the accused, and sets out that a certificate from the relevant Speaker or clerk is conclusive proof of this.",
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "317",
    {
      title: "Verdicts in cases of defamatory libel",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-317.html`,
      summary:
        "Sets out how a jury must be instructed and may render its verdict at a trial for publishing a defamatory libel, including that a general verdict is available and the judge may give a direction or opinion but cannot direct a guilty verdict merely from proof of publication.",
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "318",
    {
      title: "Advocating genocide",
      severity: "Indictable",
      maxPenalty: "5 years",
      url: `${JUSTICE_LAWS_BASE}/section-318.html`,
      summary:
        "Makes it an offence to advocate or promote genocide, defines genocide and identifiable group for this purpose, and requires Attorney General consent before a prosecution can be started.",
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "319",
    {
      title: "Public incitement of hatred",
      severity: "Hybrid",
      maxPenalty: "2 years indictable",
      url: `${JUSTICE_LAWS_BASE}/section-319.html`,
      summary:
        "Makes it an offence to incite hatred against an identifiable group likely to breach the peace, to wilfully promote hatred against such a group, to wilfully promote antisemitism by condoning, denying or downplaying the Holocaust, or to wilfully promote hatred by displaying specified hate-related symbols, and sets out defences, forfeiture, exemptions, definitions, and a requirement of Attorney General consent for certain prosecutions.",
      relatedSections: ["318", "199", "83.01"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "320",
    {
      title: "Warrant of seizure",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-320.html`,
      summary:
        "Sets out the process for a judge to issue a warrant to seize hate propaganda kept for sale or distribution, requires a summons to the occupier to show cause, allows the owner and author to oppose forfeiture, and sets out forfeiture or return of the material, an appeal right, a consent requirement, and definitions.",
      relatedSections: ["318", "319"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "320.1",
    {
      title: "Warrant of seizure",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-320.1.html`,
      summary:
        "Sets out the process for a judge to order a computer system's custodian to copy, remove, and identify the poster of online hate propaganda, notify the poster with a chance to be heard, and either order deletion of the material or its return depending on the court's findings.",
      relatedSections: ["320", "342.1"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "320.1001",
    {
      title: "Offence motivated by hatred",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-320.1001.html`,
      summary:
        "Makes it an offence to commit any offence under this or another federal Act where the offence is motivated by hatred based on specified personal characteristics, sets out the resulting maximum penalties tied to the underlying offence's maximum, clarifies what does not count as hatred-motivated, and limits when this offence can be prosecuted by indictment.",
      relatedSections: ["319"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "320.101",
    {
      title: "Definition of conversion therapy",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-320.101.html`,
      summary:
        "Defines conversion therapy for the purposes of the following sections, listing the practices, treatments or services it covers, and clarifies that practices relating to exploring or developing an integrated personal identity, including gender transition, are not included.",
      relatedSections: ["320.102", "320.103", "320.104"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "320.102",
    {
      title: "Conversion therapy",
      severity: "Hybrid",
      maxPenalty: "5 years indictable",
      url: `${JUSTICE_LAWS_BASE}/section-320.102.html`,
      summary:
        "Makes it an offence to knowingly cause another person to undergo conversion therapy, including by providing it.",
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "320.103",
    {
      title: "Promoting or advertising",
      severity: "Hybrid",
      maxPenalty: "2 years indictable",
      url: `${JUSTICE_LAWS_BASE}/section-320.103.html`,
      summary:
        "Makes it an offence to knowingly promote or advertise conversion therapy.",
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "320.104",
    {
      title: "Material benefit",
      severity: "Hybrid",
      maxPenalty: "2 years indictable",
      url: `${JUSTICE_LAWS_BASE}/section-320.104.html`,
      summary:
        "Makes it an offence to receive a financial or other material benefit known to come from providing conversion therapy.",
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],

  // ── Part VIII.1 — Offences Relating to Conveyances ──
  [
    "320.11",
    {
      title: "Definitions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-320.11.html`,
      summary:
        "Defines terms used throughout this Part, including analyst, approved container, approved drug screening equipment, approved instrument, approved screening device, conveyance, evaluating officer, operate, qualified medical practitioner, qualified technician, and vessel.",
      relatedSections: ["320.4", "320.39"],
      partOf: "Part VIII.1 — Offences Relating to Conveyances",
    },
  ],
  [
    "320.12",
    {
      title: "Recognition and declaration",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-320.12.html`,
      summary:
        "Sets out Parliament's recognition and declaration regarding the privilege of operating a conveyance, the public safety rationale for deterring impaired or dangerous operation, and the reliability of approved breath instruments and evaluating officer assessments.",
      partOf: "Part VIII.1 — Offences Relating to Conveyances",
    },
  ],
  [
    "320.13",
    {
      title: "Dangerous operation",
      severity: "Hybrid",
      maxPenalty: "10 years indictable, or summary conviction, for the base dangerous-operation offence (s. 320.19(5)); 14 years indictable/summary with escalating minimums if bodily harm results (s. 320.2); life imprisonment with escalating minimums if death results (s. 320.21).",
      url: `${JUSTICE_LAWS_BASE}/section-320.13.html`,
      summary:
        "Makes it an offence to operate a conveyance in a manner dangerous to the public, and makes it a further offence where that dangerous operation causes bodily harm or death to another person.",
      partOf: "Part VIII.1 — Offences Relating to Conveyances",
    },
  ],
  [
    "320.14",
    {
      title: "Operation while impaired",
      severity: "Hybrid",
      maxPenalty: "10 years indictable or summary conviction (up to $5,000 fine or 2 years less a day, or both), with a minimum fine of $1,000 for a first offence, imprisonment for 30 days for a second, and 120 days for each subsequent (higher first-offence minimum fines of $1,500-$2,000 apply at high blood alcohol concentrations); 14 years indictable/summary with the same minimums if bodily harm results; life imprisonment with the same minimums if death results; the standalone low-blood-drug-concentration offence is summary conviction only, maximum $1,000 fine (s. 320.19, 320.2, 320.21).",
      url: `${JUSTICE_LAWS_BASE}/section-320.14.html`,
      definition:
        "Everyone commits an offence who operates a conveyance while their ability to operate it is impaired to any degree by alcohol, a drug, or a combination of the two; who has, within two hours after ceasing to operate, a blood alcohol concentration at or above 80 mg of alcohol per 100 mL of blood; who has, within that period, a blood drug concentration at or above the level prescribed by regulation for that drug; or who has, within that period, a blood alcohol concentration and a blood drug concentration that each meet or exceed the levels prescribed by regulation for that combination of alcohol and drug. A person who commits any of these offences and, while operating the conveyance, causes bodily harm to, or the death of, another person commits a separate offence. It is also an offence to have, within two hours after ceasing to operate a conveyance, a blood drug concentration that meets or exceeds the regulated level but is below the level required for the paragraph (1)(c) offence. No offence is committed under the blood-alcohol, blood-drug, or combined-concentration provisions where the alcohol or drug was consumed after the person stopped operating the conveyance, the person had no reasonable expectation at that time of being required to provide a bodily sample, and, for the alcohol-based provisions, their consumption is consistent with having had a blood alcohol concentration below the relevant threshold while actually operating the conveyance.",
      relatedSections: ["320.15", "320.16", "320.17", "320.19"],
      defences: ["bolus drinking defence (limited)", "consumption after driving"],
      topicsTagged: ["impaired driving", "alcohol", "drug", "BAC"],
      partOf: "Part VIII.1 — Offences Relating to Conveyances",
    },
  ],
  [
    "320.15",
    {
      title: "Failure or refusal to comply with demand",
      severity: "Hybrid",
      maxPenalty: "10 years indictable or summary conviction (up to $5,000 fine or 2 years less a day, or both), with a minimum fine of $2,000 for a first offence, imprisonment for 30 days for a second, and 120 days for each subsequent; 14 years indictable/summary with the same minimums if bodily harm results; life imprisonment with the same minimums if death results (s. 320.19(1), (4), 320.2, 320.21).",
      url: `${JUSTICE_LAWS_BASE}/section-320.15.html`,
      definition:
        "Everyone commits an offence who, knowing that a demand has been made, fails or refuses to comply, without reasonable excuse, with a demand made under section 320.27 or 320.28. A person who commits this offence and, at the time, knows or is reckless as to whether they were involved in an accident causing bodily harm to another person commits a separate, more serious offence, as does a person who knows or is reckless as to whether the accident caused death or caused bodily harm from which death results. A person cannot be convicted of more than one offence under this section arising from the same transaction.",
      relatedSections: ["320.14", "320.16", "320.19", "320.27", "320.28"],
      defences: ["reasonable excuse (e.g., medical condition)", "incapability of providing sample"],
      topicsTagged: ["breathalyzer", "refusal", "demand"],
      partOf: "Part VIII.1 — Offences Relating to Conveyances",
    },
  ],
  [
    "320.16",
    {
      title: "Failure to stop after accident",
      severity: "Hybrid",
      maxPenalty: "10 years indictable or summary conviction for the base offence; 14 years indictable/summary with escalating minimums ($1,000 fine first offence, 30 days second, 120 days subsequent) if the accident caused bodily harm; life imprisonment with the same escalating minimums if the accident caused death (s. 320.19(5), 320.2, 320.21).",
      url: `${JUSTICE_LAWS_BASE}/section-320.16.html`,
      definition:
        "Everyone commits an offence who operates a conveyance and, at the time of operating it, knows that, or is reckless as to whether, the conveyance has been involved in an accident with a person or another conveyance, and who fails, without reasonable excuse, to stop the conveyance, give their name and address, and, if any person has been injured or appears to require assistance, offer assistance. A person who commits this offence while knowing, or being reckless as to whether, the accident resulted in bodily harm to another person commits a separate offence, as does a person who commits it while knowing, or being reckless as to whether, the accident resulted in the death of another person or in bodily harm to another person whose death ensues.",
      relatedSections: ["320.14", "320.17", "320.19"],
      defences: ["did not know accident occurred", "fear for personal safety"],
      topicsTagged: ["hit and run", "accident", "failure to stop"],
      partOf: "Part VIII.1 — Offences Relating to Conveyances",
    },
  ],
  [
    "320.17",
    {
      title: "Flight from peace officer",
      severity: "Hybrid",
      maxPenalty: "10 years indictable, or summary conviction (s. 320.19(5)).",
      url: `${JUSTICE_LAWS_BASE}/section-320.17.html`,
      definition:
        "Everyone commits an offence who operates a motor vehicle or vessel while being pursued by a peace officer and fails, without reasonable excuse, to stop the motor vehicle or vessel as soon as is reasonable in the circumstances.",
      relatedSections: ["320.14", "320.16", "320.19"],
      defences: ["reasonable excuse for not stopping (e.g., unsafe location)"],
      topicsTagged: ["flight", "police pursuit", "conveyance"],
      partOf: "Part VIII.1 — Offences Relating to Conveyances",
    },
  ],
  [
    "320.18",
    {
      title: "Operation while prohibited",
      severity: "Hybrid",
      maxPenalty: "10 years indictable, or summary conviction (s. 320.19(5)).",
      url: `${JUSTICE_LAWS_BASE}/section-320.18.html`,
      summary:
        "Makes it an offence to operate a conveyance while prohibited from doing so by a court order or other legal restriction, with an exception for a person properly registered in and complying with an alcohol ignition interlock device program.",
      relatedSections: ["730"],
      partOf: "Part VIII.1 — Offences Relating to Conveyances",
    },
  ],
  [
    "320.19",
    {
      title: "Punishment",
      severity: "Hybrid",
      maxPenalty: "10 years indictable or summary conviction (up to $5,000 fine or 2 years less a day, or both) for the base impaired/refusal offences, with a minimum fine of $1,000 for a first offence, 30 days for a second, 120 days for each subsequent (higher first-offence minimums apply for high blood alcohol concentration or refusal); summary conviction only, maximum $1,000 fine, for the low-blood-drug-concentration offence; 10 years indictable or summary conviction, no minimum, for the dangerous-operation/fail-to-stop/prohibited-driving base offences.",
      url: `${JUSTICE_LAWS_BASE}/section-320.19.html`,
      summary:
        "Sets out the punishment for offences under subsection 320.14(1) or 320.15(1), including minimum punishments that escalate for repeat offences and higher minimum fines tied to specified higher blood alcohol concentrations, a separate summary conviction penalty for an offence under subsection 320.14(4), and punishment for offences under subsection 320.13(1) or 320.16(1), section 320.17, or subsection 320.18(1).",
      relatedSections: ["320.13", "320.14", "320.15", "320.16", "320.17", "320.18"],
      partOf: "Part VIII.1 — Offences Relating to Conveyances",
    },
  ],
  [
    "320.2",
    {
      title: "Punishment in case of bodily harm",
      severity: "Hybrid",
      maxPenalty: "Indictable: up to 14 years. Summary conviction: fine of not more than $5,000 or imprisonment of not more than 2 years less a day, or both. Both branches carry mandatory minimums: $1,000 fine for a first offence, 30 days imprisonment for a second offence, and 120 days imprisonment for each subsequent offence.",
      url: `${JUSTICE_LAWS_BASE}/section-320.2.html`,
      summary:
        "Sets out the punishment, including escalating minimum punishments for repeat offences, for offences under subsection 320.13(2), 320.14(2), 320.15(2) or 320.16(2) that cause bodily harm.",
      relatedSections: ["320.13", "320.14", "320.15", "320.16"],
      partOf: "Part VIII.1 — Offences Relating to Conveyances",
    },
  ],
  [
    "320.21",
    {
      title: "Punishment in case of death",
      severity: "Indictable",
      maxPenalty: "Life imprisonment (indictable only), with mandatory minimums of a $1,000 fine for a first offence, 30 days imprisonment for a second offence, and 120 days imprisonment for each subsequent offence.",
      url: `${JUSTICE_LAWS_BASE}/section-320.21.html`,
      summary:
        "Sets out the punishment, including escalating minimum punishments for repeat offences, for offences under subsection 320.13(3), 320.14(3), 320.15(3) or 320.16(3) that cause death.",
      relatedSections: ["320.13", "320.14", "320.15", "320.16"],
      partOf: "Part VIII.1 — Offences Relating to Conveyances",
    },
  ],
  [
    "320.22",
    {
      title: "Aggravating circumstances for sentencing purposes",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-320.22.html`,
      summary:
        "Lists factors a court must treat as aggravating when sentencing for conveyance-operation offences, such as multiple victims, street racing, a young passenger, being paid to operate the conveyance, a high blood alcohol concentration, operating a large motor vehicle, or not being permitted to operate the conveyance.",
      relatedSections: ["320.13", "320.14", "320.15", "320.16", "320.17", "320.18"],
      partOf: "Part VIII.1 — Offences Relating to Conveyances",
    },
  ],
  [
    "320.23",
    {
      title: "Delay of sentencing",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-320.23.html`,
      summary:
        "Allows a court, with the consent of the prosecutor and offender, to delay sentencing of an offender found guilty of an offence under subsection 320.14(1) or 320.15(1) so they can attend an approved treatment program, imposes a prohibition on operating the conveyance before sentencing, and relieves the offender of the mandatory minimum punishment under section 320.19 and the prohibition order under section 320.24 if the program is completed successfully.",
      relatedSections: ["320.14", "320.15", "320.19", "320.24", "730"],
      partOf: "Part VIII.1 — Offences Relating to Conveyances",
    },
  ],
  [
    "320.24",
    {
      title: "Mandatory prohibition order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-320.24.html`,
      summary:
        "Requires a court to impose a mandatory prohibition order against operating a conveyance for offenders found guilty of an offence under subsection 320.14(1) or 320.15(1), with prohibition periods that increase for repeat offences, and allows discretionary prohibition orders of varying length for offenders found guilty of other listed offences, along with related rules on the order's effect, notice to the offender, consecutive prohibition periods, and eligibility for an alcohol ignition interlock program.",
      relatedSections: ["320.14", "320.15", "220", "221", "236", "320.13"],
      partOf: "Part VIII.1 — Offences Relating to Conveyances",
    },
  ],
  [
    "320.25",
    {
      title: "Stay of order pending appeal",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-320.25.html`,
      summary:
        "Allows a judge of the appeal court to stay a prohibition order under section 320.24 pending the outcome of an appeal of a conviction or sentence for an offence under any of sections 320.13 to 320.18, restricts this power for Supreme Court of Canada appeals, and provides that conditions on a stay do not decrease the prohibition period.",
      relatedSections: ["320.13", "320.14", "320.15", "320.16", "320.18", "320.24"],
      partOf: "Part VIII.1 — Offences Relating to Conveyances",
    },
  ],
  [
    "320.26",
    {
      title: "Earlier and subsequent offences",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-320.26.html`,
      summary:
        "Sets out which prior convictions count as an earlier offence when determining whether a current offence under subsection 320.14(1) or 320.15(1) is a second, third, or subsequent offence for sentencing purposes.",
      relatedSections: ["320.14", "320.15"],
      partOf: "Part VIII.1 — Offences Relating to Conveyances",
    },
  ],
  [
    "320.27",
    {
      title: "Testing for presence of alcohol or drug",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-320.27.html`,
      summary:
        "Authorizes a peace officer with reasonable suspicion of alcohol or drugs in a person's body who recently operated a conveyance to demand physical coordination tests and breath or bodily substance samples for screening devices, and separately authorizes mandatory roadside breath screening of a person operating a motor vehicle.",
      partOf: "Part VIII.1 — Offences Relating to Conveyances",
    },
  ],
  [
    "320.28",
    {
      title: "Samples of breath or blood — alcohol",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-320.28.html`,
      summary:
        "Authorizes a peace officer with reasonable grounds to believe a person's ability to operate a conveyance was impaired by alcohol or drugs to demand breath or blood samples or an evaluation, sets out conditions and procedures for taking blood samples, and allows a person from whom blood was taken to apply to a judge for release of a retained sample.",
      relatedSections: ["320.14"],
      partOf: "Part VIII.1 — Offences Relating to Conveyances",
    },
  ],
  [
    "320.29",
    {
      title: "Warrants to obtain blood samples",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-320.29.html`,
      summary:
        "Allows a justice to issue a warrant authorizing blood samples to be taken from a person involved in an accident causing bodily harm or death, who is suspected of having alcohol or drugs in their body and is medically unable to consent, and sets out the warrant's form, duration, and related procedural requirements.",
      relatedSections: ["320.28"],
      partOf: "Part VIII.1 — Offences Relating to Conveyances",
    },
  ],
  [
    "320.3",
    {
      title: "Testing blood — drug or alcohol",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-320.3.html`,
      summary:
        "Provides that blood samples taken under this Part may be analyzed to determine blood alcohol or blood drug concentration.",
      partOf: "Part VIII.1 — Offences Relating to Conveyances",
    },
  ],
  [
    "320.31",
    {
      title: "Breath samples",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-320.31.html`,
      summary:
        "Sets out rules for proving a person's blood alcohol or blood drug concentration through breath or blood sample analysis, including conditions for conclusive proof, what evidence does not undermine an analysis, a presumption used to back-calculate blood alcohol concentration, admissibility of an evaluating officer's opinion and drug presumptions, and rules on the admissibility of analysis results, failure to provide a sample, and statements made to police.",
      relatedSections: ["320.14", "320.27", "320.28"],
      partOf: "Part VIII.1 — Offences Relating to Conveyances",
    },
  ],
  [
    "320.32",
    {
      title: "Certificates",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-320.32.html`,
      summary:
        "Sets out rules for using certificates from analysts, medical practitioners, or technicians as evidence, including notice requirements, the right to require the signer's attendance for cross-examination, related application procedures, the evidentiary effect of prohibition certificates, and a presumption of notice of a prohibition after mailing.",
      relatedSections: ["320.18"],
      partOf: "Part VIII.1 — Offences Relating to Conveyances",
    },
  ],
  [
    "320.33",
    {
      title: "Printout from approved instrument",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-320.33.html`,
      summary:
        "A printout from an approved breath-testing instrument, signed by a qualified technician certifying it as the instrument's output, is evidence of the facts it states without needing proof of the signer's signature or official status.",
      partOf: "Part VIII.1 — Offences Relating to Conveyances",
    },
  ],
  [
    "320.34",
    {
      title: "Disclosure of information",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-320.34.html`,
      summary:
        "Requires the prosecutor, in proceedings for an offence under section 320.14, to disclose to the accused specified breath-test data, and sets out a process — including timing and content requirements — for the accused to apply for further disclosure.",
      relatedSections: ["320.14", "320.28", "320.31"],
      partOf: "Part VIII.1 — Offences Relating to Conveyances",
    },
  ],
  [
    "320.35",
    {
      title: "Presumption of operation",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-320.35.html`,
      summary:
        "In proceedings for an offence under section 320.14 or 320.15, a person who occupied the seat or position ordinarily used to operate a conveyance is presumed to have been operating it, unless they show they did not occupy that position in order to set the conveyance in motion.",
      relatedSections: ["320.14", "320.15"],
      partOf: "Part VIII.1 — Offences Relating to Conveyances",
    },
  ],
  [
    "320.36",
    {
      title: "Unauthorized use of bodily substance",
      severity: "Summary",
      maxPenalty: "summary conviction (s. 787 default penalty applies unless otherwise stated)",
      url: `${JUSTICE_LAWS_BASE}/section-320.36.html`,
      summary:
        "Prohibits using a bodily substance obtained under this Part for anything other than the authorized analysis, and prohibits disclosing evaluation, test, or analysis results except for drug/alcohol/vehicle-operation law enforcement purposes or with permitted exceptions; contravening either prohibition is a summary conviction offence.",
      partOf: "Part VIII.1 — Offences Relating to Conveyances",
    },
  ],
  [
    "320.37",
    {
      title: "Refusal to take sample",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-320.37.html`,
      summary:
        "Protects a medical practitioner or technician from guilt for refusing to take a blood sample if they have a reasonable excuse, and from liability for taking a sample with reasonable care and skill.",
      partOf: "Part VIII.1 — Offences Relating to Conveyances",
    },
  ],
  [
    "320.38",
    {
      title: "Regulations",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-320.38.html`,
      summary:
        "Authorizes the Governor in Council to make regulations on evaluating officer qualifications and training, prescribed drug/alcohol concentrations, physical coordination tests, and evaluation procedures and forms.",
      relatedSections: ["320.14", "320.27", "320.28"],
      partOf: "Part VIII.1 — Offences Relating to Conveyances",
    },
  ],
  [
    "320.39",
    {
      title: "Approval — Attorney General of Canada",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-320.39.html`,
      summary:
        "Authorizes the Attorney General of Canada to approve devices and equipment for detecting alcohol or drugs, instruments for analyzing breath samples, and containers for blood samples.",
      partOf: "Part VIII.1 — Offences Relating to Conveyances",
    },
  ],
  [
    "320.4",
    {
      title: "Designation — Attorney General",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-320.4.html`,
      summary:
        "Authorizes the Attorney General to designate persons or classes of persons as qualified to operate approved instruments, take or analyze bodily substance samples, or certify alcohol standards.",
      partOf: "Part VIII.1 — Offences Relating to Conveyances",
    },
  ],

  // ── Part IX — Offences Against Rights of Property ──
  [
    "321",
    {
      title: "Definitions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-321.html`,
      summary:
        "Defines terms used in this Part, including break, credit card, document, exchequer bill, exchequer bill paper, false document, and revenue paper.",
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "322",
    {
      title: "Theft",
      severity: "",
      maxPenalty: "See s. 334",
      url: `${JUSTICE_LAWS_BASE}/section-322.html`,
      definition:
        "Every one commits theft who, fraudulently and without colour of right, takes or converts to their own or another's use anything, whether animate or inanimate, intending to deprive the owner or a person with a special property or interest in it of the thing (temporarily or absolutely), to pledge or deposit it as security, to part with it under a condition they may be unable to perform, or to deal with it so that it cannot be restored in its original condition. Theft is complete once, with intent to steal, the thing is moved or begins to be made movable, and a taking or conversion may be fraudulent even without secrecy or concealment.",
      relatedSections: ["334", "343", "354", "380"],
      defences: ["colour of right", "claim of right"],
      topicsTagged: ["theft", "property", "fraud"],
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "323",
    {
      title: "Oysters",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-323.html`,
      summary:
        "Provides that a person with marked or known ownership of oysters or oyster beds is deemed to have a special property interest in them, and that an indictment describing an oyster bed by name or otherwise need not state its territorial division.",
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "324",
    {
      title: "Theft by bailee of things under seizure",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-324.html`,
      summary:
        "A bailee who is lawfully obliged to produce and deliver seized property to a peace officer or entitled person, but fails to do so, commits theft, unless the failure was not the result of a willful act or omission.",
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "325",
    {
      title: "Agent pledging goods, when not theft",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-325.html`,
      summary:
        "A factor or agent who pledges or gives a lien on goods entrusted to them does not commit theft if the pledge or lien does not exceed amounts owed to them by their principal, including accepted bills of exchange.",
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "326",
    {
      title: "Theft of telecommunication service",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-326.html`,
      summary:
        "Makes it theft to fraudulently, maliciously, or without colour of right abstract, consume, waste, or divert electricity or gas, or to use a telecommunication facility or obtain a telecommunication service.",
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "327",
    {
      title: "Possession of device to obtain use of telecommunication facility or service",
      severity: "Hybrid",
      maxPenalty: "2 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-327.html`,
      summary:
        "Prohibits making, possessing, selling, importing, or distributing a device designed primarily to obtain telecommunication facilities or services without payment, knowing it has been or will be used for that purpose, and provides for forfeiture of such devices on conviction, with a limitation protecting innocent telecommunication service providers.",
      relatedSections: ["326", "342.1"],
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "328",
    {
      title: "Theft by or from person having special property or interest",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-328.html`,
      summary:
        "Allows a person to be convicted of theft even where the stolen item was taken between an owner and someone with a special property interest, between joint owners or partners, by a lessee from a reversioner, or by an organization's representatives from the organization.",
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "330",
    {
      title: "Theft by person required to account",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-330.html`,
      summary:
        "A person who receives something on terms requiring them to account for or pay it (or its proceeds) to another and fraudulently fails to do so commits theft, though a proper accounting entry in a debtor-creditor arrangement can satisfy this requirement.",
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "331",
    {
      title: "Theft by person holding power of attorney",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-331.html`,
      summary:
        "A person entrusted with a power of attorney for disposing of property who fraudulently sells, mortgages, or otherwise disposes of the property or its proceeds for an unauthorized purpose commits theft.",
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "332",
    {
      title: "Misappropriation of money held under direction",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-332.html`,
      summary:
        "A person who receives money, security, or a power of attorney with directions on how it must be applied or to whom it must be paid, and fraudulently applies or pays it contrary to those directions, commits theft, subject to an exception for ordinary debtor-creditor account dealings absent a written direction.",
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "333",
    {
      title: "Taking ore for scientific purpose",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-333.html`,
      summary:
        "A person does not commit theft merely by taking a specimen of ore or mineral for exploration or scientific investigation from unenclosed, unoccupied land that is not a mine, quarry, or digging.",
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "333.1",
    {
      title: "Motor vehicle theft",
      severity: "Hybrid",
      maxPenalty: "10 years indictable, with a 6-month minimum for a third or subsequent offence, or 2 years less a day summary, for motor vehicle theft; 14 years indictable if violence is used, threatened, or attempted, or if committed for a criminal organization.",
      url: `${JUSTICE_LAWS_BASE}/section-333.1.html`,
      summary:
        "Makes theft of a motor vehicle an offence, with escalated penalties for repeat offences and separate, more serious offences where violence is used, threatened, or attempted, or where the theft benefits a criminal organization.",
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "333.11",
    {
      title: "Sentences to be served consecutively — breaking and entering",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-333.11.html`,
      summary:
        "Requires that a sentence imposed under subsection 333.1(3) or (4) be served consecutively to a related sentence under section 348 for breaking and entering arising from the same event or series of events, and that a sentence for a second or subsequent offence under subsection 333.1(3) or (4) be served consecutively to any other related sentence arising from the same event or series of events.",
      relatedSections: ["333.1", "348"],
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "333.2",
    {
      title: "Possession of device for purpose of committing theft",
      severity: "Hybrid",
      maxPenalty: "10 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-333.2.html`,
      summary:
        "Makes it an offence to possess an electronic device suitable for motor vehicle theft for that purpose, or to make, sell, import, or distribute such a device knowing it has been or will be used for motor vehicle theft, and provides for forfeiture of the device on conviction.",
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "334",
    {
      title: "Punishment for theft",
      severity: "Hybrid",
      maxPenalty: "10 years indictable, or summary conviction available, if the stolen property is a testamentary instrument or worth more than $5,000; 2 years indictable, or summary conviction available, if $5,000 or less.",
      url: `${JUSTICE_LAWS_BASE}/section-334.html`,
      definition:
        "Except where otherwise provided by law, every one who commits theft is guilty, where the property stolen is a testamentary instrument or the value of what is stolen is more than $5,000, of an indictable offence liable to imprisonment for a term not exceeding ten years, or of an offence punishable on summary conviction; and, where the value of what is stolen is not more than $5,000, is guilty of an indictable offence liable to imprisonment for a term not exceeding two years, or of an offence punishable on summary conviction.",
      relatedSections: ["322", "343", "354"],
      defences: ["colour of right", "claim of right"],
      topicsTagged: ["theft", "sentencing", "property value"],
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "334.1",
    {
      title: "Aggravating circumstance — stolen property",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-334.1.html`,
      summary:
        "Directs courts sentencing certain property offences to treat as an aggravating circumstance an intent to sell, barter, or fraudulently return stolen property, and to treat interference with essential infrastructure as an aggravating circumstance for certain other offences.",
      relatedSections: ["718.2", "322", "343", "348", "351", "354"],
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "335",
    {
      title: "Taking motor vehicle or vessel or found therein without consent",
      severity: "Summary",
      maxPenalty: "summary conviction (s. 787 default penalty applies unless otherwise stated)",
      url: `${JUSTICE_LAWS_BASE}/section-335.html`,
      summary:
        "Makes it an offence to take a motor vehicle or vessel without the owner's consent intending to use it, or to be an occupant knowing it was taken without consent, with an exception for occupants who try to leave or leave once they become aware it was taken.",
      relatedSections: ["320.11"],
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "336",
    {
      title: "Criminal breach of trust",
      severity: "Indictable",
      maxPenalty: "14 years",
      url: `${JUSTICE_LAWS_BASE}/section-336.html`,
      summary:
        "Makes it an offence for a trustee to convert, with intent to defraud, anything held in trust to an unauthorized use.",
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "338",
    {
      title: "Fraudulently taking cattle or defacing brand",
      severity: "Hybrid",
      maxPenalty: "Subsection (1) (fraudulently taking cattle found astray, or defacing/counterfeiting a brand): indictable up to 5 years, or summary conviction. Subsection (2) (theft of cattle): indictable up to 10 years, or summary conviction.",
      url: `${JUSTICE_LAWS_BASE}/section-338.html`,
      summary:
        "Makes it an offence to fraudulently take, possess, or deal with stray cattle without the owner's consent, or to alter or falsify brands or marks on cattle, sets separate penalties for theft of cattle, and establishes evidentiary presumptions regarding ownership based on registered brands and possession.",
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "339",
    {
      title: "Taking possession, etc., of drift timber",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-339.html`,
      summary:
        "Makes it an offence to fraudulently take, possess, or deal with drift lumber or lumbering equipment without the owner's consent, to alter marks on it, or to refuse to deliver it to the owner, and provides related offences for second-hand dealers, peace officer search powers, and evidentiary presumptions based on marks and possession.",
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "340",
    {
      title: "Destroying documents of title",
      severity: "Hybrid",
      maxPenalty: "10 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-340.html`,
      summary:
        "Makes it an offence to destroy, cancel, conceal, or obliterate a document of title, valuable security, testamentary instrument, or judicial or official document for a fraudulent purpose.",
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "341",
    {
      title: "Fraudulent concealment",
      severity: "Hybrid",
      maxPenalty: "2 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-341.html`,
      summary:
        "Makes it an offence to take, obtain, remove, or conceal anything for a fraudulent purpose.",
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "342",
    {
      title: "Theft, forgery, etc., of credit card",
      severity: "Hybrid",
      maxPenalty: "10 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-342.html`,
      summary:
        "Makes it an offence to steal, forge, falsify, or knowingly possess, use, or traffic in a stolen or falsified credit card, or to use a revoked or cancelled credit card, sets jurisdictional rules for prosecution, and separately makes it an offence to fraudulently possess, use, or traffic in credit card data without authorization.",
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "342.01",
    {
      title: "Instruments for copying credit card data or forging or falsifying credit cards",
      severity: "Hybrid",
      maxPenalty: "10 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-342.01.html`,
      summary:
        "Makes it an offence to make, repair, buy, sell, import, export, or possess an instrument or device known to have been used or intended for copying credit card data or forging/falsifying credit cards, and provides for forfeiture of such items on conviction.",
      relatedSections: ["342"],
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "342.1",
    {
      title: "Unauthorized use of computer",
      severity: "Hybrid",
      maxPenalty: "10 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-342.1.html`,
      summary:
        "Makes it an offence to fraudulently and without colour of right obtain computer services, intercept a computer system's functions, use a computer system to commit such offences or mischief, or possess or traffic in a computer password enabling such offences, and defines related terms.",
      relatedSections: ["430"],
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "342.2",
    {
      title: "Possession of device to obtain unauthorized use of computer system or to commit mischief",
      severity: "Hybrid",
      maxPenalty: "2 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-342.2.html`,
      summary:
        "Makes it an offence to make, possess, sell, import, or distribute a device designed primarily to commit unauthorized computer use or mischief offences, knowing it has been or will be used for that purpose, and provides for forfeiture of such devices on conviction.",
      relatedSections: ["342.1", "430"],
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "343",
    {
      title: "Robbery",
      severity: "Indictable",
      maxPenalty: "Life imprisonment",
      url: `${JUSTICE_LAWS_BASE}/section-343.html`,
      definition:
        "Every one commits robbery who steals, and for the purpose of extorting whatever is stolen or to prevent or overcome resistance to the stealing, uses violence or threats of violence to a person or property; who steals from any person and, at the time he steals or immediately before or immediately thereafter, wounds, beats, strikes or uses any personal violence to that person; who assaults any person with intent to steal from him; or who steals any thing from any person while armed with an offensive weapon or imitation thereof.",
      relatedSections: ["344", "322", "265", "85"],
      defences: ["self-defence (s. 34)", "colour of right"],
      topicsTagged: ["robbery", "theft", "violence", "weapon"],
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "344",
    {
      title: "Robbery",
      severity: "Indictable",
      maxPenalty: "Life imprisonment. Mandatory minimum of 5 years for a first offence or 7 years for a second or subsequent offence if a restricted or prohibited firearm is used, or any firearm is used for the benefit of, at the direction of, or in association with a criminal organization; no minimum in any other case.",
      url: `${JUSTICE_LAWS_BASE}/section-344.html`,
      definition:
        "Every person who commits robbery is guilty of an indictable offence and liable to imprisonment for life. Where a restricted or prohibited firearm is used in the commission of the offence, or where any firearm is used for the benefit of, at the direction of, or in association with a criminal organization, the person is liable to a minimum punishment of five years' imprisonment for a first offence or seven years' imprisonment for a second or subsequent offence; in any other case, no minimum punishment applies.",
      relatedSections: ["343", "85", "95"],
      defences: [],
      topicsTagged: ["robbery", "sentencing", "firearm"],
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "345",
    {
      title: "Stopping mail with intent",
      severity: "Indictable",
      maxPenalty: "Life imprisonment",
      url: `${JUSTICE_LAWS_BASE}/section-345.html`,
      summary:
        "Makes it an offence to stop a mail conveyance with intent to rob or search it.",
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "346",
    {
      title: "Extortion",
      severity: "Indictable",
      maxPenalty: "Life imprisonment, with a minimum of 5 years (first offence) or 7 years (subsequent offence) if a restricted or prohibited firearm is used, or any firearm is used for a criminal organization; no minimum in any other case, including where an ordinary firearm with no criminal-organization connection is used.",
      url: `${JUSTICE_LAWS_BASE}/section-346.html`,
      summary:
        "Makes it an offence (extortion) to induce or attempt to induce a person to do or cause anything to be done through threats, accusations, menaces, or violence without reasonable justification; sets an enhanced minimum sentence where a restricted or prohibited firearm is used, or where any firearm is used and the offence is committed for the benefit of, at the direction of, or in association with a criminal organization; defines how prior offences count toward repeat-offence determinations; directs courts to treat a sexual purpose as an aggravating factor; and excludes a threat of civil proceedings from the offence.",
      relatedSections: ["85", "244", "244.2", "220", "236", "239"],
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "346.1",
    {
      title: "Sentences to be served consecutively",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-346.1.html`,
      summary:
        "Requires a sentence for an offence under section 346 to be served consecutively to any other sentence imposed on the person for an offence under sections 433 to 436 arising out of the same event or series of events.",
      relatedSections: ["346", "433", "436"],
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "347",
    {
      title: "Criminal interest rate",
      severity: "Hybrid",
      maxPenalty: "Indictable: up to 5 years. Summary conviction: fine of not more than $25,000 or imprisonment of not more than 2 years less a day, or both.",
      url: `${JUSTICE_LAWS_BASE}/section-347.html`,
      summary:
        "Makes it an offence to enter into, offer, advertise, or receive payment under an agreement charging interest above a defined criminal rate, defines related terms such as credit advanced and criminal rate, establishes a presumption of knowledge when criminal-rate interest is received, and sets rules for proving the interest rate by actuarial certificate.",
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "347.01",
    {
      title: "Non-application — agreements or arrangements",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-347.01.html`,
      summary:
        "Provides that section 347 does not apply to agreements, offers, or advertisements described by regulation, and authorizes the Governor in Council to make regulations specifying which types of agreements or offers are exempt.",
      relatedSections: ["347"],
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "347.1",
    {
      title: "Definitions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-347.1.html`,
      summary:
        "Defines payday loan and exempts qualifying payday loan agreements from section 347 where the loan amount and term are within set limits, the lender is licensed under provincial law, and the province is designated as having adequate borrower protections, and sets out rules for that provincial designation and its revocation.",
      relatedSections: ["347"],
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "348",
    {
      title: "Breaking and entering with intent, committing offence or breaking out",
      severity: "Hybrid",
      maxPenalty: "Life imprisonment where the offence is committed in relation to a dwelling-house; 10 years indictable, or summary conviction, where it is committed in relation to any other place.",
      url: `${JUSTICE_LAWS_BASE}/section-348.html`,
      definition:
        "Every one who breaks and enters a place with intent to commit an indictable offence in it, breaks and enters a place and commits an indictable offence in it, or breaks out of a place after committing an indictable offence in it or after entering it with intent to commit an indictable offence in it, is guilty of an indictable offence and liable to imprisonment for life where the offence is committed in relation to a dwelling-house, or, where it is committed in relation to any other place, is guilty of an indictable offence liable to imprisonment for a term not exceeding ten years or of an offence punishable on summary conviction. Evidence that an accused broke and entered, or attempted to break and enter, a place is, absent evidence to the contrary, proof that the person did so with intent to commit an indictable offence in it, and evidence that an accused broke out of a place is, absent evidence to the contrary, proof that the person did so after committing an indictable offence in it or after entering it with intent to commit one. For these purposes, a place means a dwelling-house, any other building or structure or part of one, a railway vehicle, vessel, aircraft or trailer, or a pen or enclosure in which fur-bearing animals are kept in captivity for breeding or commercial purposes.",
      relatedSections: ["349", "350", "351", "322"],
      defences: ["colour of right", "consent of owner"],
      topicsTagged: ["break and enter", "dwelling", "property offence"],
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "348.1",
    {
      title: "Aggravating circumstance — home invasion",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-348.1.html`,
      summary:
        "Directs a court sentencing certain offences committed in relation to an occupied dwelling-house to treat as an aggravating circumstance that the offender knew or was reckless about the dwelling being occupied and used or threatened violence.",
      relatedSections: ["98", "98.1", "279", "343", "346", "348"],
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "349",
    {
      title: "Being unlawfully in dwelling-house",
      severity: "Hybrid",
      maxPenalty: "10 years indictable, or summary conviction available.",
      url: `${JUSTICE_LAWS_BASE}/section-349.html`,
      definition:
        "Every person who, without lawful excuse, enters or is in a dwelling-house with intent to commit an indictable offence in it is guilty of an indictable offence and liable to imprisonment for a term of not more than 10 years, or of an offence punishable on summary conviction. Evidence that an accused, without lawful excuse, entered or was in a dwelling-house is, in the absence of evidence to the contrary, proof that the person did so with intent to commit an indictable offence in it.",
      relatedSections: ["348", "350", "177"],
      defences: ["lawful excuse", "consent"],
      topicsTagged: ["trespass", "dwelling-house", "night"],
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "350",
    {
      title: "Entrance",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-350.html`,
      summary:
        "Defines when a person is considered to have entered a place for purposes of breaking and entering offences, including entry by any part of the body or an instrument, and circumstances deemed to constitute breaking and entering.",
      relatedSections: ["348", "349"],
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "351",
    {
      title: "Possession of break-in instrument",
      severity: "Hybrid",
      maxPenalty: "10 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-351.html`,
      summary:
        "Makes it an offence to possess, without lawful excuse, an instrument suitable for breaking into a place, vehicle, vault, or safe knowing it has been or will be used for that purpose, and separately makes it an offence to be disguised with intent to commit an indictable offence.",
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "352",
    {
      title: "Possession of instruments for breaking into coin-operated or currency exchange devices",
      severity: "Hybrid",
      maxPenalty: "2 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-352.html`,
      summary:
        "Makes it an offence to possess, without lawful excuse, an instrument suitable for the purpose of breaking into a coin-operated or currency exchange device knowing it has been or will be used for that purpose.",
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "353",
    {
      title: "Selling, etc., automobile master key",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-353.html`,
      summary:
        "Makes it an offence to sell, offer for sale, advertise, purchase, or possess an automobile master key without a provincial licence, exempts police officers authorized for duty purposes, allows provinces to set licence terms and fees, and requires sellers to keep and produce records of sales.",
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "353.1",
    {
      title: "Tampering with vehicle identification number",
      severity: "Hybrid",
      maxPenalty: "5 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-353.1.html`,
      summary:
        "Makes it an offence to alter, remove, or obliterate a vehicle identification number without lawful excuse, defines the term, and exempts alterations made during legitimate maintenance, repair, or modification work.",
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "354",
    {
      title: "Possession of property obtained by crime",
      severity: "Hybrid",
      maxPenalty: "10 years indictable, or summary conviction available, if the property is a testamentary instrument or worth more than $5,000; 2 years indictable, or summary conviction available, if $5,000 or less (s. 355).",
      url: `${JUSTICE_LAWS_BASE}/section-354.html`,
      definition:
        "Every one commits an offence who has in his possession any property or thing or any proceeds of any property or thing knowing that all or part of the property or thing or of the proceeds was obtained by or derived directly or indirectly from the commission in Canada of an offence punishable by indictment or an act or omission anywhere that, if it had occurred in Canada, would have constituted an offence punishable by indictment.",
      relatedSections: ["322", "355", "380"],
      defences: ["no knowledge of origin", "colour of right"],
      topicsTagged: ["possession", "proceeds of crime", "property"],
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "355",
    {
      title: "Punishment",
      severity: "Hybrid",
      maxPenalty: "If the subject matter is a testamentary instrument or valued over $5,000: indictable up to 10 years, or summary conviction. If valued at $5,000 or less: indictable up to 2 years, or summary conviction.",
      url: `${JUSTICE_LAWS_BASE}/section-355.html`,
      summary:
        "Sets out the offence and classification structure for offences under section 354, distinguishing penalties based on whether the subject matter is a testamentary instrument or exceeds $5,000 in value versus lesser-value property.",
      relatedSections: ["354"],
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "355.1",
    {
      title: "Definition of traffic",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-355.1.html`,
      summary:
        "Defines traffic for the purposes of sections 355.2 and 355.4.",
      relatedSections: ["355.2", "355.4"],
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "355.2",
    {
      title: "Trafficking in property obtained by crime",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-355.2.html`,
      summary:
        "Makes it an offence to traffic in property, things, or proceeds knowing they were obtained from the commission of an indictable offence in Canada or an equivalent act committed elsewhere.",
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "355.3",
    {
      title: "In rem prohibition",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-355.3.html`,
      summary:
        "Prohibits importing into or exporting from Canada any property or proceeds known to have been obtained from an indictable offence committed in Canada or an equivalent act elsewhere.",
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "355.4",
    {
      title: "Possession of property obtained by crime — trafficking",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-355.4.html`,
      summary:
        "Makes it an offence to possess, for the purpose of trafficking, property or proceeds knowing they were obtained from an indictable offence committed in Canada or an equivalent act elsewhere.",
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "355.5",
    {
      title: "Punishment",
      severity: "Hybrid",
      maxPenalty: "14 years indictable if the value of the subject matter exceeds $5,000; 5 years indictable, or summary conviction available, if $5,000 or less.",
      url: `${JUSTICE_LAWS_BASE}/section-355.5.html`,
      summary:
        "Sets out penalty classifications for offences under sections 355.2 or 355.4, based on whether the value of the subject matter exceeds $5,000.",
      relatedSections: ["355.2", "355.4"],
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "356",
    {
      title: "Theft from mail",
      severity: "Hybrid",
      maxPenalty: "10 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-356.html`,
      summary:
        "Makes it an offence to steal mail, mail containers, or Canada Post keys, to make or possess a copy of such a key with intent to commit such theft, to knowingly possess items used to commit these offences, or to fraudulently redirect mail, and provides that proof of value is not required.",
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "357",
    {
      title: "Bringing into Canada property obtained by crime",
      severity: "Hybrid",
      maxPenalty: "10 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-357.html`,
      summary:
        "Makes it an offence to bring into or have in Canada anything obtained outside Canada by an act that would have constituted theft or an offence under section 342 or 354 had it occurred in Canada.",
      relatedSections: ["342", "354"],
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "358",
    {
      title: "Having in possession when complete",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-358.html`,
      summary:
        "Defines when the offence of possession is complete for the purposes of certain property-crime sections, including when a person has possession or control, alone or jointly, or aids in concealing or disposing of the item.",
      relatedSections: ["342", "354", "356"],
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "361",
    {
      title: "False pretence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-361.html`,
      summary:
        "Defines false pretence as a knowingly false representation of a present or past fact made with fraudulent intent to induce reliance, clarifies that mere exaggerated commendation or depreciation is not a false pretence unless it amounts to fraudulent misrepresentation, and states this is a question of fact.",
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "362",
    {
      title: "False pretence or false statement",
      severity: "Hybrid",
      maxPenalty: "For an offence of obtaining property by false pretence (paragraph (1)(a)): 10 years indictable, or summary conviction available, if the property is a testamentary instrument or worth more than $5,000; 2 years indictable, or summary conviction available, if $5,000 or less. For obtaining credit by false pretence or fraud, or making or acting on a false financial statement (paragraphs (1)(b), (c) or (d)): 10 years indictable, or summary conviction available.",
      url: `${JUSTICE_LAWS_BASE}/section-362.html`,
      definition:
        "Every one commits an offence who, by a false pretence, whether directly or through the medium of a contract obtained by a false pretence, obtains anything in respect of which the offence of theft may be committed, or causes it to be delivered to another person, or who obtains credit by a false pretence or by fraud. It is also an offence to knowingly make or cause to be made, directly or indirectly, a false statement in writing, intending it to be relied on, about the financial condition, means or ability to pay of oneself or of a person or organization one is interested in or acts for, for the purpose of procuring the delivery of personal property, the payment of money, the making of a loan, the grant or extension of credit, the discount of an account receivable, or the making, accepting, discounting or endorsing of a bill of exchange, cheque, draft or promissory note. It is a further offence, knowing that such a false statement has been made, to procure any of those things on the faith of it. Where anything is obtained under the false-pretence branch of this offence by means of a cheque that is dishonoured on presentment for insufficient or no funds, it is presumed to have been obtained by false pretence unless the accused is shown to have believed on reasonable grounds that the cheque would be honoured if presented within a reasonable time.",
      relatedSections: ["380", "366", "368"],
      defences: ["honest belief in truth of statement"],
      topicsTagged: ["fraud", "false pretence", "misrepresentation"],
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "363",
    {
      title: "Obtaining execution of valuable security by fraud",
      severity: "Hybrid",
      maxPenalty: "5 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-363.html`,
      summary:
        "Makes it an offence to fraudulently cause or induce a person, by false pretence, to execute, make, accept, endorse, or destroy a valuable security, or to write or affix a name or seal on paper intended to become a valuable security.",
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "364",
    {
      title: "Fraudulently obtaining food, beverage or accommodation",
      severity: "Summary",
      maxPenalty: "summary conviction (s. 787 default penalty applies unless otherwise stated)",
      url: `${JUSTICE_LAWS_BASE}/section-364.html`,
      summary:
        "Makes it an offence to fraudulently obtain food, a beverage, or accommodation from a business providing those things, and sets out circumstances (such as absconding, false baggage claims, or offering a worthless cheque) that serve as proof of fraud absent contrary evidence.",
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "366",
    {
      title: "Forgery",
      severity: "Hybrid",
      maxPenalty: "10 years indictable; summary conviction also available (s. 367).",
      url: `${JUSTICE_LAWS_BASE}/section-366.html`,
      definition:
        "Every one commits forgery who makes a false document, knowing it to be false, with intent that it should in any way be used or acted on as genuine, to the prejudice of any one whether within Canada or not, or that a person should be induced by the belief that it is genuine to do or to refrain from doing anything, whether within Canada or not.",
      relatedSections: ["367", "368", "380"],
      defences: ["no intent to defraud", "honest mistake"],
      topicsTagged: ["forgery", "document", "fraud"],
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "367",
    {
      title: "Punishment for forgery",
      severity: "Hybrid",
      maxPenalty: "10 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-367.html`,
      summary:
        "Sets out the offence and penalty classification for committing forgery.",
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "368",
    {
      title: "Use, trafficking or possession of forged document",
      severity: "Hybrid",
      maxPenalty: "10 years indictable, or summary conviction available.",
      url: `${JUSTICE_LAWS_BASE}/section-368.html`,
      definition:
        "Everyone commits an offence who, knowing or believing that a document is forged, uses, deals with or acts on it as if it were genuine; causes or attempts to cause any person to use, deal with or act on it as if it were genuine; transfers, sells, offers to sell, or makes it available to any person, knowing that or being reckless as to whether an offence of using, dealing with, acting on, or causing another to act on the document as genuine will be committed; or possesses the document with intent to commit any of those offences.",
      relatedSections: ["366", "367", "380"],
      defences: ["no knowledge document was forged"],
      topicsTagged: ["forgery", "fraud", "document"],
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "368.1",
    {
      title: "Forgery instruments",
      severity: "Hybrid",
      maxPenalty: "14 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-368.1.html`,
      summary:
        "Makes it an offence to make, repair, buy, sell, import, export, or possess, without lawful authority, an instrument or device known to have been used or intended for committing forgery.",
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "368.2",
    {
      title: "Public officers acting in the course of their duties or employment",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-368.2.html`,
      summary:
        "Exempts a public officer from liability for offences under sections 366 to 368.1 where the acts were committed solely to establish or maintain a covert identity for their duties.",
      relatedSections: ["25.1", "366", "368.1"],
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "369",
    {
      title: "Exchequer bill paper, public seals, etc.",
      severity: "Indictable",
      maxPenalty: "14 years",
      url: `${JUSTICE_LAWS_BASE}/section-369.html`,
      summary:
        "Makes it an offence to make, use, or possess, without lawful authority, exchequer bill paper, revenue paper, or bank-note paper (or paper resembling it), or to make, reproduce, or use a public seal of Canada, a province, or a public body or court.",
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "372",
    {
      title: "False information",
      severity: "Hybrid",
      maxPenalty: "2 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-372.html`,
      summary:
        "Makes it an offence to knowingly convey false information intended to injure or alarm someone, to make indecent communications intended to alarm or annoy, or to repeatedly communicate with someone by telecommunication without lawful excuse and with intent to harass them.",
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "374",
    {
      title: "Drawing document without authority, etc.",
      severity: "Indictable",
      maxPenalty: "14 years indictable",
      url: `${JUSTICE_LAWS_BASE}/section-374.html`,
      summary:
        "Makes it an offence to make, sign, or endorse a document in another person's name without authority and with intent to defraud, or to use or utter such a document knowing it was made that way.",
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "375",
    {
      title: "Obtaining, etc., by instrument based on forged document",
      severity: "Indictable",
      maxPenalty: "14 years indictable",
      url: `${JUSTICE_LAWS_BASE}/section-375.html`,
      summary:
        "Makes it an offence to demand, receive, or obtain something under a legal instrument, or to cause something to be paid or delivered under one, knowing that the instrument is based on a forged document.",
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "376",
    {
      title: "Counterfeiting stamp, etc.",
      severity: "Indictable",
      maxPenalty: "14 years indictable",
      url: `${JUSTICE_LAWS_BASE}/section-376.html`,
      summary:
        "Makes it an offence to fraudulently use, mutilate, affix, remove, or counterfeit a government stamp, to possess a counterfeit or fraudulently mutilated stamp, or to make or possess a device for producing one, and separately makes it an offence to make an unauthorized mark, sell or possess a counterfeit mark, or affix a mark or counterfeit mark to something without authority; defines \"mark\" and \"stamp\" for these purposes.",
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "377",
    {
      title: "Damaging documents",
      severity: "Hybrid",
      maxPenalty: "5 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-377.html`,
      summary:
        "Makes it an offence to unlawfully destroy, deface, or injure an official register of births, marriages, deaths, or burials (or a required copy of one), or to insert a known-false entry or erase material from it, or to destroy, damage, alter, or interline an election document.",
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "378",
    {
      title: "Offences in relation to registers",
      severity: "Hybrid",
      maxPenalty: "5 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-378.html`,
      summary:
        "Makes it an offence to knowingly make or issue a false certified copy, extract, or certificate of a register, record, or document when authorized to do so, to fraudulently issue one purporting to be certified when not authorized, or to knowingly make a false certificate or declaration for entries in such a register.",
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],

  // ── Part X — Fraudulent Transactions Relating to Contracts and Trade ──
  [
    "379",
    {
      title: "Definition of goods",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-379.html`,
      summary:
        "Defines \"goods\" for this Part as anything that is the subject of trade or commerce.",
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "380",
    {
      title: "Fraud",
      severity: "Hybrid",
      maxPenalty: "14 years indictable if the subject-matter is a testamentary instrument or worth more than $5,000; 2 years indictable, or summary conviction available, if the subject-matter is worth $5,000 or less; a mandatory minimum of 2 years' imprisonment applies on indictment where the total value of the subject-matter of the offence or offences exceeds $1,000,000; up to 14 years indictable for affecting the public market price under subsection (2).",
      url: `${JUSTICE_LAWS_BASE}/section-380.html`,
      definition:
        "Every one who, by deceit, falsehood or other fraudulent means, whether or not it is a false pretence within the meaning of this Act, defrauds the public or any person, whether ascertained or not, of any property, money, valuable security or service is guilty, where the subject-matter is a testamentary instrument or is worth more than $5,000, of an indictable offence liable to imprisonment for up to fourteen years; and, where the value is $5,000 or less, of an indictable offence liable to imprisonment for up to two years, or of an offence punishable on summary conviction. A minimum punishment of two years' imprisonment applies on indictment where the total value of the subject-matter of the offence or offences exceeds one million dollars. It is a separate offence, punishable on indictment by up to fourteen years' imprisonment, to affect the public market price of stocks, shares, merchandise, or anything offered for sale to the public, by deceit, falsehood or other fraudulent means, with intent to defraud.",
      relatedSections: ["362", "366", "368", "382"],
      defences: ["honest belief in entitlement", "no intent to defraud"],
      topicsTagged: ["fraud", "deceit", "property"],
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "380.1",
    {
      title: "Sentencing — aggravating circumstances",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-380.1.html`,
      summary:
        "Directs a court, when sentencing for certain fraud offences, to treat specified factors (such as scale, complexity, or planning of the fraud, harm to the financial system, number or vulnerability of victims, abuse of community trust, licensing non-compliance, concealment or destruction of records, and, for some offences, a fraud value exceeding one million dollars) as aggravating, to disregard the offender's employment or community standing as mitigating where relevant to the offence, and to record the aggravating and mitigating factors considered.",
      relatedSections: ["718.2", "380", "382", "382.1", "400"],
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "380.2",
    {
      title: "Prohibition order",
      severity: "Hybrid",
      maxPenalty: "2 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-380.2.html`,
      summary:
        "Allows a sentencing or discharging court to order a person convicted of certain fraud to be prohibited from seeking or holding employment or volunteer positions involving authority over another person's property, money, or securities, sets out how such an order may be varied, and makes it an offence to breach the order.",
      relatedSections: ["730", "380"],
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "381",
    {
      title: "Using mails to defraud",
      severity: "Hybrid",
      maxPenalty: "2 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-381.html`,
      summary:
        "Makes it an offence to use the mails to transmit or deliver letters or circulars concerning schemes intended to deceive or defraud the public, or to obtain money by false pretences.",
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "382",
    {
      title: "Fraudulent manipulation of stock exchange transactions",
      severity: "Hybrid",
      maxPenalty: "10 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-382.html`,
      summary:
        "Makes it an offence to carry out certain stock exchange or market transactions or orders, with intent to create a false or misleading appearance of active trading or of the market price of a security.",
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "382.1",
    {
      title: "Prohibited insider trading",
      severity: "Hybrid",
      maxPenalty: "10 years indictable, or summary conviction available, for the main insider-trading offence (s. 382.1(1)); 5 years indictable, or summary conviction available, for the separate tipping offence (s. 382.1(2)).",
      url: `${JUSTICE_LAWS_BASE}/section-382.1.html`,
      summary:
        "Makes it an offence to buy or sell a security while knowingly using inside information obtained through specified relationships to the issuer, and separately makes it an offence to knowingly convey such inside information to another person who might use it to trade or pass it on; excludes conduct authorized or required by law and defines \"inside information.\"",
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "383",
    {
      title: "Gaming in stocks or merchandise",
      severity: "Hybrid",
      maxPenalty: "5 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-383.html`,
      summary:
        "Makes it an offence to make or sign a contract purporting to be for the purchase or sale of stock or goods without genuinely intending to buy, sell, or deliver them, done to profit from price movements; the burden of proving genuine intent falls on the accused once such a contract is shown.",
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "384",
    {
      title: "Broker reducing stock by selling for their own account",
      severity: "Hybrid",
      maxPenalty: "5 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-384.html`,
      summary:
        "Makes it an offence for a broker (or a partner, director, officer, or employee of one) who holds shares on margin for a customer to later sell shares for an account in which they have an interest, where the effect is to reduce below the required level the shares the broker should be carrying for all customers.",
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "385",
    {
      title: "Fraudulent concealment of title documents",
      severity: "Hybrid",
      maxPenalty: "2 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-385.html`,
      summary:
        "Makes it an offence for a vendor, mortgagor, or their lawyer or agent, upon receiving a written demand for an abstract of title, to conceal a material document or defect from the purchaser or mortgagee with intent to defraud, or to falsify a pedigree on which title depends; prosecution requires the Attorney General's consent.",
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "386",
    {
      title: "Fraudulent registration of title",
      severity: "Hybrid",
      maxPenalty: "5 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-386.html`,
      summary:
        "Makes it an offence for a person involved in registering or transacting real or immovable property to knowingly and with intent to deceive make a false material statement, conceal a material fact from a judge or registrar, or be privy to such conduct.",
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "387",
    {
      title: "Fraudulent sale of real property",
      severity: "Hybrid",
      maxPenalty: "2 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-387.html`,
      summary:
        "Makes it an offence to fraudulently sell real property while knowing of an existing unregistered prior sale, grant, mortgage, hypothec, lien, or encumbrance on it.",
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "388",
    {
      title: "Misleading receipt",
      severity: "Hybrid",
      maxPenalty: "2 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-388.html`,
      summary:
        "Makes it an offence to knowingly give someone a document purporting to be a receipt or acknowledgment for property before that property has actually been delivered or received, with intent to mislead, injure, or defraud, or to accept, transmit, or use such a document.",
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "389",
    {
      title: "Fraudulent disposal of goods on which money advanced",
      severity: "Hybrid",
      maxPenalty: "2 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-389.html`,
      summary:
        "Makes it an offence, with intent to deceive, defraud, or injure a consignee, to dispose of goods shipped to a warehouse keeper, agent, or carrier in a way inconsistent with the agreement with the consignee (or to help someone do so); no offence occurs if the money or security advanced is repaid before the disposal.",
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "390",
    {
      title: "Fraudulent receipts under Bank Act",
      severity: "Hybrid",
      maxPenalty: "2 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-390.html`,
      summary:
        "Makes it an offence to knowingly make a false statement in a receipt or certificate used for a purpose under the Bank Act, or to knowingly alienate or fail to deliver property covered by such a receipt without the required consent or delivery.",
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "391",
    {
      title: "Trade secret",
      severity: "Hybrid",
      maxPenalty: "14 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-391.html`,
      summary:
        "Makes it an offence to knowingly obtain, communicate, or make available a trade secret by deceit, falsehood, or other fraudulent means, or to knowingly obtain, communicate, or make available a trade secret knowing it was obtained that way; independent development or reverse engineering is not an offence, and defines \"trade secret.\"",
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "392",
    {
      title: "Disposal of property to defraud creditors",
      severity: "Hybrid",
      maxPenalty: "2 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-392.html`,
      summary:
        "Makes it an offence to give away, transfer, remove, or conceal one's own property with intent to defraud creditors, or, with intent that creditors be defrauded, to receive property disposed of in that way.",
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "393",
    {
      title: "Fraud in relation to fares, etc.",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-393.html`,
      summary:
        "Makes it an offence for a person whose duty is to collect fares, tolls, tickets, or admission to intentionally fail to collect it, collect less than owed, or accept payment for doing so, and makes it an offence to offer such payment to that person; also makes it an offence to obtain transportation by false pretence or fraud.",
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "394",
    {
      title: "Fraud in relation to valuable minerals",
      severity: "Hybrid",
      maxPenalty: "5 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-394.html`,
      summary:
        "Prohibits a mineral lease or licence holder from defrauding a person of valuable minerals or related payments through fraudulent means or from concealing or falsely stating the amount of minerals obtained; also prohibits selling or buying unprocessed valuable minerals without being the owner, agent, or otherwise lawfully authorized, sets out presumptions in such proceedings, and provides for forfeiture on conviction.",
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "394.1",
    {
      title: "Possession of stolen or fraudulently obtained valuable minerals",
      severity: "Hybrid",
      maxPenalty: "5 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-394.1.html`,
      summary:
        "Prohibits possessing unprocessed valuable minerals that have been stolen or dealt with contrary to section 394, sets out an evidentiary presumption, and provides for forfeiture on conviction.",
      relatedSections: ["394"],
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "395",
    {
      title: "Search for valuable minerals",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-395.html`,
      summary:
        "Sets out the process for a justice to issue a warrant to search for and seize valuable minerals believed to be unlawfully deposited or held, how seized items are to be dealt with by a justice, and how an appeal from such an order proceeds.",
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "396",
    {
      title: "Offences in relation to mines",
      severity: "Hybrid",
      maxPenalty: "10 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-396.html`,
      summary:
        "Makes it an offence to add to, remove from, or tamper with a mine, mining claim, oil well, or a sample taken from one, with fraudulent intent to affect the result of an assay, test, or valuation; evidence of such tampering is proof of fraudulent intent absent evidence to the contrary.",
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "397",
    {
      title: "Books and documents",
      severity: "Hybrid",
      maxPenalty: "5 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-397.html`,
      summary:
        "Makes it an offence, with intent to defraud, to destroy, alter, falsify, or make a false entry in a book, document, or valuable security, or to omit or alter a material particular in one, and separately makes it an offence to be privy to such conduct with intent to defraud creditors.",
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "398",
    {
      title: "Falsifying employment record",
      severity: "Summary",
      maxPenalty: "summary conviction (s. 787 default penalty applies unless otherwise stated)",
      url: `${JUSTICE_LAWS_BASE}/section-398.html`,
      summary:
        "Makes it an offence to falsify an employment record, including by any means such as punching a time clock, with intent to deceive.",
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "399",
    {
      title: "False return by public officer",
      severity: "Hybrid",
      maxPenalty: "5 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-399.html`,
      summary:
        "Makes it an offence for a person entrusted with public revenues to knowingly furnish a false statement or return of money collected, entrusted to them, or held under their control.",
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "400",
    {
      title: "False prospectus, etc.",
      severity: "Hybrid",
      maxPenalty: "10 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-400.html`,
      summary:
        "Makes it an offence to make, circulate, or publish a prospectus, statement, or account known to be materially false, with intent to induce people to become shareholders or partners, to deceive or defraud a company's members or creditors, or to induce someone to advance property or enter a security for a company; defines \"company\" for this purpose.",
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "401",
    {
      title: "Obtaining carriage by false billing",
      severity: "Summary",
      maxPenalty: "summary conviction (s. 787 default penalty applies unless otherwise stated)",
      url: `${JUSTICE_LAWS_BASE}/section-401.html`,
      summary:
        "Makes it an offence to knowingly obtain or attempt to obtain, by false or misleading representation, the carriage of something into a place where its importation or transportation is unlawful, and provides for forfeiture of anything used in committing the offence.",
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "402.1",
    {
      title: "Definition of identity information",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-402.1.html`,
      summary:
        "Defines \"identity information\" for the purposes of sections 402.2 and 403 as information commonly used to identify an individual, listing examples such as biometric data, names, addresses, signatures, account numbers, and passwords.",
      relatedSections: ["402.2", "403"],
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "402.2",
    {
      title: "Identity theft",
      severity: "Hybrid",
      maxPenalty: "5 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-402.2.html`,
      summary:
        "Makes it an offence to obtain or possess another person's identity information intending to use it to commit an indictable offence involving fraud, deceit, or falsehood, and makes it an offence to transmit, distribute, sell, or possess such information knowing or being reckless as to whether it will be used for that purpose; sets out jurisdiction for prosecution and lists related offences for clarification.",
      relatedSections: ["57", "58", "130", "131", "342", "362"],
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "403",
    {
      title: "Identity fraud",
      severity: "Hybrid",
      maxPenalty: "10 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-403.html`,
      summary:
        "Makes it an offence to fraudulently personate another person, living or dead, with intent to gain an advantage, obtain property, disadvantage the person impersonated or another, or avoid arrest or prosecution; clarifies that personating includes using another person's identity information as one's own.",
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "405",
    {
      title: "Acknowledging instrument in false name",
      severity: "Hybrid",
      maxPenalty: "5 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-405.html`,
      summary:
        "Makes it an offence to acknowledge, without lawful authority or excuse, an instrument such as a recognizance, undertaking, or judgment in another person's name before a court or authorized official.",
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "406",
    {
      title: "Forging trademark",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-406.html`,
      summary:
        "Defines what it means to forge a trademark for the purposes of this Part, being to make or reproduce a trademark without the proprietor's consent in a manner calculated to deceive, or to falsify a genuine trademark.",
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "407",
    {
      title: "Offence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-407.html`,
      summary:
        "Makes it an offence to forge a trademark with intent to deceive or defraud the public or any person.",
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "408",
    {
      title: "Passing off",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-408.html`,
      summary:
        "Makes it an offence, with intent to deceive or defraud, to pass off wares or services as those ordered or required, or to use a materially false description of the kind, quality, quantity, composition, geographical origin, or mode of manufacture, production, or performance of wares or services.",
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "409",
    {
      title: "Instruments for forging trademark",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-409.html`,
      summary:
        "Makes it an offence to make, possess, or dispose of a die, block, machine, or other instrument designed or intended for forging a trademark, unless the person proves they acted in good faith in the ordinary course of business or employment.",
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "410",
    {
      title: "Other offences in relation to trademarks",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-410.html`,
      summary:
        "Makes it an offence, with intent to deceive or defraud, to deface, conceal, or remove a trademark or another person's name from anything without consent, or for a manufacturer, dealer, trader, or bottler to fill a container bearing another's trademark with a liquid commodity for sale without that person's consent.",
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "411",
    {
      title: "Used goods sold without disclosure",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-411.html`,
      summary:
        "Makes it an offence to sell, possess for sale, or advertise used, reconditioned, rebuilt, or remade goods bearing another person's trademark or trade name without fully disclosing that they have been reconditioned and are not in their original condition.",
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "412",
    {
      title: "Punishment",
      severity: "Hybrid",
      maxPenalty: "2 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-412.html`,
      summary:
        "Sets the punishment for offences under sections 407 to 411 and provides that anything used in committing such an offence is forfeited on conviction unless the court orders otherwise.",
      relatedSections: ["407", "408", "409", "410", "411"],
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "414",
    {
      title: "Presumption from port of shipment",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-414.html`,
      summary:
        "Provides that in proceedings involving imported goods, evidence that the goods were shipped to Canada from a foreign place is proof, absent contrary evidence, that they were made or produced in the country from which they were shipped.",
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "415",
    {
      title: "Offences in relation to wreck",
      severity: "Hybrid",
      maxPenalty: "2 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-415.html`,
      summary:
        "Makes it an offence to secrete or disguise wreck, to receive wreck without notifying the receiver of wreck within 48 hours, to sell or deal in wreck without lawful authority, to keep wreck longer than reasonably necessary without authority, or to board a wrecked or distressed vessel against the master's will without proper authorization.",
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "416",
    {
      title: "Distinguishing mark on public stores",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-416.html`,
      summary:
        "Allows the Governor in Council to prescribe, by notice in the Canada Gazette, distinguishing marks used on public stores to denote that they are the property of Her Majesty.",
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "417",
    {
      title: "Applying or removing marks without authority",
      severity: "Hybrid",
      maxPenalty: "2 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-417.html`,
      summary:
        "Makes it an offence to apply a distinguishing mark to something without lawful authority, or to remove or destroy such a mark with intent to conceal that public stores belong to Her Majesty, and separately makes it an offence to knowingly receive, possess, keep, sell, or deliver public stores bearing a distinguishing mark without lawful authority; defines \"distinguishing mark\" by reference to section 416.",
      relatedSections: ["416"],
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "418",
    {
      title: "Selling defective stores to Her Majesty",
      severity: "Indictable",
      maxPenalty: "14 years indictable",
      url: `${JUSTICE_LAWS_BASE}/section-418.html`,
      summary:
        "Makes it an offence to knowingly sell or deliver defective stores to Her Majesty or to commit fraud connected with selling, leasing, delivering, or manufacturing stores for Her Majesty, and makes it an offence for a representative of an organization to knowingly take part in such fraud or fail to report it to the responsible government when aware or suspicious of it.",
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "419",
    {
      title: "Unlawful use of military uniforms or certificates",
      severity: "Summary",
      maxPenalty: "summary conviction (s. 787 default penalty applies unless otherwise stated)",
      url: `${JUSTICE_LAWS_BASE}/section-419.html`,
      summary:
        "Makes it an offence, without lawful authority, to wear a military uniform or a similar one likely to be mistaken for it, to wear a military decoration or a device likely to be mistaken for one, or to possess a military discharge certificate, service statement, identity card, commission, or warrant that was not issued to and does not belong to the person, including one containing an unverified alteration.",
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "420",
    {
      title: "Military stores",
      severity: "Hybrid",
      maxPenalty: "5 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-420.html`,
      summary:
        "Makes it an offence to buy, receive, or detain military stores owned by or accountable to Her Majesty from a member of the Canadian Forces, a deserter, or an absentee without leave, unless the person establishes they did not know and had no reason to suspect the stores' status.",
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "421",
    {
      title: "Evidence of enlistment",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-421.html`,
      summary:
        "Provides evidentiary presumptions for proceedings under sections 417 to 420: performing duties in the Canadian Forces is proof of regular prior enrolment, and an accused charged under subsection 417(2) who was, at the time, in the service or employment of Her Majesty or a dealer in marine stores or old metals is presumed to have known the stores bore a distinguishing mark.",
      relatedSections: ["417", "418", "419", "420"],
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "422",
    {
      title: "Criminal breach of contract",
      severity: "Hybrid",
      maxPenalty: "5 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-422.html`,
      summary:
        "Makes it an offence to wilfully break a contract knowing it will likely endanger life, cause serious bodily injury, expose valuable property to destruction, deprive a place of light, power, gas, or water, or delay or prevent railway operations; excludes lawful work stoppages arising from labour disputes where required dispute-settlement steps have been followed, and requires the Attorney General's consent to prosecute.",
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "423",
    {
      title: "Intimidation",
      severity: "Hybrid",
      maxPenalty: "5 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-423.html`,
      summary:
        "Makes it an offence, wrongfully and without lawful authority, to use violence or threats, intimidate, persistently follow, hide property, obstruct, or watch or beset a person or their residence or workplace, for the purpose of compelling them to do or abstain from doing something they have a lawful right to do or abstain from; attending only to obtain or communicate information is excepted.",
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "423.1",
    {
      title: "Intimidation of a justice system participant or a journalist",
      severity: "Indictable",
      maxPenalty: "14 years indictable",
      url: `${JUSTICE_LAWS_BASE}/section-423.1.html`,
      summary:
        "Makes it an offence, without lawful authority, to engage in conduct intended to provoke fear in a group or the public to impede criminal justice administration, in a justice or military justice system participant to impede their duties, or in a journalist to impede reporting on a criminal organization; defines \"military justice system participant\" by reference to the National Defence Act.",
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "423.2",
    {
      title: "Intimidation — health services",
      severity: "Hybrid",
      maxPenalty: "10 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-423.2.html`,
      summary:
        "Makes it an offence to engage in conduct intended to provoke fear in a person to impede them from obtaining health services, in a health professional to impede their duties, or in someone assisting a health professional to impede their functions, and separately makes it an offence to intentionally and without lawful authority obstruct or interfere with lawful access to a place providing health services; attending only to obtain or communicate information is a defence, and defines \"health professional.\"",
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "423.3",
    {
      title: "Intimidation — building used for religious worship, etc.",
      severity: "Hybrid",
      maxPenalty: "10 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-423.3.html`,
      summary:
        "Makes it an offence to engage in conduct intended to provoke fear in a person to impede their access to a building used for religious worship, certain identifiable-group activities, education, or seniors' residence, or to a cemetery, and separately makes it an offence to intentionally and without lawful authority obstruct or interfere with lawful access to such a building or cemetery; attending only to obtain or communicate information is excepted.",
      relatedSections: ["318"],
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "424",
    {
      title: "Threat against internationally protected person",
      severity: "Hybrid",
      maxPenalty: "5 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-424.html`,
      summary:
        "Makes it an offence to threaten to commit specified violent offences against an internationally protected person, or to threaten to commit the offence set out in section 431.",
      relatedSections: ["235", "236", "266", "267", "268", "431"],
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "424.1",
    {
      title: "Threat against United Nations or associated personnel",
      severity: "Hybrid",
      maxPenalty: "10 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-424.1.html`,
      summary:
        "Makes it an offence, with intent to compel a person, group, state, or international organization to act or refrain from acting, to threaten to commit specified violent offences against United Nations or associated personnel, or to threaten to commit the offence set out in section 431.1.",
      relatedSections: ["235", "236", "266", "267", "268", "431.1"],
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "425",
    {
      title: "Offences by employers",
      severity: "Summary",
      maxPenalty: "summary conviction (s. 787 default penalty applies unless otherwise stated)",
      url: `${JUSTICE_LAWS_BASE}/section-425.html`,
      summary:
        "Makes it an offence for an employer or their agent to wrongfully and without lawful authority refuse to employ or dismiss someone because they belong to a lawful trade union or similar association, to compel employees by intimidation or penalty to abstain from union membership, or to conspire with another employer to do either of these things.",
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "425.1",
    {
      title: "Threats and retaliation against employees",
      severity: "Hybrid",
      maxPenalty: "5 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-425.1.html`,
      summary:
        "Prohibits an employer or someone acting on their behalf from disciplining, demoting, terminating, or otherwise adversely affecting an employee's employment (or threatening to) in order to stop them from reporting a suspected offence to a law enforcement authority or to retaliate for having done so, and makes contravention of this prohibition an offence.",
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "426",
    {
      title: "Secret commissions",
      severity: "Hybrid",
      maxPenalty: "5 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-426.html`,
      summary:
        "Makes it an offence to corruptly give, offer, demand, or accept a reward or benefit as consideration for an agent's act or favour relating to their principal's affairs, or to give or use, with intent to deceive a principal, a receipt or document containing a false or misleading material statement; also makes it an offence to be knowingly privy to such conduct, and defines \"agent\" and \"principal.\"",
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],

  // ── Part XI — Wilful and Forbidden Acts in Respect of Certain Property ──
  [
    "428",
    {
      title: "Definition of property",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-428.html`,
      summary:
        "Defines \"property\" for this Part as real or personal corporeal property.",
      partOf: "Part XI — Wilful and Forbidden Acts in Respect of Certain Property",
    },
  ],
  [
    "429",
    {
      title: "Wilfully causing event to occur",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-429.html`,
      summary:
        "Deems a person to have wilfully caused an event if they knew their act or omission would probably cause it and were reckless about whether it occurred. Also provides that legal justification, excuse, or colour of right is a defence to offences under sections 430 to 446, and that a partial ownership interest does not prevent a person from being guilty of destroying or damaging property, while a total ownership interest does not bar guilt if the destruction or damage was done with intent to defraud.",
      partOf: "Part XI — Wilful and Forbidden Acts in Respect of Certain Property",
    },
  ],
  [
    "430",
    {
      title: "Mischief",
      severity: "Hybrid",
      maxPenalty: "Life imprisonment for mischief causing danger to life; 10 years indictable (mischief involving a testamentary instrument, or property over $5,000; computer data; hate-motivated mischief against religious, educational or community property; or cultural property), with summary conviction also available; for war memorials, cenotaphs and cemeteries, 10 years indictable or up to 2 years less a day summary, plus mandatory minimums escalating from a $1,000 fine (1st offence) to 14 days (2nd) to 30 days (subsequent offences); 2 years indictable for other property, with summary conviction available; 5 years indictable for an act or omission likely to constitute mischief, with summary conviction available.",
      url: `${JUSTICE_LAWS_BASE}/section-430.html`,
      definition:
        "Every person commits mischief who wilfully destroys or damages property, renders it dangerous, useless, inoperative or ineffective, or obstructs, interrupts or interferes with the lawful use, enjoyment or operation of property or with any person's lawful use, enjoyment or operation of it; the same conduct toward computer data — destroying or altering it, rendering it meaningless, useless or ineffective, obstructing or interfering with its lawful use, or denying access to a person entitled to it — is a separate mischief offence. Mischief that causes actual danger to life is punishable by imprisonment for life, while mischief in relation to a testamentary instrument or property over $5,000, mischief in relation to computer data, mischief motivated by bias, prejudice or hate based on colour, race, religion, national or ethnic origin, age, sex, sexual orientation, gender identity or expression, or mental or physical disability and directed at religious property, educational institutions, or buildings used by an identifiable group for administrative, social, cultural, sports or seniors-residence purposes, and mischief in relation to cultural property protected under the Hague Convention are each punishable by up to ten years' imprisonment on indictment or as summary conviction offences. Mischief in relation to a war memorial, cenotaph or related object, or a cemetery, carries mandatory minimum penalties escalating from a $1,000 fine for a first offence to 14 days' imprisonment for a second offence and 30 days for each subsequent offence, on top of a maximum of ten years on indictment or two years less a day on summary conviction. Mischief in relation to property other than a testamentary instrument or property over $5,000 is punishable by up to two years' imprisonment on indictment or as a summary conviction offence, and wilfully doing an act, or wilfully omitting to do an act that it is a person's duty to do, where the act or omission is likely to constitute any of these forms of mischief, is itself punishable by up to five years on indictment or as a summary conviction offence. No one commits mischief within the meaning of this section merely by stopping work as a result of the failure of the person and their employer to agree on any matter relating to their employment, whether acting alone or through a bargaining agent acting on their behalf, or as a result of taking part in a combination of workers for their own reasonable protection as workers, or merely by attending at, near, or approaching a dwelling-house or place for the purpose only of obtaining or communicating information.",
      relatedSections: ["318", "342.1"],
      defences: ["colour of right", "consent of owner"],
      topicsTagged: ["mischief", "property damage", "destruction"],
      partOf: "Part XI — Wilful and Forbidden Acts in Respect of Certain Property",
    },
  ],
  [
    "431",
    {
      title: "Attack on premises, residence or transport of internationally protected person",
      severity: "Indictable",
      maxPenalty: "14 years",
      url: `${JUSTICE_LAWS_BASE}/section-431.html`,
      summary:
        "Makes it an offence to carry out a violent attack on the official premises, private accommodation, or means of transport of an internationally protected person that is likely to endanger that person's life or liberty.",
      partOf: "Part XI — Wilful and Forbidden Acts in Respect of Certain Property",
    },
  ],
  [
    "431.1",
    {
      title: "Attack on premises, accommodation or transport of United Nations or associated personnel",
      severity: "Indictable",
      maxPenalty: "14 years",
      url: `${JUSTICE_LAWS_BASE}/section-431.1.html`,
      summary:
        "Makes it an offence to carry out a violent attack on the official premises, private accommodation, or transport of a United Nations or associated personnel member that is likely to endanger that person's life or liberty.",
      partOf: "Part XI — Wilful and Forbidden Acts in Respect of Certain Property",
    },
  ],
  [
    "431.2",
    {
      title: "Definitions",
      severity: "Indictable",
      maxPenalty: "Life imprisonment",
      url: `${JUSTICE_LAWS_BASE}/section-431.2.html`,
      summary:
        "Defines terms including explosive or other lethal device, infrastructure facility, military forces of a state, place of public use, and public transportation system, and makes it an offence to deliver, place, discharge, or detonate an explosive or other lethal device against such a place or facility with intent to cause death or serious bodily injury, or to cause extensive destruction likely to result in major economic loss. Excludes acts committed during an armed conflict that comply with international law, and official activities of a state's military forces governed by international law.",
      partOf: "Part XI — Wilful and Forbidden Acts in Respect of Certain Property",
    },
  ],
  [
    "432",
    {
      title: "Unauthorized recording of a movie",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-432.html`,
      summary:
        "Makes it an offence to record a movie theatre performance or its soundtrack without the theatre manager's consent, with a distinct offence for doing so for the purpose of commercial sale or distribution. Allows a court to order forfeiture of anything used to commit the offence, except property belonging to someone not party to the offence.",
      partOf: "Part XI — Wilful and Forbidden Acts in Respect of Certain Property",
    },
  ],
  [
    "433",
    {
      title: "Arson — disregard for human life",
      severity: "Indictable",
      maxPenalty: "Life imprisonment",
      url: `${JUSTICE_LAWS_BASE}/section-433.html`,
      summary:
        "Makes it an offence to intentionally or recklessly cause damage by fire or explosion to property, regardless of ownership, where the person knows or is reckless as to whether the property is inhabited or occupied, or where the fire or explosion causes bodily harm to another person.",
      partOf: "Part XI — Wilful and Forbidden Acts in Respect of Certain Property",
    },
  ],
  [
    "434",
    {
      title: "Arson — damage to property",
      severity: "Indictable",
      maxPenalty: "14 years",
      url: `${JUSTICE_LAWS_BASE}/section-434.html`,
      summary:
        "Makes it an offence to intentionally or recklessly cause damage by fire or explosion to property that is not wholly owned by the person responsible.",
      partOf: "Part XI — Wilful and Forbidden Acts in Respect of Certain Property",
    },
  ],
  [
    "434.1",
    {
      title: "Arson — own property",
      severity: "Indictable",
      maxPenalty: "14 years",
      url: `${JUSTICE_LAWS_BASE}/section-434.1.html`,
      summary:
        "Makes it an offence to intentionally or recklessly cause damage by fire or explosion to property one owns, in whole or in part, where the fire or explosion seriously threatens the health, safety or property of another person.",
      partOf: "Part XI — Wilful and Forbidden Acts in Respect of Certain Property",
    },
  ],
  [
    "435",
    {
      title: "Arson for fraudulent purpose",
      severity: "Hybrid",
      maxPenalty: "10 years",
      url: `${JUSTICE_LAWS_BASE}/section-435.html`,
      summary:
        "Makes it an offence to cause damage by fire or explosion to property with intent to defraud another person, regardless of ownership. Provides that being the holder or beneficiary of a fire insurance policy on the property is a fact from which intent to defraud may be inferred.",
      partOf: "Part XI — Wilful and Forbidden Acts in Respect of Certain Property",
    },
  ],
  [
    "436",
    {
      title: "Arson by negligence",
      severity: "Hybrid",
      maxPenalty: "5 years",
      url: `${JUSTICE_LAWS_BASE}/section-436.html`,
      summary:
        "Makes it an offence for a person who owns or controls property to cause a fire or explosion on that property, through a marked departure from the standard of care a reasonably prudent person would use, that results in bodily harm or property damage. Failure to comply with fire or explosion prevention laws is a fact from which the required departure from the standard of care may be inferred.",
      partOf: "Part XI — Wilful and Forbidden Acts in Respect of Certain Property",
    },
  ],
  [
    "436.1",
    {
      title: "Possession of incendiary material",
      severity: "Hybrid",
      maxPenalty: "5 years",
      url: `${JUSTICE_LAWS_BASE}/section-436.1.html`,
      summary:
        "Makes it an offence to possess incendiary material, an incendiary device, or an explosive substance for the purpose of committing an arson offence under sections 433 to 436.",
      partOf: "Part XI — Wilful and Forbidden Acts in Respect of Certain Property",
    },
  ],
  [
    "437",
    {
      title: "False alarm of fire",
      severity: "Hybrid",
      maxPenalty: "2 years",
      url: `${JUSTICE_LAWS_BASE}/section-437.html`,
      summary:
        "Makes it an offence to wilfully, without reasonable cause, make or circulate a false alarm of fire, by outcry, bells, a fire alarm, telephone, telegraph, or any other means.",
      partOf: "Part XI — Wilful and Forbidden Acts in Respect of Certain Property",
    },
  ],
  [
    "438",
    {
      title: "Interfering with saving of wrecked vessel",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-438.html`,
      summary:
        "Makes it an offence to intentionally prevent, impede, or attempt to prevent or impede the saving of a wrecked, stranded, abandoned, or distressed vessel, or a person attempting to save one. Also makes it an offence to wilfully prevent or impede the saving of wreck.",
      partOf: "Part XI — Wilful and Forbidden Acts in Respect of Certain Property",
    },
  ],
  [
    "439",
    {
      title: "Interfering with marine signal, etc.",
      severity: "Hybrid",
      maxPenalty: "10 years indictable; summary conviction available (s. 439(2)); summary conviction only for making fast a vessel to a sea-mark (s. 439(1))",
      url: `${JUSTICE_LAWS_BASE}/section-439.html`,
      summary:
        "Makes it an offence to make a vessel or boat fast to a navigational signal, buoy, or sea-mark, and a separate, more serious offence to intentionally alter, remove, or conceal such a signal, buoy, or sea-mark.",
      partOf: "Part XI — Wilful and Forbidden Acts in Respect of Certain Property",
    },
  ],
  [
    "440",
    {
      title: "Removing natural bar without permission",
      severity: "Hybrid",
      maxPenalty: "2 years",
      url: `${JUSTICE_LAWS_BASE}/section-440.html`,
      summary:
        "Makes it an offence to knowingly remove, without the Minister of Transport's written permission, stone, wood, earth, or other material forming a natural bar necessary to a public harbour's existence or its natural protection.",
      partOf: "Part XI — Wilful and Forbidden Acts in Respect of Certain Property",
    },
  ],
  [
    "441",
    {
      title: "Occupant injuring building",
      severity: "Hybrid",
      maxPenalty: "5 years",
      url: `${JUSTICE_LAWS_BASE}/section-441.html`,
      summary:
        "Makes it an offence for a person in possession or occupation of a dwelling-house or other building to intentionally pull down, demolish, or remove all or part of it, or sever attached fixtures, to the prejudice of a mortgagee, hypothecary creditor, or owner.",
      partOf: "Part XI — Wilful and Forbidden Acts in Respect of Certain Property",
    },
  ],
  [
    "442",
    {
      title: "Interfering with boundary lines",
      severity: "Summary",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-442.html`,
      summary:
        "Makes it an offence to wilfully pull down, deface, alter, or remove anything planted or set up as the boundary line, or part of the boundary line, of land.",
      partOf: "Part XI — Wilful and Forbidden Acts in Respect of Certain Property",
    },
  ],
  [
    "443",
    {
      title: "Interfering with international boundary marks, etc.",
      severity: "Hybrid",
      maxPenalty: "5 years",
      url: `${JUSTICE_LAWS_BASE}/section-443.html`,
      summary:
        "Makes it an offence to intentionally pull down, deface, alter, or remove a lawfully placed international, provincial, county, or municipal boundary mark, or a boundary mark placed by a land surveyor marking a limit, boundary, or angle of a concession, range, lot, or parcel of land. Exempts a land surveyor who lifts and carefully replaces such a mark in the course of survey work, or who lifts a mark for a highway or similar project and records its original position.",
      partOf: "Part XI — Wilful and Forbidden Acts in Respect of Certain Property",
    },
  ],
  [
    "445",
    {
      title: "Injuring or endangering other animals",
      severity: "Hybrid",
      maxPenalty: "5 years indictable; or summary conviction, liable to a fine of up to $10,000 or imprisonment of up to 2 years less a day, or both.",
      url: `${JUSTICE_LAWS_BASE}/section-445.html`,
      summary:
        "Makes it an offence to wilfully and without lawful excuse kill, maim, wound, poison, or injure dogs, birds, or animals kept for a lawful purpose, or to place poison where such animals may easily consume it.",
      partOf: "Part XI — Wilful and Forbidden Acts in Respect of Certain Property",
    },
  ],
  [
    "445.01",
    {
      title: "Killing or injuring certain animals",
      severity: "Hybrid",
      maxPenalty: "5 years indictable, with a minimum of 6 months if a law enforcement animal is killed in the commission of the offence; or summary conviction, liable to a fine of up to $10,000 or imprisonment of up to 2 years less a day, or both.",
      url: `${JUSTICE_LAWS_BASE}/section-445.01.html`,
      summary:
        "Makes it an offence to wilfully and without lawful excuse kill, maim, wound, poison, or injure a law enforcement animal while it is aiding a law enforcement officer, a military animal while it is aiding a member of the Canadian Forces, or a service animal. Requires a sentence for an offence committed against a law enforcement animal to be served consecutively to any other sentence arising from the same event, and defines the animal categories and law enforcement officer.",
      relatedSections: ["2"],
      partOf: "Part XI — Wilful and Forbidden Acts in Respect of Certain Property",
    },
  ],
  [
    "445.1",
    {
      title: "Causing unnecessary suffering",
      severity: "Hybrid",
      maxPenalty: "5 years indictable; or summary conviction, liable to a fine of up to $10,000 or imprisonment of up to 2 years less a day, or both.",
      url: `${JUSTICE_LAWS_BASE}/section-445.1.html`,
      summary:
        "Makes it an offence to wilfully cause or permit unnecessary pain, suffering, or injury to an animal or bird, to take part in or encourage animal or bird fighting or baiting, to administer a poisonous or injurious substance to a domestic or captive wild animal or bird, or to organize or allow premises to be used for events where captive birds are released to be shot. States that a failure to exercise reasonable care causing pain, suffering, or injury is proof of wilful conduct for the pain-or-suffering offence, and that presence at an animal fight or baiting is proof of encouraging, aiding, or assisting at it, in each case absent contrary evidence.",
      partOf: "Part XI — Wilful and Forbidden Acts in Respect of Certain Property",
    },
  ],
  [
    "445.2",
    {
      title: "Definition of cetacean",
      severity: "Summary",
      maxPenalty: "Fine not exceeding $200,000",
      url: `${JUSTICE_LAWS_BASE}/section-445.2.html`,
      summary:
        "Defines cetacean and makes it an offence to own, have custody of, or control a captive cetacean, to breed or impregnate a cetacean, or to possess or seek a cetacean's reproductive materials, subject to exceptions. Owning or controlling a cetacean already in captivity, under care or rehabilitation, or held under a provincial welfare licence is exempt only from the ownership offence, while a provincial scientific-research licence exempts all three offences; captive cetaceans also cannot be used for unlicensed entertainment performances.",
      partOf: "Part XI — Wilful and Forbidden Acts in Respect of Certain Property",
    },
  ],
  [
    "446",
    {
      title: "Causing damage or injury",
      severity: "Hybrid",
      maxPenalty: "2 years indictable, or summary conviction available.",
      url: `${JUSTICE_LAWS_BASE}/section-446.html`,
      summary:
        "Makes it an offence to cause damage or injury to animals or birds being driven or conveyed through wilful neglect, or, as an owner or custodian of a domestic or captive wild animal or bird, to abandon it in distress or wilfully neglect or fail to provide adequate food, water, shelter, or care. States that, for the conveyance offence, a failure to exercise reasonable care or supervision causing damage or injury is proof of wilful neglect absent contrary evidence.",
      partOf: "Part XI — Wilful and Forbidden Acts in Respect of Certain Property",
    },
  ],
  [
    "447",
    {
      title: "Arena for animal fighting",
      severity: "Hybrid",
      maxPenalty: "5 years indictable; or summary conviction, liable to a fine of up to $10,000 or imprisonment of up to 2 years less a day, or both.",
      url: `${JUSTICE_LAWS_BASE}/section-447.html`,
      summary:
        "Makes it an offence to build, make, maintain, keep, or allow to be built, made, maintained, or kept an arena for animal fighting on premises one owns or occupies.",
      partOf: "Part XI — Wilful and Forbidden Acts in Respect of Certain Property",
    },
  ],
  [
    "447.1",
    {
      title: "Order of prohibition or restitution",
      severity: "Summary",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-447.1.html`,
      summary:
        "Allows a court sentencing someone for an animal cruelty offence to also prohibit them from owning, having custody or control of, or residing with an animal or bird, and to order repayment of reasonable costs incurred by a person or organization caring for the animal or bird. Makes breaching the prohibition order a separate offence and applies certain restitution procedure provisions to a cost repayment order.",
      relatedSections: ["445", "445.1", "446", "447"],
      partOf: "Part XI — Wilful and Forbidden Acts in Respect of Certain Property",
    },
  ],

  // ── Part XII — Offences Relating to Currency ──
  [
    "448",
    {
      title: "Definitions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-448.html`,
      summary:
        "Defines terms used in this Part, including what qualifies as counterfeit money, what counts as a counterfeit token of value, what makes money 'current', and what 'utter' includes.",
      partOf: "Part XII — Offences Relating to Currency",
    },
  ],
  [
    "449",
    {
      title: "Making",
      severity: "Indictable",
      maxPenalty: "14 years",
      url: `${JUSTICE_LAWS_BASE}/section-449.html`,
      summary:
        "Makes it an offence to make or begin to make counterfeit money.",
      partOf: "Part XII — Offences Relating to Currency",
    },
  ],
  [
    "450",
    {
      title: "Possession, etc., of counterfeit money",
      severity: "Indictable",
      maxPenalty: "14 years",
      url: `${JUSTICE_LAWS_BASE}/section-450.html`,
      summary:
        "Makes it an offence, without lawful justification or excuse, to buy, receive, or offer to buy or receive counterfeit money, to have counterfeit money in one's custody or possession, or to bring counterfeit money into Canada.",
      partOf: "Part XII — Offences Relating to Currency",
    },
  ],
  [
    "451",
    {
      title: "Having clippings, etc.",
      severity: "Hybrid",
      maxPenalty: "5 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-451.html`,
      summary:
        "Makes it an offence to possess, without lawful justification or excuse, gold or silver filings, clippings, bullion, or dust produced by impairing or diminishing a current gold or silver coin, knowing it was produced that way.",
      partOf: "Part XII — Offences Relating to Currency",
    },
  ],
  [
    "452",
    {
      title: "Uttering, etc., counterfeit money",
      severity: "Indictable",
      maxPenalty: "14 years",
      url: `${JUSTICE_LAWS_BASE}/section-452.html`,
      summary:
        "Makes it an offence, without lawful justification or excuse, to utter or offer to utter counterfeit money or use it as if genuine, or to export, send, or take counterfeit money out of Canada.",
      partOf: "Part XII — Offences Relating to Currency",
    },
  ],
  [
    "453",
    {
      title: "Uttering coin",
      severity: "Hybrid",
      maxPenalty: "2 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-453.html`,
      summary:
        "Makes it an offence to knowingly utter, with intent to defraud, a coin that is not current or a piece of metal that resembles a current coin in size, shape, or colour.",
      partOf: "Part XII — Offences Relating to Currency",
    },
  ],
  [
    "454",
    {
      title: "Slugs and tokens",
      severity: "Summary",
      maxPenalty: "Summary conviction",
      url: `${JUSTICE_LAWS_BASE}/section-454.html`,
      summary:
        "Makes it an offence, without lawful excuse, to manufacture, produce, sell, or possess anything intended to be fraudulently substituted for a coin or token that a coin- or token-operated device is designed to accept.",
      partOf: "Part XII — Offences Relating to Currency",
    },
  ],
  [
    "455",
    {
      title: "Clipping and uttering clipped coin",
      severity: "Indictable",
      maxPenalty: "14 years",
      url: `${JUSTICE_LAWS_BASE}/section-455.html`,
      summary:
        "Makes it an offence to impair, diminish, or lighten a current gold or silver coin with intent that it still pass as a current coin, or to utter a coin knowing it has been altered in that way.",
      partOf: "Part XII — Offences Relating to Currency",
    },
  ],
  [
    "456",
    {
      title: "Defacing current coins",
      severity: "Summary",
      maxPenalty: "Summary conviction",
      url: `${JUSTICE_LAWS_BASE}/section-456.html`,
      summary:
        "Makes it an offence to deface a current coin, or to utter a current coin that has been defaced.",
      partOf: "Part XII — Offences Relating to Currency",
    },
  ],
  [
    "457",
    {
      title: "Likeness of bank-notes",
      severity: "Summary",
      maxPenalty: "Summary conviction",
      url: `${JUSTICE_LAWS_BASE}/section-457.html`,
      summary:
        "Prohibits making, publishing, printing, or distributing, including electronically, anything in the likeness of a current bank-note or of an obligation or security of a government or bank, subject to exceptions for the Bank of Canada, the RCMP, and their authorized contractors or licensees. Provides a defence where a printed likeness of a Canadian bank-note is smaller or larger than a specified size range and is either black-and-white or shows the bank-note on only one side.",
      partOf: "Part XII — Offences Relating to Currency",
    },
  ],
  [
    "458",
    {
      title: "Making, having or dealing in instruments for counterfeiting",
      severity: "Indictable",
      maxPenalty: "14 years",
      url: `${JUSTICE_LAWS_BASE}/section-458.html`,
      summary:
        "Makes it an offence, without lawful justification or excuse, to make, repair, buy, sell, or possess any machine, tool, or instrument known to have been used or adapted for making counterfeit money or counterfeit tokens of value.",
      partOf: "Part XII — Offences Relating to Currency",
    },
  ],
  [
    "459",
    {
      title: "Conveying instruments for coining out of mint",
      severity: "Indictable",
      maxPenalty: "14 years",
      url: `${JUSTICE_LAWS_BASE}/section-459.html`,
      summary:
        "Makes it an offence, without lawful justification or excuse, to knowingly convey out of a Canadian mint a machine, tool, or instrument used in manufacturing coins, a useful part of such an item, or coin, bullion, or metal.",
      partOf: "Part XII — Offences Relating to Currency",
    },
  ],
  [
    "460",
    {
      title: "Advertising and dealing in counterfeit money, etc.",
      severity: "Hybrid",
      maxPenalty: "5 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-460.html`,
      summary:
        "Makes it an offence to advertise the sale, procurement, or disposal of counterfeit money or counterfeit tokens of value, or information on how to do so, or to purchase, obtain, negotiate, or otherwise deal with counterfeit tokens of value. States that a person cannot be convicted under this section for dealing in genuine but valueless money unless they knew it had no value and acted with fraudulent intent.",
      partOf: "Part XII — Offences Relating to Currency",
    },
  ],
  [
    "461",
    {
      title: "When counterfeit complete",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-461.html`,
      summary:
        "States that an offence involving counterfeit money or counterfeit tokens of value is complete even if the item is unfinished or does not exactly copy what it is meant to resemble. Sets out rules for using a certificate from a designated examiner of counterfeit as evidence, including advance notice requirements and the ability, with leave of the court, to require the certificate-signer's attendance for cross-examination.",
      partOf: "Part XII — Offences Relating to Currency",
    },
  ],
  [
    "462",
    {
      title: "Ownership",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-462.html`,
      summary:
        "States that counterfeit money, counterfeit tokens of value, and items used or intended to make them belong to Her Majesty, and allows a peace officer to seize and detain them. Requires seized items to be sent to the Minister of Finance, except that anything still required as evidence is withheld until it is no longer needed in those proceedings.",
      partOf: "Part XII — Offences Relating to Currency",
    },
  ],

  // ── Part XII.2 — Proceeds of Crime ──
  [
    "462.3",
    {
      title: "Definitions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-462.3.html`,
      summary:
        "Defines terms used in this Part, including designated offence, judge, and proceeds of crime, and notes several earlier definitions as repealed. Allows the Governor in Council to make regulations excluding certain indictable offences from the definition of designated offence.",
      partOf: "Part XII.2 — Proceeds of Crime",
    },
  ],
  [
    "462.31",
    {
      title: "Laundering proceeds of crime",
      severity: "Hybrid",
      maxPenalty: "10 years indictable, or summary conviction available, for the base laundering offence; 14 years indictable if done for the benefit of, at the direction of, or in association with a criminal organization.",
      url: `${JUSTICE_LAWS_BASE}/section-462.31.html`,
      summary:
        "Makes it an offence to deal with property or its proceeds in various ways, with intent to conceal or convert it, knowing, believing, or being reckless as to whether it derives from a designated offence, with an enhanced offence where done for the benefit of, at the direction of, or in association with a criminal organization. Unless the accused is also charged with the designated offence, the prosecution need not prove knowledge of its specific nature, and the court may infer the required knowledge, belief, or recklessness from markedly unusual dealings or dealings inconsistent with lawful activity in that sector; peace officers acting in their investigative duties are exempted.",
      partOf: "Part XII.2 — Proceeds of Crime",
    },
  ],
  [
    "462.32",
    {
      title: "Special search warrant",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-462.32.html`,
      summary:
        "Sets out the process for a judge to issue a special search warrant authorizing search for and seizure of property believed to be proceeds of crime, including the application procedure, execution conditions, and the requirements for detaining seized property, filing a report, and providing notice or copies to interested persons, with provision for returning seized property with the Attorney General's consent in specified circumstances.",
      relatedSections: ["487", "488"],
      partOf: "Part XII.2 — Proceeds of Crime",
    },
  ],
  [
    "462.321",
    {
      title: "Special warrant — digital assets",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-462.321.html`,
      summary:
        "Sets out the process for a judge to issue a special warrant authorizing search for and seizure of digital assets, including virtual currency, believed to be proceeds of crime, including the application procedure, execution conditions, and requirements for detaining the assets, notifying the person from whom they were seized, filing a report, and returning them with the Attorney General's consent in specified circumstances.",
      relatedSections: ["342.1"],
      partOf: "Part XII.2 — Proceeds of Crime",
    },
  ],
  [
    "462.33",
    {
      title: "Application for restraint order",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-462.33.html`,
      summary:
        "Sets out the process for the Attorney General to apply for a restraint order prohibiting anyone from disposing of or dealing with property believed to be proceeds of crime, including the application requirements, the judge's authority to impose conditions and require notice, the order's effect and duration, and the offence of contravening it.",
      relatedSections: ["462.34", "462.35", "462.37", "462.38", "462.41", "462.43"],
      partOf: "Part XII.2 — Proceeds of Crime",
    },
  ],
  [
    "462.331",
    {
      title: "Management order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-462.331.html`,
      summary:
        "Allows a judge, on application, to appoint a person to take control of and manage seized or restrained property, sets out that power's scope including interlocutory sale, destruction of low-value property, and forfeiture of certain property, and sets out the procedures for obtaining destruction and forfeiture orders, when a management order ends, and how it applies to sale proceeds.",
      relatedSections: ["462.32", "462.321", "462.33"],
      partOf: "Part XII.2 — Proceeds of Crime",
    },
  ],
  [
    "462.34",
    {
      title: "Application for review of special warrants and restraint orders",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-462.34.html`,
      summary:
        "Sets out the process by which a person with an interest in seized or restrained property may apply to a judge for its return, for permission to examine it, or for an accounting, including notice requirements, the conditions under which a judge may order property returned or a restraint order revoked or varied, and how legal and other expenses are assessed.",
      relatedSections: ["462.32", "462.321", "462.33", "354", "355.2", "355.4"],
      partOf: "Part XII.2 — Proceeds of Crime",
    },
  ],
  [
    "462.341",
    {
      title: "Application of property restitution provisions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-462.341.html`,
      summary:
        "Extends certain notice, expense, and legal fee taxation provisions governing property restitution applications to persons with an interest in seized money, bank-notes, or virtual currency or other digital assets that may be subject to forfeiture proceedings.",
      relatedSections: ["462.34", "462.37", "462.38"],
      partOf: "Part XII.2 — Proceeds of Crime",
    },
  ],
  [
    "462.35",
    {
      title: "Expiration of special warrants and restraint orders",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-462.35.html`,
      summary:
        "Sets out how long seized property may be detained or a restraint order may remain in force, generally six months, and the circumstances under which that period may be extended, either because proceedings have been instituted or because a judge orders a further extension on application by the Attorney General.",
      relatedSections: ["462.32", "462.321", "462.33", "462.37", "462.38"],
      partOf: "Part XII.2 — Proceeds of Crime",
    },
  ],
  [
    "462.36",
    {
      title: "Forwarding to clerk where accused to stand trial",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-462.36.html`,
      summary:
        "Requires the clerk of the court to forward a copy of the seizure report or restraint order to the clerk of the court where an accused is ordered to stand trial for a designated offence.",
      relatedSections: ["462.32", "462.321", "462.33"],
      partOf: "Part XII.2 — Proceeds of Crime",
    },
  ],
  [
    "462.37",
    {
      title: "Order of forfeiture of property",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-462.37.html`,
      summary:
        "Sets out when a court must order forfeiture of property found to be proceeds of crime following a conviction or discharge for a designated offence, including an expanded forfeiture regime for offenders shown to have engaged in a pattern of criminal activity or whose property value cannot be explained by legitimate income, and allows a court to order a fine instead of forfeiture where the property cannot be forfeited, with corresponding default imprisonment terms.",
      relatedSections: ["730", "462.4", "462.41", "736"],
      partOf: "Part XII.2 — Proceeds of Crime",
    },
  ],
  [
    "462.371",
    {
      title: "Definition of order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-462.371.html`,
      summary:
        "Sets out how an order made under section 462.37 or 462.38 (defined here as \"order\") can be executed anywhere in Canada, filed and entered as a judgment in another province's superior court, and how notice, claims under section 462.42, and court findings on such filed orders are handled.",
      relatedSections: ["462.37", "462.38", "462.41", "462.42"],
      partOf: "Part XII.2 — Proceeds of Crime",
    },
  ],
  [
    "462.38",
    {
      title: "Application for forfeiture",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-462.38.html`,
      summary:
        "Allows the Attorney General to apply for a court order forfeiting property as proceeds of crime where an accused charged with a designated offence has died or absconded, and defines when a person is deemed to have absconded for this purpose.",
      relatedSections: ["462.39", "462.4", "462.41"],
      partOf: "Part XII.2 — Proceeds of Crime",
    },
  ],
  [
    "462.39",
    {
      title: "Inference",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-462.39.html`,
      summary:
        "Allows a court to infer that property was obtained through a designated offence where a person's property value increased after the offence in a way their unrelated income cannot reasonably explain.",
      relatedSections: ["462.37", "462.38"],
      partOf: "Part XII.2 — Proceeds of Crime",
    },
  ],
  [
    "462.4",
    {
      title: "Voidable transfers",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-462.4.html`,
      summary:
        "Allows a court to set aside a conveyance or transfer of property that occurred after seizure or service of a restraint order, before forfeiture is ordered, unless the transfer was for valuable consideration to a person acting in good faith.",
      relatedSections: ["462.37", "462.38", "462.33"],
      partOf: "Part XII.2 — Proceeds of Crime",
    },
  ],
  [
    "462.41",
    {
      title: "Notice",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-462.41.html`,
      summary:
        "Requires a court to give notice to, and allows it to hear, anyone with an apparent interest in property before ordering its forfeiture, and lets the court order restoration of property to an innocent lawful owner instead of forfeiture.",
      relatedSections: ["462.37", "462.38"],
      partOf: "Part XII.2 — Proceeds of Crime",
    },
  ],
  [
    "462.42",
    {
      title: "Application by person claiming interest for relief from forfeiture",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-462.42.html`,
      summary:
        "Lets a person claiming an interest in forfeited property apply to a judge within thirty days for a declaration that their interest is unaffected by the forfeiture, sets out the notice, hearing, and appeal process, and requires the Attorney General to return the property or its value once such an order becomes final.",
      relatedSections: ["462.37", "462.38"],
      partOf: "Part XII.2 — Proceeds of Crime",
    },
  ],
  [
    "462.43",
    {
      title: "Residual disposal of property seized or dealt with under special warrants or restraint orders",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-462.43.html`,
      summary:
        "Allows a judge, on application or on their own motion, to revoke a restraint order, cancel a recognizance, or order return or forfeiture of seized property once satisfied it is no longer needed for forfeiture proceedings, investigation, or evidence.",
      relatedSections: ["462.32", "462.321", "462.33", "462.34", "462.37", "462.38"],
      partOf: "Part XII.2 — Proceeds of Crime",
    },
  ],
  [
    "462.44",
    {
      title: "Appeals from certain orders",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-462.44.html`,
      summary:
        "Allows a person aggrieved by certain forfeiture, restoration, or disposal orders to appeal them in the same manner as an appeal against a conviction or acquittal.",
      relatedSections: ["462.38", "462.41", "462.43"],
      partOf: "Part XII.2 — Proceeds of Crime",
    },
  ],
  [
    "462.45",
    {
      title: "Suspension of forfeiture pending appeal",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-462.45.html`,
      summary:
        "Suspends the operation of a forfeiture or restoration order while related applications, appeals, or proceedings about the property's seizure are ongoing, and bars disposal of the property within thirty days after a forfeiture order.",
      relatedSections: ["462.34", "462.37", "462.38", "462.41", "462.43"],
      partOf: "Part XII.2 — Proceeds of Crime",
    },
  ],
  [
    "462.46",
    {
      title: "Copies of documents returned or forfeited",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-462.46.html`,
      summary:
        "Allows the Attorney General to make and retain a copy of a document before returning, forfeiting, or otherwise dealing with it under the Part, and gives a certified copy the same evidentiary weight as the original.",
      relatedSections: ["462.34", "462.37", "462.38", "462.41", "462.43"],
      partOf: "Part XII.2 — Proceeds of Crime",
    },
  ],
  [
    "462.47",
    {
      title: "No civil or criminal liability incurred by informants",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-462.47.html`,
      summary:
        "States that a person is legally justified in disclosing to a peace officer or the Attorney General facts giving rise to a reasonable suspicion that property is proceeds of crime or that a designated offence has been committed or is about to be committed, subject to Income Tax Act confidentiality obligations.",
      partOf: "Part XII.2 — Proceeds of Crime",
    },
  ],
  [
    "462.48",
    {
      title: "Definition of designated substance offence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-462.48.html`,
      summary:
        "Defines \"designated substance offence,\" sets out the offences for which the Attorney General may apply for court-ordered disclosure of income tax information, and establishes the application, order, objection, and appeal process governing that disclosure.",
      relatedSections: ["119", "120", "121", "122", "123", "279.01"],
      partOf: "Part XII.2 — Proceeds of Crime",
    },
  ],
  [
    "462.49",
    {
      title: "Specific forfeiture provisions unaffected by this Part",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-462.49.html`,
      summary:
        "Provides that this Part does not affect forfeiture provisions in other Acts, and that an offender's property used to satisfy forfeiture takes priority only after satisfying any restitution or compensation owed to victims.",
      partOf: "Part XII.2 — Proceeds of Crime",
    },
  ],
  [
    "462.5",
    {
      title: "Regulations",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-462.5.html`,
      summary:
        "Authorizes the Attorney General to make regulations governing how property forfeited under this Part is disposed of or otherwise dealt with.",
      partOf: "Part XII.2 — Proceeds of Crime",
    },
  ],

  // ── Part XIII — Attempts — Conspiracies — Accessories ──
  [
    "463",
    {
      title: "Attempts, accessories",
      severity: "Hybrid",
      maxPenalty: "14 years indictable for attempting or being an accessory after the fact to an offence carrying life imprisonment; otherwise half of the underlying offence's maximum indictable term, or summary conviction if the underlying offence is summary or hybrid.",
      url: `${JUSTICE_LAWS_BASE}/section-463.html`,
      summary:
        "Sets out that a person who attempts to commit, or is an accessory after the fact to, an indictable or summary conviction offence is themselves guilty of an offence, whether the underlying offence is indictable, hybrid, or summary.",
      partOf: "Part XIII — Attempts — Conspiracies — Accessories",
    },
  ],
  [
    "464",
    {
      title: "Counselling offence that is not committed",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-464.html`,
      summary:
        "Makes it an offence to counsel another person to commit an indictable or summary conviction offence, even if the offence counselled is not actually committed.",
      partOf: "Part XIII — Attempts — Conspiracies — Accessories",
    },
  ],
  [
    "465",
    {
      title: "Conspiracy",
      severity: "Hybrid",
      maxPenalty: "Life imprisonment for conspiracy to commit murder; 10 years indictable or summary conviction for conspiring to falsely prosecute someone for an offence carrying life or up to 14 years, or 5 years indictable or summary conviction if the underlying offence carries less than 14 years; the same punishment as the underlying offence for conspiring to commit any other indictable offence; summary conviction for conspiring to commit a summary offence.",
      url: `${JUSTICE_LAWS_BASE}/section-465.html`,
      summary:
        "Makes it an offence to conspire with another person to commit murder, to prosecute a person known to be innocent, or to commit any other indictable or summary conviction offence, and extends jurisdiction to conspiracies formed partly in or affecting Canada.",
      partOf: "Part XIII — Attempts — Conspiracies — Accessories",
    },
  ],
  [
    "466",
    {
      title: "Conspiracy in restraint of trade",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-466.html`,
      summary:
        "Defines a conspiracy in restraint of trade as an agreement between two or more persons to do or procure an unlawful act in restraint of trade, and states that a trade union's purposes are not unlawful merely because they restrain trade.",
      partOf: "Part XIII — Attempts — Conspiracies — Accessories",
    },
  ],
  [
    "467",
    {
      title: "Saving",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-467.html`,
      summary:
        "Provides that a person is not guilty of conspiracy merely for refusing to work with someone or acting for the purpose of a trade combination, unless that act is otherwise expressly punishable by law, and defines \"trade combination.\"",
      partOf: "Part XIII — Attempts — Conspiracies — Accessories",
    },
  ],
  [
    "467.1",
    {
      title: "Definitions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-467.1.html`,
      summary:
        "Defines \"criminal organization\" as a group of three or more persons whose main purpose or activity is facilitating or committing serious offences for material benefit, defines \"serious offence,\" and clarifies what counts as facilitation or commission of an offence for related sections.",
      relatedSections: ["467.11", "467.111", "467.12", "467.13"],
      partOf: "Part XIII — Attempts — Conspiracies — Accessories",
    },
  ],
  [
    "467.11",
    {
      title: "Participation in activities of criminal organization",
      severity: "Hybrid",
      maxPenalty: "5 years",
      url: `${JUSTICE_LAWS_BASE}/section-467.11.html`,
      summary:
        "Makes it an offence to knowingly participate in or contribute to a criminal organization's activities for the purpose of enhancing its ability to facilitate or commit an indictable offence, and lists factors a court may consider and facts the prosecutor need not prove.",
      partOf: "Part XIII — Attempts — Conspiracies — Accessories",
    },
  ],
  [
    "467.111",
    {
      title: "Recruitment of members by a criminal organization",
      severity: "Indictable",
      maxPenalty: "5 years; minimum 6 months where the person recruited is under 18",
      url: `${JUSTICE_LAWS_BASE}/section-467.111.html`,
      summary:
        "Makes it an offence to recruit, solicit, encourage, coerce, or invite a person to join a criminal organization for the purpose of enhancing its ability to facilitate or commit an indictable offence.",
      partOf: "Part XIII — Attempts — Conspiracies — Accessories",
    },
  ],
  [
    "467.12",
    {
      title: "Commission of offence for criminal organization",
      severity: "Indictable",
      maxPenalty: "14 years",
      url: `${JUSTICE_LAWS_BASE}/section-467.12.html`,
      summary:
        "Makes it an offence to commit an indictable offence for the benefit of, at the direction of, or in association with a criminal organization, and states the prosecutor need not prove the accused knew the identity of the organization's members.",
      partOf: "Part XIII — Attempts — Conspiracies — Accessories",
    },
  ],
  [
    "467.13",
    {
      title: "Instructing commission of offence for criminal organization",
      severity: "Indictable",
      maxPenalty: "Life imprisonment",
      url: `${JUSTICE_LAWS_BASE}/section-467.13.html`,
      summary:
        "Makes it an offence for a member of a criminal organization to knowingly instruct another person to commit an offence for the benefit of, at the direction of, or in association with the organization, and states what the prosecutor need not prove.",
      partOf: "Part XIII — Attempts — Conspiracies — Accessories",
    },
  ],
  [
    "467.14",
    {
      title: "Sentences to be served consecutively",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-467.14.html`,
      summary:
        "Requires that a sentence for an offence under sections 467.11, 467.111, 467.12, or 467.13 be served consecutively to other related punishments or sentences the person is subject to.",
      relatedSections: ["467.11", "467.111", "467.12", "467.13"],
      partOf: "Part XIII — Attempts — Conspiracies — Accessories",
    },
  ],

  // ── Part XIV — Jurisdiction ──
  [
    "468",
    {
      title: "Superior court of criminal jurisdiction",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-468.html`,
      summary:
        "States that every superior court of criminal jurisdiction has jurisdiction to try any indictable offence.",
      partOf: "Part XIV — Jurisdiction",
    },
  ],
  [
    "469",
    {
      title: "Court of criminal jurisdiction",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-469.html`,
      summary:
        "Lists the indictable offences — including treason, intimidating Parliament, mutiny, sedition, piracy, murder, certain judicial bribery, crimes against humanity, and related attempts or conspiracies — over which a court of criminal jurisdiction does not have jurisdiction under this section.",
      relatedSections: ["47", "51", "53", "61", "74", "75"],
      partOf: "Part XIV — Jurisdiction",
    },
  ],
  [
    "470",
    {
      title: "Jurisdiction over person",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-470.html`,
      summary:
        "Sets out when a superior or other court of criminal jurisdiction is competent to try an accused, namely where the accused is found, arrested, or in custody within its territory, or has been ordered to be tried by that court or a court whose jurisdiction was transferred to it.",
      partOf: "Part XIV — Jurisdiction",
    },
  ],
  [
    "471",
    {
      title: "Trial by jury compulsory",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-471.html`,
      summary:
        "Requires that, unless the law expressly provides otherwise, an accused charged with an indictable offence be tried by a judge and jury.",
      partOf: "Part XIV — Jurisdiction",
    },
  ],
  [
    "473",
    {
      title: "Trial without jury",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-473.html`,
      summary:
        "Allows an accused charged with an offence listed in section 469 to be tried without a jury by a superior court judge with the consent of both the accused and the Attorney General, permits joinder of other offences, and provides that such consent cannot be withdrawn unless both parties agree.",
      relatedSections: ["469"],
      partOf: "Part XIV — Jurisdiction",
    },
  ],
  [
    "474",
    {
      title: "Adjournment when no jury summoned",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-474.html`,
      summary:
        "Allows a court clerk to adjourn court proceedings to a later day when no judge is present because no jury panel was summoned, or on a presiding judge's instructions at any time.",
      partOf: "Part XIV — Jurisdiction",
    },
  ],
  [
    "475",
    {
      title: "Accused absconding during trial",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-475.html`,
      summary:
        "Provides that an accused who absconds during trial is deemed to have waived the right to be present, allowing the court to continue the trial and impose sentence in absence or adjourn pending arrest, permits adverse inferences from absconding, limits reopening proceedings on the accused's return, and preserves defence counsel's authority to continue acting.",
      partOf: "Part XIV — Jurisdiction",
    },
  ],
  [
    "476",
    {
      title: "Special jurisdictions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-476.html`,
      summary:
        "Sets out deeming rules for where an offence is considered to have been committed when it occurs on water, on a boundary between territorial divisions, on a traveling vehicle or vessel, on an aircraft in flight, or in the course of mail delivery spanning multiple territorial divisions.",
      partOf: "Part XIV — Jurisdiction",
    },
  ],
  [
    "477",
    {
      title: "Definition of ship",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-477.html`,
      summary:
        "Defines \"ship\" for the purposes of sections 477.1 to 477.4 and states those sections do not limit the operation of any other Act or a court's other jurisdiction.",
      relatedSections: ["477.1", "477.2", "477.3", "477.4"],
      partOf: "Part XIV — Jurisdiction",
    },
  ],
  [
    "477.1",
    {
      title: "Offences outside of Canada",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-477.1.html`,
      summary:
        "Deems certain acts or omissions committed outside Canada's land territory — in the exclusive economic zone, over the continental shelf, aboard a Canadian-registered ship, during hot pursuit, or outside any state's territory by a Canadian citizen — to have been committed in Canada if they would be offences here.",
      partOf: "Part XIV — Jurisdiction",
    },
  ],
  [
    "477.2",
    {
      title: "Consent of Attorney General of Canada",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-477.2.html`,
      summary:
        "Requires the consent of the federal Attorney General, obtained within eight days of commencing proceedings, to continue certain prosecutions involving non-citizens and foreign-registered ships in Canada's territorial sea or under section 477.1, with an exception for summary conviction proceedings.",
      relatedSections: ["477.1"],
      partOf: "Part XIV — Jurisdiction",
    },
  ],
  [
    "477.3",
    {
      title: "Exercising powers of arrest, entry, etc.",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-477.3.html`,
      summary:
        "Sets out where and how powers of arrest, entry, search, or seizure connected to offences under section 477.1 may be exercised, gives justices and judges jurisdiction to authorize such measures, and requires the federal Attorney General's consent to exercise these powers outside Canada regarding a foreign-registered ship.",
      relatedSections: ["477.1"],
      partOf: "Part XIV — Jurisdiction",
    },
  ],
  [
    "477.4",
    {
      title: "Evidence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-477.4.html`,
      summary:
        "Makes a certificate under the Oceans Act, or one from the Minister of Foreign Affairs stating a location's status relative to Canada's waters or territory, conclusive proof of that fact without needing to prove the signature or authority of the issuer, though its production cannot be compelled.",
      partOf: "Part XIV — Jurisdiction",
    },
  ],
  [
    "478",
    {
      title: "Offence committed entirely in one province",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-478.html`,
      summary:
        "Generally bars a court in one province from trying an offence committed entirely in another province, sets special rules for defamatory libel in newspapers, and allows an accused charged with an offence committed elsewhere in Canada to plead guilty before a court in the province where they are located with the relevant Attorney General's consent.",
      relatedSections: ["469", "297"],
      partOf: "Part XIV — Jurisdiction",
    },
  ],
  [
    "479",
    {
      title: "Offence outstanding in same province",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-479.html`,
      summary:
        "Allows an accused charged with an offence committed in the province where they are located, but who is not charged under section 469, to plead guilty before a court there with the relevant Attorney General's consent, with the accused returned to custody if they do not plead guilty.",
      relatedSections: ["469"],
      partOf: "Part XIV — Jurisdiction",
    },
  ],
  [
    "480",
    {
      title: "Offence in unorganized territory",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-480.html`,
      summary:
        "Allows an offence committed in an unorganized tract of a province, or on a lake or river within it, to be prosecuted in any territorial division or provisional judicial district of that province, with jurisdiction continuing after a new division or district is created there.",
      partOf: "Part XIV — Jurisdiction",
    },
  ],
  [
    "481",
    {
      title: "Offence not in a province",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-481.html`,
      summary:
        "Allows an offence committed in a part of Canada not within any province to be prosecuted, tried, and punished in any provincial territorial division as if it occurred there.",
      partOf: "Part XIV — Jurisdiction",
    },
  ],
  [
    "481.1",
    {
      title: "Offence in Canadian waters",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-481.1.html`,
      summary:
        "Allows an offence committed in Canada's territorial sea or internal waters to be prosecuted, tried, and punished in any Canadian territorial division regardless of whether the accused is in Canada.",
      partOf: "Part XIV — Jurisdiction",
    },
  ],
  [
    "481.2",
    {
      title: "Offence outside Canada",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-481.2.html`,
      summary:
        "Allows an offence committed outside Canada, where the act or omission is itself an offence when committed abroad, to be prosecuted, tried, and punished in any Canadian territorial division regardless of whether the accused is in Canada.",
      partOf: "Part XIV — Jurisdiction",
    },
  ],
  [
    "481.3",
    {
      title: "Appearance of accused at trial",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-481.3.html`,
      summary:
        "Confirms that the Act's rules on an accused's required appearance at proceedings, and their exceptions, apply to proceedings commenced under sections 481, 481.1, or 481.2.",
      relatedSections: ["481", "481.1", "481.2"],
      partOf: "Part XIV — Jurisdiction",
    },
  ],
  [
    "482",
    {
      title: "Power to make rules",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-482.html`,
      summary:
        "Authorizes superior courts of criminal jurisdiction, courts of appeal, and a listed set of provincial and territorial courts to make rules of court governing criminal proceedings, sets out the purposes such rules may serve, requires their publication, and allows the Governor in Council to make regulations securing uniformity among them.",
      relatedSections: ["625.1", "689", "830", "812"],
      partOf: "Part XIV — Jurisdiction",
    },
  ],
  [
    "482.1",
    {
      title: "Power to make rules respecting case management",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-482.1.html`,
      summary:
        "Authorizes courts to make case management rules, including for determining matters, delegating administrative tasks to court personnel, and setting case management schedules, requires parties to comply with directions made under such rules, and allows summonses or warrants to compel attendance at case management proceedings.",
      relatedSections: ["482", "512", "512.3"],
      partOf: "Part XIV — Jurisdiction",
    },
  ],

  // ── Part XV — Special Procedure and Powers ──
  [
    "483",
    {
      title: "Officials with powers of two justices",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-483.html`,
      summary:
        "Allows a judge or provincial court judge authorized to act as two or more justices to do alone anything that the Act authorizes two or more justices to do.",
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "484",
    {
      title: "Preserving order in court",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-484.html`,
      summary:
        "Gives judges and provincial court judges the same power to preserve order in their courtrooms as the superior court of criminal jurisdiction has in that province.",
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "485",
    {
      title: "Procedural irregularities",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-485.html`,
      summary:
        "Provides that jurisdiction over an offence or accused is not lost merely because a court failed to act at a particular time or the accused did not appear personally, and sets out how a summons or warrant can be issued to regain jurisdiction, when proceedings are deemed dismissed for want of prosecution, and how a court may adjourn and make orders if a party was misled or prejudiced.",
      relatedSections: ["482", "482.1", "485.1"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "485.1",
    {
      title: "Recommencement where dismissal for want of prosecution",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-485.1.html`,
      summary:
        "Bars laying a new information or preferring a new indictment for the same transaction after a dismissal for want of prosecution, unless the Attorney General consents in writing or a judge issues a written order permitting it.",
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "485.2",
    {
      title: "Summons — Identification of Criminals Act",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-485.2.html`,
      summary:
        "Lets a justice or judge issue a summons requiring an accused or offender to appear for identification measurements under the Identification of Criminals Act where an earlier required appearance did not result in the measurements being completed for exceptional reasons, and sets out the application process, contents, and service of that summons.",
      relatedSections: ["145", "512.1", "524"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "486",
    {
      title: "Exclusion of public",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-486.html`,
      summary:
        "Requires criminal proceedings to be held in open court but allows a judge or justice to exclude the public or let a witness testify behind a screen where it serves public morals, order, the administration of justice, or protects international relations, national defence, or national security, listing factors to weigh and requiring reasons in certain sexual-offence cases when no order is made.",
      relatedSections: ["151", "152", "153", "153.1", "155", "160"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "486.1",
    {
      title: "Support person or animal — witnesses under 18 or who have a disability",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-486.1.html`,
      summary:
        "Requires a judge or justice, on application, to permit a support person or support animal to be present with a witness under 18, a witness with a disability, or certain victims while they testify, unless it would interfere with justice, and sets out related procedural and evidentiary requirements.",
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "486.2",
    {
      title: "Testimony outside court room — witnesses under 18 or who have a disability",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-486.2.html`,
      summary:
        "Requires a judge or justice, on application, to allow certain witnesses (those under 18, those with disabilities, and victims of specified offences) to testify outside the courtroom or behind a screen so they need not see the accused, subject to conditions ensuring the accused and court can still observe the testimony.",
      relatedSections: ["650"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "486.3",
    {
      title: "Accused not to cross-examine witness under 18",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-486.3.html`,
      summary:
        "Requires a judge or justice, on application, to bar an accused from personally cross-examining a witness under 18 or a victim of specified offences and to appoint counsel to conduct that cross-examination instead, unless the proper administration of justice requires the accused to do it personally.",
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "486.31",
    {
      title: "Non-disclosure of witness’ identity",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-486.31.html`,
      summary:
        "Allows a judge or justice, on application, to order that information identifying a witness not be disclosed during proceedings if doing so is in the interest of the proper administration of justice, and lists factors the judge must weigh in deciding.",
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "486.4",
    {
      title: "Order restricting publication  — sexual offences",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-486.4.html`,
      summary:
        "Allows and, in specified circumstances, requires a judge or justice to order that information identifying a victim or witness not be published, broadcast, or transmitted in proceedings for certain sexual and related offences or where the victim is under 18, and sets out limited exceptions and notification duties.",
      relatedSections: ["151", "152", "153", "153.1", "155", "160"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "486.5",
    {
      title: "Order restricting publication — victims and witnesses",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-486.5.html`,
      summary:
        "Allows a judge or justice to order that information identifying a victim, witness, or justice system participant not be published, broadcast, or transmitted where it is in the interest of the proper administration of justice, sets out the application and hearing process, the factors to be considered, and limited exceptions to the order.",
      relatedSections: ["486.4", "423.1", "467.11", "467.111", "467.12", "467.13"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "486.51",
    {
      title: "Application — vary or revoke",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-486.51.html`,
      summary:
        "Sets out the process for varying or revoking a publication-ban order made under section 486.4 or 486.5, including when the prosecutor must apply on the subject's behalf, when a hearing is required, and that the accused is not given notice or allowed to make submissions.",
      relatedSections: ["486.4", "486.5"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "486.6",
    {
      title: "Offence",
      severity: "Summary",
      maxPenalty: "summary conviction (s. 787 default penalty applies unless otherwise stated)",
      url: `${JUSTICE_LAWS_BASE}/section-486.6.html`,
      summary:
        "Makes it an offence, punishable on summary conviction, to fail to comply with a publication-ban order made under section 486.4 or 486.5, and limits when a prosecutor may pursue such a prosecution.",
      relatedSections: ["486.4", "486.5"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "486.7",
    {
      title: "Security of witnesses",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-486.7.html`,
      summary:
        "Allows a judge or justice to make any order not otherwise available under sections 486 to 486.5 if necessary to protect a witness's security and consistent with the proper administration of justice, and lists the factors to be considered.",
      relatedSections: ["486", "486.5"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "486.71",
    {
      title: "For greater certainty",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-486.71.html`,
      summary:
        "Clarifies that a judge or justice may make more than one order regarding the same witness under sections 486 to 486.5 or 486.7.",
      relatedSections: ["486", "486.5", "486.7"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "487",
    {
      title: "Information for search warrant",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-487.html`,
      summary:
        "Authorizes a justice, on sworn information showing reasonable grounds, to issue a warrant letting a peace or public officer search a building, receptacle, or place for things connected to an offence and seize them, including searching and copying data on a computer system found there, and requires anyone in possession of the premises to permit that computer search.",
      relatedSections: ["489.1"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "487.01",
    {
      title: "Information for general warrant",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-487.01.html`,
      summary:
        "Allows a judge to issue a general warrant authorizing a peace officer to use a device, technique, or procedure that would otherwise be an unreasonable search or seizure, where there are reasonable grounds to believe an offence has been or will be committed and no other warrant provision applies, subject to conditions ensuring reasonableness and privacy protection, including for covert entry and video surveillance.",
      relatedSections: ["183", "183.1", "184.2", "184.3", "185", "188.2"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "487.011",
    {
      title: "Definitions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-487.011.html`,
      summary:
        "Defines terms — including computer data, data, document, judge, public officer, tracking data, and transmission data — used in this section and in sections 487.012 to 487.0199.",
      relatedSections: ["342.1", "487.012", "487.0199"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "487.012",
    {
      title: "Preservation demand",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-487.012.html`,
      summary:
        "Allows a peace or public officer to demand that a person preserve computer data in their possession where there are reasonable grounds to suspect an offence has been or will be committed and the data will assist the investigation, subject to conditions, a time limit, and a bar on repeat demands for the same data.",
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "487.013",
    {
      title: "Preservation order — computer data",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-487.013.html`,
      summary:
        "Allows a justice or judge, on ex parte application, to order a person to preserve computer data in their possession where there are reasonable grounds to suspect an offence and that the officer intends to seek a warrant or order to obtain that data, with the order expiring after 90 days.",
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "487.0131",
    {
      title: "Keep account open or active order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-487.0131.html`,
      summary:
        "Allows a justice or judge, on ex parte application, to order a person to keep a specified account open or active where there are reasonable grounds to suspect an offence and that doing so will assist the investigation, with the order expiring after 60 days but renewable.",
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "487.014",
    {
      title: "General production order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-487.014.html`,
      summary:
        "Allows a justice or judge, on ex parte application, to order a person to produce or prepare a document or data in their possession where there are reasonable grounds to believe it will afford evidence of an offence.",
      relatedSections: ["487.015", "487.018"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "487.0141",
    {
      title: "Production order — specified dates",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-487.0141.html`,
      summary:
        "Allows a justice or judge, on ex parte application, to order a person to produce a document or data that is or was in their possession on specified dates, with limits on the number of dates, frequency of production, and expiry after 60 days, renewable, and provision for producing certain money-laundering reports.",
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "487.015",
    {
      title: "Production order to trace specified communication",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-487.015.html`,
      summary:
        "Allows a justice or judge, on ex parte application, to order a person to prepare and produce transmission data to help identify a device or person involved in transmitting a communication, with rules on service of the order and a report back to the court once the person is identified or the service period expires.",
      relatedSections: ["467.11", "467.12", "467.13"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "487.016",
    {
      title: "Production order — transmission data",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-487.016.html`,
      summary:
        "Allows a justice or judge, on ex parte application, to order a person to prepare and produce transmission data in their possession where there are reasonable grounds to suspect an offence and that the data will assist the investigation.",
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "487.017",
    {
      title: "Production order —  tracking data",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-487.017.html`,
      summary:
        "Allows a justice or judge, on ex parte application, to order a person to prepare and produce tracking data in their possession where there are reasonable grounds to suspect an offence and that the data will assist the investigation.",
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "487.018",
    {
      title: "Production order — financial data",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-487.018.html`,
      summary:
        "Allows a justice or judge, on ex parte application by a peace or public officer, to order a financial institution or similar entity to produce account data such as account numbers, type, status, and open/close dates, and, to confirm identity, a person's date of birth and current or previous addresses. The order requires reasonable grounds to suspect an offence has been or will be committed and that the entity holds data that will assist the investigation, and cannot be made against an institution or entity that is itself under investigation for that offence.",
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "487.019",
    {
      title: "Conditions in preservation and production orders",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-487.019.html`,
      summary:
        "Sets out that an order under sections 487.013 to 487.018 may include conditions the justice or judge considers appropriate, including protecting privileged communications, and that such an order has effect throughout Canada. It also allows the justice or judge who made the order, or a judge in that judicial district, to revoke or vary it on ex parte application, with notice given to the person subject to the order.",
      relatedSections: ["487.013", "487.014", "487.0141", "487.018"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "487.0191",
    {
      title: "Order prohibiting disclosure",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-487.0191.html`,
      summary:
        "Allows a justice or judge, on ex parte application, to order a person not to disclose the existence or contents of a preservation demand or production order for a set period, if satisfied there are reasonable grounds to believe disclosure would jeopardize the investigation. It also allows the affected peace officer, public officer, person, institution, or entity to apply in writing to revoke or vary the order.",
      relatedSections: ["487.012", "487.013", "487.018"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "487.0192",
    {
      title: "Particulars — production orders",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-487.0192.html`,
      summary:
        "Specifies procedural requirements for production orders, including that documents be produced to a named officer within a specified time, place, and form, and that certain sections do not apply to documents produced under these orders. It also provides that copies of documents produced under section 487.014 or 487.0141 are admissible as evidence, on proof by affidavit that they are true copies, with the same probative force as the originals, and that prepared documents are considered originals under the Canada Evidence Act.",
      relatedSections: ["487.014", "487.0141", "487.015", "487.018", "489.1", "490"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "487.01921",
    {
      title: "Application for review of keep account open or active order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-487.01921.html`,
      summary:
        "Allows a person who is subject to a keep-account-open-or-active order to apply in writing to have it revoked or varied, provided they give at least three days' notice and continue complying until a decision is made. The hearing must begin within 14 days, or as soon as practicable after that period, and the judge may revoke or vary the order if satisfied it is unreasonable to require the account be kept open or active.",
      relatedSections: ["487.0131"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "487.0193",
    {
      title: "Application for review of production order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-487.0193.html`,
      summary:
        "Allows a person, financial institution, or entity subject to a production order to apply in writing before complying to have the order revoked or varied, provided notice is given within 30 days, and they are not required to produce the document until a final decision is made. The order may be revoked or varied if compliance is unreasonable or would disclose privileged or legally protected information.",
      relatedSections: ["487.014", "487.018"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "487.0194",
    {
      title: "Destruction of preserved computer data and documents — preservation demand",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-487.0194.html`,
      summary:
        "Requires a person to destroy computer data that would not be retained in the ordinary course of business, and any document prepared to preserve it, once a preservation demand or preservation order expires or is revoked (unless subject to a further order), or, for a production order, once it is revoked or the data is produced, whichever is earlier. It also requires destruction of that preserved data when a document containing it is instead obtained under a warrant.",
      relatedSections: ["487.012", "487.013", "487.014", "487.017"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "487.0195",
    {
      title: "For greater certainty",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-487.0195.html`,
      summary:
        "Clarifies that no preservation demand, preservation order, keep-account-open-or-active order, or production order is required for a peace or public officer to ask a person to voluntarily preserve data, keep an account open or active, or provide a document that the person is not otherwise prohibited from disclosing. It also states that a person who complies voluntarily in these circumstances incurs no criminal or civil liability.",
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "487.0196",
    {
      title: "Self-incrimination",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-487.0196.html`,
      summary:
        "States that a person cannot refuse to comply with a production order on the ground that the document might incriminate them, but prohibits using a document an individual was required to prepare against them in a later criminal proceeding, except for prosecutions under sections 132, 136, or 137.",
      relatedSections: ["487.014", "487.018", "132", "136", "137"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "487.0197",
    {
      title: "Offence — preservation demand",
      severity: "Summary",
      maxPenalty: "Fine of not more than $5,000",
      url: `${JUSTICE_LAWS_BASE}/section-487.0197.html`,
      summary:
        "Makes it an offence for a person to contravene a preservation demand made under section 487.012 without lawful excuse, punishable on summary conviction.",
      relatedSections: ["487.012"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "487.0198",
    {
      title: "Offence — preservation or production order",
      severity: "Summary",
      maxPenalty: "Fine of not more than $250,000, imprisonment for not more than two years less a day, or both",
      url: `${JUSTICE_LAWS_BASE}/section-487.0198.html`,
      summary:
        "Makes it an offence for a person, financial institution, or entity to contravene a preservation or production order made under sections 487.013 to 487.018 without lawful excuse.",
      relatedSections: ["487.013", "487.018"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "487.0199",
    {
      title: "Offence — destruction of preserved data",
      severity: "Summary",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-487.0199.html`,
      summary:
        "Makes it an offence, punishable on summary conviction, for a person to contravene section 487.0194 (the duty to destroy preserved data) without lawful excuse.",
      relatedSections: ["487.0194"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "487.02",
    {
      title: "Assistance order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-487.02.html`,
      summary:
        "Allows the judge or justice who grants certain interception authorizations or issues a warrant to also order a person to provide assistance reasonably required to give effect to it, with the order taking effect throughout Canada. If the authorization or warrant is issued by telecommunication, the assistance order may also be issued that way, subject to the applicable section.",
      relatedSections: ["184.2", "186", "188", "184.3", "487.1"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "487.021",
    {
      title: "Review",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-487.021.html`,
      summary:
        "Requires a House of Commons committee to undertake a comprehensive review of the provisions and operation of sections 487.011 to 487.02 within seven years of this section coming into force, and to submit a report with any recommended changes within a year of that review.",
      relatedSections: ["487.011", "487.02"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "487.04",
    {
      title: "Definitions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-487.04.html`,
      summary:
        "Defines terms used in this section and sections 487.05 to 487.0911, including adult, designated offence, DNA, forensic DNA analysis, primary designated offence, provincial court judge, secondary designated offence, Young Offenders Act, and young person, and lists the specific offences that qualify as primary or secondary designated offences.",
      relatedSections: ["487.05", "487.051", "487.055", "487.091", "487.0911"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "487.05",
    {
      title: "Information for warrant to take bodily substances for forensic DNA analysis",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-487.05.html`,
      summary:
        "Allows a provincial court judge to issue a warrant authorizing the taking of bodily substance samples for forensic DNA analysis from a person, on ex parte application, if satisfied there are reasonable grounds to believe a designated offence was committed, a bodily substance was found connected to the offence, the person was a party to it, and DNA analysis would show whether the substance came from that person. The judge must also consider factors such as the nature of the offence and whether a qualified person is available to take the samples, and the warrant may be executed anywhere in Canada by an authorized peace officer.",
      relatedSections: ["487.06"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "487.051",
    {
      title: "Order — primary designated offences",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-487.051.html`,
      summary:
        "Requires or allows a court to order the taking of bodily substance samples for DNA analysis from a person convicted, discharged, or found guilty of certain designated offences, with the requirement varying by offence category and being discretionary for persons found not criminally responsible or for secondary designated offences. In some cases the court must consider factors such as the person's criminal record and the impact on their privacy before deciding, and may also order the person to report to submit to sample collection.",
      relatedSections: ["487.04", "730"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "487.053",
    {
      title: "Timing of order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-487.053.html`,
      summary:
        "Allows the court to order the taking of bodily substance samples at the time of sentencing, a finding of not criminally responsible, or a discharge, or, if not addressed then, requires the court to set a hearing date within 90 days while retaining jurisdiction over the matter. The court may also require the person to appear by closed-circuit television or videoconference, with the opportunity to consult privately with counsel.",
      relatedSections: ["487.051", "730"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "487.054",
    {
      title: "Appeal",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-487.054.html`,
      summary:
        "Allows the offender or the prosecutor to appeal a court's decision made under subsections 487.051(1) to (3).",
      relatedSections: ["487.051"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "487.055",
    {
      title: "Offenders serving sentences",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-487.055.html`,
      summary:
        "Allows a provincial court judge to authorize, on ex parte application, the taking of bodily substance samples for DNA analysis from certain persons declared dangerous offenders, convicted of murder, attempted murder, manslaughter, or specified sexual offences before June 30, 2000, and sets out the certificate, hearing, appearance, and notice or summons procedures involved. It also defines \"sexual offence\" for this purpose and describes how a summons must be served if the person is on conditional release and does not appear.",
      relatedSections: ["667", "348", "487.06", "487.07"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "487.0551",
    {
      title: "Failure to appear",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-487.0551.html`,
      summary:
        "Allows a justice of the peace to issue an arrest warrant if a person fails to appear as required by certain orders or summonses to provide bodily substance samples, and the warrant may be executed anywhere in Canada by a peace officer with jurisdiction over the person or place, remaining in force until executed.",
      relatedSections: ["487.051", "487.055", "487.091"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "487.0552",
    {
      title: "Failure to comply with order or summons",
      severity: "Hybrid",
      maxPenalty: "Indictable offence: imprisonment for not more than two years; or an offence punishable on summary conviction",
      url: `${JUSTICE_LAWS_BASE}/section-487.0552.html`,
      summary:
        "Makes it an offence, prosecutable either as an indictable offence or by summary conviction, for a person without reasonable excuse to fail to comply with certain orders or summonses to provide bodily substance samples. It also clarifies that a lawful military command preventing compliance counts as a reasonable excuse for a person subject to the Code of Service Discipline.",
      relatedSections: ["487.051", "487.055", "487.091"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "487.056",
    {
      title: "When collection to take place",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-487.056.html`,
      summary:
        "Sets out when bodily substance samples must be taken under various orders, authorizations, or summonses, generally at the specified place, day, and time or as soon as feasible afterward, including after an arrest warrant is executed for failing to appear. It also allows samples to be taken anywhere in Canada by an authorized peace officer or someone acting under their direction, and provides that these timing rules apply even if the order is under appeal.",
      relatedSections: ["487.051", "487.055", "487.091", "487.0551"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "487.057",
    {
      title: "Report of peace officer",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-487.057.html`,
      summary:
        "Requires a peace officer who takes or directs the taking of bodily substance samples to file a written report with the relevant judge or court as soon as feasible, stating the time, date, and description of the samples taken, and to send a copy to another requesting peace officer if applicable.",
      relatedSections: ["487.05", "487.055", "487.091", "487.051"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "487.058",
    {
      title: "No criminal or civil liability",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-487.058.html`,
      summary:
        "States that no peace officer, or person acting under a peace officer's direction, incurs criminal or civil liability for anything necessarily done with reasonable care and skill while taking bodily substance samples under an applicable warrant, order, or authorization.",
      relatedSections: ["487.05", "487.051", "487.055", "487.091"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "487.06",
    {
      title: "Investigative procedures",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-487.06.html`,
      summary:
        "Authorizes a peace officer or person acting under their direction to take bodily substance samples by plucking hairs, taking buccal swabs, or pricking the skin for blood, under an applicable warrant, order, or authorization, which may include terms and conditions to ensure the process is reasonable. It also allows fingerprints to be taken from the person for purposes of the DNA Identification Act.",
      relatedSections: ["487.05", "487.051", "487.055", "487.091"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "487.07",
    {
      title: "Duty to inform",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-487.07.html`,
      summary:
        "Requires a peace officer, before taking bodily substance samples under certain orders or authorizations, to inform the person of the contents of the warrant, order, or authorization, the procedures to be used, the purpose, the authority to use necessary force, and, for warrant-based samples, that DNA results may be used in evidence and the rights of a young person. It also allows detention for a period that is reasonable in the circumstances, requires privacy be respected, and sets out a young person's right to consult counsel and have the warrant executed in the presence of counsel and a parent, adult relative, or other appropriate adult, along with how those rights may be waived.",
      relatedSections: ["487.05", "487.051", "487.055", "487.091"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "487.071",
    {
      title: "Verification",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-487.071.html`,
      summary:
        "Requires a peace officer, before taking bodily substance samples under certain orders or authorizations, to check whether the person's DNA profile is already in the national DNA data bank's convicted offenders index. If it is, no sample may be taken and written confirmation must be sent to the RCMP Commissioner; if not, the order is executed and the samples and related information are transmitted to the Commissioner.",
      relatedSections: ["487.051", "487.055", "487.091"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "487.08",
    {
      title: "Use of bodily substances — warrant",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-487.08.html`,
      summary:
        "Restricts the use of bodily substances and DNA analysis results obtained under warrants, orders, or authorizations to specific purposes, such as forensic analysis for designated offence investigations, transmission to the RCMP Commissioner, or use in related proceedings. Contravening these restrictions is an offence — punishable on summary conviction for use of warrant-based substances or results, or, for order- or authorization-based substances, either as an indictable offence or on summary conviction.",
      relatedSections: ["487.05", "487.051", "487.055", "487.091"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "487.09",
    {
      title: "Destruction of bodily substances, etc. — warrant",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-487.09.html`,
      summary:
        "Requires bodily substances and DNA analysis results obtained under a warrant, or provided voluntarily, to be destroyed or have electronic access permanently removed without delay in specified circumstances, such as acquittal, a finding the substance did not match, or after set time limits following discharge, dismissal, or a stay of proceedings. A provincial court judge may order that destruction be delayed if the substances or results might reasonably be needed for another investigation or prosecution.",
      relatedSections: ["487.05", "579", "572", "795"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "487.091",
    {
      title: "Collection of additional bodily substances",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-487.091.html`,
      summary:
        "Allows a provincial court judge, on ex parte application, to authorize taking additional bodily substance samples from a person if a DNA profile could not be derived from earlier samples or required information was not properly transmitted or was lost, and requires the application to state the reasons for this. If the person is not in custody, a summons must direct them to report and submit to sample collection, applying related service provisions with necessary modifications.",
      relatedSections: ["487.051", "487.055", "487.06", "487.07"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "487.0911",
    {
      title: "Review by Attorney General",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-487.0911.html`,
      summary:
        "Requires the Attorney General, on notice from the RCMP Commissioner that an order or authorization appears defective, to review the order and court record. Depending on the nature of the defect, the Attorney General must apply to correct a clerical error and notify the Commissioner, or inform the Commissioner whether the offence referenced is or is not a designated offence.",
      relatedSections: ["487.051", "487.091"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "487.092",
    {
      title: "Information for impression warrant",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-487.092.html`,
      summary:
        "Allows a justice to issue a warrant authorizing a peace officer to obtain handprints, fingerprints, footprints, or other body impressions from a person, if satisfied there are reasonable grounds an offence was committed, the print will provide relevant information, and issuing the warrant is in the best interests of the administration of justice. Sets conditions requiring the warrant to be reasonable and specifies it can be executed anywhere in Canada by an officer with authority to act there.",
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "487.093",
    {
      title: "Duty of person executing certain warrants",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-487.093.html`,
      summary:
        "Requires a person executing certain listed warrants to give a copy of the warrant and a notice with court information to whoever is present and in control of the place searched, to post it at the location if no one is present, or to give it to the person searched. This duty does not apply where the warrant authorizes search of something already lawfully seized and detained.",
      relatedSections: ["110.1", "117.0101", "117.04", "199", "395", "487"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "487.1",
    {
      title: "Warrants, etc., by telecommunication",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-487.1.html`,
      summary:
        "Allows the Attorney General, a peace officer, or a public officer to submit applications for a range of listed warrants, orders, and authorizations by telecommunication, and sets out procedures for oaths, certification by the judicial officer, and the conditions under which a means of telecommunication that does not produce a writing may be used. Defines \"judicial officer\" and \"public officer\" for the section.",
      relatedSections: ["83.222", "83.223", "110.1", "117.0101", "117.04", "164"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "487.11",
    {
      title: "Where warrant not necessary",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-487.11.html`,
      summary:
        "Allows a peace officer or authorized public officer to exercise search or seizure powers described in section 487(1) or 492.1(1) without a warrant if the conditions for a warrant exist but exigent circumstances make it impracticable to obtain one.",
      relatedSections: ["487", "492.1"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "487.2",
    {
      title: "Restriction on publication",
      severity: "Summary",
      maxPenalty: "summary conviction (s. 787 default penalty applies unless otherwise stated)",
      url: `${JUSTICE_LAWS_BASE}/section-487.2.html`,
      summary:
        "Makes it an offence, punishable on summary conviction, to publish or broadcast the location of a place searched under a section 487 warrant, or the identity of a person who occupies or is suspected of involvement at that place, without their consent, unless a charge has been laid in relation to the warrant.",
      relatedSections: ["487"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "487.3",
    {
      title: "Order denying access to information",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-487.3.html`,
      summary:
        "Allows a justice or judge to order that information relating to a warrant, order, or authorization not be disclosed, where disclosure would subvert the ends of justice or be used improperly and this outweighs the public interest in access. Sets out the grounds for such orders, the procedure for sealing related documents, and how to apply to vary or terminate the order.",
      relatedSections: ["529", "529.4", "487.013", "487.014", "487.015", "487.016"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "488",
    {
      title: "Execution of search warrant",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-488.html`,
      summary:
        "Requires a search warrant issued under section 487 to be executed during the day, unless the justice is satisfied there are reasonable grounds for night execution, those grounds are included in the information, and the warrant specifically authorizes night execution.",
      relatedSections: ["487"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "488.01",
    {
      title: "Definitions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-488.01.html`,
      summary:
        "Defines terms used in this section and section 488.02, and requires that applications for certain warrants, authorizations, or orders relating to a journalist's communications or materials be made to a superior court judge with exclusive jurisdiction, who may issue them only if satisfied there is no other reasonable way to get the information and the public interest outweighs the journalist's privacy interest. Sets out special advocate involvement, exceptions where the application concerns an offence by the journalist, permissible conditions, and the process for an officer who discovers mid-execution that a warrant relates to a journalist.",
      relatedSections: ["487", "487.01", "492.1", "492.2", "184.2", "488.02"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "488.02",
    {
      title: "Documents",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-488.02.html`,
      summary:
        "Requires documents obtained under a warrant, authorization, or order covered by section 488.01 to be sealed and kept by the court, and sets out the process by which a journalist or media outlet can apply to prevent disclosure of a document on the ground it would identify a journalistic source. A judge may examine the document and order it either returned undisclosed or delivered to the officer, depending on whether disclosure is justified.",
      relatedSections: ["488.01"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "488.1",
    {
      title: "Definitions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-488.1.html`,
      summary:
        "Defines terms used in the section and sets out the procedure when an officer seeks to examine, copy, or seize a document held by a lawyer over which solicitor-client privilege is claimed: the document is sealed and placed with a custodian, and the client, lawyer, or Attorney General may apply to a judge to determine whether it should be disclosed. Describes the judge's process for inspecting the document, hearing representations, and ordering it either returned to the lawyer/client or delivered to the officer, and states the section does not apply to privilege claims under certain other Acts.",
      relatedSections: ["321"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "489",
    {
      title: "Seizure of things not specified",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-489.html`,
      summary:
        "Allows a person executing a warrant, or a peace officer or authorized public officer lawfully present in a place, to seize anything beyond what is listed in the warrant, or without a warrant, if they believe on reasonable grounds it was obtained by, used in, or will provide evidence of an offence.",
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "489.1",
    {
      title: "Restitution of thing or report",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-489.1.html`,
      summary:
        "Requires a peace officer, or other person, who has seized something under a warrant or during their duties to either return it to the lawful possessor and report to a justice, or bring it before a justice or report the seizure, depending on whether there is a dispute over ownership or a continuing need to detain it. Sets out the required report form and excludes computer data other than virtual currency or other digital assets from the section.",
      relatedSections: ["487.11", "489", "490", "342.1"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490",
    {
      title: "Detention of things seized",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.html`,
      summary:
        "Sets out what a justice does when seized property is brought before them or reported: return it to the known lawful owner unless continued detention is justified for an investigation or proceeding, or otherwise order it detained. Establishes time limits on detention (180 days, then up to one year, and beyond with further orders), the process for further detention applications, disposal of the property (including forfeiture), access to detained items, and the right to appeal detention-related orders.",
      relatedSections: ["489.1", "552", "673", "812", "678", "813"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.01",
    {
      title: "Perishable things",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.01.html`,
      summary:
        "Allows a person who seized a perishable or rapidly depreciating item to return it to its lawful owner, or, with a justice's authorization on an ex parte application, to dispose of it and give the proceeds to the lawful owner if they were not a party to the offence (or forfeit the proceeds to the Crown if the lawful owner's identity cannot be reasonably ascertained), or to destroy it.",
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.011",
    {
      title: "Definitions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.011.html`,
      summary:
        "Defines terms used in this section and sections 490.012 to 490.07, including \"primary offence\" and \"secondary offence\" by listing specific Criminal Code provisions (current and historical) that qualify, and terms related to sex offender registration such as \"database,\" \"pardon,\" and \"record suspension.\" Clarifies that a young person is not treated as convicted of a designated offence for these purposes unless given an adult sentence or convicted in ordinary court, as applicable.",
      relatedSections: ["151", "152", "153", "153.1", "155", "160"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.012",
    {
      title: "Order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.012.html`,
      summary:
        "Requires a court to order a person to comply with the Sex Offender Information Registration Act after sentencing for a designated offence in specified circumstances, including certain indictable offences with a two-year-plus sentence against a victim under 18, prior related convictions or obligations, or other cases unless the person establishes the order would have no connection to preventing sexual crimes or would be grossly disproportionate. Lists factors the court considers and limits orders for secondary offences to cases where intent to commit a primary offence is proven beyond a reasonable doubt.",
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.013",
    {
      title: "Date order begins",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.013.html`,
      summary:
        "Sets out when an order made under section 490.012 begins and how long it lasts, based on whether the offence was prosecuted summarily, its maximum term of imprisonment, or whether multiple designated offences or prior related convictions or obligations are involved. Certain circumstances make the order apply for life.",
      relatedSections: ["490.012"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.0131",
    {
      title: "Reasons",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.0131.html`,
      summary:
        "Requires the court to state the designated offence and the term of imprisonment imposed that form the basis of an order made under section 490.012(1), and to give reasons for decisions made under section 490.012(3) or paragraph 490.013(3)(b).",
      relatedSections: ["490.012", "490.013"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.0132",
    {
      title: "Failure to make order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.0132.html`,
      summary:
        "Requires a court that does not deal with the section 490.012 order at the time of sentencing or verdict to set a hearing date within 90 days, retain jurisdiction over the matter, and allows the person to appear by videoconference with an opportunity to consult counsel privately, and permits issuing a summons to compel attendance.",
      relatedSections: ["490.012"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.014",
    {
      title: "Appeal",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.014.html`,
      summary:
        "Allows the prosecutor or a person subject to an order made under section 490.012 to appeal a decision made under section 490.012 or 490.013 on a question of law or mixed law and fact, and the appeal court may dismiss the appeal or allow it and order a new hearing, quash or amend the order, or make an order under section 490.012.",
      relatedSections: ["490.012", "490.013"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.015",
    {
      title: "Application for termination order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.015.html`,
      summary:
        "Sets out when a person subject to an order may apply for a termination order, based on how much time has elapsed since the order was made or upon receiving a pardon, record suspension, or absolute discharge. Describes the scope of such applications, conditions for re-applying after a refusal, and which court has jurisdiction to hear the application.",
      relatedSections: ["490.013", "490.012", "672.54", "490.019", "490.02901"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.016",
    {
      title: "Termination order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.016.html`,
      summary:
        "Requires a court to make a termination order if the person establishes that continuing the order or obligation has no connection to preventing sexual crimes through offender registration or that its impact would be grossly disproportionate to the public interest, and lists factors the court must consider. Requires the court to give reasons and to notify the RCMP Commissioner and the relevant Attorney General or territorial minister of justice of the decision.",
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.017",
    {
      title: "Appeal",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.017.html`,
      summary:
        "Allows the prosecutor or the applicant to appeal a decision on a termination order on a question of law or mixed law and fact, and sets out what the appeal court may do. If the appeal court makes such an order, it must ensure the RCMP Commissioner and the relevant Attorney General or minister of justice are notified.",
      relatedSections: ["490.016"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.018",
    {
      title: "Requirements relating to notice",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.018.html`,
      summary:
        "Sets out the notice steps a court must follow when it makes an order under section 490.012, including having the order read to and given to the person, informing them of related provisions, and sending copies to specified officials and institutions. Also addresses endorsement of the order, notice by a Review Board on discharge, and timing of notice before release.",
      relatedSections: ["490.012", "490.031", "490.0311", "672.54"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.019",
    {
      title: "Obligation to comply",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.019.html`,
      summary:
        "Requires a person served with a notice in Form 53 to comply with the Sex Offender Information Registration Act for the period set out in section 490.022, unless a court grants an exemption order.",
      relatedSections: ["490.022", "490.023"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.02",
    {
      title: "Persons who may be served",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.02.html`,
      summary:
        "Sets out who may be served with a notice under this scheme, based on conviction or NCR findings for specified designated offences and status at the time the Sex Offender Information Registration Act came into force, and lists exceptions where a notice cannot be served.",
      relatedSections: ["490.011", "490.021", "490.012", "748"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.021",
    {
      title: "Period for and method of service",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.021.html`,
      summary:
        "Sets out the time limits and methods, including personal service and registered mail in specified circumstances, for serving a notice, and how service can be proven by affidavit and reported to the relevant Attorney General or minister of justice.",
      relatedSections: ["490.02"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.022",
    {
      title: "Date obligation begins",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.022.html`,
      summary:
        "Sets out when the obligation under section 490.019 begins and ends, including the specific durations (10 years, 20 years, or life) that apply depending on how the underlying offence was prosecuted or its maximum penalty, and rules for multiple offences.",
      relatedSections: ["490.019", "490.023", "490.02", "490.011"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.023",
    {
      title: "Application for exemption order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.023.html`,
      summary:
        "Allows a person to apply for an order exempting them from the registration obligation within one year of being served notice, sets out which court has jurisdiction, and requires the court to grant the exemption if the obligation's impact would be grossly disproportionate to the public interest, with reasons given and database information removed if granted.",
      relatedSections: ["490.012", "490.021", "490.019"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.024",
    {
      title: "Appeal",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.024.html`,
      summary:
        "Allows the Attorney General or the applicant to appeal a decision on an exemption order on a question of law or mixed law and fact, and requires removal of database information if the appeal court makes an exemption order.",
      relatedSections: ["490.023"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.025",
    {
      title: "Requirements relating to notice",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.025.html`,
      summary:
        "Requires that if a court refuses to make an exemption order, or an appeal court dismisses the appeal or quashes the order, the RCMP Commissioner and relevant Attorney General or minister of justice be notified, and the applicant be informed of related provisions.",
      relatedSections: ["490.031", "490.0311"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.026",
    {
      title: "Application for termination order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.026.html`,
      summary:
        "Allows a person subject to the registration obligation to apply for a termination order, sets out the waiting periods before applying based on the offence's prosecution mode or maximum penalty, rules for multiple offences, early eligibility on a pardon, record suspension or absolute discharge, re-application limits, and which court has jurisdiction.",
      relatedSections: ["490.019", "490.02901", "490.012", "672.54"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.027",
    {
      title: "Termination order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.027.html`,
      summary:
        "Requires a court to terminate the registration obligation if satisfied that continuing it has no connection to preventing or investigating sexual offences or would be grossly disproportionate to the public interest, and lists factors the court must consider, plus notice and reasons requirements.",
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.028",
    {
      title: "Deemed application",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.028.html`,
      summary:
        "Provides that where a person is eligible to apply for both an exemption order and a termination order within the same one-year window, an application for one is deemed to be an application for both.",
      relatedSections: ["490.023", "490.026", "490.021"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.029",
    {
      title: "Appeal",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.029.html`,
      summary:
        "Allows the Attorney General or the applicant to appeal a decision on a termination order on a question of law or mixed law and fact, and requires notice to the RCMP Commissioner and relevant Attorney General or minister of justice if the appeal court makes such an order.",
      relatedSections: ["490.027"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.02901",
    {
      title: "Obligation",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.02901.html`,
      summary:
        "Requires a person served with a notice in Form 54 to comply with the Sex Offender Information Registration Act for the period set out in section 490.02904, unless a court makes an exemption order.",
      relatedSections: ["490.02904", "490.02905"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.02902",
    {
      title: "Persons who may be served",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.02902.html`,
      summary:
        "Sets out who may be served with a notice in Form 54, based on arriving in Canada on or after April 15, 2011 and being convicted or found NCR for a foreign offence equivalent to a primary offence, and provides an exception for persons acquitted of the relevant offence.",
      relatedSections: ["490.011", "490.02903"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.02903",
    {
      title: "Period for and method of service",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.02903.html`,
      summary:
        "Requires a notice in Form 54 to be personally served, and sets out how service is proven by affidavit and reported to the relevant Attorney General or minister of justice.",
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.02904",
    {
      title: "When obligation begins",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.02904.html`,
      summary:
        "Sets out when the obligation under section 490.02901 begins and ends, including durations of 10 years, 20 years, or life depending on the equivalent offence's maximum penalty in Canadian law, and rules for multiple equivalent offences.",
      relatedSections: ["490.02901"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.02905",
    {
      title: "Application for exemption order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.02905.html`,
      summary:
        "Allows a person served with a Form 54 notice to apply for an exemption order within one year, sets out the grounds on which the court must grant it, factors the court must consider, provisions for correcting the notice instead, and requirements for reasons, database removal, and notification.",
      relatedSections: ["490.02903", "490.011"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.029051",
    {
      title: "Application for variation order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.029051.html`,
      summary:
        "Allows a person subject to a lifetime obligation under Form 54 to apply for a variation order where none of the listed offences have a Canadian equivalent carrying a life sentence, and requires the court to grant the order if satisfied the offences don't show a pattern indicating increased reoffending risk, setting the varied duration and giving reasons.",
      relatedSections: ["490.02903", "490.02904"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.02906",
    {
      title: "Appeal",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.02906.html`,
      summary:
        "Allows the Attorney General or the applicant to appeal a decision on an exemption or variation order under the Form 54 scheme, and requires database removal if the appeal court makes an exemption order.",
      relatedSections: ["490.02905", "490.029051"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.02907",
    {
      title: "Requirements relating to notice",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.02907.html`,
      summary:
        "Requires notice to the RCMP Commissioner and relevant Attorney General or minister of justice if an appeal court quashes an exemption order or a variation order under the Form 54 scheme; if the exemption order is quashed, the applicant must also be informed of related provisions.",
      relatedSections: ["490.031", "490.0311"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.02908",
    {
      title: "Application for termination order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.02908.html`,
      summary:
        "Allows a person subject to the Form 54 obligation to apply for a termination order, sets out waiting periods based on the equivalent offence's maximum penalty, rules for multiple offences, and re-application limits.",
      relatedSections: ["490.02901", "490.019", "490.012", "490.02903"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.02909",
    {
      title: "Termination order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.02909.html`,
      summary:
        "Requires a court to terminate the Form 54 registration obligation if satisfied that continuing it has no connection to preventing or investigating sexual offences or would be grossly disproportionate to the public interest, listing factors to consider and requiring reasons and notification.",
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.0291",
    {
      title: "Appeal",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.0291.html`,
      summary:
        "Allows the Attorney General or the applicant to appeal a decision on a termination order under the Form 54 scheme, and requires notification of the RCMP Commissioner and relevant Attorney General or minister of justice if the appeal court makes such an order.",
      relatedSections: ["490.02909"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.02911",
    {
      title: "Obligation to advise police service",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.02911.html`,
      summary:
        "Requires a person convicted outside Canada of an offence equivalent to a primary offence to advise a police service within seven days of arriving in Canada, providing specified personal and offence details, and to report any later change of address, with the obligation to report address changes ending on service under section 490.02902 or after one year.",
      relatedSections: ["490.011", "490.02902"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.029111",
    {
      title: "Application for exemption order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.029111.html`,
      summary:
        "Allows a person subject to an obligation under the International Transfer of Offenders Act to apply for an exemption order within one year of transfer to Canada, requires the court to grant it on specified grounds, lists factors to consider, and requires reasons and database removal if granted.",
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.029112",
    {
      title: "Application for variation order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.029112.html`,
      summary:
        "Allows a person subject to a lifetime obligation under the International Transfer of Offenders Act to apply for a variation order where no listed offence has a Canadian equivalent carrying a life sentence, and requires the court to grant it if satisfied there is no pattern showing increased reoffending risk, setting the varied duration and giving reasons and notification.",
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.029113",
    {
      title: "Appeal",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.029113.html`,
      summary:
        "Allows the Attorney General or the applicant to appeal a decision on an exemption or variation order made under the International Transfer of Offenders Act provisions, and requires database removal if the appeal court makes an exemption order.",
      relatedSections: ["490.029111", "490.029112"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.029114",
    {
      title: "Requirements relating to notice",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.029114.html`,
      summary:
        "Requires notice to the RCMP Commissioner and relevant Attorney General or minister of justice if an appeal court quashes an exemption order or a variation order under the International Transfer of Offenders Act provisions; if the exemption order is quashed, the applicant must also be informed of related provisions.",
      relatedSections: ["490.031", "490.0311"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.02912",
    {
      title: "Application for termination order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.02912.html`,
      summary:
        "Allows a person subject to the International Transfer of Offenders Act obligation to apply for a termination order, sets out waiting periods based on the equivalent offence's maximum penalty, rules for multiple offences, early eligibility on absolute discharge, and re-application limits.",
      relatedSections: ["490.019", "490.02901", "490.012", "672.54"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.02913",
    {
      title: "Termination order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.02913.html`,
      summary:
        "Requires a court to terminate the International Transfer of Offenders Act registration obligation if satisfied that continuing it has no connection to preventing or investigating sexual offences or would be grossly disproportionate to the public interest, listing factors to consider and requiring reasons and notification.",
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.02914",
    {
      title: "Appeal",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.02914.html`,
      summary:
        "Allows the Attorney General or the applicant to appeal a decision on a termination order made under the International Transfer of Offenders Act provisions, and requires notification of the RCMP Commissioner and relevant Attorney General or minister of justice if the appeal court makes such an order.",
      relatedSections: ["490.02913"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.02915",
    {
      title: "Notice before release",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.02915.html`,
      summary:
        "Requires the person in charge of custody to give a person subject to an International Transfer of Offenders Act obligation a copy of the relevant Form 1 no earlier than 10 days before release, and requires a Review Board to provide the form on an absolute discharge or, unless the conditions prevent compliance, a conditional discharge.",
      relatedSections: ["490.02912", "672.54"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.03",
    {
      title: "Disclosure",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.03.html`,
      summary:
        "Requires the RCMP Commissioner or an authorized person to disclose database information to a prosecutor or Attorney General when necessary for specified proceedings, sets out related disclosure rules, and allows disclosure to the presiding court where relevant.",
      relatedSections: ["490.012", "490.016", "490.023", "490.027", "490.02905", "490.029051"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.031",
    {
      title: "Offence",
      severity: "Hybrid",
      maxPenalty: "On indictment: fine of not more than $10,000 or imprisonment for not more than two years, or both. On summary conviction: fine of not more than $10,000 or imprisonment for not more than two years less a day, or both.",
      url: `${JUSTICE_LAWS_BASE}/section-490.031.html`,
      summary:
        "Makes it an offence to fail, without reasonable excuse, to comply with an order or obligation to register under the Sex Offender Information Registration Act scheme, and sets out fine and imprisonment penalties on indictment or summary conviction, what counts as a reasonable excuse for military personnel, and rules for proving non-compliance by certificate.",
      relatedSections: ["490.012", "490.019", "490.02901"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.0311",
    {
      title: "Offence",
      severity: "Hybrid",
      maxPenalty: "On indictment: fine of not more than $10,000 or imprisonment for not more than two years, or both. On summary conviction: fine of not more than $10,000 or imprisonment for not more than two years less a day, or both.",
      url: `${JUSTICE_LAWS_BASE}/section-490.0311.html`,
      summary:
        "Makes it an offence to knowingly provide false or misleading information when reporting or providing information under the Sex Offender Information Registration Act, punishable by fine, imprisonment, or both on indictment or summary conviction.",
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.0312",
    {
      title: "Offence",
      severity: "Summary",
      maxPenalty: "Punishable on summary conviction.",
      url: `${JUSTICE_LAWS_BASE}/section-490.0312.html`,
      summary:
        "Makes it an offence, without reasonable excuse, to fail to comply with the obligation to advise police of a foreign conviction or address change under subsection 490.02911(1) or (2), punishable on summary conviction.",
      relatedSections: ["490.02911"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.03121",
    {
      title: "Warrant to arrest",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.03121.html`,
      summary:
        "Allows a justice, on reasonable grounds a person has contravened specified reporting provisions of the Sex Offender Information Registration Act, to issue a warrant authorizing a peace officer to arrest the person and bring them to a registration centre, sets conditions on the warrant, allows execution anywhere in Canada, states when it stays in force, and bars laying a charge if the contravention is remedied after the warrant issues.",
      relatedSections: ["490.031"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.032",
    {
      title: "Regulations",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.032.html`,
      summary:
        "Allows the Governor in Council to make regulations requiring additional information in a Form 53 or Form 54 notice and prescribing its form and content for one or more provinces.",
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.04",
    {
      title: "Application for exemption order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.04.html`,
      summary:
        "Allows a person to apply for an order exempting them from certain pre-existing orders or obligations, sets out limits on who may apply and when an exemption cannot be granted, the grounds and factors for granting an exemption, and requires reasons and database removal if granted.",
      relatedSections: ["490.012", "490.02901", "490.02905", "490.029111"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.05",
    {
      title: "Application for variation order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.05.html`,
      summary:
        "Allows a person to apply to vary the duration of a lifetime order or obligation under specified provisions where certain conditions are met, sets limits on applying, requires the court to grant the variation if satisfied the offences don't show a pattern of increased reoffending risk, and sets how the varied duration is determined, with reasons and notification required.",
      relatedSections: ["490.012", "490.013", "490.019", "490.022", "490.02901", "490.02904"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.06",
    {
      title: "Appeal",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.06.html`,
      summary:
        "Allows the Attorney General or the applicant to appeal a decision on an exemption or variation order made under sections 490.04 or 490.05, and requires database removal if the appeal court makes an exemption order.",
      relatedSections: ["490.04", "490.05", "490.012", "490.02901"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.07",
    {
      title: "Requirements relating to notice",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.07.html`,
      summary:
        "Requires notice to the RCMP Commissioner and relevant Attorney General or minister of justice if an appeal court quashes an exemption order or a variation order made under sections 490.04 or 490.05; if the exemption order is quashed, the applicant must also be informed of related provisions.",
      relatedSections: ["490.031", "490.0311"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.1",
    {
      title: "Order of forfeiture of property on conviction",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.1.html`,
      summary:
        "Requires a court to order forfeiture of offence-related property to the Crown when a person is convicted or discharged of an indictable offence under the Act (or the Corruption of Foreign Public Officials Act) and the property is found related to the offence on a balance of probabilities; also allows the court to order forfeiture of property proven beyond a reasonable doubt to be offence-related property even where its link to the offence isn't otherwise established, covers property located outside Canada, and allows appeal of the forfeiture decision.",
      relatedSections: ["490.3", "490.41", "730"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.2",
    {
      title: "Application for in rem forfeiture",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.2.html`,
      summary:
        "Lets the Attorney General apply to a judge for forfeiture of property where an accused charged with an indictable offence has died or absconded, and sets out how an accused is deemed to have absconded and who disposes of the forfeited property, including property outside Canada.",
      relatedSections: ["490.3", "490.41", "552", "490.5", "490.8"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.3",
    {
      title: "Voidable transfers",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.3.html`,
      summary:
        "Allows a court, before ordering forfeiture of offence-related property, to set aside a conveyance or transfer of that property made after seizure or a restraint order, unless the transfer was for valuable consideration to a good-faith purchaser.",
      relatedSections: ["490.1", "490.2"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.4",
    {
      title: "Notice",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.4.html`,
      summary:
        "Requires a court to give notice to, and may hear, anyone appearing to have a valid interest in property before ordering its forfeiture, sets out how that notice must be given, and allows the court to order return of the property to an innocent lawful owner instead of forfeiting it.",
      relatedSections: ["490.1", "490.2"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.41",
    {
      title: "Notice",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.41.html`,
      summary:
        "Requires notice to immediate family members residing in a dwelling-house before it is forfeited, and allows a court to decline ordering forfeiture of property (including a dwelling-house) where forfeiture would be disproportionate to the offence's nature and gravity, the circumstances, and the person's criminal record, with additional consideration for the impact on innocent family members when a dwelling-house is involved.",
      relatedSections: ["490.1", "490.2", "490.4"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.5",
    {
      title: "Application",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.5.html`,
      summary:
        "Allows a person claiming an interest in property already forfeited to the Crown (other than the convicted or charged person) to apply to a judge within 30 days for a declaration that their interest is unaffected by the forfeiture, sets out the hearing and notice procedure, and requires the Attorney General, on application after any appeals are resolved, to return the property (or the applicant's part) or pay the declared value of the applicant's interest.",
      relatedSections: ["490.1", "490.2"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.6",
    {
      title: "Appeals from orders under subsection 490.2(2)",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.6.html`,
      summary:
        "Allows a person aggrieved by a forfeiture order made under subsection 490.2(2) to appeal it as if it were an appeal against conviction or acquittal, with Part XXI's appeal procedures applying.",
      relatedSections: ["490.2"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.7",
    {
      title: "Suspension of order pending appeal",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.7.html`,
      summary:
        "Suspends the operation of a forfeiture or restoration order in respect of property while any related application or appeal is pending, and bars disposing of the property until 30 days after such an order is made.",
      relatedSections: ["490.1", "490.2", "490.5"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.8",
    {
      title: "Application for restraint order",
      severity: "Hybrid",
      maxPenalty: "Indictable offence: imprisonment for a term of not more than five years; or punishable on summary conviction",
      url: `${JUSTICE_LAWS_BASE}/section-490.8.html`,
      summary:
        "Allows the Attorney General to apply ex parte for a restraint order prohibiting dealing with offence-related property, sets out the required supporting affidavit, when the order applies to property outside Canada, service and registration requirements, when the order remains in force, and makes contravening the order an offence.",
      relatedSections: ["490", "490.1", "490.2", "490.4", "490.41"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.81",
    {
      title: "Management order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.81.html`,
      summary:
        "Allows a judge or justice to appoint a person to take control of and manage offence-related property that has been seized or restrained, including selling perishable property, destroying property of little value (after notice and a destruction order), or having certain property forfeited, and sets out when the management order ends and how conditions can be varied.",
      relatedSections: ["487", "490.8"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.9",
    {
      title: "Sections 489.1 and 490 applicable",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.9.html`,
      summary:
        "Applies sections 489.1 and 490 to offence-related property subject to a restraint order under section 490.8, and allows a judge or justice ordering return of such property to require the applicant to enter into a recognizance or deposit money or security.",
      relatedSections: ["489.1", "490", "490.1", "490.7", "490.8"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "491",
    {
      title: "Forfeiture of weapons and ammunition",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-491.html`,
      summary:
        "Requires forfeiture to the Crown of a weapon, imitation firearm, prohibited device, ammunition, or explosive substance that was used in or is the subject-matter of an offence and has been seized, unless the lawful owner was uninvolved in the offence and had no reasonable grounds to believe it would be used unlawfully, in which case it (or its value) is returned to that owner.",
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "491.1",
    {
      title: "Order for restitution or forfeiture of property obtained by crime",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-491.1.html`,
      summary:
        "Requires a court, when it finds an offence was committed involving property obtained by that offence, to order the property returned to its known lawful owner or, if unknown, forfeited to the Crown, subject to exceptions for certain agents and for good-faith purchasers, paid instruments, or disputed ownership claims.",
      relatedSections: ["490", "730", "330", "331", "332", "336"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "491.2",
    {
      title: "Photographic evidence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-491.2.html`,
      summary:
        "Allows a peace officer to photograph certain property before it is returned or forfeited in proceedings for specified offences, and sets out when such photographs and accompanying certificates or affidavits are admissible as evidence, notice requirements, and the court's power to still require production of the actual property.",
      relatedSections: ["334", "344", "348", "354", "489.1", "490"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "492",
    {
      title: "Seizure of explosives",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-492.html`,
      summary:
        "Allows a person executing a search warrant to seize an explosive substance suspected of being intended for unlawful use and requires it be removed to safekeeping and detained until ordered dealt with; the substance is forfeited on conviction and sale proceeds go to the Attorney General.",
      relatedSections: ["487"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "492.1",
    {
      title: "Warrant for tracking device — transactions and things",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-492.1.html`,
      summary:
        "Authorizes a justice or judge to issue a warrant permitting a peace officer or public officer to track the location of transactions, things, or individuals using a tracking device where there are reasonable grounds to suspect or believe it will assist an offence investigation, and sets validity periods, execution rules, and removal authorization after expiry.",
      relatedSections: ["467.11", "467.13", "342.1"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "492.2",
    {
      title: "Warrant for transmission data recorder",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-492.2.html`,
      summary:
        "Authorizes a justice or judge to issue a warrant permitting a peace officer or public officer to obtain transmission data using a transmission data recorder where there are reasonable grounds to suspect it will assist an offence investigation, while barring use of such a warrant to obtain tracking data, and sets validity periods and execution rules.",
      relatedSections: ["467.11", "467.13", "342.1"],
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],

  // ── Part XV.1 — Unreasonable Delay ──
  [
    "492.21",
    {
      title: "Definitions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-492.21.html`,
      summary:
        "Defines terms used in this Part: 'court' means a court seized of an application for a determination of unreasonable delay, and 'unreasonable delay' means a delay exceeding the reasonable time to be tried under paragraph 11(b) of the Charter.",
      partOf: "Part XV.1 — Unreasonable Delay",
    },
  ],
  [
    "492.22",
    {
      title: "Jurisdiction not lost",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-492.22.html`,
      summary:
        "States that a finding of unreasonable delay does not deprive the court seized of the proceedings of jurisdiction over the offence, the accused, or the offender.",
      partOf: "Part XV.1 — Unreasonable Delay",
    },
  ],
  [
    "492.23",
    {
      title: "Stay of proceedings",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-492.23.html`,
      summary:
        "Provides that a court cannot order a stay of proceedings based on a finding of unreasonable delay except in accordance with this Part.",
      partOf: "Part XV.1 — Unreasonable Delay",
    },
  ],
  [
    "492.24",
    {
      title: "Common law rules and principles",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-492.24.html`,
      summary:
        "States that common law rules and principles for determining unreasonable delay continue to apply except where they are altered by or inconsistent with this Part.",
      partOf: "Part XV.1 — Unreasonable Delay",
    },
  ],
  [
    "492.25",
    {
      title: "Reasonable steps to inform",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-492.25.html`,
      summary:
        "Requires the prosecutor to take reasonable steps to inform any victim of the offence that an unreasonable delay application has been filed and, later, of the court's decision on it, and requires the court to ask whether the victims were informed of the filing. States that a prosecutor's failure to inform the victims does not prevent the court from deciding the application.",
      partOf: "Part XV.1 — Unreasonable Delay",
    },
  ],
  [
    "492.26",
    {
      title: "Case complexity — factors",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-492.26.html`,
      summary:
        "Directs the court, in determining whether there has been or will be unreasonable delay, to consider factors that make the case complex, including, where applications or motions are involved, their number, scheduling, required adjournments, judicial decisions needed, cumulative court time, and resulting need for trial continuation dates.",
      partOf: "Part XV.1 — Unreasonable Delay",
    },
  ],
  [
    "492.27",
    {
      title: "Exclusions — sexual offence proceedings",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-492.27.html`,
      summary:
        "Sets out periods that a court must exclude from its delay calculation when an application under section 276.01, 278.12, 278.21, or 278.3 was filed or served less than 60 days before its scheduled hearing, covering the time taken to hear the application and any other period attributable to the late filing or service.",
      relatedSections: ["492.3", "276.01", "276.02", "278.12", "278.21", "278.13"],
      partOf: "Part XV.1 — Unreasonable Delay",
    },
  ],
  [
    "492.28",
    {
      title: "Exclusions — Canada Evidence Act",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-492.28.html`,
      summary:
        "Sets out periods relating to objections and applications under sections 37 and 38.01 to 38.04 of the Canada Evidence Act that a court must exclude when calculating delay, running from when the objection or application was made until it was finally determined.",
      relatedSections: ["492.3"],
      partOf: "Part XV.1 — Unreasonable Delay",
    },
  ],
  [
    "492.29",
    {
      title: "Exclusion — Canadian Security Intelligence Service Act",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-492.29.html`,
      summary:
        "States that a court must exclude, from its delay calculation, the period beginning when an application under subsection 18.1(4) of the Canadian Security Intelligence Service Act was made and ending when it was finally determined.",
      relatedSections: ["492.3"],
      partOf: "Part XV.1 — Unreasonable Delay",
    },
  ],
  [
    "492.3",
    {
      title: "Actions not made in good faith",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-492.3.html`,
      summary:
        "States that, in determining which days are excluded under sections 492.27 to 492.29, the court must take into account any frivolous or dilatory action, or action not made in good faith, taken by the prosecutor or those acting for the prosecutor or the Attorney General of Canada.",
      relatedSections: ["492.27", "492.28", "492.29"],
      partOf: "Part XV.1 — Unreasonable Delay",
    },
  ],
  [
    "492.31",
    {
      title: "Alternative remedies to be considered",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-492.31.html`,
      summary:
        "Provides that a court cannot order a stay of proceedings for unreasonable delay unless satisfied that no other remedy would be appropriate and just, and sets out the factors the court must weigh in choosing an alternative remedy, including the stage of proceedings, impact on victims, prejudice to the accused or offender, public confidence in the administration of justice, and society's interest in a final decision on the merits.",
      partOf: "Part XV.1 — Unreasonable Delay",
    },
  ],

  // ── Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release ──
  [
    "493",
    {
      title: "Definitions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-493.html`,
      summary:
        "Defines terms used in this Part of the Act, including 'accused', 'judge' (by province/territory), and 'warrant', and notes that several other defined terms have been repealed.",
      relatedSections: ["497"],
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "493.01",
    {
      title: "Clarification — indictable offence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-493.01.html`,
      summary:
        "Clarifies that a reference to an indictable offence includes an offence that may be punished on summary conviction if it may also be prosecuted by indictment, unless the prosecutor has elected to proceed by way of summary conviction.",
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "493.1",
    {
      title: "Principle of restraint",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-493.1.html`,
      summary:
        "Directs a peace officer, justice, or judge making a release decision under this Part to give primary consideration to releasing the accused at the earliest reasonable opportunity on the least onerous appropriate conditions, while accounting for the applicable statutory grounds.",
      relatedSections: ["498", "515"],
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "493.11",
    {
      title: "Clarification",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-493.11.html`,
      summary:
        "Clarifies that the principle of restraint does not require release, and sets out how it applies differently for peace officers versus justices or judges, including when detention or specific conditions are required based on public interest, victim/witness safety, or statutory exceptions.",
      relatedSections: ["493.1", "498", "501", "515", "522", "524"],
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "493.2",
    {
      title: "Aboriginal accused or vulnerable populations",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-493.2.html`,
      summary:
        "Directs a peace officer, justice, or judge making a release decision under this Part to give particular attention to the circumstances of Aboriginal accused and accused belonging to vulnerable, overrepresented populations disadvantaged in obtaining release.",
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "494",
    {
      title: "Arrest without warrant by any person",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-494.html`,
      summary:
        "Authorizes any person to arrest without a warrant someone found committing an indictable offence, or someone reasonably believed to have committed a criminal offence and who is being freshly pursued while escaping; also allows a property owner or authorized person to arrest someone found committing an offence on that property, requires prompt delivery of the arrested person to a peace officer, and confirms such an arrest is lawful authority for purposes of section 25.",
      relatedSections: ["25"],
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "495",
    {
      title: "Arrest without warrant by peace officer",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-495.html`,
      summary:
        "Authorizes a peace officer to arrest without warrant a person who has committed or is believed to be about to commit an indictable offence, a person found committing a criminal offence, or a person subject to an arrest warrant, but limits such arrests for certain lesser offences where public interest concerns can be addressed without arrest and the person is not believed likely to fail to attend court; also deems the arrest lawful unless it is shown these limits were not followed.",
      relatedSections: ["553"],
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "495.1",
    {
      title: "Arrest without warrant — application of section 524",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-495.1.html`,
      summary:
        "Allows a peace officer to arrest an accused without a warrant, for the purpose of bringing them before a judge or justice under section 524, where there are reasonable grounds to believe the accused has breached or is about to breach, or committed an offence while subject to, a summons, appearance notice, undertaking, or release order.",
      relatedSections: ["524"],
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "496",
    {
      title: "Appearance notice for judicial referral hearing",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-496.html`,
      summary:
        "Allows a peace officer, without laying a charge, to issue an appearance notice requiring a person to attend a judicial referral hearing where there are reasonable grounds to believe the person failed to comply with a summons, appearance notice, undertaking or release order or to attend court, and that failure caused no harm to a victim, property damage or economic loss.",
      relatedSections: ["523.1"],
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "497",
    {
      title: "Issue of appearance notice by peace officer",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-497.html`,
      summary:
        "Allows a peace officer who does not arrest a person under subsection 495(2) to instead issue an appearance notice for indictable offences under section 553, offences that may be prosecuted either by indictment or summarily, or offences punishable on summary conviction.",
      relatedSections: ["495", "553"],
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "498",
    {
      title: "Release from custody — arrest without warrant",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-498.html`,
      summary:
        "Requires a peace officer to release a person arrested without warrant for most offences as soon as practicable, by summons, appearance notice, or undertaking, unless the officer has reasonable grounds to believe detention or another release mechanism is necessary in the public interest or that the person will fail to attend court; sets out exceptions and deems compliant officers to have acted lawfully.",
      relatedSections: ["469", "494", "503"],
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "499",
    {
      title: "Release from custody — arrest with warrant",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-499.html`,
      summary:
        "Allows a peace officer to release a person arrested with an endorsed warrant for most offences by issuing an appearance notice or having the person give an undertaking.",
      relatedSections: ["469", "507"],
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "500",
    {
      title: "Contents of appearance notice",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-500.html`,
      summary:
        "Sets out the required contents of an appearance notice, including the accused's identifying information, the substance of the alleged offence, the required court attendance, a summary of consequences for failing to appear, possible attendance requirements under the Identification of Criminals Act, and signature procedures.",
      relatedSections: ["523.1", "496", "145", "512.2", "524"],
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "501",
    {
      title: "Contents of undertaking",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-501.html`,
      summary:
        "Sets out the required and optional contents of an undertaking given by an accused, including mandatory attendance at court and a range of permissible conditions such as reporting requirements, travel restrictions, no-contact provisions, surrendering weapons or passports, residence conditions, and monetary deposits, along with signature and deposit-handling procedures.",
      relatedSections: ["498", "499", "503", "512", "512.2", "524"],
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "502",
    {
      title: "Variation of undertaking on consent",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-502.html`,
      summary:
        "Allows an undertaking to be varied by written consent of the accused and prosecutor, or, absent consent, allows either party to apply to a justice to replace the undertaking with a release order or to vary it, with three days' notice required if the prosecutor applies.",
      relatedSections: ["498", "499", "503", "515"],
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "502.1",
    {
      title: "Appearance of the accused",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-502.1.html`,
      summary:
        "Requires an accused, participants, and the presiding justice in proceedings under this Part to attend in person but allows appearance by audioconference or videoconference in set circumstances (advance arrangements satisfactory to the justice for the accused; where the justice considers it necessary for the justice), permits witnesses in Canada to testify remotely if satisfactory to the justice, and applies sections 714.2 to 714.8 to witnesses outside Canada.",
      relatedSections: ["714.1", "714.2", "714.8", "715.25"],
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "503",
    {
      title: "Taking before justice",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-503.html`,
      summary:
        "Requires a peace officer who arrests someone and has not otherwise released them to bring the person before a justice within 24 hours, or as soon as possible if none is available. It also sets rules on re-evaluating detention before that deadline, applying the same timelines when a person is delivered into an officer's custody under other provisions, handling arrests outside the territorial division where the offence occurred, and releasing a person arrested for an anticipated indictable offence once detention is no longer necessary.",
      relatedSections: ["705.1", "494", "528", "515"],
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "504",
    {
      title: "In what cases justice may receive information",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-504.html`,
      summary:
        "Allows a person who reasonably believes someone has committed an indictable offence to lay a sworn written information before a justice, who must receive it if the offence or accused has a specified connection to the justice's territorial jurisdiction (such as residence, location of the offence, or location of unlawfully obtained property).",
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "505",
    {
      title: "Time within which information to be laid in certain cases",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-505.html`,
      summary:
        "Requires that where an appearance notice has been issued or an accused released under sections 497, 498, or 503, an information about the alleged offence must be laid before a justice as soon as practicable, and in any case before the date stated for the accused's court attendance.",
      relatedSections: ["497", "498", "503"],
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "506",
    {
      title: "Form",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-506.html`,
      summary:
        "States that an information laid under section 504 or 505 may use the form designated as Form 2.",
      relatedSections: ["504", "505"],
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "507",
    {
      title: "Justice to hear informant and witnesses — public prosecutions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-507.html`,
      summary:
        "Sets out the procedure a justice follows on receiving certain informations laid by a peace officer, public officer, or the Attorney General, including hearing evidence ex parte and in camera, and issuing a summons or warrant when a case is made out. It also addresses when a summons must be used instead of a warrant, restrictions on signing blank process, endorsement of warrants to authorize release, and issuing new process after an appeal or new trial is ordered.",
      relatedSections: ["523", "504", "505", "540", "508", "512"],
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "507.1",
    {
      title: "Referral when private prosecution",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-507.1.html`,
      summary:
        "Requires a justice receiving certain informations (private prosecutions) to refer them to a judge or designated justice, who may issue a summons or warrant only after an ex parte, in camera hearing that gives the Attorney General notice and an opportunity to participate. It also sets out what happens when no summons or warrant is issued, limits on renewed hearings, and defines \"designated justice.\"",
      relatedSections: ["504", "507", "810", "810.03", "810.1"],
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "508",
    {
      title: "Justice to hear informant and witnesses",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-508.html`,
      summary:
        "Sets out the procedure a justice follows on receiving an information laid under section 505, including hearing evidence, and then either confirming, cancelling, or amending the appearance notice or undertaking, or issuing a summons or warrant, depending on whether a case is made out.",
      relatedSections: ["505", "507", "540"],
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "508.1",
    {
      title: "Information laid otherwise than in person",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-508.1.html`,
      summary:
        "Allows a peace officer to lay an information under sections 504 to 508 by telecommunication that produces a writing, using a written statement of truth in place of a sworn oath.",
      relatedSections: ["504", "505", "506", "507", "508"],
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "509",
    {
      title: "Summons",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-509.html`,
      summary:
        "Sets out the required contents of a summons issued under this Part, how it must be served on an individual, and what statutory provisions it must summarize; it also allows a summons to require attendance for purposes of the Identification of Criminals Act.",
      relatedSections: ["145", "512.1", "524"],
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "511",
    {
      title: "Contents of warrant to arrest",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-511.html`,
      summary:
        "Sets out the required contents of an arrest warrant, states that it remains in force until executed, allows cancellation by a judge or justice in the interests of justice, permits specifying a delay before execution to allow voluntary appearance, and deems the warrant executed if the accused appears voluntarily.",
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "512",
    {
      title: "Certain actions not to preclude issue of warrant",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-512.html`,
      summary:
        "Allows a justice to issue a summons or warrant despite an earlier confirmation, cancellation, or unconditional release, if satisfied it is necessary in the public interest, and allows a warrant to issue where an accused fails to attend court under a summons or confirmed appearance notice/undertaking or is evading service.",
      relatedSections: ["508", "507"],
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "512.1",
    {
      title: "Arrest warrant — failure to appear under summons",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-512.1.html`,
      summary:
        "Allows a justice to issue an arrest warrant where an accused fails to appear as required by a summons for purposes of the Identification of Criminals Act, unless a contravention election has been made under the Contraventions Act.",
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "512.2",
    {
      title: "Arrest warrant — failure to appear under appearance notice or undertaking",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-512.2.html`,
      summary:
        "Allows a justice to issue an arrest warrant where an accused fails to appear as required by an appearance notice or undertaking for purposes of the Identification of Criminals Act, provided that notice or undertaking was confirmed by a justice.",
      relatedSections: ["508"],
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "512.3",
    {
      title: "Warrant to appear under section 524",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-512.3.html`,
      summary:
        "Allows a justice who is satisfied there are reasonable grounds to believe an accused has breached or is about to breach, or has offended while subject to, a summons, appearance notice, undertaking, or release order to issue a warrant to bring the accused before a justice under section 524.",
      relatedSections: ["524"],
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "513",
    {
      title: "Formalities of warrant",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-513.html`,
      summary:
        "Requires that a warrant issued under this Part be directed to the peace officers within the territorial jurisdiction of the justice, judge, or court that issued it.",
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "514",
    {
      title: "Execution of warrant",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-514.html`,
      summary:
        "Sets out where a warrant under this Part may be executed, including anywhere within the issuing court's territorial jurisdiction or, in fresh pursuit, anywhere in Canada, and specifies who may execute it.",
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "515",
    {
      title: "Release order without conditions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-515.html`,
      summary:
        "Sets out the process by which a justice decides whether to release an accused charged with a non-section-469 offence, requiring release without conditions unless the prosecutor shows cause for detention or conditions, and prescribing the types and ordering of conditions (financial obligations, sureties, deposits) that may be imposed, favoring the least onerous form of release.",
      relatedSections: ["469", "346", "423.1", "423.2", "423.3", "333.1"],
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "515.01",
    {
      title: "Attendance — Identification of Criminals Act",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-515.01.html`,
      summary:
        "Allows a judge or justice, when making a release order under section 515, to also order the accused to appear at a stated time and place for purposes of the Identification of Criminals Act if charged with an offence referred to in that Act.",
      relatedSections: ["515"],
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "515.1",
    {
      title: "Declaration of surety",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-515.1.html`,
      summary:
        "Requires a person being named as a surety to first provide a signed declaration under oath containing specified personal, financial, and relationship information and acknowledgments, unless the prosecutor consents or the court is satisfied a declaration cannot reasonably be provided and sufficient information has otherwise been received; the declaration may be provided by telecommunication that produces a writing.",
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "516",
    {
      title: "Adjournment of proceedings",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-516.html`,
      summary:
        "Allows a justice to adjourn proceedings under section 515 on application by the prosecutor or accused and remand the accused to custody, with adjournments limited to three clear days unless the accused consents to longer.",
      relatedSections: ["515"],
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "516.1",
    {
      title: "Remand in custody — non-communication order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-516.1.html`,
      summary:
        "Allows a justice remanding an accused to custody under specified provisions to order the accused not to communicate with a named victim, witness, or other person except as permitted, and sets out when that order ceases to be in force.",
      relatedSections: ["503", "515", "516"],
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "517",
    {
      title: "Order directing matters not to be published for specified period",
      severity: "Summary",
      maxPenalty: "summary conviction (s. 787 default penalty applies unless otherwise stated)",
      url: `${JUSTICE_LAWS_BASE}/section-517.html`,
      summary:
        "Allows or, on the accused's application, requires a justice to order that evidence, information, representations, and reasons given during a show-cause hearing not be published or broadcast until a preliminary inquiry accused is discharged or a trial ends; failing to comply without lawful excuse is a summary conviction offence.",
      relatedSections: ["515"],
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "518",
    {
      title: "Inquiries to be made by justice and evidence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-518.html`,
      summary:
        "Sets out the inquiries a justice may make and the evidence that may be considered in proceedings under section 515, including limits on examining the accused, categories of evidence the prosecutor may lead, and matters the justice may take into account; it also allows release pending sentence if the accused pleads guilty during such proceedings.",
      relatedSections: ["515", "189"],
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "519",
    {
      title: "Release of accused",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-519.html`,
      summary:
        "Sets out what a justice must do after making a release order under section 515, depending on whether the accused complies immediately, including directing release, issuing a committal warrant with authorization to release on compliance, and making conditions against communicating with specified persons effective immediately regardless of custody status.",
      relatedSections: ["515"],
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "519.1",
    {
      title: "Variation of release order with consent",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-519.1.html`,
      summary:
        "Allows a release order made under section 515 to be varied with the written consent of the accused, prosecutor, and any sureties, with the varied order still considered a release order under section 515.",
      relatedSections: ["515"],
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "520",
    {
      title: "Review of order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-520.html`,
      summary:
        "Sets out the process for an accused to apply to a judge for review of certain release-related orders before trial, including notice requirements, the accused's presence at the hearing, adjournment rules, a warrant for non-attendance, what evidence the judge may consider, and the judge's power to dismiss the application or vacate/vary the order; it also limits repeat applications within 30 days absent leave.",
      relatedSections: ["515", "523", "521", "525", "517", "518"],
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "521",
    {
      title: "Review of order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-521.html`,
      summary:
        "Sets out the process for a prosecutor to apply to a judge for review of certain release-related orders before trial, including notice to the accused, the accused's presence at the hearing, adjournment rules, warrants for non-attendance or detention, what evidence the judge may consider, and the judge's power to dismiss the application or vacate/vary the order; it also limits repeat applications within 30 days absent leave.",
      relatedSections: ["515", "523", "520", "525", "517", "518"],
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "522",
    {
      title: "Interim release by judge only",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-522.html`,
      summary:
        "Restricts release of an accused charged with a section 469 offence to a superior court judge, who must order detention unless the accused shows their proposed release plan addresses relevant risks, and allows including a non-communication order with detention; such orders are reviewable only under section 680, and the section extends judicial interim release procedures to other offences charged alongside a section 469 offence.",
      relatedSections: ["469", "515", "680", "517", "518", "519"],
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "523",
    {
      title: "Period for which appearance notice, etc., continues in force",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-523.html`,
      summary:
        "Sets out when an appearance notice, summons, undertaking or release order continues to apply to an accused, including when new charges or indictments arise, and describes who can vacate or vary a prior release/detention order and when.",
      relatedSections: ["469", "515", "517", "518", "519", "673"],
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "523.1",
    {
      title: "Judicial referral hearing",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-523.1.html`,
      summary:
        "Sets out the process for a judicial referral hearing when an accused is alleged to have breached release conditions without causing harm, allowing the judge or justice to take no action, cancel and replace the order, or remand the accused, and to dismiss the related charge.",
      relatedSections: ["522", "515"],
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "524",
    {
      title: "Hearing",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-524.html`,
      summary:
        "Sets out the process when an accused is arrested for breaching or being about to breach a release condition, or for committing an offence while subject to one, including when the judge or justice must cancel the order, detain the accused, or release them.",
      relatedSections: ["515", "469", "520", "521", "522", "680"],
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "525",
    {
      title: "Time for application to judge",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-525.html`,
      summary:
        "Requires the custodian of an accused detained in custody awaiting trial to apply for a hearing on continued detention if trial has not begun within 90 days, and sets out the judge's powers at that hearing, including expediting proceedings or ordering release or continued detention.",
      relatedSections: ["503", "521", "524", "520", "515", "519"],
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "526",
    {
      title: "Directions for expediting proceedings",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-526.html`,
      summary:
        "Allows a court, judge or justice to give directions to expedite proceedings involving an accused under this Part, subject to the 90-day detention review provision.",
      relatedSections: ["525"],
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "527",
    {
      title: "Procuring attendance",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-527.html`,
      summary:
        "Allows a judge or provincial court judge to order that a person confined in prison be brought before a court to attend proceedings, and sets out how the order is delivered, executed, and how the prisoner is returned to custody afterward.",
      relatedSections: ["718.3", "743.1"],
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "528",
    {
      title: "Endorsing warrant",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-528.html`,
      summary:
        "Allows a justice, where an arrest or committal warrant cannot otherwise be executed, to endorse the warrant to authorize its execution within their jurisdiction, and describes the effect of that endorsement for peace officers.",
      relatedSections: ["514", "703"],
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "529",
    {
      title: "Including authorization to enter in warrant of arrest",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-529.html`,
      summary:
        "Allows a warrant of arrest to authorize a peace officer to enter a dwelling-house to arrest the named person if there are reasonable grounds the person is or will be present, subject to the officer confirming that belief immediately before entering.",
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "529.1",
    {
      title: "Warrant to enter dwelling-house",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-529.1.html`,
      summary:
        "Allows a judge or justice to issue a warrant authorizing a peace officer to enter a dwelling-house to arrest or apprehend a person, where there are reasonable grounds to believe the person is or will be present and another arrest authority exists.",
      relatedSections: ["495", "672.91"],
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "529.2",
    {
      title: "Reasonable terms and conditions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-529.2.html`,
      summary:
        "Requires the judge or justice issuing a warrant to enter a dwelling-house to include any terms and conditions considered advisable to ensure the entry is reasonable in the circumstances.",
      relatedSections: ["529.4", "529", "529.1"],
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "529.3",
    {
      title: "Authority to enter dwelling without warrant",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-529.3.html`,
      summary:
        "Allows a peace officer to enter a dwelling-house without a warrant to arrest or apprehend a person, if the warrant conditions would otherwise be met but exigent circumstances such as risk of imminent harm or loss of evidence make getting a warrant impracticable.",
      relatedSections: ["529", "529.1"],
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "529.4",
    {
      title: "Omitting announcement before entry",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-529.4.html`,
      summary:
        "Allows a judge or justice to authorize a peace officer to enter a dwelling-house without prior announcement where announcing would risk imminent bodily harm or death or the imminent loss of evidence, and sets conditions for exercising that authority, including in warrantless entries.",
      relatedSections: ["529", "529.1", "529.3"],
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "529.5",
    {
      title: "Means of telecommunication",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-529.5.html`,
      summary:
        "Allows applications for and issuance of dwelling-house entry warrants or authorizations to be made by means of telecommunication, applying section 487.1 with necessary modifications.",
      relatedSections: ["529.1", "529", "529.4", "487.1"],
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],

  // ── Part XVII — Language of Accused ──
  [
    "530",
    {
      title: "Language of accused",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-530.html`,
      summary:
        "Sets out an accused's right to apply for trial before a justice, judge, or jury who speak the accused's official language (or both official languages), the requirement that the accused be informed of this right, and the court's power to order such a trial on its own initiative or vary the order later.",
      partOf: "Part XVII — Language of Accused",
    },
  ],
  [
    "530.01",
    {
      title: "Translation of documents",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-530.01.html`,
      summary:
        "Requires the prosecutor, on an accused's application following a language order, to have relevant portions of the information or indictment translated into the accused's official language and provide a written copy, with the original version prevailing over the translation if they differ.",
      relatedSections: ["530"],
      partOf: "Part XVII — Language of Accused",
    },
  ],
  [
    "530.1",
    {
      title: "If order granted",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-530.1.html`,
      summary:
        "Sets out the rights and procedures that apply once a language order is granted, including the accused's right to use their official language throughout proceedings, to have a judge, justice and prosecutor who speak that language, to interpreter services, and to a bilingual record and judgment.",
      relatedSections: ["530"],
      partOf: "Part XVII — Language of Accused",
    },
  ],
  [
    "530.2",
    {
      title: "Language used in proceeding",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-530.2.html`,
      summary:
        "Allows the presiding justice or judge, where a trial is ordered to be conducted in both official languages, to set out at the start of proceedings how and to what extent each language will be used, while respecting the accused's right to be tried in their own official language.",
      partOf: "Part XVII — Language of Accused",
    },
  ],
  [
    "531",
    {
      title: "Change of venue",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-531.html`,
      summary:
        "Requires the court to order a change of venue to another territorial division in the same province (except New Brunswick) if a language-based trial order under section 530 cannot conveniently be complied with in the original division.",
      relatedSections: ["530", "533"],
      partOf: "Part XVII — Language of Accused",
    },
  ],
  [
    "532",
    {
      title: "Saving",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-532.html`,
      summary:
        "States that this Part and the Official Languages Act do not remove or reduce any provincial-law right relating to language of proceedings or testimony in criminal matters, so long as that right is not inconsistent with this Part or that Act.",
      partOf: "Part XVII — Language of Accused",
    },
  ],
  [
    "533",
    {
      title: "Regulations",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-533.html`,
      summary:
        "Authorizes provincial and territorial governments to make regulations to carry into effect the purposes and provisions of this Part within their jurisdictions.",
      partOf: "Part XVII — Language of Accused",
    },
  ],
  [
    "533.1",
    {
      title: "Review",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-533.1.html`,
      summary:
        "Requires a parliamentary committee to undertake a comprehensive review of this Part's provisions and operation within three years of this section coming into force, and to report to Parliament with any recommended changes within a further year.",
      partOf: "Part XVII — Language of Accused",
    },
  ],

  // ── Part XVIII — Procedure on Preliminary Inquiry ──
  [
    "535",
    {
      title: "Inquiry by justice",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-535.html`,
      summary:
        "Requires a justice, when a preliminary inquiry has been requested (by either the accused or the prosecutor) for an accused charged with an indictable offence punishable by 14 years or more of imprisonment, to inquire into that charge and any other indictable offence connected to the same transaction that the evidence discloses.",
      relatedSections: ["536", "536.1"],
      partOf: "Part XVIII — Procedure on Preliminary Inquiry",
    },
  ],
  [
    "536",
    {
      title: "Remand by justice to provincial court judge in certain cases",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-536.html`,
      summary:
        "Sets out the procedure for remanding an accused to a provincial court judge, putting the accused to an election on mode of trial depending on the offence, and handling requests for and endorsement of preliminary inquiries.",
      relatedSections: ["553", "469", "577", "482", "482.1", "565"],
      partOf: "Part XVIII — Procedure on Preliminary Inquiry",
    },
  ],
  [
    "536.1",
    {
      title: "Remand by justice — Nunavut",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-536.1.html`,
      summary:
        "Sets out the Nunavut-specific procedure for remanding an accused, putting them to an election on mode of trial, and requesting and endorsing preliminary inquiries, applying in place of section 536 in that territory.",
      relatedSections: ["553", "469", "577", "482", "482.1", "536"],
      partOf: "Part XVIII — Procedure on Preliminary Inquiry",
    },
  ],
  [
    "536.2",
    {
      title: "Elections and re-elections in writing",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-536.2.html`,
      summary:
        "Allows an accused's election or re-election of trial mode to be made in writing without a personal court appearance.",
      partOf: "Part XVIII — Procedure on Preliminary Inquiry",
    },
  ],
  [
    "536.3",
    {
      title: "Statement of issues and witnesses",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-536.3.html`,
      summary:
        "Requires the party requesting a preliminary inquiry to provide the court and the other party with a statement identifying the issues on which evidence is sought and the witnesses to be heard at the inquiry.",
      relatedSections: ["482", "482.1"],
      partOf: "Part XVIII — Procedure on Preliminary Inquiry",
    },
  ],
  [
    "536.4",
    {
      title: "Order for hearing",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-536.4.html`,
      summary:
        "Allows the justice to order a pre-inquiry hearing to help the parties identify issues and witnesses and encourage measures for a fair, efficient preliminary inquiry, and requires the justice to record any resulting admissions or agreements.",
      relatedSections: ["482", "482.1"],
      partOf: "Part XVIII — Procedure on Preliminary Inquiry",
    },
  ],
  [
    "536.5",
    {
      title: "Agreement to limit scope of preliminary inquiry",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-536.5.html`,
      summary:
        "Allows the prosecutor and accused to agree to limit the scope of a preliminary inquiry to specific issues, with that agreement filed with the court or recorded at a pre-inquiry hearing.",
      relatedSections: ["536.4"],
      partOf: "Part XVIII — Procedure on Preliminary Inquiry",
    },
  ],
  [
    "537",
    {
      title: "Powers of justice",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-537.html`,
      summary:
        "Sets out a justice's procedural powers when conducting a preliminary inquiry, including adjourning or changing venue, remanding the accused, regulating the conduct of the inquiry, restricting courtroom access, and stopping abusive or inappropriate questioning.",
      relatedSections: ["536.4", "536.5", "715", "715.01"],
      partOf: "Part XVIII — Procedure on Preliminary Inquiry",
    },
  ],
  [
    "538",
    {
      title: "Organization",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-538.html`,
      summary:
        "Applies subsections 556(1) and (2), with necessary modifications, where the accused is an organization.",
      relatedSections: ["556"],
      partOf: "Part XVIII — Procedure on Preliminary Inquiry",
    },
  ],
  [
    "539",
    {
      title: "Order restricting publication of evidence taken at preliminary inquiry",
      severity: "Summary",
      maxPenalty: "summary conviction (s. 787 default penalty applies unless otherwise stated)",
      url: `${JUSTICE_LAWS_BASE}/section-539.html`,
      summary:
        "Allows or requires a justice at a preliminary inquiry to order a publication ban on evidence taken until the accused is discharged or, if ordered to stand trial, until the trial ends, and requires an unrepresented accused be told of the right to apply for such an order; breaching the order is an offence punishable on summary conviction.",
      partOf: "Part XVIII — Procedure on Preliminary Inquiry",
    },
  ],
  [
    "540",
    {
      title: "Taking evidence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-540.html`,
      summary:
        "Sets out how a justice at a preliminary inquiry must take and record witness evidence under oath, including by written deposition, stenographer, or sound recording, and allows the justice to receive otherwise inadmissible information considered credible or trustworthy, subject to notice requirements.",
      relatedSections: ["537"],
      partOf: "Part XVIII — Procedure on Preliminary Inquiry",
    },
  ],
  [
    "541",
    {
      title: "Hearing of witnesses",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-541.html`,
      summary:
        "Sets out the procedure for hearing defence witnesses at a preliminary inquiry after prosecution evidence is taken, including the required caution given to an unrepresented accused before they may respond to the charges or call witnesses.",
      relatedSections: ["537", "540"],
      partOf: "Part XVIII — Procedure on Preliminary Inquiry",
    },
  ],
  [
    "542",
    {
      title: "Confession or admission of accused",
      severity: "Summary",
      maxPenalty: "summary conviction (s. 787 default penalty applies unless otherwise stated)",
      url: `${JUSTICE_LAWS_BASE}/section-542.html`,
      summary:
        "Allows a prosecutor to enter an accused's admission or confession into evidence at a preliminary inquiry, and makes it an offence to publish or broadcast a report of such an admission or confession before the accused is discharged or the trial has ended.",
      partOf: "Part XVIII — Procedure on Preliminary Inquiry",
    },
  ],
  [
    "543",
    {
      title: "Order that accused appear or be taken before justice where offence alleged to have been committed",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-543.html`,
      summary:
        "Lets a justice, when an accused is charged with an offence alleged to have occurred outside the justice's jurisdiction, order the accused transferred to a justice with jurisdiction over that place, with the evidence and documents transmitted along and deemed taken by the receiving justice.",
      partOf: "Part XVIII — Procedure on Preliminary Inquiry",
    },
  ],
  [
    "544",
    {
      title: "Accused absconding during inquiry",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-544.html`,
      summary:
        "Sets out what happens if an accused absconds during a preliminary inquiry: the accused is deemed to have waived the right to be present, the justice may continue or adjourn the inquiry, may draw an adverse inference from the absconding, and an accused who reappears is not entitled to reopen proceedings held in their absence absent exceptional circumstances.",
      relatedSections: ["548", "537", "541"],
      partOf: "Part XVIII — Procedure on Preliminary Inquiry",
    },
  ],
  [
    "545",
    {
      title: "Witness refusing to be examined",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-545.html`,
      summary:
        "Allows a justice to adjourn a preliminary inquiry and commit to prison, for up to eight days at a time, a witness who without reasonable excuse refuses to be sworn, refuses to answer questions, fails to produce required writings, or refuses to sign a deposition.",
      partOf: "Part XVIII — Procedure on Preliminary Inquiry",
    },
  ],
  [
    "546",
    {
      title: "Irregularity or variance not to affect validity",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-546.html`,
      summary:
        "States that irregularities or defects in a summons or warrant, or variances between the charge in those documents and the information or the evidence given, do not affect the validity of preliminary inquiry proceedings.",
      partOf: "Part XVIII — Procedure on Preliminary Inquiry",
    },
  ],
  [
    "547",
    {
      title: "Adjournment if accused misled",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-547.html`,
      summary:
        "Allows a justice to adjourn a preliminary inquiry and remand or release the accused if it appears the accused was deceived or misled by an irregularity, defect, or variance described in section 546.",
      relatedSections: ["546"],
      partOf: "Part XVIII — Procedure on Preliminary Inquiry",
    },
  ],
  [
    "547.1",
    {
      title: "Inability of justice to continue",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-547.1.html`,
      summary:
        "Provides that if a justice conducting a preliminary inquiry dies or cannot continue, another justice may pick up the inquiry where it left off if the evidence was recorded, or must otherwise start taking evidence over again.",
      relatedSections: ["540"],
      partOf: "Part XVIII — Procedure on Preliminary Inquiry",
    },
  ],
  [
    "548",
    {
      title: "Order to stand trial or discharge",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-548.html`,
      summary:
        "Requires a justice, once all evidence at a preliminary inquiry has been heard, to order the accused to stand trial if there is sufficient evidence or discharge the accused if there is not, and sets out related endorsement and validity rules.",
      partOf: "Part XVIII — Procedure on Preliminary Inquiry",
    },
  ],
  [
    "549",
    {
      title: "Order to stand trial at any stage of inquiry with consent",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-549.html`,
      summary:
        "Allows a justice, with the consent of the accused and prosecutor, to order the accused to stand trial at any stage of a preliminary inquiry without taking further evidence, including where the inquiry's scope has been limited by agreement.",
      relatedSections: ["536.5", "548"],
      partOf: "Part XVIII — Procedure on Preliminary Inquiry",
    },
  ],
  [
    "550",
    {
      title: "Recognizance of witness",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-550.html`,
      summary:
        "Allows a justice who orders an accused to stand trial to require a material witness to enter into a recognizance to appear and give evidence at trial, with conditions, sureties, or a deposit, and permits committing a non-complying witness to prison until the requirement is met or the trial ends.",
      partOf: "Part XVIII — Procedure on Preliminary Inquiry",
    },
  ],
  [
    "551",
    {
      title: "Transmission of record by justice",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-551.html`,
      summary:
        "Requires a justice who orders an accused to stand trial to immediately send the information, evidence, exhibits, and related documents to the court where the accused will be tried.",
      relatedSections: ["541"],
      partOf: "Part XVIII — Procedure on Preliminary Inquiry",
    },
  ],

  // ── Part XVIII.1 — Case Management Judge ──
  [
    "551.1",
    {
      title: "Appointment",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-551.1.html`,
      summary:
        "Allows the Chief Justice or Chief Judge to appoint a case management judge for a trial before jury selection or presentation of evidence on the merits, where necessary for the proper administration of justice, and permits a conference or hearing on whether to make the appointment.",
      partOf: "Part XVIII.1 — Case Management Judge",
    },
  ],
  [
    "551.2",
    {
      title: "Role",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-551.2.html`,
      summary:
        "States that the case management judge's role is to help promote a fair and efficient trial, including ensuring evidence on the merits is presented without interruption where possible.",
      partOf: "Part XVIII.1 — Case Management Judge",
    },
  ],
  [
    "551.3",
    {
      title: "Powers before evidence on merits presented",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-551.3.html`,
      summary:
        "Sets out the case management judge's powers before evidence on the merits is presented, including scheduling, encouraging admissions, hearing guilty pleas, and deciding matters such as disclosure, admissibility of evidence, Charter issues, expert witnesses, severance of counts, and change of venue.",
      relatedSections: ["551.7", "599"],
      partOf: "Part XVIII.1 — Case Management Judge",
    },
  ],
  [
    "551.4",
    {
      title: "Information relevant to presentation of evidence on merits to be part of court record",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-551.4.html`,
      summary:
        "Requires the case management judge, once pre-trial measures are complete, to ensure the court record includes information relevant to the evidence-on-merits stage, such as witness lists, admissions, time estimates, and orders.",
      partOf: "Part XVIII.1 — Case Management Judge",
    },
  ],
  [
    "551.5",
    {
      title: "Trial continuous",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-551.5.html`,
      summary:
        "States that a trial must proceed continuously, subject to court adjournment, even if the judge hearing the evidence on the merits differs from the case management judge.",
      partOf: "Part XVIII.1 — Case Management Judge",
    },
  ],
  [
    "551.6",
    {
      title: "Issues referred to case management judge",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-551.6.html`,
      summary:
        "Requires the case management judge to adjudicate any issue referred by the trial judge during presentation of the evidence on the merits, exercising the powers of a trial judge to do so.",
      partOf: "Part XVIII.1 — Case Management Judge",
    },
  ],
  [
    "551.7",
    {
      title: "Decision whether to hold joint hearing",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-551.7.html`,
      summary:
        "Allows the Chief Justice or Chief Judge to order a joint hearing before one appointed judge to adjudicate a common issue across related trials in the same province, and sets out the procedure, powers, and record-keeping for that joint hearing.",
      relatedSections: ["551.3"],
      partOf: "Part XVIII.1 — Case Management Judge",
    },
  ],

  // ── Part XIX — Indictable Offences — Trial Without Jury ──
  [
    "552",
    {
      title: "Definitions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-552.html`,
      summary:
        "Defines which judge in each province or territory is meant by the term \"judge\" for the purposes of this Part.",
      partOf: "Part XIX — Indictable Offences — Trial Without Jury",
    },
  ],
  [
    "553",
    {
      title: "Absolute jurisdiction",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-553.html`,
      summary:
        "Gives a provincial court judge (or, in Nunavut, a judge of the Nunavut Court of Justice) absolute jurisdiction, not depending on the accused's consent, to try an accused charged with theft (other than cattle theft), obtaining property by false pretences, possession of property obtained by crime, fraud, or mischief under subsection 430(4) where the value involved does not exceed $5,000, as well as specified gaming, betting, fraud-in-fares, breach of recognizance, and probation-breach offences, and counselling, conspiracy, attempt, or accessory after the fact in relation to those offences.",
      relatedSections: ["201", "202", "203", "206", "209", "393"],
      partOf: "Part XIX — Indictable Offences — Trial Without Jury",
    },
  ],
  [
    "554",
    {
      title: "Trial by provincial court judge with consent",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-554.html`,
      summary:
        "Allows a provincial court judge to try an accused charged with an indictable offence, other than one listed in section 469 or one over which the judge has absolute jurisdiction, if the accused elects to be tried by a provincial court judge.",
      relatedSections: ["469", "553"],
      partOf: "Part XIX — Indictable Offences — Trial Without Jury",
    },
  ],
  [
    "555",
    {
      title: "If charge should be prosecuted by indictment",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-555.html`,
      summary:
        "Allows a provincial court judge who decides a charge should instead be prosecuted by indictment to stop adjudicating and put the accused to an election of trial mode, and sets out the wording of that election and the resulting procedure, including where the offence's value exceeds $5,000.",
      relatedSections: ["553", "536"],
      partOf: "Part XIX — Indictable Offences — Trial Without Jury",
    },
  ],
  [
    "555.1",
    {
      title: "If charge should be prosecuted by indictment — Nunavut",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-555.1.html`,
      summary:
        "Sets out the Nunavut equivalent of section 555, allowing a judge who decides a charge should be prosecuted by indictment to stop adjudicating and put the accused to an election of trial mode, with the prescribed wording and resulting procedure.",
      relatedSections: ["555", "553", "536.1"],
      partOf: "Part XIX — Indictable Offences — Trial Without Jury",
    },
  ],
  [
    "556",
    {
      title: "Organization",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-556.html`,
      summary:
        "Requires an accused organization to appear by counsel or agent, and sets out what a judge does if the organization does not appear or if a preliminary inquiry is not requested, including fixing a trial date.",
      relatedSections: ["536", "536.1"],
      partOf: "Part XIX — Indictable Offences — Trial Without Jury",
    },
  ],
  [
    "557",
    {
      title: "Taking evidence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-557.html`,
      summary:
        "Requires that evidence of witnesses in a trial before a provincial court judge or Nunavut Court of Justice judge be taken in accordance with the preliminary inquiry provisions of Part XVIII, apart from certain excepted subsections.",
      relatedSections: ["540"],
      partOf: "Part XIX — Indictable Offences — Trial Without Jury",
    },
  ],
  [
    "558",
    {
      title: "Trial by judge without a jury",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-558.html`,
      summary:
        "Provides that an accused charged with an indictable offence (other than one in section 469) who elects or re-elects to be tried by a judge without a jury shall be tried that way.",
      relatedSections: ["469", "536", "536.1", "561", "561.1"],
      partOf: "Part XIX — Indictable Offences — Trial Without Jury",
    },
  ],
  [
    "559",
    {
      title: "Court of record",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-559.html`,
      summary:
        "Declares that a judge holding a trial under this Part sits as a court of record, and requires the trial record to be kept in that judge's court.",
      partOf: "Part XIX — Indictable Offences — Trial Without Jury",
    },
  ],
  [
    "560",
    {
      title: "Duty of judge",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-560.html`,
      summary:
        "Sets out a judge's duty to fix a time and place for trial after being notified that an accused who elected trial by judge without a jury is in or out of custody, and describes related notice and attendance duties on the sheriff and the accused.",
      relatedSections: ["536", "536.1"],
      partOf: "Part XIX — Indictable Offences — Trial Without Jury",
    },
  ],
  [
    "561",
    {
      title: "Right to re-elect",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-561.html`,
      summary:
        "Sets out an accused's rights and procedures to re-elect a different mode of trial than originally chosen, including time limits, when prosecutorial consent is required, and how notice of re-election is given and acted on.",
      relatedSections: ["536", "566", "574", "577"],
      partOf: "Part XIX — Indictable Offences — Trial Without Jury",
    },
  ],
  [
    "561.1",
    {
      title: "Right to re-elect with consent — Nunavut",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-561.1.html`,
      summary:
        "Sets out the Nunavut equivalent of section 561, describing an accused's rights and procedures to re-elect a different mode of trial, including time limits, consent requirements, and notice procedures.",
      relatedSections: ["561", "536.1", "566", "574", "577"],
      partOf: "Part XIX — Indictable Offences — Trial Without Jury",
    },
  ],
  [
    "562",
    {
      title: "Proceedings following re-election",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-562.html`,
      summary:
        "Directs the judge or provincial court judge to proceed with the trial or fix a trial date, or to proceed with a preliminary inquiry, depending on which re-election provision under section 561 the accused used.",
      relatedSections: ["561", "536"],
      partOf: "Part XIX — Indictable Offences — Trial Without Jury",
    },
  ],
  [
    "562.1",
    {
      title: "Proceedings following re-election — Nunavut",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-562.1.html`,
      summary:
        "Sets out the Nunavut equivalent of section 562, directing the judge to proceed with trial, fix a trial date, or proceed with a preliminary inquiry depending on which re-election provision under section 561.1 was used.",
      relatedSections: ["561.1", "536.1", "562"],
      partOf: "Part XIX — Indictable Offences — Trial Without Jury",
    },
  ],
  [
    "563",
    {
      title: "Proceedings on re-election to be tried by provincial court judge without jury",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-563.html`,
      summary:
        "Provides that an accused who re-elects to be tried by a provincial court judge is tried on the existing information, subject to permitted amendments, and requires the judge to endorse the information with a record of the re-election.",
      relatedSections: ["561"],
      partOf: "Part XIX — Indictable Offences — Trial Without Jury",
    },
  ],
  [
    "563.1",
    {
      title: "Proceedings on re-election to be tried by judge without jury — Nunavut",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-563.1.html`,
      summary:
        "Sets out the Nunavut equivalent of section 563, providing that an accused who re-elects to be tried by a judge without a jury is tried on the existing information, subject to permitted amendments, with the re-election endorsed on the information.",
      relatedSections: ["561.1", "536.1", "563"],
      partOf: "Part XIX — Indictable Offences — Trial Without Jury",
    },
  ],
  [
    "565",
    {
      title: "Election deemed to have been made",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-565.html`,
      summary:
        "Deems an accused to have elected trial by judge and jury in certain circumstances, such as when an election was declined to be recorded or none was made, or when an indictment was preferred directly, and sets out how such an accused may still re-elect.",
      relatedSections: ["567", "567.1", "536", "536.1", "577", "578"],
      partOf: "Part XIX — Indictable Offences — Trial Without Jury",
    },
  ],
  [
    "566",
    {
      title: "Indictment",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-566.html`,
      summary:
        "Requires that trial for an indictable offence, other than before a provincial court judge, proceed on a written indictment, and allows an indictment to be preferred where the accused elected or re-elected trial by judge without jury.",
      relatedSections: ["536", "561", "574", "576"],
      partOf: "Part XIX — Indictable Offences — Trial Without Jury",
    },
  ],
  [
    "566.1",
    {
      title: "Indictment — Nunavut",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-566.1.html`,
      summary:
        "Sets out the Nunavut equivalent of section 566, requiring trial for most indictable offences to proceed on a written indictment and allowing an indictment to be preferred where a preliminary inquiry was requested after election or re-election of trial by judge without a jury.",
      relatedSections: ["553", "536.1", "561.1", "574", "576", "566"],
      partOf: "Part XIX — Indictable Offences — Trial Without Jury",
    },
  ],
  [
    "567",
    {
      title: "Mode of trial when two or more accused",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-567.html`,
      summary:
        "Allows a justice or judge to decline to record an election, re-election, or deemed election for trial by provincial court judge or judge without a jury when two or more jointly charged accused have not all chosen the same mode of trial.",
      partOf: "Part XIX — Indictable Offences — Trial Without Jury",
    },
  ],
  [
    "567.1",
    {
      title: "Mode of trial if two or more accused — Nunavut",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-567.1.html`,
      summary:
        "Sets out the Nunavut equivalent of section 567, allowing a justice of the peace or judge to decline to record an election, re-election, or deemed election for trial by judge without a jury when jointly charged accused have not chosen the same mode of trial.",
      relatedSections: ["567"],
      partOf: "Part XIX — Indictable Offences — Trial Without Jury",
    },
  ],
  [
    "568",
    {
      title: "Attorney General may require trial by jury",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-568.html`,
      summary:
        "Allows the Attorney General to require trial by judge and jury despite an accused's election of another mode, unless the offence carries a maximum of five years or less imprisonment, and removes the judge's jurisdiction to try the accused in that case.",
      relatedSections: ["536", "561", "565"],
      partOf: "Part XIX — Indictable Offences — Trial Without Jury",
    },
  ],
  [
    "569",
    {
      title: "Attorney General may require trial by jury — Nunavut",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-569.html`,
      summary:
        "Sets out the Nunavut equivalent of section 568, allowing the Attorney General to require trial by judge and jury despite an accused's election, unless the offence carries a maximum of five years or less imprisonment.",
      relatedSections: ["536.1", "561.1", "565", "568"],
      partOf: "Part XIX — Indictable Offences — Trial Without Jury",
    },
  ],
  [
    "570",
    {
      title: "Record of conviction or order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-570.html`,
      summary:
        "Sets out the procedures for recording a conviction or acquittal after trial under this Part, including endorsing the information, drawing up conviction, order, or acquittal forms, transmitting records, and issuing a warrant of committal.",
      relatedSections: ["528"],
      partOf: "Part XIX — Indictable Offences — Trial Without Jury",
    },
  ],
  [
    "571",
    {
      title: "Adjournment",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-571.html`,
      summary:
        "Allows a judge or provincial court judge to adjourn a trial from time to time until it concludes, and requires consideration of the interests of justice, including victims' interests, in deciding whether to adjourn.",
      partOf: "Part XIX — Indictable Offences — Trial Without Jury",
    },
  ],
  [
    "572",
    {
      title: "Application of Parts XVI, XVIII, XX and XXIII",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-572.html`,
      summary:
        "Applies the provisions of Parts XVI, XVIII, XX, and XXIII, to the extent not inconsistent with this Part, to proceedings under this Part.",
      partOf: "Part XIX — Indictable Offences — Trial Without Jury",
    },
  ],

  // ── Part XIX.1 — Nunavut Court of Justice ──
  [
    "573",
    {
      title: "Nunavut Court of Justice",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-573.html`,
      summary:
        "Allows a judge of the Nunavut Court of Justice to exercise the powers and duties of various other courts and judicial officers under the Act, specifies that they do so as a superior court judge, and clarifies this does not extend to granting Charter section 24 remedies while presiding at a preliminary inquiry.",
      partOf: "Part XIX.1 — Nunavut Court of Justice",
    },
  ],
  [
    "573.1",
    {
      title: "Application for review — Nunavut",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-573.1.html`,
      summary:
        "Sets out who may apply to a Nunavut Court of Appeal judge for review of certain decisions or orders made by a Nunavut Court of Justice judge, the grounds on which review may be granted, and the powers that judge has on such an application.",
      relatedSections: ["548", "552"],
      partOf: "Part XIX.1 — Nunavut Court of Justice",
    },
  ],
  [
    "573.2",
    {
      title: "Habeas corpus",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-573.2.html`,
      summary:
        "Allows habeas corpus proceedings to be brought before a Nunavut Court of Appeal judge regarding an order or warrant of a Nunavut Court of Justice judge, subject to certain exceptions, and applies related provisions to such proceedings.",
      relatedSections: ["552", "784"],
      partOf: "Part XIX.1 — Nunavut Court of Justice",
    },
  ],

  // ── Part XX — Procedure in Jury Trials and General Provisions ──
  [
    "574",
    {
      title: "Prosecutor may prefer indictment",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-574.html`,
      summary:
        "Sets out when and on what charges a prosecutor may prefer an indictment against a person ordered to stand trial or against whom no preliminary inquiry was held, including combining charges and requiring judicial consent for private prosecutions.",
      relatedSections: ["536", "536.1", "478"],
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "576",
    {
      title: "Indictment",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-576.html`,
      summary:
        "Provides that no indictment may be preferred except as provided in the Act, that no criminal information or grand jury bill of indictment may be used, and that no person may be tried on a coroner's inquisition.",
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "577",
    {
      title: "Direct indictments",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-577.html`,
      summary:
        "Allows an indictment to be preferred without a completed preliminary inquiry if the Attorney General personally consents in writing or a judge orders it.",
      relatedSections: ["574"],
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "578",
    {
      title: "Summons or warrant",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-578.html`,
      summary:
        "Allows a court to issue a summons or arrest warrant to compel an accused to appear when proceedings recommence or an indictment has been filed, and applies Part XVI procedures to that summons or warrant.",
      relatedSections: ["579"],
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "579",
    {
      title: "Attorney General may direct stay",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-579.html`,
      summary:
        "Allows the Attorney General to direct that proceedings against an accused be stayed by an entry on the court record, and sets out how and within what time such stayed proceedings may be recommenced before they are deemed never to have been commenced.",
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "579.001",
    {
      title: "Instruction to stay",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-579.001.html`,
      summary:
        "Requires the Attorney General to direct a stay of proceedings against a preclearance officer where the United States has given notice of exercising primary criminal jurisdiction, and sets out how and when such proceedings may later be recommenced.",
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "579.01",
    {
      title: "When Attorney General does not stay proceedings",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-579.01.html`,
      summary:
        "Allows the Attorney General, where they intervene in proceedings without staying them, to call and examine witnesses, present evidence, and make submissions without conducting the proceedings.",
      relatedSections: ["579"],
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "579.1",
    {
      title: "Intervention by Attorney General of Canada or Director of Public Prosecutions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-579.1.html`,
      summary:
        "Sets out the circumstances in which the Attorney General of Canada or the Director of Public Prosecutions may intervene in proceedings, and applies the stay and intervention provisions of sections 579 and 579.01 to such interventions.",
      relatedSections: ["579", "579.01"],
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "580",
    {
      title: "Form of indictment",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-580.html`,
      summary:
        "States that an indictment is sufficient if it is on paper and in Form 4.",
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "581",
    {
      title: "Substance of offence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-581.html`,
      summary:
        "Sets out the requirements for the content and form of a count in an indictment, including that it generally cover a single transaction, state the offence in sufficient detail, and may reference the relevant statutory provision.",
      relatedSections: ["47", "50", "51", "52", "53"],
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "582",
    {
      title: "High treason and first degree murder",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-582.html`,
      summary:
        "Prohibits conviction for high treason or first degree murder unless the indictment specifically charges that offence.",
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "583",
    {
      title: "Certain omissions not grounds for objection",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-583.html`,
      summary:
        "Lists particular omissions of detail, such as not naming the victim or the means of the offence, that do not by themselves make a count in an indictment insufficient.",
      relatedSections: ["581"],
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "584",
    {
      title: "Sufficiency of count charging libel",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-584.html`,
      summary:
        "Provides that a count for publishing a libel or selling obscene material is not insufficient merely for not setting out the exact words or material, and allows a libel count to specify an innuendo meaning and be proved as libellous with or without innuendo.",
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "585",
    {
      title: "Sufficiency of count charging perjury, etc.",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-585.html`,
      summary:
        "Provides that a count charging perjury, false oath or statement, fabricating evidence, or procuring such an offence is not insufficient merely for lacking certain details like the tribunal's authority or the words used.",
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "586",
    {
      title: "Sufficiency of count relating to fraud",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-586.html`,
      summary:
        "Provides that a count alleging false pretences, fraud, or fraud-related attempt or conspiracy is not insufficient merely for not detailing the nature of the false pretence or fraud.",
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "587",
    {
      title: "What may be ordered",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-587.html`,
      summary:
        "Allows a court, where necessary for a fair trial, to order the prosecutor to provide further particulars on specified aspects of the charge, and sets out how such particulars are delivered and their effect on the trial.",
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "588",
    {
      title: "Ownership",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-588.html`,
      summary:
        "Deems property under a person's legal management, control or custody to be that person's property for the purposes of an indictment or proceeding about an offence involving that property.",
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "589",
    {
      title: "Count for murder",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-589.html`,
      summary:
        "Restricts joining a count for an offence other than murder to a murder count in an indictment, unless the other offence arises from the same transaction or the accused consents.",
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "590",
    {
      title: "Offences may be charged in the alternative",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-590.html`,
      summary:
        "Provides that a count is not objectionable merely for charging alternative matters or being double or multifarious, and allows an accused to apply to have such a count amended or divided if it embarrasses their defence.",
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "591",
    {
      title: "Joinder of counts",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-591.html`,
      summary:
        "Allows multiple counts for multiple offences to be joined in one indictment, treats each count as a separate indictment, and allows the court to order separate trials of an accused or counts where the interests of justice require it, including delayed or later-effective severance orders.",
      relatedSections: ["589"],
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "592",
    {
      title: "Accessories after the fact",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-592.html`,
      summary:
        "Allows a person charged as an accessory after the fact to be indicted regardless of whether the principal or other party has been indicted, convicted, or is amenable to justice.",
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "593",
    {
      title: "Trial of persons jointly",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-593.html`,
      summary:
        "Allows multiple persons to be jointly charged in one indictment for certain property offences even where the property was possessed at different times or the person who obtained it is not charged or available, and allows conviction of any one or more of them.",
      relatedSections: ["354", "355.4", "356"],
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "597",
    {
      title: "Bench warrant",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-597.html`,
      summary:
        "Allows a court to issue a bench warrant for an accused who fails to appear or remain for trial, sets out its execution anywhere in Canada, interim release on arrest, and provisions for delayed execution or deemed execution on voluntary appearance.",
      relatedSections: ["515"],
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "598",
    {
      title: "Election deemed to be waived",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-598.html`,
      summary:
        "Provides that an accused who failed to appear or remain for a jury trial and had not re-elected trial without a jury generally may not be tried by jury unless they show a legitimate excuse or the Attorney General requires a jury trial, and deems such an accused to have elected trial without a jury.",
      relatedSections: ["597", "568", "569", "536", "536.1", "561"],
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "599",
    {
      title: "Reasons for change of venue",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-599.html`,
      summary:
        "Allows a court or judge to order a change of venue for a trial to another territorial division in the same province where it serves the ends of justice or a jury cannot be summoned, and sets out conditions on expenses and transmission of court records following such an order.",
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "600",
    {
      title: "Order is authority to remove prisoner",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-600.html`,
      summary:
        "Provides that an order changing venue under section 599 authorizes sheriffs, prison keepers, and peace officers to remove, transport, and receive the accused accordingly.",
      relatedSections: ["599"],
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "601",
    {
      title: "Amending defective indictment or count",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-601.html`,
      summary:
        "Sets out the procedure and grounds for objecting to or amending a defective indictment or count, the factors a court must consider, and the effect of amendments on the record and proceedings.",
      relatedSections: ["587", "50", "51", "53"],
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "603",
    {
      title: "Right of accused",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-603.html`,
      summary:
        "Entitles an accused, after being ordered to stand trial or at trial, to inspect without charge and obtain copies for a fee of the indictment, evidence, exhibits, and their own statement, without postponing trial for this purpose absent due diligence.",
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "605",
    {
      title: "Release of exhibits for testing",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-605.html`,
      summary:
        "Allows a judge to order release of an exhibit for scientific testing on application with notice, subject to safeguarding conditions, and makes failure to comply with such an order contempt of court.",
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "606",
    {
      title: "Pleas permitted",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-606.html`,
      summary:
        "Sets out the pleas an accused may enter, the conditions a court must be satisfied of before accepting a guilty plea, procedure where an accused refuses to plead, allowance of time before pleading, acceptance of a guilty plea to a lesser or different offence, and requirements to inform victims of plea agreements in serious cases.",
      relatedSections: ["752"],
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "607",
    {
      title: "Special pleas",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-607.html`,
      summary:
        "Lists the special pleas an accused may enter, including autrefois acquit, autrefois convict, pardon, and an expungement order, sets out how libel and these pleas are handled, and limits the autrefois convict plea in certain foreign trial in absentia cases.",
      relatedSections: ["611", "612", "730", "7"],
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "608",
    {
      title: "Evidence of identity of charges",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-608.html`,
      summary:
        "Makes the evidence, adjudication, and judge's and stenographer's notes from a former trial, along with the transmitted record, admissible to prove or disprove the identity of charges when a plea of autrefois acquit or autrefois convict is tried.",
      relatedSections: ["551"],
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "609",
    {
      title: "What determines identity",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-609.html`,
      summary:
        "Sets out how a judge determines whether a plea of autrefois acquit or autrefois convict succeeds by comparing the matter and possible convictions in the former and current trials, including partial allowance of the plea.",
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "610",
    {
      title: "Circumstances of aggravation",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-610.html`,
      summary:
        "Provides that a prior conviction or acquittal bars a subsequent indictment for substantially the same offence with added aggravating circumstances, and sets out corresponding bars between murder, manslaughter, infanticide, and first or second degree murder charges for the same homicide.",
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "611",
    {
      title: "Libel, plea of justification",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-611.html`,
      summary:
        "Allows an accused charged with publishing defamatory libel to plead that the matter published was true and for the public benefit, sets out how such a plea addresses different senses of the matter, requires the plea in writing with supporting facts, and allows the prosecutor to reply denying its truth.",
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "612",
    {
      title: "Plea of justification necessary",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-612.html`,
      summary:
        "Restricts inquiry into the truth of an alleged libel absent a plea of justification, except where the accused is charged with knowingly publishing a false libel, allows combining a justification plea with not guilty, and allows the plea to affect sentencing on conviction.",
      relatedSections: ["611"],
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "613",
    {
      title: "Plea of not guilty",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-613.html`,
      summary:
        "Allows any ground of defence not covered by a specific special plea to be relied on under a plea of not guilty.",
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "620",
    {
      title: "Appearance by attorney",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-620.html`,
      summary:
        "Requires an organization against which an indictment is filed to appear and plead through counsel or agent.",
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "621",
    {
      title: "Notice to organization",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-621.html`,
      summary:
        "Allows the clerk of the court or prosecutor to serve an organization with notice of an indictment, and sets out the required contents of that notice, including the consequence of not appearing to plead.",
      relatedSections: ["548"],
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "622",
    {
      title: "Procedure on default of appearance",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-622.html`,
      summary:
        "Allows the presiding judge, on proof the organization was served notice and did not appear, to order a not guilty plea entered on its behalf with the same effect as if the organization had appeared and pleaded.",
      relatedSections: ["621"],
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "623",
    {
      title: "Trial of organization",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-623.html`,
      summary:
        "Requires the court to proceed with trial once an organization appears and pleads or a not guilty plea is entered by court order, and applies section 735 if the organization is convicted.",
      relatedSections: ["622", "735"],
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "624",
    {
      title: "How recorded",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-624.html`,
      summary:
        "Provides that a conviction or acquittal record on an indictment may simply copy the indictment and plea without formal heading, and requires the court to keep a record of arraignments and subsequent proceedings.",
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "625",
    {
      title: "Form of record in case of amendment",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-625.html`,
      summary:
        "Provides that a formal record of amended indictment proceedings shall be drawn up in the form the indictment took after amendment, without noting that it was amended.",
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "625.1",
    {
      title: "Pre-hearing conference",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-625.1.html`,
      summary:
        "Allows a court to order a pre-hearing conference between the prosecutor and accused to address matters that would promote a fair and expeditious hearing, and requires such a conference before any jury trial.",
      relatedSections: ["482", "482.1"],
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "626",
    {
      title: "Qualification of jurors",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-626.html`,
      summary:
        "Provides that a person qualified and summoned as a juror under provincial law is qualified to serve as a juror in criminal proceedings in that province, and prohibits disqualifying, exempting or excusing anyone from jury service based on sex.",
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "626.1",
    {
      title: "Presiding judge",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-626.1.html`,
      summary:
        "Allows the judge presiding at trial to be either the judge who presided over jury selection matters or another judge of the same court.",
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "627",
    {
      title: "Support for juror with physical disability",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-627.html`,
      summary:
        "Allows a judge to permit a qualified juror with a physical disability to have technical, personal, interpretative or other support services.",
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "629",
    {
      title: "Challenging the jury panel",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-629.html`,
      summary:
        "Allows the accused or prosecutor to challenge the jury panel only on the ground of partiality, fraud or wilful misconduct by the officer who returned it, and requires such a challenge to be in writing stating the ground.",
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "630",
    {
      title: "Trying ground of challenge",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-630.html`,
      summary:
        "Requires the judge to determine whether an alleged ground for challenging the jury panel is true and, if so, to direct that a new panel be returned.",
      relatedSections: ["629"],
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "631",
    {
      title: "Names of jurors on cards",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-631.html`,
      summary:
        "Sets out the procedure for placing jurors' names on cards, drawing them randomly in open court to form the jury and any alternate or additional jurors, swearing them in, and allows a publication or access ban on juror-identifying information.",
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "631.1",
    {
      title: "Electronic or automated means",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-631.1.html`,
      summary:
        "Allows electronic or other automated means to be used to select jurors as long as selection remains random as required by the jury selection process.",
      relatedSections: ["631"],
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "632",
    {
      title: "Excusing jurors",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-632.html`,
      summary:
        "Allows the judge to excuse a juror from service before trial begins for reasons including personal interest in the matter, relationship with the judge, prosecutor, accused, counsel or a witness, or personal hardship or other reasonable cause.",
      relatedSections: ["631"],
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "633",
    {
      title: "Stand by",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-633.html`,
      summary:
        "Allows the judge to direct a called juror to stand by for reasons of personal hardship, maintaining public confidence in the administration of justice, or other reasonable cause.",
      relatedSections: ["631"],
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "635",
    {
      title: "Order of challenges",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-635.html`,
      summary:
        "Sets out the order in which the accused and prosecutor are called on to declare whether they challenge each juror, including the order of challenges where multiple accused are tried together.",
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "638",
    {
      title: "Challenge for cause",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-638.html`,
      summary:
        "Lists the specific grounds on which a prosecutor or accused may challenge a juror for cause, such as lack of impartiality, a prior conviction carrying a two-year or longer prison sentence with no pardon or record suspension in effect, not being a Canadian citizen, physical inability to perform juror duties, or lacking required language ability, and prohibits challenges on other grounds.",
      relatedSections: ["627", "530"],
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "639",
    {
      title: "Challenge in writing",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-639.html`,
      summary:
        "Allows a court to require a challenge for cause to be put in writing, permits use of a specified form, and allows the other party to deny the challenge as untrue.",
      relatedSections: ["638"],
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "640",
    {
      title: "Determination of challenge for cause",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-640.html`,
      summary:
        "Requires the judge to determine whether an alleged ground for challenging a juror for cause is true and, if so, that the juror not be sworn, and allows the judge to exclude other jurors from the courtroom while this is determined if necessary to preserve impartiality.",
      relatedSections: ["638"],
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "641",
    {
      title: "Calling persons who have stood by",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-641.html`,
      summary:
        "Sets out how jurors previously directed to stand by are recalled and sworn if a full jury has not been sworn and no cards remain to be drawn, and how newly available panel members are dealt with first if they become available before that.",
      relatedSections: ["631"],
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "642",
    {
      title: "Summoning other jurors when panel exhausted",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-642.html`,
      summary:
        "Allows the court, at the prosecutor's request, to order additional persons summoned (by word of mouth if necessary) to complete a jury when the existing panel cannot provide a full jury, and requires their names to be added to the general panel and treated the same as originally named jurors.",
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "642.1",
    {
      title: "Substitution of alternate jurors",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-642.1.html`,
      summary:
        "Requires alternate jurors to attend when evidence presentation begins and to replace any absent juror in the order their cards were drawn, and requires any alternate not needed as a substitute to be excused.",
      relatedSections: ["631"],
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "643",
    {
      title: "Who shall be the jury",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-643.html`,
      summary:
        "Sets out that the 12 to 14 sworn jurors present when evidence begins form the jury, requires jurors' names to be kept apart until discharge or verdict, allows the same jury to try another issue by consent with replacement procedures if objected to, and provides that failure to follow these directions does not invalidate the proceeding.",
      relatedSections: ["631", "635", "641"],
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "644",
    {
      title: "Discharge of juror",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-644.html`,
      summary:
        "Allows a judge to discharge a juror who cannot continue due to illness or other reasonable cause and to select a replacement before evidence begins, allows the trial to continue with a reduced jury (not below ten) after a discharge or death, and allows the judge to discharge the jury and continue without one if the jury falls below ten, with the parties' consent.",
      relatedSections: ["642"],
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "645",
    {
      title: "Trial continuous",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-645.html`,
      summary:
        "Requires a trial to proceed continuously subject to the court's power to adjourn it without needing formal adjournment, and directs the judge to weigh the interests of justice, including any victim's interests, when deciding on an adjournment. Also allows a judge in a non-jury trial to reserve final decision on questions raised at trial or in a pre-hearing conference (deemed given at trial), and gives a judge in a jury trial jurisdiction to deal with matters ordinarily handled in the jury's absence before jurors are called under subsection 631(3) or (3.1).",
      relatedSections: ["631"],
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "646",
    {
      title: "Taking evidence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-646.html`,
      summary:
        "Provides that witness evidence and closing addresses in an indictable trial are to be taken according to the rules in Part XVIII governing evidence at preliminary inquiries, apart from certain excluded subsections.",
      relatedSections: ["540"],
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "647",
    {
      title: "Separation of jurors",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-647.html`,
      summary:
        "Allows a judge to permit jurors to separate before they retire to consider the verdict, and if separation is not permitted, requires an officer to keep the jury under charge and prevent unauthorized communication; a failure to comply does not affect validity, but the judge may discharge the jury and order a new trial if it might cause a miscarriage of justice, and the sheriff must provide the sworn jury with food, refreshment and lodging while together.",
      relatedSections: ["648"],
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "648",
    {
      title: "Restriction on publication",
      severity: "Summary",
      maxPenalty: "summary conviction (s. 787 default penalty applies unless otherwise stated)",
      url: `${JUSTICE_LAWS_BASE}/section-648.html`,
      summary:
        "Prohibits publishing, broadcasting or transmitting information about any part of a trial the jury was absent from once jurors have been permitted to separate and before they retire to consider the verdict, and makes failing to comply an offence.",
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "649",
    {
      title: "Disclosure of jury proceedings",
      severity: "Summary",
      maxPenalty: "summary conviction (s. 787 default penalty applies unless otherwise stated)",
      url: `${JUSTICE_LAWS_BASE}/section-649.html`,
      summary:
        "Makes it an offence for a jury member or a person providing support services to a juror with a disability to disclose information about jury deliberations that was not disclosed in open court, subject to exceptions for investigating or prosecuting related offences and for post-trial health care treatment, and requires that any health care professional providing such treatment be authorized under provincial law.",
      relatedSections: ["139"],
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "650",
    {
      title: "Accused to be present",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-650.html`,
      summary:
        "Requires an accused, other than an organization, to be present in court for their trial subject to certain exceptions, allows appearance by counsel with consent for parts of the trial not involving witness testimony, allows the court to remove a disruptive accused or permit the accused to be absent or removed during a fitness hearing, and entitles the accused to make full answer and defence after the prosecution's case closes.",
      relatedSections: ["650.01", "715.231", "715.241"],
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "650.01",
    {
      title: "Designation of counsel of record",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-650.01.html`,
      summary:
        "Allows an accused to appoint counsel of record by filing a designation, sets out what the designation must contain, and describes the effect of the designation including when the accused may appear only by counsel and when the court may still require the accused's own presence, including means to compel that presence.",
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "650.02",
    {
      title: "Remote appearance",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-650.02.html`,
      summary:
        "Allows the prosecutor or designated counsel to appear before the court by audioconference or videoconference if the technology is satisfactory to the court.",
      relatedSections: ["650.01"],
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "650.1",
    {
      title: "Pre-charge conference",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-650.1.html`,
      summary:
        "Allows a judge in a jury trial to confer with the accused or their counsel and the prosecutor before charging the jury about what should be explained to the jury and the choice of jury instructions.",
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "651",
    {
      title: "Summing up by prosecutor",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-651.html`,
      summary:
        "Sets out the order and entitlement of the prosecution and defence to address the jury by way of summing up, depending on whether the defence calls evidence and whether one or multiple accused are tried together.",
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "652",
    {
      title: "View",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-652.html`,
      summary:
        "Allows a judge, where it is in the interests of justice, to direct the jury to view a place, thing or person after being sworn and before verdict, with directions on how the view is conducted, directions to prevent improper communication with jurors (non-compliance with which does not affect validity), and requires the accused and judge to attend the view.",
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "652.1",
    {
      title: "Trying of issues of indictment by jury",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-652.1.html`,
      summary:
        "Requires the jury to retire to consider the verdict after the judge's charge, and sets out a procedure using numbered cards drawn from a box for reducing the jury to 12 members if more than 12 remain.",
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "653",
    {
      title: "Disagreement of jury",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-653.html`,
      summary:
        "Allows a judge who is satisfied a jury cannot agree and that further detention would be useless to discharge the jury and either empanel a new jury or adjourn the trial, and provides that this discretion is not reviewable.",
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "653.1",
    {
      title: "Mistrial — rulings binding at new trial",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-653.1.html`,
      summary:
        "Provides that in the case of a mistrial, rulings on disclosure, admissibility of evidence, or the Charter made (or that could have been made) before evidence on the merits began remain binding on the parties at a new trial, unless the court is satisfied that would not be in the interests of justice.",
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "654",
    {
      title: "Proceeding on Sunday, etc., not invalid",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-654.html`,
      summary:
        "States that taking a jury's verdict, or any related proceeding, is not invalid simply because it occurs on a Sunday or holiday.",
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "655",
    {
      title: "Admissions at trial",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-655.html`,
      summary:
        "Allows an accused or their counsel, at trial for an indictable offence, to admit any alleged fact in order to dispense with the need to prove it.",
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "656",
    {
      title: "Presumption — valuable minerals",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-656.html`,
      summary:
        "Creates a presumption that a person actively engaged in or on a mine who is found to possess a valuable unrefined or unprocessed mineral has stolen or unlawfully possessed it, unless evidence raises a reasonable doubt to the contrary.",
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "657",
    {
      title: "Use in evidence of statement by accused",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-657.html`,
      summary:
        "Allows a statement made by an accused under subsection 541(3) and appearing to be signed by the justice who took it to be given in evidence at trial without proving the justice's signature, unless it is proved the justice did not sign it.",
      relatedSections: ["541"],
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "657.1",
    {
      title: "Proof of ownership and value of property",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-657.1.html`,
      summary:
        "Allows an affidavit or solemn declaration by the owner or another knowledgeable person about property that was the subject of an offence, containing specified statements about ownership, value and how it was lost, to be admitted as evidence of those statements without proving the signature, provided notice is given, and allows the court to require the person to appear for examination.",
      relatedSections: ["342", "321"],
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "657.2",
    {
      title: "Theft and possession",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-657.2.html`,
      summary:
        "Allows evidence that another person was convicted or discharged of theft of property to be used against an accused charged with possessing that property as proof it was stolen, and allows evidence of another person's conviction or discharge of an offence to be used against an accused charged as accessory after the fact as proof the offence was committed.",
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "657.3",
    {
      title: "Expert testimony",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-657.3.html`,
      summary:
        "Allows expert evidence to be given by written report accompanied by an affidavit or solemn declaration if the court recognizes the person as an expert and notice was given, allows the court to require the expert to appear for examination, and sets out notice requirements for calling expert witnesses along with remedies available if those notice requirements are not met or a party cannot adequately prepare.",
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "657.4",
    {
      title: "Proof of absence of consent — identity information",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-657.4.html`,
      summary:
        "Allows an affidavit or solemn declaration from a person whose identity information was used to commit certain fraud-related offences, stating specified facts including lack of consent, to be admitted as evidence of those statements without proving the signature, subject to notice requirements and the court's power to require the person to appear for examination.",
      relatedSections: ["402.2", "403", "402.1"],
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "658",
    {
      title: "Testimony as to date of birth",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-658.html`,
      summary:
        "Allows a person's own testimony, or a parent's testimony, about a person's date of birth or age to be admitted as evidence of that fact, allows certain documents such as birth or baptismal certificates or institutional records to serve as evidence of age, and allows a court to rely on other reliable information or on a person's appearance to infer age in the absence of such records.",
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "659",
    {
      title: "Children’s evidence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-659.html`,
      summary:
        "Abolishes any mandatory requirement for a court to warn the jury about convicting an accused based on a child's evidence.",
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "660",
    {
      title: "Full offence charged, attempt proved",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-660.html`,
      summary:
        "Allows an accused to be convicted of an attempt where the complete offence charged is not proved but the evidence establishes an attempt to commit it.",
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "661",
    {
      title: "Attempt charged, full offence proved",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-661.html`,
      summary:
        "Provides that where an attempt is charged but the evidence proves the complete offence, the accused cannot be acquitted and the jury may convict of the attempt unless the judge discharges the jury and directs the accused be indicted for the complete offence, and provides that a conviction under this section bars a later trial for the completed offence.",
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "662",
    {
      title: "Offence charged, part only proved",
      severity: "Summary",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-662.html`,
      summary:
        "Allows an accused to be convicted of an included lesser offence or an attempt at it when the full offence charged is not proved, and sets out specific rules for convicting of lesser included offences in murder, infanticide, dangerous operation, child-luring, break and enter, and impaired-driving-causing-death type charges where the greater offence is not proved but a lesser included one is.",
      relatedSections: ["243", "220", "221", "236", "320.13", "263.1"],
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "663",
    {
      title: "No acquittal unless act or omission not wilful",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-663.html`,
      summary:
        "Allows a female person charged with infanticide to be convicted even if the evidence does not establish that she had not recovered from childbirth or lactation effects and that her mind was disturbed by those effects, unless the evidence shows the act or omission was not wilful.",
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "664",
    {
      title: "No reference to previous conviction",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-664.html`,
      summary:
        "Prohibits an indictment from referring to previous convictions when those convictions would allow a greater punishment to be imposed for the current offence.",
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "666",
    {
      title: "Evidence of character",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-666.html`,
      summary:
        "Allows the prosecutor to respond to defence evidence of the accused's good character by introducing evidence of the accused's previous convictions, including ones that could increase punishment, before a verdict is returned.",
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "667",
    {
      title: "Proof of previous conviction",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-667.html`,
      summary:
        "Sets out how certificates, fingerprint comparisons, and copies of prior convictions or discharges may be used as evidence of an accused's identity and criminal record without needing to prove the signature of the person who signed them, subject to notice requirements and the accused's right to require the certifying person to attend for cross-examination.",
      relatedSections: ["730"],
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "669.1",
    {
      title: "Jurisdiction",
      severity: "Summary",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-669.1.html`,
      summary:
        "Gives any judge or court with jurisdiction to try an accused authority to hear and adjudicate a matter if the original judge who took the plea has not yet begun hearing evidence, and allows adjournment of proceedings by various courts or officials at any stage before or after plea.",
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "669.2",
    {
      title: "Continuation of proceedings",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-669.2.html`,
      summary:
        "Allows proceedings to continue before a different judge, provincial court judge, justice or other person if the original one dies or becomes unable to continue, and sets out rules for how the continuing decision-maker proceeds depending on whether a verdict or adjudication was already made, including rules specific to jury trials and treatment of previously given evidence.",
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "669.3",
    {
      title: "Jurisdiction when appointment to another court",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-669.3.html`,
      summary:
        "Provides that a judge or provincial court judge conducting a trial retains jurisdiction over that trial until its completion even if appointed to another court during the trial.",
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "670",
    {
      title: "Judgment not to be stayed on certain grounds",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-670.html`,
      summary:
        "Prevents a judgment from being stayed or reversed after a jury verdict because of irregularities in summoning or empanelling the jury, or because a juror was not returned by a sheriff or other officer.",
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "671",
    {
      title: "Directions respecting jury or jurors directory",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-671.html`,
      summary:
        "Prevents a verdict from being impeached or quashed because of any omission to follow legislative directions about juror qualification, selection, balloting, distribution, the jurors' book, jury lists, or panel drafting.",
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "672",
    {
      title: "Saving powers of court",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.html`,
      summary:
        "Preserves any powers, authority, practices or forms relating to jury trials that existed before April 1, 1955, except where this Act expressly alters them or is inconsistent with them.",
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],

  // ── Part XX.1 — Mental Disorder ──
  [
    "672.1",
    {
      title: "Definitions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.1.html`,
      summary:
        "Defines terms used throughout this Part, including accused, assessment, chairperson, court, disposition, dual status offender, high-risk accused, hospital, medical practitioner, party, placement decision, prescribed, Review Board and verdict of not criminally responsible on account of mental disorder, and clarifies how references to a province's Attorney General apply for territories or federal proceedings.",
      relatedSections: ["672.11", "672.121", "785", "673", "672.54", "672.58"],
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.11",
    {
      title: "Assessment order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.11.html`,
      summary:
        "Allows a court with jurisdiction over an accused to order an assessment of the accused's mental condition where it has reasonable grounds to believe such evidence is needed to decide specified matters, including fitness to stand trial, criminal responsibility due to mental disorder, disturbed mind in an infanticide-related case, revocation of a high-risk designation, or a stay of proceedings for unfitness.",
      relatedSections: ["16", "672.84", "672.851"],
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.12",
    {
      title: "Where court may order assessment",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.12.html`,
      summary:
        "Allows the court to order an assessment on its own motion, on application of the accused, or on application of the prosecutor subject to specific limits requiring reasonable grounds or the accused having raised the relevant issue when the prosecutor applies regarding fitness for a summary offence or criminal responsibility due to mental disorder.",
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.121",
    {
      title: "Review Board may order assessment",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.121.html`,
      summary:
        "Allows a Review Board with jurisdiction over an accused found unfit or not criminally responsible to order an assessment on its own motion or on application, where needed to make a recommendation to the court, to make certain dispositions, or to decide whether to refer a high-risk finding for court review.",
      relatedSections: ["672.851", "672.54", "672.86", "672.84"],
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.13",
    {
      title: "Contents of assessment order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.13.html`,
      summary:
        "Sets out what an assessment order must specify, including who will conduct the assessment, whether the accused will be detained in custody, and the period the order will be in force, and states the prescribed forms it may use.",
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.14",
    {
      title: "General rule for period",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.14.html`,
      summary:
        "Limits how long an assessment order may remain in force, with a general maximum of thirty days, a shorter maximum of five days for fitness assessments unless the parties agree to a longer period up to thirty days, and an exception allowing up to sixty days where compelling circumstances exist.",
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.15",
    {
      title: "Extension",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.15.html`,
      summary:
        "Allows a court or Review Board to extend an assessment order for the period required to complete the assessment, subject to a maximum extension of thirty days and an overall maximum of sixty days including the initial order.",
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.16",
    {
      title: "Presumption against custody",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.16.html`,
      summary:
        "Sets out when an accused may be detained in custody under a court-ordered or Review Board-ordered assessment, generally presuming against custody unless specific grounds such as necessity, desirability with consent, other legal requirements, or existing detention circumstances apply, and allows medical evidence to be given by written report if the parties agree.",
      relatedSections: ["672.54", "672.121", "515", "522"],
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.17",
    {
      title: "Assessment order takes precedence over bail hearing",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.17.html`,
      summary:
        "Prevents any order for interim release or detention from being made under Part XVI or section 679 in respect of an offence, or an included offence, while a court-ordered assessment order concerning that offence is in force.",
      relatedSections: ["679"],
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.18",
    {
      title: "Application to vary assessment order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.18.html`,
      summary:
        "Allows the court to vary the terms of a court-made assessment order regarding the accused's interim release or detention if the prosecutor or accused shows cause while the order is in force.",
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.19",
    {
      title: "No treatment order on assessment",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.19.html`,
      summary:
        "Prohibits an assessment order from directing that the accused undergo psychiatric or other treatment or be required to submit to such treatment.",
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.191",
    {
      title: "When assessment completed",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.191.html`,
      summary:
        "Requires an accused subject to an assessment order to appear before the court or Review Board that made the order as soon as practicable after the assessment is completed, and no later than the last day the order is in force.",
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.2",
    {
      title: "Assessment report",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.2.html`,
      summary:
        "Allows an assessment order to require a written assessment report, requires the report to be filed with the court or Review Board within a set period, requires the court to forward a copy to the Review Board, and requires copies to be provided to the prosecutor, accused and defence counsel.",
      relatedSections: ["672.51"],
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.21",
    {
      title: "Definition of protected statement",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.21.html`,
      summary:
        "Defines a protected statement made by an accused during an assessment or treatment, generally makes such statements inadmissible without the accused's consent, and lists specific exceptions where such statements may be used, including fitness determinations, dispositions, high-risk reviews, criminal responsibility determinations, credibility challenges, and perjury prosecutions.",
      relatedSections: ["672.84", "16"],
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.22",
    {
      title: "Presumption of fitness",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.22.html`,
      summary:
        "Establishes a presumption that an accused is fit to stand trial unless the court is satisfied on the balance of probabilities that the accused is unfit.",
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.23",
    {
      title: "Court may direct issue to be tried",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.23.html`,
      summary:
        "Allows the court, where it has reasonable grounds to believe an accused is unfit to stand trial before a verdict is rendered, to direct that the issue of fitness be tried, and places the burden of proof on whichever party — accused or prosecutor — applies to have the issue tried.",
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.24",
    {
      title: "Counsel",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.24.html`,
      summary:
        "Requires the court to order that an unrepresented accused be represented by counsel where there are reasonable grounds to believe the accused is unfit to stand trial, provides that the Attorney General pays counsel's fees where legal aid is unavailable and the accused cannot pay, and allows fee disputes to be taxed by the court registrar.",
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.25",
    {
      title: "Postponing trial of issue",
      severity: "Summary",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.25.html`,
      summary:
        "Requires the court to postpone trying the issue of an accused's fitness until the prosecutor elects between indictment and summary conviction where that election is required, and allows postponement of the fitness trial to specified later points during a preliminary inquiry or trial.",
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.26",
    {
      title: "Trial of issue by judge and jury",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.26.html`,
      summary:
        "Sets out how a jury is sworn to try the issue of an accused's fitness when the trial is before a judge and jury, depending on whether the fitness issue is directed before or after the jury has been given the indictment.",
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.27",
    {
      title: "Trial of issue by court",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.27.html`,
      summary:
        "Requires the court itself to try the issue of an accused's fitness and render a verdict where the trial is not before a judge and jury, or where the issue arises at a preliminary inquiry or another stage of proceedings.",
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.28",
    {
      title: "Proceeding continues where accused is fit",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.28.html`,
      summary:
        "Provides that if the verdict on the fitness issue is that the accused is fit to stand trial, the proceeding continues as if the fitness issue had never been raised.",
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.29",
    {
      title: "Where continued detention in custody",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.29.html`,
      summary:
        "Allows a court to order an accused who has been found fit to stand trial, but remains in custody, to be detained in a hospital until trial ends if there are reasonable grounds to believe the accused would become unfit if released.",
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.3",
    {
      title: "Acquittal",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.3.html`,
      summary:
        "Provides that if trial of the fitness issue was postponed and the accused is discharged or acquitted before it is tried, the fitness issue shall not be tried.",
      relatedSections: ["672.25"],
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.31",
    {
      title: "Verdict of unfit to stand trial",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.31.html`,
      summary:
        "States that when the verdict on the fitness issue is that the accused is unfit to stand trial, any plea already made is set aside and any jury is discharged.",
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.32",
    {
      title: "Subsequent proceedings",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.32.html`,
      summary:
        "States that a verdict of unfit to stand trial does not prevent a later trial once the accused becomes fit, and that whoever asserts the accused has become fit bears the burden of proving it on a balance of probabilities.",
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.33",
    {
      title: "Prima facie case to be made every two years",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.33.html`,
      summary:
        "Requires the court to hold an inquiry at least every two years (or sooner on application) to decide whether enough evidence exists to put an unfit accused on trial, sets the burden of proof on the prosecutor, and requires acquittal if that evidence cannot be produced.",
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.34",
    {
      title: "Verdict of not criminally responsible on account of mental disorder",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.34.html`,
      summary:
        "Requires the trier of fact to render a verdict that the accused committed the act or omission charged but is not criminally responsible on account of mental disorder, where it finds the accused did the act but was exempt from responsibility under subsection 16(1).",
      relatedSections: ["16"],
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.35",
    {
      title: "Effect of verdict of not criminally responsible on account of mental disorder",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.35.html`,
      summary:
        "Sets out that a verdict of not criminally responsible on account of mental disorder is not a conviction, but allows the accused to plead autrefois acquit later, and permits courts and parole boards to take the verdict into account in later release, sentencing, or parole decisions.",
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.36",
    {
      title: "Verdict not a previous conviction",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.36.html`,
      summary:
        "States that a verdict of not criminally responsible on account of mental disorder does not count as a previous conviction for purposes of enhanced punishment provisions tied to prior convictions.",
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.37",
    {
      title: "Definition of application for federal employment",
      severity: "Summary",
      maxPenalty: "summary conviction (s. 787 default penalty applies unless otherwise stated)",
      url: `${JUSTICE_LAWS_BASE}/section-672.37.html`,
      summary:
        "Defines \"application for federal employment\" and prohibits such applications from requiring disclosure of a charge or finding of not criminally responsible on account of mental disorder where the applicant was absolutely discharged or is no longer subject to any disposition; using a form that violates this is an offence punishable on summary conviction.",
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.38",
    {
      title: "Review Boards to be established",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.38.html`,
      summary:
        "Requires each province to establish or designate a Review Board of at least five members, appointed provincially, to make or review dispositions for accused persons found NCRMD or unfit to stand trial, and shields members from personal liability for good-faith acts.",
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.39",
    {
      title: "Members of Review Board",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.39.html`,
      summary:
        "Requires a Review Board to include at least one member entitled to practise psychiatry, and if only one such member exists, at least one other member with mental health training entitled to practise medicine or psychology.",
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.4",
    {
      title: "Chairperson of a Review Board",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.4.html`,
      summary:
        "Requires the chairperson of a Review Board to be a judge or a person qualified for or retired from such judicial office, with a transitional exception allowing an existing non-judicial chairperson to continue under certain conditions.",
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.41",
    {
      title: "Quorum of Review Board",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.41.html`,
      summary:
        "Sets the quorum of a Review Board as the chairperson, a psychiatrist member, and one other member, with a modified quorum rule during a transitional period for boards whose chairperson does not meet the usual judicial qualification.",
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.42",
    {
      title: "Majority vote",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.42.html`,
      summary:
        "States that a decision of a majority of members present and voting constitutes the decision of a Review Board.",
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.43",
    {
      title: "Powers of Review Boards",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.43.html`,
      summary:
        "Gives the chairperson of a Review Board, at a disposition hearing, the same powers conferred on commissioners under the Inquiries Act.",
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.44",
    {
      title: "Rules of Review Board",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.44.html`,
      summary:
        "Allows a Review Board to make rules of practice and procedure subject to provincial approval and publication in the Canada Gazette, while permitting the Governor in Council to make overriding regulations to standardize Review Board procedure.",
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.45",
    {
      title: "Hearing to be held by a court",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.45.html`,
      summary:
        "Allows a court to hold, and requires it to hold on application, a disposition hearing after a verdict of NCRMD or unfit to stand trial, requires transmittal of proceedings to the Review Board if the court does not hold a hearing, and requires the court to make a disposition if it can readily do so without delay.",
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.46",
    {
      title: "Status quo pending Review Board hearing",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.46.html`,
      summary:
        "Provides that if the court does not make a disposition at a disposition hearing, any existing detention or release order continues in force until the Review Board acts, but allows the court to vary that order for cause pending the Review Board's decision.",
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.47",
    {
      title: "Review Board to make disposition where court does not",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.47.html`,
      summary:
        "Requires the Review Board to hold a hearing and make a disposition within set time limits (generally 45 or 90 days, with possible extensions) after a verdict of NCRMD or unfit to stand trial where the court itself made no disposition, or after certain court dispositions, including special timelines where the accused is found to be high-risk.",
      relatedSections: ["672.54", "672.64"],
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.48",
    {
      title: "Review Board to determine fitness",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.48.html`,
      summary:
        "Requires the Review Board, when holding a hearing for an accused found unfit to stand trial, to determine current fitness and send the accused back to court if fit, and allows the chairperson to do the same with the accused's and hospital's consent under specified conditions.",
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.49",
    {
      title: "Continued detention in hospital",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.49.html`,
      summary:
        "Allows the Review Board or chairperson to require continued hospital detention of an accused pending a court determination of fitness where there are reasonable grounds the accused would become unfit if released, and requires a copy of the disposition be sent to the court and Attorney General.",
      relatedSections: ["672.47"],
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.5",
    {
      title: "Procedure at disposition hearing",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.5.html`,
      summary:
        "Sets out detailed procedural rules for disposition hearings before a court or Review Board, covering party status, notice, public exclusion, right to counsel, the accused's presence and removal, evidence and cross-examination, remote appearance, adjournments, and victim impact statement procedures.",
      relatedSections: ["672.84", "672.54", "672.45", "672.47", "672.64"],
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.501",
    {
      title: "Order restricting publication — sexual offences",
      severity: "Summary",
      maxPenalty: "summary conviction (s. 787 default penalty applies unless otherwise stated)",
      url: `${JUSTICE_LAWS_BASE}/section-672.501.html`,
      summary:
        "Requires or allows a Review Board to order publication bans protecting the identity of victims or young witnesses in certain hearings, sets factors for granting a discretionary ban, and makes it a summary offence to breach such an order.",
      relatedSections: ["672.5", "486.4", "163.1"],
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.5011",
    {
      title: "Variation or revocation of order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.5011.html`,
      summary:
        "Requires the Review Board, on application and generally without a hearing, to vary or revoke a publication-ban order made under section 672.501, unless doing so could affect another protected person's privacy interests, in which case a hearing is held.",
      relatedSections: ["672.501"],
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.51",
    {
      title: "Definition of disposition information",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.51.html`,
      summary:
        "Defines \"disposition information\" and sets rules for when it must be disclosed to parties, when it must or may be withheld from the accused or other parties to protect safety or treatment, and when it may be released to researchers or others in the public interest.",
      relatedSections: ["672.5"],
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.52",
    {
      title: "Record of proceedings",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.52.html`,
      summary:
        "Requires a record of disposition hearing proceedings, including assessment reports, to be kept, requires transmittal of the transcript to the Review Board where applicable, and requires reasons for the disposition to be stated and provided to the parties.",
      relatedSections: ["672.45"],
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.53",
    {
      title: "Proceedings not invalid",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.53.html`,
      summary:
        "States that a procedural irregularity in a disposition hearing does not invalidate the hearing unless it causes the accused substantial prejudice.",
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.54",
    {
      title: "Dispositions that may be made",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.54.html`,
      summary:
        "Sets out the three dispositions a court or Review Board may make (absolute discharge, conditional discharge, or hospital detention), directing that public safety is the paramount consideration alongside the accused's mental condition, reintegration, and other needs.",
      relatedSections: ["672.45", "672.47", "672.64", "672.83", "672.84"],
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.5401",
    {
      title: "Significant threat to safety of public",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.5401.html`,
      summary:
        "Defines \"significant threat to the safety of the public\" as a risk of serious physical or psychological harm to the public, including victims, witnesses, or persons under 18, from criminal but not necessarily violent conduct.",
      relatedSections: ["672.54"],
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.541",
    {
      title: "Victim impact statement",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.541.html`,
      summary:
        "Requires the court or Review Board to consider a victim's filed impact statement when determining the appropriate disposition, conditions, or when deciding whether an accused is or remains a high-risk accused, at various specified hearings.",
      relatedSections: ["672.45", "672.47", "672.64", "672.81", "672.82", "672.84"],
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.542",
    {
      title: "Additional conditions — safety and security",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.542.html`,
      summary:
        "Requires the court or Review Board to consider including conditions in a disposition, such as no-contact or exclusion-zone conditions, to protect the safety of victims, witnesses, or justice system participants.",
      relatedSections: ["672.5"],
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.55",
    {
      title: "Treatment not a condition",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.55.html`,
      summary:
        "Prohibits a disposition from directing that the accused undergo psychiatric or other treatment, except that a condition regarding treatment may be included if the accused consents and the court or Review Board considers it reasonable and necessary.",
      relatedSections: ["672.54"],
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.56",
    {
      title: "Delegated authority to vary restrictions on liberty of accused",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.56.html`,
      summary:
        "Allows a Review Board to delegate authority to a hospital's person in charge to vary restrictions on the accused's liberty within set limits, subject to added restrictions for high-risk accused, and requires notice and record-keeping when restrictions are significantly increased.",
      relatedSections: ["672.54", "672.64"],
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.57",
    {
      title: "Warrant of committal",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.57.html`,
      summary:
        "Requires a warrant of committal to be issued when the court or Review Board orders hospital detention under paragraph 672.54(c).",
      relatedSections: ["672.54"],
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.58",
    {
      title: "Treatment disposition",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.58.html`,
      summary:
        "Allows a court, on the prosecutor's application, to order treatment of an accused found unfit to stand trial for up to sixty days, on specified conditions, where no other disposition has been made.",
      relatedSections: ["672.54"],
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.59",
    {
      title: "Criteria for disposition",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.59.html`,
      summary:
        "Sets the criteria for a treatment order under section 672.58, requiring a medical practitioner's testimony that the accused is unfit, that specified treatment will likely restore fitness within sixty days, that the treatment's risk is not disproportionate to its benefit, and that it is the least restrictive and intrusive option available.",
      relatedSections: ["672.58"],
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.6",
    {
      title: "Notice required",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.6.html`,
      summary:
        "Requires the prosecutor to notify the accused in writing of an application for a treatment order before the court may make it, and allows the accused to challenge the application and present evidence.",
      relatedSections: ["672.58"],
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.61",
    {
      title: "Exception",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.61.html`,
      summary:
        "Bars a treatment order from including psychosurgery, electro-convulsive therapy, or any other prescribed prohibited treatment, and defines those two terms.",
      relatedSections: ["672.58"],
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.62",
    {
      title: "Consent of hospital required for treatment",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.62.html`,
      summary:
        "Requires the consent of the hospital's person in charge or the person assigned responsibility for treatment before a treatment order can be made, but allows the court to order treatment without the accused's own consent.",
      relatedSections: ["672.58"],
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.63",
    {
      title: "Effective date of disposition",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.63.html`,
      summary:
        "States that a disposition comes into force on the day made or a later specified day and remains in force until the Review Board reviews it and makes another disposition.",
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.64",
    {
      title: "Finding",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.64.html`,
      summary:
        "Allows a court, on the prosecutor's application, to find an accused a high-risk accused where certain violence or brutality criteria are met, sets the factors the court must consider, requires hospital detention with restricted absence conditions for such accused, and makes the finding (or a refusal to make it) appealable.",
      relatedSections: ["672.81", "672.54", "672.72", "672.78"],
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.67",
    {
      title: "Where court imposes a sentence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.67.html`,
      summary:
        "Provides that where a dual status offender receives both a prison sentence and a custodial disposition, whichever is imposed later takes precedence over the earlier one pending a Review Board placement decision.",
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.68",
    {
      title: "Definition of Minister",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.68.html`,
      summary:
        "Defines \"Minister\" for these provisions and sets out the process and factors by which the Review Board decides whether a dual status offender should be held in a hospital or a prison, including timelines for making that placement decision.",
      relatedSections: ["672.69", "672.7"],
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.69",
    {
      title: "Minister and Review Board entitled to access",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.69.html`,
      summary:
        "Gives the Minister and Review Board access to a dual status offender for purposes of reviewing a sentence or disposition, sets out when the Review Board must or may hold a hearing to review a placement decision, and requires the Minister to be a party to such proceedings.",
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.7",
    {
      title: "Notice of discharge",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.7.html`,
      summary:
        "Requires the Minister and Review Board to give each other written notice of the time, place, and conditions when intending to discharge a dual status offender from custody, and requires a warrant of committal when a placement decision is made.",
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.71",
    {
      title: "Detention to count as service of term",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.71.html`,
      summary:
        "Provides that each day a dual status offender is detained under a placement decision or custodial disposition counts as a day served on their prison term, and that a custodial disposition takes precedence over a probation order in specified circumstances.",
      relatedSections: ["730", "732.2"],
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.72",
    {
      title: "Grounds for appeal",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.72.html`,
      summary:
        "Allows any party to appeal a disposition or placement decision to the court of appeal on questions of law, fact, or mixed law and fact, sets a fifteen-day notice period, and requires the appeal to be heard expeditiously.",
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.73",
    {
      title: "Appeal on the transcript",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.73.html`,
      summary:
        "Requires an appeal of a disposition or placement decision to be based on the transcript of proceedings and any additional evidence the court of appeal finds necessary, applying the usual rules for admitting additional evidence.",
      relatedSections: ["683"],
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.74",
    {
      title: "Notice of appeal to be given to court or Review Board",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.74.html`,
      summary:
        "Sets out the administrative steps for notifying the court or Review Board of an appeal, transmitting the record to the court of appeal, keeping that record, and providing a transcript, while providing that the appeal is not dismissed solely for another person's non-compliance.",
      relatedSections: ["540"],
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.75",
    {
      title: "Automatic suspension of certain dispositions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.75.html`,
      summary:
        "States that filing a notice of appeal against a treatment order made under section 672.58 automatically suspends that order pending the appeal's outcome.",
      relatedSections: ["672.58"],
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.76",
    {
      title: "Application respecting dispositions under appeal",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.76.html`,
      summary:
        "Allows a party to apply to a judge of the court of appeal for orders respecting a disposition or placement decision under appeal, including directing that a treatment order proceed, suspending certain dispositions, making interim dispositions or placement decisions, and giving directions to expedite the appeal.",
      relatedSections: ["672.58", "672.54", "672.75"],
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.77",
    {
      title: "Effect of suspension of disposition",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.77.html`,
      summary:
        "Provides that when a disposition or placement decision under appeal is suspended, the prior disposition or release/detention order that was in effect remains in force pending the appeal, subject to any interim disposition made under paragraph 672.76(2)(c).",
      relatedSections: ["672.76"],
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.78",
    {
      title: "Powers of court of appeal",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.78.html`,
      summary:
        "Sets out when a court of appeal may allow an appeal against a Review Board disposition or placement decision (unreasonable, wrong in law, or a miscarriage of justice) versus dismiss it, and the orders it may make if the appeal is allowed, including making its own disposition or sending the matter back for re-hearing.",
      relatedSections: ["672.54"],
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.81",
    {
      title: "Mandatory review of dispositions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.81.html`,
      summary:
        "Requires a Review Board to hold periodic hearings to review dispositions it has made, sets rules for extending the time between hearings in certain cases (including for high-risk accused), and requires additional reviews when custody status or restrictions on liberty change.",
      relatedSections: ["672.54", "672.51", "672.121", "672.47", "672.56", "672.72"],
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.82",
    {
      title: "Discretionary review",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.82.html`,
      summary:
        "Allows a Review Board to hold a discretionary hearing to review any of its dispositions at any time, on its own motion or on request, and provides that requesting such a review is deemed abandonment of any pending appeal of that disposition.",
      relatedSections: ["672.72"],
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.83",
    {
      title: "Disposition by Review Board",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.83.html`,
      summary:
        "Requires the Review Board, at a mandatory or discretionary review hearing, to review the existing disposition and make whatever new disposition it considers appropriate, unless the accused has been found fit to stand trial.",
      relatedSections: ["672.81", "672.82", "672.48"],
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.84",
    {
      title: "Review of finding — high-risk accused",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.84.html`,
      summary:
        "Sets out the process for reviewing findings about a high-risk accused, including when the Review Board must refer the matter to a superior court, what the court does on review, and how conditions of detention are reviewed depending on the outcome.",
      relatedSections: ["672.81", "672.82", "672.51", "672.121", "672.64", "672.54"],
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.85",
    {
      title: "Bringing accused before Review Board",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.85.html`,
      summary:
        "Authorizes the chairperson of the Review Board to order that an accused be brought to a hearing, or to issue a summons or warrant to compel an accused who is not in custody to appear.",
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.851",
    {
      title: "Recommendation by Review Board",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.851.html`,
      summary:
        "Sets out when a Review Board or a court may inquire into whether a stay of proceedings should be ordered for an accused found unfit to stand trial who is unlikely to ever become fit, including the notice, assessment, and factors the court considers, and the effect of granting or not granting a stay.",
      relatedSections: ["672.81", "672.82", "672.51", "672.121", "672.33", "672.83"],
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.852",
    {
      title: "Appeal",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.852.html`,
      summary:
        "Allows the Court of Appeal to allow an appeal against an order staying proceedings if the order is unreasonable or unsupported by the evidence, and if allowed, to set aside the stay and restore the earlier unfit-to-stand-trial finding and disposition.",
      relatedSections: ["672.851"],
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.86",
    {
      title: "Interprovincial transfers",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.86.html`,
      summary:
        "Sets out the conditions under which an accused subject to a custody or hospital-attendance disposition may be transferred to another province, including required recommendations and consents, and how a warrant is issued for the transfer.",
      relatedSections: ["672.54", "672.58"],
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.87",
    {
      title: "Delivery and detention of accused",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.87.html`,
      summary:
        "Provides that a transfer warrant authorizes custodial staff to convey the accused to the receiving location and authorizes the person there to detain the accused under the existing disposition.",
      relatedSections: ["672.86", "672.54"],
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.88",
    {
      title: "Review Board of receiving province",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.88.html`,
      summary:
        "Gives the Review Board of the receiving province exclusive jurisdiction over a transferred accused, exercising the same powers as if it had made the disposition itself, unless the provinces agree otherwise.",
      relatedSections: ["672.86", "672.5", "672.81", "672.82", "672.83", "672.84"],
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.89",
    {
      title: "Other interprovincial transfers",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.89.html`,
      summary:
        "Addresses interprovincial transfers made outside the section 672.86 process, providing that the Review Board of the originating province keeps jurisdiction unless the provinces enter into an agreement transferring it to the receiving province's Review Board.",
      relatedSections: ["672.86", "672.5", "672.81", "672.82", "672.83", "672.84"],
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.9",
    {
      title: "Execution of warrant anywhere in Canada",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.9.html`,
      summary:
        "Allows any warrant or process related to an assessment order or disposition to be executed or served anywhere in Canada outside the province where it was made.",
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.91",
    {
      title: "Arrest without warrant for contravention of disposition",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.91.html`,
      summary:
        "Authorizes a peace officer to arrest an accused without a warrant anywhere in Canada if there are reasonable grounds to believe the accused has breached, or is about to breach, an assessment order or disposition or its conditions.",
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.92",
    {
      title: "Release or delivery of accused subject to paragraph 672.54(b) disposition order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.92.html`,
      summary:
        "Sets out a peace officer's options after arresting an accused under section 672.91 for breaching a disposition or assessment order, including when the accused may be released and required to attend a specified place or appear before a justice, versus when the accused must be brought before a justice within 24 hours.",
      relatedSections: ["672.91", "672.54"],
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.93",
    {
      title: "Where justice to release accused",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.93.html`,
      summary:
        "Requires a justice to release an arrested accused unless satisfied there are reasonable grounds to believe a breach occurred, and sets out what orders the justice may make pending a Review Board or court hearing, along with notice requirements.",
      relatedSections: ["672.92"],
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.94",
    {
      title: "Powers of Review Board",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.94.html`,
      summary:
        "Provides that when a Review Board receives notice of a justice's release or interim order, it may exercise the same powers and duties as when reviewing a disposition.",
      relatedSections: ["672.93", "672.5", "672.81", "672.82", "672.83"],
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.95",
    {
      title: "Regulations",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.95.html`,
      summary:
        "Authorizes the Governor in Council to make regulations prescribing matters under this Part and generally carrying out its purposes.",
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],

  // ── Part XXI — Appeals — Indictable Offences ──
  [
    "673",
    {
      title: "Definitions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-673.html`,
      summary:
        "Defines terms used in this Part, including 'court of appeal', 'indictment', 'registrar', 'sentence', and 'trial court'.",
      relatedSections: ["199", "109", "110", "161", "164.2", "194"],
      partOf: "Part XXI — Appeals — Indictable Offences",
    },
  ],
  [
    "674",
    {
      title: "Procedure abolished",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-674.html`,
      summary:
        "Provides that no appeal proceedings in respect of indictable offences may be taken except as authorized by this Part and Part XXVI.",
      partOf: "Part XXI — Appeals — Indictable Offences",
    },
  ],
  [
    "675",
    {
      title: "Right of appeal of person convicted",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-675.html`,
      summary:
        "Sets out the grounds and conditions on which a person convicted by indictment may appeal their conviction or sentence to the court of appeal, including special rules for certain sentences, summary conviction matters, mental disorder verdicts, and refused leave applications.",
      relatedSections: ["236", "743.6", "745.51"],
      partOf: "Part XXI — Appeals — Indictable Offences",
    },
  ],
  [
    "676",
    {
      title: "Right of Attorney General to appeal",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-676.html`,
      summary:
        "Sets out the grounds on which the Attorney General may appeal acquittals, verdicts of not criminally responsible, jurisdictional rulings, stays, sentences, unfitness verdicts, and certain parole-ineligibility decisions to the court of appeal.",
      relatedSections: ["730", "236", "743.6", "745.51"],
      partOf: "Part XXI — Appeals — Indictable Offences",
    },
  ],
  [
    "676.1",
    {
      title: "Appeal re costs",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-676.1.html`,
      summary:
        "Allows a party ordered to pay costs to appeal that order or the amount, with leave of the court of appeal or one of its judges.",
      partOf: "Part XXI — Appeals — Indictable Offences",
    },
  ],
  [
    "677",
    {
      title: "Specifying grounds of dissent",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-677.html`,
      summary:
        "Requires that when a judge of the court of appeal dissents, the court's judgment must specify the legal grounds on which the dissent is based.",
      partOf: "Part XXI — Appeals — Indictable Offences",
    },
  ],
  [
    "678",
    {
      title: "Notice of appeal",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-678.html`,
      summary:
        "Requires an appellant to give notice of appeal or of an application for leave to appeal in the manner and time set by rules of court, and allows the court of appeal to extend that time.",
      partOf: "Part XXI — Appeals — Indictable Offences",
    },
  ],
  [
    "678.1",
    {
      title: "Service where respondent cannot be found",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-678.1.html`,
      summary:
        "Allows substitutional service of a notice of appeal or leave application on a respondent who cannot be found, in the manner and period a judge of the court of appeal directs.",
      partOf: "Part XXI — Appeals — Indictable Offences",
    },
  ],
  [
    "679",
    {
      title: "Release pending determination of appeal",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-679.html`,
      summary:
        "Sets out the process and conditions for a court of appeal judge to release an appellant from custody pending determination of an appeal, including notice requirements, the tests to be met, required release conditions, and related provisions for new trials and expediting appeals.",
      relatedSections: ["678", "515", "522", "524", "696.3", "495.1"],
      partOf: "Part XXI — Appeals — Indictable Offences",
    },
  ],
  [
    "680",
    {
      title: "Review by court of appeal",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-680.html`,
      summary:
        "Allows certain bail-related decisions of a single judge to be reviewed by the court of appeal on direction of the chief justice, which may confirm, vary, or substitute the decision, and allows this power to be exercised by a single judge on consent of the parties.",
      relatedSections: ["522", "524", "320.25", "679"],
      partOf: "Part XXI — Appeals — Indictable Offences",
    },
  ],
  [
    "682",
    {
      title: "Report by judge",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-682.html`,
      summary:
        "Requires the trial judge to provide the court of appeal with a report on the case when requested, and sets out what transcripts and materials must be furnished to the court of appeal and to parties or the Minister of Justice.",
      partOf: "Part XXI — Appeals — Indictable Offences",
    },
  ],
  [
    "683",
    {
      title: "Powers of court of appeal",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-683.html`,
      summary:
        "Grants the court of appeal broad powers in the interests of justice, including ordering production of evidence, examining witnesses, referring complex questions to a commissioner, amending the indictment, and suspending certain sentence obligations pending appeal.",
      relatedSections: ["738", "739", "737", "731", "742.1", "714.1"],
      partOf: "Part XXI — Appeals — Indictable Offences",
    },
  ],
  [
    "684",
    {
      title: "Legal assistance for appellant",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-684.html`,
      summary:
        "Allows a court of appeal or judge to assign counsel to an accused who needs legal assistance for an appeal and cannot afford it, and sets out how counsel's fees are paid and disputes over fees resolved.",
      partOf: "Part XXI — Appeals — Indictable Offences",
    },
  ],
  [
    "685",
    {
      title: "Summary determination of frivolous appeals",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-685.html`,
      summary:
        "Allows the registrar to refer an appeal lacking a substantial legal ground to the court of appeal for summary dismissal as frivolous or vexatious, and allows a judge to summarily dismiss an appeal that was filed with the wrong court.",
      partOf: "Part XXI — Appeals — Indictable Offences",
    },
  ],
  [
    "686",
    {
      title: "Powers",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-686.html`,
      summary:
        "Sets out the court of appeal's powers when hearing an appeal against conviction or a mental-disorder-related verdict, including when it must allow or may dismiss the appeal, substitute verdicts, order new trials, and the procedures that apply to new trials under Part XIX.",
      relatedSections: ["672.45", "553", "561", "561.1"],
      partOf: "Part XXI — Appeals — Indictable Offences",
    },
  ],
  [
    "687",
    {
      title: "Powers of court on appeal against sentence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-687.html`,
      summary:
        "Requires the court of appeal, on a sentence appeal, to consider the fitness of the sentence and either vary it within legal limits or dismiss the appeal, with a varied sentence having the same effect as one passed by the trial court.",
      partOf: "Part XXI — Appeals — Indictable Offences",
    },
  ],
  [
    "688",
    {
      title: "Right of appellant to attend",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-688.html`,
      summary:
        "Sets out an appellant's right to be present at the hearing of an appeal while in custody, exceptions where represented appellants are not entitled to attend certain proceedings, provisions for remote appearance, and the court's power to impose sentence in the appellant's absence.",
      partOf: "Part XXI — Appeals — Indictable Offences",
    },
  ],
  [
    "689",
    {
      title: "Restitution or forfeiture of property",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-689.html`,
      summary:
        "Provides that compensation, restitution, or forfeiture orders made at trial are suspended pending the appeal period or an appeal's determination, and allows the court of appeal to annul or vary such orders.",
      relatedSections: ["738", "739", "164.2", "462.37"],
      partOf: "Part XXI — Appeals — Indictable Offences",
    },
  ],
  [
    "691",
    {
      title: "Appeal from conviction",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-691.html`,
      summary:
        "Sets out when a person convicted of an indictable offence, or whose acquittal was set aside by the court of appeal, may appeal further to the Supreme Court of Canada.",
      partOf: "Part XXI — Appeals — Indictable Offences",
    },
  ],
  [
    "692",
    {
      title: "Appeal against affirmation of verdict of not criminally responsible on account of mental disorder",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-692.html`,
      summary:
        "Sets out when a person found not criminally responsible on account of mental disorder, or found unfit to stand trial, whose verdict is affirmed by the court of appeal, may appeal to the Supreme Court of Canada.",
      relatedSections: ["686"],
      partOf: "Part XXI — Appeals — Indictable Offences",
    },
  ],
  [
    "693",
    {
      title: "Appeal by Attorney General",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-693.html`,
      summary:
        "Sets out when the Attorney General may appeal to the Supreme Court of Canada after a court of appeal sets aside a conviction or dismisses certain Attorney General appeals, and allows the Supreme Court to impose terms when granting leave.",
      relatedSections: ["675", "676"],
      partOf: "Part XXI — Appeals — Indictable Offences",
    },
  ],
  [
    "694",
    {
      title: "Notice of appeal",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-694.html`,
      summary:
        "Provides that no appeal lies to the Supreme Court of Canada unless written notice of appeal is served on the respondent as required by the Supreme Court Act.",
      partOf: "Part XXI — Appeals — Indictable Offences",
    },
  ],
  [
    "694.1",
    {
      title: "Legal assistance for accused",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-694.1.html`,
      summary:
        "Allows the Supreme Court of Canada to assign counsel to an accused who cannot afford legal assistance for an appeal, with fees paid by the Attorney General and taxed by the Registrar if disputed.",
      partOf: "Part XXI — Appeals — Indictable Offences",
    },
  ],
  [
    "694.2",
    {
      title: "Right of appellant to attend",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-694.2.html`,
      summary:
        "Gives an accused in custody the right to attend their Supreme Court of Canada appeal hearing, but if represented by counsel they are not entitled to be present at certain proceedings unless the rules or the Court permit it.",
      partOf: "Part XXI — Appeals — Indictable Offences",
    },
  ],
  [
    "695",
    {
      title: "Order of Supreme Court of Canada",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-695.html`,
      summary:
        "Allows the Supreme Court of Canada to make any order a court of appeal could have made, and sets out how an accused may elect the mode of a new trial ordered by the Court, including special rules for Nunavut.",
      relatedSections: ["561", "561.1"],
      partOf: "Part XXI — Appeals — Indictable Offences",
    },
  ],
  [
    "696",
    {
      title: "Right of Attorney General of Canada to appeal",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-696.html`,
      summary:
        "Gives the Attorney General of Canada the same rights of appeal in federally instituted proceedings as a provincial Attorney General has under this Part.",
      partOf: "Part XXI — Appeals — Indictable Offences",
    },
  ],

  // ── Part XXI.1 — Applications for Ministerial Review — Miscarriages of Justice ──
  [
    "696.1",
    {
      title: "Application",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-696.1.html`,
      summary:
        "Sets out who may apply to the Minister of Justice for review on grounds of miscarriage of justice and requires the application to follow the form and content prescribed by regulations.",
      partOf: "Part XXI.1 — Applications for Ministerial Review — Miscarriages of Justice",
    },
  ],
  [
    "696.2",
    {
      title: "Review of applications",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-696.2.html`,
      summary:
        "Describes the Minister of Justice's review process for such applications, including investigative powers under the Inquiries Act and the ability to delegate those powers to qualified individuals.",
      partOf: "Part XXI.1 — Applications for Ministerial Review — Miscarriages of Justice",
    },
  ],
  [
    "696.3",
    {
      title: "Definition of court of appeal",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-696.3.html`,
      summary:
        "Defines 'court of appeal' for this section and sets out the Minister of Justice's powers to refer questions to a court of appeal, order a new trial or hearing, refer the matter to the court of appeal, or dismiss the application, with no appeal from that decision.",
      relatedSections: ["2"],
      partOf: "Part XXI.1 — Applications for Ministerial Review — Miscarriages of Justice",
    },
  ],
  [
    "696.4",
    {
      title: "Considerations",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-696.4.html`,
      summary:
        "Lists factors the Minister of Justice must consider in deciding an application, including new significant information, reliability of information presented, and that the remedy is extraordinary rather than a further appeal.",
      relatedSections: ["696.3"],
      partOf: "Part XXI.1 — Applications for Ministerial Review — Miscarriages of Justice",
    },
  ],
  [
    "696.5",
    {
      title: "Annual report",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-696.5.html`,
      summary:
        "Requires the Minister of Justice to submit an annual report to Parliament on applications made under this Part.",
      partOf: "Part XXI.1 — Applications for Ministerial Review — Miscarriages of Justice",
    },
  ],
  [
    "696.6",
    {
      title: "Regulations",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-696.6.html`,
      summary:
        "Authorizes the Governor in Council to make regulations governing application form and content, the review process, and the annual report.",
      relatedSections: ["696.5"],
      partOf: "Part XXI.1 — Applications for Ministerial Review — Miscarriages of Justice",
    },
  ],

  // ── Part XXI.2 — Miscarriage of Justice Review Commission ──
  [
    "696.7",
    {
      title: "Definitions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-696.7.html`,
      summary:
        "Defines terms used in this Part, including 'applicant,' 'Commission' (the Miscarriage of Justice Review Commission), and 'Minister.'",
      relatedSections: ["696.71"],
      partOf: "Part XXI.2 — Miscarriage of Justice Review Commission",
    },
  ],
  [
    "696.71",
    {
      title: "Commission established",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-696.71.html`,
      summary:
        "Establishes the Miscarriage of Justice Review Commission, sets its composition of a Chief Commissioner and four to eight other commissioners, and requires a Canadian head office.",
      partOf: "Part XXI.2 — Miscarriage of Justice Review Commission",
    },
  ],
  [
    "696.72",
    {
      title: "Mandate",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-696.72.html`,
      summary:
        "Sets out the Commission's mandate to review miscarriage of justice applications and make recommendations addressing systemic issues to relevant authorities.",
      partOf: "Part XXI.2 — Miscarriage of Justice Review Commission",
    },
  ],
  [
    "696.73",
    {
      title: "Diversity",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-696.73.html`,
      summary:
        "Requires the Minister, in recommending commissioner appointments, to seek diversity reflecting Canadian society, including gender equality and the overrepresentation of certain groups.",
      partOf: "Part XXI.2 — Miscarriage of Justice Review Commission",
    },
  ],
  [
    "696.74",
    {
      title: "Full- or part-time commissioners",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-696.74.html`,
      summary:
        "States that the Chief Commissioner is a full-time commissioner, while other commissioners may be appointed full-time or part-time.",
      partOf: "Part XXI.2 — Miscarriage of Justice Review Commission",
    },
  ],
  [
    "696.75",
    {
      title: "Knowledge and experience",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-696.75.html`,
      summary:
        "Requires commissioners to have relevant knowledge and experience, sets a minimum proportion who must be lawyers with criminal law experience, and requires diversity among the remaining commissioners.",
      partOf: "Part XXI.2 — Miscarriage of Justice Review Commission",
    },
  ],
  [
    "696.76",
    {
      title: "Role of Chief Commissioner",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-696.76.html`,
      summary:
        "Makes the Chief Commissioner the chief executive of the Commission and allows another qualified commissioner to act in that role temporarily if the Chief Commissioner is absent, incapacitated, or the office is vacant.",
      relatedSections: ["696.75"],
      partOf: "Part XXI.2 — Miscarriage of Justice Review Commission",
    },
  ],
  [
    "696.77",
    {
      title: "Term of office",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-696.77.html`,
      summary:
        "Sets commissioners' terms of office at up to seven years, staggered where possible, allows reappointment, and permits removal for cause by the Governor in Council.",
      partOf: "Part XXI.2 — Miscarriage of Justice Review Commission",
    },
  ],
  [
    "696.78",
    {
      title: "Remuneration",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-696.78.html`,
      summary:
        "Provides for commissioners' remuneration and reasonable expenses and deems them employees for compensation and aeronautics regulation purposes.",
      partOf: "Part XXI.2 — Miscarriage of Justice Review Commission",
    },
  ],
  [
    "696.79",
    {
      title: "Meetings",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-696.79.html`,
      summary:
        "Sets out meeting procedures for the Commission, including who presides, the quorum, and how decisions are made.",
      partOf: "Part XXI.2 — Miscarriage of Justice Review Commission",
    },
  ],
  [
    "696.8",
    {
      title: "Accessibility",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-696.8.html`,
      summary:
        "Requires the Commission to ensure applicants and potential applicants can communicate with it readily from anywhere in Canada.",
      partOf: "Part XXI.2 — Miscarriage of Justice Review Commission",
    },
  ],
  [
    "696.81",
    {
      title: "Outreach",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-696.81.html`,
      summary:
        "Requires the Commission to publish information about its mandate and provide the public with information about its mandate and miscarriages of justice.",
      partOf: "Part XXI.2 — Miscarriage of Justice Review Commission",
    },
  ],
  [
    "696.82",
    {
      title: "Transparency",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-696.82.html`,
      summary:
        "Requires the Commission to operate transparently and publish its decisions online while protecting confidential information and the integrity of matters directed to courts.",
      partOf: "Part XXI.2 — Miscarriage of Justice Review Commission",
    },
  ],
  [
    "696.83",
    {
      title: "Policies",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-696.83.html`,
      summary:
        "Allows the Commission to adopt policies on its work and requires it to adopt specific policies on applications and processes, publish them online, and exempts them from the Statutory Instruments Act.",
      partOf: "Part XXI.2 — Miscarriage of Justice Review Commission",
    },
  ],
  [
    "696.84",
    {
      title: "Powers",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-696.84.html`,
      summary:
        "Lists the Commission's powers, including directing employees to inform applicants and correctional/parole authorities, entering contracts, and providing supports to applicants in need such as translation, referrals, and legal assistance.",
      partOf: "Part XXI.2 — Miscarriage of Justice Review Commission",
    },
  ],
  [
    "696.85",
    {
      title: "Security requirements",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-696.85.html`,
      summary:
        "Requires the Commission and its employees to follow established security procedures for handling information and documents.",
      partOf: "Part XXI.2 — Miscarriage of Justice Review Commission",
    },
  ],
  [
    "696.86",
    {
      title: "Public Service Employment Act",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-696.86.html`,
      summary:
        "Requires Commission employees to be appointed in accordance with the Public Service Employment Act.",
      partOf: "Part XXI.2 — Miscarriage of Justice Review Commission",
    },
  ],
  [
    "696.87",
    {
      title: "Annual report",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-696.87.html`,
      summary:
        "Requires the Chief Commissioner to submit a detailed annual report to the Minister, requires the Minister to table it in Parliament, and requires the Commission to publish it online afterward.",
      relatedSections: ["696.84"],
      partOf: "Part XXI.2 — Miscarriage of Justice Review Commission",
    },
  ],

  // ── Part XXII — Procuring Attendance ──
  [
    "697",
    {
      title: "Application",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-697.html`,
      summary:
        "States that this Part applies where a person is required to attend to give evidence in a proceeding under this Act, except where section 527 applies.",
      relatedSections: ["527"],
      partOf: "Part XXII — Procuring Attendance",
    },
  ],
  [
    "698",
    {
      title: "Subpoena",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-698.html`,
      summary:
        "Allows issuance of a subpoena requiring a person likely to give material evidence to attend, and allows a warrant for arrest instead if the person will not attend or is evading service, generally requiring a subpoena to be issued first.",
      partOf: "Part XXII — Procuring Attendance",
    },
  ],
  [
    "699",
    {
      title: "Who may issue",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-699.html`,
      summary:
        "Sets out which court or official issues a subpoena depending on the court level and the location of the person required to attend, plus formal requirements for sealing and signing subpoenas and warrants, with special rules for sexual offence records.",
      relatedSections: ["278.11", "278.1", "278.19"],
      partOf: "Part XXII — Procuring Attendance",
    },
  ],
  [
    "700",
    {
      title: "Contents of subpoena",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-700.html`,
      summary:
        "Requires a subpoena to state the time and place for the witness to attend and bring specified items, and requires the witness to remain in attendance until excused.",
      partOf: "Part XXII — Procuring Attendance",
    },
  ],
  [
    "700.1",
    {
      title: "Video links",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-700.1.html`,
      summary:
        "Provides for issuing a subpoena for a person to give evidence by video link under specified provisions, applying other subpoena-related sections with necessary modifications.",
      relatedSections: ["714.1", "699", "700", "701", "703.2"],
      partOf: "Part XXII — Procuring Attendance",
    },
  ],
  [
    "701",
    {
      title: "Service",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-701.html`,
      summary:
        "Sets out who may serve a subpoena and how, requiring personal service in certain circumstances.",
      relatedSections: ["509", "699"],
      partOf: "Part XXII — Procuring Attendance",
    },
  ],
  [
    "701.1",
    {
      title: "Service in accordance with provincial laws",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-701.1.html`,
      summary:
        "Allows service of documents in a province to instead follow that province's own laws relating to provincial offences.",
      relatedSections: ["701"],
      partOf: "Part XXII — Procuring Attendance",
    },
  ],
  [
    "702",
    {
      title: "Subpoena effective throughout Canada",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-702.html`,
      summary:
        "States that a subpoena issued by certain higher courts or judges has effect throughout Canada, while one issued by a justice has effect only within that province.",
      partOf: "Part XXII — Procuring Attendance",
    },
  ],
  [
    "703",
    {
      title: "Warrant effective throughout Canada",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-703.html`,
      summary:
        "States that warrants of arrest or committal issued by certain higher courts may be executed anywhere in Canada, while those issued by a justice or provincial court judge may generally be executed only within that province.",
      relatedSections: ["812", "487.0551", "490.03121", "705"],
      partOf: "Part XXII — Procuring Attendance",
    },
  ],
  [
    "703.1",
    {
      title: "Summons effective throughout Canada",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-703.1.html`,
      summary:
        "States that a summons may be served and is effective anywhere in Canada regardless of the territorial jurisdiction of the issuing authority.",
      partOf: "Part XXII — Procuring Attendance",
    },
  ],
  [
    "703.2",
    {
      title: "Service of process on an organization",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-703.2.html`,
      summary:
        "Sets out how a summons, notice, or process may be served on an organization when no other method is specified, naming the officials to whom delivery may be made for municipalities and other organizations.",
      partOf: "Part XXII — Procuring Attendance",
    },
  ],
  [
    "704",
    {
      title: "Warrant for absconding witness",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-704.html`,
      summary:
        "Allows a justice, on sworn information that a person bound to give evidence is about to abscond or has absconded, to issue a warrant for that person's arrest, and entitles the arrested person to a copy of the information on request.",
      relatedSections: ["528"],
      partOf: "Part XXII — Procuring Attendance",
    },
  ],
  [
    "705",
    {
      title: "Warrant if witness does not attend",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-705.html`,
      summary:
        "Allows a warrant for arrest of a witness who fails to attend or remain in attendance after being subpoenaed or bound by recognizance, and allows the warrant to be endorsed to permit release on an undertaking with conditions.",
      relatedSections: ["705.1"],
      partOf: "Part XXII — Procuring Attendance",
    },
  ],
  [
    "705.1",
    {
      title: "Release — undertaking",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-705.1.html`,
      summary:
        "Sets out the process for releasing a person arrested under such a warrant on an undertaking, including required information, mandatory and other conditions, and how long the conditions remain in effect.",
      relatedSections: ["705"],
      partOf: "Part XXII — Procuring Attendance",
    },
  ],
  [
    "706",
    {
      title: "If witness arrested under warrant",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-706.html`,
      summary:
        "Allows a court or judicial official to order that a witness brought in on a warrant be detained in custody or released on recognizance to ensure future attendance to give evidence.",
      relatedSections: ["698", "704", "705"],
      partOf: "Part XXII — Procuring Attendance",
    },
  ],
  [
    "707",
    {
      title: "Maximum period for detention of witness",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-707.html`,
      summary:
        "Limits detention of a witness to thirty days without being brought before a superior court judge, sets out the process for a witness to apply for review, and caps total detention at ninety days.",
      relatedSections: ["550"],
      partOf: "Part XXII — Procuring Attendance",
    },
  ],
  [
    "708",
    {
      title: "Contempt",
      severity: "Summary",
      maxPenalty: "Fine not exceeding $5,000 or imprisonment for a term not exceeding two years less a day, or both",
      url: `${JUSTICE_LAWS_BASE}/section-708.html`,
      summary:
        "Makes it contempt of court for a person required to attend and give evidence to fail, without lawful excuse, to attend or remain in attendance, and allows the court to deal with the matter summarily.",
      partOf: "Part XXII — Procuring Attendance",
    },
  ],
  [
    "708.1",
    {
      title: "Electronically transmitted copies",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-708.1.html`,
      summary:
        "Gives an electronically transmitted copy of a summons, warrant, or subpoena the same evidentiary weight as the original.",
      partOf: "Part XXII — Procuring Attendance",
    },
  ],
  [
    "709",
    {
      title: "Order appointing commissioner",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-709.html`,
      summary:
        "Allows a party to apply for an order appointing a commissioner to take the evidence of a witness who is unlikely to be able to attend trial due to illness or other good cause, or who is outside Canada.",
      partOf: "Part XXII — Procuring Attendance",
    },
  ],
  [
    "710",
    {
      title: "Application where witness is ill",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-710.html`,
      summary:
        "Sets out which court or judge hears an application to appoint a commissioner where a witness is ill, and allows such an application to be granted on a doctor's evidence.",
      relatedSections: ["709"],
      partOf: "Part XXII — Procuring Attendance",
    },
  ],
  [
    "711",
    {
      title: "Admitting evidence of witness who is ill",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-711.html`,
      summary:
        "Sets conditions for admitting evidence taken by a commissioner from an ill witness, including proof of inability to attend, a signed transcript, and proof that the other party had a full opportunity to cross-examine.",
      relatedSections: ["709", "710"],
      partOf: "Part XXII — Procuring Attendance",
    },
  ],
  [
    "712",
    {
      title: "Application for order when witness out of Canada",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-712.html`,
      summary:
        "Sets out which court or judge hears an application to appoint a commissioner where a witness is outside Canada, and allows evidence taken by that commissioner to be admitted.",
      relatedSections: ["709"],
      partOf: "Part XXII — Procuring Attendance",
    },
  ],
  [
    "713",
    {
      title: "Providing for presence of accused counsel",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-713.html`,
      summary:
        "Allows the judge appointing a commissioner to provide for the accused's presence or representation by counsel when evidence is taken, and requires the order to designate the court officer to whom the evidence is returned.",
      partOf: "Part XXII — Procuring Attendance",
    },
  ],
  [
    "713.1",
    {
      title: "Evidence not excluded",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-713.1.html`,
      summary:
        "Prevents evidence taken by a commissioner outside Canada from being excluded merely because it would have been taken differently in Canada, provided the process was lawful where taken and consistent with fundamental justice.",
      relatedSections: ["712"],
      partOf: "Part XXII — Procuring Attendance",
    },
  ],
  [
    "714",
    {
      title: "Rules and practice same as in civil cases",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-714.html`,
      summary:
        "States that, except as otherwise provided, the practice for appointing commissioners and taking, certifying, and using their evidence follows civil proceeding practice in the relevant provincial superior court.",
      partOf: "Part XXII — Procuring Attendance",
    },
  ],
  [
    "714.1",
    {
      title: "Audioconference and videoconference — witness in Canada",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-714.1.html`,
      summary:
        "Allows a court to order a witness in Canada to give evidence by audio- or videoconference, having regard to listed factors such as the witness's circumstances, costs, and fairness to the accused.",
      partOf: "Part XXII — Procuring Attendance",
    },
  ],
  [
    "714.2",
    {
      title: "Videoconference — witness outside Canada",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-714.2.html`,
      summary:
        "Requires a court to receive evidence from a witness outside Canada by videoconference unless a party shows it would be contrary to fundamental justice, and requires advance notice of intent to call such a witness.",
      partOf: "Part XXII — Procuring Attendance",
    },
  ],
  [
    "714.3",
    {
      title: "Audioconference — witness outside Canada",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-714.3.html`,
      summary:
        "Allows a court to receive evidence from a witness outside Canada by audioconference where appropriate, having regard to the same factors as for in-Canada video evidence.",
      relatedSections: ["714.1"],
      partOf: "Part XXII — Procuring Attendance",
    },
  ],
  [
    "714.4",
    {
      title: "Reasons",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-714.4.html`,
      summary:
        "Requires the court to record its reasons if it declines to order or receive evidence by audio- or videoconference under these provisions.",
      relatedSections: ["714.1", "714.2", "714.3"],
      partOf: "Part XXII — Procuring Attendance",
    },
  ],
  [
    "714.41",
    {
      title: "Cessation",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-714.41.html`,
      summary:
        "Allows the court to stop using audio- or videoconference technology at any time and take other appropriate measures for the witness to give evidence.",
      relatedSections: ["714.1", "714.2", "714.3"],
      partOf: "Part XXII — Procuring Attendance",
    },
  ],
  [
    "714.5",
    {
      title: "Oath or affirmation",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-714.5.html`,
      summary:
        "Sets out the acceptable ways a witness located outside Canada may be sworn or affirmed before giving remote evidence.",
      relatedSections: ["714.2", "714.3"],
      partOf: "Part XXII — Procuring Attendance",
    },
  ],
  [
    "714.6",
    {
      title: "Other laws about witnesses to apply",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-714.6.html`,
      summary:
        "Deems evidence given remotely by a witness outside Canada to have been given in Canada under Canadian oath, for purposes of laws relating to evidence, procedure, perjury, and contempt of court.",
      relatedSections: ["714.2", "714.3"],
      partOf: "Part XXII — Procuring Attendance",
    },
  ],
  [
    "714.7",
    {
      title: "Costs of technology",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-714.7.html`,
      summary:
        "Requires the party who calls a witness to testify remotely to pay the associated technology costs, unless the court orders otherwise.",
      relatedSections: ["714.1", "714.2", "714.3"],
      partOf: "Part XXII — Procuring Attendance",
    },
  ],
  [
    "714.8",
    {
      title: "Consent",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-714.8.html`,
      summary:
        "Clarifies that nothing in the remote-evidence provisions prevents a court from receiving evidence by audio- or videoconference where the parties consent.",
      relatedSections: ["714.1", "714.7"],
      partOf: "Part XXII — Procuring Attendance",
    },
  ],
  [
    "715",
    {
      title: "Evidence at preliminary inquiry may be read at trial in certain cases",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.html`,
      summary:
        "Allows evidence given by a witness at a previous trial or investigation to be read into evidence at a later trial if the witness refuses to testify or is shown to be dead, insane, too ill, or absent from Canada, provided it was taken in the accused's presence with opportunity to cross-examine; also addresses use for other charges and treats an absconding accused as having been present.",
      relatedSections: ["537", "540"],
      partOf: "Part XXII — Procuring Attendance",
    },
  ],
  [
    "715.01",
    {
      title: "Transcript of evidence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.01.html`,
      summary:
        "Allows the transcript of a police officer's preliminary inquiry or voir dire testimony to be admitted at trial with notice to the other party, subject to the court requiring the officer's attendance for examination.",
      relatedSections: ["183", "715", "537", "540"],
      partOf: "Part XXII — Procuring Attendance",
    },
  ],
  [
    "715.1",
    {
      title: "Evidence of victim or witness under 18",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.1.html`,
      summary:
        "Allows a video recording made shortly after an alleged offence, in which a victim or witness under 18 describes the acts, to be admitted as evidence if the witness adopts it while testifying, unless admission would interfere with justice, and allows the judge to restrict other uses of the recording.",
      partOf: "Part XXII — Procuring Attendance",
    },
  ],
  [
    "715.2",
    {
      title: "Evidence of victim or witness who has a disability",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.2.html`,
      summary:
        "Allows a video recording made within a reasonable time after the alleged offence, in which a victim or witness who has difficulty testifying due to a mental or physical disability describes the acts complained of, to be admitted as evidence if the witness adopts it while testifying, unless admission would interfere with the proper administration of justice, and allows the judge to prohibit other uses of the recording.",
      partOf: "Part XXII — Procuring Attendance",
    },
  ],

  // ── Part XXII.01 — Remote Attendance by Certain Persons ──
  [
    "715.21",
    {
      title: "Attendance",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.21.html`,
      summary:
        "Requires that, except as otherwise provided, a person appearing at, participating in, or presiding over a proceeding do so in person.",
      partOf: "Part XXII.01 — Remote Attendance by Certain Persons",
    },
  ],
  [
    "715.22",
    {
      title: "Provisions providing for audioconference or videoconference",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.22.html`,
      summary:
        "States that the purpose of provisions allowing remote appearance is to serve the proper administration of justice, including fair, efficient proceedings and enhanced access to justice.",
      partOf: "Part XXII.01 — Remote Attendance by Certain Persons",
    },
  ],
  [
    "715.221",
    {
      title: "Reasons",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.221.html`,
      summary:
        "Requires the court to record its reasons if it denies a request for a person's appearance or participation by audioconference or videoconference.",
      partOf: "Part XXII.01 — Remote Attendance by Certain Persons",
    },
  ],
  [
    "715.222",
    {
      title: "Cessation",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.222.html`,
      summary:
        "Allows the court to stop a person's remote appearance or participation at any time and take other appropriate measures.",
      partOf: "Part XXII.01 — Remote Attendance by Certain Persons",
    },
  ],
  [
    "715.23",
    {
      title: "Considerations — appearance by audioconference or videoconference",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.23.html`,
      summary:
        "Requires the court, before allowing an accused or offender to appear remotely under certain sections, to consider factors such as location, cost, suitability, fair hearing rights, and the nature and seriousness of the offence.",
      relatedSections: ["715.231", "715.241"],
      partOf: "Part XXII.01 — Remote Attendance by Certain Persons",
    },
  ],
  [
    "715.231",
    {
      title: "Preliminary inquiry",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.231.html`,
      summary:
        "Allows the court, with the consent of the prosecutor and the accused, to let the accused appear by videoconference at a preliminary inquiry.",
      partOf: "Part XXII.01 — Remote Attendance by Certain Persons",
    },
  ],
  [
    "715.232",
    {
      title: "Trial — summary conviction offence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.232.html`,
      summary:
        "Allows an accused to appear by videoconference at a summary conviction trial, with consent required from both parties if the accused is not in custody, or from the accused alone if in custody.",
      partOf: "Part XXII.01 — Remote Attendance by Certain Persons",
    },
  ],
  [
    "715.233",
    {
      title: "Trial — indictable offence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.233.html`,
      summary:
        "Allows an accused, with consent of both prosecutor and accused, to appear by videoconference at a trial for an indictable offence, except during a jury trial when evidence is being presented to the jury.",
      partOf: "Part XXII.01 — Remote Attendance by Certain Persons",
    },
  ],
  [
    "715.234",
    {
      title: "Plea",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.234.html`,
      summary:
        "Allows an accused, with consent of both parties, to appear by audio- or videoconference to enter a plea, with audioconference permitted only if videoconferencing isn't available and the guilty-plea inquiry can still be conducted.",
      relatedSections: ["606"],
      partOf: "Part XXII.01 — Remote Attendance by Certain Persons",
    },
  ],
  [
    "715.235",
    {
      title: "Sentencing",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.235.html`,
      summary:
        "Allows an offender, with consent of the prosecutor and offender, to appear by audio- or videoconference for sentencing, with audioconference limited to cases where videoconferencing is not readily available.",
      partOf: "Part XXII.01 — Remote Attendance by Certain Persons",
    },
  ],
  [
    "715.24",
    {
      title: "Proceedings not expressly provided for",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.24.html`,
      summary:
        "Allows an accused or offender to appear by audio- or videoconference in proceedings not otherwise expressly addressed by the Act.",
      partOf: "Part XXII.01 — Remote Attendance by Certain Persons",
    },
  ],
  [
    "715.241",
    {
      title: "Accused in custody — no evidence taken",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.241.html`,
      summary:
        "Allows an accused in custody with access to legal advice to appear by videoconference in the listed proceedings, except in any part where a witness's evidence is being taken.",
      relatedSections: ["715.231", "715.233"],
      partOf: "Part XXII.01 — Remote Attendance by Certain Persons",
    },
  ],
  [
    "715.242",
    {
      title: "Conditions — no access to legal advice",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.242.html`,
      summary:
        "Requires the court, before allowing remote appearance by someone without access to legal advice, to be satisfied they will understand the proceedings and that their decisions will be voluntary.",
      partOf: "Part XXII.01 — Remote Attendance by Certain Persons",
    },
  ],
  [
    "715.243",
    {
      title: "Communication with counsel",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.243.html`,
      summary:
        "Requires that an accused or offender appearing remotely be given the opportunity to communicate privately with their counsel.",
      partOf: "Part XXII.01 — Remote Attendance by Certain Persons",
    },
  ],
  [
    "715.25",
    {
      title: "Definition of participant",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.25.html`,
      summary:
        "Defines 'participant' and allows the court to let a participant take part in a proceeding remotely, considering listed factors, with costs generally borne by the party who arranged the remote participation.",
      partOf: "Part XXII.01 — Remote Attendance by Certain Persons",
    },
  ],
  [
    "715.26",
    {
      title: "Presiding by audioconference or videoconference",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.26.html`,
      summary:
        "Allows a judge or justice to preside remotely where considered necessary, having regard to listed factors, requires recorded reasons for the decision, and allows ending remote presiding at any time.",
      partOf: "Part XXII.01 — Remote Attendance by Certain Persons",
    },
  ],
  [
    "715.27",
    {
      title: "Definition of prospective juror",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.27.html`,
      summary:
        "Defines 'prospective juror' and allows the court, with consent of both parties, to permit remote participation in jury selection, subject to an approved location being provided, with in-person participation offered if none is provided.",
      partOf: "Part XXII.01 — Remote Attendance by Certain Persons",
    },
  ],

  // ── Part XXII.1 — Remediation Agreements ──
  [
    "715.3",
    {
      title: "Definitions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.3.html`,
      summary:
        "Defines terms for the remediation agreement Part, including 'court,' 'offence,' 'organization,' 'remediation agreement,' and 'victim,' and allows a third party to act on a victim's behalf with court authorization.",
      relatedSections: ["2", "2.2"],
      partOf: "Part XXII.1 — Remediation Agreements",
    },
  ],
  [
    "715.31",
    {
      title: "Purpose",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.31.html`,
      summary:
        "States the purpose of the remediation agreement regime, including denouncing wrongdoing, holding organizations accountable, promoting compliance, encouraging disclosure, providing reparations, and reducing harm to innocent stakeholders.",
      partOf: "Part XXII.1 — Remediation Agreements",
    },
  ],
  [
    "715.32",
    {
      title: "Conditions for remediation agreement",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.32.html`,
      summary:
        "Sets out the conditions under which a prosecutor may negotiate a remediation agreement with an organization, and lists factors the prosecutor must, and for foreign corruption offences must not, consider in deciding whether negotiation is in the public interest.",
      partOf: "Part XXII.1 — Remediation Agreements",
    },
  ],
  [
    "715.33",
    {
      title: "Notice to organization — invitation to negotiate",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.33.html`,
      summary:
        "Requires the prosecutor, if seeking to negotiate a remediation agreement with an organization, to give written notice setting out the offence, the voluntary nature and legal effects of negotiations, disclosure obligations, and a deadline to accept. Admissions made during negotiations generally cannot be used against the organization in related civil or criminal proceedings, except for the statement of facts and admission of responsibility in an approved agreement.",
      relatedSections: ["715.34"],
      partOf: "Part XXII.1 — Remediation Agreements",
    },
  ],
  [
    "715.34",
    {
      title: "Mandatory contents of agreement",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.34.html`,
      summary:
        "Sets out the mandatory contents a remediation agreement must contain, including a statement of facts, admission of responsibility, cooperation and disclosure obligations, forfeiture, penalty, reparations, victim surcharge, reporting duties, and a compliance deadline. Also describes what admissions are inadmissible in other proceedings and lists optional terms such as compliance measures and appointment of an independent monitor.",
      relatedSections: ["738"],
      partOf: "Part XXII.1 — Remediation Agreements",
    },
  ],
  [
    "715.35",
    {
      title: "Independent monitor — conflict of interest",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.35.html`,
      summary:
        "Requires a candidate for appointment as independent monitor to notify the prosecutor in writing of any past or ongoing relationship that could affect their independence.",
      partOf: "Part XXII.1 — Remediation Agreements",
    },
  ],
  [
    "715.36",
    {
      title: "Duty to inform victims",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.36.html`,
      summary:
        "Requires the prosecutor to take reasonable steps to inform victims once an organization has agreed to negotiate a remediation agreement, and specifies that this duty must be applied reasonably so as not to interfere with the proper administration of justice.",
      relatedSections: ["715.33"],
      partOf: "Part XXII.1 — Remediation Agreements",
    },
  ],
  [
    "715.37",
    {
      title: "Application for court approval",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.37.html`,
      summary:
        "Sets out the process for the prosecutor to apply to the court for approval of a remediation agreement, the factors the court must consider (including victim impact and reparations), the conditions for approval, and the resulting stay of proceedings and suspension of limitation periods.",
      relatedSections: ["715.34", "715.36", "722", "722.1", "722.2"],
      partOf: "Part XXII.1 — Remediation Agreements",
    },
  ],
  [
    "715.38",
    {
      title: "Variation order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.38.html`,
      summary:
        "Requires the court, on application by the prosecutor, to approve a modification to a remediation agreement if satisfied it still meets the required conditions, at which point the modification becomes part of the agreement.",
      relatedSections: ["715.37"],
      partOf: "Part XXII.1 — Remediation Agreements",
    },
  ],
  [
    "715.39",
    {
      title: "Termination order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.39.html`,
      summary:
        "Requires the court, on application by the prosecutor, to terminate a remediation agreement if the organization has breached its terms, and sets out how and when the stayed proceedings may be recommenced.",
      relatedSections: ["715.37"],
      partOf: "Part XXII.1 — Remediation Agreements",
    },
  ],
  [
    "715.4",
    {
      title: "Order declaring successful completion",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.4.html`,
      summary:
        "Requires the court, on application by the prosecutor, to declare that the terms of a remediation agreement were met if satisfied of compliance, which stays the proceedings, deems them never commenced, and bars other proceedings for the same offence.",
      partOf: "Part XXII.1 — Remediation Agreements",
    },
  ],
  [
    "715.41",
    {
      title: "Deadline",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.41.html`,
      summary:
        "Requires the prosecutor to apply to the court after the agreement's deadline for a variation, termination, or completion order, and provides that the agreement remains in force until the court terminates it or declares its terms met.",
      relatedSections: ["715.34", "715.38", "715.39", "715.4"],
      partOf: "Part XXII.1 — Remediation Agreements",
    },
  ],
  [
    "715.42",
    {
      title: "Publication",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.42.html`,
      summary:
        "Requires the court to publish approved remediation agreements and related orders and reasons, but allows non-publication in whole or in part if necessary for the proper administration of justice, subject to listed factors, conditions, and review on application by any person.",
      relatedSections: ["715.37", "715.38", "715.39", "715.4", "715.41"],
      partOf: "Part XXII.1 — Remediation Agreements",
    },
  ],
  [
    "715.43",
    {
      title: "Regulations",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.43.html`,
      summary:
        "Authorizes the Governor in Council, on the Minister of Justice's recommendation, to make regulations governing remediation agreements and to amend the schedule of eligible offences, while preserving the Part's application to organizations already given notice before an offence is deleted.",
      relatedSections: ["715.33"],
      partOf: "Part XXII.1 — Remediation Agreements",
    },
  ],

  // ── Part XXII.2 — Alternative Measures and Restorative Justice Processes ──
  [
    "715.44",
    {
      title: "Definitions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.44.html`,
      summary:
        "Defines terms used in this Part, including \"alternative measures\" and \"restorative justice process.\"",
      partOf: "Part XXII.2 — Alternative Measures and Restorative Justice Processes",
    },
  ],
  [
    "715.45",
    {
      title: "Purpose",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.45.html`,
      summary:
        "States the purpose of this Part, including holding offenders accountable, repairing harm to victims and community, and promoting rehabilitation and reintegration.",
      partOf: "Part XXII.2 — Alternative Measures and Restorative Justice Processes",
    },
  ],
  [
    "715.46",
    {
      title: "Principles",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.46.html`,
      summary:
        "Sets out the principles that apply to this Part, including the appropriate use of judicial resources, timely intervention, and consideration of victims' interests and offenders' circumstances.",
      partOf: "Part XXII.2 — Alternative Measures and Restorative Justice Processes",
    },
  ],
  [
    "715.47",
    {
      title: "Warnings and referrals — police",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.47.html`,
      summary:
        "Requires a police officer, where appropriate and safe, to consider taking no further action, issuing a warning, or referring the person to a program, agency, or alternative measure instead of laying charges; failure to consider these options does not invalidate later charges.",
      relatedSections: ["715.45", "715.46"],
      partOf: "Part XXII.2 — Alternative Measures and Restorative Justice Processes",
    },
  ],
  [
    "715.48",
    {
      title: "Warnings and referrals — prosecutor",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.48.html`,
      summary:
        "Requires a prosecutor, where appropriate and safe, to consider issuing a warning or referring the person to a program, agency, or alternative measure before proceeding with charges; failure to consider these options does not invalidate proceedings.",
      relatedSections: ["715.45", "715.46"],
      partOf: "Part XXII.2 — Alternative Measures and Restorative Justice Processes",
    },
  ],
  [
    "715.49",
    {
      title: "Conditions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.49.html`,
      summary:
        "Lists the conditions that must be met for alternative measures to be used with a person alleged to have committed an offence, including authorization of the program, informed and free consent, acceptance of responsibility, and sufficiency of evidence.",
      partOf: "Part XXII.2 — Alternative Measures and Restorative Justice Processes",
    },
  ],
  [
    "715.5",
    {
      title: "Restrictions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.5.html`,
      summary:
        "Prohibits the use of alternative measures for a person who denies involvement in the offence or who wants the charge dealt with by the court.",
      partOf: "Part XXII.2 — Alternative Measures and Restorative Justice Processes",
    },
  ],
  [
    "715.51",
    {
      title: "Admissions not admissible in evidence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.51.html`,
      summary:
        "Provides that an admission or statement of responsibility made as a condition of being dealt with by alternative measures cannot be used as evidence against that person in any civil or criminal proceeding.",
      partOf: "Part XXII.2 — Alternative Measures and Restorative Justice Processes",
    },
  ],
  [
    "715.52",
    {
      title: "No bar to proceedings",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.52.html`,
      summary:
        "Provides that using alternative measures does not bar later proceedings, but the court must dismiss a subsequent charge if satisfied the person fully complied with the measures, and may dismiss it if the person partially complied and prosecution would be unfair.",
      partOf: "Part XXII.2 — Alternative Measures and Restorative Justice Processes",
    },
  ],
  [
    "715.53",
    {
      title: "Principles",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.53.html`,
      summary:
        "Sets out additional principles applicable to the use of restorative justice processes, including that they prioritize acknowledgment of harm, are voluntary, and account for participant safety.",
      partOf: "Part XXII.2 — Alternative Measures and Restorative Justice Processes",
    },
  ],
  [
    "715.54",
    {
      title: "Application",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.54.html`,
      summary:
        "States that a restorative justice process may be used at any stage of the criminal justice process and may take various forms, and that certain alternative-measures provisions apply when it is used as an alternative measure.",
      relatedSections: ["715.49", "715.5", "715.51", "715.52"],
      partOf: "Part XXII.2 — Alternative Measures and Restorative Justice Processes",
    },
  ],
  [
    "715.55",
    {
      title: "Conference may be convened",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.55.html`,
      summary:
        "Allows a judge, justice, or authorized person to convene a conference involving the prosecutor, the alleged offender or offender, and others, to facilitate alternative measures or restorative justice and make related recommendations, and permits provinces to establish rules for conferences not convened by a judge or justice.",
      partOf: "Part XXII.2 — Alternative Measures and Restorative Justice Processes",
    },
  ],
  [
    "715.56",
    {
      title: "Records — warnings or referrals",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.56.html`,
      summary:
        "States that the record-keeping provisions in sections 715.57 to 715.6 apply only to persons who have received a warning or referral under section 715.47 or 715.48, regardless of their compliance.",
      relatedSections: ["715.57", "715.58", "715.59", "715.6", "715.47", "715.48"],
      partOf: "Part XXII.2 — Alternative Measures and Restorative Justice Processes",
    },
  ],
  [
    "715.57",
    {
      title: "Record keeping",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.57.html`,
      summary:
        "Requires the police officer who issues a warning or makes a referral to keep a record of it, including the identity of the person involved.",
      relatedSections: ["715.47"],
      partOf: "Part XXII.2 — Alternative Measures and Restorative Justice Processes",
    },
  ],
  [
    "715.58",
    {
      title: "Police records",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.58.html`,
      summary:
        "Allows a police force to keep records relating to an alleged offence, including fingerprints and photographs, and permits disclosure of that information where necessary for investigations or to insurance companies investigating related claims.",
      partOf: "Part XXII.2 — Alternative Measures and Restorative Justice Processes",
    },
  ],
  [
    "715.59",
    {
      title: "Government records",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.59.html`,
      summary:
        "Allows government departments and agencies to keep records obtained for investigating offences, proceedings, or the use of alternative measures, and allows any person or organization to keep records obtained through the use of alternative measures.",
      partOf: "Part XXII.2 — Alternative Measures and Restorative Justice Processes",
    },
  ],
  [
    "715.6",
    {
      title: "Disclosure of records",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.6.html`,
      summary:
        "Sets out to whom records kept under sections 715.57 to 715.59 may be disclosed, including judges, peace officers, and government officials, and under what conditions further disclosure or access is permitted, while making certain evidence of warnings or referrals inadmissible and limiting how long such records may be used as evidence.",
      relatedSections: ["715.57", "715.58", "715.59", "721"],
      partOf: "Part XXII.2 — Alternative Measures and Restorative Justice Processes",
    },
  ],

  // ── Part XXIII — Sentencing ──
  [
    "716",
    {
      title: "Definitions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-716.html`,
      summary:
        "Defines terms used in this Part, including \"accused,\" \"court,\" and \"fine\"; the former definition of \"alternative measures\" has been repealed.",
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "718",
    {
      title: "Purpose",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-718.html`,
      summary:
        "States the fundamental purpose of sentencing and lists its objectives, including denunciation, deterrence, separation from society where necessary, rehabilitation, reparations, and promoting responsibility.",
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "718.01",
    {
      title: "Objectives — offences against children",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-718.01.html`,
      summary:
        "Requires a court to give primary consideration to denunciation and deterrence when sentencing for an offence involving abuse of a person under eighteen.",
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "718.02",
    {
      title: "Objectives — offence against peace officer or other justice system participant",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-718.02.html`,
      summary:
        "Requires a court to give primary consideration to denunciation and deterrence when sentencing for specified offences against a peace officer or other justice system participant.",
      relatedSections: ["270", "270.01", "270.02", "423.1"],
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "718.03",
    {
      title: "Objectives — offence against certain animals",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-718.03.html`,
      summary:
        "Requires a court to give primary consideration to denunciation and deterrence when sentencing for an offence under subsection 445.01(1), which involves certain animals.",
      relatedSections: ["445.01"],
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "718.04",
    {
      title: "Objectives — offence against vulnerable person",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-718.04.html`,
      summary:
        "Requires a court to give primary consideration to denunciation and deterrence when sentencing for an offence involving abuse of a vulnerable person, including because the person is Aboriginal and female.",
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "718.05",
    {
      title: "Objectives — offence of motor vehicle theft when violence used",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-718.05.html`,
      summary:
        "Requires a court to give primary consideration to denunciation and deterrence when sentencing for a second or subsequent offence of motor vehicle theft involving violence under subsection 333.1(3).",
      relatedSections: ["333.1"],
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "718.06",
    {
      title: "Objectives — offence of breaking and entering",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-718.06.html`,
      summary:
        "Requires a court to give primary consideration to denunciation and deterrence when sentencing for a second or subsequent breaking and entering offence under section 348.",
      relatedSections: ["348"],
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "718.07",
    {
      title: "Objectives — offence for the benefit of a criminal organization",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-718.07.html`,
      summary:
        "Requires a court to give primary consideration to denunciation and deterrence when sentencing for an offence committed for the benefit of, at the direction of, or in association with a criminal organization.",
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "718.1",
    {
      title: "Fundamental principle",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-718.1.html`,
      summary:
        "States that a sentence must be proportionate to the gravity of the offence and the offender's degree of responsibility.",
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "718.2",
    {
      title: "Other sentencing principles",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-718.2.html`,
      summary:
        "Lists additional sentencing principles a court must consider, including deemed aggravating circumstances (such as bias motivation, abuse of a partner, child, or position of trust), parity between similar offenders, avoiding unduly harsh combined sentences, and preferring less restrictive sanctions where appropriate.",
      relatedSections: ["742.1"],
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "718.201",
    {
      title: "Additional consideration — increased vulnerability",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-718.201.html`,
      summary:
        "Requires a court sentencing for an offence involving abuse of an intimate partner to consider the increased vulnerability of female victims, with particular attention to Aboriginal female victims.",
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "718.21",
    {
      title: "Additional factors",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-718.21.html`,
      summary:
        "Lists additional factors a court must consider when sentencing an organization, including any advantage gained, planning involved, attempts to conceal assets, economic impact of the sentence, related regulatory penalties, and remedial measures taken.",
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "718.3",
    {
      title: "Degrees of punishment",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-718.3.html`,
      summary:
        "Sets out how a court's sentencing discretion operates where an enactment prescribes different or specific punishments, addresses default imprisonment terms for unpaid fines, and requires the court to consider consecutive sentences in listed situations, including repeat violent offences, and requires consecutive sentences for multiple sexual offences against children.",
      relatedSections: ["734", "163.1", "743.5"],
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "718.4",
    {
      title: "Shorter term of imprisonment than minimum punishment",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-718.4.html`,
      summary:
        "Requires a court to impose a shorter term of imprisonment than a prescribed minimum where that minimum would amount to cruel and unusual punishment for the offender, except where the minimum punishment is life imprisonment.",
      relatedSections: ["320.23"],
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "719",
    {
      title: "Commencement of sentence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-719.html`,
      summary:
        "Sets out when a sentence commences, excludes time unlawfully at large from counting toward a prison term, and governs how credit for pretrial custody is calculated, recorded, and limited.",
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "720",
    {
      title: "Sentencing proceedings",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-720.html`,
      summary:
        "Requires a court to conduct sentencing proceedings as soon as practicable after a finding of guilt, and allows the court, with consent, to delay sentencing so the offender can participate in a supervised treatment program or restorative justice process.",
      relatedSections: ["715.44"],
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "721",
    {
      title: "Report by probation officer",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-721.html`,
      summary:
        "Requires a probation officer, if directed by the court, to prepare and file a report on the accused to assist sentencing or discharge decisions, sets out what the report must generally contain, and requires the clerk to provide copies to the offender and prosecutor.",
      relatedSections: ["730", "715.44"],
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "722",
    {
      title: "Victim impact statement",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-722.html`,
      summary:
        "Requires a court to consider a victim impact statement describing the harm suffered when determining sentence, and sets out the procedures for the court's inquiry, adjournment, form, and manner of presenting the statement.",
      relatedSections: ["730"],
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "722.1",
    {
      title: "Copy of statement",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-722.1.html`,
      summary:
        "Requires the clerk of the court to provide a copy of a victim impact statement to the offender or their counsel and to the prosecutor as soon as practicable after a finding of guilt.",
      relatedSections: ["722"],
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "722.2",
    {
      title: "Community impact statement",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-722.2.html`,
      summary:
        "Requires a court to consider a community impact statement describing harm to a community when determining sentence, and sets out procedures for the court's inquiry, adjournment, form, and manner of presenting the statement.",
      relatedSections: ["730"],
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "723",
    {
      title: "Submissions on facts",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-723.html`,
      summary:
        "Requires the court to give the prosecutor and offender an opportunity to make submissions and present evidence on facts relevant to sentencing, and allows the court to require production of evidence or compel witnesses.",
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "724",
    {
      title: "Information accepted",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-724.html`,
      summary:
        "Sets out what a court may accept as proved when determining a sentence, including facts disclosed at trial, jury findings, and agreed facts, and establishes procedures and burdens of proof for resolving disputed facts.",
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "725",
    {
      title: "Other offences",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-725.html`,
      summary:
        "Sets out what a court must or may consider in determining sentence, including other offences the offender was found guilty of, outstanding charges the offender consents to have taken into account, and other facts that could form the basis of a separate charge. Requires the court to note any such charges or facts on the record, after which no further proceedings may be taken on them unless the underlying conviction is set aside or quashed on appeal.",
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "726",
    {
      title: "Offender may speak to sentence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-726.html`,
      summary:
        "Requires the court, before determining sentence, to ask the offender, if present, whether they have anything to say.",
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "726.1",
    {
      title: "Relevant information",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-726.1.html`,
      summary:
        "Requires the court to consider any relevant information placed before it, including representations or submissions from the prosecutor or the offender, when determining sentence.",
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "726.11",
    {
      title: "Endorsement — offence under subsection 263.1(1)",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-726.11.html`,
      summary:
        "Requires the court, when an offender is found guilty under subsection 263.1(1), to endorse on the information or indictment which included offence was proved by the evidence, and that endorsement stands as proof of that fact absent contrary evidence.",
      relatedSections: ["263.1"],
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "726.2",
    {
      title: "Reasons for sentence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-726.2.html`,
      summary:
        "Requires the court, when imposing a sentence, to state the terms of the sentence and its reasons, and to enter both into the record of proceedings.",
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "726.21",
    {
      title: "Endorsement — intimate partner violence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-726.21.html`,
      summary:
        "Requires the court, where it finds an offender guilty of an offence involving violence used, threatened or attempted against their intimate partner, to endorse that fact on the information or indictment, which then stands as proof absent contrary evidence.",
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "726.22",
    {
      title: "Endorsement — offence under subsection 320.1001(1)",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-726.22.html`,
      summary:
        "Requires the court, when an offender is found guilty under subsection 320.1001(1), to endorse on the information or indictment which included offence was proved by the evidence, and that endorsement stands as proof absent contrary evidence.",
      relatedSections: ["320.1001"],
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "726.3",
    {
      title: "Inquiry by court",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-726.3.html`,
      summary:
        "Requires the court, when imposing a sentence, to ask the prosecutor whether reasonable steps were taken to determine if the victim wants information about the sentence and its administration, and to record the victim's wishes if known.",
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "727",
    {
      title: "Previous conviction",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-727.html`,
      summary:
        "Sets conditions under which a court may impose a greater punishment based on an offender's previous convictions, including required prior notice to the offender, procedures for admitting evidence of prior convictions, and special rules for ex parte trials under subsection 803(2) and for organizations tried under section 623; also excludes application to a person referred to in paragraph 745(b).",
      relatedSections: ["803", "623", "745"],
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "728",
    {
      title: "Sentence justified by any count",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-728.html`,
      summary:
        "Provides that where one sentence is passed on a guilty verdict for two or more counts, the sentence stands if any single count would have justified it.",
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "729",
    {
      title: "Proof of certificate of analyst",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-729.html`,
      summary:
        "Allows a certificate signed by a designated analyst stating the results of analyzing a substance to be admitted as evidence, without proof of the signer's signature or official status, in proceedings about breach of a drug-related probation or conditional sentence condition, subject to notice requirements and the opposing party's right to require the analyst's attendance for cross-examination.",
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "729.1",
    {
      title: "Proof of certificate of analyst — bodily substance",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-729.1.html`,
      summary:
        "Allows a certificate signed by a designated analyst stating the results of analyzing a bodily substance sample to be admitted as evidence, without proof of the signer's signature or official status, in proceedings about breach of a probation or conditional sentence condition to abstain from drugs, alcohol or other intoxicating substances, subject to notice requirements and the opposing party's right to require the analyst's attendance for cross-examination.",
      relatedSections: ["320.11"],
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "729.2",
    {
      title: "Order prohibiting contact",
      severity: "Hybrid",
      maxPenalty: "Up to 2 years imprisonment on indictment; summary conviction also available",
      url: `${JUSTICE_LAWS_BASE}/section-729.2.html`,
      summary:
        "Allows a court, on convicting or conditionally discharging an offender under section 730 for a sexual offence, criminal harassment, trafficking in persons, or an offence against an intimate partner, to order that the offender have no contact with a named victim, witness or other person, for up to life, with provision for variation on application; failing to comply without lawful excuse is itself an offence.",
      relatedSections: ["730"],
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "730",
    {
      title: "Conditional and absolute discharge",
      severity: "Summary",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-730.html`,
      summary:
        "Allows a court, instead of convicting an offender (other than for offences with a minimum punishment or punishable by 14 years or life), to order an absolute or conditional discharge where it is in the offender's best interests and not contrary to the public interest; sets out the legal effect of a discharge, including appeal rights and the ability to revoke the discharge and convict if the offender later breaches the probation order or is convicted of another offence.",
      relatedSections: ["732.2", "733.1"],
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "731",
    {
      title: "Making of probation order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-731.html`,
      summary:
        "Allows a court, having regard to the offender's age and character and the nature of the offence, to suspend passing sentence and impose a probation order, or to combine a fine or imprisonment of up to two years with a probation order; also allows a probation order where an accused is discharged under section 730.",
      relatedSections: ["730"],
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "731.1",
    {
      title: "Firearm, etc., prohibitions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-731.1.html`,
      summary:
        "Requires the court, before making a probation order, to consider whether the firearm prohibition provisions in section 109 or 110 apply, and clarifies that a probation condition referred to in paragraph 732.1(3)(d) does not affect those provisions.",
      relatedSections: ["109", "110", "732.1"],
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "732",
    {
      title: "Intermittent sentence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-732.html`,
      summary:
        "Allows a court imposing a sentence of imprisonment of ninety days or less to order that it be served intermittently, with probation conditions applying when the offender is not in confinement, and sets out rules for varying an intermittent sentence to consecutive days or interrupting it if a further sentence is imposed.",
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "732.1",
    {
      title: "Definitions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-732.1.html`,
      summary:
        "Defines terms used in this section and section 732.2, sets out mandatory conditions every probation order must include (keeping the peace, appearing when required, notifying of changes of name, address, employment), and lists optional conditions a court may add for individual offenders and for organizations, along with related procedural and administrative requirements for the order and for bodily substance sampling.",
      relatedSections: ["732.2", "733.1", "738"],
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "732.11",
    {
      title: "Prohibition on use of bodily substance",
      severity: "Summary",
      maxPenalty: "Summary conviction (no specific penalty amount stated in this section)",
      url: `${JUSTICE_LAWS_BASE}/section-732.11.html`,
      summary:
        "Prohibits using a bodily substance provided under a probation order for any purpose other than checking compliance with an abstinence condition, and prohibits using or disclosing analysis results except to the offender or for specified investigative, proceeding or anonymized research purposes; contravening either prohibition is an offence punishable on summary conviction.",
      relatedSections: ["733.1"],
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "732.2",
    {
      title: "Coming into force of order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-732.2.html`,
      summary:
        "Sets out when a probation order comes into force, how long it remains in effect (subject to a three-year limit), and the procedures for a court to change or relieve compliance with optional conditions, including special provisions where the offender is later convicted of another offence.",
      relatedSections: ["731", "733.1"],
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "733",
    {
      title: "Transfer of order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-733.html`,
      summary:
        "Allows a probation order to be transferred, on a probation officer's application, to a court in another territorial division where the offender becomes resident or is convicted or discharged under section 730 (including for an offence under section 733.1), subject to the Attorney General's consent where the divisions are in different provinces or the proceedings were federal, and allows another court of equivalent jurisdiction to exercise the powers of a court that made or received the order if that court is unable to act.",
      relatedSections: ["730", "733.1"],
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "733.1",
    {
      title: "Failure to comply with probation order",
      severity: "Hybrid",
      maxPenalty: "Up to 4 years imprisonment on indictment; summary conviction also available",
      url: `${JUSTICE_LAWS_BASE}/section-733.1.html`,
      summary:
        "Makes it an offence, punishable either by indictment or on summary conviction, for an offender bound by a probation order to fail or refuse, without reasonable excuse, to comply with it, and sets out where such an offence may be tried and punished.",
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "734",
    {
      title: "Power of court to impose fine",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-734.html`,
      summary:
        "Allows a court convicting a person (other than an organization) to impose a fine in addition to or instead of other sanctions, subject to being satisfied the offender can pay, and sets out how a term of imprisonment in default of payment is calculated and may be deducted from money found on the offender at arrest.",
      relatedSections: ["734.1", "734.8", "736"],
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "734.1",
    {
      title: "Terms of order imposing fine",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-734.1.html`,
      summary:
        "Requires a court imposing a fine under section 734 to make an order setting out the amount of the fine, how and when it is to be paid, and any other appropriate payment terms.",
      relatedSections: ["734"],
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "734.2",
    {
      title: "Obligations of court",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-734.2.html`,
      summary:
        "Requires a court that makes a fine order to give the offender a copy of it, explain the relevant fine provisions and the procedure for applying to change payment terms or use a fine option program, and take reasonable steps to ensure the offender understands; failure to do so does not affect the order's validity.",
      relatedSections: ["734", "734.1", "734.3", "734.8", "736"],
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "734.3",
    {
      title: "Change in terms of order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-734.3.html`,
      summary:
        "Allows a court that made a fine order, or a person it designates, to change any term of the order except the fine amount, on application by or for the offender.",
      relatedSections: ["734", "734.1", "734.2", "734.6", "482", "482.1"],
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "734.4",
    {
      title: "Proceeds to go to provincial treasurer",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-734.4.html`,
      summary:
        "Sets out that proceeds of a fine or forfeiture generally belong to the province where imposed, unless the offence relates to federal revenue law, federal official misconduct, or federally instituted proceedings, in which case the proceeds go to the federal Receiver General; allows for redirection of proceeds to a municipal or local authority that bore the enforcement costs.",
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "734.5",
    {
      title: "Licences, permits, etc.",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-734.5.html`,
      summary:
        "Allows the authority responsible for issuing, renewing or suspending a licence or permit to refuse or suspend it until an offender pays a fine in default, depending on whether the fine proceeds belong to the province or to Canada under subsection 734.4(1) or (2).",
      relatedSections: ["734.4"],
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "734.51",
    {
      title: "Compensation agreements",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-734.51.html`,
      summary:
        "Allows the federal Attorney General to enter into agreements with provincial or local governments to share fine proceeds as compensation for administering and enforcing federal law, including allowing withheld amounts under such agreements, and deems shared amounts appropriated by Parliament.",
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "734.6",
    {
      title: "Civil enforcement of fines, forfeiture",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-734.6.html`,
      summary:
        "Allows the applicable Attorney General to file an unpaid fine or forfeiture order in a civil court as a judgment, in addition to other recovery methods, where the fine or forfeiture is unpaid; the filed order is then enforceable as an ordinary civil judgment.",
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "734.7",
    {
      title: "Warrant of committal",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-734.7.html`,
      summary:
        "Restricts a court from issuing a warrant of committal for default of fine payment until the time allowed for payment has passed and the court is satisfied that the mechanisms in sections 734.5 and 734.6 are unsuitable or the offender has refused without reasonable excuse to pay or discharge the fine under section 736, requires reasons where no time was allowed, and provides that imprisonment ends the availability of the licence-suspension and civil-enforcement mechanisms for that fine.",
      relatedSections: ["734.5", "734.6", "736"],
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "734.8",
    {
      title: "Definition of penalty",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-734.8.html`,
      summary:
        "Defines \"penalty\" as the fine plus costs and charges of committal, sets out how the term of imprisonment in default is reduced proportionally on part payment, sets a minimum amount that can be accepted after a warrant is executed, specifies to whom payment may be made, and sets the order in which a payment is applied to costs, the victim surcharge under section 737, and the fine.",
      relatedSections: ["734", "737"],
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "735",
    {
      title: "Fines on organizations",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-735.html`,
      summary:
        "Sets the fine an organization is liable to on conviction in lieu of imprisonment, at the court's discretion for indictable offences and up to a statutory maximum for summary offences, requires the court's fine order to set out the amount and payment terms, and applies the civil-enforcement mechanism in section 734.6 if the organization fails to pay.",
      relatedSections: ["734.6"],
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "736",
    {
      title: "Fine option program",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-736.html`,
      summary:
        "Allows an offender fined under section 734 to discharge the fine, in whole or in part, by earning credits for work performed under a provincial fine option program over up to two years, sets out how credits are determined and deemed as payment, and allows use of another province's program under an interprovincial agreement where the fine's proceeds belong to Canada under subsection 734.4(2).",
      relatedSections: ["734", "734.4"],
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "737",
    {
      title: "Victim surcharge",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-737.html`,
      summary:
        "Requires an offender convicted or discharged under section 730 of certain offences to pay a victim surcharge calculated as a percentage of any fine or a set amount if no fine is imposed, allows the court to waive or reduce the surcharge for undue hardship or disproportionality, allows increasing it in appropriate circumstances, and sets out payment timing, use of proceeds, notice requirements, and which fine-enforcement provisions apply to it.",
      relatedSections: ["730", "734", "734.3", "734.5", "734.7", "734.8"],
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "737.1",
    {
      title: "Court to consider restitution order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-737.1.html`,
      summary:
        "Requires a court sentencing or discharging an offender under section 730 to consider making a restitution order under section 738 or 739, to inquire whether victims have been given an opportunity to seek restitution with an ascertainable amount, to allow an adjournment for that purpose, to specify the form by which victims indicate they are seeking restitution, and to record its reasons if it declines to make a restitution order a victim sought.",
      relatedSections: ["730", "738", "739"],
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "738",
    {
      title: "Restitution to victims of offences",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-738.html`,
      summary:
        "Allows a court sentencing or discharging an offender under section 730 to order restitution to another person for readily ascertainable losses arising from property damage or loss, bodily or psychological harm, certain household relocation expenses from harm by the offender, identity-theft-related re-establishment expenses under section 402.2 or 403, or expenses to remove an intimate image from the internet under subsection 162.1(1); also allows provincial regulations restricting inclusion of restitution enforcement terms as a probation or conditional sentence condition.",
      relatedSections: ["730", "402.2", "403", "162.1"],
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "739",
    {
      title: "Restitution to persons acting in good faith",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-739.html`,
      summary:
        "Allows a court, where property obtained through an offence was sold or used as loan security to a good-faith purchaser or lender without notice and the property was returned to its lawful owner, to order the offender to pay restitution to that purchaser or lender up to the value of the consideration or loan.",
      relatedSections: ["730"],
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "739.1",
    {
      title: "Ability to pay",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-739.1.html`,
      summary:
        "Provides that an offender's financial means or ability to pay does not prevent a court from making a restitution order under section 738 or 739.",
      relatedSections: ["738", "739"],
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "739.2",
    {
      title: "Payment under order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-739.2.html`,
      summary:
        "Requires a court making a restitution order under section 738 or 739 to require payment in full by a specified date, unless it sets out an instalment payment scheme instead.",
      relatedSections: ["738", "739"],
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "739.3",
    {
      title: "More than one person",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-739.3.html`,
      summary:
        "Allows a restitution order under section 738 or 739 to be made in favour of more than one person, specifying the amount payable to each and, optionally, the priority in which they are to be paid.",
      relatedSections: ["738", "739"],
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "739.4",
    {
      title: "Public authority",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-739.4.html`,
      summary:
        "Allows a court, at the request of a person entitled to restitution under section 738 or 739, to direct the restitution order in favour of a designated public authority responsible for enforcing it and remitting amounts collected to that person, and allows a province to designate such public authorities.",
      relatedSections: ["738", "739"],
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "740",
    {
      title: "Priority to restitution",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-740.html`,
      summary:
        "Requires a court that finds a restitution order under section 738 or 739 appropriate to make that order first, before then considering whether and to what extent a forfeiture order or fine is also appropriate, in cases where forfeiture could apply to the same property or a fine might conflict with the offender's ability to pay restitution.",
      relatedSections: ["738", "739"],
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "740.1",
    {
      title: "Deemed restitution order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-740.1.html`,
      summary:
        "If a restitution-related payment requirement in an order under section 732.1 or 742.3 is still owing when that order ends, the unpaid portion continues as a restitution order under section 738 or 739 until fully paid.",
      relatedSections: ["732.1", "742.3", "738", "739"],
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "741",
    {
      title: "Enforcing restitution order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-741.html`,
      summary:
        "Sets out how an unpaid restitution or payment order can be enforced as a civil judgment when the offender defaults, and allows money found on the offender at arrest to be applied to the amount owed under section 738 or 739 if ownership is undisputed.",
      relatedSections: ["732.1", "738", "739", "742.3"],
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "741.1",
    {
      title: "Notice of orders of restitution",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-741.1.html`,
      summary:
        "Requires a court making a restitution order under section 738 or 739 to give notice or a copy of the order to the person owed payment, and, where payment is to be made to a public authority designated under subsection 739.4(2), to that authority and to the person the authority is to remit the payments to.",
      relatedSections: ["738", "739", "739.4"],
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "741.2",
    {
      title: "Civil remedy not affected",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-741.2.html`,
      summary:
        "States that making a restitution order under section 738 or 739 does not affect a person's ability to pursue a civil remedy for the same act or omission.",
      relatedSections: ["738", "739"],
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "742",
    {
      title: "Definitions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-742.html`,
      summary:
        "Defines terms used in sections 742.1 to 742.7, including \"change,\" \"optional conditions\" (the conditions referred to in subsection 742.3(2)), and \"supervisor.\"",
      relatedSections: ["742.1", "742.7", "742.3"],
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "742.1",
    {
      title: "Imposing of conditional sentence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-742.1.html`,
      summary:
        "Allows a court to order that a sentence of imprisonment of less than two years be served in the community under conditions imposed under section 742.3, subject to conditions including that the offence is not one carrying a mandatory minimum, is not among specific listed offences, and does not involve certain terrorism or criminal organization offences prosecuted by indictment.",
      relatedSections: ["742.3", "718", "239", "269.1", "272", "273"],
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "742.2",
    {
      title: "Firearm, etc., prohibitions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-742.2.html`,
      summary:
        "Requires a court to consider whether firearms prohibitions under section 109 or 110 apply before imposing a conditional sentence under section 742.1, and clarifies that a conditional sentence condition under paragraph 742.3(2)(b) does not affect those prohibitions.",
      relatedSections: ["742.1", "109", "110", "742.3"],
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "742.3",
    {
      title: "Compulsory conditions of conditional sentence order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-742.3.html`,
      summary:
        "Sets out the compulsory conditions a court must include in a conditional sentence order (such as keeping the peace and reporting to a supervisor) and the optional conditions it may add, along with rules for bodily substance sampling, notice obligations, and related regulation-making powers.",
      relatedSections: ["742.4", "742.6", "738"],
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "742.31",
    {
      title: "Prohibition on use of bodily substance",
      severity: "Summary",
      maxPenalty: "summary conviction (s. 787 default penalty applies unless otherwise stated)",
      url: `${JUSTICE_LAWS_BASE}/section-742.31.html`,
      summary:
        "Restricts the use of a bodily substance sample and its analysis results taken under a conditional sentence order to specific permitted purposes, and makes unauthorized use or disclosure an offence punishable on summary conviction.",
      relatedSections: ["742.6"],
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "742.4",
    {
      title: "Supervisor may propose changes to optional conditions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-742.4.html`,
      summary:
        "Sets out the process for a supervisor, offender, or prosecutor to propose changes to the optional conditions of a conditional sentence order, including notice requirements, the right to request a hearing, and what happens if no hearing is requested.",
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "742.5",
    {
      title: "Transfer of order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-742.5.html`,
      summary:
        "Allows a court to transfer a conditional sentence order to another territorial division where the offender has become a resident, subject to Attorney General consent in certain cases, and lets another court exercise the powers of a court unable to act.",
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "742.6",
    {
      title: "Procedure on breach of condition",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-742.6.html`,
      summary:
        "Sets out the procedure for arresting, compelling appearance of, and holding a hearing for an offender alleged to have breached a condition of a conditional sentence order, including timelines, evidentiary requirements, the court's powers on finding a breach, and how the running of the sentence is suspended or credited during the process.",
      relatedSections: ["495", "487.1", "515", "742.4", "742.7"],
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "742.7",
    {
      title: "If person imprisoned for new offence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-742.7.html`,
      summary:
        "Addresses how a conditional sentence order interacts with imprisonment for another offence, including suspension of the order while imprisoned, consecutive service of any custodial period ordered for breach, treatment of multiple sentences as one, and resumption of the order upon release.",
      relatedSections: ["742.6", "743.1"],
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "743",
    {
      title: "Imprisonment when no other provision",
      severity: "Indictable",
      maxPenalty: "Imprisonment for a term not exceeding five years",
      url: `${JUSTICE_LAWS_BASE}/section-743.html`,
      summary:
        "Sets the general liability to imprisonment for an indictable offence for which no punishment is otherwise specified, capping the term at five years.",
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "743.1",
    {
      title: "Imprisonment for life or more than two years",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-743.1.html`,
      summary:
        "Sets out when a sentence of imprisonment must be served in a penitentiary versus another prison, based on the length and combination of the sentence or sentences imposed.",
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "743.2",
    {
      title: "Report by court to Correctional Service",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-743.2.html`,
      summary:
        "Requires a court that sentences or commits a person to penitentiary to forward its reasons, recommendation, relevant reports, and other relevant information to the Correctional Service of Canada.",
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "743.21",
    {
      title: "Non-communication order",
      severity: "Hybrid",
      maxPenalty: "2 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-743.21.html`,
      summary:
        "Allows a sentencing judge to prohibit an offender from communicating with a victim, witness, or other identified person during the custodial period, and makes failure to comply an indictable or summary offence.",
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "743.3",
    {
      title: "Sentence served according to regulations",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-743.3.html`,
      summary:
        "Requires that a sentence of imprisonment be served according to the enactments and rules governing the institution where the prisoner is held.",
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "743.5",
    {
      title: "Transfer of jurisdiction when person already sentenced under Youth Criminal Justice Act",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-743.5.html`,
      summary:
        "Sets out how a remaining youth disposition or youth sentence is treated as an adult sentence under this Act when a person is or has been sentenced to imprisonment while subject to certain Young Offenders Act or Youth Criminal Justice Act dispositions, and deems related sentences to constitute one sentence.",
      relatedSections: ["743.1"],
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "743.6",
    {
      title: "Power of court to delay parole",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-743.6.html`,
      summary:
        "Allows or, in certain terrorism and criminal organization cases, requires a court to delay the point at which an offender becomes eligible for full parole to one half of the sentence or ten years, whichever is less, for offenders receiving sentences of two years or more for specified offences.",
      relatedSections: ["467.11", "467.111", "467.12", "467.13"],
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "744",
    {
      title: "Execution of warrant of committal",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-744.html`,
      summary:
        "Directs a peace officer or other person executing a warrant of committal to arrest, convey, and deliver the named person to the prison specified in the warrant, and requires the prison keeper to issue a receipt.",
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "745",
    {
      title: "Sentence of life imprisonment",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-745.html`,
      summary:
        "Sets out the parole ineligibility periods for the sentence of life imprisonment depending on the offence of conviction, ranging from 25 years for high treason or first degree murder to normal eligibility for other offences.",
      relatedSections: ["745.1", "745.4", "236", "745.52"],
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "745.01",
    {
      title: "Information in respect of parole",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-745.01.html`,
      summary:
        "Requires the trial judge, when sentencing under certain provisions, to state for the record the offence, the life sentence, the parole ineligibility date, and the availability of a later application under section 745.6, except where the offence was committed after a specified date.",
      relatedSections: ["745", "745.6"],
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "745.1",
    {
      title: "Persons under 18",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-745.1.html`,
      summary:
        "Sets out the parole ineligibility periods applicable to a person under 18 at the time of the offence who is sentenced to life imprisonment for first or second degree murder or certain manslaughter, varying by age and offence.",
      relatedSections: ["236"],
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "745.2",
    {
      title: "Recommendation by jury",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-745.2.html`,
      summary:
        "Requires the trial judge, on a jury's finding of guilt for second degree murder, to ask the jury whether it wishes to make a recommendation on the number of years before parole eligibility.",
      relatedSections: ["745.3"],
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "745.21",
    {
      title: "Recommendation by jury — multiple murders",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-745.21.html`,
      summary:
        "Requires the trial judge, when a jury finds an accused guilty of murder who has a previous murder conviction, to ask the jury whether it wishes to recommend how the parole ineligibility periods for the murders should be served consecutively, and specifies when this applies.",
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "745.3",
    {
      title: "Persons under sixteen",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-745.3.html`,
      summary:
        "Requires the trial judge, on a jury's finding of guilt for first or second degree murder by a person under 16 at the time of the offence, to ask the jury whether it wishes to recommend the length of the parole ineligibility period.",
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "745.4",
    {
      title: "Ineligibility for parole",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-745.4.html`,
      summary:
        "Allows the trial judge, on sentencing for second degree murder, to substitute a parole ineligibility period of more than ten but not more than twenty-five years, considering the offender's character, the offence, and any jury recommendation.",
      relatedSections: ["745.5", "745", "745.2"],
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "745.5",
    {
      title: "Idem",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-745.5.html`,
      summary:
        "Allows the trial judge, on sentencing a person under 16 at the time of the offence for first or second degree murder, to set the parole ineligibility period between five and seven years, considering the offender, the offence, and any jury recommendation.",
      relatedSections: ["745.1", "745.3"],
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "745.51",
    {
      title: "Ineligibility for parole — multiple murders",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-745.51.html`,
      summary:
        "Allows the trial judge, on sentencing an offender convicted of murder who has prior murder convictions, to order that the parole ineligibility periods for each murder be served consecutively, with reasons required and application limited to murders committed after the section's coming into force.",
      relatedSections: ["745", "745.21"],
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "745.52",
    {
      title: "Manslaughter in certain circumstances",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-745.52.html`,
      summary:
        "Allows the trial judge, on sentencing for manslaughter in specified circumstances, to set a parole ineligibility period of up to 25 years or between five and seven years depending on the sentencing provision applied, considering the offender's character, the offence, and in one case the offender's age.",
      relatedSections: ["745", "745.1", "236"],
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "745.6",
    {
      title: "Application for judicial review",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-745.6.html`,
      summary:
        "Sets out the eligibility conditions, timelines, and exceptions for a person convicted of murder or high treason to apply for judicial review of their parole ineligibility period, including rules for multiple murderers, repeat applications, time-limit extensions, and victim notification, and defines the applicable Chief Justice by province or territory.",
      relatedSections: ["745.61", "745.63", "745.64"],
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "745.61",
    {
      title: "Judicial screening",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-745.61.html`,
      summary:
        "Sets out the judicial screening process for an application under section 745.6, where the Chief Justice or a designated judge determines on written material whether there is a substantial likelihood the application will succeed, and either sets a time for reapplication, bars reapplication, or designates a judge to empanel a jury to hear the application.",
      relatedSections: ["745.6", "745.63"],
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "745.62",
    {
      title: "Appeal",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-745.62.html`,
      summary:
        "Allows the applicant or the Attorney General to appeal a determination or decision made under section 745.61 to the Court of Appeal, and sets out how the appeal is to be determined and which sections apply.",
      relatedSections: ["745.61", "673", "696"],
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "745.63",
    {
      title: "Hearing of application",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-745.63.html`,
      summary:
        "Sets out the criteria a jury must consider and the voting thresholds required to determine whether to reduce, and by how much, an applicant's parole ineligibility period, and what happens if the number of years is not reduced.",
      relatedSections: ["745.61"],
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "745.64",
    {
      title: "Rules",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-745.64.html`,
      summary:
        "Allows the appropriate Chief Justice in each province or territory to make rules for the judicial review process, exempts those rules from the Statutory Instruments Act, and sets out how a judge is designated for territorial convictions.",
      relatedSections: ["745.6", "745.63", "745.61"],
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "746",
    {
      title: "Time spent in custody",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-746.html`,
      summary:
        "Specifies that time spent in custody between arrest and sentencing, or between a commuted death sentence and its commutation, is included when calculating the period of imprisonment served for purposes of the listed parole ineligibility sections.",
      relatedSections: ["745", "745.1", "745.4", "745.5", "745.52", "745.6"],
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "746.1",
    {
      title: "Parole prohibited",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-746.1.html`,
      summary:
        "Sets rules restricting parole, day parole and unescorted or escorted absences for a person serving a life sentence with a specified parole ineligibility period, including a shorter ineligibility threshold for offenders under 18 at the time of the murder.",
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "748",
    {
      title: "To whom pardon may be granted",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-748.html`,
      summary:
        "Allows the Crown to extend mercy or grant a free or conditional pardon to a convicted person, and provides that a free pardon means the person is treated as never having committed the offence, though a subsequent conviction for a different offence is unaffected.",
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "748.1",
    {
      title: "Remission by Governor in Council",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-748.1.html`,
      summary:
        "Allows the Governor in Council to remit, in whole or in part, a fine or forfeiture imposed under a federal Act, including related costs, but not costs owed to a private prosecutor.",
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "749",
    {
      title: "Royal prerogative",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-749.html`,
      summary:
        "States that nothing in the Act limits or affects the royal prerogative of mercy.",
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "750",
    {
      title: "Public office vacated for conviction",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-750.html`,
      summary:
        "Provides that a person convicted of an indictable offence carrying two years or more imprisonment automatically loses any public office or Crown employment and becomes ineligible to hold office or vote until the sentence is served or a pardon is granted, and sets out related rules on contracting with the Crown and applying to have those capacities restored.",
      relatedSections: ["121", "124", "418", "380"],
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "751",
    {
      title: "Costs to successful party in case of libel",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-751.html`,
      summary:
        "Entitles the party who wins an indictment proceeding for defamatory libel to recover reasonable costs from the other party, as fixed by court order.",
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "751.1",
    {
      title: "How recovered",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-751.1.html`,
      summary:
        "Allows a party owed costs fixed under section 751 to enter and enforce that amount as a civil court judgment if it is not paid immediately.",
      relatedSections: ["751"],
      partOf: "Part XXIII — Sentencing",
    },
  ],

  // ── Part XXIV — Dangerous Offenders and Long-term Offenders ──
  [
    "752",
    {
      title: "Definitions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-752.html`,
      summary:
        "Defines terms used in this Part, including court, designated offence, long-term supervision, primary designated offence and serious personal injury offence, by listing the specific Criminal Code provisions and criteria each term covers.",
      relatedSections: ["753", "753.01", "753.1", "759"],
      partOf: "Part XXIV — Dangerous Offenders and Long-term Offenders",
    },
  ],
  [
    "752.01",
    {
      title: "Prosecutor’s duty to advise court",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-752.01.html`,
      summary:
        "Requires the prosecutor to tell the court, before sentencing, whether they intend to apply under section 752.1 where the offence is a serious personal injury offence and the offender has a specified pattern of prior related convictions.",
      relatedSections: ["752.1"],
      partOf: "Part XXIV — Dangerous Offenders and Long-term Offenders",
    },
  ],
  [
    "752.1",
    {
      title: "Application for remand for assessment",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-752.1.html`,
      summary:
        "Allows the court, on the prosecutor's application, to remand an offender for up to 60 days for an assessment where there are reasonable grounds to believe the offender may be found a dangerous or long-term offender, and sets deadlines and extension rules for filing the resulting report.",
      relatedSections: ["753", "753.1"],
      partOf: "Part XXIV — Dangerous Offenders and Long-term Offenders",
    },
  ],
  [
    "753",
    {
      title: "Application for finding that an offender is a dangerous offender",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-753.html`,
      summary:
        "Sets out the grounds on which a court must find an offender to be a dangerous offender based on patterns of violent or sexual behaviour, when such an application must be made, and the sentencing options available once that finding is made.",
      relatedSections: ["752", "753.1"],
      partOf: "Part XXIV — Dangerous Offenders and Long-term Offenders",
    },
  ],
  [
    "753.01",
    {
      title: "Application for remand for assessment — later conviction",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-753.01.html`,
      summary:
        "Sets out the process where a person already found to be a dangerous offender is convicted of a further serious offence, allowing the prosecutor to seek a fresh assessment and then apply for indeterminate detention or a new period of long-term supervision.",
      relatedSections: ["753.3"],
      partOf: "Part XXIV — Dangerous Offenders and Long-term Offenders",
    },
  ],
  [
    "753.02",
    {
      title: "Victim evidence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-753.02.html`,
      summary:
        "Provides that victim evidence given at a dangerous offender application hearing is also deemed to have been given at any related hearing under sections 753 or 753.01.",
      relatedSections: ["753", "753.01"],
      partOf: "Part XXIV — Dangerous Offenders and Long-term Offenders",
    },
  ],
  [
    "753.1",
    {
      title: "Application for finding that an offender is a long-term offender",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-753.1.html`,
      summary:
        "Sets out the conditions under which a court may find an offender to be a long-term offender, including a substantial risk of reoffending and a reasonable possibility of controlling that risk in the community, and the resulting sentence and supervision order.",
      relatedSections: ["151", "152", "153", "153.1", "163.1", "170"],
      partOf: "Part XXIV — Dangerous Offenders and Long-term Offenders",
    },
  ],
  [
    "753.2",
    {
      title: "Long-term supervision",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-753.2.html`,
      summary:
        "Describes how and when long-term supervision in the community begins after an offender finishes their sentences, and the process for applying to reduce or end the supervision period on the ground that the offender no longer poses a substantial risk.",
      partOf: "Part XXIV — Dangerous Offenders and Long-term Offenders",
    },
  ],
  [
    "753.3",
    {
      title: "Breach of long-term supervision",
      severity: "Hybrid",
      maxPenalty: "Indictable: imprisonment for not more than 10 years. Also punishable on summary conviction if the Crown elects that procedure.",
      url: `${JUSTICE_LAWS_BASE}/section-753.3.html`,
      summary:
        "Makes it an offence for an offender to fail or refuse, without reasonable excuse, to comply with a long-term supervision order, and sets out where the offender may be tried and punished.",
      partOf: "Part XXIV — Dangerous Offenders and Long-term Offenders",
    },
  ],
  [
    "753.4",
    {
      title: "New offence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-753.4.html`,
      summary:
        "Provides that long-term supervision is interrupted while an offender serves a new sentence of imprisonment for a further offence, unless the court orders otherwise or reduces the supervision period.",
      partOf: "Part XXIV — Dangerous Offenders and Long-term Offenders",
    },
  ],
  [
    "754",
    {
      title: "Hearing of application",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-754.html`,
      summary:
        "Sets conditions that must be met before a court can hear a dangerous or long-term offender application, including Attorney General consent and notice to the offender, and states the application is heard by the court alone without a jury.",
      partOf: "Part XXIV — Dangerous Offenders and Long-term Offenders",
    },
  ],
  [
    "755",
    {
      title: "Exception to long-term supervision — life sentence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-755.html`,
      summary:
        "Bars a court from ordering long-term supervision for an offender sentenced to life imprisonment and caps the total periods of long-term supervision an offender may be subject to at ten years.",
      partOf: "Part XXIV — Dangerous Offenders and Long-term Offenders",
    },
  ],
  [
    "757",
    {
      title: "Evidence of character",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-757.html`,
      summary:
        "Allows evidence of the offender's character and repute to be admitted on the question of whether they are a dangerous or long-term offender and in connection with the sentence or order to be made.",
      partOf: "Part XXIV — Dangerous Offenders and Long-term Offenders",
    },
  ],
  [
    "758",
    {
      title: "Presence of accused at hearing of application",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-758.html`,
      summary:
        "Requires the offender to be present at the hearing of a dangerous or long-term offender application and sets out how the court secures their attendance, with exceptions allowing removal for misconduct or permitted absence.",
      partOf: "Part XXIV — Dangerous Offenders and Long-term Offenders",
    },
  ],
  [
    "759",
    {
      title: "Appeal — offender",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-759.html`,
      summary:
        "Gives the offender and the Attorney General rights to appeal a dangerous or long-term offender decision to the court of appeal, describes the court of appeal's powers on such an appeal, and applies the general appeal procedure rules.",
      relatedSections: ["719"],
      partOf: "Part XXIV — Dangerous Offenders and Long-term Offenders",
    },
  ],
  [
    "760",
    {
      title: "Disclosure to Correctional Service of Canada",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-760.html`,
      summary:
        "Requires the court, upon finding an offender to be a dangerous or long-term offender, to forward copies of expert reports, testimony, the court's reasons and the trial transcript to the Correctional Service of Canada.",
      partOf: "Part XXIV — Dangerous Offenders and Long-term Offenders",
    },
  ],
  [
    "761",
    {
      title: "Review for parole",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-761.html`,
      summary:
        "Requires the Parole Board of Canada to periodically review the case of a person serving an indeterminate sentence to decide whether parole should be granted, with different review timelines depending on when the sentence was imposed.",
      partOf: "Part XXIV — Dangerous Offenders and Long-term Offenders",
    },
  ],

  // ── Part XXV — Effect and Enforcement of Undertakings, Release Orders and Recognizances ──
  [
    "762",
    {
      title: "Applications for forfeiture",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-762.html`,
      summary:
        "Sets out that applications to forfeit an amount under an undertaking, release order or recognizance must be made to specified courts, and defines terms used in this Part.",
      partOf: "Part XXV — Effect and Enforcement of Undertakings, Release Orders and Recognizances",
    },
  ],
  [
    "763",
    {
      title: "Undertaking or release order binding on person",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-763.html`,
      summary:
        "Provides that a person and their sureties remain bound by an undertaking, release order or recognizance to appear in court even if proceedings are adjourned or the trial location is changed, and requires a summary of the section to appear on such documents.",
      partOf: "Part XXV — Effect and Enforcement of Undertakings, Release Orders and Recognizances",
    },
  ],
  [
    "764",
    {
      title: "Undertaking or release order binding on accused",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-764.html`,
      summary:
        "Provides that an accused's arraignment or conviction does not cancel their release conditions, which continue to bind them and their sureties until discharge or sentencing, and allows the court to commit the accused or require new sureties, discharging existing sureties if committal occurs.",
      partOf: "Part XXV — Effect and Enforcement of Undertakings, Release Orders and Recognizances",
    },
  ],
  [
    "765",
    {
      title: "Effect of subsequent arrest",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-765.html`,
      summary:
        "Provides that an accused's arrest on another charge does not cancel an existing undertaking or release order, which continues to bind them and their sureties until they are discharged or sentenced on the original offence.",
      partOf: "Part XXV — Effect and Enforcement of Undertakings, Release Orders and Recognizances",
    },
  ],
  [
    "766",
    {
      title: "Render of accused by sureties",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-766.html`,
      summary:
        "Sets out the process by which a surety can apply to be relieved of their obligation, resulting in an order committing the person to prison, and describes how the arrest, delivery, and endorsement of that committal discharge the sureties.",
      partOf: "Part XXV — Effect and Enforcement of Undertakings, Release Orders and Recognizances",
    },
  ],
  [
    "767",
    {
      title: "Render of accused in court by sureties",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-767.html`,
      summary:
        "Allows a surety to bring the person they are bound for before the court and discharge their obligation by surrendering that person into the court's custody, after which the court commits the person to prison.",
      partOf: "Part XXV — Effect and Enforcement of Undertakings, Release Orders and Recognizances",
    },
  ],
  [
    "767.1",
    {
      title: "Substitution of surety",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-767.1.html`,
      summary:
        "Allows a court, justice or provincial court judge to substitute another suitable person for a surety instead of committing the accused to prison, and provides that signing by the new surety discharges the original one without otherwise affecting the release order or recognizance.",
      relatedSections: ["767", "766"],
      partOf: "Part XXV — Effect and Enforcement of Undertakings, Release Orders and Recognizances",
    },
  ],
  [
    "768",
    {
      title: "Rights of surety preserved",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-768.html`,
      summary:
        "Preserves a surety's existing right to take and give into custody any person for whom they are a surety under a release order or recognizance.",
      partOf: "Part XXV — Effect and Enforcement of Undertakings, Release Orders and Recognizances",
    },
  ],
  [
    "769",
    {
      title: "Application of judicial interim release provisions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-769.html`,
      summary:
        "Provides that when a surety has rendered a person into custody and that person is committed to prison, the judicial interim release provisions apply and the person must promptly be brought before a justice or judge as if newly charged or appealing.",
      partOf: "Part XXV — Effect and Enforcement of Undertakings, Release Orders and Recognizances",
    },
  ],
  [
    "770",
    {
      title: "Default to be endorsed",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-770.html`,
      summary:
        "Requires a court, judge or justice who learns that a person has not complied with an undertaking, release order or recognizance to endorse a certificate detailing the default, and sets out how the document and any deposited money are transmitted to the clerk of the court.",
      partOf: "Part XXV — Effect and Enforcement of Undertakings, Release Orders and Recognizances",
    },
  ],
  [
    "771",
    {
      title: "Proceedings in case of default",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-771.html`,
      summary:
        "Sets out the procedure for holding a forfeiture hearing after a default has been certified, including notice to the principal and sureties, the judge's power to order forfeiture making them judgment debtors of the Crown, and how the order may be filed and enforced or a deposit transferred instead.",
      partOf: "Part XXV — Effect and Enforcement of Undertakings, Release Orders and Recognizances",
    },
  ],
  [
    "772",
    {
      title: "Levy under writ",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-772.html`,
      summary:
        "Directs the sheriff to execute a writ of fieri facias issued under this Part in the same manner as similar civil writs and entitles the Crown to costs of execution as fixed by the applicable provincial tariff.",
      relatedSections: ["771"],
      partOf: "Part XXV — Effect and Enforcement of Undertakings, Release Orders and Recognizances",
    },
  ],
  [
    "773",
    {
      title: "Committal when writ not satisfied",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-773.html`,
      summary:
        "Sets out the process for committing sureties to prison where a writ of fieri facias has not been fully satisfied, including notice requirements and the judge's discretion to discharge the amount owed or order imprisonment.",
      relatedSections: ["771", "734.4"],
      partOf: "Part XXV — Effect and Enforcement of Undertakings, Release Orders and Recognizances",
    },
  ],

  // ── Part XXVI — Extraordinary Remedies ──
  [
    "774",
    {
      title: "Application of Part",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-774.html`,
      summary:
        "States that this Part applies to criminal proceedings by way of certiorari, habeas corpus, mandamus, procedendo and prohibition.",
      partOf: "Part XXVI — Extraordinary Remedies",
    },
  ],
  [
    "774.1",
    {
      title: "Appearance in person — habeas corpus",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-774.1.html`,
      summary:
        "Requires the person who is the subject of a writ of habeas corpus to appear in court in person, despite any other provision of the Act.",
      partOf: "Part XXVI — Extraordinary Remedies",
    },
  ],
  [
    "775",
    {
      title: "Detention on inquiry to determine legality of imprisonment",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-775.html`,
      summary:
        "Allows a judge or court hearing habeas corpus-type proceedings about the legality of a person's custody to order further detention without deciding the issue, and to direct further proceedings or evidence to best serve the interests of justice.",
      partOf: "Part XXVI — Extraordinary Remedies",
    },
  ],
  [
    "776",
    {
      title: "Where conviction or order not reviewable",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-776.html`,
      summary:
        "Bars removal of a conviction or order by certiorari where an appeal was taken, or where the defendant appeared, pleaded and had the merits tried but did not appeal despite being able to.",
      partOf: "Part XXVI — Extraordinary Remedies",
    },
  ],
  [
    "777",
    {
      title: "Conviction or order remediable, when",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-777.html`,
      summary:
        "Sets out that a conviction, order or warrant reviewed on certiorari will not be held invalid for irregularity if the court is satisfied the offence was committed, there was jurisdiction, and the punishment was lawful, and describes how the court corrects an excessive sentence or remits the matter back.",
      partOf: "Part XXVI — Extraordinary Remedies",
    },
  ],
  [
    "778",
    {
      title: "Irregularities within section 777",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-778.html`,
      summary:
        "Clarifies that section 777 also applies where the adjudication is stated in the wrong tense, where a lesser punishment than lawfully available was imposed, or where circumstances that would make the act lawful were not negatived in the charging document.",
      relatedSections: ["777"],
      partOf: "Part XXVI — Extraordinary Remedies",
    },
  ],
  [
    "779",
    {
      title: "General order for security by recognizance",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-779.html`,
      summary:
        "Allows a court with authority to quash a conviction on certiorari to require the defendant to post a recognizance or deposit as a condition of hearing the motion, and applies the Part XXV forfeiture provisions to that recognizance.",
      partOf: "Part XXVI — Extraordinary Remedies",
    },
  ],
  [
    "780",
    {
      title: "Effect of order dismissing application to quash",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-780.html`,
      summary:
        "Provides that when a motion to quash a conviction or order is refused, that refusal authorizes the clerk to return the matter to the original court for enforcement proceedings.",
      partOf: "Part XXVI — Extraordinary Remedies",
    },
  ],
  [
    "781",
    {
      title: "Want of proof of order in council",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-781.html`,
      summary:
        "Provides that a conviction or proceeding cannot be quashed and a defendant cannot be discharged merely because evidence was not given of certain proclamations, orders or regulations or their publication, since such matters are judicially noticed.",
      partOf: "Part XXVI — Extraordinary Remedies",
    },
  ],
  [
    "782",
    {
      title: "Defect in form",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-782.html`,
      summary:
        "Provides that a warrant of committal is not void on certiorari or habeas corpus merely for a defect, as long as it alleges the defendant was convicted and a valid conviction supports it.",
      partOf: "Part XXVI — Extraordinary Remedies",
    },
  ],
  [
    "783",
    {
      title: "No action against official when conviction, etc., quashed",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-783.html`,
      summary:
        "Allows the court or judge, when quashing a conviction or order made by a provincial court judge or justice who exceeded their jurisdiction, to order that no civil proceedings be taken against that judicial officer or any official who acted under it.",
      partOf: "Part XXVI — Extraordinary Remedies",
    },
  ],
  [
    "784",
    {
      title: "Appeal in mandamus, etc.",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-784.html`,
      summary:
        "Allows an appeal to the court of appeal from decisions on mandamus, certiorari or prohibition, and sets out special appeal rules for habeas corpus applications, including restrictions on repeat applications and who may appeal a decision to grant or deny the writ.",
      partOf: "Part XXVI — Extraordinary Remedies",
    },
  ],

  // ── Part XXVII — Summary Convictions ──
  [
    "785",
    {
      title: "Definitions",
      severity: "Summary",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-785.html`,
      summary:
        "Defines terms used throughout this Part, including clerk of the appeal court, informant, information, order, proceedings, prosecutor, sentence, summary conviction court, and trial.",
      relatedSections: ["199", "109", "110", "730", "731", "732"],
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "786",
    {
      title: "Application of Part",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-786.html`,
      summary:
        "States that this Part applies to proceedings as defined here unless the law provides otherwise, and requires proceedings to be commenced within 12 months of when the subject matter arose unless the prosecutor and defendant agree otherwise.",
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "787",
    {
      title: "General penalty",
      severity: "Summary",
      maxPenalty: "Fine of not more than $5,000, or imprisonment for not more than two years less a day, or both — this is itself the general default penalty for summary conviction offences that have no penalty otherwise specified by law.",
      url: `${JUSTICE_LAWS_BASE}/section-787.html`,
      summary:
        "Sets the general penalty that applies to summary conviction offences when no other penalty is specified by law, and allows a court to order imprisonment in default of payment of a fine or compliance with an order when the authorizing law does not otherwise provide for default imprisonment.",
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "788",
    {
      title: "Commencement of proceedings",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-788.html`,
      summary:
        "Requires proceedings under this Part to be commenced by laying an information in the prescribed form, and allows a single justice to receive the information, issue a summons or warrant, and handle preliminary matters even where the law otherwise requires two or more justices.",
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "789",
    {
      title: "Formalities of information",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-789.html`,
      summary:
        "Sets out formal requirements for an information, including that it be in writing and under oath and that multiple offences or matters be set out in separate counts, and prohibits referencing previous convictions in an information where they would increase the punishment.",
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "790",
    {
      title: "Any justice may act before and after trial",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-790.html`,
      summary:
        "Clarifies that the justice who commences proceedings or issues process need not be the same justice who presides at trial, and sets out how multiple justices with jurisdiction over proceedings must act together at trial while one justice may act afterward.",
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "794",
    {
      title: "No need to negative exception, etc.",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-794.html`,
      summary:
        "States that an information does not need to set out or negative any exception, exemption, proviso, excuse or qualification prescribed by law.",
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "795",
    {
      title: "Application of Parts XVI, XVIII, XVIII.1, XX, XX.1 and XXII.01",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-795.html`,
      summary:
        "Applies specified provisions of other Parts of the Act dealing with compelling an accused's appearance and related procedures to proceedings under this Part, with necessary modifications.",
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "798",
    {
      title: "Jurisdiction",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-798.html`,
      summary:
        "Gives every summary conviction court jurisdiction to try, determine and adjudge proceedings under this Part within the territorial division over which the presiding person has jurisdiction.",
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "799",
    {
      title: "Non-appearance of prosecutor",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-799.html`,
      summary:
        "Allows a summary conviction court to dismiss the information or adjourn the trial when the defendant appears but the prosecutor, despite due notice, does not.",
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "800",
    {
      title: "When both parties appear",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-800.html`,
      summary:
        "Requires the court to proceed with trial when both prosecutor and defendant appear, and sets out how a defendant may appear personally, by counsel or agent, or, if an organization, must appear by counsel or agent.",
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "801",
    {
      title: "Arraignment",
      severity: "Summary",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-801.html`,
      summary:
        "Sets out the arraignment process where the substance of the information is stated to the defendant and a plea or cause is requested, and describes the resulting procedure depending on whether the charge is admitted or contested.",
      relatedSections: ["730"],
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "802",
    {
      title: "Right to make full answer and defence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-802.html`,
      summary:
        "Confirms the prosecutor's right to personally conduct the case and the defendant's right to make full answer and defence, allows both to examine and cross-examine witnesses personally or through counsel or agent, and requires witnesses to be examined under oath.",
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "802.1",
    {
      title: "Limitation on the use of agents",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-802.1.html`,
      summary:
        "Restricts a defendant's ability to appear or examine and cross-examine witnesses through an agent where they face potential imprisonment of more than six months, except in specified circumstances such as being an organization or requesting an adjournment.",
      relatedSections: ["800", "802"],
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "803",
    {
      title: "Adjournment",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-803.html`,
      summary:
        "Gives the court discretion to adjourn a trial and directs it to consider the interests of justice, including victim interests, and sets out what the court may do when a defendant or prosecutor fails to appear at a scheduled or resumed trial.",
      relatedSections: ["145"],
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "804",
    {
      title: "Finding of guilt, conviction, order or dismissal",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-804.html`,
      summary:
        "Directs the summary conviction court, after hearing the prosecutor, defendant and witnesses, to convict, discharge, make an order against, or dismiss the information regarding the defendant as appropriate.",
      relatedSections: ["730"],
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "806",
    {
      title: "Memo of conviction or order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-806.html`,
      summary:
        "Requires a memorandum of conviction or order to be made and, on request, a certified copy provided, and requires the court to issue a warrant of committal where a defendant is convicted or an order made against them.",
      relatedSections: ["528"],
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "807",
    {
      title: "Disposal of penalties when joint offenders",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-807.html`,
      summary:
        "Sets out how payments ordered against multiple joint offenders convicted of the same offence are to be limited and distributed so the person harmed does not receive more than the value of the loss plus costs.",
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "808",
    {
      title: "Order of dismissal",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-808.html`,
      summary:
        "Allows a summary conviction court to draw up and provide a certified copy of an order of dismissal at the defendant's request, and provides that such a certified copy bars any subsequent proceedings against the defendant for the same matter.",
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "809",
    {
      title: "Costs",
      severity: "Summary",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-809.html`,
      summary:
        "Gives a summary conviction court discretion to award costs to the informant or the defendant depending on the outcome, and sets out how costs relate to fines, imprisonment in default, and their definition.",
      relatedSections: ["840"],
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "810",
    {
      title: "If injury or damage feared",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-810.html`,
      summary:
        "Allows a person who fears on reasonable grounds that another will cause them personal injury, damage their property, or commit certain offences to lay an information, and sets out the process for the justice or court to order a recognizance to keep the peace, commit the defendant to prison on refusal, and attach conditions.",
      relatedSections: ["162.1", "810.3"],
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "810.01",
    {
      title: "Fear of certain offences",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-810.01.html`,
      summary:
        "Allows a person who fears certain offences to lay an information with Attorney General consent, and sets out the process for ordering a recognizance to keep the peace, extending its duration for prior convictions, committing the defendant to prison on refusal, and attaching conditions.",
      relatedSections: ["423.1", "810.3", "810"],
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "810.011",
    {
      title: "Fear of terrorism offence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-810.011.html`,
      summary:
        "Allows a person who fears a terrorism offence to lay an information with Attorney General consent, and sets out the process for ordering a recognizance to keep the peace, extending its duration for a prior terrorism conviction, committing the defendant to prison on refusal, and attaching conditions.",
      relatedSections: ["810.3", "810"],
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "810.02",
    {
      title: "Fear of forced marriage or marriage under age of 16 years",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-810.02.html`,
      summary:
        "Allows a person who fears a forced marriage or underage marriage offence to lay an information, and sets out the process for ordering a recognizance to keep the peace, extending its duration for prior convictions, committing the defendant to prison on refusal, and attaching conditions such as prohibiting marriage arrangements or requiring surrender of travel documents.",
      relatedSections: ["273.3", "293.1", "293.2"],
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "810.03",
    {
      title: "Fear of domestic violence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-810.03.html`,
      summary:
        "Allows a person who fears an offence causing personal injury to an intimate partner or child to lay an information, and sets out the process for ordering a recognizance to keep the peace, extending its duration for a prior violence-related conviction, considering Indigenous support services, committing the defendant to prison on refusal, and attaching protective conditions.",
      relatedSections: ["810.3"],
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "810.1",
    {
      title: "Fear of sexual offence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-810.1.html`,
      summary:
        "Allows a person who fears certain sexual offences against a person under 18 to lay an information, and sets out the process for ordering a recognizance to keep the peace, extending its duration for a prior sexual offence conviction, and attaching conditions such as restricting contact with minors or internet use.",
      relatedSections: ["151", "152", "153", "155", "160", "163.1"],
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "810.2",
    {
      title: "Where fear of serious personal injury offence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-810.2.html`,
      summary:
        "Allows a person who fears a serious personal injury offence to lay an information with Attorney General consent, and sets out the process for ordering a recognizance to keep the peace, extending its duration for prior convictions, committing the defendant to prison on refusal, and attaching conditions.",
      relatedSections: ["752", "810.3", "810"],
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "810.21",
    {
      title: "Audioconference or videoconference",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-810.21.html`,
      summary:
        "Allows a provincial court judge, on the prosecutor's application, to order that a defendant appear by audioconference or videoconference in specified peace-recognizance proceedings, and applies related provisions with necessary modifications.",
      relatedSections: ["83.3", "810", "810.2", "769", "714.1", "714.8"],
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "810.22",
    {
      title: "Transfer of order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-810.22.html`,
      summary:
        "Sets out the process for transferring a peace-recognizance order to a provincial court judge in another territorial division when the bound person moves or is charged, convicted or discharged there, subject to Attorney General consent, and addresses who may act if the original judge is unavailable.",
      relatedSections: ["83.3", "810", "810.2", "811", "730"],
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "810.3",
    {
      title: "Samples — designations and specifications",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-810.3.html`,
      summary:
        "Requires the Attorney General of a province or territorial minister of justice to designate persons, places and procedures for taking, analyzing, storing and destroying bodily substance samples and related records under specified peace-recognizance provisions, and authorizes regulations governing these matters.",
      relatedSections: ["810", "810.01", "810.011", "810.03", "810.1", "810.2"],
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "810.4",
    {
      title: "Prohibition on use of bodily substance",
      severity: "Summary",
      maxPenalty: "Guilty of an offence punishable on summary conviction; this section does not itself specify a fine or imprisonment amount.",
      url: `${JUSTICE_LAWS_BASE}/section-810.4.html`,
      summary:
        "Restricts the use of a bodily substance provided under specified peace-recognizance provisions to determining compliance with abstinence conditions, restricts disclosure of analysis results subject to limited exceptions, and makes contravention an offence punishable on summary conviction.",
      relatedSections: ["810", "810.01", "810.011", "810.1", "810.2", "811"],
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "810.5",
    {
      title: "Orders under sections 486 to 486.5 and 486.7",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-810.5.html`,
      summary:
        "Applies specified publication-ban and related order provisions to proceedings under specified peace-recognizance sections, and makes failing to comply with such an order an offence.",
      relatedSections: ["486", "486.4", "486.5", "486.6", "486.7"],
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "811",
    {
      title: "Breach of recognizance",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-811.html`,
      summary:
        "Describes breaching a recognizance under specified peace-recognizance provisions as an offence that can be prosecuted either as an indictable offence or as an offence punishable on summary conviction.",
      relatedSections: ["83.3", "810", "810.2"],
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "811.1",
    {
      title: "Proof of certificate of analyst — bodily substance",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-811.1.html`,
      summary:
        "Sets out how a signed analyst's certificate regarding a bodily substance sample may be used as evidence in a prosecution for breach of an abstinence condition, and requires advance notice before it is admitted and allows the opposing party to require the analyst's attendance for cross-examination.",
      relatedSections: ["320.11", "810", "810.01", "810.011", "810.1", "810.2"],
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "812",
    {
      title: "Definition of appeal court",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-812.html`,
      summary:
        "Defines \"appeal court\" for sections 813 to 828, listing which court in each province or territory serves that function. Also specifies that a judge of the Court of Appeal of Nunavut is the appeal court when the appeal is from a summary conviction court judge of the Nunavut Court of Justice.",
      relatedSections: ["813", "828"],
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "813",
    {
      title: "Appeal by defendant, informant or Attorney General",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-813.html`,
      summary:
        "Sets out who may appeal a summary conviction proceeding and on what grounds: the defendant may appeal a conviction, order, sentence, or certain verdicts, and the informant or Attorney General may appeal a stay, dismissal, sentence, or certain verdicts. Gives the Attorney General of Canada the same appeal rights as a provincial Attorney General in proceedings instituted by the federal government.",
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "814",
    {
      title: "Manitoba and Alberta",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-814.html`,
      summary:
        "Specifies where an appeal under section 813 is to be heard in various provinces and the territories, generally at the sittings nearest to where the adjudication or proceedings arose, unless the appeal court judge appoints another location on a party's application.",
      relatedSections: ["813"],
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "815",
    {
      title: "Notice of appeal",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-815.html`,
      summary:
        "Requires an appellant to give notice of appeal in the manner and within the period set by rules of court, and allows the appeal court or a judge to extend that time.",
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "816",
    {
      title: "Release order — appellant",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-816.html`,
      summary:
        "Requires a defendant who appeals under section 813 and is in custody to remain in custody unless the appeal court makes a release order, and requires immediate release once the appellant complies with that order. Applies certain other sections, with modifications, to these proceedings.",
      relatedSections: ["813", "515", "495.1", "512.3", "524"],
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "817",
    {
      title: "Recognizance of prosecutor",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-817.html`,
      summary:
        "Requires a prosecutor appealing under section 813 to appear before a justice and enter into a recognizance, with conditions the justice sets, ensuring the prosecutor will appear at the appeal hearing. Does not apply to appeals taken by the Attorney General.",
      relatedSections: ["813", "815"],
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "818",
    {
      title: "Application to appeal court for review",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-818.html`,
      summary:
        "Allows either the appellant or respondent to apply to the appeal court to review an order made by a justice under section 817, and directs the appeal court to dismiss or allow the application after hearing both sides. An order made on review has the same effect as one made by the justice.",
      relatedSections: ["817"],
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "819",
    {
      title: "Application to fix date for hearing of appeal",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-819.html`,
      summary:
        "Requires the person holding an in-custody appellant to apply to the appeal court to fix a hearing date if the appeal has not been heard within thirty days of the notice of appeal. Directs the appeal court to then fix a date and give directions to expedite the hearing.",
      relatedSections: ["815"],
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "820",
    {
      title: "Payment of fine not a waiver of appeal",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-820.html`,
      summary:
        "States that paying a fine after conviction does not by itself waive the right to appeal. Also creates a presumption that a conviction, order, or sentence has not been appealed until shown otherwise.",
      relatedSections: ["813"],
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "821",
    {
      title: "Notification and transmission of conviction, etc.",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-821.html`,
      summary:
        "Sets out the process for notifying the summary conviction court of an appeal and transmitting the conviction, order, and related materials to the appeal court, and requires the appellant to furnish a transcript of the trial evidence. Provides that an appeal is not dismissed solely because someone other than the appellant failed to comply with these procedural requirements.",
      relatedSections: ["815", "540"],
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "822",
    {
      title: "Certain sections applicable to appeals",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-822.html`,
      summary:
        "Applies certain provisions on appeals (sections 683 to 689) to appeals under section 813, sets rules for where a new trial is held, and governs release or detention pending a new trial. Also allows the appeal court to order a trial de novo in certain circumstances, sets rules for using prior witness evidence, and governs how sentence appeals and defects in process are to be handled.",
      relatedSections: ["813", "683", "689", "515", "809"],
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "824",
    {
      title: "Adjournment",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-824.html`,
      summary:
        "Allows the appeal court to adjourn the hearing of an appeal as necessary, and requires it to consider the interests of justice, including a victim's interests where readily available information exists, when deciding whether to adjourn.",
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "825",
    {
      title: "Dismissal for failure to appear or want of prosecution",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-825.html`,
      summary:
        "Allows the appeal court to dismiss an appeal on proof that the appellant failed to comply with release or recognizance conditions, or that the appeal was not proceeded with or was abandoned.",
      relatedSections: ["816", "817"],
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "826",
    {
      title: "Costs",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-826.html`,
      summary:
        "Allows the appeal court to make any order it considers just and reasonable regarding costs when an appeal is heard and determined, abandoned, or dismissed for want of prosecution.",
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "827",
    {
      title: "To whom costs payable, and when",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-827.html`,
      summary:
        "Sets out the process for payment of costs ordered by the appeal court, including a required payment period, a certificate process when costs go unpaid, and committal to imprisonment for a defaulter who fails to pay.",
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "828",
    {
      title: "Enforcement of conviction or order by court of appeal",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-828.html`,
      summary:
        "Allows a conviction or order made by the appeal court to be enforced as if made by the summary conviction court, or by the appeal court's own process. Sets out how a justice enforces such an order and what documents the appeal court clerk must send to the justice.",
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "829",
    {
      title: "Definition of appeal court",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-829.html`,
      summary:
        "Defines \"appeal court\" for sections 830 to 838 as the superior court of criminal jurisdiction of the province, except that for Nunavut appeals from a Nunavut Court of Justice judge the appeal court is a judge of the Court of Appeal of Nunavut.",
      relatedSections: ["830", "838"],
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "830",
    {
      title: "Appeals",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-830.html`,
      summary:
        "Allows a party or the Attorney General to appeal a conviction, judgment, verdict, or other final determination of a summary conviction court on grounds it was erroneous in law, in excess of jurisdiction, or a refusal to exercise jurisdiction. Sets out the form the appeal must take, the filing deadlines, and gives the federal Attorney General the same appeal rights as a provincial one.",
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "831",
    {
      title: "Application",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-831.html`,
      summary:
        "Applies sections 816, 817, 819, and 825, with modifications, to appeals under section 830, and requires the appeal court to give directions expediting the hearing when applied to by the custodian of an in-custody appellant.",
      relatedSections: ["816", "817", "819", "825", "830"],
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "832",
    {
      title: "Release order or recognizance",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-832.html`,
      summary:
        "Allows the appeal court to make a release order for a defendant appellant, or to require another appellant to enter into a recognizance, once a notice of appeal is filed under section 830. Does not apply when the appellant is the Attorney General or counsel for the Attorney General.",
      relatedSections: ["830", "816", "817"],
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "833",
    {
      title: "No writ required",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-833.html`,
      summary:
        "States that no writ of certiorari or other writ is needed to bring a summary conviction court's conviction, judgment, verdict, or other final order before the appeal court for its determination.",
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "834",
    {
      title: "Powers of appeal court",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-834.html`,
      summary:
        "Gives the appeal court authority to hear and determine the grounds of an appeal filed under section 830, and to affirm, reverse, modify, or remit the matter, along with any related order including costs. Allows a judge exercising the appeal court's authority to do so in chambers in or out of term time.",
      relatedSections: ["830"],
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "835",
    {
      title: "Enforcement",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-835.html`,
      summary:
        "Gives the summary conviction court or a justice with the same jurisdiction the authority to enforce a conviction, order, or determination affirmed, modified, or made by the appeal court, as if no appeal had been taken. Also allows the appeal court's order to be enforced by its own process.",
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "836",
    {
      title: "Appeal under section 830",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-836.html`,
      summary:
        "States that a person who appeals under section 830 from a decision they were also entitled to appeal under section 813 is deemed to have abandoned their rights of appeal under section 813.",
      relatedSections: ["830", "813"],
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "837",
    {
      title: "Appeal barred",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-837.html`,
      summary:
        "States that no appeal lies under section 830 from a conviction or order where the law otherwise provides that no appeal lies from it.",
      relatedSections: ["830"],
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "838",
    {
      title: "Extension of time",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-838.html`,
      summary:
        "Allows the appeal court or a judge of it to extend, at any time, any time period referred to in sections 830, 831, or 832.",
      relatedSections: ["830", "831", "832"],
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "839",
    {
      title: "Appeal on question of law",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-839.html`,
      summary:
        "Allows an appeal to the court of appeal, with leave, on a ground involving a question of law alone, against certain decisions made under sections 822 or 834, and sets out a corresponding leave-to-appeal process for Nunavut. Applies sections 673 to 689 with modifications, allows the court of appeal to make cost orders, sets out how its decision is enforced, and gives the federal Attorney General the same appeal rights as a provincial one.",
      relatedSections: ["673", "822", "834", "812", "829", "689"],
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "840",
    {
      title: "Fees and allowances",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-840.html`,
      summary:
        "States that the fees and allowances listed in the schedule to this Part apply in proceedings before summary conviction courts and justices, subject to the lieutenant governor in council's power to disallow them and substitute other fees and allowances in a province.",
      partOf: "Part XXVII — Summary Convictions",
    },
  ],

  // ── Part XXVIII — Miscellaneous ──
  [
    "841",
    {
      title: "Definitions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-841.html`,
      summary:
        "Defines \"data\" and \"electronic document\" for the purposes of sections 841 to 847.",
      relatedSections: ["842", "847"],
      partOf: "Part XXVIII — Miscellaneous",
    },
  ],
  [
    "842",
    {
      title: "Dealing with data in court",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-842.html`,
      summary:
        "Allows a court to create, collect, receive, store, transfer, distribute, publish, or otherwise deal with electronic documents, provided it does so in accordance with an Act or the rules of court.",
      partOf: "Part XXVIII — Miscellaneous",
    },
  ],
  [
    "843",
    {
      title: "Transfer of data",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-843.html`,
      summary:
        "Allows a court to accept the electronic transfer of data if the transfer complies with the laws of the place it originates or the place it is received, and states that filing by electronic transfer is complete once the court accepts the transfer.",
      partOf: "Part XXVIII — Miscellaneous",
    },
  ],
  [
    "844",
    {
      title: "Documents in writing",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-844.html`,
      summary:
        "States that a requirement under the Act that a document be in writing is satisfied by making the document in electronic form in accordance with an Act or the rules of court.",
      partOf: "Part XXVIII — Miscellaneous",
    },
  ],
  [
    "845",
    {
      title: "Signatures",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-845.html`,
      summary:
        "Allows a court to accept a signature made in an electronic document, where a document under the Act must be signed, if the signature is made in accordance with an Act or the rules of court.",
      partOf: "Part XXVIII — Miscellaneous",
    },
  ],
  [
    "846",
    {
      title: "Oaths",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-846.html`,
      summary:
        "Allows a court to accept an information, affidavit, solemn declaration, or sworn statement in electronic form if the document states the matters are true, the person taking it states it was made under oath or affirmation, and it was made in accordance with the laws of the place it was made.",
      partOf: "Part XXVIII — Miscellaneous",
    },
  ],
  [
    "847",
    {
      title: "Copies",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-847.html`,
      summary:
        "Entitles a person who is entitled to a copy of a court document to obtain a printed copy of it, where it exists in electronic form, on payment of a fee set by tariff approved by the relevant Attorney General.",
      partOf: "Part XXVIII — Miscellaneous",
    },
  ],
  [
    "849",
    {
      title: "Forms",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-849.html`,
      summary:
        "States that the forms set out in this Part, or forms to like effect, are deemed good, valid, and sufficient when varied to suit the case, that no justice is required to affix a seal to writings for which a form is provided, and that pre-printed portions of these forms must be printed in both official languages.",
      partOf: "Part XXVIII — Miscellaneous",
    },
  ],
]);

export const CRIMINAL_CODE_PARTS = [
  { id: "I", label: "Part I — General" },
  { id: "II", label: "Part II — Offences Against Public Order" },
  { id: "II.1", label: "Part II.1 — Terrorism" },
  { id: "III", label: "Part III — Firearms and Other Weapons" },
  { id: "IV", label: "Part IV — Offences Against the Administration of Law and Justice" },
  { id: "V", label: "Part V — Sexual Offences, Public Morals and Disorderly Conduct" },
  { id: "VI", label: "Part VI — Invasion of Privacy" },
  { id: "VII", label: "Part VII — Disorderly Houses, Gaming and Betting" },
  { id: "VIII", label: "Part VIII — Offences Against the Person and Reputation" },
  { id: "VIII.1", label: "Part VIII.1 — Offences Relating to Conveyances" },
  { id: "IX", label: "Part IX — Offences Against Rights of Property" },
  { id: "X", label: "Part X — Fraudulent Transactions Relating to Contracts and Trade" },
  { id: "XI", label: "Part XI — Wilful and Forbidden Acts in Respect of Certain Property" },
  { id: "XII", label: "Part XII — Offences Relating to Currency" },
  { id: "XII.2", label: "Part XII.2 — Proceeds of Crime" },
  { id: "XIII", label: "Part XIII — Attempts — Conspiracies — Accessories" },
  { id: "XIV", label: "Part XIV — Jurisdiction" },
  { id: "XV", label: "Part XV — Special Procedure and Powers" },
  { id: "XV.1", label: "Part XV.1 — Unreasonable Delay" },
  { id: "XVI", label: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release" },
  { id: "XVII", label: "Part XVII — Language of Accused" },
  { id: "XVIII", label: "Part XVIII — Procedure on Preliminary Inquiry" },
  { id: "XVIII.1", label: "Part XVIII.1 — Case Management Judge" },
  { id: "XIX", label: "Part XIX — Indictable Offences — Trial Without Jury" },
  { id: "XIX.1", label: "Part XIX.1 — Nunavut Court of Justice" },
  { id: "XX", label: "Part XX — Procedure in Jury Trials and General Provisions" },
  { id: "XX.1", label: "Part XX.1 — Mental Disorder" },
  { id: "XXI", label: "Part XXI — Appeals — Indictable Offences" },
  { id: "XXI.1", label: "Part XXI.1 — Applications for Ministerial Review — Miscarriages of Justice" },
  { id: "XXI.2", label: "Part XXI.2 — Miscarriage of Justice Review Commission" },
  { id: "XXII", label: "Part XXII — Procuring Attendance" },
  { id: "XXII.01", label: "Part XXII.01 — Remote Attendance by Certain Persons" },
  { id: "XXII.1", label: "Part XXII.1 — Remediation Agreements" },
  { id: "XXII.2", label: "Part XXII.2 — Alternative Measures and Restorative Justice Processes" },
  { id: "XXIII", label: "Part XXIII — Sentencing" },
  { id: "XXIV", label: "Part XXIV — Dangerous Offenders and Long-term Offenders" },
  { id: "XXV", label: "Part XXV — Effect and Enforcement of Undertakings, Release Orders and Recognizances" },
  { id: "XXVI", label: "Part XXVI — Extraordinary Remedies" },
  { id: "XXVII", label: "Part XXVII — Summary Convictions" },
  { id: "XXVIII", label: "Part XXVIII — Miscellaneous" },
];

/**
 * Normalize a citation string like "s. 348(1)(b)" or "Criminal Code s. 348"
 * to its base section number "348". Handles decimals like "320.14".
 * Returns null if no section number is found.
 */
export function normalizeSection(citation) {
  if (!citation || typeof citation !== "string") return null;

  // Clean up the string and look for the first number following s., section, or just a standalone number
  // Pattern: (statute prefix)? (s.|section)? (number)
  const match = citation.match(
    /(?:(?:criminal\s+code|CC|s\.|section)\s*|^)(\d+(?:\.\d+)?)/i,
  );
  return match ? match[1] : null;
}

/**
 * Look up a Criminal Code section. Returns the entry object or null.
 * Entry: { title, severity, maxPenalty, url, partOf, ... }
 */
export function lookupSection(citation) {
  const num = normalizeSection(citation);
  if (!num) return null;
  return CRIMINAL_CODE_SECTIONS.get(num) || null;
}
