const products = [
  {
    id: 1,
    title: "React.js",
    category: "frontend",
    createdAt: "2021-10-31T15:02:00.411Z",
  },
  {
    id: 2,
    title: "Node.js",
    category: "backend",
    createdAt: "2021-10-31T15:03:23.556Z",
  },
  {
    id: 3,
    title: "Vue.js",
    category: "frontend",
    createdAt: "2021-11-01T10:47:26.889Z",
  },
];

const categories = [
  {
    id: 1,
    title: "frontend",
    description: "frontend of applications",
    createdAt: "2021-11-01T10:47:26.889Z",
  },
  {
    id: 2,
    title: "backend",
    description: "the backend of the applications",
    createdAt: "2021-10-01T10:47:26.889Z",
  },
];

export default class Storage {
  static getAllCategories() {
    const savedCategories = JSON.parse(localStorage.getItem("category")) || [];

    // sort=> نزولی des
    savedCategories.sort((a, b) => {
      return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
    });

    return savedCategories;
  }
  static saveCategory(categoryTosave) {
    const savedCategories = Storage.getAllCategories();
    const existedItem = savedCategories.find((c) => c.id === categoryTosave.id);
    if (existedItem) {
      // edit
      existedItem.title = categoryTosave.title;
      existedItem.description = categoryTosave.description;
    } else {
      // new
      categoryTosave.id = new Date().getTime();
      categoryTosave.createdAt = new Date().toISOString();
      savedCategories.push(categoryTosave);
    }
    localStorage.setItem("category", JSON.stringify(savedCategories));
  }

  static getAllProducts() {
    const savedProducts = JSON.parse(localStorage.getItem("products")) || [];

    // sort=> نزولی des
    savedProducts.sort((a, b) => {
      return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
    });

    return savedProducts;
  }

  static saveProducts(productTosave) {
    const savedproducts = Storage.getAllProducts();
    const existedItem = savedproducts.find((c) => c.id === productTosave.id);
    if (existedItem) {
      // edit
      existedItem.title = productTosave.title;
      existedItem.quantity = productTosave.quantity;
      existedItem.category = productTosave.category;
    } else {
      // new
      productTosave.id = new Date().getTime();
      productTosave.createdAt = new Date().toISOString();
      savedproducts.push(productTosave);
    }
    localStorage.setItem("products", JSON.stringify(savedproducts));
  }
}
