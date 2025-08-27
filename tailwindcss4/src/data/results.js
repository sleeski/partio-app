export const calculateResults = (answers, questions) => {
  // Define the list of stats
  const statsConfig = [
    'luonto',
    'partiotaidot',
    'järjestö',
    'kaverit'
  ];

  // Initialize stats, maxPoints, and minPoints objects
  let stats = statsConfig.reduce((acc, stat) => ({ ...acc, [stat]: 0 }), {});
  let maxPoints = statsConfig.reduce((acc, stat) => ({ ...acc, [stat]: 0 }), {});
  let minPoints = statsConfig.reduce((acc, stat) => ({ ...acc, [stat]: 0 }), {});

  // Calculate stats, maxPoints, and minPoints based on questions
  questions.forEach(question => {
    let maxImpacts = statsConfig.reduce((acc, stat) => ({ ...acc, [stat]: { max: 0, min: 0 } }), {});
    
    question.options.forEach(option => {
      if (option.stats) {
        statsConfig.forEach(stat => {
          if (option.stats[stat]) {
            maxImpacts[stat].max = Math.max(maxImpacts[stat].max, option.stats[stat]);
            maxImpacts[stat].min = Math.min(maxImpacts[stat].min, option.stats[stat]);
          }
        });
      }
    });

    // Add max and min impacts for this question
    statsConfig.forEach(stat => {
      maxPoints[stat] += maxImpacts[stat].max;
      minPoints[stat] += maxImpacts[stat].min;
    });

    // Add selected answer's stat impacts
    const answerValue = answers[question.id];
    const option = question.options.find(opt => opt.value === answerValue);
    if (option && option.stats) {
      statsConfig.forEach(stat => {
        stats[stat] += option.stats[stat] || 0;
      });
    }
  });

  // Normalize stats to a 0-100 scale based on minPoints and maxPoints
  statsConfig.forEach(stat => {
    const range = maxPoints[stat] - minPoints[stat];
    stats[stat] = range > 0 
      ? Math.round(((stats[stat] - minPoints[stat]) / range) * 100) 
      : 0; // Default to 0% if no range
  });

  // Determine personality profile based on dominant stats
  const profiles = [
    {
      title: "Social Trailblazer",
      description: "You're the life of the party and thrive in group settings. Your high extroversion and adventurousness make you a natural leader who inspires others to try new things. You love organizing events and bringing people together for exciting experiences.",
      condition: stats.extroversion >= 60 && stats.adventurousness >= 60,
      stats: { ...stats },
      maxPoints: { ...maxPoints },
      image: "/images/default-result.webp" // Update with specific image when available
    },
    {
      title: "Independent Explorer",
      description: "You prefer charting your own path and enjoy solo adventures. Your high independence and adventurousness drive you to seek unique experiences on your own terms. You're self-reliant and love discovering new challenges at your own pace.",
      condition: stats.independence >= 60 && stats.adventurousness >= 60,
      stats: { ...stats },
      maxPoints: { ...maxPoints },
      image: "/images/default-result.webp" // Update with specific image when available
    },
    {
      title: "Thoughtful Strategist",
      description: "You excel in planning and reflection, preferring to work independently in familiar settings. Your high independence and low adventurousness make you a reliable planner who values stability and deep thinking.",
      condition: stats.independence >= 60 && stats.adventurousness < 40,
      stats: { ...stats },
      maxPoints: { ...maxPoints },
      image: "/images/default-result.webp" // Update with specific image when available
    },
    {
      title: "Charismatic Planner",
      description: "You blend social charm with careful planning. Your high extroversion and low adventurousness make you great at leading groups in structured activities. You enjoy social settings but prefer predictable, well-organized adventures.",
      condition: stats.extroversion >= 60 && stats.adventurousness < 40,
      stats: { ...stats },
      maxPoints: { ...maxPoints },
      image: "/images/default-result.webp" // Update with specific image when available
    },
    {
      title: "Balanced Pathfinder",
      description: "You're a versatile individual who balances social and solo activities while being open to new experiences in moderation. You adapt well to different situations, enjoying both group dynamics and personal reflection depending on the context.",
      condition: true, // Default fallback
      stats: { ...stats },
      maxPoints: { ...maxPoints },
      image: "/images/default-result.webp" // Update with specific image when available
    }
  ];

  // Return the first matching profile
  return profiles.find(profile => profile.condition) || profiles[profiles.length - 1];
};