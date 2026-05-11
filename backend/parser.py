import requests
from bs4 import BeautifulSoup

url = "https://upg.uz"


def parse_products():
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")

    # main = soup.find(class_="product-collection-element")
    products = soup.find_all(class_="product-element")

    data = []

    for product in products:
        try:
            a_tag = product.find('a')
            title_tag = product.find("p", class_="text-element")    
            title = title_tag.text.strip() if title_tag else ""
            link = a_tag.get('href') if a_tag else ""
            img_tag = product.find('img')
            image = img_tag.get("src") if img_tag else ""
            print(image)

            p_tags = product.find_all("p")
            price = p_tags[3].text.strip()

            data.append({
                "title": title,
                "price": price,
                "link": url + link,
                "image": image
            })

        except:
            continue
    return data
