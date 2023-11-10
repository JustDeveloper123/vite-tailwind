//# Creating a new product (usually is shop-card)

//% Usage:
// If we have the product data - Create a cycle from the product array (it can be from JSON file)

//? Syntax:
// ( productData?, {...props} )

//> Example with object data:
// const productsData = dataArray.map(
//   productData =>
//     new Product(productData, {
//       html: `Some html here`,
//       parentEl: '.container',
//       attributes: [
//         ['key', value],
//         ['key', value],
//       ],
//       loader: {
//         imgEl: '.img',
//         loaderEl: '.preloader',
//       },
//     })
// );

class Product {
  constructor(
    productData,
    props = {
      // html,
      // className, ('' - empty class)
      // parentEl,
      // attributes [[], []],
      // loader {
      //   imgEl,
      //   loaderEl,
      //   tag,
      // },
    },
  ) {
    this.productData = productData;
    this.props = props;

    //! error handling
    try {
      this._initProps();
      this._createProduct();

      //# if we have preloader
      if (this.props.loader) this._loader();
    } catch (e) {
      //! displaying the error
      console.error(e.message);
    }
  }

  //# Initialization default properties

  _initProps() {
    // is product data exists or not in boolean
    this.isProductData = typeof this.productData === 'object';

    // if the parent element exists
    if (document.querySelector(String(this.props.parentEl))) {
      // set the parent element as a selector
      this.props.parentEl = document.querySelector(String(this.props.parentEl));
    } else throw new Error('Parent selector not found');

    // set default class name for the product (if property !== false and !== '' || false)
    // empty string '' will disable creating of the class attribute
    if (!this.props.className && this.props.className !== ('' || false)) this.props.className = 'item';

    // tag name of current product
    if (!this.props.tag) this.props.tag = 'div';
  }

  //# Creating product and display in parent container

  _createProduct() {
    // creating new product element
    const productEl = document.createElement(this.props.tag);

    // set class attribute to the new element if we have the class attribute (default class name: 'item')
    if (this.props.className) productEl.classList.add(this.props.className);

    // set html to the new element
    productEl.innerHTML = this.props.html;

    // set attributes if we have it
    if (this.props.attributes) {
      this.props.attributes.forEach(attr => {
        productEl.setAttribute(attr[0], attr[1]);
      });
    }

    // set product selector as property and display on the page
    this.productEl = productEl;
    this.props.parentEl.appendChild(productEl);

    return this.productEl;
  }

  //# Removing loaders for new product

  _loader() {
    // set image and loader selectors to class properties
    this.props.loader.imgEl = this.productEl.querySelector(this.props.loader.imgEl);
    this.props.loader.loaderEl = this.productEl.querySelector(this.props.loader.loaderEl);

    // if image or loader do not exist)
    if (!(this.props.loader.imgEl && this.props.loader.loaderEl)) throw new Error('The connection does not exist between image and loader. Check the selectors are right');

    // set load event on the image
    this.props.loader.imgEl.addEventListener('load', () => (this.props.loader.loaderEl.style.display = 'none'));

    // if the image has already loaded
    if (this.props.loader.imgEl.complete) this.props.loader.loaderEl.style.display = 'none';

    return this.product;
  }
}

export default Product;
