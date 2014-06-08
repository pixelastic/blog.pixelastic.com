module Jekyll
  # Generating index pages for /YYYY, /YYYY/MM and /YYYY/MM/DD pages
  class ArchiveGenerator < Generator
    safe true
    def generate(site)
      year_list = []
      # Year
      site.posts.group_by{ |post| {"year" => post.date.year} }.each do |period, posts|
        year_list << period["year"]
        posts = posts.sort_by { |post| post.date }.reverse
        archive_year = ArchiveYearIndex.new(site, posts, period["year"])
        archive_year.render(site.layouts, site.site_payload)
        archive_year.write(site.dest)
        site.pages << archive_year
      end

      # Month
      site.posts.group_by{ |post| {"month" => post.date.month, "year" => post.date.year} }.each do |period, posts|
        posts = posts.sort_by { |post| post.date }.reverse
        archive_month = ArchiveMonthIndex.new(site, posts, period["year"], period["month"])
        archive_month.render(site.layouts, site.site_payload)
        archive_month.write(site.dest)
        site.pages << archive_month
      end

      # Day
      site.posts.group_by{ |post| {"day" => post.date.day, "month" => post.date.month, "year" => post.date.year} }.each do |period, posts|
        posts = posts.sort_by { |post| post.date }.reverse
        archive_day = ArchiveDayIndex.new(site, posts, period["year"], period["month"], period["day"])
        archive_day.render(site.layouts, site.site_payload)
        archive_day.write(site.dest)
        site.pages << archive_day
      end

      # List of all years
      year_list.sort!.reverse!
      archive_main = ArchiveMainIndex.new(site, year_list)
      archive_main.render(site.layouts, site.site_payload)
      archive_main.write(site.dest)
      site.pages << archive_main
    end

  end

  class ArchiveYearIndex < Page
    def initialize(site, posts, year)
      @site = site
      @base = site.source
      @name = 'index.html'
      @dir = year.to_s()
      self.process(@name)
      self.read_yaml(File.join(site.source, site.config['layouts'], 'archive'), 'year.html')
      self.data['year'] = year
      self.data['posts'] = posts
      self.data['title'] = "Archive #{year}"
    end
  end

  class ArchiveMonthIndex < Page
    def initialize(site, posts, year, month)
      @site = site
      @base = site.source
      @name = 'index.html'
      @dir = File.join(year.to_s(), "%02d" % month.to_s())
      self.process(@name)
      self.read_yaml(File.join(site.source, site.config['layouts'], 'archive'), 'month.html')
      self.data['year'] = year
      self.data['month'] = month
      self.data['posts'] = posts
      self.data['title'] = "Archive #{Time.new(year, month).strftime("%B %Y")}"
    end
  end

  class ArchiveDayIndex < Page
    def initialize(site, posts, year, month, day)
      @site = site
      @base = site.source
      @name = 'index.html'
      self.process(@name)
      self.read_yaml(File.join(site.source, site.config['layouts'], 'archive'), 'day.html')
      self.data['year'] = year
      self.data['month'] = month
      self.data['day'] = day
      @dir = File.join(year.to_s(), "%02d" % month.to_s(), "%02d" % day.to_s())
      self.data['posts'] = posts
      self.data['title'] = "Archive #{Time.new(year, month, day).strftime("%B %d, %Y")}"
    end
  end

  class ArchiveMainIndex < Page
    def initialize(site, years)
      @site = site
      @base = site.source
      @name = 'index.html'
      @dir = 'archive'
      self.process(@name)
      self.read_yaml(File.join(site.source, site.config['layouts'], 'archive'), 'index.html')
      self.data['years'] = years
      self.data['title'] = "Archive"
    end
  end

end
