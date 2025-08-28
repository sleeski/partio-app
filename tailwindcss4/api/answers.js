import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = req.body;

    if (!body.userId) {
      // Create new user
      const { rows } = await sql`INSERT INTO users (created_at) VALUES (NOW()) RETURNING id;`;
      const userId = rows[0].id;
      return res.status(200).json({ userId });
    } else {
      // Save answer
      const { userId, questionId, value } = body;
      await sql`INSERT INTO answers (user_id, question_id, value) VALUES (${userId}, ${questionId}, ${value})
        ON CONFLICT (user_id, question_id) DO UPDATE SET value = EXCLUDED.value;`;
      return res.status(200).json({ success: true });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
}