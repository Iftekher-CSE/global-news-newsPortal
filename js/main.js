// News Category from API call
const loadNewsCategory = async () => {
    try {
        url = `https://openapi.programming-hero.com/api/news/categories`;
        const res = await fetch(url);
        const data = await res.json();
        displayCategory(data.data.news_category);
    } catch (error) {
        console.log(error);
    }
};
// News Category display
const displayCategory = categories => {
    const ul = document.getElementById("category-li-container");
    categories.forEach(category => {
        const newbtn = document.createElement("button");
        newbtn.setAttribute("type", "button");
        newbtn.setAttribute(
            "onClick",
            `loadDetailsNews('${category.category_id}')`
        );
        newbtn.classList.add("list-group-item", "border", "rounded");
        // console.log(category.category_name);
        newbtn.innerText = category.category_name;
        ul.appendChild(newbtn);
    });
};

loadNewsCategory();

//display details news as per category
const loadDetailsNews = categoryId => {
    try {
        const spinnerStart = document
            .getElementById("spinner")
            .classList.remove("d-none");
        url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displayAllNewsCategory(data.data));
    } catch (error) {
        console.log(error);
    }
};
// display news Count
const displayAllNewsCategory = newsItems => {
    // display News Count
    const newsCountDisplay = (document.getElementById(
        "news-count-display"
    ).innerText = `${newsItems.length} news found on this category.`);

    // display news details
    const newsDetailsContainer = document.getElementById(
        "news-details-container"
    );
    newsDetailsContainer.innerHTML = "";

    // sort according to value
    newsItems.sort((a, b) => (a.total_view < b.total_view ? 1 : -1));

    // loop using forEach
    newsItems.forEach(item => {
        const newsDiv = document.createElement("div");
        newsDiv.classList.add("card", "mb-4");
        newsDiv.innerHTML = `
                        <div class="row g-0">
                            <div class="col-md-2">
                                <img
                                    src="${item.thumbnail_url}"
                                    class="img-fluid rounded-3 mx-auto d-block"
                                    alt="..."
                                />
                            </div>
                            <div class="col-md-10 px-md-3">
                                <div
                                    class="card-body py-md-0"
                                >
                                    <div class="d-flex flex-column">
                                    <h5 class=" mt-md-3 card-title">${
                                        item.title
                                    }</h5>
                                    <p class="card-text over-flow-control mb-md-5">${
                                        item.details
                                    }</p>
                                    <div class="d-flex justify-content-around flex-wrap mt-md-5">
                                        <div
                                            class="d-flex flex-row align-items-center mx-3  mb-md-2"
                                        >
                                            <img class="rounded-5"
                                                style="width: 3rem"
                                                src="${item.author.img}"
                                                alt=""
                                            />
                                            <p class="m-0 ps-2"> ${
                                                item.author.name
                                                    ? item.author.name
                                                    : "Author Name not found"
                                            }</p>
                                        </div>
                                        <div
                                            class="d-flex flex-row justify-content-around align-items-center mx-3"
                                        >
                                            <i class="fa-regular fa-eye"></i>
                                            <p class="m-0"> ${
                                                item.total_view
                                            }</p>
                                        </div>
                                        <div class="d-flex align-items-center mx-3">
                                            <i class="fa-solid fa-star-half-stroke"></i>
                                            <p class="m-0"> ${
                                                item.rating.number
                                            }</p>
                                        </div>
                                        <div class="d-flex align-items-center mx-3">
                                            <!-- Button trigger modal -->
                                             <button type="button" onClick="loadNewsDetails('${
                                                 item._id
                                             }')" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#newsDetailsModal">
                                             News Details
                                            </button>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
        `;
        newsDetailsContainer.appendChild(newsDiv);
    });
    const spinnerStop = document
        .getElementById("spinner")
        .classList.add("d-none");
};

// load news details api call
const loadNewsDetails = newsId => {
    const url = `https://openapi.programming-hero.com/api/news/${newsId}`;
    try {
        fetch(url)
            .then(res => res.json())
            .then(data => setNewsToModal(data.data[0]));
    } catch (error) {
        console.log(error);
    }
};

// setNewsToModal
const setNewsToModal = newsDetails => {
    // console.log(newsDetails);
    const title = (document.getElementById("newsDetailsModalLabel").innerText =
        newsDetails.title);
    const author = (document.getElementById("authore-name").innerText =
        newsDetails.author.name
            ? newsDetails.author.name
            : "Author Name not found");
    const pubDate = (document.getElementById("published-date").innerText =
        newsDetails.author.published_date
            ? newsDetails.author.published_date
            : "Published Date not found");
    const view = (document.getElementById("total-view").innerText =
        newsDetails.total_view
            ? newsDetails.total_view
            : "News View data not found");
    const newsBody = (document.getElementById("news-body").innerText =
        newsDetails.details);
    const newsImage = document
        .getElementById("news-image")
        .setAttribute("src", newsDetails.image_url);
};

// End of script part-------Thanks-----------
