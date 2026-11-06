// api/_firstNames.js
// Common given names, used to mask a name even when it is lowercase or has no
// cue word around it ("police busted down my door samantha").
//
// Deliberately EXCLUDED: given names that are also ordinary or legal words, so
// masking never eats the signal retrieval needs: will, mark, may, june, april,
// grant, jordan, cody, hunter, mason, chase, drew, frank, guy, don, dean, earl,
// grace, hope, faith, joy, rose, ruby, amber, crystal, nick, rob, bob, jack, sue,
// penny, patty, holly,
// pat, ray, art, max, miles, lance, wade, ward, page, victoria and the cities
// that double as names (london, regina, windsor, richmond...).
// It is a heuristic, not a dictionary of every name: uncommon names, surnames on
// their own and names in other scripts still get through, and the privacy page
// says so.

const NAMES = `
mary patricia jennifer linda elizabeth barbara susan jessica sarah karen nancy
lisa betty margaret sandra ashley kimberly emily donna michelle carol amanda
melissa deborah stephanie rebecca sharon laura cynthia kathleen amy angela
shirley anna brenda pamela nicole samantha katherine christine helen debra
rachel carolyn janet maria heather diane olivia julie joyce kelly christina
lauren joan evelyn judith megan cheryl andrea hannah jacqueline martha gloria
teresa sara janice marie julia kathryn sophia frances jean alice abigail sophie
madison natalie brittany denise tiffany lori kayla alexis theresa danielle
tammy tina beverly diana jane lindsay kate katie kathy beth liz lizzie jen
jenny jess becky becca meg maggie annie nina tara tessa zoe chloe mia ella ava
lucy nora clara alexandra alyssa amelia anne annette ariana audrey bianca
bonnie candace carla carmen caroline cassandra charlotte claire colleen
courtney dana darlene elaine eleanor ellen erica erin esther eva gabrielle gail
gina gwen irene isabel jackie jasmine jenna jill joanne jocelyn josephine
judy kaitlyn kara kari katrina kendra kim kristen kristin laurie leah lena
lillian lindsey lorraine lydia mallory marilyn marissa maya melanie miranda
molly monica naomi natasha nadia nicola norma paula phyllis rita
roberta robyn rosa ruth sabrina sally savannah shannon sheila shelley stacy
stella tabitha tamara tanya tracy trisha vanessa vera veronica vicki wendy
whitney yvonne
james john robert michael william david richard joseph thomas charles
christopher daniel matthew anthony donald steven paul andrew joshua kenneth
kevin brian george timothy ronald edward jason jeffrey ryan jacob gary nicholas
eric jonathan stephen larry justin scott brandon benjamin samuel gregory
alexander patrick raymond dennis jerry tyler aaron jose adam nathan henry
douglas zachary peter kyle noah ethan jeremy walter christian keith roger terry
austin sean gerald carl harold dylan arthur lawrence jesse bryan billy bruce
gabriel joe logan albert willie alan eugene russell vincent philip bobby johnny
bradley roy ralph randy howard wayne louis mike dave steve jim tom tim jeff
matt chris dan danny sam ben tony jon greg andy alex adrian ali andre anton
carlos cole connor craig curtis damien dante darren dustin dwayne elijah eli
evan felix fred gavin hugo ian isaac ivan jared jaden jamie jonah julian kurt
leo liam luca lucas luke marcus martin marvin maurice miguel nathaniel neil
oliver oscar owen phil rene rhys riley ruben seth shane shawn simon stanley
stuart theo todd trevor troy tyson victor vince wesley wyatt xavier zach zane
rick brad chad gene glen
raj rajesh amit amir priya ankit rahul rohan arjun sanjay vijay sunil anil ravi
deepak manoj suresh ramesh kiran neha pooja anjali sunita sita geeta gurpreet
harpreet jaspreet manpreet simran navjot balwinder harjit jagdeep parminder
kuldeep sukhdeep arman aman ahmed ahmad mohammed muhammad mohamed hassan
hussein omar umar yusuf ibrahim ismail khalid tariq bilal fatima aisha ayesha
zainab maryam layla leila noor
juan pedro ana sofia diego mateo santiago valentina camila isabella
pierre jacques marc luc francois michel philippe alain guillaume antoine
mathieu isabelle nathalie sylvie catherine genevieve veronique celine chantal
manon emma
`;

export const FIRST_NAMES = new Set(NAMES.split(/\s+/).filter(Boolean));
