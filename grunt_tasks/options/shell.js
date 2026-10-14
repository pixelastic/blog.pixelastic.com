export default {
  jekyllDev: {
    command:
      'bundle exec jekyll build \
               --source tmp/jekyll \
               --destination dist/ \
               --config _config.yml \
               --drafts \
               --limit_posts 30',
  },
  jekyllProd: {
    command:
      'bundle exec jekyll build \
               --source tmp/jekyll \
               --destination dist/ \
               --config _config.yml',
  },
};
