import { RoleDefinition } from '../data/seedData';
import { CareerMatch } from '../types';

export class CareerMatchingEngine {
  public static calculateMatch(
    userSkills: { name: string; proficiency?: number }[],
    role: RoleDefinition
  ): CareerMatch {
    const userSkillSet = new Set(userSkills.map(s => s.name.toLowerCase()));

    const matchedRequired: string[] = [];
    const missingSkills: string[] = [];
    let totalRequiredWeight = 0;
    let matchedRequiredWeight = 0;

    for (const req of role.requiredSkills) {
      totalRequiredWeight += req.weight;
      if (userSkillSet.has(req.skill.toLowerCase())) {
        matchedRequired.push(req.skill);
        matchedRequiredWeight += req.weight;
      } else {
        missingSkills.push(req.skill);
      }
    }

    const preferredMatched: string[] = [];
    for (const pref of role.preferredSkills) {
      if (userSkillSet.has(pref.skill.toLowerCase())) {
        preferredMatched.push(pref.skill);
      }
    }

    const baseRatio = totalRequiredWeight > 0 ? matchedRequiredWeight / totalRequiredWeight : 0;
    const prefBonus = (preferredMatched.length * 0.05);
    let matchScore = Math.min(98, Math.max(15, Math.round((baseRatio + prefBonus) * 100)));

    let readinessLabel: CareerMatch['readinessLabel'] = 'Developing';
    if (matchScore >= 85) readinessLabel = 'Career Ready';
    else if (matchScore >= 70) readinessLabel = 'High Potential';
    else if (matchScore >= 50) readinessLabel = 'Developing';
    else readinessLabel = 'Needs Foundation';

    return {
      roleId: role.id,
      roleTitle: role.title,
      domain: role.domain,
      description: role.description,
      matchScore,
      matchedSkills: matchedRequired,
      missingSkills,
      preferredMatched,
      readinessLabel,
    };
  }

  public static matchAllRoles(
    userSkills: { name: string; proficiency?: number }[],
    allRoles: RoleDefinition[]
  ): CareerMatch[] {
    return allRoles
      .map(role => this.calculateMatch(userSkills, role))
      .sort((a, b) => b.matchScore - a.matchScore);
  }
}
