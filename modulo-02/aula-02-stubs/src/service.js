export class Service {
  async makeRequest(url) {
    return (await fetch(url)).json();
  }

  async getPlanets(url) {
    const response = await this.makeRequest(url);

    return {
      name: response.name,
      surfaceWater: response.surface_water,
      appeardIn: response.films.length
    }
  }
}