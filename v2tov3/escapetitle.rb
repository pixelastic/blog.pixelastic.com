class EscapeTitle
  def initialize
    @input_files = Dir['../_posts/*.md']
  end

  def run
    @input_files.each do |file|
      content = File.read(file)
      lines = content.split("\n")

      changed = false

      lines.each do |line|
        if line.match(/^title/)
          new_line = line.gsub(/<(.*?)>/, '`<\1>`')
          if new_line != line
            content.gsub!(line, new_line)
            changed = true
          end
          break;
        end
      end

      if changed == true
        File.write(file, content);
      end
    end
  end

end
EscapeTitle.new().run()
