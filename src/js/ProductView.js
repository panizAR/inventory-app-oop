import Storage from "./Storage.js";

const addNewProductBtn = document.querySelector("#Add-New-product");
const productTitle = document.querySelector("#product-title");
const productQuantity = document.querySelector("#product-num");
const productCategory = document.querySelector("#product-category");

class ProductView {
  constructor() {
    addNewProductBtn.addEventListener("click", (e) => {
      this.addNewProduct(e);
      this.products = [];
    });
  }
  addNewProduct(e) {
    e.preventDefault();
    const title = productTitle.value;
    const quantity = productQuantity.value;
    const Category = productCategory.value;

    if (!title || !quantity || !Category) return;
    Storage.saveProducts({ title, quantity, Category });
    this.products = Storage.getAllProducts();
    this.createProductsList();
    console.log(products);
  }
  setApp() {
    this.products = Storage.getAllProducts();
  }
  createProductsList() {
    let result = ``;

    this.products.forEach((e) => {
      const selectedCategory = Storage.getAllCategories().find(
        (c) => c.id == e.Category
      );
      result += `<div class="product-list flex justify-between items-center mb-2">
              <span class="text-slate-400 capitalize">${e.title}</span>
              <div class="flex justify-center items-center gap-2">
                <span class="text-slate-400 text-sm block">${new Date().toLocaleDateString(
                  "fa-IR"
                )}</span>
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
}
export default new ProductView();
