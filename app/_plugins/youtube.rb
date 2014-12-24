require 'uri'
require 'cgi'

module Jekyll
  class YoutubeTag < Liquid::Tag

    def initialize(tag_name, input, tokens)
      super
      input.chomp!
      @youtube_id = CGI::parse(URI.parse(input).query)['v'][0]
      @embed_url = "http://www.youtube.com/embed/#{@youtube_id}"
    end

    def render(context)
      return "<iframe 
class=\"youtube-player\"
type=\"text/html\" 
width=\"640\" 
height=\"390\"
src=\"#{@embed_url}\"
frameborder=\"0\"
allowfullscreen
></iframe>"
    end
  end
end

Liquid::Template.register_tag('youtube', Jekyll::YoutubeTag)


