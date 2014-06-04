require "json"


class Htaccess
  def initialize
    @input_file = File.expand_path('./posts.json')
  end

  def run
    content = JSON.parse(File.read(@input_file))

    content.each do |item|
      # name = item['name'].gsub('"', '\"')
      date = item['publish_start'].split(' ')[0].split('-')
      slug = item['slug']
      id = item['id']

      v1_url = "/blog/#{id}:#{slug}"

      v2_url = 'http://blog.pixelastic.com/'
      v2_url << "#{date[0]}/#{date[1]}/#{date[2]}/"
      v2_url << "#{slug}/"

      puts "Redirect 301 #{v1_url} #{v2_url}"


    end

  end

end
Htaccess.new().run()
