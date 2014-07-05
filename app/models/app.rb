class Code
  attr_reader :final_output

  def initialize(text)
    @final_output = remove_extra(text).strip
  end

  def remove_extra(text)
    if text.include?("ENTER YOUR CODE HERE >")
      text.gsub("ENTER YOUR CODE HERE >", "")
    else
      text
    end
  end

end

