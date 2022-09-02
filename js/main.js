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
        const newLi = document.createElement("li");
        newLi.classList.add("list-group-item", "border", "rounded");
        console.log(category.category_name);
        newLi.innerText = category.category_name;
        ul.appendChild(newLi);
    });
};
loadNewsCategory();
