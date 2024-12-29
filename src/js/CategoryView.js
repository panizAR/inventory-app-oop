import Storage from "./Storage.js";

const title = document.querySelector("#category-title");
const description = document.querySelector("#category-description");
const addNewCategory = document.querySelector("#add-new-category");
const btnCancel = document.querySelector(".btn-cancel");

export default class CategoryView {
  constructor() {
    addNewCategory.addEventListener("click", (e) => this.addNewCategory(e));
    this.Categoriees = [];
  }
  addNewCategory(e) {
    e.preventDefault();
    const title = title.value;
    const description = description.value;
    if (!title || !description) return;
    Storage.saveCategory({ title, description });
    this.Categoriees = Storage.getAllCategories();

    // update DOM : Update select option
    
  }
}
