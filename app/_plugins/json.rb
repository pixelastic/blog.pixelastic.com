require 'json'
module Jekyll
  class JSONPostGenerator < Generator
    safe true

    def generate(site)
      site.posts.each do |post|
        path = post.destination('/')
        path['/index.html'] = '.json'

        site.pages << JSONPage.new(site, path, post)
      end
    end
  end

  class JSONPage < Page
    def initialize(site, path, post)
      @site = site
      @base = site.source
      @dir  = File.dirname(path)
      @name = File.basename(path)


      post_data = post.to_liquid

      content = {
        'id' => post_data['id'],
        'title' => post_data['title'],
        'url' => site.config['url'] + post_data['id'] + '/',
        'tags' => post_data['tags'],
        'date' => post_data['date'].to_i,
        'html' => post.transform,
        'markdown' => post_data['content']
      }

      self.data = {}
      self.content = JSON.pretty_generate(content)

      process(@name)
    end

    def read_yaml(*)
      # Do nothing
    end

    def render_with_liquid?
      false
    end
  end
end
