import useHttp from "../hooks/http.hook";

const useMarvelService = () => {
  const { loading, request, error, clearError } = useHttp();

  const _apiBase = "https://gateway.marvel.com:443/v1/public";
  const _apiKey = "apikey=e3d615d5c35159cad542e81c3f94749a";
  const _baseOffset = 210;

  const getAllCharacters = async (offset = _baseOffset) => {
    const res = await request(
      `${_apiBase}/characters?limit=9&offset=${offset}&${_apiKey}`
    );
    return res.data.results.map(_transformCharacter);
  };

  const getCharacter = async (id) => {
    const res = await request(`${_apiBase}/characters/${id}?${_apiKey}`);
    return _transformCharacter(res.data.results[0]);
  };

  const _transformCharacter = (char) => {
    const thumb = char.thumbnail;

    return {
      id: char.id,
      name: char.name,
      description: char.description,
      thumbnail: `${thumb.path}.${thumb.extension}`,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items,
    };
  };

  const getAllComics = async (offset = _baseOffset) => {
    const res = await request(
      `${_apiBase}/comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`
    );
    return res.data.results.map(_transformComics);
  };

  const getComic = async (id) => {
    const res = await request(`${_apiBase}/comics/${id}?${_apiKey}`);
    return _transformComics(res.data.results[0]);
  };

  const _transformComics = (comic) => {
    const thumb = comic.thumbnail;
    return {
      id: comic.id,
      name: comic.title,
      description: comic.description,
      pageCount: comic.pageCount,
      thumbnail: `${thumb.path}.${thumb.extension}`,
      language: comic.textObjects[0]?.language || "en-us",
      price: comic.prices[0].price
        ? `${comic.prices[0].price}$`
        : "not available",
    };
  };

  return {
    loading,
    error,
    clearError,
    getAllCharacters,
    getCharacter,
    getAllComics,
    getComic,
  };
};

export default useMarvelService;
