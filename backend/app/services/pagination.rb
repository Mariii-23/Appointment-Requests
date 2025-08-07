class Pagination
  DEFAULT_PAGE = 1
  DEFAULT_PER_PAGE = 20

  attr_reader :page, :per_page

  def initialize(relation, page: nil, per_page: nil)
    @relation = relation
    @page = (page || DEFAULT_PAGE).to_i
    @per_page = (per_page || DEFAULT_PER_PAGE).to_i
  end

  def result
    {
      current_page: page,
      per_page: per_page,
      total_count: total_count,
      total_pages: total_pages,
      data: paginated_results
    }
  end

  private

  def total_count
    @total_count ||= @relation.count
  end

  def total_pages
    (total_count / per_page.to_f).ceil
  end

  def paginated_results
    @relation.limit(per_page).offset((page - 1) * per_page)
  end
end
