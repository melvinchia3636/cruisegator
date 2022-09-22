const axios = require("axios");
const jsdom = require("jsdom");
const fs = require("fs");

const getRawData = (html) => {
  const data = JSON.parse(
    html.getElementById("__NEXT_DATA__")?.innerHTML || "[]"
  );

  return data.props.pageProps.album.media.results;
};

const fetchImageData = (raw) => {
  const getURL = ({ id, type }) => {
    let result;
    switch (type) {
      case "panorama":
        result = "frblud"
          .split("")
          .map((e) => `https://panoramas.cruisecritic.com/${id}/pano_${e}.jpg`);
        break;
      case "image":
        result = `https://img.cruisecritic.net/img-cc/image/${id}/image_800x_.jpg`;
        break;
      default:
        result = "";
    }
    return result;
  };
  const dom = new jsdom.JSDOM(raw);
  const html = dom.window.document;
  const rawData = getRawData(html);
  const image = rawData.map((e) => ({
    id: e.id,
    type: e.mediaType.type,
    url: getURL({ id: e.id, type: e.mediaType.type }),
  }));
  return image;
};

module.exports = {
  getIndexData: async (req, res) => {
    const request = await axios
      .get(`https://www.cruisecritic.com/photos/ships/` + req.params.id)
      .catch(() => null);
    if (request && request.status === 404) {
      res.send({});
      return;
    }
    const data = (await request) && request?.data;
    const dom = new jsdom.JSDOM(data);
    const html = dom.window.document;

    const rawData = getRawData(html);
    const sectionID = Object.keys(rawData).filter((e) =>
      e.match(/Section:\d*?$/)
    );
    const sectionData = sectionID.map((e) => ({
      name: rawData[e].name,
      id: rawData[e].albums.id,
    }));
    const albumIDList = sectionData.map(({ name, id }) => ({
      name,
      list: rawData[id].results.map((e) => e.id),
    }));
    const albumList = albumIDList.map(({ name, list }) => ({
      name,
      list: list
        .map((e) => {
          const getCoverImage = (imageID) => {
            const { id, format } = rawData[imageID];
            return { id, format };
          };
          const { id, name, totalMedia, primaryImage } = rawData[e];
          if (!primaryImage?.id) return;
          const coverImage = getCoverImage(primaryImage.id);
          return {
            id,
            name,
            totalMedia,
            coverImage,
          };
        })
        .filter((e) => e),
    }));
    const result = albumList;
    res.send(result.length !== 0 ? result : "no data");
  },
  getImageData: async (req, res) => {
    let { id, album_id, image_id } = req.params;
    album_id = album_id.replace(/[^a-zA-Z0-9-]/g, "");
    image_id = image_id.replace(/[^a-zA-Z0-9-]/g, "");
    const response = await axios(
      `https://www.cruisecritic.com/photos/ships/${id}/${album_id}/${image_id}/`
    ).catch((err) => console.log(err));
    if (response) {
      res.send(fetchImageData(response.data));
      return;
    }
    res.send({});
  },
};
