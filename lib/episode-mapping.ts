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
  2: "ep3-daikawood", // "מה הבעיה עם מחזור של עץ?" → Daikawood (wood waste)
  3: "ep2- Salicrop", // "מה קורה כשצמחים בלחץ?" → Salicrop (resilient seeds)
  4: "ep4-structurepal", // "איך אפשר להפחית את השימוש בבטון?" → StructurePal (concrete)
  5: "ep5-wildfires-firewave", // "איך אפשר למנוע שריפות?" → Firewave
  6: "ep6-textile-recycling-textre", // "למה קשה למחזר בגדים?" → Textre
  7: "ep7-carbon-rewind", // "איך מסירים פחמן?" → Rewind (Carbon Sequestration)
  8: "ep8-satellite-astrea", // "איך אוספים מידע מהחלל?" → Astrea (Satellite)
  9: "ep9-agritech-greeneye", // "מה הבעיה עם הדברה?" → GreenEye (Precision Spraying)
  10: "ep10-waste-to-energy-boson", // "מה עושים עם הזבל שלנו?" → Boson Energy
  
  // Season 2 (Episodes 11-16)
  11: "ep14-blue-tech-econcrete", // S2E1: "מה הבעיה עם בטון בים?" → ECOncrete
  12: "ep11-foodtech-brevel", // S2E2: "איך מפיקים חלבון מאצות?" → Brevel (microalgae)
  13: "ep12-foodtech-oshi", // S2E3: "מה הבעיה עם תעשיית הסלמון?" → Oshi (salmon alternative)
  14: "ep13-materials-polymertal", // S2E4: "Polymertal - החברה שמפתחת אלטרנטיבה למתכת"
  15: "ep15-foodtech-coffeesei", // S2E5: "CoffeeSai - Lab-Grown Cell-Based Coffee"
  16: "ep16-coral-reefs-vcorals", // S2E6: "Coral Reefs - להציל את היערות של הים"
};
