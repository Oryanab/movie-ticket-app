class Seed():
    def drop_movies_table(self):
        import pymongo
        my_client = pymongo.MongoClient("mongodb://root:example@mongo:27017/MovieDb?authSource=admin")
        database = my_client["MovieDb"]
        collection = database["movies"]
        collection.drop()
        print('Deleted Previous Data')

    def getAllDatesOfMovies(self, movie_title, image, trailer_link,genres, description, price):
        from datetime import datetime, timedelta
        import json
        import requests
        movie_start_time_list = ["8:00", "12:00", "14:00", "18:00", "22:00"]
        tomorrow = datetime(datetime.now().year, datetime.now().month, datetime.now().day + 1)
        for date in range(0, 5):
            for start_time in movie_start_time_list:
                new_date = tomorrow + timedelta(days=date)
                seed_api = requests.post("http://api:4000/api/movies/add-movie", data=json.dumps({
                    "movie_title": movie_title,
                    "img": image,
                    "trailer": trailer_link,
                    "genres": genres,
                    "description": description,
                    "price": price,
                    "movie_date": new_date,
                    "time_start": start_time
                }, default=str), headers={"Content-Type": "application/json"})
                print(seed_api.text)

    def get_movies_trailer(self,movie_link, movie_title):
        import requests
        from bs4 import BeautifulSoup
        try:
            response = requests.get(url=movie_link)
            web_text = response.text
            website = BeautifulSoup(web_text, "lxml")
            trailer_link = website.find(name="a", class_="ipc-lockup-overlay Slatestyles__SlateOverlay-sc-1t1hgxj-2 fAkXoJ hero-media__slate-overlay ipc-focusable")
            return f"https://www.imdb.com{trailer_link.get('href')}"
        except:
            return f"https://www.youtube.com/results?search_query={movie_title} trailer"

    def start_seed(self):
        import requests
        from bs4 import BeautifulSoup
        response = requests.get(url="https://www.imdb.com/list/ls025152261/")
        web_text = response.text
        website = BeautifulSoup(web_text, "lxml")
        for movie_div in website.find_all(name="div", class_="lister-item mode-detail"):
            image = movie_div.findNext(name="img")["loadlate"]
            title = movie_div.findNext(name="h3").a.text
            genres = movie_div.findNext(name="span", class_="genre").text.strip().split(',')
            description = movie_div.findNext(name="p", class_="").text
            movie_page = movie_div.findNext(name="a").get('href')
            trailer_link = self.get_movies_trailer(f"https://www.imdb.com{movie_page}", title)
            self.getAllDatesOfMovies(title,image, trailer_link,genres, description, 50)
        print('Finished adding updated data')

if __name__ == "__main__":
    seed = Seed()
    seed.drop_movies_table()
    seed.start_seed()



















