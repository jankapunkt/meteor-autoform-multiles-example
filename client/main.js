import { Products } from '../imports/products.js'

import './main.html';


Template.image.helpers({
  productsCollection() {
    return Products
  }
})

