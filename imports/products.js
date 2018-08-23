import { ProductImages } from './product_images.js'
import SimpleSchema from 'simpl-schema'

SimpleSchema.extendOptions(['autoform'])
SimpleSchema.setDefaultMessages({
  initialLanguage: 'en',
  messages: {
    en: {
      uploadError: '{{value}}', //File-upload
    },
  }
})


export const Products = new Mongo.Collection("Products")

const ProductPicturesSchema = new SimpleSchema({
  position: {
    type: Number,
    label: "Position",
    defaultValue: 0,
    autoform: {
      type: 'hidden',
    }
  },
  imageId: {
    type: String,
    optional: true,
    label: false,
    autoform: {
      afFieldInput: {
        type: 'fileUpload',
        collection: 'ProductImages',
        // uploadTemplate: 'uploadField', // <- Optional
        // previewTemplate: 'uploadPreview' // <- Optional
      }
    }
  }
 })


Products.schema = new SimpleSchema({
  title: {
    type: String,
    label: "Title",
    max: 200
  },
  pictures: {
    type: Array,
    optional: true
  },
  'pictures.$': {
    type: ProductPicturesSchema,
    optional: true,
    label: false
  }
}, {tracker: Tracker})

Products.attachSchema(Products.schema)

