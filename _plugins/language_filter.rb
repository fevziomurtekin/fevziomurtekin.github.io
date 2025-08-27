module Jekyll
  module LanguageFilter
    def get_language_content(content, lang)
      return content unless content.include?('content_tr:')
      
      if lang == 'tr'
        # Extract Turkish content from front matter
        content.match(/content_tr:\s*\|\s*([\s\S]*?)(?=---|$)/)&.[](1)&.strip || content
      else
        # Extract English content (remove Turkish content)
        content.gsub(/content_tr:\s*\|\s*[\s\S]*?(?=---|$)/, '').gsub(/---\s*$/, '').strip
      end
    end
    
    def get_language_title(title, title_tr, lang)
      if lang == 'tr' && title_tr
        title_tr
      else
        title
      end
    end
  end
end

Liquid::Template.register_filter(Jekyll::LanguageFilter)
