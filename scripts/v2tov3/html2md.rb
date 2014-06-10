require "shellwords"


class Html2Mkd
  def initialize
    @input_files = Dir['./src/*html']
    @output_dir = File.expand_path('./dest')

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

  def convert_to_markdown(html)
    File.write('./tmp.html', html)
    markdown = %x[html2mkd ./tmp.html]
    return markdown
  end

  def run
    @input_files.each do |file|
      next if file == '.' || file == '..'
      puts "converting #{file}"
      header, html = get_header_and_html(File.read(file))
      markdown = convert_to_markdown(html)


      filename = File.join(@output_dir, File.basename(file, File.extname(file)) + '.md')
      new_content = header + "\n\n" + markdown
      File.write(filename, new_content)
    end

  end
  
end
Html2Mkd.new().run()

