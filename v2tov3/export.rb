require "json"


class ExportJson
  def initialize
    @input_file = File.expand_path('./posts.json')
    @output_dir  = File.expand_path('../_posts')
  end

  def run
    content = JSON.parse(File.read(@input_file))

    content.each do |item|
      name = item['name'].gsub('"', '\"')
      puts name



      post = []
      post << '---'
      post << 'layout: post'
      post << "title: \"#{name}\""
      post << "custom_v2_id: #{item['id']}"
      post << '---'
      post << ''
      post << item['text']

      date = item['publish_start'].split(' ')
      filename = "#{date[0]}-#{item['slug']}.md"
      filename = File.expand_path(File.join(@output_dir,filename))

      output = post.join("\n")

      File.write(filename, output);
    end

  end

end
ExportJson.new().run()
