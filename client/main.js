/* global AutoForm */
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'

import {ReactiveDict} from 'meteor/reactive-dict'
import { Products } from '../imports/products.js'
import './main.html';


Template.image.onCreated(function () {
  const instance = this
  instance.state = new ReactiveDict()

  AutoForm.addHooks(null, {
    onSuccess(...args) {
      instance.state.set('formType', null)
      instance.state.set('target', null)
    },
    beginSubmit() {
      const formId = this.formId
      const values = AutoForm.getFormValues(formId)
      console.log("submit: ", formId, values)
    }
  })

})


Template.image.helpers({
  productsCollection() {
    return Products
  },
  form(type) {
    return Template.instance().state.get('formType') === type
  },
  product() {
    const id = Template.instance().state.get('target')
    return Products.findOne(id)
  },
  products() {
    return Products.find()
  }
})

Template.image.events({
  'click .add-button'(event, tInstance) {
    event.preventDefault()
    tInstance.state.set('formType', 'insert')
    tInstance.state.set('target', null)
  },
  'click .edit-button'(event, tInstance) {
    event.preventDefault()
    const targetId = $(event.currentTarget).data('id')
    tInstance.state.set('target', targetId)
    tInstance.state.set('formType', 'update')
  },
  'click .cancel-button'(event, tInstance) {
    event.preventDefault()
    tInstance.state.set('formType', null)
    tInstance.state.set('target', null)
  }
})
