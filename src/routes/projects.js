const express = require('express');
const { pool } = require('../config/db');
const { projects: fallbackProjects } = require('../data/projectsSeed');

const router = express.Router();

function normalizeProject(project) {
  return {
    id: project.id,
    title: project.title,
    slug: project.slug,
    short_description: project.short_description,
    full_description: project.full_description,
    category: project.category,
    cover_image: project.cover_image,
    technologies: Array.isArray(project.technologies) ? project.technologies : JSON.parse(project.technologies || '[]'),
    problem_statement: project.problem_statement,
    objectives: Array.isArray(project.objectives) ? project.objectives : JSON.parse(project.objectives || '[]'),
    features: Array.isArray(project.features) ? project.features : JSON.parse(project.features || '[]'),
    architecture: project.architecture,
    my_role: project.my_role,
    challenges: Array.isArray(project.challenges) ? project.challenges : JSON.parse(project.challenges || '[]'),
    solutions: Array.isArray(project.solutions) ? project.solutions : JSON.parse(project.solutions || '[]'),
    results: Array.isArray(project.results) ? project.results : JSON.parse(project.results || '[]'),
    future_improvements: Array.isArray(project.future_improvements) ? project.future_improvements : JSON.parse(project.future_improvements || '[]'),
    github_url: project.github_url,
    live_demo_url: project.live_demo_url,
    featured: Boolean(project.featured),
    sort_order: Number(project.sort_order || 0),
    screenshots: Array.isArray(project.screenshots) ? project.screenshots : [],
    created_at: project.created_at,
    updated_at: project.updated_at,
  };
}

async function readProjectsFromDatabase() {
  const [rows] = await pool.query(
    'SELECT * FROM projects ORDER BY sort_order ASC, created_at DESC',
  );

  return rows.map(normalizeProject);
}

router.get('/', async (req, res) => {
  try {
    const rows = await readProjectsFromDatabase();
    if (rows.length > 0) {
      return res.json(rows);
    }

    return res.json(fallbackProjects);
  } catch (error) {
    return res.json(fallbackProjects);
  }
});

router.get('/:slug', async (req, res) => {
  const { slug } = req.params;

  try {
    const [rows] = await pool.query('SELECT * FROM projects WHERE slug = ? LIMIT 1', [slug]);

    if (rows.length > 0) {
      return res.json(normalizeProject(rows[0]));
    }

    const project = fallbackProjects.find((item) => item.slug === slug);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    return res.json(project);
  } catch (error) {
    const project = fallbackProjects.find((item) => item.slug === slug);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    return res.json(project);
  }
});

module.exports = router;
