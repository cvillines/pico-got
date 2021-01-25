export default class GotApi {
  public parseHeaders(response: {headers: any}) {
    return response.headers
      .get("link")
      .split(",")
      .reduce((acc: Record<string, string>, link: string) => {
        const props = /^<(.+)>; rel="(.+)"$/.exec(link.trim());
        if (!props) {
          return acc;
        }
        acc[props[2]] = props[1];
        return acc;
      }, {});
  }

  public async getAllData(url: string) {
    const response = await fetch(url);
    const props = this.parseHeaders(response);
    const data = await response.json();
    if (props.next) {
      const newData = await this.getAllData(props.next);
      data.push(...newData);
    }
    return data;
  }

  public async fetchBooks() {
    const request = await fetch(
      `https://www.anapioficeandfire.com/api/books`
    );

    if (!request.ok) {
      const message = `An error has occured: ${request.statusText}`;
      console.log("message", message);
    }

    return await this.getAllData("https://www.anapioficeandfire.com/api/books");
  }

  public async fetchBookDetails(id: string) {
    const request = await fetch(
      `https://www.anapioficeandfire.com/api/books/${id}`
    );
    if (!request.ok) {
      const message = `An error has occured: ${request.statusText}`;
      console.log("message", message);
    }
    const response = await request.json();

    return response;
  }

  public async fetchHouses() {
    const request = await fetch("https://www.anapioficeandfire.com/api/houses");
    if (!request.ok) {
      const message = `An error has occured: ${request.statusText}`;
      console.log("message", message);
    }

    return await this.getAllData("https://www.anapioficeandfire.com/api/houses");
  }

  public async fetchDetails(id: string) {
    const request = await fetch(
      `https://www.anapioficeandfire.com/api/houses/${id}`
    );
    if (!request.ok) {
      const message = `An error has occured: ${request.statusText}`;
      console.log("message", message);
    }

    const response = await request.json();

    return response;
  }

  public async fetchCharacterDetails(id: string) {
    const request = await fetch(
      `https://www.anapioficeandfire.com/api/characters/${id}`
    );
    if (!request.ok) {
      const message = `An error has occured: ${request.statusText}`;
      console.log("message", message);
    }

    const response = await request.json();
    return response;
  }
}
