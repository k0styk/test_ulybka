module.exports = {
  get_items: `SELECT id, name, avg_rating FROM public.items`,
  get_authors: `SELECT id, concat(name,' ',lastname,' ',surname) as fullname FROM public.authors`,
  get_feedback_view_all: `SELECT * FROM api_feedback_items`,
  get_feedback_view_item: `SELECT * FROM api_feedback_items WHERE item_id = $1`,
  add_item: `INSERT INTO public.items(name) VALUES ($1)`,
  add_author: `INSERT INTO public.authors(name, lastname, surname) VALUES ($1, $2, $3)`,
  add_feedback: `INSERT INTO public.feedback_items(name, lastname, surname) VALUES ($1, $2, $3)`,
};