module Jekyll
  module Algolia
    module Hooks
      def self.should_be_excluded?(filepath)
        # Do not index tag pages
        return true if filepath =~ %r{^tags/}

        # Do not index archive pages
        return true if filepath =~ /^archive/
        return true if filepath =~ %r{^[0-9]{4}/}

        # Index everything else
        false
      end
    end
  end
end
