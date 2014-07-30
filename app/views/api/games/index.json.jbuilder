json.models @games, partial: "game", as: :game

json.page_number @page_number
json.total_pages @games.total_pages
json.query @query