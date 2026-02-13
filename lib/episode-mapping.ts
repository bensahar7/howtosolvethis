/**
 * Manual mapping between RSS episode numbers and local metadata folder names
 * This is necessary because RSS titles don't match local metadata titles
 * 
 * RSS Structure:
 * - Season 1: Episodes 1-10
 * - Season 2: Episodes 11-14 (calculated as 10 + episode_in_season)
 */
export const EPISODE_MAPPING: Record<number, string> = {
  // Season 1 (Episodes 1-10)
  1: "ep1-bees", // "מה הסיפור עם היעלמות הדבורים?" → Bees
  2: "ep5-daikawood", // "מה הבעיה עם מחזור של עץ?" → Daikawood (wood waste)
  3: "ep3- Salicrop", // "מה קורה כשצמחים בלחץ?" → Salicrop (resilient seeds)
  4: "ep2-structurepal", // "איך אפשר להפחית את השימוש בבטון?" → StructurePal (concrete)
  5: "ep07-wildfires-firewave", // "איך אפשר למנוע שריפות?" → Firewave
  6: "ep08-textile-recycling-textre", // "למה קשה למחזר בגדים?" → Textre
  7: "ep04-carbon-rewind", // "איך מסירים פחמן?" → Rewind (Carbon Sequestration)
  8: "ep9-satellite-astrea", // "איך אוספים מידע מהחלל?" → Astrea (Satellite)
  9: "ep06-agritech-greeneye", // "מה הבעיה עם הדברה?" → GreenEye (Precision Spraying)
  10: "ep10-waste-to-energy-boson", // "מה עושים עם הזבל שלנו?" → Boson Energy
  
  // Season 2 (Episodes 11-14)
  11: "ep14-blue-tech-econcrete", // S2E1: "מה הבעיה עם בטון בים?" → ECOncrete
  12: "ep11-foodtech-brevel", // S2E2: "איך מפיקים חלבון מאצות?" → Brevel (microalgae)
  13: "ep12-foodtech-oshi", // S2E3: "מה הבעיה עם תעשיית הסלמון?" → Oshi (salmon alternative)
  14: "ep13-materials-polymertal", // S2E4: "Polymertal - החברה שמפתחת אלטרנטיבה למתכת"
};
