module Jekyll
  # Monkeypatching Page to add a way to get the list of tags from a page
  class Post
    def tags
      (self.data['tags'] || '').split(',').map() { |t| Tag.new(t) }
    end
  end

  # Adding new Tag object
  class Tag
    TAG_NAME_MAP = {
      "#"  => "sharp",
      "/"  => "slash",
      "\\" => "backslash",
      "."  => "dot",
      "+"  => "plus",
      " "  => "-"
    }

    attr_accessor :name

    def initialize(name)
      @name = escape_name(name.downcase.strip)
    end
    
    def to_s
      @name
    end

    def to_liquid
      @name
    end

    private

    # Map a tag to its directory name. Certain characters are escaped,
    # using the TAG_NAME_MAP constant, above.
    def escape_name(name)
      escaped_name = ""
      name.each_char do |char|
        if (char =~ /[-A-Za-z0-9_]/) != nil
          escaped_name += char
        else
          converted_char = TAG_NAME_MAP[char]
          if not converted_char
            msg = "Bad character '#{char}' in tag '#{name}'"
            puts("*** #{msg}")
            raise FatalException.new(msg)
          end
          escaped_name += converted_char
        end
      end
      return escaped_name
    end
  end

  # Generating /tags/xxx for every tag
  class TagGenerator < Generator
    safe true
    def generate(site)
      tags = {}

      # Building a list of tags, with each associated post
      site.posts.sort_by{ |post| post.date }.reverse.each do |post|
        post_tags = post.tags
        post_tags.each do |post_tag|
          if (!tags[post_tag.name]) 
            tags[post_tag.name] = {
              :tag => post_tag,
              :posts => []
            }
          end

          tags[post_tag.name][:posts] << post
        end
      end

      # Creating index pages for every tag
      tags.each do |key, value|
        tag_index = TagIndexPage.new(site, value[:tag], value[:posts])
        tag_index.render(site.layouts, site.site_payload)
        tag_index.write(site.dest)
        site.pages << tag_index
      end

      # Adding an index with all tags
      tag_list = []
      tags.each do |key, value|
        tag_list << value[:tag]
      end
      all_tags = AllTagsPage.new(site, tag_list)
      all_tags.render(site.layouts, site.site_payload)
      all_tags.write(site.dest)
      site.pages << all_tags
    end

  end

  class TagIndexPage < Page
    def initialize(site, tag, posts)
      @site = site
      @base = site.source
      @name = 'index.html'
      @dir = "tags/#{tag}"
      self.process(@name)
      self.read_yaml(File.join(site.source, site.config['layouts'], 'tags'), 'tag.html')
      self.data['tag'] = tag.to_liquid
      self.data['posts'] = posts
      self.data['title'] = "##{tag}"
    end
  end

  class AllTagsPage < Page
    def initialize(site, tags)
      @site = site
      @base = site.source
      @name = 'index.html'
      @dir = "tags"
      self.process(@name)
      self.read_yaml(File.join(site.source, site.config['layouts'], 'tags'), 'index.html')
      self.data['tags'] = tags
      self.data['title'] = "Tags"
    end
  end

end
