class Seed():
    def remove_irrelevant_movies_and_tickets(self):
        import pymongo
        import datetime
        my_client = pymongo.MongoClient("mongodb://root:example@mongo:27017/MovieDb?authSource=admin")
        database = my_client["MovieDb"]
        collectionMovies = database["movies"]
        collectionTickets = database["tickets"]
        for movie in collectionMovies.find():
            movie_exact_time = movie["time_start"].split(":") 
            if movie["movie_date"].replace(hour=int(movie_exact_time[0]), minute=int(movie_exact_time[1])) < datetime.datetime.now():
                collectionMovies.find_one_and_delete({"_id": movie["_id"]})
                print(movie["movie_date"], movie["time_start"])
        for ticket in collectionTickets.find():
            ticket_exact_time = ticket["time_start"].split(":") 
            if ticket["movie_date"].replace(hour=int(ticket_exact_time[0]), minute=int(ticket_exact_time[1])) < datetime.datetime.now():
                collectionTickets.find_one_and_delete({"_id": ticket["_id"]})
                print(ticket["movie_date"], ticket["time_start"])

    def getAllDatesOfMovies(self, movie_title, image, trailer_link,genres, description, price):
        from datetime import datetime, timedelta
        import json
        import requests
        import pymongo
        my_client = pymongo.MongoClient("mongodb://root:example@mongo:27017/MovieDb?authSource=admin")
        database = my_client["MovieDb"]
        collection = database["movies"]
        movie_start_time_list = ["8:00", "12:00", "14:00", "18:00", "22:00"]
        tomorrow = datetime(datetime.now().year, datetime.now().month, datetime.now().day)
        for date in range(0, 5):
            for start_time in movie_start_time_list:
                new_date = tomorrow + timedelta(days=date)
                movie_exact_time = start_time.split(":")  
                if not collection.find_one({"movie_title":movie_title, "movie_date":new_date, "time_start":start_time}) and new_date.replace(hour=int(movie_exact_time[0]), minute=int(movie_exact_time[1])) > datetime.now():
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
    from datetime import datetime
    seed = Seed()
    print(f"seeding process started at {datetime.now()}")
    seed.start_seed()
    print(f"seeding process finish at {datetime.now()}")
    print(f"deleteing past events process started at {datetime.now()}")
    seed.remove_irrelevant_movies_and_tickets()
    print(f"deleteing past events process finish at {datetime.now()}")
    



















