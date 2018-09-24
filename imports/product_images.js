import { Meteor } from 'meteor/meteor'
// import { Session } from 'meteor/session'
import { FilesCollection } from 'meteor/ostrio:files'

export const ProductImages = new FilesCollection({
	// debug: true,
	collectionName: "ProductImages",
	// allowClientCode: true, // Required to let you remove uploaded file

	onBeforeUpload(file) {
		// Allow upload files under 20MB, and only in png/jpg/jpeg formats
		if (file.size <= 10485760*2 && /png|gif|jpg|jpeg/i.test(file.ext)) {
			return true
		} else {
			return 'Please upload image, with size equal or less than 20MB'
		}
	}
})

if (Meteor.isClient) {
  Meteor.subscribe('images.all')
}

if (Meteor.isServer) {
	ProductImages.denyClient()
  Meteor.publish('images.all', () => {
    return ProductImages.collection.find({})
  })
}
// console.log(ProductImages.collection)
// global.ProductImages = ProductImages



