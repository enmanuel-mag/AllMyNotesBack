import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  console.log('Query', req.query);
  return res.status(200).json({ result: req.query });
});

export default router;