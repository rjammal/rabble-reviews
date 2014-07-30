json.models @games, partial: "api/games/game", as: :game


json.page_number @page_number
json.total_pages @games.total_pages