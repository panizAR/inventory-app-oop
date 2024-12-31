import Storage from "./Storage.js";

const addNewProductBtn = document.querySelector("#Add-New-product");
const productTitle = document.querySelector("#product-title");
const productQuantity = document.querySelector("#product-num");
const productCategory = document.querySelector("#product-category");
const searchInput = document.querySelector("#search-input");
const selectedSort = document.querySelector("#sort-input");

class ProductView {
  constructor() {
    addNewProductBtn.addEventListener("click", (e) => this.addNewProduct(e));
    searchInput.addEventListener("input", (e) => this.searchProduct(e));
    selectedSort.addEventListener("change", (e) => this.sortProducts(e));
    this.products = [];
  }

  addNewProduct(e) {
    e.preventDefault();
    const title = productTitle.value;
    const quantity = productQuantity.value;
    const Category = productCategory.value;

    if (!title || !quantity || !Category) return;
    Storage.saveProducts({ title, quantity, Category });
    this.products = Storage.getAllProducts();
    this.createProductsList(this.products);
    console.log(this.products);
  }

  setApp() {
    this.products = Storage.getAllProducts();
  }

  createProductsList(products) {
    let result = ``;

    products.forEach((e) => {
      const selectedCategory = Storage.getAllCategories().find(
        (c) => c.id == e.Category
      );
      result += `<div class="product-list flex justify-between items-center mb-2">
              <span class="text-slate-400">${e.title}</span>
              <div class="flex justify-center items-center gap-2">
                <span class="text-slate-400 text-sm block">${new Date(
                  e.createdAt
                ).toLocaleDateString("fa-IR")}</span>
                <span
                  class="block px-3 py-0.5 border border-slate-400 rounded-xl text-slate-400 text-sm"
                  >${selectedCategory.title}</span
                >
                <span
                  class="text-sm flex items-center justify-center w-7 h-7 rounded-full bg-slate-500 text-slate-300 border border-slate-300"
                  >${e.quantity}</span
                >
                <button
                  class="text-sm border border-red-400 text-red-400 rounded-2xl py-0.5 px-2"
                  data-id=${e.id}
                >
                  delete
                </button>
              </div>
            </div>`;
    });

    const productsDOM = document.querySelector("#products-list");
    productsDOM.innerHTML = result;
  }

  searchProduct(e) {
    const value = e.target.value.trim().toLowerCase();
    const filteredProducts = this.products.filter((p) =>
      p.title.toLowerCase().includes(value)
    );
    this.createProductsList(filteredProducts);
  }

  sortProducts(e) {
    const value = e.target.value;
    console.log(this.products);
    this.products = Storage.getAllProducts(value);
    this.createProductsList(this.products);
  }
}
export default new ProductView();
