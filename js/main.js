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
const loadDetailsNews = newsId => {
    try {
        url = `https://openapi.programming-hero.com/api/news/category/${newsId}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displayDetailsNews(data.data));
    } catch (error) {
        console.log(error);
    }
};
// display news Count
const displayDetailsNews = newsItems => {
    // display News Count
    const newsCountDisplay = (document.getElementById(
        "news-count-display"
    ).innerText = `${newsItems.length} news found on this category.`);

    // display news details
    const newsDetailsContainer = document.getElementById(
        "news-details-container"
    );
    newsDetailsContainer.innerHTML = "";
    newsItems.forEach(item => {
        // console.log(item);
        const newsDiv = document.createElement("div");
        newsDiv.classList.add("card", "mb-4");
        newsDiv.innerHTML = `
                        <div class="row g-0">
                            <div class="col-md-2">
                                <img
                                    src="${item.thumbnail_url}"
                                    class="img-fluid rounded-3 m-3"
                                    alt="..."
                                />
                            </div>
                            <div class="col-md-10 p-3">
                                <div
                                    class="card-body d-flex flex-column align-content-around"
                                >
                                    <h5 class="card-title">${item.title}</h5>
                                    <p class="card-text over-flow-control mb-4">${item.details}</p>
                                    <div class="d-flex justify-content-around">
                                        <div
                                            class="d-flex flex-row align-items-center"
                                        >
                                            <img class="rounded-5"
                                                style="width: 3rem"
                                                src="${item.author.img}"
                                                alt=""
                                            />
                                            <p class="m-0 ps-2"> ${item.author.name}</p>
                                        </div>
                                        <div
                                            class="d-flex flex-row justify-content-around align-items-center"
                                        >
                                            <i class="fa-regular fa-eye"></i>
                                            <p class="m-0"> ${item.total_view}</p>
                                        </div>
                                        <div class="d-flex align-items-center">
                                            <i class="fa-solid fa-star-half-stroke"></i>
                                            <p class="m-0"> ${item.rating.number}</p>
                                        </div>
                                        <div class="d-flex align-items-center">
                                            <!-- Button trigger modal -->
                                             <button type="button" onClick="loadNewsDetails('${item._id}')" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#newsDetailsModal">
                                             News Details
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
        `;
        newsDetailsContainer.appendChild(newsDiv);
    });
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
