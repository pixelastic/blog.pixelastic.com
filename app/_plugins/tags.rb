require 'awesome_print'

def slugify_tag(tag_name)
  replace_hash = {
    '#' => 'sharp',
    '/' => 'slash',
    '\\' => 'backslash',
    '.' => 'dot',
    '+' => 'plus',
    ' ' => '-',
    '$' => '$'
  }
  escaped_name = ''

  tag_name.downcase.strip.each_char do |char|
    escaped_name += replace_hash[char] || char
  end

  escaped_name
end

module Jekyll
  # Generating /tags/xxx for every tag
  class TagGenerator < Generator
    safe true
    def generate(site)
      tags = {}

      # Building a list of tags, with each associated post
      site.posts.docs.sort_by(&:date).reverse.each do |post|
        post_tags = post.data['tags']
        post_tags.each do |tag_name|
          unless tags[tag_name]
            tags[tag_name] = {
              name: tag_name,
              slug: slugify_tag(tag_name),
              posts: []
            }
          end

          tags[tag_name][:posts] << post
        end
      end

      # Creating index pages for every tag
      tags.each do |_key, tag|
        tag_index = TagIndexPage.new(site, tag)
        tag_index.render(site.layouts, site.site_payload)
        tag_index.write(site.dest)
        site.pages << tag_index
      end

      # Adding an index with all tags
      tag_list = []
      tags.each do |_key, tag|
        tag_list << { 'name' => tag[:name], 'slug' => tag[:slug] }
      end
      all_tags = AllTagsPage.new(site, tag_list)
      all_tags.render(site.layouts, site.site_payload)
      all_tags.write(site.dest)
      site.pages << all_tags
    end
  end

  class TagIndexPage < Page
    def initialize(site, tag)
      @site = site
      @base = site.source
      @name = 'index.html'
      @dir = "tags/#{tag[:slug]}"
      process(@name)
      read_yaml(File.join(site.source, site.config['layouts_dir'], 'tags'), 'tag.html')
      data['tag'] = tag[:name]
      data['posts'] = tag[:posts]
      data['title'] = "##{tag[:name]}"
    end
  end

  class AllTagsPage < Page
    def initialize(site, tags)
      @site = site
      @base = site.source
      @name = 'index.html'
      @dir = 'tags'
      process(@name)
      read_yaml(File.join(site.source, site.config['layouts_dir'], 'tags'), 'index.html')
      data['tags'] = tags
      data['title'] = 'Tags'
    end
  end
end

