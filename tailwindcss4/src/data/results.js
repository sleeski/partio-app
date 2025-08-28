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
    let maxImpacts = statsConfig.reduce((acc, stat) => ({ ...acc, [stat]: { max: Number.NEGATIVE_INFINITY, min: Number.POSITIVE_INFINITY } }), {});
    
    question.options.forEach(option => {
      statsConfig.forEach(stat => {
        const val = option.stats?.[stat] || 0;
        maxImpacts[stat].max = Math.max(maxImpacts[stat].max, val);
        maxImpacts[stat].min = Math.min(maxImpacts[stat].min, val);
      });
    });

    // Add max and min impacts for this question
    statsConfig.forEach(stat => {
      const impactMax = Number.isFinite(maxImpacts[stat].max) ? maxImpacts[stat].max : 0;
      const impactMin = Number.isFinite(maxImpacts[stat].min) ? maxImpacts[stat].min : 0;
      maxPoints[stat] += impactMax;
      minPoints[stat] += impactMin;
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

  // Determine personality profile based on highest stat
  let maxStat = '';
  let maxValue = -Infinity;
  for (const [stat, value] of Object.entries(stats)) {
    if (value > maxValue) {
      maxValue = value;
      maxStat = stat;
    }
  }

  const profileMap = {
    luonto: {
      title: "Luonnon Ystävä",
      description: "Olet intohimoinen luonnon rakastaja, joka nauttii eniten partion ulkoilma-aktiviteeteista ja retkistä metsässä.",
      image: "/images/luonto.webp" // Replace with real image path
    },
    partiotaidot: {
      title: "Taitava Eränkävijä",
      description: "Hallitset partiotaitoja erinomaisesti ja pidät rakentelusta, solmuista ja selviytymistaidoista.",
      image: "/images/partiotaidot.webp" // Replace with real image path
    },
    järjestö: {
      title: "Järjestöaktiivi",
      description: "Olet aktiivinen partiojärjestössä, keräät merkkejä innokkaasti ja osallistut mielelläsi tapahtumiin ja paraateihin.",
      image: "/images/jarjesto.webp" // Replace with real image path
    },
    kaverit: {
      title: "Sosiaalinen Partiolainen",
      description: "Sinulle partio on ennen kaikkea kavereita ja yhdessäoloa. Nautit leireistä ja kokouksista ystävien kanssa.",
      image: "/images/kaverit.webp" // Replace with real image path
    }
  };

  const selected = profileMap[maxStat] || {
    title: "Tasapainoinen Partiolainen",
    description: "Olet monipuolinen partiolainen, jolla on tasapainoiset kiinnostukset kaikilla alueilla.",
    image: "/images/default-result.webp"
  };

  return {
    ...selected,
    stats,
    maxPoints,
    minPoints // Added for backend use
  };
};