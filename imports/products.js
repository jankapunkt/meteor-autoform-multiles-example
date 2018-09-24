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
Products.allow({
  insert() { return true },
  update() { return true },
  remove() { return true }
})

const multiSchema = new SimpleSchema({
  title: {
    type:String,
  },
  pictures: {
    type: Array,
  },
  'pictures.$': {
    type: String,
    label: false,
    autoform: {
      afFieldInput: {
        type: 'fileUpload',
        collection: 'ProductImages',
        multiple: "multiple",
        // uploadTemplate: 'uploadField', // <- not working with custom templates yet!
        // previewTemplate: 'uploadPreview' // <- Optional
      }
    }
  }
}, {tracker: Tracker})


const singleSchema = new SimpleSchema({
  pictures: {
    type: String,
    optional: true,
    label: false,
    autoform: {
      afFieldInput: {
        type: 'fileUpload',
        collection: 'ProductImages',
        multiple: "multiple",
        // uploadTemplate: 'uploadField', // <- Optional
        // previewTemplate: 'uploadPreview' // <- Optional
      }
    }
  }
}, {tracker: Tracker})


Products.schema = multiSchema
Products.attachSchema(Products.schema)

