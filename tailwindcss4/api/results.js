const { sql } = require('@vercel/postgres');
const questions = require('../src/data/questions'); // Adjust path to your questions.js
const { calculateResults } = require('../src/data/results'); // Adjust path to your results.js

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { userId } = req.body;

    // Fetch user's answers
    const { rows: answerRows } = await sql`SELECT question_id, value FROM answers WHERE user_id = ${userId};`;
    const answers = answerRows.reduce((acc, row) => ({ ...acc, [row.question_id]: row.value }), {});

    // Prepare flatQuestions
    const flatQuestions = questions.flatMap((category, catIndex) =>
      category.questions.map((question, qIndex) => ({
        ...question,
        id: `category${catIndex}_question${qIndex}`,
      }))
    );

    // Compute user's profile and stats
    const profile = calculateResults(answers, flatQuestions);

    // Compute or store raw stats
    const statsConfig = ['luonto', 'partiotaidot', 'järjestö', 'kaverit'];
    let rawStats = statsConfig.reduce((acc, stat) => ({ ...acc, [stat]: 0 }), {});
    flatQuestions.forEach(question => {
      const answerValue = answers[question.id];
      const option = question.options.find(opt => opt.value === answerValue);
      if (option && option.stats) {
        statsConfig.forEach(stat => {
          rawStats[stat] += option.stats[stat] || 0;
        });
      }
    });

    // Store raw stats if not already stored
    const { rows: statRows } = await sql`SELECT * FROM raw_stats WHERE user_id = ${userId};`;
    if (statRows.length === 0) {
      await sql`INSERT INTO raw_stats (user_id, luonto, partiotaidot, järjestö, kaverit) 
        VALUES (${userId}, ${rawStats.luonto}, ${rawStats.partiotaidot}, ${rawStats.järjestö}, ${rawStats.kaverit});`;
    }

    // Compute average raw stats across all users
    const { rows: avgRows } = await sql`SELECT 
      AVG(luonto) as luonto,
      AVG(partiotaidot) as partiotaidot,
      AVG(järjestö) as järjestö,
      AVG(kaverit) as kaverit
    FROM raw_stats;`;
    const avgRaw = avgRows[0];

    // Normalize averages
    let avgStats = {};
    statsConfig.forEach(stat => {
      const range = profile.maxPoints[stat] - profile.minPoints[stat];
      avgStats[stat] = range > 0 
        ? Math.round(((avgRaw[stat] - profile.minPoints[stat]) / range) * 100) 
        : 0;
    });

    return res.status(200).json({ profile, avgStats });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};