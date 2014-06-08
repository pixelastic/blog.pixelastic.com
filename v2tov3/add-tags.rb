require "shellwords"
require "json"


class AddTags
  def initialize
    @input_files = Dir['../tmp/_posts/*md']
    @tag_file = File.expand_path('./json/tags.json')
    @tag_posts_file = File.expand_path('./json/posts_tags.json')
    @output_dir = File.expand_path('./dest')
  end


  def get_tag_list
    content = JSON.parse(File.read(@tag_file))
    tag_list = {}
    content.each do |tag|
      tag_list[tag['id']] = tag['slug']
    end
    return tag_list
  end

  def get_tags_for_posts
    content = JSON.parse(File.read(@tag_posts_file))
    tags_for_post = {}
    content.each do |assoc|
      if !tags_for_post[assoc['post_id']]
        tags_for_post[assoc['post_id']] = []
      end

      tags_for_post[assoc['post_id']] << assoc['tag_id']
    end
    return tags_for_post
  end

  def get_header_and_html(content)
    # Split into header and html
    lines = content.split("\n")
    header = []
    html = []
    header_count = 0
    lines.each do |line|
      line.chomp!
      if header_count < 2
        header_count = header_count+1 if line == "---"
        header << line
      else
        html << line
      end
    end

    return header.join("\n"), html.join("\n")
  end


  def run
    tag_list = get_tag_list
    tags_for_post = get_tags_for_posts

    @input_files.each do |post|
      content = File.read(post)
      header, html = get_header_and_html(content)

      tag_line = ""

      # Getting the list of tags from the post id
      header_lines = header.split("\n")
      header_lines.each do |line|
        next unless line =~ /^custom_v2_id/
        id = line.gsub('custom_v2_id: ', '').to_i
        tags = []
        next unless tags_for_post[id]
        tags_for_post[id].each do |tag_id|
          tags << tag_list[tag_id]
        end
         tag_line = "tags: #{tags.join(", ")}"
      end


      # Adding the tags to the header
      if tag_line
        header_lines[-1] = tag_line
        header_lines << "---"
        header_lines << ""

        file_content = header_lines.join("\n") + html

        File.write(File.expand_path(post), file_content);
      end

    end



  end
  
end
AddTags.new().run()

