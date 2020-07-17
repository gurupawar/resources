var cardContainer = document.querySelector(".container");

var apiLink = "https://api.theindex.tech/";
function createNode(element) {
  return document.createElement(element);
}

var data;
fetch(apiLink)
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Something went wrong");
    }
  })
  .then((resData) => {
    data = resData;
    const categories = data.categories;
    for (var i = 0; i < categories.length; i++) {
      var selectList = document.querySelector("#select_list");
      var optionList = new Option(categories[i], categories[i]);
      selectList.appendChild(optionList);
    }
    var selectedItem = [0];

    const uiDesing = data.websites[`${selectedItem}`];
    // console.log(uiDesing);
    // for each start
    uiDesing.forEach((element) => {
      // card
      const card = createNode("div");
      card.setAttribute("class", "card");

      // card title
      const cardTitle = createNode("div");
      cardTitle.setAttribute("class", "card_title");
      const h4 = createNode("h4");
      h4.textContent = element.title;

      // card discription
      const cardDiscription = createNode("div");
      cardDiscription.setAttribute("class", "card_discription");
      const p = createNode("p");
      element.description = element.description.substring(0, 70);
      p.textContent = element.description;

      // card logo
      const cardLogo = createNode("div");
      cardLogo.setAttribute("class", "card_logo");
      const img = createNode("img");
      img.src = element.logo || "aseets/404.png";
      img.onerror = function () {
        // error handling if image not found
        this.onerror = null;
        this.src = "aseets/404.png";
      };
      // resouce link
      const resouceLink = createNode("div");
      resouceLink.setAttribute("class", "resouce_link");
      const card_link = createNode("a");
      card_link.href = element.link;
      card_link.setAttribute("target", "_blank");
      const i = createNode("i");
      i.setAttribute("class", "fa fa-external-link");

      //append
      cardContainer.appendChild(card);
      card.appendChild(cardTitle);
      cardTitle.appendChild(h4);
      card.appendChild(cardDiscription);
      cardDiscription.appendChild(p);
      card.appendChild(cardLogo);
      cardLogo.appendChild(img);
      card.appendChild(resouceLink);
      resouceLink.appendChild(card_link);
      card_link.appendChild(i);
    });
    // for each end
    selectList.addEventListener("change", () => {
      selectedItem = selectList.selectedIndex;
      // console.log(selectedItem);
    });
  });
