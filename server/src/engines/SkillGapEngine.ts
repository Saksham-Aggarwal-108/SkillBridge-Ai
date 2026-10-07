import { RoleDefinition } from './CareerMatchingEngine.js';

export interface SkillGapDetail {
  skillName: string;
  category: string;
  currentLevel: number; // 1 to 5 scale (0 if missing)
  requiredLevel: number; // 1 to 5 scale
  gapScore: number; // required - current
  demand: 'Critical' | 'High' | 'Medium' | 'Low';
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  priorityScore: number;
  status: 'MATCH' | 'GAP' | 'PRIORITY';
  rationale: string;
}

export class SkillGapEngine {
  public static analyzeGaps(
    userSkills: { name: string; proficiency?: number; category?: string }[],
    targetRole: RoleDefinition
  ): SkillGapDetail[] {
    const userSkillMap = new Map<string, { proficiency: number; category: string }>();
    userSkills.forEach(s => {
      userSkillMap.set(s.name.toLowerCase(), {
        proficiency: s.proficiency || 3,
        category: s.category || 'Technical',
      });
    });

    const results: SkillGapDetail[] = [];

    // Analyze required skills
    for (const req of targetRole.requiredSkills) {
      const userSkill = userSkillMap.get(req.skill.toLowerCase());
      const currentLevel = userSkill ? userSkill.proficiency : 0;
      const requiredLevel = req.requiredLevel || 4;
      const gapScore = Math.max(0, requiredLevel - currentLevel);

      let demand: SkillGapDetail['demand'] = 'High';
      if (req.weight >= 1.2) demand = 'Critical';
      else if (req.weight <= 0.8) demand = 'Medium';

      let priority: SkillGapDetail['priority'] = 'Medium';
      let status: SkillGapDetail['status'] = 'GAP';
      let priorityScore = 50;

      if (gapScore === 0) {
        status = 'MATCH';
        priority = 'Low';
        priorityScore = 20;
      } else if (gapScore >= 3 || (req.weight >= 1.2 && gapScore >= 2)) {
        status = 'PRIORITY';
        priority = 'Critical';
        priorityScore = 95;
      } else if (gapScore >= 2 || req.weight >= 1.0) {
        status = 'PRIORITY';
        priority = 'High';
        priorityScore = 80;
      } else {
        status = 'GAP';
        priority = 'Medium';
        priorityScore = 60;
      }

      let rationale = '';
      if (status === 'MATCH') {
        rationale = `You satisfy the required level (${currentLevel}/5) for ${targetRole.title}.`;
      } else if (priority === 'Critical') {
        rationale = `Essential core requirement for ${targetRole.title} with a significant current proficiency gap (${currentLevel}/5 vs ${requiredLevel}/5).`;
      } else if (priority === 'High') {
        rationale = `High market demand skill expected by employers for ${targetRole.title}.`;
      } else {
        rationale = `Recommended skill to elevate your career readiness to tier-1 level.`;
      }

      results.push({
        skillName: req.skill,
        category: userSkill ? userSkill.category : 'Technical',
        currentLevel,
        requiredLevel,
        gapScore,
        demand,
        priority,
        priorityScore,
        status,
        rationale,
      });
    }

    // Sort by priorityScore descending
    return results.sort((a, b) => b.priorityScore - a.priorityScore);
  }
}
