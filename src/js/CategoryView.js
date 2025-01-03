import Storage from "./Storage.js";

const categoryTitle = document.querySelector("#category-title");
const categoryDescription = document.querySelector("#category-description");
const addNewCategory = document.querySelector("#add-new-category");
const btnCancel = document.querySelector(".btn-cancel");
const toggleAddCategoryBtn = document.querySelector("#toggle-add-category");
const categoryWrapper = document.querySelector("#category-wrapper");

class CategoryView {
  constructor() {
    addNewCategory.addEventListener("click", (e) => this.addNewCategory(e));
    toggleAddCategoryBtn.addEventListener("click", (e) =>
      this.toggleAddCategory(e)
    );
    btnCancel.addEventListener("click", (e) => this.cancelAddCategory(e));
    this.Categories = [];
  }
  addNewCategory(e) {
    e.preventDefault();
    const title = categoryTitle.value;
    const description = categoryDescription.value;

    if (!title || !description) return;
    Storage.saveCategory({ title, description });
    this.Categories = Storage.getAllCategories();

    // update DOM : Update select option
    this.createCatedoriesList();
    categoryDescription.value = "";
    categoryTitle.value = "";

    //
    categoryWrapper.classList.add("hidden");
    toggleAddCategoryBtn.classList.remove("hidden");
  }
  setApp() {
    this.Categories = Storage.getAllCategories();
  }
  createCatedoriesList() {
    let result = `<option value="" class="bg-slate-500 text-slate-300">
      select a category
    </option>`;

    this.Categories.forEach((e) => {
      result += `<option value=${e.id} class="bg-slate-500 text-slate-300">
     ${e.title}
    </option>`;
    });

    const categoryDOM = document.querySelector("#product-category");
    categoryDOM.innerHTML = result;
  }
  toggleAddCategory(e) {
    e.preventDefault();
    categoryWrapper.classList.remove("hidden");
    toggleAddCategoryBtn.classList.add("hidden");
  }
  cancelAddCategory(e) {
    e.preventDefault();
    categoryWrapper.classList.add("hidden");
    toggleAddCategoryBtn.classList.remove("hidden");
  }
}
export default new CategoryView();
