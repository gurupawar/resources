let body = document.querySelector("body");
let cardContainer = document.querySelector(".container");
let selectList = document.getElementById("select_list");
let loader = document.getElementById("loader");
let footer = document.querySelector(".footer");
let apiLink = "https://api.theindex.tech/";

function createNode(element) {
  return document.createElement(element);
}

function loadData(indexs = 0) {
  loader.removeAttribute("hidden");
  footer.style.display = "none";
  fetch(apiLink)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Something went wrong");
      }
    })

    .then((resData) => {
      loader.setAttribute("hidden", "");
      footer.style.display = "block";
      data = resData.websites[`${indexs}`];

      // for each start
      data.forEach((element) => {
        // card

        const card = createNode("div");
        card.setAttribute("class", "card");

        // card title
        const cardTitle = createNode("div");
        cardTitle.setAttribute("class", "card_title");
        const a = createNode("a");
        a.href = element.link;
        a.setAttribute("target", "_blank");
        a.textContent = element.title;

        // card discription
        const cardDiscription = createNode("div");
        cardDiscription.setAttribute("class", "card_discription");
        const p = createNode("p");
        element.description = element.description.substring(0, 70);
        p.textContent = element.description + "...";

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
        cardTitle.appendChild(a);
        card.appendChild(cardDiscription);
        cardDiscription.appendChild(p);
        card.appendChild(cardLogo);
        cardLogo.appendChild(img);
        card.appendChild(resouceLink);
        resouceLink.appendChild(card_link);
        card_link.appendChild(i);
      });

      // for each end

      // Reveal Animation
      (function scrollReveal() {
        window.sr = ScrollReveal();

        sr.reveal(
          ".card",
          {
            duration: 800,
            distance: "40px",
            easing: "ease-out",
            origin: "bottom",
            reset: true,
            scale: 1,
            viewFactor: 0,
          },
          150
        );
      })();
      // Reveal Animation End
    });
}

selectList.addEventListener("change", function () {
  cardContainer.innerHTML = "";
  selectedItem = selectList.selectedIndex;
  loadData(selectedItem);
});

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 150 ||
    document.documentElement.scrollTop > 150
  ) {
    document.querySelector(".category").style.backgroundColor = "white";
    document.querySelector(".drop_down").style.backgroundColor = "black";
  } else {
    document.querySelector(".category").style.backgroundColor =
      "rgba(255, 255, 255, 0.2)";
    document.querySelector(".drop_down").style.backgroundColor =
      "rgba(255, 255, 255, 0.2)";
  }
}
loadData();
